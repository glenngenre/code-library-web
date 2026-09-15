import { EditorView } from "@codemirror/view";
import type { Extension } from "@codemirror/state";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

const parchmentTheme = EditorView.theme(
  {
    "&": {
      color: "#1a1410",
      backgroundColor: "#faf7f2",
      fontFamily: '"DM Mono", "Courier New", Courier, monospace',
      fontSize: "0.875rem",
    },

    // Cursor
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: "#8b1a1a",
      borderLeftWidth: "2px",
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#8b1a1a",
    },

    // Selection
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
      backgroundColor: "rgba(139, 26, 26, 0.12)",
    },
    ".cm-selectionMatch": {
      backgroundColor: "rgba(139, 26, 26, 0.08)",
    },
    "&.cm-focused .cm-matchingBracket": {
      backgroundColor: "rgba(196, 153, 42, 0.2)",
      outline: "1px solid rgba(196, 153, 42, 0.5)",
    },

    // Gutters
    ".cm-gutters": {
      backgroundColor: "#ede6d6",
      color: "#8a7a68",
      border: "none",
      borderRight: "1px solid #c8bca8",
    },
    ".cm-gutterElement": {
      padding: "0 0.75rem 0 0.5rem",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "rgba(139, 26, 26, 0.06)",
      color: "#4a3f32",
    },

    // Active line
    ".cm-activeLine": {
      backgroundColor: "rgba(139, 26, 26, 0.04)",
    },

    // Search match
    ".cm-searchMatch": {
      backgroundColor: "rgba(196, 153, 42, 0.25)",
      outline: "1px solid rgba(196, 153, 42, 0.6)",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "rgba(139, 26, 26, 0.2)",
    },

    // Fold gutter
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#8a7a68",
    },

    // Tooltip / autocomplete
    ".cm-tooltip": {
      border: "1px solid #c8bca8",
      backgroundColor: "#faf7f2",
      boxShadow: "0 4px 6px -1px rgba(26, 20, 16, 0.1)",
      borderRadius: "0.125rem",
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: "rgba(139, 26, 26, 0.08)",
        color: "#1a1410",
      },
    },

    // Panels (search bar etc.)
    ".cm-panels": {
      backgroundColor: "#ede6d6",
      color: "#1a1410",
      borderTop: "1px solid #c8bca8",
    },
    ".cm-panel.cm-search input, .cm-panel.cm-search button, .cm-panel.cm-search label": {
      fontFamily: '"DM Mono", "Courier New", Courier, monospace',
      fontSize: "0.75rem",
    },

    // Scroller padding
    ".cm-content": {
      caretColor: "#8b1a1a",
      padding: "0.5rem 0",
    },
    ".cm-line": {
      padding: "0 0.75rem",
    },
  },
  { dark: false },
);

// ─── Dark: Dark Parchment ─────────────────────────────────────────
const parchmentDarkTheme = EditorView.theme(
  {
    "&": {
      color: "#e8e0d0",
      backgroundColor: "#1f1c18",
      fontFamily: '"DM Mono", "Courier New", Courier, monospace',
      fontSize: "0.875rem",
    },

    // Cursor
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: "#c0392b",
      borderLeftWidth: "2px",
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#c0392b",
    },

    // Selection
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
      backgroundColor: "rgba(192, 57, 43, 0.2)",
    },
    ".cm-selectionMatch": {
      backgroundColor: "rgba(192, 57, 43, 0.12)",
    },
    "&.cm-focused .cm-matchingBracket": {
      backgroundColor: "rgba(212, 168, 67, 0.2)",
      outline: "1px solid rgba(212, 168, 67, 0.4)",
    },

    // Gutters
    ".cm-gutters": {
      backgroundColor: "#1c1915",
      color: "#6a5e50",
      border: "none",
      borderRight: "1px solid #2e2820",
    },
    ".cm-gutterElement": {
      padding: "0 0.75rem 0 0.5rem",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "rgba(192, 57, 43, 0.08)",
      color: "#b0a090",
    },

    // Active line
    ".cm-activeLine": {
      backgroundColor: "rgba(192, 57, 43, 0.05)",
    },

    // Search match
    ".cm-searchMatch": {
      backgroundColor: "rgba(212, 168, 67, 0.2)",
      outline: "1px solid rgba(212, 168, 67, 0.5)",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "rgba(192, 57, 43, 0.25)",
    },

    // Fold gutter
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#6a5e50",
    },

    // Tooltip / autocomplete
    ".cm-tooltip": {
      border: "1px solid #2e2820",
      backgroundColor: "#1f1c18",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.4)",
      borderRadius: "0.125rem",
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: "rgba(192, 57, 43, 0.15)",
        color: "#e8e0d0",
      },
    },

    // Panels
    ".cm-panels": {
      backgroundColor: "#1c1915",
      color: "#e8e0d0",
      borderTop: "1px solid #2e2820",
    },
    ".cm-panel.cm-search input, .cm-panel.cm-search button, .cm-panel.cm-search label": {
      fontFamily: '"DM Mono", "Courier New", Courier, monospace',
      fontSize: "0.75rem",
    },

    // Scroller padding
    ".cm-content": {
      caretColor: "#c0392b",
      padding: "0.5rem 0",
    },
    ".cm-line": {
      padding: "0 0.75rem",
    },
  },
  { dark: true },
);

