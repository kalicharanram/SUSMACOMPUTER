import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Visitor-settable theme: colour mode, accent colour, typeface, button style and
 * corner radius.
 *
 * Everything is written onto <html> rather than threaded through props, because
 * the choices affect the whole document at once: `--color-brand-blue` re-tints
 * every accent, `--radius` drives the whole rounded-corner scale, and the `.dark`
 * class flips Tailwind's dark: variants. Passing those down as props would mean
 * re-rendering every component on each drag of the radius slider.
 *
 * The setting is kept in this browser only (localStorage). That is a deliberate
 * limit: a shared "site-wide" theme would need the owner to be able to publish it
 * from somewhere, and this site has no backend for that. Each visitor gets to
 * make it theirs, which is what the panel promises.
 */

const STORAGE_KEY = 'susma:theme';

/* ------------------------------------------------------------- PRESETS ---- */
/**
 * The eight swatches in the panel. `primary`/`primaryDark` are written straight
 * over the brand-blue tokens, so a preset re-tints buttons, links, the active nav
 * item and the underline rules in one move, without touching any component.
 *
 * `dark` marks the presets that read as a dark theme on their own: Dark Pro is
 * that idea, and picking it flips the mode to dark as well so the accent does not
 * end up lost against a light page.
 */
export const PRESETS = [
  { id: 'blue', name: 'Professional Blue', primary: '#1B6DD6', primaryDark: '#1558AE' },
  { id: 'purple', name: 'Modern Purple', primary: '#7C3AED', primaryDark: '#6D28D9' },
  { id: 'green', name: 'Fresh Green', primary: '#16A34A', primaryDark: '#15803D' },
  { id: 'orange', name: 'Premium Orange', primary: '#EA580C', primaryDark: '#C2410C' },
  { id: 'slate', name: 'Dark Pro', primary: '#64748B', primaryDark: '#475569', dark: true },
  { id: 'sky', name: 'Glass Blue', primary: '#0EA5E9', primaryDark: '#0284C7' },
  { id: 'red', name: 'Bold Red', primary: '#DC2626', primaryDark: '#B91C1C' },
];

export const FONTS = [
  { id: 'poppins', name: 'Poppins', stack: "'Poppins', 'Noto Sans Devanagari', ui-sans-serif, system-ui, sans-serif" },
  { id: 'inter', name: 'Inter', stack: "'Inter', 'Noto Sans Devanagari', ui-sans-serif, system-ui, sans-serif" },
  { id: 'roboto', name: 'Roboto', stack: "'Roboto', 'Noto Sans Devanagari', ui-sans-serif, system-ui, sans-serif" },
  {
    id: 'system',
    name: 'System',
    stack: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans Devanagari', sans-serif",
  },
];

const DEFAULTS = {
  mode: 'system',
  preset: 'blue',
  primary: '#1B6DD6',
  custom: false, // true once the visitor picks a colour by hand
  font: 'poppins',
  buttonStyle: 'solid',
  radius: 12,
};

const ThemeContext = createContext(null);

/* ---------------------------------------------------------------- utils -- */
/** Clamp the radius to a range that stays legible on buttons. */
const clampRadius = (n) => Math.min(24, Math.max(0, Number(n) || 0));

/**
 * Darken a hex colour by `amount` (0-1) and darken the accent's hover shade the
 * same way, so a hand-picked colour still gets a usable hover state instead of
 * leaving every button flat.
 */
function darken(hex, amount) {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return hex;
  const parts = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) =>
    Math.max(0, Math.min(255, Math.round(v * (1 - amount))))
  );
  return '#' + parts.map((v) => v.toString(16).padStart(2, '0')).join('');
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(DEFAULTS);
  // Tracks what the OS asks for, so "System" stays live rather than being frozen
  // at whatever it happened to be when the page loaded.
  const [systemDark, setSystemDark] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Restore the saved theme after the first paint, same reasoning as the language
  // choice: reading storage during render would desync the markup from hydration.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      // Merge over the defaults so a settings file written by an older version
      // cannot leave a required key undefined.
      setTheme((current) => ({ ...current, ...parsed, radius: clampRadius(parsed.radius ?? current.radius) }));
    } catch {
      /* unreadable or corrupt settings — fall back to the defaults */
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => setSystemDark(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const dark = theme.mode === 'dark' || (theme.mode === 'system' && systemDark);

  // Apply to <html>. Kept in one effect so the document is never half-painted with
  // a new colour and an old radius.
  useEffect(() => {
    const root = document.documentElement;
    const preset = PRESETS.find((p) => p.id === theme.preset);
    const primary = theme.custom ? theme.primary : (preset?.primary ?? DEFAULTS.primary);
    const primaryDark = theme.custom
      ? darken(primary, 0.18)
      : (preset?.primaryDark ?? DEFAULTS.primary);

    root.classList.toggle('dark', dark);
    root.dataset.btnStyle = theme.buttonStyle;
    root.style.setProperty('--color-brand-blue', primary);
    root.style.setProperty('--color-brand-blue-dark', primaryDark);
    root.style.setProperty('--radius', `${clampRadius(theme.radius) / 16}rem`);
    root.style.setProperty(
      '--font-sans',
      (FONTS.find((f) => f.id === theme.font) ?? FONTS[0]).stack
    );

    // Keeps the mobile browser chrome in step with the page, which is the one
    // place the accent is still visible after the panel is closed.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0b1220' : '#0A1B4E');
  }, [theme, dark]);

  const save = useCallback((patch) => {
    setTheme((current) => {
      const next = { ...current, ...patch };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* private mode: the theme still applies, it just will not survive a reload */
      }
      return next;
    });
  }, []);

  /** Picking a preset also switches mode for the presets that are dark by nature. */
  const choosePreset = useCallback(
    (preset) => {
      const patch = { preset: preset.id, primary: preset.primary, custom: false };
      if (preset.dark) patch.mode = 'dark';
      save(patch);
    },
    [save]
  );

  const value = useMemo(
    () => ({ theme, dark, save, choosePreset, reset: () => save(DEFAULTS) }),
    [theme, dark, save, choosePreset]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}