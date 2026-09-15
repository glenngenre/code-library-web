<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { PhCode, PhFloppyDisk, PhX } from "@phosphor-icons/vue";
import { AppButton, CodeEditor } from "@/components";
import { type Snippet, RateLimitError } from "@/utils/types";
import { snippetAPI } from "@/utils/api";
import { getDateFromSeconds, getRemainingTime } from "@/utils/time";

const router = useRouter();

// ─── Form state ─────────────────────────────────────────────────
const title = ref("");
const description = ref("");
const language = ref("");
const filename = ref("");
const code = ref("");
const submitting = ref(false);
const error = ref<string | null>(null);

// ─── Language options ────────────────────────────────────────────
const languages = [
  "bash",
  "c",
  "cpp",
  "css",
  "go",
  "html",
  "java",
  "javascript",
  "kotlin",
  "lua",
  "php",
  "python",
  "ruby",
  "rust",
  "scala",
  "sql",
  "swift",
  "typescript",
  "yaml",
];

// ─── Auto-suggest filename extension ────────────────────────────
const extensionMap: Record<string, string> = {
  bash: "sh",
  c: "c",
  cpp: "cpp",
  css: "css",
  go: "go",
  html: "html",
  java: "java",
  javascript: "js",
  kotlin: "kt",
  lua: "lua",
  php: "php",
  python: "py",
  ruby: "rb",
  rust: "rs",
  scala: "scala",
  sql: "sql",
  swift: "swift",
  typescript: "ts",
  yaml: "yml",
};

function onLanguageChange() {
  if (!filename.value && language.value) {
    const ext = extensionMap[language.value] ?? language.value;
    const slug = title.value
      ? title.value
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-z0-9_]/g, "")
      : "snippet";
    filename.value = `${slug}.${ext}`;
  }
}

function onTitleChange() {
  if (language.value) {
    const ext = extensionMap[language.value] ?? language.value;
    const slug = title.value
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
    if (slug) filename.value = `${slug}.${ext}`;
  }
}

// ─── Validation ──────────────────────────────────────────────────
const isValid = computed(
  () => title.value.trim() && language.value && filename.value.trim() && code.value.trim(),
);

// ─── Submit ──────────────────────────────────────────────────────
async function submit() {
  if (!isValid.value) return;

  submitting.value = true;
  error.value = null;

  try {
    const data = await snippetAPI.create({
      title: title.value.trim(),
      description: description.value.trim(),
      language: language.value,
      filename: filename.value.trim(),
      code: code.value,
    });

    if (!data.success) {
      throw new Error(data.message || "Failed to create snippet");
    }

    router.push({ name: "snippet", params: { id: (data.data as Snippet).snippet_id } });
  } catch (err) {
    if (err instanceof RateLimitError) {
      const retryAfter = err.retryAfter ? getDateFromSeconds(err.retryAfter) : null;
      if (retryAfter) {
        error.value = `Rate limit exceeded. Please wait ${getRemainingTime(retryAfter)} and try again.`;
      } else {
        error.value = "Rate limit exceeded. Please wait a moment and try again.";
      }
    } else {
      error.value = err instanceof Error ? err.message : "Something went wrong";
    }
  } finally {
    submitting.value = false;
  }
}

function cancel() {
  router.back();
}
</script>

<template>
  <div class="create-view">
    <!-- ─── Header ──────────────────────────────────────────────── -->
    <header class="create-header">
      <div class="header-left">
        <p class="page-eyebrow">Contribute</p>
        <h1>New Snippet</h1>
        <p class="subtitle">Add a piece of code worth keeping to the library.</p>
      </div>
    </header>

    <!-- ─── Form ────────────────────────────────────────────────── -->
    <div class="create-body">
      <!-- Error banner -->
      <div v-if="error" class="error-banner">
        <PhX :size="14" weight="bold" />
        {{ error }}
      </div>

      <div class="form-layout">
        <!-- ── Left column: metadata ─────────────────────────────── -->
        <aside class="form-meta">
          <div class="section-label">01 — Metadata</div>

          <div class="field">
            <label class="field-label" for="title">Title <span class="required">*</span></label>
            <input
              id="title"
              v-model="title"
              type="text"
              class="field-input"
              placeholder="e.g. Binary Search"
              @input="onTitleChange"
              autocomplete="off"
            />
          </div>

          <div class="field">
            <label class="field-label" for="language"
              >Language <span class="required">*</span></label
            >
            <select
              id="language"
              v-model="language"
              class="field-input field-select"
              @change="onLanguageChange"
            >
              <option value="" disabled>Select a language…</option>
              <option v-for="lang in languages" :key="lang" :value="lang">
                {{ lang }}
              </option>
            </select>
          </div>

          <div class="field">
            <label class="field-label" for="filename"
              >Filename <span class="required">*</span></label
            >
            <input
              id="filename"
              v-model="filename"
              type="text"
              class="field-input field-mono"
              placeholder="e.g. binary_search.py"
              autocomplete="off"
            />
          </div>

          <div class="field">
            <label class="field-label" for="description">Description</label>
            <textarea
              id="description"
              v-model="description"
              class="field-input field-textarea"
              placeholder="Briefly describe what this snippet does…"
              rows="4"
            />
            <span class="field-hint">Optional but encouraged.</span>
          </div>
        </aside>

        <!-- ── Right column: code ────────────────────────────────── -->
        <section class="form-code">
          <div class="section-label">02 — Code <span class="required">*</span></div>

          <div class="code-editor-wrapper" :class="{ 'code-editor-wrapper--filled': code }">
            <CodeEditor
              v-model="code"
              :language="language"
              :show-line-numbers="true"
              :readonly="false"
              max-height="600px"
              placeholder="Start typing or paste your code here..."
            />
            <div class="code-placeholder" :class="{ 'code-placeholder--hidden': code }">
              <PhCode :size="32" weight="duotone" />
              <p class="placeholder-title">Start typing or paste your code here…</p>
              <p class="placeholder-hint">Live syntax highlighting • Tab for indentation</p>
            </div>
          </div>
        </section>
      </div>

      <!-- ─── Divider ──────────────────────────────────────────── -->
      <div class="form-divider" />

      <!-- ─── Actions ─────────────────────────────────────────── -->
      <div class="form-actions">
        <AppButton variant="ghost" size="md" @click="cancel" :disabled="submitting">
          Cancel
        </AppButton>
        <AppButton
          variant="primary"
          size="md"
          :icon="PhFloppyDisk"
          @click="submit"
          :disabled="!isValid || submitting"
          :loading="submitting"
        >
          Save Snippet
        </AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-2xl) var(--gutter);
}

