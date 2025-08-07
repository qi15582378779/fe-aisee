'use client'

import { useState } from 'react'
import { AnimatedSwitcher } from '@/components/ui/AnimatedSwitcher'

const demoItems = [
  {
    id: 1,
    content: (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-gray-200">
        <div className="text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">第一个元素</h2>
          <p className="text-gray-600">这是第一个元素的内容</p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    content: (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-gray-200">
        <div className="text-center">
          <div className="text-6xl mb-4">⚡</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">第二个元素</h2>
          <p className="text-gray-600">这是第二个元素的内容</p>
        </div>
      </div>
    )
  },
  {
    id: 3,
    content: (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl border border-gray-200">
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">第三个元素</h2>
          <p className="text-gray-600">这是第三个元素的内容</p>
        </div>
      </div>
    )
  },
  {
    id: 4,
    content: (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl border border-gray-200">
        <div className="text-center">
          <div className="text-6xl mb-4">🌟</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">第四个元素</h2>
          <p className="text-gray-600">这是第四个元素的内容</p>
        </div>
      </div>
    )
  }
]

export default function AnimatedSwitcherDemo() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [newElementDelay, setNewElementDelay] = useState(0)
  const [newElementDuration, setNewElementDuration] = useState(0.6)
  const [oldElementDelay, setOldElementDelay] = useState(0)
  const [oldElementDuration, setOldElementDuration] = useState(0.6)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            动画切换效果演示
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            点击下方的按钮来体验动画切换效果。新元素会从底部升起，当前元素会缩小并沿z轴向后移动。
          </p>
        </div>

        {/* 控制面板 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 新元素延迟 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">新元素延迟 (秒)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={newElementDelay}
                onChange={(e) => setNewElementDelay(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 新元素时长 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">新元素时长 (秒)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={newElementDuration}
                onChange={(e) => setNewElementDuration(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 旧元素延迟 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">旧元素延迟 (秒)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={oldElementDelay}
                onChange={(e) => setOldElementDelay(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 旧元素时长 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">旧元素时长 (秒)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={oldElementDuration}
                onChange={(e) => setOldElementDuration(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              {demoItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                    index === currentIndex 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <AnimatedSwitcher 
            items={demoItems}
            className="w-full h-96"
            activeIndex={currentIndex}
            onIndexChange={setCurrentIndex}
            newElementDelay={newElementDelay}
            newElementDuration={newElementDuration}
            oldElementDelay={oldElementDelay}
            oldElementDuration={oldElementDuration}
          />
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            滑动动画特性
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">⬆️</div>
              <h4 className="font-semibold text-gray-800 mb-2">新元素升起</h4>
              <p className="text-gray-600 text-sm">新元素从容器底部向上滑动到顶部</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">⬇️</div>
              <h4 className="font-semibold text-gray-800 mb-2">旧元素退出</h4>
              <p className="text-gray-600 text-sm">旧元素向下滑动离开，同时缩小并向后移动</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">⏱️</div>
              <h4 className="font-semibold text-gray-800 mb-2">错开时间</h4>
              <p className="text-gray-600 text-sm">新元素延迟1秒进入，创造自然的过渡效果</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            高级功能
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🎮</div>
              <h4 className="font-semibold text-gray-800 mb-2">手动控制</h4>
              <p className="text-gray-600 text-sm">点击按钮手动切换元素</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">⏱️</div>
              <h4 className="font-semibold text-gray-800 mb-2">自动播放</h4>
              <p className="text-gray-600 text-sm">支持自动循环播放功能</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 