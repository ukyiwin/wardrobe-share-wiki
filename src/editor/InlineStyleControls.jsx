import React from 'react';
import styled from 'styled-components';
import EditorControlButton from './EditorControlButton';
import Icon from '../common/Icon';

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
          <Icon className={label.icon} fontSize="1rem" />
        ) : (
          <MonoButton>{label}</MonoButton>
        )}
      </EditorControlButton>
    );
  });
}

const MonoButton = styled.span`
  font-family: ${({ theme }) => theme.font.tertiary};
`;

export default InlineStyleControls;
