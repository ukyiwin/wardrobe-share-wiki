import React, { useState, useEffect, useContext } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';

import Editor from './Editor';

import { convertDraftToJSON, handleError } from '../utils';
import { MenuStateContext } from '../MenuStateContext';
import { updatePage, loadPage } from '../api';

function WikiPageEditor({ match, history, setError }) {
  const [editorState, setEditor] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const { dispatch } = useContext(MenuStateContext);

  const { space_title } = match.params;
  const id = parseInt(match.params.wikipage_id, 10);
  const space_id = parseInt(match.params.space_id, 10);

  const fetchPage = async () => {
    try {
      const pageData = await loadPage(id);
      const { title, content } = pageData;
      setTitle(title);
      const rawDraft = convertFromRaw(content);
      const newEditorState = EditorState.createWithContent(rawDraft);
      setEditor(newEditorState);
    } catch {
      handleError(setError, history);
    }
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
    // set title if, user has left it blank
    const newTitle = !title ? 'no-title' : title;
    try {
      await updatePage({ title: newTitle, content, id });
      dispatch({
        type: 'UPDATE_PAGE',
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

export default WikiPageEditor;
