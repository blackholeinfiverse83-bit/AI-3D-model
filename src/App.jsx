import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import ThreeCanvas from './components/ThreeCanvas';
import PromptPanel from './components/PromptPanel';
import ControlBar from './components/ControlBar';
import HistorySidebar from './components/HistorySidebar';
import EvaluationModal from './components/EvaluationModal';
import IterationModal from './components/IterationModal';
import { generateDesign, iterateDesign, evaluateDesign, getHistory } from './api/endpoints';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    const [currentDesign, setCurrentDesign] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isIterating, setIsIterating] = useState(false);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [apiError, setApiError] = useState(null);

    // Modals state
    const [showIterationModal, setShowIterationModal] = useState(false);
    const [showEvaluationModal, setShowEvaluationModal] = useState(false);
    const [previousDesign, setPreviousDesign] = useState(null);
    const [isComparing, setIsComparing] = useState(false);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const data = await getHistory();
            if (Array.isArray(data)) {
                setHistory(data);
            }
        } catch (err) {
            console.error("Failed to load history", err);
            // Fallback: don't crash if API is offline during dev
        }
    };

    const handleGenerate = async (prompt) => {
        setLoading(true);
        setApiError(null);
        setPreviousDesign(null); // Reset comparison on new generation
        try {
            const design = await generateDesign(prompt);
            setCurrentDesign(design);
            loadHistory(); // Refresh list
        } catch (err) {
            setApiError("Failed to generate design. API might be unreachable.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleIterate = async (instructions) => {
        if (!currentDesign) return;
        setIsIterating(true);
        setApiError(null);
        // Save current as previous before updating
        setPreviousDesign(currentDesign);
        try {
            const newDesign = await iterateDesign(currentDesign.id, instructions);
            setCurrentDesign(newDesign);
            loadHistory();
            setShowIterationModal(false);
        } catch (err) {
            setApiError("Iteration failed.");
            console.error(err);
        } finally {
            setIsIterating(false);
        }
    };

    const handleEvaluate = async ({ rating, feedback }) => {
        if (!currentDesign) return;
        setIsEvaluating(true);
        try {
            await evaluateDesign(currentDesign.id, rating, feedback);
            setShowEvaluationModal(false);
            // Simple feedback acknowledgment
            const prevId = currentDesign.id;
            setApiError(null); // Clear errors
            // Optimistically update or just notify (using a simple alert for this demo)
            // alert("Feedback submitted! Thank you.");
        } catch (err) {
            console.error(err);
            setApiError("Failed to submit feedback.");
        } finally {
            setIsEvaluating(false);
        }
    };

    const toggleCompare = () => {
        setIsComparing(!isComparing);
    };

    // Determine which model to show
    const displayedDesign = isComparing && previousDesign ? previousDesign : currentDesign;

    return (
        <div className="flex flex-col md:flex-row h-screen w-full bg-[hsl(var(--background))] overflow-hidden font-sans text-[hsl(var(--foreground))]">
            {/* Sidebar */}
            <aside className="w-full md:w-80 h-auto md:h-full border-b md:border-b-0 md:border-r border-border flex flex-col bg-card z-20">
                <div className="p-4 md:p-6 border-b border-border flex items-center justify-between md:justify-start">
                    <img src={logo} alt="Infiverse" className="h-6 md:h-8 w-auto object-contain" />
                </div>
                {/* Hide history on mobile to save space, or make it collapsible. For now, hiding on very small screens or keeping it small */}
                <div className="hidden md:flex flex-1 overflow-hidden">
                    <HistorySidebar history={history} onSelect={setCurrentDesign} />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative overflow-hidden">
                {/* Header */}
                <header className="h-14 md:h-16 border-b border-border flex items-center justify-between px-4 md:px-6 bg-background z-10 shrink-0">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">Workspace</span>
                        <span className="text-xs text-muted-foreground">
                            {displayedDesign ? `Design ID: ${displayedDesign.id}` : 'Ready to create'}
                            {isComparing && <span className="ml-2 text-yellow-500 font-bold">(COMPARING PREVIOUS)</span>}
                        </span>
                    </div>
                    {apiError && (
                        <div className="text-red-500 text-xs bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                            {apiError}
                        </div>
                    )}
                </header>

                {/* 3D Viewport */}
                <div className="flex-1 relative bg-gradient-to-b from-[hsl(var(--muted))] to-[hsl(var(--background))] overflow-hidden">
                    <ErrorBoundary fallback={
                        <div className="w-full h-full flex flex-col items-center justify-center text-[hsl(var(--muted-foreground))]">
                            <span className="text-4xl mb-2">⚠️</span>
                            <p>3D View Unavailable</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-[hsl(var(--primary))] text-white rounded-md text-sm hover:opacity-90 transition-opacity"
                            >
                                Reload App
                            </button>
                        </div>
                    }>
                        <ThreeCanvas modelUrl={displayedDesign?.glbUrl} loading={loading} />
                    </ErrorBoundary>

                    {/* Overlay Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background))] to-transparent pointer-events-none">
                        <div className="max-w-3xl mx-auto flex flex-col gap-4 animate-in slide-in-from-bottom-10 fade-in duration-700 pointer-events-auto">

                            <PromptPanel
                                onGenerate={handleGenerate}
                                loading={loading}
                            />

                            {currentDesign && !loading && (
                                <ControlBar
                                    onIterate={() => setShowIterationModal(true)}
                                    onEvaluate={() => setShowEvaluationModal(true)}
                                    onCompare={previousDesign ? toggleCompare : null}
                                    isComparing={isComparing}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Modals */}
            <IterationModal
                isOpen={showIterationModal}
                onClose={() => setShowIterationModal(false)}
                onSubmit={handleIterate}
                isSubmitting={isIterating}
            />

            <EvaluationModal
                isOpen={showEvaluationModal}
                onClose={() => setShowEvaluationModal(false)}
                onSubmit={handleEvaluate}
                isSubmitting={isEvaluating}
            />
        </div>
    );
}

export default App;
