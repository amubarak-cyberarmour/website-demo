"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { motionEase, OrbMark, PrimaryButton } from "./orb-ui";

function Eyebrow() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.84 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, ease: motionEase, delay: 0.35 }}
      className="mx-auto inline-flex items-center gap-2 rounded-full border border-white bg-[#f5f5f5] px-4 py-[10px] text-[12px] font-semibold uppercase leading-none text-[#303545] shadow-[0_0.7px_0.7px_rgba(0,0,0,.1),0_1.8px_1.8px_rgba(0,0,0,.09),0_6.8px_6.8px_rgba(0,0,0,.08),0_30px_30px_-14px_rgba(0,0,0,.16),inset_0_3px_1px_#fff]"
    >
      <span className="size-2 rounded-full bg-[#b9f16d] shadow-[0_0_0_4px_rgba(185,241,109,.2)]" />
      AI Automation For Businesses
    </motion.div>
  );
}

function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: 0, y: 0, active: false };
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      energy: number;
      phase: number;
    }> = [];
    const pulses: Array<{ a: number; b: number; t: number; speed: number }> = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pointer.x = width * 0.5;
      pointer.y = height * 0.48;

      nodes.length = 0;
      const count = Math.max(42, Math.floor(width / 16));
      for (let i = 0; i < count; i += 1) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          radius: 1.6 + Math.random() * 2.4,
          energy: Math.random() * 0.2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const draw = () => {
      frame += 1;

      ctx.clearRect(0, 0, width, height);
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#f8f8f8");
      bg.addColorStop(0.55, "#f5f5f5");
      bg.addColorStop(1, "#eceef3");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(width * 0.5, height * 0.45, 0, width * 0.5, height * 0.45, width * 0.72);
      glow.addColorStop(0, "rgba(255,255,255,0.88)");
      glow.addColorStop(0.54, "rgba(255,255,255,0.18)");
      glow.addColorStop(1, "rgba(14,18,41,0.08)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      nodes.forEach((node) => {
        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const distance = Math.hypot(dx, dy) || 1;
        const influence = Math.max(0, 1 - distance / 190);

        if (pointer.active && influence > 0) {
          node.energy = Math.min(1, node.energy + influence * 0.08);
          node.vx -= (dx / distance) * influence * 0.018;
          node.vy -= (dy / distance) * influence * 0.018;
        }

        node.energy *= 0.965;
        node.vx += Math.sin(frame * 0.012 + node.phase) * 0.004;
        node.vy += Math.cos(frame * 0.01 + node.phase) * 0.004;
        node.vx *= 0.992;
        node.vy *= 0.992;
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 10 || node.x > width - 10) node.vx *= -1;
        if (node.y < 10 || node.y > height - 10) node.vy *= -1;
        node.x = Math.max(10, Math.min(width - 10, node.x));
        node.y = Math.max(10, Math.min(height - 10, node.y));
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 118) {
            const energy = (a.energy + b.energy) * 0.5;
            const alpha = (1 - distance / 118) * (0.18 + energy * 0.46);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(14, 18, 41, ${alpha})`;
            ctx.lineWidth = 0.55 + energy * 1.25;
            ctx.stroke();

            if (energy > 0.28 && Math.random() < 0.006 && pulses.length < 22) {
              pulses.push({ a: i, b: j, t: 0, speed: 0.012 + Math.random() * 0.018 });
            }
          }
        }
      }

      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        const pulse = pulses[i];
        const a = nodes[pulse.a];
        const b = nodes[pulse.b];
        pulse.t += pulse.speed;
        if (!a || !b || pulse.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * pulse.t;
        const y = a.y + (b.y - a.y) * pulse.t;
        const pulseGlow = ctx.createRadialGradient(x, y, 0, x, y, 18);
        pulseGlow.addColorStop(0, "rgba(185,241,109,0.95)");
        pulseGlow.addColorStop(0.35, "rgba(255,255,255,0.45)");
        pulseGlow.addColorStop(1, "rgba(185,241,109,0)");
        ctx.fillStyle = pulseGlow;
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fill();
      }

      nodes.forEach((node) => {
        const energy = node.energy;
        if (energy > 0.08) {
          const halo = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 22 + energy * 34);
          halo.addColorStop(0, `rgba(185,241,109,${0.16 + energy * 0.28})`);
          halo.addColorStop(0.35, `rgba(255,255,255,${0.12 + energy * 0.2})`);
          halo.addColorStop(1, "rgba(185,241,109,0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 22 + energy * 34, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + energy * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = energy > 0.32 ? "#b9f16d" : "rgba(14,18,41,0.72)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0.8, node.radius * 0.38), 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.92)";
        ctx.fill();
      });

      if (!pointer.active) {
        const x = width * 0.5 + Math.sin(frame * 0.012) * width * 0.16;
        const y = height * 0.48 + Math.cos(frame * 0.015) * height * 0.15;
        pointer.x += (x - pointer.x) * 0.03;
        pointer.y += (y - pointer.y) * 0.03;
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-label="Animated neural network visualization" />;
}

export function HeroSection() {
  return (
    <section id="hero" className="hero-shell relative min-h-screen overflow-hidden px-4 pb-16 pt-[132px] md:pb-20 md:pt-[154px]">
      <NeuralNetworkCanvas />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,.92)_0%,rgba(255,255,255,.72)_23%,rgba(245,245,245,.34)_48%,rgba(245,245,245,.9)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-22 [background-image:linear-gradient(rgba(14,18,41,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(14,18,41,.035)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(circle_at_50%_20%,black,transparent_72%)]" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-154px)] max-w-[1180px] flex-col items-center justify-center text-center">
        <Eyebrow />

        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: motionEase, delay: 0.48 }}
          className="mt-7 flex items-center justify-center gap-3 md:mt-9 md:gap-5"
        >
          <OrbMark />
          <h1 className="orb-title-gradient text-[64px] font-semibold leading-none md:text-[132px] lg:text-[168px]">
            ORB AI
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: motionEase, delay: 0.66 }}
          className="mx-auto mt-5 max-w-[720px] text-[20px] leading-[1.45] text-[#555968] md:mt-6 md:text-[26px]"
        >
          Next-gen AI systems, built for tomorrow&apos;s innovators
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: motionEase, delay: 0.78 }}
          className="mt-8"
        >
          <PrimaryButton />
        </motion.div>
      </div>
    </section>
  );
}
