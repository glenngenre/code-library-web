<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { AppButton, SnippetCard } from "@/components";
import { useSnippetList } from "@/composables/useSnippets";
import { useTotalViews, useTotalSnippets, useTotalLanguages } from "@/composables/useStats";

const router = useRouter();

const { snippets, loading, error } = useSnippetList();
const { totalViews } = useTotalViews();
const { totalSnippets } = useTotalSnippets();
const { totalLanguages } = useTotalLanguages();

const featured = computed(() => snippets.value.slice(0, 6));

const stats = computed(() => [
  { value: totalSnippets.value.toLocaleString(), label: "snippets archived" },
  { value: totalLanguages.value.toString(), label: "languages indexed" },
  { value: totalViews.value.toLocaleString(), label: "total views" },
]);

const visible = ref(false);
onMounted(() => requestAnimationFrame(() => (visible.value = true)));

const handleSnippetClick = (snippetId: string) => router.push(`/snippet/${snippetId}`);
const handleNewSnippet = () => router.push("/create");
const handleBrowseLibrary = () => router.push("/library");
const handleRetry = () => window.location.reload();
</script>

<template>
  <div class="home-view" :class="{ visible }">
    <!-- ─── Hero ────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner container">
        <div class="hero-text">
          <p class="eyebrow">est. 2026 — code archive</p>
          <h1>
            A library<br />
            <em>for every</em><br />
            snippet.
          </h1>
          <p class="hero-lead">
            Preserve, share, and discover elegant code. Paste in seconds. Link forever.
          </p>
          <div class="hero-actions">
            <AppButton variant="primary" size="md" @click="handleNewSnippet">
              new snippet
            </AppButton>
            <AppButton variant="outline" size="md" @click="handleBrowseLibrary">
              browse library
            </AppButton>
          </div>
        </div>

        <!-- ─── Decorative code card ── -->
        <div class="hero-card" aria-hidden="true">
          <div class="card-bar">
            <span class="dot" /><span class="dot" /><span class="dot" />
            <span class="card-lang">python</span>
          </div>
          <pre
            class="card-code"
          ><code><span class="hl-kw">def</span> <span class="hl-fn">fibonacci</span>(n: <span class="hl-ty">int</span>) -> <span class="hl-ty">int</span>:
    <span class="hl-cm"># Classic memoised recursion</span>
    cache: <span class="hl-ty">dict</span>[<span class="hl-ty">int</span>, <span class="hl-ty">int</span>] = {}

    <span class="hl-kw">def</span> <span class="hl-fn">_fib</span>(k: <span class="hl-ty">int</span>) -> <span class="hl-ty">int</span>:
        <span class="hl-kw">if</span> k &lt;= <span class="hl-num">1</span>:
            <span class="hl-kw">return</span> k
        <span class="hl-kw">if</span> k <span class="hl-kw">not in</span> cache:
            cache[k] = _fib(k - <span class="hl-num">1</span>) + _fib(k - <span class="hl-num">2</span>)
        <span class="hl-kw">return</span> cache[k]

    <span class="hl-kw">return</span> _fib(n)</code></pre>
          <div class="card-footer">
            <span class="card-meta">13 lines · 284 views</span>
            <span class="card-author">— a.turing</span>
          </div>
        </div>
      </div>

      <!-- Decorative horizontal rule -->
      <div class="hero-rule container">
        <span class="rule-line" />
        <span class="rule-ornament">❦</span>
        <span class="rule-line" />
      </div>
    </section>

    <!-- ─── Stats Band ───────────────────────────────────────────── -->
    <section class="stats-band">
      <div class="container stats-inner">
        <div v-for="(stat, i) in stats" :key="i" class="stat-item">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- ─── Featured Snippets ───────────────────────────────────── -->
    <section class="featured container">
      <header class="section-header">
        <div class="section-eyebrow">
          — curated picks

          <a href="/library" class="section-link">view all →</a>
        </div>
        <h2>Featured snippets</h2>
      </header>

      <!-- Loading state -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading snippets...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="error-state">
        <p class="error-message">{{ error }}</p>
        <AppButton variant="outline" size="sm" @click="handleRetry"> Try again </AppButton>
      </div>

      <!-- Empty state -->
      <div v-else-if="featured.length === 0" class="empty-state">
        <p>No snippets available yet.</p>
        <AppButton variant="primary" size="sm" @click="handleNewSnippet">
          Create the first snippet
        </AppButton>
      </div>

      <!-- Snippets grid -->
      <div v-else class="snippets-grid">
        <SnippetCard
          v-for="(snippet, i) in featured"
          :key="snippet.snippet_id"
          :snippet="snippet"
          :style="{ animationDelay: `${0.1 + i * 0.08}s` }"
          class="fade-in-card"
          @click="handleSnippetClick"
        />
      </div>
    </section>

    <!-- ─── CTA ─────────────────────────────────────────────────── -->
    <section class="cta container">
      <div class="cta-inner">
        <div class="cta-rule">
          <span class="rule-line" />
          <span class="rule-ornament small">§</span>
          <span class="rule-line" />
        </div>
        <p class="cta-eyebrow">ready to share?</p>
        <h2>Your code belongs<br /><em>in the archive.</em></h2>
        <p class="cta-lead">
          Paste your snippet, get a link, share it anywhere. No account required to start.
        </p>
        <div class="cta-actions">
          <AppButton variant="primary" size="lg" @click="handleNewSnippet">
            start pasting
          </AppButton>
          <AppButton variant="ghost" size="lg" @click="handleBrowseLibrary"> learn more </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ─── Entry animation ───────────────────────────────────────────── */
