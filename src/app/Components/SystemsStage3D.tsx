"use client";
import React, { useEffect, useRef, useState } from "react";
import { Layers, ArrowDownRight } from "lucide-react";

interface LayerInfo {
  id: number;
  code: string;
  name: string;
  role: string;
  detail: string;
  metrics: string;
}

interface PrismDef {
  tier: number;
  cx: number;
  cy: number;
  cz: number;
  w: number;
  h: number;
  d: number;
  material:
    | "plinth"
    | "anodized-dark"
    | "brushed-metal"
    | "smoked-glass"
    | "frosted-glass"
    | "core-accent"
    | "core-sage";
  bevelBright?: number;
  hasGrid?: boolean;
  hasReticle?: boolean;
}

interface ConduitDef {
  fromTier: number;
  toTier: number;
  points: { x: number; y: number; z: number }[];
  accent: "terracotta" | "sage";
  speed: number;
  phase: number;
}

const LAYERS: LayerInfo[] = [
  {
    id: 0,
    code: "01",
    name: "Interface",
    role: "Web, Mobile & Viewport Engine",
    detail: "React · Next.js · React Native · Tailwind CSS",
    metrics: "60 FPS · Sub-pixel UI",
  },
  {
    id: 1,
    code: "02",
    name: "State & Logic",
    role: "Client Architecture & Sync",
    detail: "TypeScript · Reactive Context · Real-time Sync",
    metrics: "Deterministic state",
  },
  {
    id: 2,
    code: "03",
    name: "Services & API",
    role: "Core Runtime & Integrations",
    detail: "Node.js · Express · Python · FastAPI · Web3.js",
    metrics: "Low-latency · Realtime",
  },
  {
    id: 3,
    code: "04",
    name: "Infrastructure",
    role: "Persistence, Caching & Cloud",
    detail: "PostgreSQL · Prisma · MongoDB · Redis · Docker",
    metrics: "Verified persistence",
  },
];

const PRISMS: PrismDef[] = [
  { tier: 3, cx: 0, cy: 96, cz: 0, w: 248, h: 22, d: 204, material: "plinth", bevelBright: 1, hasGrid: true },
  { tier: 3, cx: -52, cy: 77, cz: -32, w: 116, h: 16, d: 108, material: "anodized-dark", bevelBright: 1.15 },
  { tier: 3, cx: 58, cy: 79, cz: 34, w: 94, h: 14, d: 92, material: "brushed-metal", bevelBright: 1.2 },
  { tier: 3, cx: -92, cy: 38, cz: -68, w: 12, h: 92, d: 12, material: "brushed-metal", bevelBright: 1.25 },
  { tier: 3, cx: 94, cy: 44, cz: -64, w: 12, h: 82, d: 12, material: "anodized-dark", bevelBright: 1.05 },
  { tier: 2, cx: -6, cy: 30, cz: 4, w: 198, h: 13, d: 164, material: "smoked-glass", bevelBright: 1.3, hasGrid: true },
  { tier: 2, cx: -14, cy: 12, cz: -6, w: 82, h: 24, d: 76, material: "core-accent", bevelBright: 1.65 },
  { tier: 2, cx: 54, cy: 15, cz: 22, w: 52, h: 18, d: 66, material: "core-sage", bevelBright: 1.4 },
  { tier: 2, cx: -72, cy: 16, cz: 38, w: 44, h: 16, d: 56, material: "brushed-metal", bevelBright: 1.25 },
  { tier: 1, cx: 16, cy: -28, cz: -8, w: 214, h: 12, d: 152, material: "brushed-metal", bevelBright: 1.45 },
  { tier: 1, cx: -48, cy: -43, cz: 18, w: 124, h: 13, d: 92, material: "smoked-glass", bevelBright: 1.35, hasGrid: true },
  { tier: 1, cx: 64, cy: -42, cz: -24, w: 76, h: 15, d: 82, material: "anodized-dark", bevelBright: 1.3 },
  { tier: 0, cx: -8, cy: -84, cz: 6, w: 232, h: 11, d: 178, material: "smoked-glass", bevelBright: 1.7, hasGrid: true, hasReticle: true },
  { tier: 0, cx: 34, cy: -99, cz: -14, w: 116, h: 8, d: 92, material: "frosted-glass", bevelBright: 1.85 },
  { tier: 0, cx: -62, cy: -98, cz: 32, w: 68, h: 9, d: 60, material: "core-accent", bevelBright: 1.55 },
];

