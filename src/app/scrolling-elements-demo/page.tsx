import ScrollingElements from '@/components/ui/ScrollingElements';

export default function ScrollingElementsDemo() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-8">滚动元素动画演示</h1>
      
      <div className="w-full max-w-md">
        <ScrollingElements 
          className="w-full" 
          containerHeight={500}
          gap={150}
          xOffset={300}
          duration={30}
        />
      </div>
      
      <div className="mt-8 text-white text-center">
        <p className="text-lg mb-4">效果说明：</p>
        <ul className="text-sm space-y-2 text-gray-300">
          <li>• 容器高度：300px</li>
          <li>• 元素从顶部开始向下滚动</li>
          <li>• 在容器中间位置时偏移为0</li>
          <li>• 在顶部和底部时偏移为300px</li>
          <li>• 元素间距：150px，动画时长：30秒</li>
        </ul>
      </div>
    </div>
  );
} 