import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import SubMenuEditor from './SubMenuEditor';
import { MenuStateContext } from '../MenuStateContext';
import { updateSpace, deleteSpace } from '../api';

function SubMenuHeading({ displayMenu, space, toggleMenuDisplay }) {
  const { space_id, space_title } = space;
  const [inEditMode, setEditMode] = useState(false);
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
    await deleteSpace(space_id);
    dispatch({
      type: 'DELETE_SPACE',
      payload: { space_id }
    });
  };

  const handleSubmit = async title => {
    await updateSpace({ title, space_id });
    dispatch({
      type: 'UPDATE_SPACE',
      payload: { space_id, space_title: title }
    });
    exitEditMode();
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
        />
      )}
      {!inEditMode && (
        <Container onClick={toggleMenuDisplay}>
          <span>
            <Icon className={`fas fa-${iconClass}`} margin="0 0.5rem 0 0 " />
            {space_title}
          </span>
          <Right className="right">
            <Icon
              className="fas fa-pencil-alt"
              onClick={enterEditMode}
              margin="0 0.5rem 0 0 "
            />
            <Icon className="fas fa-trash-alt" onClick={handleDelete} />
          </Right>
        </Container>
      )}
    </>
  );
}

const Right = styled.span`
  display: flex;
  visibility: hidden;
`;

const Container = styled.span`
  display: flex;
  justify-content: space-between;
  &:hover ${Right} {
    visibility: visible;
  }
`;

const Icon = styled.i`
  margin: ${({ margin }) => margin};
`;

export default SubMenuHeading;
