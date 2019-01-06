import React from 'react';
import styled from 'styled-components';
import EditorControlButton from './EditorControlButton';
import EditorControlIcon from './EditorControlIcon';

const INLINE_STYLES = [
  { label: { icon: 'fas fa-bold' }, style: 'BOLD' },
  { label: { icon: 'fas fa-italic' }, style: 'ITALIC' },
  { label: 'M', style: 'CODE' }
];

function InlineStyleControls({ handleToggleInlineStyle, editorState }) {
  const currentStyle = editorState.getCurrentInlineStyle();

  return INLINE_STYLES.map(({ label, style }) => {
    return (
      <EditorControlButton
        key={style}
        active={currentStyle.has(style)}
        onMouseDown={e => {
          // prevent focusing on buttons to ensure the cursor is correctly positioned in the textarea
          e.preventDefault();
          handleToggleInlineStyle(style);
        }}
      >
        {label.icon ? (
          <EditorControlIcon className={label.icon} />
        ) : (
          <Mono>{label}</Mono>
        )}
      </EditorControlButton>
    );
  });
}

const Mono = styled.span`
  font-family: ${({ theme }) => theme.font.tertiary};
`;

export default InlineStyleControls;
