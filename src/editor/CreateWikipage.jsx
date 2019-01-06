import React, { useState, useContext } from 'react';
import { EditorState } from 'draft-js';
import Editor from './Editor';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { convertDraftToJSON } from '../utils';
import { MenuStateContext } from '../MenuStateContext';
import { createPage } from '../api';

function WikiPageEditor({ match, history }) {
  const [editorState, setEditor] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const { space_title } = match.params;
  const space_id = parseInt(match.params.space_id, 10);
  const { dispatch } = useContext(MenuStateContext);

  const handlePublish = async () => {
    const content = convertDraftToJSON(editorState.getCurrentContent());
    const id = await createPage({ title, content, space_id });
    await dispatch({
      type: 'CREATE_PAGE',
      payload: { title, space_id, id }
    });
    history.push(`/${space_title}/${space_id}/${title}/${id}`);
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
