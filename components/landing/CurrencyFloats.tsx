"use client";

import { motion } from "framer-motion";
import { DollarSign, Euro, PoundSterling, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

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
        <PoundSterling className="text-white w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
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
    // Responsive distances based on screen size
    const distanceX = isMobile ? 150 : 250;
    const distanceY = isMobile ? 80 : 100;

    const positions = {
      topLeft: { x: -distanceX, y: -distanceY },
      topRight: { x: distanceX, y: -distanceY },
      bottomLeft: { x: -distanceX, y: distanceY },
      bottomRight: { x: distanceX, y: distanceY },
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
            className="absolute flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl
                       bg-primary/40 backdrop-blur-md border border-primary/40 shadow-green-900/30 shadow-md"
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              x: position.x,
              y: position.y,
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
