import { NextResponse } from "next/server";

let donations: any[] = [];

export async function GET() {
    return NextResponse.json(donations);
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get("image") as File | null;

        let imageUrl = "";

        if (file && file.size > 0) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const base64 = buffer.toString("base64");
            imageUrl = `data:${file.type};base64,${base64}`;
        }

        const newDonation = {
            id: Date.now(),
            name: formData.get("name"),
            description: formData.get("description"),
            allergens: formData.get("allergens"),
            type: formData.get("type"),
            location: formData.get("location"),
            expiryDate: formData.get("expiryDate"),
            imageUrl,
            reviews: [],
        };

        donations.push(newDonation);

        return NextResponse.json(newDonation);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to post donation" },
            { status: 500 }
        );
    }
}
