<script setup lang="ts">
// About page — Library of Code
</script>

<template>
  <div class="about-view snap-sections">
    <!-- ─── Hero ──────────────────────────────────────────────────── -->
    <header class="snap-section about-hero">
      <p class="about-eyebrow">est. 2026</p>
      <h1>Library<br /><em>of Code</em></h1>
      <p class="about-lead">
        A curated archive for developers who believe that well-written code is worth preserving,
        sharing, and celebrating.
      </p>
      <div class="hero-rule">
        <span class="rule-line" />
        <span class="rule-ornament">§</span>
        <span class="rule-line" />
      </div>
    </header>

    <!-- ─── Body ──────────────────────────────────────────────────── -->
    <main class="about-body">
      <section class="about-section snap-section">
        <div class="section-label">01 — Mission</div>
        <h2>Great code deserves an audience.</h2>
        <p>
          Library of Code is a platform for developers to share, discover, and collaborate on code
          snippets. We believe that elegant solutions shouldn't live buried in private repositories
          — they should be readable, searchable, and available to anyone who needs them.
        </p>
        <p>
          Sharing knowledge makes us all better developers. This is our small contribution to that
          idea.
        </p>
      </section>

      <div class="divider" />

      <section class="about-section snap-section">
        <div class="section-label">02 — Features</div>
        <h2>Everything you need, nothing you don't.</h2>
        <ul class="feature-list">
          <li>
            <span class="feature-marker">—</span>
            <span>Browse and search a vast collection of code snippets</span>
          </li>
          <li>
            <span class="feature-marker">—</span>
            <span>Save and organise your favourite snippets</span>
          </li>
          <li>
            <span class="feature-marker">—</span>
            <span>Share your own code with the community</span>
          </li>
          <li>
            <span class="feature-marker">—</span>
            <span>Syntax highlighting for dozens of languages</span>
          </li>
        </ul>
      </section>

      <div class="divider" />

      <section class="about-section snap-section">
        <div class="section-label">03 — Stack</div>
        <h2>Built on solid foundations.</h2>
        <p>We chose tools that stay out of your way and age well.</p>
        <div class="stack-grid">
          <div class="stack-item">
            <span class="stack-name">Vue 3</span>
            <span class="stack-desc">Composition API + TypeScript</span>
          </div>
          <div class="stack-item">
            <span class="stack-name">Vite</span>
            <span class="stack-desc">Fast dev & production builds</span>
          </div>
          <div class="stack-item">
            <span class="stack-name">Vue Router</span>
            <span class="stack-desc">Client-side navigation</span>
          </div>
          <div class="stack-item">
            <span class="stack-name">Highlight.js</span>
            <span class="stack-desc">Syntax highlighting</span>
          </div>
        </div>
      </section>

      <div class="divider" />

      <section class="about-section about-contact snap-section">
        <div class="section-label">04 — Contact</div>
        <h2>We'd love to hear from you.</h2>
        <p>
          Have a snippet to share, a bug to report, or just want to say hello? Reach out — every
          message is read.
        </p>
        <a href="mailto:mamanaoglenngenre@gmail.com" class="contact-link">
          mamanaoglenngenre@gmail.com
        </a>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* ─── Layout ───────────────────────────────────────────────────── */
.about-view {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-3xl) var(--gutter);
}

/* ─── Hero ─────────────────────────────────────────────────────── */
.about-hero {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.about-eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--space-md);
}

.about-hero h1 {
  font-family: var(--font-serif);
  font-size: clamp(3.5rem, 10vw, 6rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
  margin-bottom: var(--space-lg);
}

.about-hero h1 em {
  font-style: italic;
  color: var(--color-primary);
}

.about-lead {
  font-size: var(--text-lg);
  color: var(--color-text-faded);
  line-height: var(--leading-relaxed);
  max-width: 520px;
  margin: 0 auto var(--space-xl);
}

/* Typographic ornamental rule */
.hero-rule {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  justify-content: center;
}

.rule-line {
  flex: 1;
  max-width: 120px;
  height: 1px;
  background: var(--color-border-strong);
}

.rule-ornament {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  color: var(--color-primary);
  line-height: 1;
}

/* ─── Sections ─────────────────────────────────────────────────── */
.about-body {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.about-section {
  padding: var(--space-2xl) 0;
}

.section-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--space-md);
}

.about-section h2 {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: var(--tracking-tight);
  margin-bottom: var(--space-lg);
  line-height: var(--leading-snug);
}

.about-section p {
  font-size: var(--text-base);
  color: var(--color-text-faded);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-md);
  max-width: 60ch;
}

/* Section divider — a thin printed rule */
.divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-border-strong) 20%,
    var(--color-border-strong) 80%,
    transparent
  );
}

/* ─── Feature List ─────────────────────────────────────────────── */
.feature-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  list-style: none;
  padding: 0;
}

.feature-list li {
  display: flex;
  align-items: baseline;
  gap: var(--space-md);
  font-size: var(--text-base);
  color: var(--color-text-faded);
  line-height: var(--leading-normal);
}

.feature-marker {
  font-family: var(--font-mono);
  color: var(--color-primary);
  flex-shrink: 0;
  font-size: var(--text-sm);
}

/* ─── Stack Grid ───────────────────────────────────────────────── */
.stack-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--color-border);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-top: var(--space-lg);
}

.stack-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: var(--space-lg);
  background: var(--color-background-elevated);
  transition: background 0.2s ease;
}

.stack-item:hover {
  background: var(--color-background-alt);
}

.stack-name {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: var(--tracking-wide);
}

.stack-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-normal);
}

/* ─── Contact ──────────────────────────────────────────────────── */
.about-contact p {
  margin-bottom: var(--space-lg);
}

.contact-link {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wide);
  color: var(--color-primary);
  border-bottom: 1px solid var(--color-primary-muted);
  padding-bottom: 2px;
  transition:
    color var(--transition-base),
    border-color var(--transition-base);
  max-width: max-content;
}

.contact-link:hover {
  color: var(--color-primary-warm);
  border-color: var(--color-primary-warm);
}

/* ─── Responsive ───────────────────────────────────────────────── */
@media (max-width: 600px) {
  .stack-grid {
    grid-template-columns: 1fr;
  }

  .about-hero h1 {
    font-size: 3rem;
  }
}

/* ─── Scroll Snapping ──────────────────────────────────────────── */
.snap-sections {
  margin-top: calc(var(--space-3xl) * -1);
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
}

.snap-sections::-webkit-scrollbar {
  display: none;
}

.snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
