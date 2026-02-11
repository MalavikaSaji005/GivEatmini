import { Header } from "@/components/Header";
import { PostFoodForm } from "@/components/PostFoodForm";

export default function NewDonationPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header title="New Donation" />
            <main className="flex-1 p-4 sm:p-6 md:p-8 flex items-center justify-center">
                <PostFoodForm formType="donate" />
            </main>
        </div>
    );
}
