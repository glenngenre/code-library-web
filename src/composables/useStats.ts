import { ref, onMounted } from "vue";
import { statsAPI } from "@/utils";
import type {
  ApiResponse,
  GlobalSnippetsData,
  GlobalLanguagesData,
  GlobalViewsData,
} from "@/utils";

export function useTotalViews() {
  const totalViews = ref(0);
  const loading = ref(true);
  const error = ref("");

  onMounted(async () => {
    try {
      const data = (await statsAPI.getTotalViews()) as ApiResponse<GlobalViewsData>;
      if (!data) {
        error.value = "No data received from server";
        return;
      }
      if (!data.success) {
        error.value = "Failed to load total views";
        return;
      }
      totalViews.value = data.data.total_views ?? 0;
    } catch (err) {
      console.error("Failed to fetch total views:", err);
      error.value = "Failed to load total views";
    } finally {
      loading.value = false;
    }
  });

  return { totalViews, loading, error };
}

export function useTotalSnippets() {
  const totalSnippets = ref(0);
  const loading = ref(true);
  const error = ref("");

  onMounted(async () => {
    try {
      const data = (await statsAPI.getTotalSnippets()) as ApiResponse<GlobalSnippetsData>;
      if (!data) {
        error.value = "No data received from server";
        return;
      }
      if (!data.success) {
        error.value = "Failed to load total snippets";
        return;
      }
      totalSnippets.value = data.data.total_snippets ?? 0;
    } catch (err) {
      error.value = "Failed to load total snippets";
    } finally {
      loading.value = false;
    }
  });

  return { totalSnippets, loading, error };
}

export function useTotalLanguages() {
  const languages = ref<string[]>([]);
  const totalLanguages = ref(0);
  const loading = ref(true);
  const error = ref("");

  onMounted(async () => {
    try {
      const data = await statsAPI.getTotalLanguages();
      if (!data) {
        error.value = "No data received from server";
        return;
      }
      if (!data.success) {
        error.value = "Failed to load total languages";
        return;
      }

      const sortedLanguages = [...(data.data.unique_languages ?? [])].sort((a, b) =>
        a.localeCompare(b),
      );

      languages.value = sortedLanguages;
      totalLanguages.value = data.data.total_languages ?? 0;
    } catch (err) {
      console.error("Failed to fetch total languages:", err);
      error.value = "Failed to load total languages";
    } finally {
      loading.value = false;
    }
  });

  return { languages, totalLanguages, loading, error };
}
