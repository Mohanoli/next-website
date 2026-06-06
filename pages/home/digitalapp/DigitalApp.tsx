"use client";

import { useEffect, useState, useRef  } from "react";
import Image from "next/image";
import Link from "next/link";
import playstore from '@/assets/bankings/playstoreicon.png';
import appstore from '@/assets/bankings/appstoreicon.png';
import {getTranslate} from "@/lib/utils/Floating"

const floatingServices = [
  { icon: "📺", label: "TV",          color: "from-amber-100 to-yellow-200",   pos: "top-[11%]  left-[19%]",  delay: "0s"    },
  { icon: "🚿", label: "Khanapani",   color: "from-blue-100  to-blue-200",     pos: "top-[41%] left-[6%]",  delay: "0.6s"  },
  { icon: "🌐", label: "Internet",    color: "from-green-100 to-emerald-200",  pos: "bottom-[12%] left-[16%]",delay:"1.2s"  },
  { icon: "✈️", label: "Aeroplane",   color: "from-cyan-100  to-sky-200",      pos: "top-[11%]  right-[15%]", delay: "0.3s"  },
  { icon: "⚡", label: "Electricity", color: "from-rose-100  to-pink-200",     pos: "top-[41%] right-[6%]", delay: "0.9s"  },
{ icon: "🌐", label: "Internet",    color: "from-green-100 to-emerald-200",  pos: "bottom-[12%] right-[16%]",delay:"1.2s"  },

];

const phoneApps = [
  { icon: "💸", label: "Transfer",   bg: "from-emerald-500 to-green-600"  },
  { icon: "👛", label: "Load Wallet",bg: "from-blue-500    to-blue-600"   },
  { icon: "📂", label: "Load Fund",  bg: "from-purple-500  to-violet-600" },
  { icon: "🌍", label: "Remittance", bg: "from-teal-500    to-cyan-600"   },
];

const phoneApps2 = [
  { icon: "📱", label: "Top Up"     },
  { icon: "🌐", label: "Internet"   },
  { icon: "📺", label: "TV"         },
  { icon: "📈", label: "Broker"     },
  { icon: "🏛️", label: "Govt.Pay"  },
  { icon: "📦", label: "Data Pack"  },
  { icon: "🛵", label: "Ride"       },
  { icon: "🚌", label: "Bus Ticket" },
];

