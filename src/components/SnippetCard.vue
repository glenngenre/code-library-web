<script setup lang="ts">
import { PhFile, PhEye } from "@phosphor-icons/vue";

interface Snippet {
  snippet_id: string;
  title: string;
  language: string;
  description?: string;
  code: string;
  filename: string;
  views: number;
}

defineProps<{
  snippet: Snippet;
}>();

const emit = defineEmits<{
  click: [snippetId: string];
}>();
</script>

<template>
  <article class="snippet-card" @click="emit('click', snippet.snippet_id)">
    <div class="card-header">
      <h3 class="snippet-title">{{ snippet.title }}</h3>
      <span class="language-badge">{{ snippet.language }}</span>
    </div>

    <p v-if="snippet.description" class="snippet-description">
      {{ snippet.description }}
    </p>

    <div class="snippet-code-preview">
      <code>{{ snippet.code.slice(0, 200) }}{{ snippet.code.length > 200 ? "..." : "" }}</code>
    </div>

    <div class="card-footer">
      <span class="snippet-filename">
        <PhFile :size="14" weight="bold" />
        {{ snippet.filename }}
      </span>
      <span class="snippet-views">
        <PhEye :size="14" weight="bold" />
        {{ snippet.views }} views
      </span>
    </div>
  </article>
</template>

<style scoped>
.snippet-card {
  display: flex;
  flex-direction: column;

  height: max(100%, 320px);
  padding: var(--space-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-background-elevated);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.snippet-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: var(--color-primary-muted);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.snippet-card:hover {
  border-color: var(--color-primary-muted);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.snippet-card:hover::before {
  opacity: 1;
}

/* ─── Header ───────────────────────────────────────────────────── */
.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.snippet-title {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  flex: 1;
  line-height: 1.3;
  letter-spacing: var(--tracking-tight);
}

.language-badge {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  background: var(--color-primary-subtle);
  color: var(--color-primary);
  border: 1px solid var(--color-primary-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ─── Description ──────────────────────────────────────────────── */
.snippet-description {
  font-size: var(--text-sm);
  color: var(--color-text-faded);
  margin-bottom: var(--space-md);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ─── Code Preview ─────────────────────────────────────────────── */
.snippet-code-preview {
  flex: 1; /* expands to fill available space, pushing footer down */
  padding: var(--space-md);
  border-radius: var(--radius-sm);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  margin-bottom: var(--space-md);
  overflow: hidden;
  position: relative;
  min-height: 120px;
}

.snippet-code-preview::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 60%, var(--color-background) 100%);
  pointer-events: none;
}

.snippet-code-preview code {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-faded);
  line-height: 1.6;
  display: block;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: var(--tracking-normal);
}

/* ─── Footer ───────────────────────────────────────────────────── */
.card-footer {
  /* mt-auto is handled by .snippet-code-preview flex:1 above,
     but this ensures footer never floats up on very short content */
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--color-border);
  letter-spacing: var(--tracking-wide);
}

.snippet-filename,
.snippet-views {
  display: flex;
  align-items: center;
  gap: 4px;
}

.snippet-filename {
  color: var(--color-text-faded);
  font-weight: 500;
}

.snippet-views {
  color: var(--color-text-muted);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .snippet-card {
    padding: var(--space-md);
  }

  .snippet-title {
    font-size: var(--text-lg);
  }

  .snippet-code-preview {
    min-height: 100px;
    padding: var(--space-sm);
  }

  .snippet-code-preview code {
    font-size: 0.7rem;
  }
}
</style>
