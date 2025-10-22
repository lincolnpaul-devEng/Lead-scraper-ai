import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 11) - 5;
  };
  
  const isActive = (index: number) => index === active;

  return (
    <div className={cn("relative max-w-sm md:max-w-4xl mx-auto px-4 md:px-8", className)} style={{ perspective: '1000px' }}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
        <div className="relative h-80 w-full">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{
                  opacity: 0,
                  scale: 0.85,
                  rotateY: randomRotateY(),
                  z: -50,
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.5,
                  scale: isActive(index) ? 1 : 0.9,
                  rotateY: isActive(index) ? 0 : randomRotateY(),
                  z: isActive(index) ? 0 : -50,
                  y: isActive(index) ? [0, -20, 0] : 0,
                  zIndex: isActive(index) ? 10 : 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.85,
                  rotateY: randomRotateY(),
                  z: 50,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom"
                style={{transformStyle: "preserve-3d"}}
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={500}
                  height={500}
                  draggable={false}
                  className="h-full w-full rounded-2xl object-cover object-center shadow-2xl"
                />
              </motion.div>
            ))}
        </div>
        <div className="flex justify-between flex-col py-4 min-h-[24rem] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="relative"
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <span className="absolute -left-8 -top-4 text-8xl text-slate-100 font-serif -z-10">“</span>
              <motion.p className="text-lg text-slate-700">
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index, }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
               <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-900">
                  {testimonials[active].name}
                </h3>
                <p className="text-sm text-slate-500">
                  {testimonials[active].designation}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
           <div className="flex gap-4 pt-12 md:pt-0 mt-auto">
            <button
              onClick={handlePrev}
              className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center group/button hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ring-offset-2"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-5 w-5 text-slate-700" />
            </button>
            <button
              onClick={handleNext}
              className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center group/button hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ring-offset-2"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-5 w-5 text-slate-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
