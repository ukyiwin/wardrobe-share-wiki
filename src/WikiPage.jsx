import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import redraft from 'redraft';

import WikipageHeader from './WikipageHeader';

import { loadPage } from './api';
import renderers from './RenderStyles';
import { convertUTCToReadable } from './utils';

function WikiPage({ match, history, handleError }) {
  const [pageData, setPageData] = useState({});

  const id = parseInt(match.params.wikipage_id, 10);
  const {
    content = { blocks: [] },
    created_at = '',
    updated_at = ''
  } = pageData;

  const onError = () => {
    handleError(history);
  };

  const fetchPage = async id => {
    try {
      const page = await loadPage(id);
      setPageData(page);
    } catch {
      onError();
    }
  };

  useEffect(
    () => {
      fetchPage(id);
    },
    [id]
  );

  const rendered = redraft(content, renderers);
  const readableCreatedDate = !created_at
    ? null
    : convertUTCToReadable(created_at);
  const readableUpdatedDate = !updated_at
    ? null
    : convertUTCToReadable(updated_at);

  return (
    <>
      <WikipageHeader title={pageData.title} handleError={onError} />
      <DateContainer>
        <p>created: {readableCreatedDate}</p>
        <p>last updated: {readableUpdatedDate}</p>
      </DateContainer>
      {rendered}
    </>
  );
}

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default WikiPage;
