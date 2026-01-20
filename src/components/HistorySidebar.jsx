import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';

export default function HistorySidebar({ history, onSelect }) {
    const isLoading = history === null || (history.length === 0 && !history.__initialLoaded); // Simple heuristic

    return (
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="flex items-center gap-2 mb-4 text-[hsl(var(--muted-foreground))]">
                <Clock size={16} />
                <h3 className="text-xs font-semibold uppercase tracking-wider">History</h3>
            </div>

            {history && history.length === 0 ? (
                <div className="text-center py-10 text-[hsl(var(--muted-foreground))] text-sm">
                    No designs yet.
                    <br />Start generating!
                </div>
            ) : !history ? (
                <div className="flex flex-col gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 w-full rounded-lg bg-muted/20 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {history.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className="group flex flex-col items-start gap-1 p-3 rounded-lg hover:bg-accent/10 border border-transparent hover:border-accent/20 transition-all text-left w-full"
                        >
                            <span className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">{item.prompt}</span>
                            <span className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleDateString()}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
