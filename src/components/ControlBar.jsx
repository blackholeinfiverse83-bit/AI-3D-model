import React from 'react';
import { RefreshCw, Star, Layers, Download } from 'lucide-react';

export default function ControlBar({ onIterate, onEvaluate, onCompare, isComparing, onDownload }) {
    return (
        <div className="flex items-center gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {onCompare && (
                <button
                    onClick={onCompare}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-all font-medium text-sm border ${isComparing
                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/50'
                            : 'bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground'
                        }`}
                >
                    <Layers size={16} />
                    {isComparing ? 'View Current' : 'View Previous'}
                </button>
            )}
            <button
                onClick={onIterate}
                className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground p-3 rounded-lg hover:bg-secondary/80 transition-all font-medium text-sm"
            >
                <RefreshCw size={16} />
                Iterate
            </button>

            <button
                onClick={onEvaluate}
                className="flex-1 flex items-center justify-center gap-2 bg-background text-foreground p-3 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground transition-all font-medium text-sm"
            >
                <Star size={16} />
                Evaluate
            </button>

            {onDownload && (
                <button
                    onClick={onDownload}
                    className="flex items-center justify-center gap-2 bg-background text-foreground p-3 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground transition-all font-medium text-sm"
                    title="Download 3D Model"
                >
                    <Download size={16} />
                </button>
            )}
        </div>
    );
}
