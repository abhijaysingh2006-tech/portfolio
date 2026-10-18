'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Atmospheric Particles ---
function Particles({ count = 180 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorWhite = new THREE.Color('#FAFAFA');
    const colorCyan = new THREE.Color('#00E5FF');
    const colorAmber = new THREE.Color('#F59E0B');
    const colorZinc = new THREE.Color('#71717A');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const rand = Math.random();
      const mixed = rand > 0.7 ? colorWhite : rand > 0.4 ? colorCyan : rand > 0.2 ? colorAmber : colorZinc;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.03;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.04;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// --- Interactive 3D Spatial Gyroscopic Core ---
function FloatingSpatialCore() {
  const masterRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const ring4Ref = useRef<THREE.Group>(null);
  const satellitesRef = useRef<THREE.Group>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const targetRot = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  // Compute unique icosahedron vertices for constellation nodes
  const constellationNodes = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.38, 1);
    const attr = geo.attributes.position;
    const set = new Set<string>();
    const nodes: [number, number, number][] = [];

    for (let i = 0; i < attr.count; i++) {
      const x = Number(attr.getX(i).toFixed(3));
      const y = Number(attr.getY(i).toFixed(3));
      const z = Number(attr.getZ(i).toFixed(3));
      const key = `${x},${y},${z}`;
      if (!set.has(key)) {
        set.add(key);
        nodes.push([x, y, z]);
      }
    }
    geo.dispose();
    return nodes;
  }, []);

  const satelliteNodes = useMemo(() => [
    { pos: [1.78, 0.7, 0.4] as [number, number, number], size: 0.075, color: '#00e5ff' },
    { pos: [1.42, -0.72, 0.85] as [number, number, number], size: 0.08, color: '#f59e0b' },
    { pos: [-1.48, 0.52, 0.65] as [number, number, number], size: 0.065, color: '#00e5ff' },
    { pos: [-1.32, -0.38, 0.82] as [number, number, number], size: 0.055, color: '#94a3b8' },
    { pos: [0.68, -1.28, 0.72] as [number, number, number], size: 0.048, color: '#00e5ff' },
    { pos: [-0.95, 0.9, -0.62] as [number, number, number], size: 0.052, color: '#f59e0b' },
  ], []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRot.current.y = mousePos.current.x * 0.45;
      targetRot.current.x = -mousePos.current.y * 0.35;
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useFrame((state, delta) => {
    if (!masterRef.current) return;
    const time = state.clock.getElapsedTime();

    // Damped spring physics for butter-smooth momentum
    const diffX = targetRot.current.x - currentRot.current.x;
    const diffY = targetRot.current.y - currentRot.current.y;
    velocity.current.x = velocity.current.x * 0.88 + diffX * 0.045;
    velocity.current.y = velocity.current.y * 0.88 + diffY * 0.045;

    currentRot.current.x += velocity.current.x;
    currentRot.current.y += velocity.current.y;

    masterRef.current.rotation.x = currentRot.current.x + Math.sin(time * 0.25) * 0.05;
    masterRef.current.rotation.y = currentRot.current.y + time * 0.08;

    // Organic breathing float bob
    masterRef.current.position.y = Math.sin(time * 0.6) * 0.06;

    // Rotations of individual gyroscopic assemblies
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.12;
    if (cageRef.current) {
      cageRef.current.rotation.y -= delta * 0.18;
      cageRef.current.rotation.x += delta * 0.08;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z -= delta * 0.22;
    if (ring2Ref.current) ring2Ref.current.rotation.z += delta * 0.28;
    if (ring3Ref.current) ring3Ref.current.rotation.z -= delta * 0.16;
    if (ring4Ref.current) ring4Ref.current.rotation.y += delta * 0.2;
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y += delta * 0.14;
      satellitesRef.current.rotation.x -= delta * 0.05;
    }
  });

  return (
    <group ref={masterRef} position={[2.2, 0, 0]}>
      {/* Central Matte Metallic Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.92, 48, 48]} />
        <meshStandardMaterial
          color="#181822"
          roughness={0.28}
          metalness={0.7}
        />
      </mesh>

      {/* Outer Constellation Icosahedron Cage */}
      <group ref={cageRef}>
        <mesh>
          <icosahedronGeometry args={[1.38, 1]} />
          <meshBasicMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.38}
          />
        </mesh>
        {constellationNodes.map((pos, idx) => {
          const isCyan = idx % 3 === 0;
          return (
            <mesh key={idx} position={pos}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshStandardMaterial
                color={isCyan ? '#00e5ff' : '#f59e0b'}
                emissive={isCyan ? '#00e5ff' : '#f59e0b'}
                emissiveIntensity={0.6}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
          );
        })}
      </group>

      {/* Ring 1 */}
      <group ref={ring1Ref} rotation={[Math.PI / 3.4, Math.PI / 4.2, 0]}>
        <mesh>
          <torusGeometry args={[1.88, 0.024, 20, 100]} />
          <meshStandardMaterial color="#64748b" metalness={0.65} roughness={0.28} />
        </mesh>
      </group>

      {/* Ring 2 */}
      <group ref={ring2Ref} rotation={[-Math.PI / 3.6, -Math.PI / 4.8, 0]}>
        <mesh>
          <torusGeometry args={[1.7, 0.018, 16, 90]} />
          <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.35} />
        </mesh>
      </group>

      {/* Ring 3 with Beacon */}
      <group ref={ring3Ref} rotation={[Math.PI / 2.2, -Math.PI / 5, 0]}>
        <mesh>
          <torusGeometry args={[2.22, 0.015, 16, 100]} />
          <meshStandardMaterial color="#00e5ff" metalness={0.4} roughness={0.2} />
        </mesh>
        <mesh position={[2.22, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={0.8}
            metalness={0.2}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Ring 4 */}
      <group ref={ring4Ref} rotation={[-Math.PI / 3.8, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[1.52, 0.015, 16, 80]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.5} roughness={0.25} />
        </mesh>
      </group>

      {/* Orbiting Satellites */}
      <group ref={satellitesRef}>
        {satelliteNodes.map((node, idx) => (
          <mesh key={idx} position={node.pos}>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshStandardMaterial color={node.color} metalness={0.7} roughness={0.25} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function SignalField3D() {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setHasWebGL(gl);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 bg-blue-mesh dark:bg-dark-mesh opacity-70 pointer-events-none" />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 48 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[6, 7, 5]} intensity={1.6} />
        <directionalLight position={[-6, -4, -3]} color="#00e5ff" intensity={0.8} />
        <pointLight position={[2, 2, 3]} color="#f59e0b" intensity={1.2} />
        <fog attach="fog" args={['#09090b', 6, 15]} />

        <Particles count={220} />
        <FloatingSpatialCore />
      </Canvas>
    </div>
  );
}
