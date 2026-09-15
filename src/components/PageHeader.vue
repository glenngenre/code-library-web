<script setup lang="ts">
import { computed } from "vue";
export interface BreadcrumbItem {
  label: string;
  to?: string;
}
export interface MetaItem {
  label: string;
  value: string;
}
const props = withDefaults(
  defineProps<{
    title: string;
    breadcrumbs?: BreadcrumbItem[];
    meta?: MetaItem[];
    skeleton?: boolean;
  }>(),
  { breadcrumbs: () => [], meta: () => [], skeleton: false },
);

const hasBreadcrumbs = computed(() => props.breadcrumbs.length > 0);
const hasMeta = computed(() => props.meta.length > 0);
</script>
<template>
  <div class="page-header">
    <div class="title-group">
      <nav v-if="!skeleton && hasBreadcrumbs" class="breadcrumb">
        <template v-for="(item, index) in breadcrumbs" :key="index">
          <span :class="{ 'breadcrumb-current': index === breadcrumbs.length - 1 }">
            {{ item.label }}
          </span>
          <slot name="breadcrumb-separator">
            <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator">
              <slot name="breadcrumb-icon" />
            </span>
          </slot>
        </template>
      </nav>
      <div v-if="skeleton" class="skeleton skeleton--breadcrumb" />

      <div v-if="skeleton" class="skeleton skeleton--title" />
      <h1 v-else class="page-title">{{ title }}</h1>
    </div>
    <div v-if="!skeleton && hasMeta" class="meta-group">
      <div class="meta-items">
        <template v-for="(item, index) in meta" :key="index">
          <span class="meta-item">{{ item.label }} {{ item.value }}</span>
          <span v-if="index < meta.length - 1" class="dot"></span>
        </template>
      </div>
    </div>
    <div v-else-if="skeleton" class="meta-group">
      <div class="skeleton skeleton--meta" />
    </div>
  </div>
</template>
<style scoped>
/* ─── Page Header ──────────────────────────────────────────────── */
.page-header {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--space-sm);
}
@media (min-width: 768px) {
  .page-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}
.title-group {
  display: flex;
  flex-direction: column;
  width: 100%;
} /* ─── Breadcrumb ───────────────────────────────────────────────── */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
  margin-bottom: var(--space-xs);
}
.breadcrumb-separator {
  display: flex;
  align-items: center;
}
.breadcrumb-current {
  color: var(--color-primary);
} /* ─── Title ────────────────────────────────────────────────────── */
.page-title {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: var(--leading-tight);
  color: var(--color-text);
} /* ─── Meta ─────────────────────────────────────────────────────── */
.meta-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: var(--space-sm);
}
@media (min-width: 768px) {
  .meta-group {
    align-items: flex-end;
    margin-top: 0;
  }
}
.meta-items {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest);
  flex-wrap: wrap;
}
.meta-item {
  white-space: nowrap;
}
.dot {
  width: 4px;
  height: 4px;
  background-color: var(--color-border-strong);
  border-radius: var(--radius-full);
  flex-shrink: 0;
}
.skeleton--breadcrumb {
  width: 10rem;
  height: 0.65rem;
}
.skeleton--title {
  width: 60%;
  height: clamp(2.5rem, 5vw, 3.5rem);
  margin-top: var(--space-xs);
}
.skeleton--meta {
  width: 14rem;
  height: 0.65rem;
}
</style>
