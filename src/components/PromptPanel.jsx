import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function PromptPanel({ onGenerate, loading }) {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt.trim()) {
            onGenerate(prompt);
        }
    };

    return (
        <div className="w-full bg-card border border-border rounded-xl p-4 shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Prompt
                    </label>
                </div>

                <div className="relative">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your vision..."
                        className="w-full bg-background border border-input rounded-lg p-3 text-sm focus:ring-1 focus:ring-ring focus:border-input outline-none resize-none h-24 transition-all placeholder:text-muted-foreground"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={!prompt.trim() || loading}
                        className="absolute bottom-3 right-3 bg-primary text-primary-foreground p-2 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        ) : (
                            <ArrowRight size={16} />
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
