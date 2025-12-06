"use client";

import { motion } from "framer-motion";
import { DollarSign, Euro, PoundSterling, IndianRupee } from "lucide-react";
import { JSX } from "react";

type CornerType = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

interface Currency {
  id: number;
  icon: JSX.Element;
  corner: CornerType;
}

export function CurrencyFloats() {
  const currencies: Currency[] = [
    {
      id: 1,
      icon: <DollarSign className="text-primary w-6 h-6" />,
      corner: "topLeft",
    },
    {
      id: 2,
      icon: <Euro className="text-primary w-6 h-6" />,
      corner: "topRight",
    },
    {
      id: 3,
      icon: <PoundSterling className="text-primary w-6 h-6" />,
      corner: "bottomLeft",
    },
    {
      id: 4,
      icon: <IndianRupee className="text-primary w-6 h-6" />,
      corner: "bottomRight",
    },
  ];

  const getPosition = (corner: CornerType) => {
    const distanceX = 250;
    const distanceY = 100;

    const positions = {
      topLeft: { x: -distanceX, y: -distanceY },
      topRight: { x: distanceX, y: -distanceY },
      bottomLeft: { x: -distanceX, y: distanceY },
      bottomRight: { x: distanceX, y: distanceY },
    };

    return positions[corner];
  };

  return (
    <div className="relative flex items-center justify-center w-full h-0">
      {currencies.map((currency, index) => {
        const position = getPosition(currency.corner);

        return (
          <motion.div
            key={currency.id}
            className="absolute flex items-center justify-center w-14 h-14 rounded-xl
                       bg-white/50 backdrop-blur-md border border-white/40 shadow-md"
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              x: position.x,
              y: position.y,
              opacity: 0.95,
              scale: 1,
            }}
            transition={{
              duration: 2.5,
              delay: index * 0.15,
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
          >
            {currency.icon}
          </motion.div>
        );
      })}
    </div>
  );
}
