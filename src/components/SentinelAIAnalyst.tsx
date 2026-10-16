'use client';
import React, { useState } from 'react';
import { fontData } from '../lib/evidenceEngine';

export default function SentinelAIAnalyst() {
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: `Hello! I am SENTINEL AI ANALYST. I am loaded with the complete Evidence Package for ${fontData.name}, ${fontData.region}, ${fontData.country}. Ask me anything about crop suitability, land cover, soil condition, or climate risks.`
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    const userQ = question;
    setQuestion('');
    setChat((prev) => [...prev, { sender: 'user', text: userQ }]);
    setLoading(true);

    try {
      const res = await fetch('/api/sentinel-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQ })
      });
      const data = await res.json();
      setChat((prev) => [...prev, { sender: 'ai', text: data.answer || data.error }]);
    } catch {
      setChat((prev) => [...prev, { sender: 'ai', text: "Error connecting to SENTINEL AI server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#081120] border border-slate-800/80 rounded-xl p-5 flex flex-col gap-4 shadow-2xl h-[520px]">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-sky-950 border border-sky-800 text-sky-400 font-bold text-sm">🤖</span>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">SENTINEL AI ANALYST</h3>
            <p className="text-[10px] text-slate-400">Explainable Earth Observation & Geospatial Reasoning Engine</p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold bg-sky-950 text-sky-400 border border-sky-800 px-2 py-0.5 rounded">
          Evidence Engine v1.0
        </span>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg text-xs leading-relaxed max-w-[85%] ${
              msg.sender === 'user'
                ? 'bg-sky-600 text-white self-end font-medium'
                : 'bg-[#040a14] border border-slate-800 text-slate-200 self-start font-mono whitespace-pre-line'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="bg-[#040a14] border border-slate-800 text-sky-400 p-3 rounded-lg text-xs self-start font-mono animate-pulse">
            ⚡ Extracting spatial metrics & synthesizing response...
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto text-[11px] py-1 border-t border-slate-800/80">
        <span className="text-slate-500 font-semibold shrink-0">Try:</span>
        {[
          "Is Ghotki suitable for Wheat?",
          "What is the land cover distribution?",
          "Explain soil moisture risks"
        ].map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setQuestion(q)}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 px-2.5 py-1 rounded-md shrink-0 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      <form onSubmit={handleAsk} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask SENTINEL AI about Ghotki geospatial evidence..."
          className="flex-1 bg-[#040a14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 placeholder:text-slate-500 font-mono"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
        >
          Send ➔
        </button>
      </form>
    </div>
  );
}