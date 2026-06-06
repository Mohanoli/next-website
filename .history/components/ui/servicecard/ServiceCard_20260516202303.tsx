"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useScrollSpy } from "@/components/ui/servicecard/ScrollSpy";
import { ProductPageProps } from "@/lib/types/GlobalTypes";

export default function ProductPage({ products, title }: ProductPageProps) {
    const ids = products.map((p) => p.id);
    const activeId = useScrollSpy(ids, 120);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">

                    {/* Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24 overflow-y-auto max-h-[calc(100vh-8rem)] pr-2">
                            <p className="text-[15px] font-bold text-green-900 uppercase tracking-[0.19em] px-2 mb-3">
                                {title}
                            </p>

                            <nav className="space-y-0.5">
                                {products.map((product) => {
                                    const isActive = activeId === product.id;

                                    return (
                                        <button
                                            key={product.id}
                                            onClick={() => scrollToSection(product.id)}
                                            className={`relative w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3
                                                ${isActive
                                                    ? "text-gray-900 bg-gray-50"
                                                    : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeNav"
                                                    className="absolute inset-0 rounded-lg bg-gray-100"
                                                />
                                            )}

                                            <span
                                                className="relative z-10 w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: isActive
                                                        ? product.accentColor
                                                        : "#d1d5db",
                                                }}
                                            />

                                            <span className="relative z-10 truncate">
                                                {product.title}
                                            </span>

                                            {isActive && (
                                                <ArrowRight
                                                    size={13}
                                                    className="ml-auto text-gray-400"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9 space-y-10 mt-8 lg:mt-0">
                        {products.map((product) => (
                            <motion.section
                                key={product.id}
                                id={product.id}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="scroll-mt-28"
                            >
                                <div
                                    className="bg-white rounded-xl"
                                    style={{ borderLeft: `8px solid ${product.accentColor}` }}
                                >
                                    {/* Header */}
                                    <div className="px-6 pt-6 pb-2 flex gap-4">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                                            style={{
                                                backgroundColor: `${product.accentColor}15`,
                                            }}
                                        >
                                            <product.icon
                                                size={20}
                                                style={{ color: product.accentColor }}
                                            />
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-bold">
                                                {product.title}
                                            </h2>
                                            <p className="text-sm text-gray-400">
                                                {product.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="px-6 py-5 space-y-6">
                                        <p className="text-black text-sm leading-relaxed nepali-desc">
                                            {product.description}
                                        </p>

                                        {/* Features */}
                                        <ul className="space-y-2">
                                            {product.features.map((f: any, i: number) => (
                                                <li key={i} className="flex gap-3 text-sm">
                                                    <span
                                                        className="w-1.5 h-1.5 rounded-full mt-2"
                                                        style={{
                                                            backgroundColor: product.accentColor,
                                                        }}
                                                    />
                                                    <span className="font-medium w-28">
                                                        {f.label}
                                                    </span>
                                                    <span className="font-semibold">
                                                        {f.value}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Facilities */}
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-400 flex gap-2">
                                                <CheckCircle size={13} />
                                                Features & Facilities
                                            </h4>

                                            <ul className="space-y-2 mt-2">
                                                {product.facilities.map((f: string, i: number) => (
                                                    <li key={i} className="flex gap-3 text-sm">
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full mt-2"
                                                            style={{
                                                                backgroundColor: product.accentColor,
                                                            }}
                                                        />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>
                        ))}
                    </main>

                </div>
            </div>
        </div>
    );
}