// Shared by the root layout (server) and the theme toggle (client).

export type Theme = "light" | "dark";

export const THEME_KEY = "nolar-theme";

/**
 * Runs in <head> before first paint so the page never flashes the wrong theme.
 * Order: ?theme=dark|light in the URL (handy for sharing), then the visitor's
 * saved choice, then their system setting.
 */
export const THEME_SCRIPT = `(function(){try{var d=document.documentElement,k=${JSON.stringify(THEME_KEY)},s=null;try{s=localStorage.getItem(k)}catch(e){}var q=new URLSearchParams(location.search).get("theme");if(q==="dark"||q==="light"){s=q;try{localStorage.setItem(k,q)}catch(e){}}d.dataset.theme=s==="dark"||s==="light"?s:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch(e){}})();`;
