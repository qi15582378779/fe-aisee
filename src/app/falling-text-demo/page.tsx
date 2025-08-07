import FallingText from "@/components/ui/FallingText";

export default function FallingTextDemo() {
    // 示例1：按逗号分割，带自定义样式
    const customText = "React,TypeScript,Next.js,Tailwind CSS,Matter.js";
    const customSpanStyles = [
        { backgroundColor: "#ff6b6b", color: "white", padding: "8px 12px", borderRadius: "8px" },
        { backgroundColor: "#4ecdc4", color: "white", padding: "8px 12px", borderRadius: "8px" },
        { backgroundColor: "#45b7d1", color: "white", padding: "8px 12px", borderRadius: "8px" },
        { backgroundColor: "#96ceb4", color: "white", padding: "8px 12px", borderRadius: "8px" },
        { backgroundColor: "#feca57", color: "black", padding: "8px 12px", borderRadius: "8px" }
    ];

    // 示例2：按其他符号分割
    const pipeText = "创意|设计|开发|动画|交互";
    const pipeSpanStyles = [
        { backgroundColor: "#ff9ff3", color: "white", fontWeight: "bold", fontSize: "1.2rem" },
        { backgroundColor: "#54a0ff", color: "white", fontWeight: "bold", fontSize: "1.2rem" },
        { backgroundColor: "#5f27cd", color: "white", fontWeight: "bold", fontSize: "1.2rem" },
        { backgroundColor: "#00d2d3", color: "white", fontWeight: "bold", fontSize: "1.2rem" },
        { backgroundColor: "#ff9f43", color: "white", fontWeight: "bold", fontSize: "1.2rem" }
    ];

    // 示例3：混合样式
    const mixedText = "前端,后端,数据库,云服务,AI";
    const mixedSpanStyles = [
        { backgroundColor: "linear-gradient(45deg, #ff6b6b, #ee5a24)", color: "white", padding: "10px 15px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" },
        { backgroundColor: "linear-gradient(45deg, #4ecdc4, #44a08d)", color: "white", padding: "10px 15px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" },
        { backgroundColor: "linear-gradient(45deg, #45b7d1, #96c93d)", color: "white", padding: "10px 15px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" },
        { backgroundColor: "linear-gradient(45deg, #feca57, #ff9ff3)", color: "black", padding: "10px 15px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" },
        { backgroundColor: "linear-gradient(45deg, #5f27cd, #00d2d3)", color: "white", padding: "10px 15px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8">
            <div className="max-w-6xl mx-auto space-y-16">
                <h1 className="text-4xl font-bold text-white text-center mb-8">
                    FallingText 组件演示
                </h1>

                {/* 示例1：基础逗号分割 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">示例1：按逗号分割 + 自定义样式</h2>
                    <div className="h-64 bg-black/20 rounded-lg">
                        <FallingText
                            text={customText}
                            separator=","
                            spanStyles={customSpanStyles}
                            trigger="auto"
                            gravity={0.8}
                            fontSize="1.5rem"
                        />
                    </div>
                </div>

                {/* 示例2：按管道符分割 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">示例2：按管道符分割</h2>
                    <div className="h-64 bg-black/20 rounded-lg">
                        <FallingText
                            text={pipeText}
                            separator="|"
                            spanStyles={pipeSpanStyles}
                            trigger="scroll"
                            gravity={1.2}
                            fontSize="1.8rem"
                        />
                    </div>
                </div>

                {/* 示例3：渐变背景 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">示例3：渐变背景效果</h2>
                    <div className="h-64 bg-black/20 rounded-lg">
                        <FallingText
                            text={mixedText}
                            separator=","
                            spanStyles={mixedSpanStyles}
                            trigger="click"
                            gravity={1.0}
                            fontSize="1.6rem"
                        />
                    </div>
                </div>

                {/* 示例4：高亮功能 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">示例4：高亮功能 + 混合样式</h2>
                    <div className="h-64 bg-black/20 rounded-lg">
                        <FallingText
                            text="React,TypeScript,Next.js,Tailwind CSS,Matter.js"
                            separator=","
                            highlightWords={["React", "TypeScript"]}
                            spanStyles={[
                                { backgroundColor: "#61dafb", color: "black", padding: "8px 12px", borderRadius: "6px" },
                                { backgroundColor: "#3178c6", color: "white", padding: "8px 12px", borderRadius: "6px" },
                                { backgroundColor: "#000000", color: "white", padding: "8px 12px", borderRadius: "6px" },
                                { backgroundColor: "#06b6d4", color: "white", padding: "8px 12px", borderRadius: "6px" },
                                { backgroundColor: "#f7df1e", color: "black", padding: "8px 12px", borderRadius: "6px" }
                            ]}
                            trigger="hover"
                            gravity={0.9}
                            fontSize="1.4rem"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}