.home-view {
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 0.5s var(--ease),
    transform 0.5s var(--ease);
}
.home-view.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ─── Hero ──────────────────────────────────────────────────────── */
.hero {
  padding: var(--space-3xl) 0 0;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: center;
  padding-bottom: var(--space-3xl);
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--space-lg);
}

.hero h1 {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
  margin-bottom: var(--space-xl);
}

.hero h1 em {
  font-style: italic;
  color: var(--color-primary);
}

.hero-lead {
  font-size: var(--text-lg);
  color: var(--color-text-faded);
  line-height: var(--leading-relaxed);
  max-width: 38ch;
  margin-bottom: var(--space-xl);
}

.hero-actions {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

/* ─── Decorative code card ──────────────────────────────────────── */
.hero-card {
  background: var(--color-background-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  transform: rotate(1.2deg);
  transition: transform 0.4s var(--ease);
}

.hero-card:hover {
  transform: rotate(0deg) scale(1.01);
}

.card-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.6rem 0.75rem;
  background: var(--color-background-alt);
  border-bottom: 1px solid var(--color-border);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-border-strong);
  opacity: 0.5;
}

.card-lang {
  margin-left: auto;
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.card-code {
  padding: var(--space-lg) var(--space-lg);
  overflow: hidden;
  line-height: var(--leading-relaxed);
  color: var(--color-text-faded);
  font-size: 0.8rem;
  white-space: pre;
}

/* inline syntax colours for decorative block */
.hl-kw {
  color: var(--color-primary);
  font-weight: 700;
}
.hl-fn {
  color: var(--color-text);
  font-weight: 700;
}
.hl-ty {
  color: var(--color-primary-gold);
}
.hl-cm {
  color: var(--color-text-muted);
  font-style: italic;
}
.hl-num {
  color: var(--color-primary-warm);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem var(--space-lg);
  border-top: 1px solid var(--color-border);
  background: var(--color-background-alt);
}

.card-meta,
.card-author {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  letter-spacing: var(--tracking-wide);
}

/* ─── Ornamental rule ───────────────────────────────────────────── */
.hero-rule {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.rule-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-border-strong) 30%,
    var(--color-border-strong) 70%,
    transparent
  );
}

.rule-ornament {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  color: var(--color-primary);
  line-height: 1;
  opacity: 0.7;
}

.rule-ornament.small {
  font-size: var(--text-lg);
}

/* ─── Stats Band ────────────────────────────────────────────────── */
.stats-band {
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-alt);
  padding: var(--space-xl) 0;
  margin: 0;
}

.stats-inner {
  display: flex;
  justify-content: center;
  gap: 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-md) var(--space-2xl);
  border-right: 1px solid var(--color-border);
}

.stat-item:last-child {
  border-right: none;
}

.stat-value {
  font-family: var(--font-serif);
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1;
  letter-spacing: var(--tracking-tight);
}

.stat-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

/* ─── Featured Section ──────────────────────────────────────────── */
.featured {
  padding: var(--space-3xl) var(--gutter);
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);
  flex-wrap: wrap;
}

.section-eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-primary);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-header h2 {
  font-family: var(--font-serif);
  font-size: var(--text-3xl);
  font-weight: 700;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
  flex: 1;
}

.section-link {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  color: var(--color-primary);
  text-decoration: none;
  border-bottom: 1px solid var(--color-primary-muted);
  padding-bottom: 1px;
  transition:
    color var(--transition-base),
    border-color var(--transition-base);
}

.section-link:hover {
  color: var(--color-primary-warm);
  border-color: var(--color-primary-warm);
}

/* ─── Snippet Cards ─────────────────────────────────────────────── */
.snippets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-lg);
}

.fade-in-card {
  opacity: 0;
  animation: cardIn 0.4s var(--ease) forwards;
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ─── Loading, Error, Empty States ─────────────────────────────── */
.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  padding: var(--space-3xl) var(--space-lg);
  text-align: center;
  min-height: 300px;
}

.loading-state p,
.error-state p,
.empty-state p {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  letter-spacing: var(--tracking-wide);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  color: var(--color-primary-warm) !important;
  font-weight: 600;
}

/* ─── CTA Section ───────────────────────────────────────────────── */
.cta {
  padding: var(--space-3xl) var(--gutter);
}

.cta-inner {
  max-width: 560px;
  margin: 0 auto;
  text-align: center;
}

.cta-rule {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-2xl);
}

.cta-eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--space-md);
}

.cta h2 {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-lg);
}

.cta h2 em {
  font-style: italic;
  color: var(--color-primary);
}

.cta-lead {
  font-size: var(--text-base);
  color: var(--color-text-faded);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-xl);
  max-width: 42ch;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
}

/* ─── Responsive ────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }

  .hero-card {
    transform: rotate(0deg);
    max-width: 480px;
  }

  .snippets-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .stats-inner {
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
  }

  .stat-item {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding: var(--space-md) 0;
    width: 100%;
    text-align: center;
  }

  .stat-item:last-child {
    border-bottom: none;
  }

  .section-header {
    flex-direction: column;
    gap: var(--space-sm);
  }
}
</style>