function PhoneMockup() {
  return (
    <div className="relative z-10 w-180px shrink-0">
      {/* Shell */}
      <div className="w-55 h-110 bg-linear-to-b from-[#1a1a2e] to-[#0d1117] rounded-[30px] p-1.5 shadow-[0_30px_70px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.08)] relative overflow-hidden">
        {/* Screen */}
        <div className="w-full h-full rounded-[28px] overflow-hidden relative" style={{ background: "linear-gradient(180deg,#16a34a 0%,#15803d 22%,#f0fdf4 22%)" }}>
          {/* Notch */}
          <div className="w-17.5 h-3.5 bg-[#000000] rounded-b-xl mx-auto mb-1" />
          {/* Header */}
          <div className="flex justify-between items-center px-2 pb-1">
            <span className="text-white text-[7px] opacity-70">☰</span>
            <span className="text-white text-[12px] font-extrabold">SFACL KATHMANDU</span>
            <div className="flex gap-1 text-[7px] text-white opacity-80">
              <span>👤</span><span>🔔</span>
            </div>
          </div>
          
          <p className="text-white text-[12px]  font-semibold px-2 opacity-90">Good Afternoon</p>
          <h2 className="text-[11px] font-bold text-white px-2 mb-4">MOHAN OLI</h2>

          {/* Card */}
          <div className="mx-1.5 mb-1.5 bg-white rounded-[10px] p-2 shadow-md">
            <p className="text-[5.5px] text-slate-400 mb-1">Primary — Saving Account</p>
            <p className="text-[9px] font-bold text-green-700">NPR 33,084.61</p>
            <div className="flex justify-between mt-1">
              <div>
                <p className="text-[6.5px] font-bold text-slate-800">NPR 33,134.61</p>
                <p className="text-[5px] text-slate-400">Actual Balance</p>
              </div>
              <div className="text-right">
                <p className="text-[6.5px] font-bold text-slate-800">NPR 166.71</p>
                <p className="text-[5px] text-slate-400">Accrued Interest</p>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-4 gap-1 px-1.5 mb-1">
            {phoneApps.map((app, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-5.5 h-5.5 rounded-[7px] bg-linear-to-b ${app.bg} flex items-center justify-center text-[11px]`}>
                  {app.icon}
                </div>
                <span className="text-[6px] text-slate-500 text-center leading-tight">{app.label}</span>
              </div>
            ))}
          </div>

          {/* Green apps grid */}
          <div className="mx-1.5 bg-linear-to-b from-green-600 to-green-700 rounded-xl p-1.5">
            <div className="grid grid-cols-4 gap-1">
              {phoneApps2.map((app, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[12px]">{app.icon}</span>
                  <span className="text-[4.5px] text-white/80 text-center leading-tight">{app.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom nav */}
          <div className="flex justify-around items-center border-t border-slate-200 px-2 pt-1 mt-1">
            {[
              { icon: "🏠", lbl: "Home",    active: true  },
              { icon: "💳", lbl: "Payments",active: false },
              { icon: "▦",  lbl: "QR",      active: false },
              { icon: "🏦", lbl: "Banking", active: false },
              { icon: "⋯",  lbl: "More",    active: false },
            ].map((n, i) => (
              <div key={i} className={`flex flex-col items-center gap-2px text-[5px] ${n.active ? "text-green-600" : "text-slate-400"}`}>
                <span className="text-[10px]">{n.icon}</span>
                <span>{n.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HamroConnectHero() {
  const [mounted, setMounted] = useState(false);
const [spread, setSpread] = useState(false);
const sectionRef = useRef<HTMLDivElement | null>(null);
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    {
      threshold: 0.25,
    }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
}, []);

useEffect(() => {
  let timeout: NodeJS.Timeout;

  const runAnimation = (isVisible: boolean) => {
    timeout = setTimeout(() => {
      const next = !isVisible;

      setSpread(next);

      runAnimation(next);
    }, isVisible ? 10000 : 2000);
  };

  // start hidden first for 2s
  runAnimation(false);

  return () => clearTimeout(timeout);
}, []);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative w-full bg-white overflow-hidden rounded-2xl">
      {/* Subtle bg glow */}
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-100 h-100 rounded-full bg-green-500/5 blur-[80px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-75 h-75 rounded-full bg-green-400/4 blur-[60px] pointer-events-none" />

<div
  ref={sectionRef}
  className="max-w-6xl mx-auto px-6 py-14 flex flex-col lg:flex-row items-center gap-10"
>
        {/* ── LEFT: Phone scene ── */}
        <div
  className={`relative flex items-center justify-center w-full lg:w-[43%] min-h-95 transition-all duration-1000 ease-out ${
    isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-24"
  }`}
>
          {/* Orbit rings */}
         <div className="absolute w-95 h-95 rounded-full border-2 border-dashed border-green-400/35 animate-[spin_28s_linear_infinite]" />
         <div className="absolute w-75 h-75 rounded-full border-2 border-dashed border-green-500/25 animate-[spin_20s_linear_infinite_reverse]" />
          
          {/* Floating service icons */}
     {floatingServices.map((s, i) => {
  const isSpread = spread;

  return (
    <div
      key={i}
      className="absolute left-1/2 top-1/2 flex flex-col items-center gap-1 z-10"
      style={{
        transform: isSpread
          ? "translate(-50%, -50%) translate(var(--x), var(--y))"
          : "translate(-50%, -50%)",
        transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
        ["--x" as any]: getTranslate(s.pos).x,
        ["--y" as any]: getTranslate(s.pos).y,
      }}
    >
      <div
        className={`w-10 h-10 rounded-full bg-linear-to-br ${s.color} flex items-center justify-center text-xl ring-[3px] ring-white shadow-md`}
      >
        {s.icon}
      </div>

      <span className="text-[11px] font-semibold text-gray-700 dark:text-white bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
        {s.label}
      </span>
    </div>
  );
})}
          {/* Decorative dots */}
          <div className="absolute top-[14%] left-[42%] w-2.5 h-2.5 rounded-full bg-green-500/25 animate-pulse" />
          <div className="absolute bottom-[20%] right-[12%] w-2 h-2 rounded-full bg-green-400/20 animate-pulse delay-700" />

          <PhoneMockup />
        </div>

        {/* ── RIGHT: Marketing copy ── */}
       <div
  className={`flex-1 ml-20 transition-all duration-1000 ease-out ${
    isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-24"
  }`}
>
          {/* Headline */}
          <h1 className="text-xl lg:text-3xl font-medium text-slate-900 leading-tight mb-1">
            Manage your{" "}
            <span className="font-extrabold text-green-600">Digital Payments</span>
          </h1>
          <h2 className="text-3xl lg:text-2xl font-extrabold text-slate-900 leading-tight mb-3">
            Anytime, Anywhere.
          </h2>
          <p className="text-base text-slate-600 mb-6">
            Download our{" "}
            <span className="font-bold text-green-600">Mobile Banking</span> app!
          </p>

          {/* Brand */}
          <div className="flex items-center gap-3 mb-5">
           
            <div>
              <p className="text-2xl font-black text-green-600 leading-none">
                <span className="text-slate-800 font-light"> </span>M-Bank Technologies
              </p>
              <p className="text-[11px] text-slate-400 italic">Infinite Possibilities...</p>
            </div>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed mb-8 max-w-md">
            Quick, Secure, and Convenient: Your all-in-one mobile banking app for seamless financial control.
          </p>

         

            <div className="flex flex-col gap-3">
              <p className="text-xs text-slate-500">Click to download our mobile app</p>

              {/* App and playstore Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                href="https://play.google.com/store/apps/details?id=banking.icloudservices.sanakisan_shantinagar&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                >

                <Image
                  src={playstore}
                  alt="Google Play Store"
                  width={160}
                  height={48}
                  className="w-40 h-auto cursor-pointer transform hover:scale-105 transition-transform duration-300"
                />
                </Link>

                <Link
                href="https://play.google.com/store/apps/details?id=banking.icloudservices.sanakisan_shantinagar&hl=en"
                target="_blank"
                rel="noopener noreferrer">
                <Image
                  src={appstore}
                  alt="Apple App Store"
                  width={160}
                  height={48}
                  className="w-40 h-auto cursor-pointer transform hover:scale-105 transition-transform duration-300"
                />
                </Link>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}