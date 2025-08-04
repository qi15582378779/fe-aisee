import RotatingOrbitalAnimation from "@/components/RotatingOrbitalAnimation";

export default function AnimationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          旋转轨道动画效果
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <RotatingOrbitalAnimation />
        </div>
        
        <div className="mt-12 text-center text-white">
          <p className="text-lg mb-4">
            动画说明：每过一秒，四周的图标会绕着中心旋转90度，同时放大1.5倍
          </p>
          <p className="text-lg mb-4">
            中心图标也会同步放大1.3倍，然后所有元素缩小回原始大小
          </p>
          <p className="text-lg">
            这个循环会一直重复进行
          </p>
        </div>
      </div>
    </div>
  );
} 