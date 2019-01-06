import React, { useState } from 'react';
import styled from 'styled-components';
import { EditorState } from 'draft-js';
import { convertMarkdownToDraft, convertDraftToMarkdown } from '../utils';

function MarkdownEditor({ contentState, setEditor }) {
  const markdownString = convertDraftToMarkdown(contentState);
  // create local state as this is needed to store spaces and new lines
  const [value, setValue] = useState(markdownString);

  const handleChange = ({ target: { value } }) => {
    setValue(value);
    const rawDraft = convertMarkdownToDraft(value);
    const newEditorState = EditorState.createWithContent(rawDraft);
    setEditor(newEditorState);
  };

  return <InputContainer value={value} onChange={handleChange} />;
}

const InputContainer = styled.textarea`
  outline: none;
  border: ${({ theme }) => `1px solid ${theme.color.primary}`};
  margin-bottom: 0.8rem;
  padding: 0.5rem 1rem;
  width: 100%;
  flex: 1 1 0;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.font.tertiary};
`;

export default MarkdownEditor;
