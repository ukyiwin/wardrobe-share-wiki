import React, { useState } from 'react';
import styled from 'styled-components';
import { EditorState } from 'draft-js';
import TextAreaStyle from '../common/TextArea';

import { convertMarkdownToDraft, convertDraftToMarkdown } from '../utils';

function MarkdownEditor({ contentState, setEditor }) {
  const markdownString = convertDraftToMarkdown(contentState);
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
  ${TextAreaStyle}
  font-size: 1rem;
  font-family: ${({ theme }) => theme.font.tertiary};
`;

export default MarkdownEditor;
