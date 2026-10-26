"use client";
import React, { useEffect } from "react";

interface BlueprintPath {
  d: string;
  range: string;
  accent?: boolean;
  strong?: boolean;
  mobileHide?: boolean;
  pulseRange?: string;
}

interface BlueprintCircle {
  cx: number;
  cy: number;
  r: number;
  range: string;
  accent?: boolean;
  mobileHide?: boolean;
  rotate?: number;
}

interface BlueprintNode {
  cx: number;
  cy: number;
  r?: number;
  at: number;
  kind: "accent" | "hollow" | "muted";
  mobileHide?: boolean;
}

const BLUEPRINT_PATHS: BlueprintPath[] = [
  { d: "M 56 0 V 760", range: "-0.25,0.06", mobileHide: true },
  { d: "M -20 136 H 384 Q 412 136 412 164 V 238 Q 412 266 440 266 H 740", range: "-0.18,0.05" },
  { d: "M 468 72 L 892 496", range: "-0.12,0.08", mobileHide: true },
  { d: "M 740 118 L 868 68 L 964 148 L 838 206 Z", range: "-0.10,0.09", accent: true, mobileHide: true },
  {
    d: "M 684 266 V 568 Q 684 596 712 596 H 916 Q 944 596 944 624 V 1040",
    range: "-0.06,0.16",
    strong: true,
    pulseRange: "0.00,0.22",
  },
  { d: "M 944 912 H 524 Q 496 912 496 940 V 1042 Q 496 1070 468 1070 H 96", range: "0.02,0.19" },
  {
    d: "M 684 596 V 962 Q 684 990 712 990 H 1356 Q 1384 990 1384 1018 V 1812",
    range: "0.03,0.31",
    strong: true,
    pulseRange: "0.05,0.35",
  },
  { d: "M 564 882 L 684 826 L 788 912 L 652 978 Z", range: "0.05,0.19", accent: true },
  { d: "M 588 1048 L 948 838", range: "0.06,0.21", mobileHide: true },
  {
    d: "M 56 760 V 1764 Q 56 1792 84 1792 H 644 Q 672 1792 672 1820 V 1916 Q 672 1944 700 1944 H 1268",
    range: "0.08,0.28",
    pulseRange: "0.10,0.32",
  },
  {
    d: "M 1384 1812 Q 1384 1840 1356 1840 H 416 Q 388 1840 388 1868 V 2772",
    range: "0.13,0.34",
    strong: true,
    pulseRange: "0.14,0.40",
  },
  { d: "M 268 1840 V 1756 Q 268 1732 292 1732 H 532 Q 556 1732 556 1756 V 2024", range: "0.14,0.28", mobileHide: true },
  {
    d: "M 836 1740 V 1992 Q 836 2020 864 2020 H 1340 Q 1368 2020 1368 2048 V 2844",
    range: "0.16,0.37",
    pulseRange: "0.18,0.42",
  },
  { d: "M 968 1996 L 1408 1556", range: "0.15,0.29", accent: true, mobileHide: true },
  {
    d: "M 388 2772 Q 388 2800 416 2800 H 1044 Q 1072 2800 1072 2828 V 3980",
    range: "0.24,0.48",
    strong: true,
    pulseRange: "0.25,0.52",
  },
  {
    d: "M 1368 2844 Q 1368 2872 1340 2872 H 236 Q 208 2872 208 2900 V 4180",
    range: "0.26,0.52",
    pulseRange: "0.28,0.56",
  },
  { d: "M 164 2732 H 92 Q 68 2732 68 2756 V 2828 Q 68 2852 92 2852 H 612", range: "0.27,0.40", mobileHide: true },
  { d: "M 664 2800 L 772 2736 L 884 2800 L 772 2872 Z", range: "0.28,0.41", accent: true },
  {
    d: "M 208 3580 H 584 Q 612 3580 612 3608 V 3980 H 1290",
    range: "0.36,0.60",
    strong: true,
    pulseRange: "0.38,0.64",
  },
  { d: "M 312 3720 L 668 3460", range: "0.40,0.58", accent: true, mobileHide: true },
  {
    d: "M 208 4180 V 4432 Q 208 4460 236 4460 H 1360",
    range: "0.50,0.75",
    strong: true,
    pulseRange: "0.52,0.78",
  },
  { d: "M 240 4460 V 4810", range: "0.55,0.76" },
  {
    d: "M 720 4460 V 5162 Q 720 5190 692 5190 H 432 Q 404 5190 404 5218 V 6380",
    range: "0.58,0.92",
    strong: true,
    pulseRange: "0.60,0.94",
  },
  { d: "M 1180 4460 V 4820", range: "0.60,0.77" },
  { d: "M 984 4254 L 1124 4186 L 1256 4266 L 1172 4362 Z", range: "0.54,0.73", accent: true, mobileHide: true },
  { d: "M 920 4460 L 1348 4160", range: "0.56,0.74", mobileHide: true },
  {
    d: "M 1072 3980 V 5012 Q 1072 5040 1044 5040 H 212 Q 184 5040 184 5068 V 5920",
    range: "0.62,0.88",
    pulseRange: "0.64,0.90",
  },
  { d: "M 244 5188 L 692 4964", range: "0.66,0.83", accent: true, mobileHide: true },
  { d: "M 184 5840 Q 184 5868 212 5868 H 548 Q 576 5868 576 5896 V 6420", range: "0.72,0.94" },
  { d: "M 96 5720 V 6012 Q 96 6040 124 6040 H 496", range: "0.74,0.93", mobileHide: true },
  {
    d: "M 104 6180 V 6482 Q 104 6510 132 6510 H 1096 L 1176 6430 H 1336",
    range: "0.78,0.99",
    strong: true,
    pulseRange: "0.80,1.00",
  },
  { d: "M 404 6380 V 6430 H 1176", range: "0.80,0.98" },
  { d: "M 1068 6582 L 1356 6294", range: "0.82,0.99", accent: true },
  { d: "M 664 6510 V 6895", range: "0.84,1.00" },
];

