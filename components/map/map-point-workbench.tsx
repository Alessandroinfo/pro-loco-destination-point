"use client";

import { useEffect, useState } from "react";

import { IslandMapCanvas } from "@/components/map/island-map-canvas";
import { pointOfInterestLegend, pointsOfInterest } from "@/features/map/map.data";
import type { PointOfInterest } from "@/features/map/map.types";

const DRAFT_POINT_ID = "__draft__";
const DEFAULT_POINT_IMAGE = "/placeholders/category-map.svg";
const LAMPIONE_BOUNDS = {
  minX: -1700,
  maxX: -700,
  minY: 580,
  maxY: 1750
} as const;

function inferIslandFromCoordinates({ mapX, mapY }: { mapX: number; mapY: number }): PointOfInterest["island"] {
  if (
    mapX >= LAMPIONE_BOUNDS.minX &&
    mapX <= LAMPIONE_BOUNDS.maxX &&
    mapY >= LAMPIONE_BOUNDS.minY &&
    mapY <= LAMPIONE_BOUNDS.maxY
  ) {
    return "Lampione";
  }

  if (mapX >= 11000) {
    return "Linosa";
  }

  return "Lampedusa";
}

function createEmptyDraft(): PointOfInterest {
  return {
    id: "",
    name: "",
    category: "Spiagge",
    description: "",
    imageSrc: DEFAULT_POINT_IMAGE,
    mapX: 0,
    mapY: 0,
    island: "Lampedusa"
  };
}

function formatPointSnippet(point: PointOfInterest, indent = "  ") {
  return [
    `${indent}{`,
    `${indent}  id: ${JSON.stringify(point.id)},`,
    `${indent}  name: ${JSON.stringify(point.name)},`,
    `${indent}  category: ${JSON.stringify(point.category)},`,
    `${indent}  description: ${JSON.stringify(point.description)},`,
    `${indent}  imageSrc: ${JSON.stringify(point.imageSrc)},`,
    `${indent}  mapX: ${point.mapX},`,
    `${indent}  mapY: ${point.mapY},`,
    `${indent}  island: ${JSON.stringify(point.island)}`,
    `${indent}}`
  ].join("\n");
}

function formatPointsArray(points: PointOfInterest[]) {
  return `export const pointsOfInterest: PointOfInterest[] = [\n${points.map((point) => formatPointSnippet(point)).join(",\n")}\n];`;
}

