import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

function SubMenuEditor({
  handleSubmit,
  initialValue = '',
  handleOnBlur,
  display
}) {
  const [title, setTitle] = useState(initialValue);
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.select();
  }, []);

  const handleKeyChange = e => {
    if (e.key === 'Enter') {
      onSubmit(e);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(title);
    setTitle('');
  };

  return (
    <InputContainer onClick={e => e.stopPropagation()}>
      <Input
        ref={inputEl}
        placeholder="Space name"
        onKeyPress={handleKeyChange}
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
        onBlur={handleOnBlur}
      />
      <Icon className="fas fa-arrow-alt-circle-right" onMouseDown={onSubmit} />
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
`;

const Icon = styled.i`
  margin-left: 0.5rem;
`;

const Input = styled.input`
  flex: 1 1 0;
  height: 1.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.text};
  outline: none;
`;

export default SubMenuEditor;
