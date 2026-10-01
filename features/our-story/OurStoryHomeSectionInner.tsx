'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OurStoryHomeFallback } from './OurStoryHomeFallback';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// ABHI-MOH — Our Story: The Unrolling Saree
//
// A luxury Indian silk saree physically unrolls from the top of the viewport
// as the user scrolls through the brand story.
//
// Three.js cloth:  PlaneGeometry with per-frame CPU vertex deformation
// Camera:          7 keyframe positions lerped by scroll progress
// Fourth wall:     At Chapter 4, camera at z=2.2 — saree fills 80% of screen
// Materials:       MeshPhysicalMaterial with sheen + gold zari borders
// ─────────────────────────────────────────────────────────────────────────────

// ── WebGL Support Tester ──────────────────────────────────────────────────────
export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    let gl: RenderingContext | null = null;
    if (window.WebGL2RenderingContext) {
      gl = canvas.getContext('webgl2');
    }
    if (!gl && window.WebGLRenderingContext) {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    }
    if (!gl) return false;

    // Check if context is already lost
    if ('isContextLost' in gl && typeof (gl as WebGLRenderingContext).isContextLost === 'function') {
      if ((gl as WebGLRenderingContext).isContextLost()) {
        return false;
      }
    }

    // Immediately release the test context to avoid exhausting GPU context limit
    const loseContextExt = (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context');
    if (loseContextExt) {
      loseContextExt.loseContext();
    }
    return true;
  } catch {
    return false;
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────
type Chapter = {
  id: string;
  num: string;
  eyebrow: string;
  heading: string;
  body: string;
  side: 'left' | 'right' | 'center';
  dark: boolean;
  accent: string;
  range: [number, number, number]; // [fadeIn, peak, fadeOut]
  tagline?: string;
};

// ── Device capability ─────────────────────────────────────────────────────────
function getDeviceTier(): 'high' | 'mid' | 'low' {
  if (typeof window === 'undefined') return 'mid';
  const nav = navigator as unknown as { hardwareConcurrency?: number; deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const mem   = nav.deviceMemory ?? 4;
  if (window.innerWidth >= 1280 && cores >= 4 && mem >= 4) return 'high';
  if (window.innerWidth >= 768) return 'mid';
  return 'low';
}

// ── Cloth segment counts ──────────────────────────────────────────────────────
const SEGS = {
  high: { x: 30, y: 120 },
  mid:  { x: 20, y: 80  },
  low:  { x: 12, y: 48  },
};

// ── Saree geometry ────────────────────────────────────────────────────────────
const SAREE_W  = 1.6;   // Three.js world units — cloth width
const SAREE_H  = 4.8;   // cloth height (long dimension)
const ROLL_R   = 0.30;  // cylindrical roll radius
const BORDER_W = 0.07;  // gold zari border width

// ── Camera keyframes — one per chapter ───────────────────────────────────────
const CAM_POS: THREE.Vector3[] = [
  new THREE.Vector3( 0.00,  0.80, 7.50),  // Ch01: 2020 — wide, calm
  new THREE.Vector3(-0.25,  0.30, 5.80),  // Ch02: Vision — push in left
  new THREE.Vector3( 0.35,  0.00, 4.50),  // Ch03: Search — closer right
  new THREE.Vector3( 0.00,  0.20, 2.20),  // Ch04: Craft — FOURTH WALL
  new THREE.Vector3(-0.30,  0.60, 4.80),  // Ch05: Curation — pull back
  new THREE.Vector3( 0.00,  1.20, 6.20),  // Ch06: ABHI-MOH — gallery wide
  new THREE.Vector3( 0.00,  0.40, 7.80),  // Ch07: Today — full reveal
];
const CAM_TARGET: THREE.Vector3[] = [
  new THREE.Vector3( 0.00,  0.00, 0.00),
  new THREE.Vector3( 0.00,  0.20, 0.00),
  new THREE.Vector3( 0.00,  0.00, 0.00),
  new THREE.Vector3( 0.00,  0.60, 0.00),  // looking slightly up at saree
  new THREE.Vector3( 0.00,  0.20, 0.00),
  new THREE.Vector3( 0.00,  0.00, 0.00),
  new THREE.Vector3( 0.00, -0.40, 0.00),  // looking down at full unrolled saree
];

// ── Background colors — interpolated per chapter ──────────────────────────────
const BG_COLORS: THREE.Color[] = [
  new THREE.Color('#F0E8DC'),  // Ch01: warm ivory
  new THREE.Color('#E8DDD0'),  // Ch02: warmer
  new THREE.Color('#2A1510'),  // Ch03: deep dark maroon
  new THREE.Color('#150609'),  // Ch04: near black — dramatic fourth wall
  new THREE.Color('#C0A888'),  // Ch05: warm neutral — pull back
  new THREE.Color('#FAF7F2'),  // Ch06: bright ivory gallery
  new THREE.Color('#F5EFE7'),  // Ch07: soft ivory
];

// ── Story chapters ────────────────────────────────────────────────────────────
const CHAPTERS: Chapter[] = [
  {
    id: 'ch01', num: '01', eyebrow: '2020',
    heading: 'OUR\nSTORY',
    body: 'A beginning woven from an idea — the belief that a saree deserves to be discovered, not just purchased.',
    side: 'center', dark: false, accent: '#A67C52',
    range: [0.00, 0.10, 0.20],
  },
  {
    id: 'ch02', num: '02', eyebrow: 'THE BEGINNING',
    heading: 'THE\nVISION',
    body: 'We began with a simple belief — that a saree could carry more than beauty. Memory, craftsmanship, identity.',
    side: 'left', dark: false, accent: '#8B6A42',
    range: [0.18, 0.27, 0.36],
  },
  {
    id: 'ch03', num: '03', eyebrow: 'THE CRAFT',
    heading: 'THE\nSEARCH',
    body: "Beyond trends, we looked closer — towards the regions, traditions and hands that keep India's weaving heritage alive.",
    side: 'right', dark: true, accent: '#C9A96E',
    range: [0.33, 0.42, 0.51],
  },
  {
    id: 'ch04', num: '04', eyebrow: 'SILK & ZARI',
    heading: 'THE\nCRAFT',
    body: 'Every thread tells a story. Silk, zari, and the hands that weave them — this is where Indian heritage lives.',
    side: 'center', dark: true, accent: '#C9A96E',
    range: [0.49, 0.57, 0.65],
  },
  {
    id: 'ch05', num: '05', eyebrow: 'THE EDIT',
    heading: 'THE\nCURATION',
    body: 'Every piece considered with intention — from its weave and origin to the hands that bring it to life.',
    side: 'left', dark: false, accent: '#A67C52',
    range: [0.63, 0.70, 0.78],
  },
  {
    id: 'ch06', num: '06', eyebrow: 'THE HOUSE',
    heading: 'ABHI\u2011MOH',
    body: 'What began in 2020 as an idea grew into ABHI-MOH — a house built around timeless Indian craftsmanship.',
    side: 'right', dark: false, accent: '#7D2130',
    range: [0.76, 0.83, 0.91],
    tagline: 'The Essence of Elegance',
  },
  {
    id: 'ch07', num: '07', eyebrow: 'TODAY',
    heading: 'THE STORY\nCONTINUES',
    body: 'The story continues with every saree we choose to bring into the world.',
    side: 'center', dark: false, accent: '#A67C52',
    range: [0.89, 0.95, 1.00],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CLOTH VERTEX DEFORMATION
// ─────────────────────────────────────────────────────────────────────────────
function deformSaree(
  attr: THREE.BufferAttribute,
  orig: Float32Array,
  sX: number,
  sY: number,
  rollP: number,  // 0 = fully rolled, 1 = fully unrolled
  time: number
): void {
  const W    = sX + 1;
  const topY = SAREE_H * 0.5;

  for (let iy = 0; iy <= sY; iy++) {
    for (let ix = 0; ix <= sX; ix++) {
      const i  = iy * W + ix;
      const ox = orig[i * 3];
      const oy = orig[i * 3 + 1];

      // t: 0 = top (fixed), 1 = bottom (free end)
      const t = (topY - oy) / SAREE_H;

      if (t < rollP) {
        // ── UNROLLED ─ hanging cloth with organic flutter ────────────────────
        const distToRoll = rollP - t;
        const rollBlend  = Math.min(1, distToRoll / 0.08);

        // Gravity sag increases toward bottom
        const sag = t * t * 0.065;
        // Organic fabric flutter — two perpendicular waves
        const wx = Math.sin(ox * 3.2 + time * 0.28 + t * 4.5) * t * 0.016;
        const wz = (Math.cos(ox * 2.5 + time * 0.22 + t * 3.0) * t * 0.032 + sag * 0.55) * rollBlend;

        attr.setXYZ(i, ox + wx * rollBlend, oy - sag * 0.5 * rollBlend, wz);
      } else {
        // ── ROLLED ─ cylindrical spiral curving toward camera ───────────────────
        const rollFrontY = topY - rollP * SAREE_H;
        const arcLen     = (t - rollP) * SAREE_H;
        // Spiral radius offset to avoid z-fighting and model true cloth wrapping
        const spiralR    = Math.max(0.08, ROLL_R - (arcLen / (Math.PI * 2)) * 0.005);
        const angle      = arcLen / ROLL_R;

        // Position on cylinder surface:
        const ny = rollFrontY + ROLL_R - spiralR * Math.cos(angle);
        const nz = spiralR * Math.sin(angle);

        attr.setXYZ(i, ox, ny, nz);
      }
    }
  }

  attr.needsUpdate = true;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export const OurStoryHomeSectionInner: React.FC = () => {
  const [webglFailed, setWebglFailed] = useState(false);
  const sectionRef         = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Three.js object refs (no React state — avoids re-renders during animation)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef      = useRef<number | null>(null);
  const tlRef       = useRef<gsap.core.Timeline | null>(null);
  const stRef       = useRef<ScrollTrigger | null>(null);
  const geoRefs     = useRef<THREE.BufferGeometry[]>([]);
  const matRefs     = useRef<THREE.Material[]>([]);
  const texRefs     = useRef<THREE.Texture[]>([]);

  // Animation state
  const rollProgressRef = useRef(0);
  const timeRef         = useRef(0);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container || !sectionRef.current) return;
    const section = sectionRef.current;

    // 1. Guard check for WebGL support
    if (!isWebGLAvailable()) {
      console.warn('[OurStory] WebGL is not available on this device; rendering editorial fallback.');
      setWebglFailed(true);
      return;
    }

    // 2. StrictMode double-mount guard: create a fresh canvas on each mount
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    const canvas = document.createElement('canvas');
    canvas.className = 'w-full h-full block pointer-events-none';
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);

    let disposed = false;

    // ── Renderer with try/catch guard ─────────────────────────────────────────
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,              // transparent canvas — CSS background shows through
        powerPreference: 'default',
      });
    } catch (err) {
      console.warn('[OurStory] WebGLRenderer initialization failed; rendering editorial fallback:', err);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      setWebglFailed(true);
      return;
    }

    // Validate context creation
    if (!renderer.getContext()) {
      console.warn('[OurStory] WebGLRenderer context is null; rendering editorial fallback.');
      try {
        renderer.dispose();
      } catch {
        // ignore
      }
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      setWebglFailed(true);
      return;
    }

    renderer.setPixelRatio(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping      = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setClearColor(0x000000, 0); // fully transparent
    rendererRef.current = renderer;

    // ── Scene + Camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.01,
      60
    );
    camera.position.copy(CAM_POS[0]);
    camera.lookAt(CAM_TARGET[0]);

    // ── Lighting — luxury fashion studio ─────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xfff0e0, 0.5);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xfff8e8, 3.2);
    key.position.set(2, 4, 4);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffe8d0, 1.3);
    fill.position.set(-3, 1, 2.5);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xc9a96e, 2.0);
    rim.position.set(0.5, -2.5, -2.5);
    scene.add(rim);

    const back = new THREE.DirectionalLight(0xffffff, 0.8);
    back.position.set(0, 3, -5);
    scene.add(back);

    // ── Geometry ──────────────────────────────────────────────────────────────
    const tier         = getDeviceTier();
    const { x: sX, y: sY } = SEGS[tier];

    // Saree texture
    const texLoader = new THREE.TextureLoader();
    const sareeTex  = texLoader.load('/assets/sarees/saree-maroon.png', (tex) => {
      tex.wrapS  = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 8);
      tex.colorSpace = THREE.SRGBColorSpace;
    });
    texRefs.current.push(sareeTex);

    // Silk material
    const silkMat = new THREE.MeshPhysicalMaterial({
      map:                sareeTex,
      color:              new THREE.Color('#7B2232'),
      roughness:          0.38,
      metalness:          0.0,
      sheen:              1.0,
      sheenColor:         new THREE.Color('#C9A96E'),
      sheenRoughness:     0.42,
      clearcoat:          0.30,
      clearcoatRoughness: 0.35,
      side:               THREE.DoubleSide,
    });
    matRefs.current.push(silkMat);

    // Gold zari border material
    const zariMat = new THREE.MeshPhysicalMaterial({
      color:              new THREE.Color('#C4960A'),
      roughness:          0.15,
      metalness:          0.80,
      clearcoat:          0.60,
      clearcoatRoughness: 0.15,
      side:               THREE.DoubleSide,
    });
    matRefs.current.push(zariMat);

    // Main cloth mesh
    const mainGeo  = new THREE.PlaneGeometry(SAREE_W, SAREE_H, sX, sY);
    geoRefs.current.push(mainGeo);
    const mainOrig = new Float32Array(mainGeo.attributes.position.array);
    const mainMesh = new THREE.Mesh(mainGeo, silkMat);
    scene.add(mainMesh);

    // Gold border strips
    function makeBorderStrip(xCenter: number): {
      geo: THREE.PlaneGeometry;
      orig: Float32Array;
    } {
      const geo  = new THREE.PlaneGeometry(BORDER_W, SAREE_H, 3, sY);
      geoRefs.current.push(geo);
      const pos  = geo.attributes.position as THREE.BufferAttribute;
      const orig = new Float32Array(pos.array);
      for (let i = 0; i < pos.count; i++) {
        const nx = orig[i * 3] + xCenter;
        orig[i * 3] = nx;
        pos.setX(i, nx);
      }
      pos.needsUpdate = true;
      const mesh = new THREE.Mesh(geo, zariMat);
      scene.add(mesh);
      return { geo, orig };
    }

    const lb = makeBorderStrip(-(SAREE_W / 2) + BORDER_W / 2);
    const rb = makeBorderStrip( (SAREE_W / 2) - BORDER_W / 2);

    // ── RAF render loop ───────────────────────────────────────────────────────
    let prevT = performance.now();
    const tmpTarget = new THREE.Vector3();

    const tick = () => {
      if (disposed) return;
      rafRef.current = requestAnimationFrame(tick);
      const now  = performance.now();
      timeRef.current += (now - prevT) / 1000;
      prevT = now;

      const rp = rollProgressRef.current;
      const t  = timeRef.current;

      deformSaree(
        mainGeo.attributes.position as THREE.BufferAttribute,
        mainOrig, sX, sY, rp, t
      );
      mainGeo.computeVertexNormals();

      deformSaree(
        lb.geo.attributes.position as THREE.BufferAttribute,
        lb.orig, 3, sY, rp, t
      );
      lb.geo.computeVertexNormals();

      deformSaree(
        rb.geo.attributes.position as THREE.BufferAttribute,
        rb.orig, 3, sY, rp, t
      );
      rb.geo.computeVertexNormals();

      renderer.render(scene, camera);
    };
    tick();

    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      if (disposed) return;
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── GSAP master timeline ──────────────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start:  'top top',
        end:    'bottom bottom',
        pin:    '#our-story-sticky',
        pinSpacing: false,
        scrub:  0.75,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (disposed) return;
          const p = self.progress;

          const pb = document.getElementById('our-story-pb');
          if (pb) pb.style.transform = `scaleX(${p})`;

          rollProgressRef.current = Math.min(1, p / 0.88);

          const bi = p * (BG_COLORS.length - 1);
          const bA = BG_COLORS[Math.floor(bi)];
          const bB = BG_COLORS[Math.min(Math.ceil(bi), BG_COLORS.length - 1)];
          const bC = bA.clone().lerp(bB, bi % 1);
          const bg = document.getElementById('our-story-bg');
          if (bg) {
            bg.style.backgroundColor =
              `rgb(${(bC.r * 255) | 0},${(bC.g * 255) | 0},${(bC.b * 255) | 0})`;
          }

          const ci = p * (CAM_POS.length - 1);
          const cA = Math.floor(ci);
          const cB = Math.min(Math.ceil(ci), CAM_POS.length - 1);
          const ct = ci % 1;
          camera.position.lerpVectors(CAM_POS[cA], CAM_POS[cB], ct);
          tmpTarget.lerpVectors(CAM_TARGET[cA], CAM_TARGET[cB], ct);
          camera.lookAt(tmpTarget);
        },
      },
    });

    // ── Chapter text animations ───────────────────────────────────────────────
    const initSet = (id: string, props: gsap.TweenVars) => {
      const el = document.getElementById(id);
      if (el) gsap.set(el, props);
    };
    initSet('sch-0',         { opacity: 1 });
    initSet('sch-eyebrow-0', { opacity: 1, clipPath: 'inset(0 0% 0 0)' });
    initSet('sch-heading-0', { opacity: 1, y: 0 });
    initSet('sch-div-0',     { opacity: 1, scaleX: 1 });
    initSet('sch-body-0',    { opacity: 1, y: 0 });

    CHAPTERS.forEach((ch, idx) => {
      const [start, peak, end] = ch.range;
      const rd = (peak - start) * 0.5;
      const fd = (end   - peak);

      const wrap = document.getElementById(`sch-${idx}`);
      const ey   = document.getElementById(`sch-eyebrow-${idx}`);
      const he   = document.getElementById(`sch-heading-${idx}`);
      const dv   = document.getElementById(`sch-div-${idx}`);
      const bo   = document.getElementById(`sch-body-${idx}`);
      const tg   = document.getElementById(`sch-tagline-${idx}`);

      if (!wrap) return;

      if (idx === 0) {
        tl.to(wrap, { opacity: 0, duration: fd, ease: 'power2.in' }, peak);
        if (he) tl.to(he, { opacity: 0, y: -16, duration: fd * 0.7 }, peak);
        if (ey) tl.to(ey, { opacity: 0,          duration: fd * 0.5 }, peak + 0.01);
        if (dv) tl.to(dv, { opacity: 0,          duration: fd * 0.4 }, peak + 0.02);
        if (bo) tl.to(bo, { opacity: 0,          duration: fd * 0.5 }, peak);
      } else {
        tl.to(wrap, { opacity: 1, duration: peak - start, ease: 'power2.out' }, start);
        if (ey) tl.to(ey, {
          opacity: 1, clipPath: 'inset(0 0% 0 0)',
          duration: rd * 1.1, ease: 'power3.out',
        }, start + rd * 0.10);
        if (he) tl.to(he, {
          opacity: 1, y: 0,
          duration: rd * 1.3, ease: 'power3.out',
        }, start + rd * 0.20);
        if (dv) tl.to(dv, {
          opacity: 1, scaleX: 1,
          duration: rd, ease: 'power2.out',
        }, start + rd * 0.40);
        if (bo) tl.to(bo, {
          opacity: 1, y: 0,
          duration: rd, ease: 'power2.out',
        }, start + rd * 0.55);
        if (tg) tl.to(tg, {
          opacity: 1, duration: rd * 0.5,
        }, peak - rd * 0.2);

        tl.to(wrap, { opacity: 0, duration: fd, ease: 'power2.in' }, peak);
        if (he) tl.to(he, { opacity: 0, y: -14, duration: fd * 0.7 }, peak);
        if (ey) tl.to(ey, { opacity: 0,          duration: fd * 0.5 }, peak + 0.01);
        if (dv) tl.to(dv, { opacity: 0,          duration: fd * 0.4 }, peak + 0.02);
        if (bo) tl.to(bo, { opacity: 0,          duration: fd * 0.5 }, peak);
        if (tg) tl.to(tg, { opacity: 0,          duration: fd * 0.4 }, peak);
      }
    });

    tlRef.current = tl;
    stRef.current = tl.scrollTrigger as ScrollTrigger;

    // ── Cleanup — full disposal on unmount ────────────────────────────────────
    return () => {
      disposed = true;
      window.removeEventListener('resize', onResize);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (stRef.current) {
        try {
          stRef.current.kill(true);
        } catch {
          // ignore
        }
        stRef.current = null;
      }
      if (tlRef.current) {
        try {
          tlRef.current.kill();
        } catch {
          // ignore
        }
        tlRef.current = null;
      }
      geoRefs.current.forEach((g) => {
        try { g.dispose(); } catch { /* ignore */ }
      });
      matRefs.current.forEach((m) => {
        try { m.dispose(); } catch { /* ignore */ }
      });
      texRefs.current.forEach((t) => {
        try { t.dispose(); } catch { /* ignore */ }
      });
      if (rendererRef.current) {
        try {
          rendererRef.current.dispose();
          rendererRef.current.forceContextLoss();
        } catch {
          // ignore
        }
        rendererRef.current = null;
      }
      geoRefs.current = [];
      matRefs.current = [];
      texRefs.current = [];
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  if (webglFailed) {
    return <OurStoryHomeFallback />;
  }

  // ── JSX ───────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="our-story-home"
      className="relative w-full"
      style={{ height: '500vh' }}
      aria-label="ABHI-MOH brand story — scroll to experience"
    >
      {/* ── Sticky 100vh viewport ─────────────────────────────────────────── */}
      <div
        id="our-story-sticky"
        className="sticky top-0 w-full h-screen overflow-hidden"
      >
        {/* CSS background (JS transitions via bg color on scroll) */}
        <div
          id="our-story-bg"
          className="absolute inset-0 z-0"
          style={{ backgroundColor: '#F0E8DC', transition: 'none' }}
        />

        {/* Subtle warm glow overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 38%, rgba(201,169,110,0.09) 0%, transparent 58%)',
          }}
          aria-hidden="true"
        />

        {/* ── Chapter text (z-5 — behind canvas) ────────────────────────── */}
        <div
          id="our-story-text"
          className="absolute inset-0 z-[5] pointer-events-none overflow-hidden"
        >
          {CHAPTERS.map((ch, idx) => {
            const isL = ch.side === 'left';
            const isR = ch.side === 'right';
            const textMain = ch.dark ? '#FAF7F2' : '#2A221E';
            const textBody = ch.dark ? 'rgba(250,247,242,0.76)' : '#5C4D44';

            return (
              <div
                key={ch.id}
                id={`sch-${idx}`}
                className="absolute inset-0 flex items-center"
                style={{ opacity: 0 }}
                aria-hidden={idx !== 0}
              >
                <div
                  className={[
                    'w-full px-8 sm:px-14 lg:px-20 flex',
                    isL ? 'justify-start' : isR ? 'justify-end' : 'justify-center',
                  ].join(' ')}
                >
                  <div
                    className={[
                      'flex flex-col',
                      'max-w-[280px] sm:max-w-xs lg:max-w-sm',
                      'select-none',
                      isL ? 'items-start text-left'
                        : isR ? 'items-end text-right'
                          : 'items-center text-center',
                    ].join(' ')}
                  >
                    {/* Chapter number + eyebrow */}
                    <div
                      id={`sch-eyebrow-${idx}`}
                      className="flex items-center gap-2.5 mb-4"
                      style={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                    >
                      <span
                        className="font-satoshi text-[9px] font-bold uppercase tracking-[0.5em]"
                        style={{ color: ch.accent }}
                      >
                        {ch.num}
                      </span>
                      <div
                        className="h-[1px] w-5"
                        style={{ background: `${ch.accent}70` }}
                      />
                      <span
                        className="font-satoshi text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.4em]"
                        style={{ color: ch.accent }}
                      >
                        {ch.eyebrow}
                      </span>
                    </div>

                    {/* Main heading */}
                    <h2
                      id={`sch-heading-${idx}`}
                      className="font-hero font-normal uppercase leading-[0.92] mb-4"
                      style={{
                        color: textMain,
                        fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)',
                        letterSpacing: '0.10em',
                        opacity: 0,
                        transform: 'translateY(26px)',
                        textShadow: ch.dark ? '0 2px 20px rgba(0,0,0,0.5)' : 'none',
                        willChange: 'transform, opacity',
                      }}
                    >
                      {ch.heading.split('\n').map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </h2>

                    {/* Ornamental divider */}
                    <div
                      id={`sch-div-${idx}`}
                      className={[
                        'flex items-center gap-3 mb-3.5',
                        isR ? 'flex-row-reverse' : '',
                      ].join(' ')}
                      style={{
                        opacity: 0,
                        transform: 'scaleX(0)',
                        transformOrigin: isR ? 'right' : 'left',
                      }}
                    >
                      <div
                        className="h-[1px] w-10"
                        style={{ background: `${ch.accent}70` }}
                      />
                      <svg
                        className="w-2.5 h-2.5 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill={ch.accent}
                        aria-hidden="true"
                      >
                        <path d="M12 3L13.5 10.5L21 12L13.5 13.5L12 21L10.5 13.5L3 12L10.5 10.5L12 3Z" />
                      </svg>
                      <div
                        className="h-[1px] w-10"
                        style={{ background: `${ch.accent}70` }}
                      />
                    </div>

                    {/* Body text */}
                    <p
                      id={`sch-body-${idx}`}
                      className="font-satoshi text-xs sm:text-sm font-light leading-relaxed tracking-wide"
                      style={{
                        color: textBody,
                        opacity: 0,
                        transform: 'translateY(10px)',
                      }}
                    >
                      {ch.body}
                    </p>

                    {/* Tagline (Chapter 06 only) */}
                    {ch.tagline && (
                      <p
                        id={`sch-tagline-${idx}`}
                        className="mt-3 font-satoshi text-[9px] sm:text-[10px] uppercase tracking-[0.45em] font-medium"
                        style={{ color: ch.accent, opacity: 0 }}
                      >
                        {ch.tagline}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── THREE.JS CANVAS CONTAINER ─────────────────────────────────────
            Sits at z-10 above the text layer.
            The canvas is created dynamically on client mount.
            If WebGL fails, the fallback renders and no canvas is mounted. */}
        <div
          ref={canvasContainerRef}
          className="absolute inset-0 w-full h-full z-[10] pointer-events-none"
          aria-hidden="true"
        />

        {/* Thin gold progress bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-[30] overflow-hidden"
          aria-hidden="true"
        >
          <div
            id="our-story-pb"
            style={{
              height: '100%',
              transformOrigin: 'left',
              transform: 'scaleX(0)',
              background: 'linear-gradient(90deg, #7D2130, #C9A96E 50%, #7D2130)',
              boxShadow: '0 0 6px rgba(201,169,110,0.4)',
              willChange: 'transform',
            }}
          />
        </div>

        {/* Bottom vignette blend */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 z-[20] pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(250,247,242,0.92), transparent)',
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

OurStoryHomeSectionInner.displayName = 'OurStoryHomeSectionInner';
