import React from 'react';
import styled from 'styled-components';
import BlockTypeControls from './BlockTypeControls';
import InlineStyleControls from './InlineStyleControls';

function EditorControls({
  handleToggleInlineStyle,
  handleToggleBlockType,
  editorState
}) {
  return (
    <Container>
      <BlockTypeControls
        editorState={editorState}
        handleToggleBlockType={handleToggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        handleToggleInlineStyle={handleToggleInlineStyle}
      />
    </Container>
  );
}

const Container = styled.ul`
  margin: 0;
  padding: 1rem;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.primary};
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
`;

export default EditorControls;
