"use client";

import Link from "@/components/ui/SiteLink";
import { useCallback, useEffect, useRef, useState } from "react";
import { MathJaxRenderer } from "@/components/ui/MathJaxRenderer";
import { LineTeachingDemo } from "@/components/lessons/LineTeachingDemo";
import { videoOneTeaching } from "@/data/videoOneTeaching";

export function VideoOneTeaching() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [clean, setClean] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [work, setWork] = useState("");
  const [fullscreenError, setFullscreenError] = useState("");
  const stage = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLElement>(null);
  const scene = videoOneTeaching[index];
  const go = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(videoOneTeaching.length - 1, next)));
    setRevealed(0); setWork("");
    top.current?.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("input,textarea,select,button,a,[contenteditable]")) return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
      if (e.code === "Space") { e.preventDefault(); setRevealed((n) => Math.min(scene.steps.length, n + 1)); }
      if (e.key.toLowerCase() === "h") setClean((value) => !value);
      if (e.key === "Escape") setClean(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, scene.steps.length]);
  useEffect(() => {
    const update = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);
  async function toggleFullscreen() {
    try {
      setFullscreenError("");
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (stage.current?.requestFullscreen) await stage.current.requestFullscreen();
      else setFullscreenError("Use your browser's fullscreen command on this device.");
    } catch { setFullscreenError("Use your browser's fullscreen command on this device."); }
  }
  return (
    <div ref={stage} className={`teaching-page ${clean ? "teaching-clean" : ""}`}>
      {!clean && <header className="teaching-toolbar">
        <Link href="/lessons" className="text-sm font-semibold text-zinc-400 hover:text-white">All lessons</Link>
        <label className="flex min-w-0 flex-1 items-center gap-3"><span className="hidden text-xs uppercase tracking-wider text-sky-300 sm:inline">Video 1</span><select aria-label="Choose a teaching scene" value={index} onChange={(e) => go(Number(e.target.value))} className="min-w-0 max-w-lg flex-1 border border-white/15 bg-[#111] px-3 py-2 text-sm">{videoOneTeaching.map((item, n) => <option value={n} key={item.id}>{n + 1}. {item.title}</option>)}</select></label>
        <button type="button" onClick={toggleFullscreen} className="teaching-small-button">{fullscreen ? "Exit fullscreen" : "Fullscreen"}</button>
        <button type="button" onClick={() => setClean(true)} className="teaching-small-button">Hide controls</button>
      </header>}
      {fullscreenError && !clean && <p role="status" className="px-6 py-2 text-sm text-zinc-400">{fullscreenError}</p>}
      <article ref={top} key={scene.id} className="teaching-content">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Equations of lines{scene.practice ? "  Practice" : `  Section ${scene.section}`}</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl">{scene.title}</h1>
        <div className={`mt-9 ${scene.demo ? "grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start" : "max-w-5xl"}`}>
          <div>
            <p className="max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl sm:leading-9">{scene.explanation}</p>
            {scene.given && <MathJaxRenderer math={scene.given} className="mt-7 text-lg leading-9 text-zinc-100 sm:text-xl" />}
            {scene.formula && <MathJaxRenderer math={scene.formula} className="mt-7 text-xl text-sky-200 sm:text-2xl" />}
            {scene.practice && <label className="mt-8 block"><span className="text-sm text-zinc-400">Your working</span><textarea aria-label="Your working for this practice question" value={work} onChange={(e) => setWork(e.target.value)} placeholder="Try the question before revealing the solution" className="mt-3 min-h-24 w-full resize-y border border-white/15 bg-transparent p-4 text-base leading-7 text-zinc-200 placeholder:text-zinc-600" /></label>}
            <div className="mt-8 space-y-7" aria-live="polite">
              {scene.steps.slice(0, revealed).map((step, n) => <section key={`${scene.id}-${n}`} className="teaching-working-step"><p className="mb-2 font-mono text-xs text-sky-300">Step {n + 1}</p><p className="text-lg leading-8 text-zinc-200">{step.text}</p>{step.math && <MathJaxRenderer math={step.math} className="mt-3 text-lg text-zinc-100 sm:text-xl" />}</section>)}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {scene.questionOnly && <button type="button" onClick={() => go(index + 1)} className="primary-action">Open worked solution</button>}
              {revealed < scene.steps.length ? <button type="button" onClick={() => setRevealed((n) => Math.min(scene.steps.length, n + 1))} className="primary-action">{revealed === 0 ? scene.practice ? "Reveal solution" : "Show explanation" : "Reveal next step"}</button> : <p className="text-sm text-zinc-400">All steps shown</p>}
              {revealed > 0 && <button type="button" onClick={() => setRevealed(0)} className="teaching-small-button">Hide working</button>}
            </div>
          </div>
          {scene.demo && <LineTeachingDemo key={scene.id} mode={scene.demo} />}
        </div>
        {!clean && <details className="mt-12 max-w-4xl border-t border-white/10 pt-5"><summary className="cursor-pointer text-sm font-semibold text-zinc-400">Teaching notes</summary><p className="mt-4 text-base leading-8 text-zinc-300">{scene.notes}</p></details>}
      </article>
      {!clean ? <footer className="teaching-footer">
        <button type="button" onClick={() => go(index - 1)} disabled={index === 0} className="teaching-small-button disabled:opacity-30">Previous</button>
        <div className="text-center"><p className="text-sm text-zinc-400">{index + 1} of {videoOneTeaching.length}</p><p className="mt-1 hidden text-xs text-zinc-600 sm:block">Left and right change scene. Space reveals a step. H hides controls.</p></div>
        <button type="button" onClick={() => go(index + 1)} disabled={index === videoOneTeaching.length - 1} className="teaching-small-button disabled:opacity-30">Next</button>
      </footer> : <div className="teaching-clean-controls"><button type="button" className="teaching-small-button" onClick={() => go(index - 1)} disabled={index === 0}>Previous</button><button type="button" className="teaching-small-button" onClick={() => setClean(false)}>Show controls</button><button type="button" className="teaching-small-button" onClick={() => go(index + 1)} disabled={index === videoOneTeaching.length - 1}>Next</button></div>}
    </div>
  );
}
