import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /**
   * Indices of whitespace-separated words that should render with the
   * primary→highlight gradient (white + green/yellow mix). Other words
   * stay in the default foreground color.
   */
  gradientWords?: number[];
}

export function TextReveal({ text, className = "", delay = 0, gradientWords = [] }: TextRevealProps) {
  const words = text.split(/(\s+)/); // keep spaces as tokens
  const gradientSet = new Set(gradientWords);

  let wordIndex = -1;
  let charCounter = 0;

  return (
    <span className={`inline-block ${className}`}>
      {words.map((token, ti) => {
        const isSpace = /^\s+$/.test(token);
        if (!isSpace) wordIndex += 1;
        const useGradient = !isSpace && gradientSet.has(wordIndex);

        return (
          <span
            key={ti}
            className={useGradient ? "text-gradient-primary" : ""}
            style={{ whiteSpace: isSpace ? "pre" : undefined }}
          >
            {token.split("").map((char, ci) => {
              const i = charCounter++;
              return (
                <motion.span
                  key={ci}
                  initial={{ opacity: 0.15 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: delay + i * 0.04, duration: 0.4, ease: "easeOut" }}
                  className="inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : undefined }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
