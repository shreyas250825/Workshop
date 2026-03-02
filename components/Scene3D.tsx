"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function BMWModel() {
  const groupRef = useRef<THREE.Group>(null);

  // Drei handles loading properly (no SSR issues)
  const { scene } = useGLTF(
    "/bmw-m4-widebody-wwwvecarzcom/source/bmw_m4_modified_widebody_knitro_builds.glb"
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={1.5}>
      <primitive object={scene} />
    </group>
  );
}

// Optional: Preload model
useGLTF.preload(
  "/bmw-m4-widebody-wwwvecarzcom/source/bmw_m4_modified_widebody_knitro_builds.glb"
);

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
  );
}

interface Scene3DProps {
  className?: string;
}

export default function Scene3D({ className = "" }: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={50} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-10, 5, -5]} intensity={0.6} color="#8b5cf6" />
        <spotLight position={[0, 10, 0]} intensity={1} angle={0.6} penumbra={1} />

        <Suspense fallback={<LoadingFallback />}>
          <BMWModel />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}