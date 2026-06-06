'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/Cn';
import { ArrowRight } from "lucide-react";
import { FeatureItemsectionProps } from '@/lib/types/GlobalTypes';




const items: FeatureItemsectionProps[] = [
    {
        title: 'Mission',
        subtitle: 'What drives us every day',
        accent: 'from-amber-500 to-orange-500',

        bullets: [
            'Empower small-scale farmers through collective agricultural initiatives and shared resources',
            'Provide accessible, transparent financial services tailored to rural communities',
            'Promote sustainable, organic, and climate-resilient farming practices across the region',
            'Strengthen cooperative values — self-reliance, equality, and mutual trust — among all members',
            'Ensure equitable economic growth that reaches every caste, gender, and community segment',
        ],
    },
    {
        title: 'Vision',
        subtitle: 'Where we aspire to be',
        accent: 'from-sky-500 to-blue-600',

        bullets: [
            'Become a leading model cooperative in Nepal recognized for innovation and inclusion',
            'Build a self-sustaining rural economy where no farmer is left behind',
            'Establish a robust supply chain from farm to market with fair pricing for producers',
            'Create a knowledge hub for modern agricultural techniques and cooperative governance',
            'Foster a thriving community where every household achieves financial independence',
        ],
    },
    {
        title: 'Core Values',
        subtitle: 'Principles we stand by',
        accent: 'from-emerald-500 to-teal-600',

        bullets: [
            'Transparency — every decision, transaction, and policy is open to member scrutiny',
            'Accountability — elected leaders answer directly to the general assembly',
            'Inclusivity — active representation of women, Dalits, Janajatis, and marginalized groups',
            'Integrity — zero tolerance for corruption, favoritism, or political interference',
            'Solidarity — collective action over individual gain, mutual support over competition',
        ],
    },
    {
        title: 'Benefits & Strength',
        subtitle: 'What sets us apart',
        accent: 'from-violet-500 to-purple-600',

        bullets: [
            '2+ decades of institutional experience since formal registration in 2052 BS',
            'Own office building and established operational infrastructure within the community',
            'Diverse membership of 1000+ individuals spanning multiple ethnic and social groups',
            'Proven track record of successful management transfer from development projects',
            'Direct access to government programs, agricultural subsidies, and cooperative networks',
        ],
    },
    {
        title: 'Cooperative Principles',
        subtitle: 'The foundation we build on',
        accent: 'from-rose-500 to-pink-600',

        bullets: [
            'Voluntary & Open Membership — open to all who accept the responsibilities without discrimination',
            'Democratic Member Control — one member, one vote, regardless of share capital held',
            'Member Economic Participation — profits distributed proportionally based on usage, not investment',
            'Autonomy & Independence — self-governed free from external political or commercial pressure',
            'Education, Training & Information — continuous capacity building for members and elected leaders',
        ],
    },
];

function BulletContent({ item, isActive }: { item: FeatureItemsectionProps; isActive: boolean }) {
    return (
        <AnimatePresence mode="wait">
            {isActive && (
                <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="space-y-0"
                >
                    {/* Icon & Subtitle Header */}
                    <div className="flex items-center gap-3.5 mb-8">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">
                                {item.title}
                            </p>
                        </div>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-5">
                        {item.bullets.map((bullet, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.35,
                                    delay: i * 0.08,
                                    ease: 'easeOut',
                                }}
                                className="flex gap-4 items-start group"
                            >
                                <span className="mt-2.5 flex">
                                    <span className={cn(
                                        'block w-2 h-2 rounded-full bg-gradient-to',
                                        item.accent
                                    )} />
                                </span>
                                <span className="text-[15px] leading-[1.75] text-slate-600 font-light tracking-wide group-hover:text-slate-800 transition-colors duration-300">
                                    {bullet}
                                </span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function FeaturesWithPanel() {
    const [active, setActive] = React.useState(0);

    return (
        <section className="relative w-full py-24 md:py-10 bg-white overflow-hidden">

            {/* Background texture */}

            <div className="relative mx-auto max-w-7xl px-6 md:px-10">

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 lg:items-start">

                    {/* Left: Title List */}
                    <div className="lg:col-span-5">
                        <ul className="flex flex-col gap-2">
                            {items.map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.08,
                                        ease: 'easeOut',
                                    }}
                                    onClick={() => setActive(index)}
                                    className={cn(
                                        'group relative flex items-center gap-4 px-5 py-2 rounded-full cursor-pointer transition-all duration-300',
                                        active === index
                                            ? 'bg-green-800 text-white shadow-xl shadow-slate-900/20 '
                                            : 'hover:text-green-700',
                                    )}
                                >
                                    {/* Number Badge */}
                                    <span
                                        className={cn(
                                            'flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold shrink-0 transition-all duration-300',
                                            active === index
                                                ? 'bg-yellow-500 text-white backdrop-blur-sm'
                                                : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600',
                                        )}
                                    >
                                        {String(index + 1).padStart(2, '0')}
                                    </span>

                                    {/* Title */}
                                    <div className="flex-1 min-w-0">
                                        <span
                                            className={cn(
                                                'block text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300',
                                                active === index
                                                    ? 'text-white'
                                                    : 'text-slate-700 group-hover:text-slate-900',
                                            )}
                                        >
                                            {item.title}
                                        </span>
                                        <span
                                            className={cn(
                                                'block text-xs mt-0.5 font-medium tracking-wide transition-colors duration-300',
                                                active === index
                                                    ? 'text-white/50'
                                                    : 'text-slate-400 group-hover:text-slate-500',
                                            )}
                                        >
                                            {item.subtitle}
                                        </span>
                                    </div>

                                    {/* Active Arrow */}
                                    <motion.div
                                        animate={{
                                            opacity: active === index ? 1 : 0,
                                            scale: active === index ? 1 : 0.85,
                                            x: active === index ? 0 : -8,
                                        }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="shrink-0"
                                    >
                                        <div className="w-13 h-13 flex items-center justify-center rounded-full 
    bg-red-500 shadow-md hover:shadow-lg hover:scale-105 
    transition-all duration-300"
                                        >
                                            <ArrowRight className="w-9 h-9 text-white" strokeWidth={2.5} />
                                        </div>
                                    </motion.div>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Content Panel */}
                    <div className="lg:col-span-7 mt-8 lg:mt-0">
                        <div className="lg:sticky lg:top-12">
                            <div className={cn('relative p-8 md:p-10 lg:p-4 transition-all duration-500')}>
                                <BulletContent
                                    item={items[active]}
                                    isActive={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}