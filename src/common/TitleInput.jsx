import styled from 'styled-components';
import { hexToRgba } from '../utils';

const TitleInput = styled.input`
  padding: 0 1rem;
  height: ${({ big }) => (big ? '2.5rem' : '1.5rem')};
  border: ${({ theme }) => `1px solid ${theme.color.primary}`};
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  font-size: ${({ big }) => (big ? '1.5rem' : '1rem')};
  outline: none;
  color: ${({ theme }) => theme.color.text};
  ::placeholder {
    color: ${({ theme }) => hexToRgba(theme.color.text, 0.5)}};
  }
`;

export default TitleInput;
