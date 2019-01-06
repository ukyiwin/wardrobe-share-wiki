import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import SubMenuEditor from './SubMenuEditor';
import { MenuStateContext } from '../MenuStateContext';
import { createSpace } from '../api';

function NewSubMenu() {
  const [inEditMode, setEditMode] = useState(false);
  const exitEditMode = () => {
    setEditMode(false);
  };
  const { dispatch } = useContext(MenuStateContext);

  const handleSubmit = async title => {
    const space_id = await createSpace(title);
    dispatch({
      type: 'CREATE_SPACE',
      payload: { space_title: title, space_id }
    });
    exitEditMode();
  };

  return (
    <MenuItem>
      {!inEditMode && (
        <span
          onClick={() => {
            setEditMode(true);
          }}
        >
          <Icon className="fas fa-plus" padding="0 0.5rem 0 0" />
          Add new space
        </span>
      )}
      {inEditMode && (
        <SubMenuEditor
          handleSubmit={handleSubmit}
          handleOnBlur={exitEditMode}
        />
      )}
    </MenuItem>
  );
}

const Icon = styled.i`
  padding: ${({ padding }) => padding};
`;

export default NewSubMenu;
