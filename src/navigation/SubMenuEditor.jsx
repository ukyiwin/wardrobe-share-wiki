import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import TitleInput from '../common/TitleInput';
import Icon from '../common/Icon';
import Alert from '../common/Alert';

import { TITLE_INPUT_CHAR_LIMIT } from '../const';

function SubMenuEditor({
  handleSubmit,
  initialValue = '',
  handleOnBlur,
  display,
  error
}) {
  const [title, setTitle] = useState(initialValue);
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.select();
    // clear title when component unmounts
    return () => setTitle('');
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
  };

  return (
    <>
      <InputContainer onClick={e => e.stopPropagation()}>
        <TitleInput
          ref={inputEl}
          placeholder="Space name"
          onKeyPress={handleKeyChange}
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
          onBlur={handleOnBlur}
          maxlength={TITLE_INPUT_CHAR_LIMIT}
        />
        <Icon
          className="fas fa-arrow-alt-circle-right"
          onMouseDown={onSubmit}
          margin="left"
        />
      </InputContainer>
      {error && <Alert>Oh no! An error occured!</Alert>}
    </>
  );
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  justify-content
`;

export default SubMenuEditor;
