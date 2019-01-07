import { convertToRaw, convertFromRaw } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';

export function convertMarkdownToDraft(markdown) {
  const draftObject = markdownToDraft(markdown, {
    preserveNewlines: true
  });
  return convertFromRaw(draftObject);
}

export function convertDraftToMarkdown(draft) {
  const rawContent = convertToRaw(draft);
  return draftToMarkdown(rawContent, {
    preserveNewlines: true
  });
}

export function convertDraftToJSON(draft) {
  const contentObject = convertToRaw(draft);
  return JSON.stringify(contentObject);
}

export function convertJSONtoPlainText(data) {
  const draftObject = convertFromRaw(data);
  return draftObject.getPlainText('\n');
}

export function hexToRgba(hex, alpha) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function convertUTCToReadable(UTC) {
  const date = new Date(UTC);
  return `${date.toLocaleDateString('ja-JP')} ${date.toLocaleTimeString(
    'ja-JP'
  )}`;
}

export function handleError(setError, history) {
  setError(true);

  const delay = () => {
    setError(false);
    if (history) {
      history.push('/');
    }
  };

  setTimeout(delay, 2500);
}
