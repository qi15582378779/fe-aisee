"use client";

import Image from "next/image";
import { stackImages, listImages, cardStackImages } from "@/lib/imageConfigs";
import Stack from "@/components/ui/Stack";
import { AnimatedList } from "@/components/magicui/animated-list";
import { CardStack } from "@/components/ui/card-stack";
import { StackedCards } from "@/components/ui/StackedCards";

const data = [
    {
        title: "AEO Diagnostic Engine",
        des: "Analyze your website or product across AI search engines and output an AEO Score.",
        bg: "#D2F6A7"
    },
    {
        title: "Optimization Recommendation Engine",
        des: "Actionable improvements based on scoring output.",
        bg: "#FFD0E2"
    },
    {
        title: "Agent Executor",
        des: "Let an AI Agent complete tasks across content, code, or deployment.",
        bg: "#FCEA59"
    }
];

export default function Slider4() {
    return (
        <div className="w-full px-12 pb-[72px] relative z-10">
            <div className="grid grid-cols-2 items-center mb-10">
                <div></div>
                <div className="flex gap-[4.3px] items-baseline text-[#111111] text-[35.1px] leading-[80.057%]">
                    <span className="flex w-[7px] h-[7px] rounded-full bg-[#FF5A4D]"></span>
                    Features Page
                </div>
            </div>

            <div className="flex flex-col justify-center items-center text-[#111111] text-[84.3px] leading-[108.327%] mb-[48px]">
                <div className="flex items-center gap-6">
                    Explore the
                    <div className="flex items-center justify-center border border-[#111111] rounded-full bg-[#E6FFF9] w-[72px] h-[72px]">
                        <Image src="/images/slider_4/1.gif" alt="arrow" width={48} height={48} />
                    </div>
                    Core Features of
                </div>
                <p>AIsee&apos;s AEO Engine</p>
            </div>

            <div className="grid grid-cols-3 gap-[26px]">
                {data.map((item, index) => (
                    <div key={index} style={{ backgroundColor: item.bg }} className="pt-8 px-6 rounded-[24px] text-[#111111]">
                        <p className="text-[36px] leading-[133.333%] tracking-[-1.25px] mb-4">{item.title}</p>
                        <p className="text-[18px] leading-[133.333%]">{item.des}</p>

                        {index === 0 && (
                            <div className="w-full mt-[32px] flex items-center justify-center hover:-translate-y-1.5 transition-all duration-300">
                                <Stack //
                                    randomRotation={false}
                                    sensitivity={180}
                                    sendToBackOnClick={true}
                                    cardDimensions={{ width: 250, height: 200 }}
                                    cardsData={stackImages}
                                />
                            </div>
                        )}

                        {index === 1 && (
                            <div className="w-full h-[200px] overflow-hidden mt-[32px] flex justify-center">
                                <AnimatedList delay={2000}>
                                    {listImages.map((item) => (
                                        <Image key={item.id} src={item.img} alt="list" width={304} height={100} />
                                    ))}
                                </AnimatedList>
                            </div>
                        )}

                        {index === 2 && (
                            <div className="w-full h-[200px] overflow-hidden mt-[32px] flex justify-center">
                                {/* <CardStack /> */}
                                <StackedCards />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