const BLUEPRINT_CIRCLES: BlueprintCircle[] = [
  { cx: 1084, cy: 324, r: 348, range: "-0.20,0.08" },
  { cx: 1084, cy: 324, r: 248, range: "-0.14,0.10", accent: true, rotate: -45 },
  { cx: 190, cy: 640, r: 220, range: "-0.08,0.14", mobileHide: true, rotate: 20 },
  { cx: 764, cy: 948, r: 176, range: "0.03,0.21", rotate: -90 },
  { cx: 764, cy: 948, r: 228, range: "0.05,0.23", accent: true, mobileHide: true, rotate: 35 },
  { cx: 1388, cy: 1840, r: 356, range: "0.12,0.30", rotate: 110 },
  { cx: 1388, cy: 1840, r: 252, range: "0.14,0.32", accent: true, rotate: -140 },
  { cx: 64, cy: 2840, r: 348, range: "0.22,0.44", rotate: -30 },
  { cx: 64, cy: 2840, r: 244, range: "0.24,0.46", accent: true, mobileHide: true, rotate: 15 },
  { cx: 460, cy: 3620, r: 218, range: "0.35,0.58", rotate: -60 },
  { cx: 1072, cy: 3980, r: 148, range: "0.42,0.64", accent: true, mobileHide: true, rotate: 40 },
  { cx: 1172, cy: 4346, r: 286, range: "0.50,0.76", rotate: 95 },
  { cx: 1172, cy: 4346, r: 196, range: "0.53,0.78", accent: true, mobileHide: true, rotate: -120 },
  { cx: 468, cy: 5110, r: 232, range: "0.62,0.85", rotate: -40 },
  { cx: 468, cy: 5110, r: 156, range: "0.65,0.87", accent: true, mobileHide: true, rotate: 60 },
  { cx: 312, cy: 5920, r: 196, range: "0.72,0.93", mobileHide: true, rotate: -80 },
  { cx: 1236, cy: 6430, r: 214, range: "0.78,0.98", mobileHide: true, rotate: 120 },
  { cx: 1236, cy: 6430, r: 152, range: "0.80,0.99", accent: true, rotate: -90 },
  { cx: 1236, cy: 6430, r: 98, range: "0.82,1.00", rotate: 45 },
];

