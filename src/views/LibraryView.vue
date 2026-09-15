<script setup lang="ts">
import { useRouter } from "vue-router";
import { SnippetCard, AppInput, AppButton } from "@/components";
import { useSnippetList } from "@/composables/useSnippets";
import { useTotalLanguages } from "@/composables/useStats";

const router = useRouter();
const {
  snippets,
  loading,
  error,
  hasMore,
  isFirstPage,
  searchQuery,
  selectedLanguage,
  goNext,
  goPrev,
} = useSnippetList();

const { languages } = useTotalLanguages();

function viewSnippet(snippetId: string) {
  router.push({ name: "snippet", params: { id: snippetId } });
}

function clearFilters() {
  searchQuery.value = "";
  selectedLanguage.value = "";
}
</script>

<template>
  <div class="library-view">
    <!-- ─── Header ──────────────────────────────────────────────── -->
    <header class="library-header">
      <p class="page-eyebrow">Collection</p>
      <h1>Code Library</h1>
      <p class="subtitle">Browse and search through all available code snippets.</p>
    </header>

    <!-- ─── Controls ────────────────────────────────────────────── -->
    <div class="library-controls">
      <AppInput
        v-model="searchQuery"
        type="search"
        placeholder="Search snippets by title, description, or language..."
        :show-icon="true"
        class="search-input"
      />
      <div class="filter-group">
        <select v-model="selectedLanguage" class="language-filter">
          <option value="">All Languages</option>
          <option v-for="lang in languages" :key="lang" :value="lang">
            {{ lang.toUpperCase() }}
          </option>
        </select>
        <button v-if="searchQuery || selectedLanguage" @click="clearFilters" class="clear-filters">
          Clear Filters
        </button>
      </div>
    </div>

    <!-- ─── Content ─────────────────────────────────────────────── -->
    <div class="library-content">
      <div v-if="snippets.length === 0 && loading" class="snippets-grid">
        <div class="skeleton h-40" v-for="n in 6" :key="n"></div>
      </div>

      <div v-else-if="error" class="state-message state-message--error">
        <p class="state-label">Error loading snippets</p>
        <p class="state-detail">{{ error }}</p>
      </div>

      <div
        v-else-if="snippets.length === 0 && !searchQuery && !selectedLanguage"
        class="state-message"
      >
        <p class="state-label">No snippets yet</p>
        <p class="state-detail">Be the first to create one.</p>
      </div>

      <div v-else-if="snippets.length === 0" class="state-message">
        <p class="state-label">No snippets match your filters</p>
        <button @click="clearFilters" class="clear-filters-btn">Clear Filters</button>
      </div>

      <div v-else class="snippets-grid">
        <SnippetCard
          v-for="snippet in snippets"
          :key="snippet.snippet_id"
          :snippet="snippet"
          @click="viewSnippet"
        />
      </div>
    </div>

    <!-- ─── Pagination ───────────────────────────────────────────── -->
    <div v-if="!isFirstPage || hasMore" class="pagination">
      <AppButton variant="outline" size="lg" :disabled="isFirstPage" @click="goPrev">
        prev
      </AppButton>
      <AppButton variant="outline" size="lg" :disabled="!hasMore" @click="goNext"> next </AppButton>
    </div>
  </div>
</template>
<style scoped>
.library-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-2xl) var(--gutter);
}

.library-header {
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-xl);
  border-bottom: 1px solid var(--color-border);
}

.subtitle {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: var(--leading-normal);
}

.library-controls {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 280px;
}

.filter-group {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
}

.language-filter {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  background: var(--color-background-elevated);
  color: var(--color-text);
  cursor: pointer;
  transition: border-color var(--transition-base);
}

.language-filter:focus {
  outline: none;
  border-color: var(--color-primary);
}

.clear-filters,
.clear-filters-btn {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-base);
}

.clear-filters:hover,
.clear-filters-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-subtle);
}

.snippets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--space-lg);
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  margin-top: var(--space-xl);
  padding-top: var(--space-xl);
  border-top: 1px solid var(--color-border);
}

.pagination-btn {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-base);
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-info {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .library-view {
    padding: var(--space-lg) var(--space-md);
  }

  .library-controls {
    flex-direction: column;
  }

  .search-input {
    width: 100%;
    min-width: unset;
  }

  .filter-group {
    width: 100%;
    justify-content: space-between;
  }

  .language-filter {
    flex: 1;
  }

  .snippets-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
}
</style>
