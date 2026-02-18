"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function NewDonationPage() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        allergens: "",
        type: "",
        location: "",
        expiryDate: "",
        expiryTime: "",
        image: null as File | null,
    });

    // 📍 Auto Get Real-Time Location
    // 📍 Auto Get Real Place Name Instead of Coordinates
    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const res = await fetch(
                    `/api/reverse-geocode?lat=${latitude}&lon=${longitude}`
                );

                const data = await res.json();

                const city =
                    data.address.city ||
                    data.address.town ||
                    data.address.village ||
                    "";

                const state = data.address.state || "";

                const formattedLocation =
                    city && state
                        ? `${city}, ${state}`
                        : city || `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;

                setFormData((prev) => ({
                    ...prev,
                    location: formattedLocation,
                }));
            } catch {
                setFormData((prev) => ({
                    ...prev,
                    location: "Location unavailable",
                }));
            }
        });
    }, []);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, image: e.target.files?.[0] || null });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 🔥 Combine Date + Time into one ISO format
        const combinedExpiry = new Date(
            `${formData.expiryDate}T${formData.expiryTime}`
        ).toISOString();


        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("allergens", formData.allergens);
        data.append("type", formData.type);
        data.append("location", formData.location);
        data.append("expiryDate", combinedExpiry);

        if (formData.image) {
            data.append("image", formData.image);
        }

        const res = await fetch("/api/donations", {
            method: "POST",
            body: data,
        });

        if (res.ok) {
            window.location.href = "/donate";
        } else {
            alert("Error posting donation");
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header title="New Donation" />

            <main className="flex-1 p-6 flex justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg space-y-4 border p-6 rounded-lg shadow"
                >
                    {/* Food Name */}
                    <input
                        name="name"
                        placeholder="Food Name"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    {/* Description */}
                    <textarea
                        name="description"
                        placeholder="Description"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    {/* Allergens */}
                    <input
                        name="allergens"
                        placeholder="Allergens (e.g. Nuts, Gluten)"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />

                    {/* Food Type */}
                    <input
                        name="type"
                        placeholder="Food Type (Breakfast, Lunch, Dinner)"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    {/* Pickup Location (Auto Filled) */}
                    <input
                        name="location"
                        placeholder="Pickup Location"
                        value={formData.location}
                        className="w-full border p-2 rounded"
                        readOnly
                    />


                    {/* Expiry Date */}
                    <label className="text-sm font-medium">Expiry Date</label>
                    <input
                        type="date"
                        name="expiryDate"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    {/* Expiry Time */}
                    <label className="text-sm font-medium">Expiry Time</label>
                    <input
                        type="time"
                        name="expiryTime"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    {/* Image Upload */}
                    <label className="text-sm font-medium">Upload Food Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full"
                        onChange={handleFile}
                        required
                    />

                    <Button type="submit" className="w-full">
                        Post Donation
                    </Button>
                </form>
            </main>
        </div>
    );
}
