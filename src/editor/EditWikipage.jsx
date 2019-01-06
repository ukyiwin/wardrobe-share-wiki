import React, { useState, useEffect, useContext } from 'react';
import { EditorState } from 'draft-js';
import Editor from './Editor';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { convertDraftToJSON } from '../utils';
import { MenuStateContext } from '../MenuStateContext';
import { updatePage, loadPage } from '../api';
import { convertFromRaw } from 'draft-js';

function WikiPageEditor(props) {
  const [editorState, setEditor] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const { match, history } = props;
  const { dispatch } = useContext(MenuStateContext);
  const id = parseInt(match.params.wikipage_id, 10);
  const space_id = parseInt(match.params.space_id, 10);

  const fetchPage = async () => {
    const pageData = await loadPage(id);
    const { title, content } = pageData;
    setTitle(title);
    const rawDraft = convertFromRaw(content);
    const newEditorState = EditorState.createWithContent(rawDraft);
    setEditor(newEditorState);
  };
  useEffect(
    () => {
      if (id) {
        fetchPage();
      }
    },
    [id]
  );

  const handlePublish = async () => {
    const content = convertDraftToJSON(editorState.getCurrentContent());
    await updatePage({ title, content, id });
    dispatch({
      type: 'UPDATE_PAGE',
      payload: { title, space_id, id }
    });
    history.push(`/${title}/${space_id}/${title}/${id}`);
  };

  return (
    <Container>
      <Editor
        handlePublish={handlePublish}
        editorState={editorState}
        setEditor={setEditor}
        title={title}
        setTitle={setTitle}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 2rem 3rem;
`;

export default withRouter(WikiPageEditor);
