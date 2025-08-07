"use client";

import Image from "next/image";

const data = [
    {
        title: "AI Visibility Audit",
        des: "Scan your entire content stack — website, docs, Mirror, and social — to check how AI sees your project."
    },
    {
        title: "End-to-end AEO lifecycle",
        des: "From analysis to feedback to optimization, streamline every step to improve AI discoverability."
    },
    {
        title: "Auto-Optimization",
        des: "Let AIsee’s agent rewrite and deploy content automatically — no manual editing needed."
    },
    {
        title: "Performance Analytics",
        des: "Track your project's AI search visibility before and after optimization with measurable results."
    }
];

export default function Slider3() {
    return (
        <div className="w-full px-12 py-[72px] relative z-10">
            <div className="grid grid-cols-4 gap-8">
                {data.map((item, index) => (
                    <div key={index} className="text-[#111111]">
                        {index === 0 && (
                            <div className="w-[40px] h-[40px] rounded-[12px] border border-[#111111] bg-[#FFD0FF] flex items-center justify-center overflow-hidden">
                                <Image src="/images/slider_3/001.gif" alt="slider_3" width={36} height={36} className="w-[36px] max-w-[70%]" />
                            </div>
                        )}

                        {index === 1 && (
                            <div className="w-[40px] h-[40px] rounded-[50%] border border-[#111111] bg-[#BDF9FE] flex items-center justify-center overflow-hidden">
                                <Image src="/images/slider_3/002.gif" alt="slider_3" width={24} height={20} className="w-[24px] max-w-[70%]" />
                            </div>
                        )}

                        {index === 2 && (
                            <div className="w-[40px] h-[40px] rounded-[12px] border border-[#111111] bg-[#D9D9D9] flex items-center justify-center overflow-hidden">
                                <Image src="/images/slider_3/003.gif" alt="slider_3" width={26} height={26} className="w-[26px] max-w-[70%]" />
                            </div>
                        )}

                        {index === 3 && (
                            <div className="w-[40px] h-[40px] rounded-[12px] border border-[#111111] bg-[#D9D9D9] flex items-center justify-center overflow-hidden">
                                <Image src="/images/slider_3/003.gif" alt="slider_3" width={26} height={26} className="w-[26px] max-w-[70%]" />
                            </div>
                        )}

                        <p className="text-[24px] leading-[133.333%] mt-6 mb-2">{item.title}</p>
                        <p className="text-[16px] leading-[150%]">{item.des}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
