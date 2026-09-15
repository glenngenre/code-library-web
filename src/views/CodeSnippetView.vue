<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { PhCaretRight, PhCopy, PhCheck, PhDownload, PhShareNetwork } from "@phosphor-icons/vue";
import { AppButton, CodeBlock, PageHeader } from "@/components";
import { useSnippet } from "@/composables/useSnippets";
import { copyToClipboard, downloadAsFile, shareContent } from "@/utils";

const route = useRoute();
const copied = ref(false);
const snippetId = route.params.id as string;
const { snippet, loading, error } = useSnippet(snippetId);

const breadcrumbs = computed(() => {
  if (!snippet.value) return [];
  return [{ label: "Library" }, { label: snippet.value.title }];
});

const meta = computed(() => {
  if (!snippet.value) return [];
  return [
    { label: "ID", value: snippet.value.snippet_id },
    { label: "", value: snippet.value.language },
    { label: "Views", value: snippet.value.views.toString() },
  ];
});

const rawCode = computed(() => snippet.value?.code || "");

async function copySnippet() {
  try {
    await copyToClipboard(rawCode.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch (error) {
    console.error("Failed to copy:", error);
  }
}

function exportSnippet() {
  if (!snippet.value) return;
  downloadAsFile(rawCode.value, snippet.value.filename);
}

async function shareSnippet() {
  if (!snippet.value) return;
  try {
    const url = `${window.location.origin}/snippet/${snippet.value.snippet_id}`;
    await shareContent(snippet.value.title, url);
    if (!navigator.share) {
      copied.value = true;
      setTimeout(() => (copied.value = false), 2000);
    }
  } catch (error) {
    console.error("Failed to share:", error);
  }
}
</script>

<template>
  <div class="snippet-view">
    <main class="main-content">
      <div class="content-wrapper">
        <!-- Error -->
        <div v-if="error" class="state-message state-message--error">
          <p class="state-label">{{ error }}</p>
        </div>

        <template v-else>
          <!-- ─── Page Header ──────────────────────────────────── -->
          <PageHeader
            :title="loading ? '' : (snippet?.title ?? '')"
            :breadcrumbs="loading ? [] : breadcrumbs"
            :meta="loading ? [] : meta"
            :skeleton="loading"
          >
            <template #breadcrumb-icon>
              <PhCaretRight :size="12" />
            </template>
          </PageHeader>

          <!-- ─── Code Block ───────────────────────────────────── -->
          <div v-if="loading" class="skeleton skeleton--code" />
          <CodeBlock
            v-else
            :code="rawCode"
            :filename="snippet?.filename"
            :language="snippet?.language"
            :show-line-numbers="true"
          />

          <!-- ─── Description & Actions ────────────────────────── -->
          <div class="details-row">
            <div class="abstract">
              <span class="abstract-label">
                <span v-if="loading" class="skeleton skeleton--label" />
                <template v-else>Description</template>
              </span>
              <p class="abstract-text">
                <span v-if="loading" class="skeleton skeleton--text" />
                <template v-else>{{ snippet?.description }}</template>
              </p>
            </div>

            <div class="action-bar">
              <template v-if="loading">
                <span class="skeleton skeleton--btn" />
                <span class="skeleton skeleton--btn" />
                <span class="skeleton skeleton--btn" />
              </template>
              <template v-else>
                <AppButton variant="primary" :icon="copied ? PhCheck : PhCopy" @click="copySnippet">
                  {{ copied ? "Copied!" : "Copy Snippet" }}
                </AppButton>
                <AppButton variant="outline" :icon="PhDownload" @click="exportSnippet">
                  Export
                </AppButton>
                <AppButton variant="outline" :icon="PhShareNetwork" @click="shareSnippet">
                  Share
                </AppButton>
              </template>
            </div>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<style scoped>
.snippet-view {
  width: 100%;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-lg) var(--space-md);
}

@media (min-width: 640px) {
  .main-content {
    padding: var(--space-xl) var(--gutter);
  }
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.details-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
}

.skeleton--code {
  width: 100%;
  height: 320px;
  border-radius: 8px;
}
.skeleton--label {
  width: 6rem;
  height: 0.65rem;
}
.skeleton--text {
  width: 42ch;
  height: 1rem;
  margin-top: var(--space-xs);
}
.skeleton--btn {
  width: 7rem;
  height: 2.25rem;
  border-radius: 6px;
}
</style>
