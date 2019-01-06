import React, { useState, useContext } from 'react';

import MenuItem from './MenuItem';
import SubMenuEditor from './SubMenuEditor';
import Icon from '../common/Icon';

import { MenuStateContext } from '../MenuStateContext';
import { createSpace } from '../api';
import { handleError } from '../utils';

function NewSubMenu() {
  const [inEditMode, setEditMode] = useState(false);
  const [error, setError] = useState(false);
  const { dispatch } = useContext(MenuStateContext);

  const exitEditMode = () => {
    setEditMode(false);
  };

  const handleSubmit = async title => {
    try {
      const space_id = await createSpace(title);
      dispatch({
        type: 'CREATE_SPACE',
        payload: { space_title: title, space_id }
      });
    } catch {
      handleError(setError);
    }
  };

  return (
    <MenuItem>
      {!inEditMode && (
        <span
          onClick={() => {
            setEditMode(true);
          }}
        >
          <Icon className="fas fa-plus" margin="right" />
          Add new space
        </span>
      )}
      {inEditMode && (
        <SubMenuEditor
          handleSubmit={handleSubmit}
          handleOnBlur={exitEditMode}
          error={error}
        />
      )}
    </MenuItem>
  );
}

export default NewSubMenu;
