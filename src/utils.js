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
