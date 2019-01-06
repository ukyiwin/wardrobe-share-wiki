import styled from 'styled-components';

const Menu = styled.ul`
  margin: 0;
  padding: 0 0 0 1rem;
  text-align: left;
  list-style: none;
  font-size: 1.5rem;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.color.background};
`;

export default Menu;
