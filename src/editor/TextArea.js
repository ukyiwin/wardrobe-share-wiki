const TextArea = `
width: 100%;
flex: 1 1 0;
border: ${({ theme }) => `1px solid ${theme.color.primary}`};
padding: 0.5rem 1rem;
overflow-y: auto;
box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
margin-bottom: 0.8rem;
color: ${({ theme }) => theme.color.text};
`;

export default TextArea;
