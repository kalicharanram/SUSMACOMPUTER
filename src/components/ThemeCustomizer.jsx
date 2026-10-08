import { useEffect, useState } from 'react';
import { Check, Moon, Palette, RotateCcw, Sun, X, Monitor } from 'lucide-react';
import { FONTS, PRESETS, useTheme } from '../theme';

/**
 * Theme customiser: a floating palette button that opens a slide-in panel.
 *
 * Deliberately built as an overlay rather than a page of settings. It writes to
 * <html> as each control is touched, so the page behind the panel changes live —
 * there is no Apply step and nothing to reload. "Save" only writes to this
 * browser; "Reset" clears it back to the shipped look.
 */

const MODES = [
  { id: 'light', label: 'Light', Icon: Sun },
  { id: 'dark', label: 'Dark', Icon: Moon },
  { id: 'system', label: 'System', Icon: Monitor },
];

export function ThemeCustomizer() {
  const { theme, dark, save, choosePreset, reset } = useTheme();
  const [open, setOpen] = useState(false);

  // Escape closes the panel, and the page behind must not scroll while it is open.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const activePreset = PRESETS.find((p) => p.id === theme.preset);

  return (
    <>
      {/* ---- floating trigger ---- */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open theme customizer"
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[80] inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-3 text-sm font-bold text-white shadow-lift transition-colors hover:bg-brand-blue-dark"
      >
        <Palette className="size-5" />
        Theme
      </button>

      {open && (
        <div className="fixed inset-0 z-[95] flex justify-end">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Theme customizer"
            className="relative flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white shadow-lift"
          >
            {/* ---- header ---- */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-lg font-extrabold">Theme Customizer</h2>
                <p className="text-xs text-body/70">Make it yours</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close theme customizer"
                className="grid size-9 place-items-center rounded-md text-body transition-colors hover:bg-slate-50 hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6 px-5 py-5">
              {/* ---- mode ---- */}
              <fieldset>
                <legend className="mb-2 text-sm font-bold">Mode</legend>
                <div className="grid grid-cols-3 gap-2">
                  {MODES.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => save({ mode: id })}
                      aria-pressed={theme.mode === id}
                      className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-sm font-semibold transition-colors ${
                        theme.mode === id
                          ? 'border-brand-blue bg-p-blue text-brand-blue-dark'
                          : 'border-slate-200 text-body hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="size-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* ---- presets ---- */}
              <fieldset>
                <legend className="mb-2 text-sm font-bold">Preset Themes</legend>
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map((preset) => {
                    const on = theme.preset === preset.id && !theme.custom;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => choosePreset(preset)}
                        aria-pressed={on}
                        className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-sm transition-colors ${
                          on
                            ? 'border-brand-blue bg-p-blue font-semibold text-brand-blue-dark'
                            : 'border-slate-200 text-body hover:bg-slate-50'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="grid size-5 shrink-0 place-items-center rounded-full"
                          style={{ backgroundColor: preset.primary }}
                        >
                          {on && <Check className="size-3 text-white" strokeWidth={3} />}
                        </span>
                        <span className="truncate">{preset.name}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* ---- primary colour ---- */}
              <fieldset>
                <legend className="mb-2 text-sm font-bold">Primary Color</legend>
                <div className="flex items-center gap-3">
                  <label className="relative grid size-11 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-lg"
                    style={{ backgroundColor: theme.custom ? theme.primary : (activePreset?.primary ?? '#1B6DD6') }}
                  >
                    <input
                      type="color"
                      value={theme.custom ? theme.primary : (activePreset?.primary ?? '#1B6DD6')}
                      onChange={(event) =>
                        save({ primary: event.target.value.toUpperCase(), custom: true, preset: 'custom' })
                      }
                      className="absolute inset-0 cursor-pointer opacity-0"
                      aria-label="Pick a primary colour"
                    />
                  </label>
                  <input
                    type="text"
                    value={theme.custom ? theme.primary : (activePreset?.primary ?? '#1B6DD6')}
                    onChange={(event) => {
                      const value = event.target.value.trim();
                      if (/^#?[0-9a-fA-F]{6}$/.test(value)) {
                        save({ primary: value.startsWith('#') ? value.toUpperCase() : `#${value.toUpperCase()}`, custom: true, preset: 'custom' });
                      }
                    }}
                    className="h-11 w-full rounded-lg border border-slate-200 px-3 font-mono text-sm outline-none focus:border-brand-blue"
                    aria-label="Primary colour hex value"
                  />
                </div>
              </fieldset>

              {/* ---- font ---- */}
              <fieldset>
                <legend className="mb-2 text-sm font-bold">Font Style</legend>
                <select
                  value={theme.font}
                  onChange={(event) => save({ font: event.target.value })}
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand-blue"
                >
                  {FONTS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* ---- button style ---- */}
              <fieldset>
                <legend className="mb-2 text-sm font-bold">Button Style</legend>
                <div className="grid grid-cols-2 gap-2">
                  {['solid', 'outline'].map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => save({ buttonStyle: style })}
                      aria-pressed={theme.buttonStyle === style}
                      className={`rounded-lg border px-3 py-2.5 text-sm font-semibold capitalize transition-colors ${
                        theme.buttonStyle === style
                          ? 'border-brand-blue bg-p-blue text-brand-blue-dark'
                          : 'border-slate-200 text-body hover:bg-slate-50'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* ---- corner radius ---- */}
              <fieldset>
                <legend className="mb-2 text-sm font-bold">Corner Radius</legend>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={theme.radius}
                    onChange={(event) => save({ radius: clamp(event.target.value) })}
                    className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-blue"
                    aria-label="Corner radius"
                  />
                  <span className="w-16 shrink-0 rounded-lg border border-slate-200 px-2 py-1.5 text-center text-xs font-semibold">
                    {theme.radius} px
                  </span>
                </div>
              </fieldset>
            </div>

            {/* ---- footer ---- */}
            <div className="space-y-3 border-t border-slate-100 px-5 py-4">
              <p className="flex items-center justify-center gap-1.5 text-xs text-body/70">
                <span aria-hidden="true">⚡</span> Changes apply instantly
              </p>
              <button
                type="button"
                onClick={save}
                className="btn-primary w-full rounded-lg px-4 py-3 text-sm font-bold"
              >
                Save Theme
              </button>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    try {
                      window.localStorage.removeItem('susma:theme');
                    } catch {
                      /* nothing to clear */
                    }
                  }}
                  className="text-xs font-semibold text-brand-blue underline underline-offset-2"
                >
                  Reset
                </button>
                <span className="inline-flex items-center gap-1 text-xs text-body/60">
                  <Check className="size-3.5 text-open-green" strokeWidth={3} />
                  Saved on this device
                </span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

/** Shared with the range input so the slider and the stored value agree. */
function clamp(value) {
  return Math.min(24, Math.max(0, Number(value) || 0));
}