/* ─── Header ───────────────────────────────────────────────────── */
.create-header {
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-xl);
  border-bottom: 1px solid var(--color-border);
}

.page-eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--space-sm);
}

h1 {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
  margin-bottom: var(--space-sm);
  line-height: var(--leading-tight);
}

.subtitle {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: var(--leading-normal);
}

/* ─── Error Banner ─────────────────────────────────────────────── */
.error-banner {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-primary-muted);
  border-left: 3px solid var(--color-primary);
  border-radius: var(--radius-sm);
  background: var(--color-primary-subtle);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  color: var(--color-primary);
}

/* ─── Two-column layout ────────────────────────────────────────── */
.form-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: var(--space-2xl);
  align-items: start;
}

/* ─── Section label ────────────────────────────────────────────── */
.section-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--space-lg);
}

.required {
  color: var(--color-primary);
  font-style: normal;
}

/* ─── Fields ───────────────────────────────────────────────────── */
.form-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.field-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-muted);
  user-select: none;
}

.field-input {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-background-elevated);
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base);
  appearance: none;
  -webkit-appearance: none;
}

.field-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}

.field-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%23b8a490' d='M4 6l4 4 4-4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px;
  padding-right: 2.5rem;
  cursor: pointer;
}

.field-select option {
  background: var(--color-background-elevated);
  color: var(--color-text);
  padding: var(--space-sm);
}

.field-mono {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
}

.field-textarea {
  resize: vertical;
  min-height: 96px;
  line-height: var(--leading-relaxed);
}

.field-hint {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-style: italic;
}

/* ─── Code Editor ──────────────────────────────────────────────── */
.form-code {
  display: flex;
  flex-direction: column;
}

.code-editor-wrapper {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  min-height: 480px;
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base);
}

.code-editor-wrapper :deep(.code-editor) {
  border-radius: var(--radius-md);
  min-height: 480px;
}

.code-editor-wrapper:focus-within {
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}

.code-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text-muted);
  pointer-events: none;
  user-select: none;
  text-align: center;
  opacity: 0.7;
  transition: opacity var(--transition-base);
}

.code-editor-wrapper:hover .code-placeholder {
  opacity: 1;
}

.code-placeholder--hidden {
  opacity: 0 !important;
  pointer-events: none;
}

.code-placeholder .placeholder-title {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-style: italic;
  letter-spacing: var(--tracking-wide);
  margin-top: var(--space-sm);
  font-weight: 500;
}

.code-placeholder .placeholder-hint {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-faded);
  opacity: 0.8;
}

/* ─── Form Divider ─────────────────────────────────────────────── */
.form-divider {
  height: 1px;
  margin: var(--space-2xl) 0 var(--space-xl);
  background: linear-gradient(
    to right,
    transparent,
    var(--color-border-strong) 20%,
    var(--color-border-strong) 80%,
    transparent
  );
}

/* ─── Actions ──────────────────────────────────────────────────── */
.form-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-sm);
}

/* ─── Responsive ───────────────────────────────────────────────── */
@media (max-width: 900px) {
  .form-layout {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  .code-editor-wrapper {
    min-height: 480px;
  }

  .code-editor-wrapper :deep(.code-editor) {
    min-height: 320px;
  }
}

@media (max-width: 600px) {
  .create-view {
    padding: var(--space-lg) var(--space-md);
  }

  .form-actions {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .form-actions :deep(.app-button) {
    width: 100%;
  }
}
</style>