// ─── Syntax Highlighting: Light ───────────────────────────────────
const parchmentHighlight = HighlightStyle.define([
  // Comments — muted ink
  { tag: [t.comment, t.lineComment, t.blockComment], color: "#8a7a68", fontStyle: "italic" },
  // Doc comments
  { tag: t.docComment, color: "#8a7a68", fontStyle: "italic" },

  // Keywords & control flow — primary burgundy
  { tag: [t.keyword, t.controlKeyword, t.moduleKeyword], color: "#8b1a1a", fontWeight: "700" },
  { tag: [t.operatorKeyword], color: "#8b1a1a" },

  // Operators & punctuation — faded text
  { tag: [t.operator, t.punctuation, t.separator], color: "#4a3f32" },
  { tag: t.bracket, color: "#4a3f32" },

  // Literals — warm red-orange
  { tag: [t.string, t.special(t.string)], color: "#b54a2a" },
  { tag: [t.number, t.integer, t.float], color: "#b54a2a" },
  { tag: t.regexp, color: "#b54a2a" },
  { tag: t.escape, color: "#c4992a" },

  // Boolean & null — gold
  { tag: [t.bool, t.null], color: "#c4992a", fontWeight: "700" },

  // Types — gold
  { tag: [t.typeName, t.typeOperator, t.className], color: "#c4992a" },
  { tag: t.self, color: "#c4992a", fontStyle: "italic" },

  // Functions & definitions — strong dark ink
  {
    tag: [t.function(t.variableName), t.function(t.propertyName)],
    color: "#1a1410",
    fontWeight: "700",
  },
  { tag: t.definition(t.variableName), color: "#1a1410", fontWeight: "600" },
  { tag: t.definition(t.propertyName), color: "#1a1410" },

  // Variables & properties
  { tag: [t.variableName], color: "#4a3f32" },
  { tag: [t.propertyName], color: "#4a3f32" },

  // Tag names (HTML/JSX) — burgundy
  { tag: t.tagName, color: "#8b1a1a", fontWeight: "700" },
  { tag: t.attributeName, color: "#c4992a" },
  { tag: t.attributeValue, color: "#b54a2a" },

  // Imports & namespace
  { tag: [t.namespace, t.moduleKeyword], color: "#8b1a1a" },

  // Meta & decorators — muted
  { tag: [t.meta, t.annotation, t.processingInstruction], color: "#8a7a68" },

  // Special
  { tag: t.invalid, color: "#8b1a1a", textDecoration: "underline wavy" },
  { tag: t.strong, fontWeight: "700" },
  { tag: t.emphasis, fontStyle: "italic" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.link, color: "#8b1a1a", textDecoration: "underline" },
  { tag: t.heading, fontWeight: "700", color: "#1a1410" },
]);

// ─── Syntax Highlighting: Dark ────────────────────────────────────
const parchmentDarkHighlight = HighlightStyle.define([
  // Comments — ghost ink
  { tag: [t.comment, t.lineComment, t.blockComment], color: "#6a5e50", fontStyle: "italic" },
  { tag: t.docComment, color: "#6a5e50", fontStyle: "italic" },

  // Keywords — bright burgundy
  { tag: [t.keyword, t.controlKeyword, t.moduleKeyword], color: "#c0392b", fontWeight: "700" },
  { tag: [t.operatorKeyword], color: "#c0392b" },

  // Operators & punctuation
  { tag: [t.operator, t.punctuation, t.separator], color: "#b0a090" },
  { tag: t.bracket, color: "#b0a090" },

  // Literals — warm orange-red
  { tag: [t.string, t.special(t.string)], color: "#e05a2b" },
  { tag: [t.number, t.integer, t.float], color: "#e05a2b" },
  { tag: t.regexp, color: "#e05a2b" },
  { tag: t.escape, color: "#d4a843" },

  // Boolean & null — bright gold
  { tag: [t.bool, t.null], color: "#d4a843", fontWeight: "700" },

  // Types — gold
  { tag: [t.typeName, t.typeOperator, t.className], color: "#d4a843" },
  { tag: t.self, color: "#d4a843", fontStyle: "italic" },

  // Functions & definitions — light ink
  {
    tag: [t.function(t.variableName), t.function(t.propertyName)],
    color: "#e8e0d0",
    fontWeight: "700",
  },
  { tag: t.definition(t.variableName), color: "#e8e0d0", fontWeight: "600" },
  { tag: t.definition(t.propertyName), color: "#e8e0d0" },

  // Variables & properties
  { tag: [t.variableName], color: "#b0a090" },
  { tag: [t.propertyName], color: "#b0a090" },

  // Tags — bright burgundy
  { tag: t.tagName, color: "#c0392b", fontWeight: "700" },
  { tag: t.attributeName, color: "#d4a843" },
  { tag: t.attributeValue, color: "#e05a2b" },

  // Imports & namespace
  { tag: [t.namespace, t.moduleKeyword], color: "#c0392b" },

  // Meta & decorators
  { tag: [t.meta, t.annotation, t.processingInstruction], color: "#6a5e50" },

  // Special
  { tag: t.invalid, color: "#c0392b", textDecoration: "underline wavy" },
  { tag: t.strong, fontWeight: "700" },
  { tag: t.emphasis, fontStyle: "italic" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.link, color: "#c0392b", textDecoration: "underline" },
  { tag: t.heading, fontWeight: "700", color: "#e8e0d0" },
]);

// ─── Exports ──────────────────────────────────────────────────────

/** Light parchment theme — use in place of a CodeMirror theme extension */
export const parchment: Extension = [parchmentTheme, syntaxHighlighting(parchmentHighlight)];

/** Dark parchment theme — use in place of a CodeMirror theme extension */
export const parchmentDark: Extension = [
  parchmentDarkTheme,
  syntaxHighlighting(parchmentDarkHighlight),
];
