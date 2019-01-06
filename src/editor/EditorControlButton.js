import styled from 'styled-components';

const EditorControlButton = styled.li`
  margin: 0 0.5rem;
  width: 2rem;
  border-radius: 0.2rem;
  display: inline-block;
  color: ${({ theme, active }) =>
    active ? theme.color.primary : theme.color.background};
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 2rem;
  cursor: pointer;
  text-align: center;
  background-color: ${({ theme, active }) =>
    active ? theme.color.background : 'transparent'};
`;

export default EditorControlButton;
