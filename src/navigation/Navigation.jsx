import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import SubMenu from './SubMenu';
import NewSubMenu from './NewSubMenu';
import { MenuStateContext } from '../MenuStateContext';
import { loadMenu } from '../api';

function Navigation() {
  const { state, dispatch } = useContext(MenuStateContext);

  const fetchMenu = async () => {
    const menu = await loadMenu();
    dispatch({ type: 'LOAD_MENU', payload: { menu } });
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const menuItems = state.menu.map(space => (
    <SubMenu key={space.space_id} space={space} />
  ));
  return (
    <Container>
      <Title>
        <Link to="/">Wardrobe Share Ltd.</Link>
      </Title>
      <Menu>
        {menuItems}
        <NewSubMenu />
      </Menu>
    </Container>
  );
}

const Container = styled.aside`
  padding: 1rem;
  width: 30%;
  max-width: 300px;
  height: 100vh;
  background-image: ${({ theme }) => `linear-gradient(135deg,
     ${theme.color.primary},
    ${theme.color.secondary})`};
  color: ${({ theme }) => theme.color.background};
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Title = styled.h1`
  margin: 0;
  padding: 1rem;
  text-align: left;
  font-family: ${({ theme }) => theme.font.secondary};
  color: ${({ theme }) => theme.color.background};
`;

export default Navigation;
