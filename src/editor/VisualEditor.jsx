import React, { useRef } from 'react';
import styled from 'styled-components';
import EditorControls from './EditorControls';
import { Editor as Input, RichUtils } from 'draft-js';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import { HANDLED, NOT_HANDLED } from '../const';
import TextAreaStyle from './TextArea';

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Anonymous Pro", monospace',
    padding: '0.1rem'
  }
};

function VisualEditor({ editorState, setEditor }) {
  const domEditor = useRef(null);

  const handleToggleInlineStyle = inlineStyle => {
    setEditor(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleToggleBlockType = blockType => {
    setEditor(RichUtils.toggleBlockType(editorState, blockType));
  };

  // allow soft new line when "SHIFT + Enter", "CTRL + Enter", or "ALT + Enter" are pressed
  const handleReturn = e => {
    if (isSoftNewlineEvent(e)) {
      setEditor(RichUtils.insertSoftNewline(editorState));
      return HANDLED;
    }
    return NOT_HANDLED;
  };

  return (
    <>
      <EditorControls
        handleToggleInlineStyle={handleToggleInlineStyle}
        handleToggleBlockType={handleToggleBlockType}
        editorState={editorState}
      />
      <InputContainer onClick={() => domEditor.current.focus()}>
        <Input
          ref={domEditor}
          editorState={editorState}
          onChange={setEditor}
          customStyleMap={styleMap}
          blockStyleFn={blockStyleFn}
          handleReturn={handleReturn}
        />
      </InputContainer>
    </>
  );
}

const InputContainer = styled.div`
  border: ${({ theme }) => `1px solid ${theme.color.primary}`};
  color: ${({ theme }) => theme.color.text};
  ${TextAreaStyle}
`;

function blockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  switch (type) {
    case 'blockquote':
      return 'blockquote';
    case 'code-block':
      return 'codeblock';
    default:
      return;
  }
}
export default VisualEditor;
