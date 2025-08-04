"use client";

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
        link: "/privacy-policy"
    },
    {
        name: "discord",
        link: "/discord"
    },
    {
        name: "Telegram",
        link: "/telegram"
    },
    {
        name: "Youtube",
        link: "/youtube"
    }
];

export default function Footer() {
    return (
        <div className="w-full px-12 pb-10 relative z-10 border-t-[1px] border-[#111111] bg-[rgba(207,255,41,0.50)] text-[#111111]">
            <div className="py-[32px] text-[86px] leading-[183.721%] mb-[32px]">All-in-One AEO Suite .</div>

            <div className="flex items-center justify-between">
                <div className="flex gap-[105px]">
                    {data.map((item) => (
                        <div key={item.name}>
                            <div className="text-[17px] leading-[99.773%] mb-[17px]">{item.name}</div>
                            {item.items.map((item) => (
                                <div key={item.name} className="text-[14px] leading-[100%] mb-[13px] text-[#5A585A]">{item.name}</div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex gap-[15.8px]">
                    {moreData.map((item) => (
                        <div key={item.name}>
                            <div>{item.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
