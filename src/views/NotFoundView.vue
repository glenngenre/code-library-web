<script lang="ts" setup>
import { randomInt } from "@/utils";

const words = [
  "lost",
  "forgotten",
  "hidden",
  "misplaced",
  "vanished",
  "erased",
  "concealed",
  "obscured",
  "unfound",
  "missing",
];

const titleSentences = [
  `Page Not Found`,
  `Lost in the Archives`,
  `Vanished from History`,
  `Hidden in the Mists of Time`,
];

const bodyTextSentences = [
  `The page you seek has been ${words[randomInt(0, words.length - 1)]} to time — misplaced in the archive, or perhaps it never existed at all.`,
  `It seems the page you're looking for has been ${words[randomInt(0, words.length - 1)]} to the sands of time — lost in the archives, or perhaps it was never meant to be found.`,
  `Alas, the page you seek has been ${words[randomInt(0, words.length - 1)]} to history — hidden in the annals of time, or perhaps it was never written at all.`,
  `The page you seek has been ${words[randomInt(0, words.length - 1)]} to the mists of time — obscured in the archives, or perhaps it was never meant to be discovered.`,
];

const bodyText = bodyTextSentences[randomInt(0, bodyTextSentences.length - 1)];

const latinPhrases = [
  "Quod non invenitur non est.",
  "Invenire non potest.",
  "Perditus in tempore.",
  "Abditus in archivis.",
  "Vanus in historia.",
];
</script>

<template>
  <div class="not-found">
    <div class="ambient" />
    <div class="scroll-wrap">
      <div class="parchment">
        <div class="parchment__border" />
        <div class="parchment__content">
          <p class="eyebrow">It would seem you've ventured off the map...</p>
          <div class="number-wrap">
            <span class="number">4</span>
            <span class="number number--seal">
              <svg class="seal" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text
                  x="50%"
                  y="50%"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  class="seal_text"
                >
                  ☩
                </text>
              </svg>
              0
            </span>
            <span class="number">4</span>
          </div>

          <h1 class="heading">
            {{ titleSentences[randomInt(0, titleSentences.length - 1)] }}
          </h1>

          <div class="divider">
            <span class="divider__line" />
            <span class="divider__ornament">✦</span>
            <span class="divider__line" />
          </div>

          <p class="body-text">{{ bodyText }}</p>

          <p class="body-text body-text--latin">
            <em>{{ latinPhrases[randomInt(0, latinPhrases.length - 1)] }}</em>
          </p>

          <div class="actions">
            <a href="/" class="btn btn--primary">Return Home</a>
            <button class="btn btn--ghost" onclick="history.back()">Go Back</button>
          </div>
        </div>

        <div class="flourish">
          <svg viewBox="0 0 270 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 12 Q30 4 60 12 Q90 20 120 12 Q150 4 180 12 Q210 20 240 12 Q270 4 300 12"
              stroke="currentColor"
              stroke-width="0.75"
              stroke-opacity="0.4"
            />
            <circle cx="60" cy="12" r="1.5" fill="currentColor" fill-opacity="0.25" />
            <circle cx="120" cy="12" r="2.5" fill="currentColor" fill-opacity="0.4" />
            <circle cx="180" cy="12" r="1.5" fill="currentColor" fill-opacity="0.25" />
            <circle cx="240" cy="12" r="1.5" fill="currentColor" fill-opacity="0.4" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: calc(100vh - var(--space-3xl, 4rem));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem var(--gutter, 1.5rem);
  position: relative;
  overflow: hidden;
}

.ambient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 60% 50% at 50% 50%,
    var(--color-primary-subtle, rgba(160, 24, 24, 0.07)) 0%,
    transparent 70%
  );
}

.scroll-wrap {
  position: relative;
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  filter: drop-shadow(0 24px 48px rgba(26, 20, 16, 0.18));
}

