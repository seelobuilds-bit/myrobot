export type Theme = "light" | "dark";

/**
 * The concept is built in one theme per deployment, so light and dark each
 * get their own preview URL: the `concept-dark` branch builds dark, every
 * other branch builds light. Set CONCEPT_THEME=dark to preview dark locally.
 */
export const THEME: Theme =
  (process.env.CONCEPT_THEME ?? (process.env.VERCEL_GIT_COMMIT_REF === "concept-dark" ? "dark" : "light")) === "dark"
    ? "dark"
    : "light";
