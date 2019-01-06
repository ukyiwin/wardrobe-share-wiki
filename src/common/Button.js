import styled from 'styled-components';

const Button = styled.button`
  margin-left: auto;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.background}
  font-family: ${({ theme }) => theme.font.secondary}
  font-size: 1rem;
  letter-spacing: 0.1rem;
  cursor: pointer;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
`;

export default Button;
