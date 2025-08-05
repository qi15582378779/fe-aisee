"use client";

import Image from "next/image";
import ImageTrail from "./ui/ImageTrail";
import TextType from "./ui/TextType";

const data = [
    {
        name: "Product",
        items: [
            {
                name: "Product01",
                link: "/product01"
            },
            {
                name: "Product02",
                link: "/product02"
            }
        ]
    },
    {
        name: "Company",
        items: [
            {
                name: "About",
                link: "/about"
            }
        ]
    },
    {
        name: "Resources",
        items: [
            {
                name: "Docs",
                link: "/docs"
            }
        ]
    }
];

const moreData = [
    {
        name: "x",
        icon: "/images/footer/x.svg",
        link: ""
    },
    {
        name: "discord",
        icon: "/images/footer/discord.svg",
        link: "/discord"
    },
    {
        name: "Telegram",
        icon: "/images/footer/telegram.svg",
        link: "/telegram"
    },
    {
        name: "Coingecko",
        icon: "/images/footer/coingecko.svg",
        link: "/youtube"
    }
];

export default function Footer() {
    return (
        <div className="w-full px-12 pb-10 relative z-10 border-t-[1px] border-[#111111] bg-[rgba(207,255,41,0.50)] text-[#111111] overflow-hidden">
            <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
                <ImageTrail key={1} items={["/images/footer/001.svg", "/images/footer/002.svg", "/images/footer/003.svg", "/images/footer/004.svg", "/images/footer/005.svg"]} variant={1} imageSize="w-[64px] h-[64px]" />
            </div>

            <div className="py-[32px] text-[86px] leading-[183.721%] mb-[32px]">
                <TextType //
                    text={["All-in-One AEO Suite", "All-in-One AEO Suite"]}
                    typingSpeed={100}
                    deletingSpeed={70}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="."
                    textColors={["#111111", "#111111"]}
                    loop={true}
                    startOnVisible={true}
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex gap-[105px] relative z-[100]">
                    {data.map((item) => (
                        <div key={item.name}>
                            <div className="text-[17px] leading-[99.773%] mb-[17px]">{item.name}</div>
                            {item.items.map((item) => (
                                <div key={item.name} className="text-[14px] leading-[100%] mb-[13px] text-[#5A585A]">
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex gap-[15.8px] relative z-[100]">
                    {moreData.map((item, index) => (
                        <div key={item.name} className="w-[35px] h-[35px] rounded-full border-[1.2px] border-[#111111] flex items-center justify-center cursor-pointer overflow-hidden  hover:scale-110 transition-all duration-300">
                            <Image src={item.icon} alt={item.name} width={index === 3 ? 31 : 18} height={index === 3 ? 31 : 18} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
