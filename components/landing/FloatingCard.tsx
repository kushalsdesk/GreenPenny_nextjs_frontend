import { motion } from "framer-motion";
import Image from "next/image";

const FloatingCard = () => {
  return (
    <motion.div
      className="absolute -right-1/12 top-12 md:top-20 md:-right-20 lg:right-0 lg:top-1/4 lg:translate-y-1/3 pointer-events-none z-0"
      initial={{
        x: 200,
        opacity: 0,
        rotate: 10,
      }}
      animate={{
        x: 0,
        opacity: 1,
        rotate: -15,
      }}
      transition={{
        duration: 1.5,
        delay: 0.3,
        type: "spring",
        stiffness: 60,
        damping: 15,
      }}
    >
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [15, 18, 15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-48 sm:w-80 lg:w-[400px] xl:w-[500px]"
      >
        <Image
          src="/assets/card_view.png"
          alt="Debit Card"
          width={1000}
          height={630}
          className="w-full h-auto drop-shadow-2xl"
          priority
          unoptimized
          quality={100}
        />
      </motion.div>
    </motion.div>
  );
};

export default FloatingCard;
