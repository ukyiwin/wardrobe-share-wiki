import React, { useState } from 'react';
import styled from 'styled-components';
import EditorTabs from './EditorTabs';
import Button from '../Button';
import VisualEditor from './VisualEditor';
import MarkdownEditor from './MarkdownEditor';
import TitleInput from './TitleInput';
import PageHeader from '../PageHeader';

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
  overflow-y: none;
`;

export default WikiPageEditor;
