import { Header } from "@/components/Header";
import { CommunityCard } from "@/components/CommunityCard";
import type { CommunityMember } from "@/lib/types";

const communityMembers: CommunityMember[] = [
    { id: 1, name: 'Feeding Hope Foundation', role: 'NGO', location: 'City Center', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 2, name: 'The Good Samaritan Shelter', role: 'Shelter', location: 'North District', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 3, name: 'Jane Doe', role: 'Volunteer', location: 'West Suburbs', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 4, name: 'City Food Bank', role: 'NGO', location: 'East District', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 5, name: 'John Smith', role: 'Volunteer', location: 'City Center', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 6, name: 'Safe Haven', role: 'Shelter', location: 'South District', avatarUrl: 'https://placehold.co/100x100.png' },
];

export default function CommunityPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header title="Community Connect" />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <div className="container mx-auto">
                    <h2 className="mb-6 text-2xl font-bold">Local Partners & Volunteers</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {communityMembers.map((member) => (
                            <CommunityCard key={member.id} member={member} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
