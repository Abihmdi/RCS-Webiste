"use client"

import React, { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"
import { usePathname } from "next/navigation"

/* ─── Custom elapsed time hook (avoids deprecated THREE.Clock) ─── */
function useElapsedTime() {
  const start = useRef(performance.now() / 1000)
  return () => performance.now() / 1000 - start.current
}

/* ─── Flowing particle galaxy with sine-wave depth ──── */
function GalaxyField() {
  const ref = useRef<THREE.Points>(null)
  const count = 2500
  const getElapsed = useElapsedTime()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 16
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const t = getElapsed()
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0
    ref.current.position.y = -scrollY * 0.004
    ref.current.rotation.y = t * 0.012 + scrollY * 0.0001
    ref.current.rotation.x = Math.sin(t * 0.08) * 0.05 + scrollY * 0.00005
    ref.current.rotation.z = Math.cos(t * 0.05) * 0.03
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ECFF8A"
        size={0.052}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

/* ─── Inner micro-dust for depth ────────────────────── */
function MicroDust() {
  const ref = useRef<THREE.Points>(null)
  const count = 600
  const getElapsed = useElapsedTime()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame(() => {
    if (ref.current) {
      const t = getElapsed()
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0
      ref.current.position.y = -scrollY * 0.007
      ref.current.rotation.x = -t * 0.006
      ref.current.rotation.y =  t * 0.009 + scrollY * 0.00008
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ECFF8A"
        size={0.032}
        sizeAttenuation
        depthWrite={false}
        opacity={0.42}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

/* ─── Bright accent star particles ──────────────────── */
function AccentStars() {
  const ref = useRef<THREE.Points>(null)
  const count = 150
  const getElapsed = useElapsedTime()

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 5 + Math.random() * 12
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      // All lime green with slight variation
      const variation = 0.9 + Math.random() * 0.1
      col[i * 3]     = 0.93 * variation
      col[i * 3 + 1] = 1.0 * variation
      col[i * 3 + 2] = 0.54 * variation
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame(() => {
    if (ref.current) {
      const t = getElapsed()
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0
      ref.current.position.y = -scrollY * 0.0025
      ref.current.rotation.y = -t * 0.005 + scrollY * 0.00005
      ref.current.rotation.z = Math.sin(t * 0.03) * 0.02
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.088}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

/* ─── Energy Flow Ribbons ───────────────────────────── */
function EnergyFlow() {
  const groupRef = useRef<THREE.Group>(null)
  const getElapsed = useElapsedTime()

  const ribbonConfigs = useMemo(() => [
    { radius: 0.08,  speed: 0.55, phase: 0,            spread: 3.5, yOff: 0.4,  zOff: 0    },
    { radius: 0.065, speed: 0.38, phase: Math.PI * 0.4, spread: 2.8, yOff: -0.3, zOff: 0.6  },
    { radius: 0.055, speed: 0.65, phase: Math.PI * 0.8, spread: 4.0, yOff: 0.6,  zOff: -0.4 },
    { radius: 0.05,  speed: 0.30, phase: Math.PI * 1.2, spread: 2.4, yOff: -0.5, zOff: 0.3  },
    { radius: 0.045, speed: 0.48, phase: Math.PI * 1.7, spread: 3.2, yOff: 0.1,  zOff: -0.6 },
  ], [])

  const ribbons = useMemo(() => {
    return ribbonConfigs.map(cfg => {
      const pts = Array.from({ length: 7 }, () => new THREE.Vector3())
      const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5)
      const geom = new THREE.TubeGeometry(curve, 80, cfg.radius, 8, false)

      // Vertex color gradient: white head → lime body → transparent tail
      const posCount = geom.getAttribute("position").count
      const uvAttr = geom.getAttribute("uv")
      const colors = new Float32Array(posCount * 4)

      for (let i = 0; i < posCount; i++) {
        const v = uvAttr.getY(i) // 0→1 along tube length
        let r: number, g: number, b: number, a: number

        if (v < 0.15) {
          // Head — bright white
          r = 1; g = 1; b = 1
          a = 0.95
        } else if (v < 0.45) {
          // Transition — white to lime
          const t = (v - 0.15) / 0.30
          r = 1 - t * 0.07
          g = 1
          b = 1 - t * 0.46
          a = 0.85 - t * 0.1
        } else if (v < 0.75) {
          // Body — lime accent
          const t = (v - 0.45) / 0.30
          r = 0.93 - t * 0.1
          g = 1
          b = 0.54 - t * 0.14
          a = 0.75 - t * 0.2
        } else {
          // Tail — fade to transparent
          const t = (v - 0.75) / 0.25
          r = 0.83 * (1 - t)
          g = 0.90 * (1 - t)
          b = 0.40 * (1 - t)
          a = 0.55 * (1 - t * t)
        }

        colors[i * 4]     = r
        colors[i * 4 + 1] = g
        colors[i * 4 + 2] = b
        colors[i * 4 + 3] = a
      }

      geom.setAttribute("color", new THREE.Float32BufferAttribute(colors, 4))

      const mat = new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      })

      return { geom, curve, points: pts, mat, cfg }
    })
  }, [ribbonConfigs])

  // Energy trail particles along ribbon paths
  const trailCount = 350
  const trailRef = useRef<THREE.Points>(null)
  const trailData = useMemo(() => {
    const pos = new Float32Array(trailCount * 3)
    const col = new Float32Array(trailCount * 3)
    const meta = Array.from({ length: trailCount }, () => ({
      ribbon: Math.floor(Math.random() * 5),
      t: Math.random(),
      speed: 0.001 + Math.random() * 0.005,
      offset: (Math.random() - 0.5) * 0.2,
    }))
    for (let i = 0; i < trailCount; i++) {
      // Lime or white tint
      const isLime = Math.random() > 0.3
      col[i * 3]     = isLime ? 0.93 : 1.0
      col[i * 3 + 1] = 1.0
      col[i * 3 + 2] = isLime ? 0.54 : 1.0
    }
    return { pos, col, meta }
  }, [])

  useFrame((state) => {
    const t = getElapsed()
    const { width } = state.viewport
    const isDesktop = width > 7
    const targetScale = isDesktop ? 1 : 0.65
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0

    if (groupRef.current) {
      // Mouse tilt follow
      const rotX = -state.pointer.y * 0.15
      const rotY =  state.pointer.x * 0.15
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotX, 0.04)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotY, 0.04)
      
      // Position offset based on scroll for ribbon group
      groupRef.current.position.y = -scrollY * 0.005

      const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.04)
      groupRef.current.scale.setScalar(s)
    }

    // Animate ribbon curves
    for (const ribbon of ribbons) {
      const { points, curve, cfg, geom } = ribbon
      points.forEach((pt, i) => {
        const f = cfg.speed
        const p = cfg.phase
        const sp = cfg.spread
        pt.x = Math.sin(t * f * 0.3 + p + i * 0.9) * sp
        pt.y = Math.cos(t * f * 0.25 + p + i * 0.7) * sp * 0.5 + cfg.yOff
        pt.z = Math.sin(t * f * 0.2 + p * 2 + i * 0.5) * sp * 0.6 + cfg.zOff
      })
      curve.points = points
      const posAttr = geom.getAttribute("position") as THREE.BufferAttribute
      const template = new THREE.TubeGeometry(curve, 80, cfg.radius, 8, false)
      const templatePos = template.getAttribute("position") as THREE.BufferAttribute
      posAttr.array.set(templatePos.array)
      posAttr.needsUpdate = true
      template.dispose()
    }

    // Animate trail particles along ribbon paths
    if (trailRef.current) {
      const posAttr = trailRef.current.geometry.getAttribute("position")
      const arr = posAttr.array as Float32Array
      for (let i = 0; i < trailCount; i++) {
        const m = trailData.meta[i]
        m.t = (m.t + m.speed) % 1
        const ribbon = ribbons[m.ribbon]
        const pt = ribbon.curve.getPoint(m.t)
        arr[i * 3]     = pt.x + m.offset
        arr[i * 3 + 1] = pt.y + m.offset * 0.7
        arr[i * 3 + 2] = pt.z + m.offset * 0.5
      }
      posAttr.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      {/* Energy ribbons */}
      {ribbons.map((r, i) => (
        <mesh key={i} geometry={r.geom} material={r.mat} />
      ))}

      {/* Trail particles */}
      <Points ref={trailRef} positions={trailData.pos} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.082}
          sizeAttenuation
          depthWrite={false}
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </Points>


    </group>
  )
}

/* ─── WebGL Render Error Boundary ───────────────────── */
class WebGLErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("WebGL Render Error captured:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div className="absolute inset-0 bg-background" />
    }
    return this.props.children
  }
}

/* ─── WebGL Context Loss Cleanup ────────────────────── */
function WebGLCleanUp() {
  const { gl } = useThree()
  useEffect(() => {
    return () => {
      const context = gl.getContext()
      const extension = context?.getExtension("WEBGL_lose_context")
      if (extension) {
        extension.loseContext()
      }
    }
  }, [gl])
  return null
}

/* ─── Main hero background component ───────────────── */
export function HeroBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (gl) setHasWebGL(true)
    } catch { /* no WebGL */ }

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 1.1) {
        setIsHeroVisible(false)
      } else {
        setIsHeroVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded && isHome ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} bg-background`}
      style={{ display: isHeroVisible ? "block" : "none" }}
    >
      {hasWebGL ? (
        <WebGLErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 7], fov: 52 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            frameloop={isHeroVisible ? "always" : "never"}
          >
            <WebGLCleanUp />
            <color attach="background" args={["#000000"]} />
            <fog attach="fog" args={["#000000", 8, 24]} />
            <ambientLight intensity={0.4} />

            <GalaxyField />
            <MicroDust />
            <AccentStars />
            <EnergyFlow />
          </Canvas>
        </WebGLErrorBoundary>
      ) : (
        /* CSS-only fallback when WebGL unavailable */
        <div className="absolute inset-0 bg-[#000000] overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(236,255,138,0.08) 0%, rgba(236,255,138,0.02) 40%, transparent 70%)",
              animation: "aurora-drift 8s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {/* Aurora glow blobs — boosted visibility */}
      <div
        className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(236,255,138,0.08) 0%, rgba(236,255,138,0.02) 35%, transparent 70%)",
          animation: "aurora-drift 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 35%, transparent 70%)",
          animation: "aurora-drift-r 15s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[30%] right-[25%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(236,255,138,0.05) 0%, transparent 60%)",
          animation: "aurora-drift 18s ease-in-out infinite reverse",
        }}
      />

      {/* Gradient overlays — reduced to just bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_transparent_40%,_var(--background)_80%)] pointer-events-none" />
    </div>
  )
}
