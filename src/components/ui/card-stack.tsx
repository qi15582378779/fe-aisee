// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "motion/react";
// import Image from "next/image";

// let interval: NodeJS.Timeout;

// type Card = {
//     id: number | string;
//     img: string;
// };

// export const CardStack = ({ items, offset, scaleFactor }: { items: Card[]; offset?: number; scaleFactor?: number }) => {
//     const CARD_OFFSET = offset || 10;
//     const SCALE_FACTOR = scaleFactor || 0.1;
//     const [cards, setCards] = useState<Card[]>(items);

//     useEffect(() => {
//         startFlipping();

//         return () => clearInterval(interval);
//     }, []);
//     const startFlipping = () => {
//         interval = setInterval(() => {
//             setCards((prevCards: Card[]) => {
//                 const newArray = [...prevCards]; // create a copy of the array
//                 newArray.unshift(newArray.pop()!); // move the last element to the front
//                 return newArray;
//             });
//         }, 5000);
//     };

//     return (
//         <div className="relative w-full flex items-center justify-center">
//             {cards.map((card, index) => {
//                 return (
//                     <motion.div
//                         key={card.id}
//                         className="absolute top-1/2"
//                         style={{
//                             transformOrigin: "center center"
//                         }}
//                         animate={{
//                             top: index * -CARD_OFFSET,
//                             scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
//                             zIndex: cards.length - index //  decrease z-index for the cards that are behind
//                         }}
//                     >
//                         {card.img && <Image src={card.img} alt={card.id.toString()} width={304} height={56} />}
//                     </motion.div>
//                 );
//             })}
//         </div>
//     );
// };

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const items = [
  { id: 1, icon: "🟨", name: "Notion" },
  { id: 2, icon: "⚪️", name: "OpenAI" },
  { id: 3, icon: "🟩", name: "Zapier" },
  { id: 4, icon: "🟧", name: "Other" },
];

type AnimatedItem = {
  uniqueKey: string;
  item: typeof items[number];
};

export const CardStack = () => {
  const [visibleItems, setVisibleItems] = useState<AnimatedItem[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setVisibleItems((prev) => {
        if (index >= items.length) {
          // Restart
          index = 0;
          return [];
        } else {
          const newItem: AnimatedItem = {
            uniqueKey: `${items[index].id}-${counterRef.current++}`, // 👈 保证唯一
            item: items[index],
          };
          index++;
          return [...prev, newItem];
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center overflow-hidden">
      <div className="relative space-y-[-40px]">
        <AnimatePresence initial={false}>
          {visibleItems.map(({ uniqueKey, item }) => (
            <motion.div
              key={uniqueKey}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative z-10 bg-white rounded-2xl px-6 py-4 shadow-lg w-96 border border-black flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{item.icon}</div>
                <div>{item.name}</div>
              </div>
              <div className="w-6 h-6 bg-lime-300 rounded-full flex items-center justify-center">
                ✔️
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};


