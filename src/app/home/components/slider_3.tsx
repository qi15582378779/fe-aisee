"use client";

import Image from "next/image";
import { useAnimation } from "@/contexts/AnimationContext";
import { useRef, useEffect } from "react";

const data = [
    {
        title: "AI Visibility Audit",
        des: "Scan your entire content stack — website, docs, github, and social — to check how AI sees your project."
    },
    {
        title: "End-to-end AEO lifecycle",
        des: "From analysis to feedback to optimization, streamline every step to improve AI discoverability."
    },
    {
        title: "Auto-Optimization",
        des: `Let AIsee's agent rewrite and deploy content automatically — no manual editing needed.`
    },
    {
        title: "Performance Analytics",
        des: "Track your project's AI search visibility before and after optimization with measurable results."
    }
];

export default function Slider3() {
    const { registerAnimation, isVisible, setRef } = useAnimation();

    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        registerAnimation("slider3", false);
        setRef("slider3", sectionRef);
    }, []);

    const visible = isVisible("slider3");
    return (
        <section ref={sectionRef} className="w-full px-12 py-[72px] relative z-10 max-md:px-4 max-md:pt-[64px] max-md:pb-[32px] max-md:mb-[64px]">
            <div className="grid grid-cols-4 gap-8 max-md:grid-cols-1">
                {data.map((item, index) => (
                    <div //
                        key={index}
                        className={`text-[#111111] transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}
                        style={{ transitionDelay: `${(index + 1) * 500}ms` }}
                    >
                        {index === 0 && (
                            <div className={`w-[40px] h-[40px] rounded-[12px] border-[1.5px] border-[#111111] bg-[#FFD0FF] flex items-center justify-center overflow-hidden`}>
                                <Image src="/images/slider_3/001.gif" alt="slider_3" width={36} height={36} className="w-[36px] h-auto max-w-[70%]" />
                            </div>
                        )}

                        {index === 1 && (
                            <div className={`w-[40px] h-[40px] rounded-[50%] border-[1.5px] border-[#111111] bg-[#BDF9FE] flex items-center justify-center overflow-hidden`}>
                                <Image src="/images/slider_3/002.gif" alt="slider_3" width={24} height={20} className="w-[24px] h-auto max-w-[70%]" />
                            </div>
                        )}

                        {index === 2 && (
                            <div className={`w-[40px] h-[40px] rounded-[12px] border-[1.5px] border-[#111111] bg-[#D9D9D9] flex items-center justify-center overflow-hidden`}>
                                <Image src="/images/slider_3/003.gif" alt="slider_3" width={26} height={26} className="w-[26px] h-auto max-w-[70%]" />
                            </div>
                        )}

                        {index === 3 && (
                            <div className={`w-[40px] h-[40px] rounded-[50%] border-[1.5px] border-[#111111] bg-[#C1FF74] flex items-center justify-center overflow-hidden`}>
                                <div className="w-[26px] h-[26px] rounded-full overflow-hidden max-w-[70%] scale-[1.5]">
                                    <Image src="/images/slider_3/004.gif" alt="slider_3" width={28} height={28} className="w-[28px] h-[28px] object-cover" />
                                </div>
                            </div>
                        )}

                        <p className={`text-[24px] leading-[133.333%] mt-6 mb-2`}>{item.title}</p>
                        <p className={`text-[16px] leading-[150%]`}>{item.des}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
