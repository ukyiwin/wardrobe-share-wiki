import React, { useState, useContext } from 'react';
import { EditorState } from 'draft-js';
import { withRouter } from 'react-router';

import Editor from './Editor';

import { MenuStateContext } from '../MenuStateContext';
import { createPage } from '../api';
import { convertDraftToJSON, handleError } from '../utils';

function WikiPageEditor({ match, history, setError }) {
  const [editorState, setEditor] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const { dispatch } = useContext(MenuStateContext);

  const { space_title } = match.params;
  const space_id = parseInt(match.params.space_id, 10);

  const handlePublish = async () => {
    const content = convertDraftToJSON(editorState.getCurrentContent());
    // set title if, user has left it blank
    const newTitle = !title ? 'no-title' : title;
    try {
      const id = await createPage({ title: newTitle, content, space_id });
      await dispatch({
        type: 'CREATE_PAGE',
        payload: { title: newTitle, space_id, id }
      });
      history.push(`/${space_title}/${space_id}/${newTitle}/${id}`);
    } catch {
      handleError(setError);
    }
  };

  return (
    <Editor
      handlePublish={handlePublish}
      editorState={editorState}
      setEditor={setEditor}
      title={title}
      setTitle={setTitle}
    />
  );
}

export default withRouter(WikiPageEditor);
