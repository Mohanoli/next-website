'use client';

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';

// --- Types ---
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const numberVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 150,
      damping: 20,
    },
  },
};

// --- Components ---

const FloatingShapes = () => {
  const [shapes, setShapes] = useState<Particle[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 5,
    }));
    setShapes(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Floating geometric shapes */}
      {shapes.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full border border-black/5 bg-black/2"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
};

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen w-full bg-white flex items-center justify-center overflow-hidden">
      
      <FloatingShapes />

      <motion.div
        className="relative z-10 max-w-3xl w-full px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
       
        {/* 404 Number */}
        <motion.div variants={numberVariants} className="relative">
          <h1 className="text-[8rem] sm:text-[8rem] font-black leading-none tracking-tighter text-black select-none ">
            404
          </h1>
          {/* Decorative line */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-24 h-1 bg-black/10 rounded-full" />
        </motion.div>

        {/* Message */}
        <motion.div variants={itemVariants} className="mt-10 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black tracking-tight">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-black/60 max-w-md mx-auto leading-relaxed font-light">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants} 
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="group inline-flex items-center justify-center px-3 py-2 font-medium text-white bg-black rounded-full hover:bg-black/80 transition-all duration-300"
          >
            <Home className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" strokeWidth={2} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center justify-center px-3 py-2 font-medium text-black bg-white border border-black/10 rounded-full hover:bg-black/5 hover:border-black/20 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" strokeWidth={2} />
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}