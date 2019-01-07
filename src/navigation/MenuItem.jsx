import styled from 'styled-components';

const MenuItem = styled.li`
  font-size: 1.2rem;
  padding: ${({ fitted }) => (fitted ? '0.5rem' : '1rem')} 0 0 0;
  user-select: none;
`;

export default MenuItem;
