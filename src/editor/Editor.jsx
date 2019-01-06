import React, { useState } from 'react';
import styled from 'styled-components';

import EditorTabs from './EditorTabs';
import VisualEditor from './VisualEditor';
import MarkdownEditor from './MarkdownEditor';
import TitleInput from '../common/TitleInput';
import PageHeader from '../common/PageHeader';
import Button from '../common/Button';

import { TITLE_INPUT_CHAR_LIMIT } from '../const';

function WikiPageEditor(props) {
  const [tab, setTab] = useState('VISUAL');
  const { editorState, setEditor, title, setTitle, handlePublish } = props;
  return (
    <Container>
      <PageHeader>
        <h1>Edit WikiPage</h1>
      </PageHeader>
      <TitleInput
        placeholder="Title"
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
        maxlength={TITLE_INPUT_CHAR_LIMIT}
        big
      />
      <EditorTabs tab={tab} setTab={setTab} />
      {tab === 'VISUAL' && (
        <VisualEditor editorState={editorState} setEditor={setEditor} />
      )}
      {tab === 'MARKDOWN' && (
        <MarkdownEditor
          contentState={editorState.getCurrentContent()}
          setEditor={setEditor}
        />
      )}
      <Button onClick={handlePublish}>PUBLISH</Button>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default WikiPageEditor;