export function MapPointWorkbench() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const [workingPoints, setWorkingPoints] = useState(pointsOfInterest);
  const [draft, setDraft] = useState<PointOfInterest>(createEmptyDraft);
  const [copyFeedback, setCopyFeedback] = useState("");
  const [pointInsertionMode, setPointInsertionMode] = useState(false);
  const [editingPointId, setEditingPointId] = useState<string | null>(null);

  const categories = Object.keys(pointOfInterestLegend) as PointOfInterest["category"][];
  const hasDraftCoordinates = draft.mapX !== 0 || draft.mapY !== 0;
  const hasDraftContent = Boolean(draft.id.trim() || draft.name.trim() || draft.description.trim() || hasDraftCoordinates);
  const normalizedDraft: PointOfInterest = {
    ...draft,
    id: draft.id.trim(),
    name: draft.name.trim(),
    description: draft.description.trim(),
    imageSrc: draft.imageSrc.trim() || DEFAULT_POINT_IMAGE,
    mapX: Math.round(draft.mapX),
    mapY: Math.round(draft.mapY)
  };
  const draftPreviewPoint: PointOfInterest = {
    ...normalizedDraft,
    id: normalizedDraft.id || DRAFT_POINT_ID,
    name: normalizedDraft.name || "Nuovo punto",
    description: normalizedDraft.description || "Bozza temporanea per il posizionamento.",
    imageSrc: normalizedDraft.imageSrc || DEFAULT_POINT_IMAGE
  };
  const previewPoints = hasDraftContent
    ? [...workingPoints.filter((point) => point.id !== normalizedDraft.id && point.id !== DRAFT_POINT_ID), draftPreviewPoint]
    : workingPoints;
  const hasIdConflict = Boolean(
    normalizedDraft.id &&
      workingPoints.some((point) => point.id === normalizedDraft.id && point.id !== editingPointId)
  );
  const canPersistDraft = Boolean(
    normalizedDraft.id && normalizedDraft.name && normalizedDraft.description && hasDraftCoordinates && !hasIdConflict
  );
  const singlePointSnippet = formatPointSnippet({
    ...draftPreviewPoint,
    id: normalizedDraft.id || "nuovo-punto"
  }, "");
  const fullArraySnippet = formatPointsArray(workingPoints);

  useEffect(() => {
    if (!copyFeedback) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopyFeedback("");
    }, 1800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copyFeedback]);

  if (!isDevelopment) {
    return null;
  }

  const handleCopy = async (value: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyFeedback(successMessage);
    } catch {
      setCopyFeedback("Copia manuale dal riquadro sotto.");
    }
  };

  const handleMapCoordinatePick = (coordinates: { mapX: number; mapY: number }) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      mapX: coordinates.mapX,
      mapY: coordinates.mapY,
      island: inferIslandFromCoordinates(coordinates)
    }));
  };

  const handleDraftFieldChange = <K extends keyof PointOfInterest>(field: K, value: PointOfInterest[K]) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value
    }));
  };

  const loadPointIntoDraft = (point: PointOfInterest) => {
    setDraft(point);
    setEditingPointId(point.id);
  };

  const resetDraft = () => {
    setDraft(createEmptyDraft());
    setEditingPointId(null);
  };

  const persistDraft = () => {
    if (!canPersistDraft) {
      return;
    }

    setWorkingPoints((currentPoints) => {
      const existingIndex = editingPointId ? currentPoints.findIndex((point) => point.id === editingPointId) : -1;

      if (existingIndex === -1) {
        return [...currentPoints, normalizedDraft];
      }

      const nextPoints = [...currentPoints];
      nextPoints[existingIndex] = normalizedDraft;
      return nextPoints;
    });

    setDraft(normalizedDraft);
    setEditingPointId(normalizedDraft.id);
    setCopyFeedback("Punto aggiornato nella bozza locale.");
  };

  const removePointById = (pointId: string) => {
    setWorkingPoints((currentPoints) => currentPoints.filter((point) => point.id !== pointId));

    if (editingPointId === pointId || normalizedDraft.id === pointId) {
      resetDraft();
    }

    setCopyFeedback("Punto rimosso dalla bozza locale.");
  };

  const removeDraftPoint = () => {
    const pointIdToRemove = editingPointId ?? normalizedDraft.id;

    if (!pointIdToRemove) {
      resetDraft();
      return;
    }

    removePointById(pointIdToRemove);
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-1">
        <div className="glass-panel soft-outline relative h-[720px] w-full overflow-visible rounded-[2rem] border p-6">
          <IslandMapCanvas
            points={previewPoints}
            onMapCoordinatePick={handleMapCoordinatePick}
            pointInsertionMode={isDevelopment && pointInsertionMode}
          />
        </div>
      </section>

      <section className="glass-panel soft-outline rounded-[2rem] border p-6">
        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-navy-900/55">Sezione temporanea</p>
                <h2 className="mt-2 text-2xl font-semibold text-navy-950">Editor punti mappa</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-navy-900/70">
                  Clicca sulla mappa per leggere `mapX` e `mapY`, poi compila i campi del punto. Quando la bozza ti convince, aggiorna il JSON locale e copia il blocco finale.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-3">
                {isDevelopment ? (
                  <button
                    type="button"
                    onClick={() => setPointInsertionMode((currentValue) => !currentValue)}
                    className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      pointInsertionMode
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-navy-950/12 bg-white text-navy-950"
                    }`}
                  >
                    <span
                      className={`relative h-6 w-11 rounded-full transition ${
                        pointInsertionMode ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                      aria-hidden="true"
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                          pointInsertionMode ? "left-6" : "left-1"
                        }`}
                      />
                    </span>
                    Modalita inserimento
                  </button>
                ) : null}
                {copyFeedback ? (
                  <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">{copyFeedback}</div>
                ) : null}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {workingPoints.map((point) => (
                <div key={point.id} className="rounded-[1.1rem] border border-navy-950/10 bg-white/75 px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      className="min-w-0 flex-1 text-left transition hover:text-navy-700"
                      onClick={() => loadPointIntoDraft(point)}
                    >
                      <p className="text-sm font-semibold text-navy-950">{point.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-navy-900/45">{point.id}</p>
                      <p className="mt-2 text-sm text-navy-900/65">
                        {point.mapX}, {point.mapY}
                      </p>
                    </button>
                    <button
                      type="button"
                      className="shrink-0 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                      onClick={() => removePointById(point.id)}
                    >
                      Rimuovi
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="rounded-[1.1rem] border border-dashed border-navy-950/20 bg-slate-50/85 px-4 py-3 text-left transition hover:border-navy-950/35 hover:bg-white"
                onClick={resetDraft}
              >
                <p className="text-sm font-semibold text-navy-950">Nuovo punto</p>
                <p className="mt-2 text-sm text-navy-900/65">Apre una bozza vuota da posizionare sulla mappa.</p>
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-navy-950">ID</span>
                <input
                  value={draft.id}
                  onChange={(event) => handleDraftFieldChange("id", event.target.value)}
                  className="rounded-[1rem] border border-navy-950/12 bg-white px-4 py-3 text-sm text-navy-950 outline-none transition focus:border-navy-950/30"
                  placeholder="es. cala-madonna"
                />
                {hasIdConflict ? <span className="text-xs font-medium text-rose-700">Esiste gia un punto con questo ID.</span> : null}
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-navy-950">Nome</span>
                <input
                  value={draft.name}
                  onChange={(event) => handleDraftFieldChange("name", event.target.value)}
                  className="rounded-[1rem] border border-navy-950/12 bg-white px-4 py-3 text-sm text-navy-950 outline-none transition focus:border-navy-950/30"
                  placeholder="Nome del punto"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-navy-950">Categoria</span>
                <select
                  value={draft.category}
                  onChange={(event) => handleDraftFieldChange("category", event.target.value as PointOfInterest["category"])}
                  className="rounded-[1rem] border border-navy-950/12 bg-white px-4 py-3 text-sm text-navy-950 outline-none transition focus:border-navy-950/30"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-navy-950">Isola</span>
                <select
                  value={draft.island}
                  onChange={(event) => handleDraftFieldChange("island", event.target.value as PointOfInterest["island"])}
                  className="rounded-[1rem] border border-navy-950/12 bg-white px-4 py-3 text-sm text-navy-950 outline-none transition focus:border-navy-950/30"
                >
                  <option value="Lampedusa">Lampedusa</option>
                  <option value="Linosa">Linosa</option>
                  <option value="Lampione">Lampione</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm font-medium text-navy-950">Descrizione</span>
                <textarea
                  value={draft.description}
                  onChange={(event) => handleDraftFieldChange("description", event.target.value)}
                  className="min-h-28 rounded-[1rem] border border-navy-950/12 bg-white px-4 py-3 text-sm text-navy-950 outline-none transition focus:border-navy-950/30"
                  placeholder="Descrizione breve da mostrare nel tooltip"
                />
              </label>
              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm font-medium text-navy-950">Immagine placeholder / foto</span>
                <input
                  value={draft.imageSrc}
                  onChange={(event) => handleDraftFieldChange("imageSrc", event.target.value)}
                  className="rounded-[1rem] border border-navy-950/12 bg-white px-4 py-3 text-sm text-navy-950 outline-none transition focus:border-navy-950/30"
                  placeholder="/placeholders/category-map.svg"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-3 rounded-[1.2rem] border border-sky-100 bg-sky-50/80 px-4 py-4">
              <div className="min-w-[9rem]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-800/60">Coordinate live</p>
                <p className="mt-1 text-sm font-semibold text-sky-950">
                  {draft.mapX} / {draft.mapY}
                </p>
              </div>
              <div className="min-w-[8rem]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-800/60">Istruzione</p>
                <p className="mt-1 text-sm text-sky-950">
                  {isDevelopment && pointInsertionMode
                    ? "Modalita inserimento attiva: clicca sulla mappa per salvare le coordinate senza tooltip."
                    : "Attiva lo switch in sviluppo e clicca sulla mappa per aggiornare la posizione."}
                </p>
              </div>
              <div className="min-w-[8rem]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-800/60">Isola suggerita</p>
                <p className="mt-1 text-sm text-sky-950">{draft.island}</p>
              </div>
              <div className="min-w-[10rem]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-800/60">JSON bozza</p>
                <p className="mt-1 text-sm text-sky-950">Si aggiorna automaticamente quando aggiungi, modifichi o rimuovi.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={persistDraft}
                disabled={!canPersistDraft}
                className="rounded-full bg-navy-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-900 disabled:cursor-not-allowed disabled:bg-navy-950/25"
              >
                Aggiungi / aggiorna nella bozza
              </button>
              <button
                type="button"
                onClick={removeDraftPoint}
                className="rounded-full border border-navy-950/15 bg-white px-5 py-3 text-sm font-semibold text-navy-950 transition hover:border-navy-950/30 hover:bg-slate-50"
              >
                Rimuovi dalla bozza
              </button>
              <button
                type="button"
                onClick={resetDraft}
                className="rounded-full border border-navy-950/15 bg-white px-5 py-3 text-sm font-semibold text-navy-950 transition hover:border-navy-950/30 hover:bg-slate-50"
              >
                Nuovo punto vuoto
              </button>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-5 xl:max-w-[42rem]">
            <section className="rounded-[1.4rem] border border-navy-950/10 bg-white/78 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-navy-950">Oggetto del punto corrente</p>
                  <p className="mt-1 text-sm text-navy-900/65">Usalo per aggiungere o correggere un singolo elemento nel file dati.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(singlePointSnippet, "Oggetto del punto copiato.")}
                  className="rounded-full border border-navy-950/15 bg-white px-4 py-2 text-sm font-semibold text-navy-950 transition hover:border-navy-950/30 hover:bg-slate-50"
                >
                  Copia oggetto
                </button>
              </div>
              <textarea
                readOnly
                value={singlePointSnippet}
                className="mt-4 min-h-64 w-full rounded-[1rem] border border-navy-950/10 bg-slate-950 px-4 py-4 font-mono text-xs leading-6 text-slate-100 outline-none"
              />
            </section>

            <section className="rounded-[1.4rem] border border-navy-950/10 bg-white/78 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-navy-950">Array completo della bozza</p>
                  <p className="mt-1 text-sm text-navy-900/65">Questo blocco segue la struttura di `pointsOfInterest`, si aggiorna live ed e pronto da incollare nel file dati.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(fullArraySnippet, "Array completo copiato.")}
                  className="rounded-full border border-navy-950/15 bg-white px-4 py-2 text-sm font-semibold text-navy-950 transition hover:border-navy-950/30 hover:bg-slate-50"
                >
                  Copia array
                </button>
              </div>
              <textarea
                readOnly
                value={fullArraySnippet}
                className="mt-4 min-h-[26rem] w-full rounded-[1rem] border border-navy-950/10 bg-slate-950 px-4 py-4 font-mono text-xs leading-6 text-slate-100 outline-none"
              />
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