const BLUEPRINT_NODES: BlueprintNode[] = [
  { cx: 56, cy: 136, r: 3.2, at: -0.05, kind: "muted", mobileHide: true },
  { cx: 412, cy: 202, r: 3.6, at: -0.02, kind: "accent" },
  { cx: 684, cy: 266, r: 3.8, at: 0, kind: "accent" },
  { cx: 868, cy: 68, r: 3.0, at: 0.01, kind: "accent", mobileHide: true },
  { cx: 964, cy: 148, r: 3.4, at: 0.03, kind: "hollow", mobileHide: true },
  { cx: 838, cy: 206, r: 3.0, at: 0.04, kind: "muted", mobileHide: true },
  { cx: 684, cy: 596, r: 4.0, at: 0.06, kind: "accent" },
  { cx: 944, cy: 912, r: 3.8, at: 0.08, kind: "accent" },
  { cx: 564, cy: 882, r: 3.2, at: 0.1, kind: "muted" },
  { cx: 684, cy: 826, r: 3.6, at: 0.12, kind: "accent" },
  { cx: 788, cy: 912, r: 3.4, at: 0.14, kind: "hollow" },
  { cx: 652, cy: 978, r: 3.2, at: 0.15, kind: "accent" },
  { cx: 496, cy: 990, r: 3.4, at: 0.16, kind: "hollow" },
  { cx: 96, cy: 1070, r: 4.0, at: 0.18, kind: "muted" },
  { cx: 388, cy: 1840, r: 3.8, at: 0.19, kind: "accent" },
  { cx: 556, cy: 1840, r: 3.2, at: 0.21, kind: "muted", mobileHide: true },
  { cx: 672, cy: 1840, r: 3.6, at: 0.22, kind: "hollow" },
  { cx: 836, cy: 1840, r: 3.8, at: 0.24, kind: "accent" },
  { cx: 836, cy: 1944, r: 3.2, at: 0.25, kind: "muted" },
  { cx: 1268, cy: 1944, r: 4.2, at: 0.27, kind: "accent" },
  { cx: 388, cy: 2800, r: 3.8, at: 0.31, kind: "accent" },
  { cx: 664, cy: 2800, r: 3.2, at: 0.33, kind: "muted" },
  { cx: 772, cy: 2736, r: 3.6, at: 0.34, kind: "accent" },
  { cx: 884, cy: 2800, r: 3.4, at: 0.36, kind: "hollow" },
  { cx: 772, cy: 2872, r: 3.6, at: 0.37, kind: "accent" },
  { cx: 1072, cy: 2872, r: 4.0, at: 0.39, kind: "accent" },
  { cx: 612, cy: 3580, r: 3.6, at: 0.45, kind: "hollow" },
  { cx: 1072, cy: 3980, r: 3.8, at: 0.50, kind: "accent" },
  { cx: 240, cy: 4460, r: 4.0, at: 0.58, kind: "accent" },
  { cx: 720, cy: 4460, r: 4.0, at: 0.61, kind: "accent" },
  { cx: 1180, cy: 4460, r: 4.0, at: 0.64, kind: "accent" },
  { cx: 984, cy: 4254, r: 3.2, at: 0.57, kind: "muted", mobileHide: true },
  { cx: 1124, cy: 4186, r: 3.6, at: 0.60, kind: "accent", mobileHide: true },
  { cx: 1256, cy: 4266, r: 3.2, at: 0.63, kind: "muted", mobileHide: true },
  { cx: 720, cy: 5040, r: 3.8, at: 0.70, kind: "accent" },
  { cx: 468, cy: 5040, r: 3.4, at: 0.73, kind: "hollow" },
  { cx: 404, cy: 5868, r: 3.6, at: 0.78, kind: "accent" },
  { cx: 576, cy: 5868, r: 3.2, at: 0.81, kind: "muted" },
  { cx: 404, cy: 6430, r: 3.4, at: 0.84, kind: "muted" },
  { cx: 664, cy: 6510, r: 3.8, at: 0.86, kind: "hollow" },
  { cx: 1096, cy: 6510, r: 3.8, at: 0.88, kind: "accent" },
  { cx: 1176, cy: 6430, r: 4.2, at: 0.90, kind: "accent" },
  { cx: 1236, cy: 6278, r: 3.4, at: 0.92, kind: "accent" },
  { cx: 1236, cy: 6582, r: 3.4, at: 0.94, kind: "muted" },
];

