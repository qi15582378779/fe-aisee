"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * AnimatedSwitcher - 动画切换组件
 *
 * 使用示例:
 * ```tsx
 * const items = [
 *   {
 *     id: 1,
 *     label: '第一个',
 *     content: <div>第一个元素内容</div>
 *   },
 *   {
 *     id: 2,
 *     label: '第二个',
 *     content: <div>第二个元素内容</div>
 *   }
 * ]
 *
 * <AnimatedSwitcher
 *   items={items}
 *   animationType="slide"
 *   autoPlay={true}
 *   autoPlayInterval={3000}
 * />
 * ```
 */

interface AnimatedSwitcherProps {
    items: {
        id: string | number;
        content: React.ReactNode;
    }[];
    className?: string;
    duration?: number;
    newElementDelay?: number;
    newElementDuration?: number;
    oldElementDelay?: number;
    oldElementDuration?: number;
    activeIndex?: number;
    onIndexChange?: (index: number) => void;
}

export const AnimatedSwitcher: React.FC<AnimatedSwitcherProps> = ({ 
    items, 
    className = "", 
    duration = 0.6,
    newElementDelay = 0,
    newElementDuration = 0.6,
    oldElementDelay = 0,
    oldElementDuration = 0.6,
    activeIndex: externalActiveIndex,
    onIndexChange
}) => {
    const [internalActiveIndex, setInternalActiveIndex] = useState(0);
    const previousIndexRef = useRef<number | null>(null);
    
    const activeIndex = externalActiveIndex !== undefined ? externalActiveIndex : internalActiveIndex;
    
    const handleIndexChange = (index: number) => {
        if (onIndexChange) {
            onIndexChange(index);
        } else {
            setInternalActiveIndex(index);
        }
    };

    // 当 activeIndex 变化时，记录上一个索引
    React.useEffect(() => {
        if (previousIndexRef.current === null) {
            previousIndexRef.current = activeIndex;
        } else if (activeIndex !== previousIndexRef.current) {
            // 保存当前索引作为上一个索引，然后更新当前索引
            const currentPrevious = previousIndexRef.current;
            previousIndexRef.current = activeIndex;
            // 这里我们不需要重新渲染，因为我们会使用 ref 的值
        }
    }, [activeIndex]);

    // 动画变体配置
    const getAnimationVariants = () => {
        const newElementTransition = {
            duration: newElementDuration,
            delay: newElementDelay,
            ease: [0.4, 0, 0.2, 1] as const
        };

        const oldElementTransition = {
            duration: oldElementDuration,
            delay: oldElementDelay,
            ease: [0.4, 0, 0.2, 1] as const
        };

        return {
            initial: {
                y: 384
            },
            animate: {
                y: 0
            },
            exit: {
                y: 100,
                scale: 0.8,
                z: -100
            },
            newElementTransition,
            oldElementTransition
        };
    };

    const variants = getAnimationVariants();

    return (
        <div className={className}>
            <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence mode="sync">
                    {/* 新元素 */}
                    {items.map(
                        (item, index) =>
                            index === activeIndex && (
                                <motion.div 
                                    key={`new-${item.id}`} 
                                    className="absolute inset-0 w-full h-full" 
                                    initial={variants.initial} 
                                    animate={variants.animate} 
                                    exit={variants.exit} 
                                    transition={variants.newElementTransition} 
                                    style={{ zIndex: 10 }}
                                >
                                    {item.content}
                                </motion.div>
                            )
                    )}

                    {/* 旧元素 - 只显示上一个元素 */}
                    {previousIndexRef.current !== null && previousIndexRef.current !== activeIndex && items[previousIndexRef.current] && (
                        <motion.div 
                            key={`old-${items[previousIndexRef.current].id}`} 
                            className="absolute inset-0 w-full h-full" 
                            initial={{ y: 0, scale: 1, z: 0 }} 
                            animate={variants.exit} 
                            exit={variants.exit} 
                            transition={variants.oldElementTransition} 
                            style={{ zIndex: 1 }}
                        >
                            {items[previousIndexRef.current].content}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
