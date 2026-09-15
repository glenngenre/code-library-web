<script setup lang="ts">
import { ref, computed, shallowRef, watch } from "vue";
import { useRouter } from "vue-router";
import { PhArrowsOut } from "@phosphor-icons/vue";
import { Codemirror } from "vue-codemirror";
import { EditorView, lineNumbers, highlightActiveLineGutter } from "@codemirror/view";
import type { Extension } from "@codemirror/state";
import { parseEscapedString } from "@/utils";

import { parchment, parchmentDark } from "@/styles/codemirror-theme";

export interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
  expandable?: boolean;
  maxHeight?: string;
  showLineNumbers?: boolean;
  title?: string;
  category?: string;
  variant?: "card" | "immersive";
}

const props = withDefaults(defineProps<CodeBlockProps>(), {
  filename: "",
  language: "",
  expandable: true,
  maxHeight: "400px",
  showLineNumbers: true,
  title: "",
  category: "",
  variant: "card",
});

const router = useRouter();
const view = shallowRef<EditorView>();

const isDark = ref(false);

if (typeof window !== "undefined") {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  isDark.value = mediaQuery.matches;

  mediaQuery.addEventListener("change", (e) => {
    isDark.value = e.matches;
  });
}

const parsedCode = computed(() => parseEscapedString(props.code));

const languageExtension = shallowRef<Extension | null>(null);

watch(
  () => props.language,
  async (newLang) => {
    const lang = newLang.toLowerCase();

    try {
      switch (lang) {
        case "javascript":
        case "js": {
          const { javascript } = await import("@codemirror/lang-javascript");
          languageExtension.value = javascript();
          break;
        }
        case "typescript":
        case "ts": {
          const { javascript } = await import("@codemirror/lang-javascript");
          languageExtension.value = javascript({ typescript: true });
          break;
        }
        case "react":
        case "jsx": {
          const { javascript } = await import("@codemirror/lang-javascript");
          languageExtension.value = javascript({ jsx: true });
          break;
        }
        case "tsx": {
          const { javascript } = await import("@codemirror/lang-javascript");
          languageExtension.value = javascript({ jsx: true, typescript: true });
          break;
        }
        case "json": {
          const { javascript } = await import("@codemirror/lang-javascript");
          languageExtension.value = javascript();
          break;
        }
        case "python":
        case "py": {
          const { python } = await import("@codemirror/lang-python");
          languageExtension.value = python();
          break;
        }
        case "html":
        case "xml": {
          const { html } = await import("@codemirror/lang-html");
          languageExtension.value = html();
          break;
        }
        case "css": {
          const { css } = await import("@codemirror/lang-css");
          languageExtension.value = css();
          break;
        }
        case "java": {
          const { java } = await import("@codemirror/lang-java");
          languageExtension.value = java();
          break;
        }
        case "cpp":
        case "c++":
        case "cxx":
        case "c":
        case "csharp":
        case "cs":
        case "c#": {
          const { cpp } = await import("@codemirror/lang-cpp");
          languageExtension.value = cpp();
          break;
        }
        case "rust":
        case "rs": {
          const { rust } = await import("@codemirror/lang-rust");
          languageExtension.value = rust();
          break;
        }
        case "go": {
          const { go } = await import("@codemirror/lang-go");
          languageExtension.value = go();
          break;
        }
        case "php": {
          const { php } = await import("@codemirror/lang-php");
          languageExtension.value = php();
          break;
        }
        case "sql": {
          const { sql } = await import("@codemirror/lang-sql");
          languageExtension.value = sql();
          break;
        }
        case "bash":
        case "sh":
        case "shell":
        case "ruby":
        case "rb":
        default: {
          languageExtension.value = null;
          break;
        }
      }
    } catch (error) {
      console.error(`Failed to load language module for: ${lang}`, error);
      languageExtension.value = null;
    }
  },
  { immediate: true },
);

const extensions = computed(() => {
  const exts: Extension[] = [
    isDark.value ? parchmentDark : parchment,
    EditorView.lineWrapping,
    EditorView.editable.of(false),
  ];

  if (props.showLineNumbers) {
    exts.push(lineNumbers(), highlightActiveLineGutter());
  }

  if (languageExtension.value) {
    exts.push(languageExtension.value);
  }

  return exts;
});

const handleReady = (payload: { view: EditorView }) => {
  view.value = payload.view;
};

function expandToFolio() {
  router.push({
    name: "folio",
    state: {
      code: parsedCode.value,
      title: props.title,
      language: props.language,
      filename: props.filename,
      category: props.category,
    },
  });
}
</script>

<template>
  <div class="code-block" :class="`code-block--${variant}`">
    <div v-if="variant === 'card'" class="accent-bar" />

    <div v-if="variant === 'card'" class="code-toolbar">
      <span v-if="filename" class="code-filename">{{ filename }}</span>
      <button v-if="expandable" class="expand-btn" @click="expandToFolio">
        <PhArrowsOut :size="16" />
        <span>Expand to Folio</span>
      </button>
    </div>

    <div
      class="code-container"
      :class="{ 'code-container--immersive': variant === 'immersive' }"
      :style="variant === 'card' ? { maxHeight } : {}"
    >
      <codemirror
        :model-value="parsedCode"
        :style="{ height: '100%', width: '100%' }"
        :autofocus="false"
        :indent-with-tab="false"
        :tab-size="2"
        :extensions="extensions"
        @ready="handleReady"
      />
    </div>
  </div>
</template>

<style scoped>
.code-block {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.code-block--card {
  background: var(--color-background-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow:
    inset 0 0 0 1px var(--color-primary-subtle),
    var(--shadow-md);
}

.code-block--immersive {
  background: var(--color-background);
  border: none;
  border-radius: 0;
  height: 100%;
}

.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--color-primary-muted);
  z-index: 1;
}

.code-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  background: var(--color-background-alt);
  border-bottom: 1px solid var(--color-border);
}

.code-filename {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest);
}

.expand-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: lowercase;
  letter-spacing: var(--tracking-wider);
  padding: var(--space-xs) var(--space-sm);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  transition:
    color var(--transition-base),
    background var(--transition-base);
}

.expand-btn:hover {
  color: var(--color-primary);
  background: var(--color-primary-subtle);
}

.code-container {
  flex: 1;
  overflow-y: scroll;
  position: relative;
  min-height: 400px;
}

.code-container--immersive {
  min-height: 100%;
}

.code-container :deep(.cm-editor) {
  height: 100%;
  outline: none;
  background: transparent;
}

.code-container :deep(.cm-scroller) {
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

.code-container :deep(.cm-scroller)::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.code-container :deep(.cm-scroller)::-webkit-scrollbar-track {
  background: transparent;
}

.code-container :deep(.cm-scroller)::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: var(--radius-sm);
}

.code-container :deep(.cm-scroller)::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-strong);
}

.code-block--immersive .code-container {
  flex: 1;
  max-height: none !important;
  min-height: 100%;
}

.cm-gutter {
  height: 100%;
}
</style>
