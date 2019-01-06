import styled from 'styled-components';

const TitleInput = styled.input`
  margin-bottom: 0.8rem;
  padding: 0 1rem;
  height: 2.5rem;
  border: ${({ theme }) => `1px solid ${theme.color.primary}`};
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  outline: none;
  color: ${({ theme }) => theme.color.text};
`;

export default TitleInput;
