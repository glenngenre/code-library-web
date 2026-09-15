import { computed, onMounted, ref, watch } from "vue";
import { snippetAPI } from "@/utils/";
import type { ApiResponse, Snippet } from "@/utils/";

export function useSnippet(snippetId: string) {
  const snippet = ref<Snippet | null>(null);
  const loading = ref(true);
  const error = ref("");

  onMounted(async () => {
    if (!snippetId) {
      error.value = "No snippet ID provided";
      loading.value = false;
      return;
    }
    try {
      const data = (await snippetAPI.getById(snippetId)) as ApiResponse<Snippet>;
      if (!data.success) {
        error.value = data.message || "Failed to load snippet";
        return;
      }
      if (!data.data) {
        error.value = "Snippet not found";
        return;
      }
      snippet.value = {
        ...data.data,
        code: data.data.code.replace(/\\n/g, "\n").replace(/\\t/g, "\t"),
      };
      error.value = "";
      await snippetAPI.incrementViews(snippetId);
    } catch (err) {
      console.error("Failed to fetch snippet:", err);
      error.value =
        err instanceof Error
          ? err.message || "Failed to load snippet"
          : "An unknown error occurred while loading the snippet";
    } finally {
      loading.value = false;
    }
  });

  return { snippet, loading, error };
}

export function useSnippetList() {
  const snippets = ref<Snippet[]>([]);
  const loading = ref(true);
  const error = ref("");
  const hasMore = ref(false);
  const searchQuery = ref("");
  const selectedLanguage = ref("");

  const cursor = ref<string | undefined>(undefined);
  const cursorStack = ref<string[]>([]);
  const nextCursorFromServer = ref<string | null>(null);

  const isFirstPage = computed(() => cursorStack.value.length === 0);

  async function fetch() {
    loading.value = true;
    error.value = "";
    try {
      const res = await snippetAPI.getAll({
        page_size: 9,
        cursor: cursor.value,
        direction: "next",
        ...(searchQuery.value && { search: searchQuery.value }),
        ...(selectedLanguage.value && { language: selectedLanguage.value }),
      });

      if (!res.success) {
        error.value = "Failed to load snippets";
        return;
      }

      snippets.value = res.data;
      hasMore.value = res.meta.has_more;
      nextCursorFromServer.value = res.meta.next_cursor;
    } catch (e) {
      error.value = "Failed to load snippets";
    } finally {
      loading.value = false;
    }
  }

  function goNext() {
    if (!hasMore.value || !nextCursorFromServer.value) return;
    cursorStack.value.push(cursor.value as string);
    cursor.value = nextCursorFromServer.value;
  }

  function goPrev() {
    if (isFirstPage.value) return;
    cursor.value = cursorStack.value.pop();
  }

  function resetCursor() {
    cursor.value = undefined;
    cursorStack.value = [];
  }

  const debouncedFetch = useDebounceFn(fetch, 300);

  watch([searchQuery, selectedLanguage], () => {
    resetCursor();
    debouncedFetch();
  });

  watch(cursor, fetch);

  fetch();

  return {
    snippets,
    loading,
    error,
    hasMore,
    isFirstPage,
    searchQuery,
    selectedLanguage,
    goNext,
    goPrev,
  };
}

function useDebounceFn<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
