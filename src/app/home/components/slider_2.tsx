"use client";

import RotatingOrbitalAnimation from "@/components/ui/ImageRotating";

const data: unknown[] = [
    {
        name: "Analyze"
    },
    {
        name: "Score"
    },
    {
        name: "Recommend"
    },
    {
        name: "Execute"
    },
    {
        name: "Verify"
    },
    {
        name: "Visibility Boost"
    }
];


export default function Slider2() {
    return (
        <div className="w-full pt-[96px] pb-[124px] bg-white/70 backdrop-blur-4px px-12 relative z-10">
            <div className="text-[#111111] min-h-[128px] mb-[112px] grid grid-cols-12 gap-12">
                <p className="text-[20px] leading-[140%] tracking-[0.5px] uppercase col-span-6">AEO Workflow</p>
                <p className="text-[22.313px] leading-[143.417%] col-span-6">AIsee boosts your Web3 project&apos;s visibility in AI search. Six smart steps. Fully automated. Measurable impact.</p>
            </div>

            <div className="grid grid-cols-12 gap-[132px]">
                <div className="col-span-4 max-w-full">
                    <div className="w-full h-[240px] rounded-[12px] overflow-hidden relative  border border-[#111111] border-solid mb-[20px]">
                        <RotatingOrbitalAnimation />
                    </div>

                    <p>AIsee crawls your project&apos;s website, Docs, Mirror posts, and Twitter threads to extract structured information. It identifies key modules like FAQs, Tokenomics, Roadmap, and Team intro, while simulating how ChatGPT or Perplexity perceives your content.</p>
                </div>

                <div className="col-span-8 flex flex-col">
                    {["Analyze", "Score", "Recommend", "Execute", "Verify", "Visibility Boost"].map((item, index) => (
                        <div key={index} className="text-[88px] leading-[109.091%] text-[#111111] uppercase opacity-[0.25] hover:opacity-100 transition-opacity duration-300">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
