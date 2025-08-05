import { StackedCards } from "@/components/ui/StackedCards";

export default function StackedCardsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">堆叠卡片动画</h1>
        <StackedCards />
      </div>
    </div>
  );
} 