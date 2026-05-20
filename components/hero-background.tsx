"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 5000
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25
    }

    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.015
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  )
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[3.5, 0, -3]}>
      <torusGeometry args={[1.2, 0.4, 16, 50]} />
      <meshBasicMaterial color="#ffffff" wireframe opacity={0.15} transparent />
    </mesh>
  )
}

function FloatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.08
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4 + 1) * 0.4
    }
  })

  return (
    <mesh ref={meshRef} position={[-3, 1, -2]}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshBasicMaterial color="#ffffff" wireframe opacity={0.12} transparent />
    </mesh>
  )
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.25 + 2) * 0.3 - 1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -1, -4]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="#ffffff" wireframe opacity={0.08} transparent />
    </mesh>
  )
}

export function HeroBackground() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 6, 18]} />
        <ambientLight intensity={0.3} />
        <ParticleField />
        <FloatingTorus />
        <FloatingOctahedron />
        <FloatingSphere />
      </Canvas>

      {/* Gradient overlays for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--background)_70%)]" />
    </div>
  )
}