const CONDUITS: ConduitDef[] = [
  {
    fromTier: 3,
    toTier: 0,
    points: [
      { x: -14, y: 86, z: -6 },
      { x: -14, y: 12, z: -6 },
      { x: -14, y: -32, z: -6 },
      { x: -14, y: -84, z: 6 },
    ],
    accent: "terracotta",
    speed: 0.48,
    phase: 0,
  },
  {
    fromTier: 3,
    toTier: 0,
    points: [
      { x: 54, y: 82, z: 22 },
      { x: 54, y: 15, z: 22 },
      { x: 54, y: -30, z: -10 },
      { x: 34, y: -96, z: -14 },
    ],
    accent: "sage",
    speed: 0.38,
    phase: 0.33,
  },
  {
    fromTier: 0,
    toTier: 3,
    points: [
      { x: -62, y: -94, z: 32 },
      { x: -48, y: -42, z: 20 },
      { x: -68, y: 18, z: 36 },
      { x: -52, y: 74, z: -22 },
    ],
    accent: "terracotta",
    speed: 0.42,
    phase: 0.66,
  },
  {
    fromTier: 2,
    toTier: 1,
    points: [
      { x: -14, y: 12, z: -6 },
      { x: 54, y: 12, z: 22 },
      { x: 64, y: -40, z: -24 },
    ],
    accent: "terracotta",
    speed: 0.55,
    phase: 0.18,
  },
];

const CAMERA_DIST = 720;

function rotate3D(
  pt: { x: number; y: number; z: number },
  rx: number,
  ry: number,
  rz: number
) {
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x1 = pt.x * cosY + pt.z * sinY;
  const z1 = -pt.x * sinY + pt.z * cosY;

  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y1 = pt.y * cosX + z1 * sinX;
  const z2 = -pt.y * sinX + z1 * cosX;

  const cosZ = Math.cos(rz);
  const sinZ = Math.sin(rz);
  const x2 = x1 * cosZ - y1 * sinZ;
  const y2 = x1 * sinZ + y1 * cosZ;

  return { x: x2, y: y2, z: z2 };
}

function project3D(
  pt: { x: number; y: number; z: number },
  cx: number,
  cy: number,
  focal: number
) {
  const denom = Math.max(220, CAMERA_DIST - pt.z);
  const scale = focal / denom;
  return {
    x: cx + pt.x * scale,
    y: cy + pt.y * scale,
    z: pt.z,
    scale,
  };
}

