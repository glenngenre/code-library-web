<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { PhCopy, PhCheck, PhDownload } from "@phosphor-icons/vue";
import CodeBlock from "@/components/CodeBlock.vue";
import { copyToClipboard, downloadAsFile, snippetAPI } from "@/utils";

const route = useRoute();

const copied = ref(false);
const code = ref("");
const title = ref("");
const language = ref("");
const filename = ref("");
const category = ref("");
const loading = ref(true);
const isScrolled = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 0;
}

async function copyCode() {
  try {
    await copyToClipboard(code.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch (error) {
    console.error("Failed to copy:", error);
  }
}

function downloadCode() {
  downloadAsFile(code.value, filename.value || "code.txt");
}

onMounted(async () => {
  const snippetId = route.params.id as string;

  if (snippetId) {
    try {
      const data = await snippetAPI.getById(snippetId);

      if (data.success) {
        const snippet = data.data;
        code.value = snippet.code;
        title.value = snippet.title;
        language.value = snippet.language;
        filename.value = snippet.filename;
        category.value = snippet.category || "";
      }
    } catch (error) {
      console.error("Failed to fetch snippet:", error);
    } finally {
      loading.value = false;
    }
  } else {
    const state = history.state as {
      code?: string;
      title?: string;
      language?: string;
      filename?: string;
      category?: string;
    };

    code.value =
      state?.code ||
      `# A standard implementation of the Quicksort algorithm
def quicksort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]
    left   = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right  = [x for x in arr if x > pivot]

    return quicksort(left) + middle + quicksort(right)

print(quicksort([3, 6, 8, 10, 1, 2, 1]))`;

    title.value = state?.title || "Quicksort";
    language.value = state?.language || "python";
    filename.value = state?.filename || "quicksort.py";
    category.value = state?.category || "Sorting";
    loading.value = false;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="folio-view">
    <!-- Loading -->
    <div v-if="loading" class="loading-overlay">
      <p class="loading-label">Loading snippet...</p>
    </div>

    <!-- Meta strip -->
    <div v-else class="meta-strip" :class="{ 'meta-strip--scrolled': isScrolled }">
      <div class="meta-left">
        <nav class="meta-breadcrumb" aria-label="breadcrumb">
          <span class="breadcrumb-home">Library</span>
          <span class="breadcrumb-sep">></span>
          <span class="breadcrumb-current">{{ title }}</span>
        </nav>

        <div class="meta-sub">
          <span v-if="category" class="meta-pill">{{ category }}</span>
          <span class="meta-sep">.</span>
          <span class="meta-lang">{{ language }}</span>
          <span class="meta-sep">.</span>
          <span class="meta-file">{{ filename }}</span>
        </div>
      </div>

      <div class="meta-actions">
        <button
          class="btn-action"
          :class="{ 'btn-action--success': copied }"
          @click="copyCode"
          :aria-label="copied ? 'Copied' : 'Copy source'"
        >
          <PhCheck v-if="copied" :size="14" weight="bold" />
          <PhCopy v-else :size="14" weight="bold" />
          <span>{{ copied ? "Copied" : "Copy" }}</span>
        </button>

        <button class="btn-action" @click="downloadCode" :aria-label="`Download ${filename}`">
          <PhDownload :size="14" weight="bold" />
          <span>Download</span>
        </button>
      </div>
    </div>

    <CodeBlock
      :code="code"
      :language="language"
      :filename="filename"
      :title="title"
      :category="category"
      variant="immersive"
      :expandable="false"
      :show-line-numbers="true"
    />
  </div>
</template>

<style scoped>
.folio-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-background);
}

.meta-strip {
  position: sticky;
  top: 0;
  z-index: 200;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);

  padding: var(--space-md) var(--gutter);
  border-bottom: 1px solid var(--color-border-strong);
  background: var(--color-background-alt);

  transition: box-shadow 0.2s ease;
}

.meta-strip--scrolled {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.meta-left {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  flex: 1;
  min-width: 0;
}

.meta-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.breadcrumb-home {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
}

.breadcrumb-sep {
  font-size: var(--text-xs);
  color: var(--color-border-strong);
}

.breadcrumb-current {
  font-family: var(--font-serif);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: var(--tracking-tight);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta-sub {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  flex-wrap: wrap;
}

.meta-pill {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest);
  color: var(--color-primary);
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-muted);
  border-radius: var(--radius-sm);
  padding: 1px 6px;
}

.meta-sep {
  color: var(--color-border-strong);
  font-size: var(--text-xs);
}

.meta-lang,
.meta-file {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.meta-actions {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.btn-action {
  display: flex;
  align-items: center;
  gap: 0.35rem;

  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);

  color: var(--color-text-muted);
  padding: var(--space-xs) var(--space-sm);

  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-background-elevated);

  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-action:hover {
  color: var(--color-primary);
  background: var(--color-primary-subtle);
  border-color: var(--color-primary-muted);
}

.btn-action--success {
  color: var(--color-primary);
  background: var(--color-primary-subtle);
  border-color: var(--color-primary-muted);
}

.loading-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.loading-label {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-style: italic;
  color: var(--color-text-muted);
}
</style>
