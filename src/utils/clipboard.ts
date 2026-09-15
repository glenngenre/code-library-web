/**
 * Copy text to clipboard
 * @param text - The text to copy
 * @returns Promise that resolves when copy is successful
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (error) {
      console.warn("Clipboard API failed, trying fallback:", error);
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const success = document.execCommand("copy");
    if (!success) throw new Error("execCommand copy returned false");
  } finally {
    document.body.removeChild(textarea);
  }
}

/**
 * Download text as a file
 * @param content - The text content to download
 * @param filename - The name of the file to download
 */
export function downloadAsFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Share content using Web Share API.
 * @param title - The title for sharing
 * @param text - The text content to share
 * @returns Promise that resolves when share is successful
 */
export async function shareContent(title: string, text: string): Promise<void> {
  await copyToClipboard(text);
  if (navigator.share) {
    try {
      await navigator.share({ title, text });
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Failed to share:", error);
      }
    }
  }
}
