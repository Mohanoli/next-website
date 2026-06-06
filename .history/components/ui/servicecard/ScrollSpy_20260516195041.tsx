"use client";

import React, { useEffect, useState } from "react";

export const useScrollSpy = (ids: string[], offset = 150) => {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: `-${offset}px 0px -70% 0px` }
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [ids, offset]);

    return activeId;
};

export const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top =
        el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
};
