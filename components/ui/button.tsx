"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface ButtonProps {
  buttonColor: string;
  buttonTextColor?: string;
  subscribeStatus: boolean;
  initialText: React.ReactElement | string;
  changeText: React.ReactElement | string;
  handleClick?: () => Promise<boolean>;
}

export const Button: React.FC<ButtonProps> = ({
  buttonColor,
  subscribeStatus,
  buttonTextColor,
  changeText,
  initialText,
  handleClick,
}) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribeStatus);

  const onClick = async () => {
    if (!isSubscribed && handleClick) {
      try {
        const success = await handleClick(); // Await the handleClick promise
        if (success) {
          setIsSubscribed(true); // Update isSubscribed state if handleClick was successful
        }
      } catch (error) {
        console.error("Error in handleClick:", error);
      }
    }
  };
  return (
    <AnimatePresence mode="wait">
      {isSubscribed ? (
        <motion.button
          className="relative flex md:w-3/4 w-5/6  items-center justify-center overflow-hidden rounded-md bg-white p-[10px] "
          onClick={onClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="action"
            className="relative block h-full w-full font-semibold"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            style={{ color: buttonColor }}
          >
            {changeText}
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          className="relative flex md:w-3/4 w-5/6 cursor-pointer items-center justify-center rounded-md border-none p-[10px]"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          onClick={onClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="reaction"
            className="relative block font-semibold"
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            {initialText}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
