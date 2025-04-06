import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QUOTES = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
];

const Fortune = ({ ref, setShowFortune }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const autoChangeTimerRef = useRef(null);

  const showNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % QUOTES.length);
  };

  // Initialize with first quote and setup auto-change timer
  useEffect(() => {
    // Start with the first quote
    setFadeIn(true);

    // Set up timer to change quotes every 30 seconds
    autoChangeTimerRef.current = setInterval(() => {
      showNextQuote();
    }, 30000);

    // Clean up timer on unmount
    return () => {
      if (autoChangeTimerRef.current) {
        clearInterval(autoChangeTimerRef.current);
      }
    };
  }, []);

  const currentQuote = QUOTES[currentQuoteIndex];

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="feature absolute left-[1000px] top-[500px]
       rounded-md flex flex-col backdrop-blur-sm shadow-lg overflow-hidden z-90"
      style={{ width: "300px", backgroundColor: "transparent" }}
    >
      <div className="flex py-2 px-4 items-center justify-between">
        <span className="text-sm text-white font-medium">
          Today&apos;s Fortune
        </span>
        <button
          onClick={() => setShowFortune(false)}
          className="p-1 cursor-pointer rounded-md transition-colors"
          aria-label="Hide fortune"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-500"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
      </div>

      <div
        className={`flex-1 p-6 flex flex-col items-center transition-opacity duration-500 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {currentQuote && (
          <>
            <p className="text-center text-gray-50 font-medium mb-2 leading-relaxed">
              &ldquo;{currentQuote.text}&rdquo;
            </p>
            <p className="text-center text-gray-200 text-sm italic">
              — {currentQuote.author}
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Fortune;
