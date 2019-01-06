import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import MenuItem from './MenuItem';
import SubMenuHeading from './SubMenuHeading';

function SubMenu({ space, children }) {
  const [displayMenu, toggleMenuDisplay] = useState(false);

  const pages = space.pages.map(page => {
    return (
      <MenuItem key={page.id} fitted={true}>
        <Link
          to={`/${space.space_title}/${space.space_id}/${page.title}/${
            page.id
          }`}
        >
          {page.title}
        </Link>
      </MenuItem>
    );
  });

  return (
    <MenuItem key={space.space_id}>
      <SubMenuHeading
        displayMenu={displayMenu}
        space={space}
        toggleMenuDisplay={() => {
          toggleMenuDisplay(prevState => !prevState);
        }}
      />
      {displayMenu && (
        <Menu>
          {pages}
          <MenuItem fitted={true}>
            <Link to={`/${space.space_title}/${space.space_id}/new`}>
              <Icon className="fas fa-plus" />
              new page
            </Link>
          </MenuItem>
        </Menu>
      )}
    </MenuItem>
  );
}

const Icon = styled.i`
  margin-right: 0.5rem;
`;

export default SubMenu;
