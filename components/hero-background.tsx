"use client"

import React, { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"
import { usePathname } from "next/navigation"

/* ─── Flowing particle galaxy with sine-wave depth ──── */
function GalaxyField() {
  const ref = useRef<THREE.Points>(null)
  const count = 5000

  const [positions, basePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const base = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 4 + Math.random() * 14
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      base[i * 3] = x
      base[i * 3 + 1] = y
      base[i * 3 + 2] = z
    }
    return [pos, base]
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    // Smooth, hardware-accelerated rotation and wave drift on the GPU
    ref.current.rotation.y = t * 0.008
    ref.current.rotation.x = Math.sin(t * 0.08) * 0.03
    ref.current.rotation.z = Math.cos(t * 0.05) * 0.02
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C3E633"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

/* ─── Inner micro-dust for depth ────────────────────── */
function MicroDust() {
  const ref = useRef<THREE.Points>(null)
  const count = 2500

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 18
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = -state.clock.elapsedTime * 0.005
      ref.current.rotation.y =  state.clock.elapsedTime * 0.007
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFFFFF"
        size={0.014}
        sizeAttenuation
        depthWrite={false}
        opacity={0.18}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

/* ─── Floating Icosahedron with orbit rings ─────────── */
function FloatingCore() {
  const groupRef = useRef<THREE.Group>(null)
  const icoRef   = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  // Generate unique vertices of the icosahedron for network nodes
  const vertices = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(1.6, 1)
    const posAttr = geom.getAttribute("position")
    const verts: [number, number, number][] = []
    const seen = new Set<string>()

    for (let i = 0; i < posAttr.count; i++) {
      const x = Number(posAttr.getX(i).toFixed(4))
      const y = Number(posAttr.getY(i).toFixed(4))
      const z = Number(posAttr.getZ(i).toFixed(4))
      const key = `${x},${y},${z}`
      if (!seen.has(key)) {
        seen.add(key)
        verts.push([x, y, z])
      }
    }
    geom.dispose()
    return verts
  }, [])

  useFrame((state) => {
    const { width } = state.viewport
    const isDesktop = width > 7
    const targetX = isDesktop ? width / 5.5 : 0
    const targetY = isDesktop ? 0.15 : -1.0
    const targetScale = isDesktop ? 1 : 0.65
    const t = state.clock.elapsedTime

    if (groupRef.current) {
      // Mouse tilt follow
      const rotX = -state.pointer.y * 0.25
      const rotY =  state.pointer.x * 0.25
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotX, 0.04)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotY, 0.04)
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.04)
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.04)
      const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.04)
      groupRef.current.scale.setScalar(s)
    }

    // Icosahedron steady spin + subtle float
    if (icoRef.current) {
      icoRef.current.rotation.y = t * 0.08
      icoRef.current.rotation.z = t * 0.05
      icoRef.current.position.y = Math.sin(t * 0.4) * 0.12
    }

    // Inner glow core pulsing
    if (innerRef.current) {
      const pulse = 0.85 + Math.sin(t * 1.2) * 0.15
      innerRef.current.scale.setScalar(pulse)
    }

    // Orbit rings at different speeds/axes
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.2
      ring1Ref.current.rotation.x = Math.PI / 3
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.15
      ring2Ref.current.rotation.x = Math.PI / 2.2
      ring2Ref.current.rotation.y = t * 0.1
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.12
      ring3Ref.current.rotation.y = Math.PI / 2.8
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main wireframe icosahedron */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#C3E633" wireframe transparent opacity={0.22} />
        
        {/* Glowing Network Nodes at Vertices */}
        {vertices.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#C3E633" transparent opacity={0.8} />
          </mesh>
        ))}
      </mesh>

      {/* Inner solid glow core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.65, 2]} />
        <meshBasicMaterial color="#C3E633" transparent opacity={0.06} />
      </mesh>

      {/* Central bright point */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#C3E633" transparent opacity={0.9} />
      </mesh>

      {/* Orbit ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.4, 0.012, 8, 128]} />
        <meshBasicMaterial color="#C3E633" transparent opacity={0.18} />
      </mesh>

      {/* Orbit ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.8, 0.008, 8, 128]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.10} />
      </mesh>

      {/* Orbit ring 3 (widest, faintest) */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.2, 0.006, 8, 128]} />
        <meshBasicMaterial color="#C3E633" transparent opacity={0.06} />
      </mesh>

      {/* Outer wireframe sphere shell */}
      <mesh>
        <sphereGeometry args={[3.5, 24, 24]} />
        <meshBasicMaterial color="#FFFFFF" wireframe transparent opacity={0.025} />
      </mesh>
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
      return <div className="absolute inset-0 bg-[#050505]" />
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
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (gl) setHasWebGL(true)
    } catch { /* no WebGL */ }

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded && isHome ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} bg-background`}>
      {hasWebGL ? (
        <WebGLErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 7], fov: 52 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <WebGLCleanUp />
            <color attach="background" args={["#050505"]} />
            <fog attach="fog" args={["#050505", 6, 22]} />
            <ambientLight intensity={0.3} />

            <GalaxyField />
            <MicroDust />
            <FloatingCore />
          </Canvas>
        </WebGLErrorBoundary>
      ) : (
        <div className="absolute inset-0 bg-[#050505]" />
      )}

      {/* Aurora glow blobs — drift behind canvas */}
      <div
        className="absolute top-[-10%] left-[15%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(195,230,51,0.08), transparent 70%)",
          filter: "blur(80px)",
          animation: "aurora-drift 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[5%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)",
          filter: "blur(70px)",
          animation: "aurora-drift-r 10s ease-in-out infinite",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--background)_70%)] pointer-events-none" />
    </div>
  )
}
