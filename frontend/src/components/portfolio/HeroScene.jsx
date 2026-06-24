import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
function Console({ mouse }) {
  const group = useRef(), innerRing = useRef(), outerRing = useRef(), core = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    const tx = mouse.current.x * 0.35, ty = mouse.current.y * 0.35;
    group.current.rotation.y += (tx - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-ty - group.current.rotation.x) * 0.05;
    if (core.current) { core.current.rotation.x += delta * 0.4; core.current.rotation.y += delta * 0.6; }
    if (innerRing.current) innerRing.current.rotation.z += delta * 0.25;
    if (outerRing.current) outerRing.current.rotation.z -= delta * 0.12;
  });
  return (
    <group ref={group} position={[1.5, 0, 0]}>
      <mesh><torusGeometry args={[1.8, 0.04, 16, 100]} /><meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={0.6} metalness={0.4} roughness={0.4} /></mesh>
      <mesh ref={outerRing} rotation={[Math.PI / 2.4, 0, 0]}><torusGeometry args={[2.2, 0.015, 8, 120]} /><meshBasicMaterial color="#FFD166" /></mesh>
      <mesh ref={innerRing} rotation={[Math.PI / 3, Math.PI / 6, 0]}><torusGeometry args={[1.35, 0.012, 8, 100]} /><meshBasicMaterial color="#06D6A0" /></mesh>
      <mesh ref={core}><icosahedronGeometry args={[0.7, 0]} /><meshStandardMaterial color="#141414" emissive="#FF6B35" emissiveIntensity={0.5} wireframe /></mesh>
      <mesh><icosahedronGeometry args={[0.42, 0]} /><meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={1.2} roughness={0.2} metalness={0.6} /></mesh>
      {[0,1,2,3,4,5].map((i) => { const a = (i/6)*Math.PI*2; return (<mesh key={i} position={[Math.cos(a)*1.8, Math.sin(a)*1.8, 0]}><sphereGeometry args={[0.04, 12, 12]} /><meshBasicMaterial color={i%2===0?'#FFD166':'#FF6B35'} /></mesh>); })}
      <mesh position={[0, 0, -2]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[12, 12, 24, 24]} /><meshBasicMaterial color="#1C1C1C" wireframe /></mesh>
    </group>
  );
}
function Scene() {
  const mouse = useRef({ x: 0, y: 0 });
  useFrame(({ pointer }) => { mouse.current.x = pointer.x; mouse.current.y = pointer.y; });
  return (<><ambientLight intensity={0.3} /><pointLight position={[3,2,4]} intensity={2.4} color="#FF6B35" /><pointLight position={[-3,-2,2]} intensity={1.2} color="#FFD166" /><pointLight position={[0,0,-4]} intensity={0.8} color="#06D6A0" /><Console mouse={mouse} /></>);
}
export default function HeroScene() {
  return (<div className="absolute inset-0 pointer-events-none"><Canvas camera={{ position: [0,0,5.5], fov: 45 }} dpr={[1, 1.5]}><Suspense fallback={null}><Scene /></Suspense></Canvas></div>);
}
