<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import { PhPencilSimpleLine } from "@phosphor-icons/vue";
import { AppButton } from "@/components";

const isNarrow = ref(false);

let observer: ResizeObserver | null = null;

onMounted(() => {
  observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      isNarrow.value = entry.contentRect.width < 500;
    }
  });
  observer.observe(document.body);
  isNarrow.value = document.body.clientWidth < 500;
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <nav class="app-nav">
    <RouterLink to="/" class="brand">
      <template v-if="!isNarrow">
        <span class="brand-main">Library</span>
        <em class="brand-sub">of Code</em>
      </template>
      <template v-else>
        <img src="/logo.svg" alt="Library of Code" class="brand-logo" />
      </template>
    </RouterLink>
    <div class="nav-rule" aria-hidden="true" />
    <ul class="nav-links">
      <li>
        <RouterLink to="/" active-class="active">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/library" active-class="active">Library</RouterLink>
      </li>
      <li>
        <RouterLink to="/about" active-class="active">About</RouterLink>
      </li>
    </ul>
    <AppButton
      variant="primary"
      size="sm"
      :icon="PhPencilSimpleLine"
      @click="$router.push('/create')"
    >
      New Snippet
    </AppButton>
  </nav>
</template>
<style scoped>
.app-nav {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
  padding: 0 var(--gutter);
  height: var(--space-3xl);
  background: var(--color-background-alt);
  border-bottom: 1px solid var(--color-border-strong);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
  transition:
    opacity 0.15s ease,
    visibility 0.15s ease;
}
:global(body.folio-header-active) .app-nav {
  opacity: 0;
  visibility: hidden;
}
.brand {
  display: flex;
  align-items: baseline;
  gap: 0.35em;
  text-decoration: none;
  flex-shrink: 0;
}
.brand-logo {
  width: 32px;
  height: 32px;
}
.brand-main {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: var(--tracking-tight);
  line-height: 1;
}
.brand-abbr {
  color: var(--color-primary);
  letter-spacing: var(--tracking-wider);
}
.brand-sub {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-style: italic;
  font-weight: 400;
  color: var(--color-primary);
  line-height: 1;
}
.nav-rule {
  width: 1px;
  height: 18px;
  background: var(--color-border-strong);
  flex-shrink: 0;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
}
.nav-links a {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 400;
  color: var(--color-text-muted);
  text-decoration: none;
  text-transform: lowercase;
  letter-spacing: var(--tracking-wider);
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-sm);
  transition:
    color var(--transition-base),
    background-color var(--transition-base);
  position: relative;
}
.nav-links a:hover {
  color: var(--color-text);
  background: var(--color-primary-subtle);
}
.nav-links a.active {
  color: var(--color-primary);
}
.nav-links a.active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0.75rem;
  right: 0.75rem;
  height: 2px;
  background: var(--color-primary);
}
@media (max-width: 615px) {
  .app-nav {
    gap: var(--space-md);
    padding: 0 var(--space-md);
  }
  .brand-main,
  .brand-sub {
    font-size: var(--text-base);
  }
  .nav-links a {
    padding: 0.35rem 0.5rem;
  }
  .app-nav :deep(.app-button .button-text) {
    display: none;
  }
}
@media (max-width: 400px) {
  .app-nav {
    gap: var(--space-sm);
  }
}
</style>