.parchment {
  background-color: var(--color-background-elevated, #fdfaf5);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  background-repeat: repeat;
  border-left: 2px solid var(--color-border, #c2b49e);
  border-right: 2px solid var(--color-border, #c2b49e);
  position: relative;
  overflow: hidden;
}

.parchment::before,
.parchment::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 32px;
  pointer-events: none;
  z-index: 1;
}
.parchment::before {
  left: 0;
  background: linear-gradient(to right, var(--color-surface-worn, #e2d9c6) 0%, transparent 100%);
  opacity: 0.5;
}
.parchment::after {
  right: 0;
  background: linear-gradient(to left, var(--color-surface-worn, #e2d9c6) 0%, transparent 100%);
  opacity: 0.5;
}

.parchment__border {
  position: absolute;
  inset: 16px;
  border: 1px solid var(--color-border, #c2b49e);
  pointer-events: none;
  z-index: 1;
}
.parchment__border::before {
  content: "";
  position: absolute;
  inset: 4px;
  border: 1px solid color-mix(in srgb, var(--color-border, #c2b49e) 60%, transparent);
}

.parchment__content {
  position: relative;
  z-index: 2;
  padding: 3.5rem 3rem 2.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.eyebrow {
  font-family: var(--font-mono, "DM Mono", monospace);
  font-size: var(--text-xs, 0.72rem);
  letter-spacing: var(--tracking-widest, 0.2em);
  text-transform: uppercase;
  color: var(--color-primary, #a01818);
  margin: 0 0 1.75rem;
}

.number-wrap {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1.25rem;
  line-height: 1;
}

.number {
  font-family: var(--font-serif, "Gilda Display", Georgia, serif);
  font-size: clamp(4rem, 14vw, 6.5rem);
  color: var(--color-primary, #a01818);
  opacity: 0.75;
  letter-spacing: -0.04em;
  font-weight: 700;
}

.number--seal {
  position: relative;
  display: flex;
  align-items: center;
}

.seal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: clamp(3.5rem, 10vw, 5.5rem);
  height: clamp(3.5rem, 10vw, 5.5rem);
  color: var(--color-primary, #a01818);
  opacity: 0.6;
}

.seal_text {
  font-family: var(--font-serif, "Gilda Display", Georgia, serif);
  font-size: 22px;
  fill: var(--color-primary, #a01818);
}

.heading {
  font-family: var(--font-serif, "Gilda Display", Georgia, serif);
  font-size: clamp(1.6rem, 5vw, 2.25rem);
  color: var(--color-text, #16110d);
  font-weight: 700;
  letter-spacing: var(--tracking-tight, -0.03em);
  line-height: var(--leading-tight, 1.2);
  margin: 0 0 1.5rem;
}

.divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 280px;
  margin-bottom: 1.5rem;
}

.divider__line {
  flex: 1;
  height: 1px;
  background: var(--color-border, #c2b49e);
}

.divider__ornament {
  font-size: 0.6rem;
  color: var(--color-primary-gold, #b8861e);
}

.body-text {
  font-family: var(--font-display, "Figtree", sans-serif);
  font-size: var(--text-base, 1rem);
  line-height: var(--leading-relaxed, 1.75);
  color: var(--color-text-faded, #3d3025);
  max-width: 38ch;
  margin: 0 0 0.75rem;
}

.body-text--latin {
  font-family: var(--font-serif, "Gilda Display", Georgia, serif);
  font-size: var(--text-sm, 0.82rem);
  color: var(--color-text-muted, #7a6a56);
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  font-family: var(--font-mono, "DM Mono", monospace);
  font-size: var(--text-sm, 0.82rem);
  text-transform: lowercase;
  letter-spacing: var(--tracking-wider, 0.12em);
  border-radius: var(--radius-sm, 0.125rem);
  cursor: pointer;
  font-weight: 400;
  padding: 0.6rem 1.4rem;
  transition:
    background-color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    border-color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.btn--primary {
  background-color: var(--color-text, #16110d);
  color: var(--color-background-elevated, #fdfaf5);
  border: 1px solid var(--color-text, #16110d);
}
.btn--primary:hover {
  background-color: var(--color-primary, #a01818);
  border-color: var(--color-primary, #a01818);
}

.btn--ghost {
  background-color: transparent;
  border: none;
  color: var(--color-text-muted, #7a6a56);
}
.btn--ghost:hover {
  background-color: var(--color-primary-subtle, rgba(160, 24, 24, 0.08));
  color: var(--color-primary, #a01818);
}

.flourish {
  padding: 0.5rem 2rem 1.5rem;
  color: var(--color-text, #16110d);
}
.flourish svg {
  width: 100%;
  max-width: 240px;
  display: block;
  margin: 0 auto;
}

@media (prefers-color-scheme: dark) {
  .scroll-wrap {
    filter: drop-shadow(0 24px 48px rgba(0, 0, 0, 0.5));
  }
}

@media (max-width: 480px) {
  .parchment__content {
    padding: 2.5rem 1.75rem 2rem;
  }
  .parchment__border {
    inset: 10px;
  }
}
</style>