export const Dev3DBackground: React.FC = () => {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;

    const rangeEls: { el: SVGElement; start: number; span: number }[] = [];
    document.querySelectorAll<SVGElement>("[data-bp-range]").forEach((el) => {
      const raw = el.getAttribute("data-bp-range") || "0,1";
      const [s, e] = raw.split(",").map(Number);
      const start = Number.isFinite(s) ? s : 0;
      const end = Number.isFinite(e) ? e : 1;
      rangeEls.push({ el, start, span: Math.max(0.01, end - start) });
    });

    const pulseEls: { el: SVGElement; start: number; span: number }[] = [];
    document.querySelectorAll<SVGElement>("[data-bp-pulse]").forEach((el) => {
      const raw = el.getAttribute("data-bp-pulse") || "0,1";
      const [s, e] = raw.split(",").map(Number);
      const start = Number.isFinite(s) ? s : 0;
      const end = Number.isFinite(e) ? e : 1;
      pulseEls.push({ el, start, span: Math.max(0.01, end - start) });
    });

    const nodeEls: { el: SVGElement; at: number }[] = [];
    document.querySelectorAll<SVGElement>("[data-bp-node]").forEach((el) => {
      const at = Number(el.getAttribute("data-bp-node") || "0");
      nodeEls.push({ el, at: Number.isFinite(at) ? at : 0 });
    });

    const getScrollProgress = () => {
      const sy = window.scrollY;
      const vh = window.innerHeight || 1;
      const maxScroll = document.documentElement.scrollHeight - vh;
      return maxScroll > 0 ? Math.max(0, Math.min(1, sy / maxScroll)) : 0;
    };

    let currentProgress = getScrollProgress();

    const applyBlueprintState = (progress: number, isReduced: boolean) => {
      if (isReduced) {
        for (const item of rangeEls) {
          item.el.style.strokeDashoffset = "0";
          item.el.style.opacity = "1";
        }
        for (const item of nodeEls) {
          item.el.style.opacity = "1";
          item.el.style.transform = "scale(1)";
        }
        for (const item of pulseEls) {
          item.el.style.opacity = "0";
        }
        return;
      }

      for (const item of rangeEls) {
        // Expand visibility window slightly ahead of scroll so upcoming sections already show blueprint activity
        const raw = (progress + 0.08 - item.start) / item.span;
        const clamped = raw <= 0 ? 0 : raw >= 1 ? 1 : raw;
        const smooth = clamped * clamped * (3 - 2 * clamped);
        item.el.style.strokeDashoffset = (1 - smooth).toFixed(4);
        item.el.style.opacity = clamped <= 0.001 ? "0" : Math.min(1, 0.25 + clamped * 3.2).toFixed(3);
      }

      for (const item of nodeEls) {
        const raw = (progress + 0.08 - item.at) / 0.055;
        const inv = 1 - (raw <= 0 ? 0 : raw >= 1 ? 1 : raw);
        const smooth = 1 - inv * inv * inv;
        item.el.style.opacity = smooth.toFixed(3);
        item.el.style.transform = `scale(${(0.3 + 0.7 * smooth).toFixed(3)})`;
      }

      for (const item of pulseEls) {
        const raw = (progress + 0.06 - item.start) / item.span;
        if (raw <= 0 || raw >= 1.15) {
          item.el.style.opacity = "0";
        } else {
          const norm = Math.min(1, raw);
          const op = Math.sin(norm * Math.PI) * 0.95;
          item.el.style.opacity = op.toFixed(3);
          item.el.style.strokeDashoffset = (1.02 - norm * 1.14).toFixed(4);
        }
      }
    };

    const tick = () => {
      const sy = window.scrollY;
      const vh = window.innerHeight || 1;
      const targetProgress = getScrollProgress();
      const delta = targetProgress - currentProgress;
      const needsMoreFrames = !reducedMotion.matches && Math.abs(delta) > 0.0002;

      if (needsMoreFrames) {
        currentProgress += delta * 0.28;
      } else {
        currentProgress = targetProgress;
      }

      document.documentElement.style.setProperty("--progress", currentProgress.toFixed(5));
      const heroSpan = Math.max(420, vh * 0.82);
      const heroScroll = Math.max(0, Math.min(1, sy / heroSpan));
      document.documentElement.style.setProperty("--hero-scroll", heroScroll.toFixed(4));

      applyBlueprintState(currentProgress, reducedMotion.matches);

      if (needsMoreFrames) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const requestTick = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    currentProgress = getScrollProgress();
    tick();

    // Observe body height changes (e.g., when Firestore projects load or Read More expands)
    let resizeObserver: ResizeObserver | undefined;
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => {
        requestTick();
      });
      resizeObserver.observe(document.body);
    }

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="living-blueprint pointer-events-none absolute inset-0 z-[1] overflow-hidden select-none print:hidden"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 6920"
        fill="none"
        preserveAspectRatio="xMidYMin slice"
      >
        {/* Base Faint Architectural Schematic Guide Layer (always visible across all sections) */}
        <g className="opacity-25 dark:opacity-30">
          {BLUEPRINT_CIRCLES.map((c, idx) => (
            <circle
              key={`bp-guide-circle-${idx}`}
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              strokeDasharray="4 6"
              className="bp-stroke-main"
              strokeWidth="0.75"
            />
          ))}
          {BLUEPRINT_PATHS.map((p, idx) => (
            <path
              key={`bp-guide-path-${idx}`}
              d={p.d}
              strokeDasharray="3 6"
              className="bp-stroke-main"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Scroll-Drawn Active Blueprint Circles */}
        <g className="bp-plane-circles">
          {BLUEPRINT_CIRCLES.map((c, idx) => (
            <circle
              key={`bp-circle-${idx}`}
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              pathLength={1}
              data-bp-range={c.range}
              transform={c.rotate ? `rotate(${c.rotate} ${c.cx} ${c.cy})` : undefined}
              className={`bp-scroll-path ${
                c.accent ? "bp-stroke-accent" : "bp-stroke-main"
              } ${c.mobileHide ? "max-md:hidden" : ""}`}
              strokeWidth={c.accent ? "1.25" : "1.1"}
            />
          ))}
        </g>

        {/* Scroll-Drawn Active Blueprint Conduits, Signal Pulses & Nodes */}
        <g className="bp-plane-lines">
          {BLUEPRINT_PATHS.map((p, idx) => (
            <g key={`bp-path-${idx}`} className={p.mobileHide ? "max-md:hidden" : undefined}>
              <path
                d={p.d}
                pathLength={1}
                data-bp-range={p.range}
                className={`bp-scroll-path ${
                  p.accent
                    ? "bp-stroke-accent"
                    : p.strong
                    ? "bp-stroke-strong"
                    : "bp-stroke-main"
                }`}
                strokeWidth={p.strong ? "1.45" : "1.15"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {p.pulseRange && (
                <path
                  d={p.d}
                  pathLength={1}
                  data-bp-pulse={p.pulseRange}
                  className="bp-scroll-pulse"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              )}
            </g>
          ))}

          {BLUEPRINT_NODES.map((n, idx) => (
            <circle
              key={`bp-node-${idx}`}
              cx={n.cx}
              cy={n.cy}
              r={n.r ?? 3.5}
              data-bp-node={n.at}
              className={`bp-scroll-node ${
                n.kind === "accent"
                  ? "bp-node-accent"
                  : n.kind === "hollow"
                  ? "bp-node-hollow"
                  : "bp-node-muted"
              } ${n.mobileHide ? "max-md:hidden" : ""}`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Dev3DBackground;
