import { css } from 'styled-components';

const TextArea = css`
  outline: none;
  padding: 0.5rem 1rem;
  width: 100%;
  flex: 1 1 0;
  overflow-y: auto;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.color.text};
  border: ${({ theme }) => `1px solid ${theme.color.primary}`};
`;

export default TextArea;
