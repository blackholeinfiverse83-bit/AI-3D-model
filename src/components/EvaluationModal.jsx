import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

export default function EvaluationModal({ isOpen, onClose, onSubmit, isSubmitting }) {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit({ rating, feedback });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Rate Design</h3>
                    <button onClick={onClose} className="text-[hsl(var(--muted-foreground))] hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-[hsl(var(--muted-foreground))] uppercase tracking-wider font-semibold">Quality Rating</span>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`transition-all hover:scale-110 ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-[hsl(var(--muted))]'}`}
                                >
                                    <Star size={32} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Feedback (Optional)</label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="What do you think about this structure?"
                            className="w-full bg-[hsl(var(--background))] border border-[hsl(var(--input))] rounded-lg p-3 text-sm focus:ring-2 focus:ring-[hsl(var(--ring))] outline-none resize-none h-24"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!rating || isSubmitting}
                        className="w-full bg-[hsl(var(--primary))] text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-colors"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Evaluation'}
                    </button>
                </div>
            </div>
        </div>
    );
}
