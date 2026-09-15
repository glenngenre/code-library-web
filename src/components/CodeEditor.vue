<script setup lang="ts">
import { ref, computed, shallowRef, watch } from "vue";
import { Codemirror } from "vue-codemirror";
import { EditorView, lineNumbers, keymap } from "@codemirror/view";
import type { Extension } from "@codemirror/state";
import { bracketMatching, indentOnInput } from "@codemirror/language";
import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { history, historyKeymap, defaultKeymap, indentWithTab } from "@codemirror/commands";
import { searchKeymap } from "@codemirror/search";

import { parchment, parchmentDark } from "@/styles/codemirror-theme";

export interface CodeEditorProps {
  modelValue: string;
  language?: string;
  maxHeight?: string;
  placeholder?: string;
  readonly?: boolean;
  showLineNumbers?: boolean;
}

const props = withDefaults(defineProps<CodeEditorProps>(), {
  language: "javascript",
  maxHeight: "600px",
  placeholder: "Write some code...",
  readonly: false,
  showLineNumbers: true,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const view = shallowRef<EditorView>();

const isDark = ref(false);

if (typeof window !== "undefined") {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  isDark.value = mediaQuery.matches;

  mediaQuery.addEventListener("change", (e) => {
    isDark.value = e.matches;
  });
}

const languageExtension = shallowRef<Extension | null>(null);

watch(
  () => props.language,
  async (newLang) => {
    const lang = (newLang || "javascript").toLowerCase();

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
        case "bash":
        case "sh":
        case "shell":
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
  const exts: Extension[] = [EditorView.lineWrapping, isDark.value ? parchmentDark : parchment];

  if (props.showLineNumbers) {
    exts.push(lineNumbers());
  }

  if (languageExtension.value) {
    exts.push(languageExtension.value);
  }

  if (!props.readonly) {
    exts.push(
      history(),
      indentOnInput(),
      bracketMatching(),
      closeBrackets(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        indentWithTab,
      ]),
    );
  } else {
    exts.push(EditorView.editable.of(false));
  }

  return exts;
});

const handleReady = (payload: { view: EditorView }) => {
  view.value = payload.view;
};
</script>

<template>
  <div class="code-editor" :style="{ maxHeight }">
    <codemirror
      class="cm-wrapper"
      :model-value="modelValue"
      :placeholder="placeholder"
      :autofocus="false"
      :indent-with-tab="!readonly"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>

<style scoped>
.cm-gutters .cm-gutters-before {
  height: 500px;
}

.code-editor {
  background: var(--color-background-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow:
    inset 0 0 0 1px var(--color-primary-subtle),
    var(--shadow-md);
  overflow: hidden;

  display: flex;
  flex-direction: column;
  height: 100%;
}

.cm-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}

:deep(.cm-editor) {
  flex: 1;
  height: 100%;
  outline: none;
}

:deep(.cm-scroller) {
  height: 100%;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

:deep(.cm-scroller)::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

:deep(.cm-scroller)::-webkit-scrollbar-track {
  background: transparent;
}

:deep(.cm-scroller)::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: var(--radius-sm);
}

:deep(.cm-scroller)::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-strong);
}
</style>
