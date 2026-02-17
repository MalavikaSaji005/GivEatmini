"use client";

import { useState, useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Mic, Loader2, StopCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { voiceAssistedInput } from '@/ai/flows/voice-assisted-input';
import { cn } from '@/lib/utils';

type RecordingState = 'idle' | 'recording' | 'processing';

type VoiceInputProps = {
  setValue: UseFormSetValue<any>;
  fieldNames: string[];
} & React.ComponentProps<typeof Input>;

export function VoiceInput({ setValue, fieldNames, className, ...props }: VoiceInputProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleMicClick = async () => {
    if (recordingState === 'recording') {
      mediaRecorderRef.current?.stop();
      setRecordingState('processing');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64data = reader.result as string;
          try {
            const result = await voiceAssistedInput({
              voiceDataUri: base64data,
              fieldTypes: fieldNames,
            });
            
            Object.entries(result.extractedData).forEach(([field, value]) => {
              if (fieldNames.includes(field)) {
                setValue(field, value, { shouldValidate: true });
              }
            });

            toast({
              title: "Success",
              description: "Information extracted from your voice.",
            });
          } catch (error) {
            console.error('Error processing voice input:', error);
            toast({
              variant: "destructive",
              title: "Error",
              description: "Could not process voice input. Please try again.",
            });
          } finally {
            setRecordingState('idle');
            // Stop all media tracks to turn off the mic indicator
            stream.getTracks().forEach(track => track.stop());
          }
        };
      };

      mediaRecorderRef.current.start();
      setRecordingState('recording');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        variant: "destructive",
        title: "Microphone Error",
        description: "Could not access microphone. Please check permissions.",
      });
      setRecordingState('idle');
    }
  };

  const getIcon = () => {
    switch (recordingState) {
      case 'recording':
        return <StopCircle className="h-5 w-5 text-red-500 animate-pulse" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 animate-spin" />;
      default:
        return <Mic className="h-5 w-5" />;
    }
  };

  return (
    <div className="relative w-full">
      <Input className={cn('pr-12', className)} {...props} />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-10"
        onClick={handleMicClick}
        disabled={recordingState === 'processing'}
        aria-label="Use voice input"
      >
        {getIcon()}
      </Button>
    </div>
  );
}