export const SystemsStage3D: React.FC = () => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [exploded, setExploded] = useState<boolean>(false);

  const stateRef = useRef({
    targetPointerX: 0,
    targetPointerY: 0,
    currentPointerX: 0,
    currentPointerY: 0,
    dragRotY: 0,
    dragRotX: 0,
    isDragging: false,
    lastClientX: 0,
    lastClientY: 0,
    activeLayer: null as number | null,
    exploded: false,
    unfoldAmount: 0,
    assembleAmount: 0,
  });

  useEffect(() => {
    stateRef.current.activeLayer = activeLayer;
  }, [activeLayer]);

  useEffect(() => {
    stateRef.current.exploded = exploded;
  }, [exploded]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = true;
    let rafId = 0;
    const startTime = performance.now();

    const render = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width <= 0 || height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixelW = Math.max(1, Math.round(width * dpr));
      const pixelH = Math.max(1, Math.round(height * dpr));
      if (canvas.width !== pixelW || canvas.height !== pixelH) {
        canvas.width = pixelW;
        canvas.height = pixelH;
      }

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const reduced = reducedMotionQuery.matches;
      const heroScrollRaw = parseFloat(
        document.documentElement.style.getPropertyValue("--hero-scroll") || "0"
      );
      const heroScroll = Number.isFinite(heroScrollRaw)
        ? Math.max(0, Math.min(1, heroScrollRaw))
        : 0;

      const elapsed = Math.max(0, (now - startTime) / 1000);
      const introProgress = reduced ? 1 : Math.min(1, elapsed / 1.35);
      const assemble = 1 - Math.pow(1 - introProgress, 3.4);
      stateRef.current.assembleAmount = assemble;

      const st = stateRef.current;
      st.currentPointerX += (st.targetPointerX - st.currentPointerX) * 0.085;
      st.currentPointerY += (st.targetPointerY - st.currentPointerY) * 0.085;

      const targetUnfold =
        (st.exploded ? 0.78 : 0) +
        (st.activeLayer !== null ? 0.32 : 0) +
        heroScroll * 0.88 +
        (1 - assemble) * 1.1;
      st.unfoldAmount += (targetUnfold - st.unfoldAmount) * (reduced ? 1 : 0.11);

      const idleX = reduced ? 0 : Math.sin(elapsed * 0.65) * 0.028;
      const idleY = reduced ? 0 : Math.cos(elapsed * 0.48) * 0.052;
      const idleZ = reduced ? 0 : Math.sin(elapsed * 0.35) * 0.01;

      const baseRx = 0.48 + heroScroll * 0.12 + (1 - assemble) * 0.2;
      const baseRy = -0.64 + heroScroll * 0.25 - (1 - assemble) * 0.36;

      const rx = baseRx + idleX - st.currentPointerY * 0.17 + st.dragRotX;
      const ry = baseRy + idleY + st.currentPointerX * 0.24 + st.dragRotY;
      const rz = idleZ + st.currentPointerX * 0.025;

      const centerX = width * 0.52;
      const centerY = height * 0.44 - st.unfoldAmount * 8;
      const focal =
        Math.min(width / 430, height / 410, 1.15) * 500 * (1 - st.unfoldAmount * 0.075);

      // Ambient stage radial glow
      const glowX = centerX + st.currentPointerX * 26;
      const glowY = centerY - 10 + st.currentPointerY * 20;
      const bgGrad = ctx.createRadialGradient(
        glowX,
        glowY,
        14,
        centerX,
        centerY,
        Math.max(width, height) * 0.54
      );
      if (isDark) {
        bgGrad.addColorStop(0, "rgba(59, 130, 246, 0.20)");
        bgGrad.addColorStop(0.45, "rgba(99, 102, 241, 0.09)");
        bgGrad.addColorStop(1, "rgba(15, 23, 42, 0)");
      } else {
        bgGrad.addColorStop(0, "rgba(37, 99, 235, 0.13)");
        bgGrad.addColorStop(0.5, "rgba(79, 70, 229, 0.06)");
        bgGrad.addColorStop(1, "rgba(248, 250, 252, 0)");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Ground shadow beneath plinth
      const shadowScale = 1 + st.unfoldAmount * 0.14;
      const shadowCenter = project3D(
        rotate3D({ x: 0, y: 126 + st.unfoldAmount * 20, z: 0 }, rx, ry, rz),
        centerX,
        centerY,
        focal
      );
      ctx.save();
      ctx.translate(shadowCenter.x, shadowCenter.y);
      ctx.scale(1.42 * shadowScale, 0.56 * shadowScale);
      const shadowGrad = ctx.createRadialGradient(0, 0, 12, 0, 0, 150);
      shadowGrad.addColorStop(0, isDark ? "rgba(0, 0, 0, 0.62)" : "rgba(15, 23, 42, 0.22)");
      shadowGrad.addColorStop(0.6, isDark ? "rgba(0, 0, 0, 0.24)" : "rgba(15, 23, 42, 0.08)");
      shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 150, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const getTierOffset = (tier: number) => {
        const unfoldY = (tier - 1.5) * st.unfoldAmount * 30;
        const floatY = reduced ? 0 : Math.sin(elapsed * 1.55 - tier * 0.85) * 2.8;
        const parallaxX = (1.5 - tier) * st.currentPointerX * 7.5;
        const parallaxZ = (1.5 - tier) * st.currentPointerY * 7.5;
        let activeShiftY = 0;
        let activeShiftX = 0;
        if (st.activeLayer !== null) {
          if (tier < st.activeLayer) activeShiftY -= 14;
          if (tier > st.activeLayer) activeShiftY += 14;
          if (tier === st.activeLayer) {
            activeShiftY -= 5;
            activeShiftX -= 6;
          }
        }
        return {
          x: parallaxX + activeShiftX,
          y: unfoldY + floatY + activeShiftY,
          z: parallaxZ,
        };
      };

      const rawLight = {
        x: -0.45 + st.currentPointerX * 0.32,
        y: -0.72 - st.currentPointerY * 0.24,
        z: 0.65,
      };
      const lightLen = Math.hypot(rawLight.x, rawLight.y, rawLight.z) || 1;
      const lightDir = {
        x: rawLight.x / lightLen,
        y: rawLight.y / lightLen,
        z: rawLight.z / lightLen,
      };

      interface FaceRender {
        prism: PrismDef;
        faceName: string;
        pts2d: { x: number; y: number; z: number; scale: number }[];
        normal: { x: number; y: number; z: number };
        sortKey: number;
        tier: number;
      }

      const facesToDraw: FaceRender[] = [];

      for (const prism of PRISMS) {
        const off = getTierOffset(prism.tier);
        const hw = prism.w / 2;
        const hh = prism.h / 2;
        const hd = prism.d / 2;
        const cx = prism.cx + off.x;
        const cy = prism.cy + off.y;
        const cz = prism.cz + off.z;

        const corners3D = [
          { x: cx - hw, y: cy - hh, z: cz - hd },
          { x: cx + hw, y: cy - hh, z: cz - hd },
          { x: cx + hw, y: cy - hh, z: cz + hd },
          { x: cx - hw, y: cy - hh, z: cz + hd },
          { x: cx - hw, y: cy + hh, z: cz - hd },
          { x: cx + hw, y: cy + hh, z: cz - hd },
          { x: cx + hw, y: cy + hh, z: cz + hd },
          { x: cx - hw, y: cy + hh, z: cz + hd },
        ].map((c) => rotate3D(c, rx, ry, rz));

        const corners2D = corners3D.map((c) => project3D(c, centerX, centerY, focal));
        const centerRot = rotate3D({ x: cx, y: cy, z: cz }, rx, ry, rz);

        const faces = [
          { name: "top", indices: [0, 1, 2, 3], localNormal: { x: 0, y: -1, z: 0 } },
          { name: "bottom", indices: [7, 6, 5, 4], localNormal: { x: 0, y: 1, z: 0 } },
          { name: "front", indices: [3, 2, 6, 7], localNormal: { x: 0, y: 0, z: 1 } },
          { name: "back", indices: [1, 0, 4, 5], localNormal: { x: 0, y: 0, z: -1 } },
          { name: "left", indices: [0, 3, 7, 4], localNormal: { x: -1, y: 0, z: 0 } },
          { name: "right", indices: [2, 1, 5, 6], localNormal: { x: 1, y: 0, z: 0 } },
        ];

        for (const f of faces) {
          const norm = rotate3D(f.localNormal, rx, ry, rz);
          const fPts3D = f.indices.map((idx) => corners3D[idx]);
          const fCenter = {
            x: (fPts3D[0].x + fPts3D[1].x + fPts3D[2].x + fPts3D[3].x) * 0.25,
            y: (fPts3D[0].y + fPts3D[1].y + fPts3D[2].y + fPts3D[3].y) * 0.25,
            z: (fPts3D[0].z + fPts3D[1].z + fPts3D[2].z + fPts3D[3].z) * 0.25,
          };
          const viewX = -fCenter.x;
          const viewY = -fCenter.y;
          const viewZ = CAMERA_DIST - fCenter.z;
          if (norm.x * viewX + norm.y * viewY + norm.z * viewZ <= 0) continue;

          const fPts2D = f.indices.map((idx) => corners2D[idx]);
          const sortKey = (3 - prism.tier) * 140 + centerRot.z * 0.65 + fCenter.z * 0.35;
          facesToDraw.push({
            prism,
            faceName: f.name,
            pts2d: fPts2D,
            normal: norm,
            sortKey,
            tier: prism.tier,
          });
        }
      }

      facesToDraw.sort((a, b) => a.sortKey - b.sortKey);

      for (const face of facesToDraw) {
        const { prism, pts2d: D, normal: Be, faceName, tier } = face;
        const isSelected = st.activeLayer === tier;
        const isDimmed = st.activeLayer !== null && st.activeLayer !== tier;
        const dimFactor = isDimmed ? 0.42 : 1;

        const diffuse = Math.max(
          0,
          Be.x * lightDir.x + Be.y * lightDir.y + Be.z * lightDir.z
        );
        const hx = lightDir.x;
        const hy = lightDir.y;
        const hz = lightDir.z + 1;
        const hLen = Math.hypot(hx, hy, hz) || 1;
        const specAngle = Math.max(
          0,
          Be.x * (hx / hLen) + Be.y * (hy / hLen) + Be.z * (hz / hLen)
        );
        const specular = Math.pow(specAngle, 16);

        ctx.save();
        ctx.globalAlpha = assemble * (isDimmed ? 0.54 : 1);
        ctx.beginPath();
        ctx.moveTo(D[0].x, D[0].y);
        ctx.lineTo(D[1].x, D[1].y);
        ctx.lineTo(D[2].x, D[2].y);
        ctx.lineTo(D[3].x, D[3].y);
        ctx.closePath();

        const grad = ctx.createLinearGradient(D[0].x, D[0].y, D[2].x, D[2].y);
        const bevel = (prism.bevelBright ?? 1) * (isSelected ? 1.35 : 1);

        if (prism.material === "smoked-glass" || prism.material === "frosted-glass") {
          const isFrosted = prism.material === "frosted-glass";
          if (isDark) {
            const alpha = isFrosted ? 0.78 : 0.68;
            const lum = Math.round(44 + diffuse * 44 + specular * 78);
            grad.addColorStop(0, `rgba(${lum + 8}, ${lum + 18}, ${lum + 32}, ${alpha})`);
            grad.addColorStop(0.55, `rgba(24, 34, 52, ${alpha * 0.92})`);
            grad.addColorStop(
              1,
              `rgba(${20 + Math.round(specular * 60)}, ${32 + Math.round(specular * 70)}, 56, ${
                alpha + 0.08
              })`
            );
          } else {
            const alpha = isFrosted ? 0.84 : 0.76;
            const lum = Math.min(255, Math.round(54 + diffuse * 46 + specular * 82));
            grad.addColorStop(0, `rgba(${lum - 6}, ${lum + 2}, ${lum + 14}, ${alpha})`);
            grad.addColorStop(0.52, `rgba(30, 41, 59, ${alpha * 0.9})`);
            grad.addColorStop(1, `rgba(${24 + Math.round(specular * 65)}, 36, 54, ${alpha})`);
          }
          ctx.fillStyle = grad;
          ctx.fill();

          if (faceName === "top" && prism.hasGrid) {
            ctx.save();
            ctx.clip();
            ctx.strokeStyle = isDark
              ? `rgba(226, 232, 240, ${0.13 * dimFactor})`
              : `rgba(248, 250, 252, ${0.18 * dimFactor})`;
            ctx.lineWidth = 0.75;
            const divisions = 6;
            for (let i = 1; i < divisions; i++) {
              const t = i / divisions;
              const xA = D[0].x + (D[1].x - D[0].x) * t;
              const yA = D[0].y + (D[1].y - D[0].y) * t;
              const xB = D[3].x + (D[2].x - D[3].x) * t;
              const yB = D[3].y + (D[2].y - D[3].y) * t;
              ctx.beginPath();
              ctx.moveTo(xA, yA);
              ctx.lineTo(xB, yB);
              ctx.stroke();

              const xC = D[0].x + (D[3].x - D[0].x) * t;
              const yC = D[0].y + (D[3].y - D[0].y) * t;
              const xD = D[1].x + (D[2].x - D[1].x) * t;
              const yD = D[1].y + (D[2].y - D[1].y) * t;
              ctx.beginPath();
              ctx.moveTo(xC, yC);
              ctx.lineTo(xD, yD);
              ctx.stroke();
            }

            // Specular sheen across glass top
            const sheenShift = (st.currentPointerX - st.currentPointerY) * 0.22;
            const sheenGrad = ctx.createLinearGradient(D[0].x, D[0].y, D[2].x, D[2].y);
            const mid = Math.max(0.15, Math.min(0.85, 0.48 + sheenShift));
            sheenGrad.addColorStop(Math.max(0, mid - 0.18), "rgba(255, 255, 255, 0)");
            sheenGrad.addColorStop(
              mid,
              isDark
                ? `rgba(147, 197, 253, ${0.16 + specular * 0.2})`
                : `rgba(255, 255, 255, ${0.24 + specular * 0.22})`
            );
            sheenGrad.addColorStop(Math.min(1, mid + 0.18), "rgba(255, 255, 255, 0)");
            ctx.fillStyle = sheenGrad;
            ctx.fill();

            if (prism.hasReticle) {
              const rxCenter = (D[0].x + D[1].x + D[2].x + D[3].x) * 0.25;
              const ryCenter = (D[0].y + D[1].y + D[2].y + D[3].y) * 0.25;
              ctx.strokeStyle = isDark
                ? "rgba(96, 165, 250, 0.72)"
                : "rgba(37, 99, 235, 0.82)";
              ctx.lineWidth = 1.15;
              ctx.beginPath();
              ctx.ellipse(rxCenter, ryCenter, 36, 20, -0.22, 0, Math.PI * 2);
              ctx.stroke();

              ctx.strokeStyle = "rgba(226, 232, 240, 0.34)";
              ctx.beginPath();
              ctx.ellipse(rxCenter, ryCenter, 62, 34, -0.22, 0, Math.PI * 2);
              ctx.stroke();
            }
            ctx.restore();
          }
        } else if (prism.material === "brushed-metal") {
          const base = isDark ? 72 : 94;
          const hi = Math.min(248, Math.round(base + diffuse * 68 + specular * 88));
          const lo = Math.max(28, Math.round(base - 20 + diffuse * 26));
          grad.addColorStop(0, `rgb(${hi - 4}, ${hi}, ${hi + 6})`);
          grad.addColorStop(
            0.55,
            `rgb(${Math.round((hi + lo) * 0.49)}, ${Math.round((hi + lo) * 0.51)}, ${Math.round(
              (hi + lo) * 0.54
            )})`
          );
          grad.addColorStop(1, `rgb(${lo}, ${lo + 2}, ${lo + 5})`);
          ctx.fillStyle = grad;
          ctx.fill();
        } else if (prism.material === "anodized-dark" || prism.material === "plinth") {
          const base = prism.material === "plinth" ? (isDark ? 24 : 36) : isDark ? 42 : 54;
          const hi = Math.min(210, Math.round(base + diffuse * 46 + specular * 58));
          const lo = Math.max(14, base - 10);
          grad.addColorStop(0, `rgb(${hi - 2}, ${hi + 2}, ${hi + 8})`);
          grad.addColorStop(1, `rgb(${lo}, ${lo + 2}, ${lo + 6})`);
          ctx.fillStyle = grad;
          ctx.fill();

          if (faceName === "top" && prism.hasGrid) {
            ctx.save();
            ctx.clip();
            ctx.strokeStyle = isDark
              ? "rgba(96, 165, 250, 0.18)"
              : "rgba(248, 250, 252, 0.2)";
            ctx.lineWidth = 0.75;
            const divs = 8;
            for (let i = 1; i < divs; i++) {
              const t = i / divs;
              const xA = D[0].x + (D[1].x - D[0].x) * t;
              const yA = D[0].y + (D[1].y - D[0].y) * t;
              const xB = D[3].x + (D[2].x - D[3].x) * t;
              const yB = D[3].y + (D[2].y - D[3].y) * t;
              ctx.beginPath();
              ctx.moveTo(xA, yA);
              ctx.lineTo(xB, yB);
              ctx.stroke();
            }
            ctx.restore();
          }
        } else if (prism.material === "core-accent") {
          const pulse = reduced ? 0.5 : 0.5 + 0.5 * Math.sin(elapsed * 2.8);
          const r = Math.min(255, Math.round(45 + diffuse * 38 + pulse * 16));
          const g = Math.min(255, Math.round(115 + diffuse * 52 + specular * 68 + pulse * 14));
          const b = Math.min(255, Math.round(235 + diffuse * 20 + specular * 20));
          grad.addColorStop(0, `rgb(${r}, ${g}, ${b})`);
          grad.addColorStop(
            1,
            `rgb(${Math.max(25, r - 24)}, ${Math.max(64, g - 38)}, ${Math.max(165, b - 45)})`
          );
          ctx.fillStyle = grad;
          ctx.fill();
        } else if (prism.material === "core-sage") {
          const r = Math.min(255, Math.round(36 + diffuse * 34 + specular * 42));
          const g = Math.min(255, Math.round(148 + diffuse * 50 + specular * 58));
          const b = Math.min(255, Math.round(126 + diffuse * 44 + specular * 48));
          grad.addColorStop(0, `rgb(${r}, ${g}, ${b})`);
          grad.addColorStop(
            1,
            `rgb(${Math.max(20, r - 18)}, ${Math.max(88, g - 36)}, ${Math.max(72, b - 30)})`
          );
          ctx.fillStyle = grad;
          ctx.fill();
        }

        const edgeAlpha = Math.min(0.95, (faceName === "top" ? 0.46 : 0.26) * bevel + specular * 0.35);
        if (isSelected) {
          ctx.strokeStyle = isDark
            ? `rgba(96, 165, 250, ${Math.min(1, edgeAlpha * 1.5)})`
            : `rgba(37, 99, 235, ${Math.min(1, edgeAlpha * 1.5)})`;
          ctx.lineWidth = faceName === "top" ? 1.5 : 1.1;
        } else {
          ctx.strokeStyle = isDark
            ? `rgba(226, 232, 240, ${edgeAlpha * 0.72})`
            : `rgba(255, 255, 255, ${edgeAlpha * 0.85})`;
          ctx.lineWidth = faceName === "top" ? 1.15 : 0.8;
        }
        ctx.stroke();
        ctx.restore();
      }

      // Vertical & cross-tier animated data conduits
      for (const conduit of CONDUITS) {
        const pts2D = conduit.points.map((pt, idx) => {
          const tierFloat =
            conduit.fromTier +
            ((conduit.toTier - conduit.fromTier) * idx) / Math.max(1, conduit.points.length - 1);
          const lowTier = Math.floor(tierFloat);
          const highTier = Math.min(3, Math.ceil(tierFloat));
          const frac = tierFloat - lowTier;
          const offLow = getTierOffset(lowTier);
          const offHigh = getTierOffset(highTier);
          const worldPt = {
            x: pt.x + offLow.x + (offHigh.x - offLow.x) * frac,
            y: pt.y + offLow.y + (offHigh.y - offLow.y) * frac,
            z: pt.z + offLow.z + (offHigh.z - offLow.z) * frac,
          };
          return project3D(rotate3D(worldPt, rx, ry, rz), centerX, centerY, focal);
        });

        ctx.save();
        ctx.globalAlpha = assemble * 0.88;
        ctx.beginPath();
        ctx.moveTo(pts2D[0].x, pts2D[0].y);
        for (let i = 1; i < pts2D.length; i++) {
          ctx.lineTo(pts2D[i].x, pts2D[i].y);
        }
        ctx.strokeStyle =
          conduit.accent === "terracotta"
            ? isDark
              ? "rgba(96, 165, 250, 0.5)"
              : "rgba(37, 99, 235, 0.45)"
            : isDark
            ? "rgba(52, 211, 153, 0.45)"
            : "rgba(16, 185, 129, 0.4)";
        ctx.lineWidth = 1.4;
        ctx.setLineDash([3, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        for (const p of pts2D) {
          ctx.fillStyle =
            conduit.accent === "terracotta"
              ? isDark
                ? "#60a5fa"
                : "#2563eb"
              : isDark
              ? "#34d399"
              : "#059669";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Animated data pulse orb traveling along conduit
        const speedMult = 1 + heroScroll * 1.25;
        const progress = reduced
          ? (conduit.phase + 0.45) % 1
          : (elapsed * conduit.speed * speedMult + conduit.phase) % 1;
        const segCount = pts2D.length - 1;
        const totalPos = Math.max(0, progress) * segCount;
        const segIdx = Math.max(0, Math.min(segCount - 1, Math.floor(totalPos)));
        const segFrac = totalPos - segIdx;
        const p0 = pts2D[segIdx];
        const p1 = pts2D[segIdx + 1];
        const px = p0.x + (p1.x - p0.x) * segFrac;
        const py = p0.y + (p1.y - p0.y) * segFrac;

        const pulseRadius = 15;
        const pulseGrad = ctx.createRadialGradient(px, py, 1, px, py, pulseRadius);
        if (conduit.accent === "terracotta") {
          pulseGrad.addColorStop(0, "rgba(239, 246, 255, 0.98)");
          pulseGrad.addColorStop(0.35, "rgba(59, 130, 246, 0.8)");
          pulseGrad.addColorStop(1, "rgba(37, 99, 235, 0)");
        } else {
          pulseGrad.addColorStop(0, "rgba(236, 253, 245, 0.98)");
          pulseGrad.addColorStop(0.35, "rgba(16, 185, 129, 0.75)");
          pulseGrad.addColorStop(1, "rgba(5, 150, 105, 0)");
        }
        ctx.fillStyle = pulseGrad;
        ctx.beginPath();
        ctx.arc(px, py, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3D Layer Callout Labels (L1 · UI, L2 · STATE, L3 · API, L4 · DATA)
      const calloutLabels = ["L1 · UI", "L2 · STATE", "L3 · API", "L4 · DATA"];
      const tierYPositions = [-84, -28, 26, 92];
      for (let q = 0; q < 4; q++) {
        const off = getTierOffset(q);
        const yPos = tierYPositions[q] + off.y;
        const worldAnchor = rotate3D({ x: -124 + off.x, y: yPos, z: 22 + off.z }, rx, ry, rz);
        const screenAnchor = project3D(worldAnchor, centerX, centerY, focal);
        const isCurrent = st.activeLayer === q;

        ctx.save();
        ctx.globalAlpha = assemble * (isCurrent ? 1 : 0.6);
        const color = isCurrent
          ? isDark
            ? "#60a5fa"
            : "#2563eb"
          : isDark
          ? "rgba(226, 232, 240, 0.52)"
          : "rgba(30, 41, 59, 0.48)";
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = isCurrent ? 1.3 : 0.85;
        ctx.beginPath();
        ctx.arc(screenAnchor.x, screenAnchor.y, isCurrent ? 3.5 : 2.3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(screenAnchor.x - 6, screenAnchor.y);
        ctx.lineTo(screenAnchor.x - 22, screenAnchor.y);
        ctx.stroke();

        ctx.font = "600 8.5px var(--font-geist-mono, monospace)";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(calloutLabels[q], screenAnchor.x - 26, screenAnchor.y);
        ctx.restore();
      }

      ctx.restore();
      if (!reduced && isVisible && !document.hidden) {
        rafId = requestAnimationFrame(render);
      }
    };

    const triggerRender = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(render);
    };

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            isVisible = entry.isIntersecting;
            if (isVisible) triggerRender();
            else cancelAnimationFrame(rafId);
          }
        },
        { threshold: 0.02 }
      );
      observer.observe(stage);
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (reducedMotionQuery.matches) return;
      const rect = stage.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      stateRef.current.targetPointerX = Math.max(-1, Math.min(1, nx));
      stateRef.current.targetPointerY = Math.max(-1, Math.min(1, ny));

      if (stateRef.current.isDragging) {
        const dx = e.clientX - stateRef.current.lastClientX;
        const dy = e.clientY - stateRef.current.lastClientY;
        stateRef.current.dragRotY += dx * 0.007;
        stateRef.current.dragRotX = Math.max(
          -0.45,
          Math.min(0.45, stateRef.current.dragRotX - dy * 0.005)
        );
        stateRef.current.lastClientX = e.clientX;
        stateRef.current.lastClientY = e.clientY;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.lastClientX = e.clientX;
      stateRef.current.lastClientY = e.clientY;
    };

    const handlePointerUp = () => {
      stateRef.current.isDragging = false;
    };

    const handlePointerLeave = () => {
      stateRef.current.isDragging = false;
      stateRef.current.targetPointerX = 0;
      stateRef.current.targetPointerY = 0;
    };

    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else if (isVisible) triggerRender();
    };

    const themeObserver = new MutationObserver(() => {
      if (isVisible) triggerRender();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    stage.addEventListener("pointermove", handlePointerMove, { passive: true });
    stage.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    stage.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("resize", triggerRender);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotionQuery.addEventListener("change", triggerRender);

    triggerRender();

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      themeObserver.disconnect();
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      stage.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", triggerRender);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotionQuery.removeEventListener("change", triggerRender);
    };
  }, [activeLayer, exploded]);

  const selectedInfo = activeLayer !== null ? LAYERS[activeLayer] : null;

  return (
    <div
      ref={stageRef}
      role="region"
      aria-label="Interactive 3D architectural visualization of software layers from interface to infrastructure"
      className="systems-stage relative select-none rounded-xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-slate-100/90 via-white/95 to-slate-50/90 dark:from-slate-900/90 dark:via-[#0f172a]/95 dark:to-slate-950/90 overflow-hidden shadow-[0_24px_70px_-28px_rgba(15,23,42,0.28)]"
    >
      {/* Subtle Architectural Grid Mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(148,163,184,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.22)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(circle_at_52%_44%,black_22%,transparent_80%)]"
      />

      {/* Top Stage Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-slate-200/80 dark:border-slate-800 text-[10px] font-mono font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"
          />
          <span>SYSTEMS IN MOTION · 04 STRATA</span>
        </span>

        <button
          type="button"
          onClick={() => setExploded((prev) => !prev)}
          aria-pressed={exploded}
          className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-[10px] tracking-wider uppercase hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
        >
          <Layers size={12} aria-hidden="true" />
          <span>{exploded ? "Assemble view" : "Unfold layers"}</span>
        </button>
      </div>

      {/* 3D Interactive Canvas Viewport */}
      <div className="relative h-[340px] sm:h-[390px] lg:h-[410px]">
        <canvas
          ref={canvasRef}
          className="relative z-10 block w-full h-full cursor-grab active:cursor-grabbing"
        >
          Layered system architecture: 01 Interface, 02 State and Logic, 03 Services and API, 04 Infrastructure.
        </canvas>

        {/* Top-Right Rotating Stamp Badge */}
        <a
          href="#projects"
          aria-label="Explore selected work"
          className="z-20 hidden sm:flex absolute right-4 top-3.5 w-24 h-24 border border-slate-200/90 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full items-center justify-center gap-1.5 -rotate-12 hover:rotate-0 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 shadow-md group"
        >
          <ArrowDownRight
            size={22}
            strokeWidth={1.4}
            className="text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"
          />
          <span className="text-[8px] font-mono leading-[1.45] tracking-[1.1px] font-semibold text-slate-800 dark:text-slate-200 uppercase">
            BUILT TO
            <br />
            BE USED
          </span>
        </a>

        {/* Bottom Glass HUD Readout */}
        <div
          aria-live="polite"
          className="pointer-events-none z-20 absolute left-3.5 bottom-3 right-3.5 flex items-end justify-between gap-3"
        >
          <div className="max-w-[310px] px-3 py-2 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm">
            <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {selectedInfo
                ? `${selectedInfo.code} / ${selectedInfo.name} — ${selectedInfo.role}`
                : "01–04 / Full-Stack Architecture"}
            </p>
            <p className="text-[11px] text-slate-700 dark:text-slate-200 mt-0.5 leading-snug">
              {selectedInfo
                ? selectedInfo.detail
                : "Smoked glass interface · API runtime · Persistent storage"}
            </p>
          </div>

          <span className="hidden sm:inline-block text-[9px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400 bg-white/85 dark:bg-slate-900/85 px-2.5 py-1.5 rounded-md border border-slate-200/90 dark:border-slate-800 backdrop-blur-md">
            {selectedInfo ? selectedInfo.metrics : "Interactive 3D"}
          </span>
        </div>
      </div>

      {/* Bottom 4-Layer Inspector Selector Bar */}
      <div
        role="group"
        aria-label="Inspect architecture layers"
        className="relative z-10 grid grid-cols-2 sm:grid-cols-4 border-t border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90"
      >
        {LAYERS.map((layer) => {
          const isActive = activeLayer === layer.id;
          return (
            <button
              key={layer.code}
              type="button"
              onMouseEnter={() => setActiveLayer(layer.id)}
              onMouseLeave={() => setActiveLayer(null)}
              onFocus={() => setActiveLayer(layer.id)}
              onBlur={() => setActiveLayer(null)}
              onClick={() =>
                setActiveLayer((prev) => (prev === layer.id ? null : layer.id))
              }
              aria-pressed={isActive}
              className={`text-left px-3.5 py-3 border-r border-slate-200/80 dark:border-slate-800 last:border-r-0 max-sm:[&:nth-child(2)]:border-r-0 max-sm:[&:nth-child(-n+2)]:border-b transition-colors ${
                isActive
                  ? "bg-blue-50/80 dark:bg-slate-800/90 text-slate-900 dark:text-white"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span className="flex items-center justify-between text-[9px] font-mono font-semibold tracking-wider uppercase">
                <span className={isActive ? "text-blue-600 dark:text-blue-400" : ""}>
                  {layer.code}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-transform ${
                    isActive
                      ? "bg-blue-600 dark:bg-blue-400 scale-125"
                      : "bg-slate-300 dark:bg-slate-700"
                  }`}
                />
              </span>
              <span className="block text-xs font-semibold text-slate-900 dark:text-slate-100 mt-1 tracking-tight">
                {layer.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SystemsStage3D;
