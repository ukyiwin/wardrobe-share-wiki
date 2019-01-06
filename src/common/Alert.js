import styled from 'styled-components';

const Alert = styled.div`
  margin: 0.5rem 0;
  padding: ${({ invert }) => (invert ? '1rem' : 0)};
  color: ${({ theme, invert }) =>
    invert ? theme.color.background : theme.color.tertiary};
  background-color: ${({ theme, invert }) =>
    invert ? theme.color.tertiary : null};
  font-size: 1.2rem;
`;

export default Alert;
