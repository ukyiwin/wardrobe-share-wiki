import styled from 'styled-components';

const Icon = styled.i`
  /* set right or left margin to 0.5 if props have been passed */
  ${({ margin }) => (margin ? `margin-${margin}: 0.5rem` : null)};
  /* set font-size if props have been passed else leave as inherit */
  ${({ fontSize }) => (fontSize ? `font-size: ${fontSize}` : null)};
  cursor: pointer;
`;

export default Icon;
