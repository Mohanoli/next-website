"use client";
import React, { useState, useRef } from "react";
import {Calendar,FileText,BarChart3,Clock,TrendingUp,Plus,ArrowRight} from "lucide-react";
import Link from "next/link";

const notices = [
    {
        title: "Office hours and holiday schedules",
        url: "notice/notice-1",
        icon: "calendar"
    },
    {
        title: "Monthly progress report update",
        url: "notice/notice-2",
        icon: "document"
    },
    {
        title: "General reserve and Dividend distribution updates",
        url: "notice/notice-3",
        icon: "chart"
    },
    {
        title: "Loan repayment deadlines and penalties",
        url: "notice/notice-4",
        icon: "clock"
    },
    {
        title: "New loan schemes and interest rate changes",
        url: "notice/notice-5",
        icon: "trending"
    },
];

const Notice = () => {
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    // Lucide icon selector
    const getIcon = (iconType: string) => {
        const iconClass = "w-5 h-5 text-[#088738] flex-shrink-0";

        switch (iconType) {
            case "calendar":
                return <Calendar className={iconClass} />;
            case "document":
                return <FileText className={iconClass} />;
            case "chart":
                return <BarChart3 className={iconClass} />;
            case "clock":
                return <Clock className={iconClass} />;
            case "trending":
                return <TrendingUp className={iconClass} />;
            default:
                return <ArrowRight className={iconClass} />;
        }
    };

    const handleMouseEnter = () => {
        if (scrollRef.current) {
            const computedStyle = window.getComputedStyle(scrollRef.current);
            const matrix = new WebKitCSSMatrix(computedStyle.transform);
            setScrollPosition(matrix.m41);
        }
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    return (
    <div className="bg-gray-50 dark:bg-slate-900 py-1 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className="flex items-center mb-2 md:mb-0 md:mr-6 shrink-0 w-full md:w-auto group cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center bg-[#088738] dark:bg-amber-900 px-3 py-2 sm:py-3 rounded-md font-bold text-xs sm:text-sm tracking-wider uppercase text-white shadow-sm transition-all group-hover:bg-[#07702e] dark:group-hover:bg-amber-800">
            <Plus className="w-4 h-4 mr-2 text-white/90 transition-transform duration-200 ease-in-out group-hover:rotate-90" />
            <span>NOTICES</span>
          </div>
        </div>

        {/* Scrolling Notices */}
        <div
          className="relative flex-1 overflow-hidden w-full cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 2rem, black calc(100% - 2rem), transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 2rem, black calc(100% - 2rem), transparent)'
          }}
        >
          <div
            ref={scrollRef}
            className="flex w-max"
            style={{
              animation: 'scroll 30s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running',
              transform: isPaused ? `translateX(${scrollPosition}px)` : undefined
            }}
          >
            {[...notices, ...notices, ...notices].map((notice, index) => (
              <Link
                key={index}
                href={notice.url}
                className="flex items-center px-4 sm:px-6 py-2 text-gray-900 dark:text-gray-200 transition-all duration-200 rounded whitespace-nowrap hover:text-[#088738] dark:hover:text-green-400"
              >
                <div className="w-5 h-5 mr-3 shrink-0">{getIcon(notice.icon)}</div>
                <span className="text-sm sm:text-[0.95rem] font-medium">{notice.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
};

export default Notice;