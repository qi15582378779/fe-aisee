import Image from "next/image";

export default function Header() {
    return (
        <header className="bg-white/40 backdrop-blur-[2px] flex flex-row items-center justify-between px-12 py-[13px] min-h-[44px] fixed top-0 left-0 right-0 z-20 max-md:px-4">
            <div className="flex flex-row items-center gap-2 cursor-pointer">
                <div className="w-[25px] h-[25px] rounded-t-full overflow-hidden flex items-center justify-center">
                    <Image alt="Logo" className="w-[28px] h-[28px] rounded-t-full" src="/images/logo.gif" width={28} height={28} />
                </div>
                <Image alt="Logo" className="w-[80px] h-[24px]" src="/images/aisee.svg" width={80} height={24} />
            </div>

            <button
                className="btn-59 cursor-pointer relative"
                onClick={() => {
                    window.open("https://docs.google.com/forms/d/e/1FAIpQLScj3PnIDoKl1_5aG9BdnkZtKY1XU_6W2-pe7l1pczH6m-urwA/viewform?usp=dialog", "_blank");
                }}
            >
                <span className="border-solid border-[#111111] border px-4 py-2.5 rounded-[9999px] text-[16px] leading-[150%] uppercase text-[#111111] max-md:text-[14px]">Get Started</span>
            </button>
        </header>
    );
}
