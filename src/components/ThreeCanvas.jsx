import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Environment, PerspectiveCamera, Center } from '@react-three/drei';
import { Maximize2 } from 'lucide-react';

function Model({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
}

export default function ThreeCanvas({ modelUrl, loading }) {
    const [viewKey, setViewKey] = React.useState(0);

    const handleReset = () => {
        setViewKey(prev => prev + 1);
    };

    return (
        <div className="w-full h-full relative group">
            {/* Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md text-foreground animate-in fade-in duration-300">
                    <div className="relative w-16 h-16 mb-4">
                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
                    </div>
                    <p className="text-sm font-medium tracking-tight">Generating design...</p>
                </div>
            )}

            {!modelUrl && !loading && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground animate-in zoom-in-95 duration-500">
                    <div className="text-center">
                        <div className="text-6xl mb-4 opacity-10">🏗️</div>
                        <p className="text-sm font-medium">Ready to create your vision</p>
                    </div>
                </div>
            )}

            {modelUrl && (
                <button
                    onClick={handleReset}
                    className="absolute top-4 right-4 z-10 p-2 bg-card/50 backdrop-blur-md border border-border rounded-lg text-muted-foreground hover:text-white transition-colors"
                    title="Reset View"
                >
                    <Maximize2 size={16} />
                </button>
            )}

            <Canvas key={viewKey} shadows dpr={[1, 2]} camera={{ fov: 50 }}>
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
