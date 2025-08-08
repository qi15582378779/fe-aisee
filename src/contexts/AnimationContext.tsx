"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface AnimationState {
    [key: string]: boolean;
}

interface AnimationConfig {
    [key: string]: boolean; // repeatAnimation setting for each component
}

interface AnimationContextType {
    registerAnimation: (id: string, repeatAnimation: boolean) => void;
    isVisible: (id: string) => boolean;
    setRef: (id: string, ref: React.RefObject<HTMLElement | null>) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

interface AnimationProviderProps {
    children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
    const [animationStates, setAnimationStates] = useState<AnimationState>({});
    const [animationConfigs, setAnimationConfigs] = useState<AnimationConfig>({});
    const refs = useRef<{ [key: string]: React.RefObject<HTMLElement | null> }>({});
    const observers = useRef<{ [key: string]: IntersectionObserver }>({});

    const registerAnimation = (id: string, repeatAnimation: boolean) => {
        setAnimationConfigs(prev => ({
            ...prev,
            [id]: repeatAnimation
        }));
    };

    const isVisible = (id: string) => {
        return animationStates[id] || false;
    };

    const setRef = (id: string, ref: React.RefObject<HTMLElement | null>) => {
        refs.current[id] = ref;
    };

    useEffect(() => {
        // clear previous observers
        Object.values(observers.current).forEach(observer => observer.disconnect());
        observers.current = {};

        // create observers for each registered component
        Object.keys(animationConfigs).forEach(id => {
            const ref = refs.current[id];
            const repeatAnimation = animationConfigs[id];

            if (ref?.current) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setAnimationStates(prev => ({
                                ...prev,
                                [id]: true
                            }));
                            // if not repeat animation, stop observing
                            if (!repeatAnimation) {
                                observer.unobserve(entry.target);
                            }
                        } else if (repeatAnimation) {
                            // if repeat animation and element leaves viewport, reset state
                            setAnimationStates(prev => ({
                                ...prev,
                                [id]: false
                            }));
                        }
                    },
                    {
                        threshold: 0.2,
                        rootMargin: "0px 0px 0px 0px"
                    }
                );

                observer.observe(ref.current);
                observers.current[id] = observer;
            }
        });

        // clear function
        return () => {
            Object.values(observers.current).forEach(observer => observer.disconnect());
        };
    }, [animationConfigs]);

    const value: AnimationContextType = {
        registerAnimation,
        isVisible,
        setRef
    };

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
}

export function useAnimation() {
    const context = useContext(AnimationContext);
    if (context === undefined) {
        throw new Error('useAnimation must be used within an AnimationProvider');
    }
    return context;
} 