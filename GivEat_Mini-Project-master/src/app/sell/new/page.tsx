import { Header } from "@/components/Header";
import { PostFoodForm } from "@/components/PostFoodForm";

export default function NewSellItemPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header title="New Meal for Sale" />
            <main className="flex-1 p-4 sm:p-6 md:p-8 flex items-center justify-center">
                <PostFoodForm formType="sell" />
            </main>
        </div>
    );
}
