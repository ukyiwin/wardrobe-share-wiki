import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import SubMenuEditor from './SubMenuEditor';
import Icon from '../common/Icon';
import Alert from '../common/Alert';

import { MenuStateContext } from '../MenuStateContext';
import { updateSpace, deleteSpace } from '../api';
import { handleError } from '../utils';

function SubMenuHeading({ displayMenu, space, toggleMenuDisplay }) {
  const { space_id, space_title } = space;
  const [inEditMode, setEditMode] = useState(false);
  const [error, setError] = useState(false);
  const { dispatch } = useContext(MenuStateContext);

  const enterEditMode = e => {
    e.stopPropagation();
    setEditMode(true);
  };

  const exitEditMode = () => {
    setEditMode(false);
  };

  const handleDelete = async e => {
    e.stopPropagation();
    try {
      await deleteSpace(space_id);
      dispatch({
        type: 'DELETE_SPACE',
        payload: { space_id }
      });
    } catch {
      handleError(setError);
    }
  };

  const handleSubmit = async title => {
    const newTitle = !title ? 'no-title' : title;

    try {
      await updateSpace({ title: newTitle, space_id });
      dispatch({
        type: 'UPDATE_SPACE',
        payload: { space_id, space_title: newTitle }
      });
      exitEditMode();
    } catch {
      handleError(setError);
    }
  };

  const iconClass = displayMenu ? 'angle-down' : 'angle-right';

  return (
    <>
      {inEditMode && (
        <SubMenuEditor
          initialValue={space_title}
          handleOnBlur={exitEditMode}
          handleSubmit={handleSubmit}
          display={inEditMode}
          error={error}
        />
      )}
      {!inEditMode && (
        <>
          <Container onClick={toggleMenuDisplay}>
            <Left>
              <Icon className={`fas fa-${iconClass}`} margin="right" />
              {space_title}
            </Left>
            <Right className="right">
              <Icon
                className="fas fa-pencil-alt"
                onClick={enterEditMode}
                margin="right"
              />
              <Icon className="fas fa-trash-alt" onClick={handleDelete} />
            </Right>
          </Container>
          {error && <Alert>Oh no! An error occured!</Alert>}
        </>
      )}
    </>
  );
}

const Right = styled.span`
  display: flex;
  visibility: hidden;
`;
const Left = styled.span`
  cursor: pointer;
`;

const Container = styled.span`
  display: flex;
  justify-content: space-between;
  &:hover ${Right} {
    visibility: visible;
  }
`;

export default SubMenuHeading;
