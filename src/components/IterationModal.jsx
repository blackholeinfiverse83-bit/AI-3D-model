import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

export default function IterationModal({ isOpen, onClose, onSubmit, isSubmitting }) {
    const [instructions, setInstructions] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (instructions.trim()) {
            onSubmit(instructions);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Iterate Design</h3>
                    <button onClick={onClose} className="text-[hsl(var(--muted-foreground))] hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                            Describe how you want to modify the current design. Be specific.
                        </p>

                        <textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            autoFocus
                            placeholder="E.g., Make the roof flat, change the material to concrete, add a large window..."
                            className="w-full bg-[hsl(var(--background))] border border-[hsl(var(--input))] rounded-lg p-3 text-sm focus:ring-2 focus:ring-[hsl(var(--ring))] outline-none resize-none h-32"
                        />

                        <button
                            type="submit"
                            disabled={!instructions.trim() || isSubmitting}
                            className="w-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[hsl(var(--secondary))/80] transition-colors flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? 'Processing Update...' : 'Iterate Design'}
                            {!isSubmitting && <ArrowRight size={16} />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
