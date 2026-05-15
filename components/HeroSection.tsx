"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { motionEase, PrimaryButton } from "./orb-ui";

function GravitationalMeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Point = {
      ox: number;
      oy: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      phase: number;
    };

    let raf = 0;
    let frame = 0;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let reveal = 0.15;
    let lastPointerAt = 0;
    const pointer = { x: 0, y: 0 };
    const points: Point[] = [];

    const index = (row: number, col: number) => row * (cols + 1) + col;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = width < 700 ? 54 : 68;
      cols = Math.max(8, Math.ceil(width / spacing));
      rows = Math.max(7, Math.ceil(height / spacing));
      pointer.x = width * 0.5;
      pointer.y = height * 0.47;
      points.length = 0;

      for (let row = 0; row <= rows; row += 1) {
        for (let col = 0; col <= cols; col += 1) {
          const ox = (col / cols) * width;
          const oy = (row / rows) * height;
          points.push({
            ox,
            oy,
            x: ox,
            y: oy,
            vx: 0,
            vy: 0,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      lastPointerAt = performance.now();
    };

    const proximity = (x: number, y: number) => {
      const distance = Math.hypot(pointer.x - x, pointer.y - y);
      return Math.max(0, 1 - distance / 310);
    };

    const strokeThread = (a: Point, b: Point) => {
      const midX = (a.x + b.x) * 0.5;
      const midY = (a.y + b.y) * 0.5;
      const near = proximity(midX, midY);
      const alpha = 0.045 + near * near * (0.32 * reveal);

      if (alpha < 0.02) return;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(104, 106, 110, ${alpha})`;
      ctx.lineWidth = 0.5 + near * 0.7;
      ctx.stroke();
    };

    const draw = () => {
      frame += 1;
      const now = performance.now();
      const pointerFresh = now - lastPointerAt < 1800;
      reveal += ((pointerFresh ? 1 : 0.16) - reveal) * 0.045;

      if (!pointerFresh) {
        const targetX = width * 0.5 + Math.sin(frame * 0.006) * width * 0.16;
        const targetY = height * 0.47 + Math.cos(frame * 0.008) * height * 0.1;
        pointer.x += (targetX - pointer.x) * 0.018;
        pointer.y += (targetY - pointer.y) * 0.018;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#f5f5f5";
      ctx.fillRect(0, 0, width, height);

      points.forEach((point) => {
        const dx = pointer.x - point.ox;
        const dy = pointer.y - point.oy;
        const distance = Math.hypot(dx, dy) || 1;
        const near = Math.max(0, 1 - distance / 330);
        const gravity = near * near * 82 * reveal;
        const driftX = Math.sin(frame * 0.005 + point.phase) * 1.2;
        const driftY = Math.cos(frame * 0.004 + point.phase) * 1.2;
        const targetX = point.ox + (dx / distance) * gravity + driftX;
        const targetY = point.oy + (dy / distance) * gravity + driftY;

        point.vx += (targetX - point.x) * 0.08;
        point.vy += (targetY - point.y) * 0.08;
        point.vx *= 0.74;
        point.vy *= 0.74;
        point.x += point.vx;
        point.y += point.vy;
      });

      for (let row = 0; row <= rows; row += 1) {
        for (let col = 0; col <= cols; col += 1) {
          const point = points[index(row, col)];
          if (!point) continue;
          if (col < cols) strokeThread(point, points[index(row, col + 1)]);
          if (row < rows) strokeThread(point, points[index(row + 1, col)]);
          if (row < rows && col < cols && (row + col) % 2 === 0) {
            strokeThread(point, points[index(row + 1, col + 1)]);
          }
        }
      }

      points.forEach((point) => {
        const near = proximity(point.x, point.y);
        const alpha = near * near * reveal;
        if (alpha < 0.018) return;

        const nodeGlow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 14 + alpha * 12);
        nodeGlow.addColorStop(0, `rgba(255,255,255,${0.28 * alpha})`);
        nodeGlow.addColorStop(0.6, `rgba(180,181,178,${0.12 * alpha})`);
        nodeGlow.addColorStop(1, "rgba(180,181,178,0)");
        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 17 + alpha * 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(92,94,98,${0.2 + alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 0.9 + alpha * 1.25, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-label="Premium gravitational mesh animation" />;
}

export function HeroSection() {
  return (
    <section id="hero" className="relative h-svh overflow-hidden bg-[#f5f5f5] px-4 pt-[68px]">
      <GravitationalMeshCanvas />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#f5f5f5] to-transparent" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1180px] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0.5, scale: 0.82, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: motionEase, delay: 0.48 }}
          className="mt-5 flex items-center justify-center md:mt-7"
        >
          <h1 className="orb-title-gradient text-[60px] font-semibold leading-[0.9] md:text-[120px] lg:text-[148px]">
            CyberArmour
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: motionEase, delay: 0.66 }}
          className="mx-auto mt-2 max-w-[720px] text-[20px] leading-[1.25] text-[#555968] md:mt-3 md:text-[24px]"
        >
          Next-gen AI systems, built for tomorrow&apos;s innovators
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: motionEase, delay: 0.78 }}
          className="mt-5"
        >
          <PrimaryButton>Book a demo</PrimaryButton>
        </motion.div>
      </div>
    </section>
  );
}
