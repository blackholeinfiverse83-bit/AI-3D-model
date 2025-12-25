import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Environment } from '@react-three/drei';

function Model({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
}

export default function ThreeCanvas({ modelUrl, loading }) {
    return (
        <div className="w-full h-full relative group">
            {/* Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-sm font-medium">Generating Architecture...</p>
                </div>
            )}

            {!modelUrl && !loading && (
                <div className="absolute inset-0 flex items-center justify-center text-[hsl(var(--muted-foreground))]">
                    <div className="text-center">
                        <div className="text-6xl mb-4 opacity-20">🏗️</div>
                        <p>Enter a prompt to generate a 3D model</p>
                    </div>
                </div>
            )}

            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
                <Suspense fallback={null}>
                    <Environment preset="city" />
                    {modelUrl && (
                        <Stage environment="city" intensity={0.6}>
                            <Model url={modelUrl} />
                        </Stage>
                    )}
                </Suspense>
                <OrbitControls autoRotate={!!modelUrl} autoRotateSpeed={0.5} makeDefault />
            </Canvas>
        </div>
    );
}
