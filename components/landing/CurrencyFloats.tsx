"use client";

import { motion } from "framer-motion";
import { DollarSign, Euro, IndianRupee, JapaneseYen } from "lucide-react";
import { JSX, useEffect, useState } from "react";

type CornerType = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

interface Currency {
  id: number;
  icon: JSX.Element;
  corner: CornerType;
}

export function CurrencyFloats() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const currencies: Currency[] = [
    {
      id: 1,
      icon: (
        <DollarSign className="text-white font-semibold w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      ),
      corner: "topLeft",
    },
    {
      id: 2,
      icon: <Euro className="text-white w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      corner: "topRight",
    },
    {
      id: 3,
      icon: (
        <JapaneseYen className="text-white w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      ),
      corner: "bottomLeft",
    },
    {
      id: 4,
      icon: (
        <IndianRupee className="text-white w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      ),
      corner: "bottomRight",
    },
  ];

  const getPosition = (corner: CornerType) => {
    const shortDistance = isMobile ? 80 : 150;
    const longDistance = isMobile ? 160 : 280;

    const positions = {
      topLeft: { x: -shortDistance, y: 0 },
      topRight: { x: shortDistance, y: 0 },
      bottomLeft: { x: -longDistance, y: 0 },
      bottomRight: { x: longDistance, y: 0 },
    };

    return positions[corner];
  };

  return (
    <div className="relative flex items-center justify-center w-full h-0 overflow-visible">
      {currencies.map((currency, index) => {
        const position = getPosition(currency.corner);

        return (
          <motion.div
            key={currency.id}
            className="currency-float-card absolute flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              x: position.x,
              y: 0,
              opacity: isMobile ? 0.65 : 0.8,
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
