import React from 'react';
import EditorControlButton from './EditorControlButton';
import Icon from '../common/Icon';

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: { icon: 'fas fa-quote-right' }, style: 'blockquote' },
  { label: { icon: 'fas fa-list-ul' }, style: 'unordered-list-item' },
  { label: { icon: 'fas fa-list-ol' }, style: 'ordered-list-item' },
  { label: { icon: 'fas fa-code' }, style: 'code-block' }
];

function BlockTypeControls({ handleToggleBlockType, editorState }) {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();
  const blockType = currentContent
    .getBlockForKey(selection.getStartKey())
    .getType();

  return BLOCK_TYPES.map(({ label, style }) => {
    return (
      <EditorControlButton
        key={style}
        onMouseDown={e => {
          // prevent focusing on buttons to ensure the cursor is correctly positioned in the textarea
          e.preventDefault();
          handleToggleBlockType(style);
        }}
        active={style === blockType}
      >
        {label.icon ? <Icon className={label.icon} fontSize="1.2rem" /> : label}
      </EditorControlButton>
    );
  });
}

export default BlockTypeControls;
