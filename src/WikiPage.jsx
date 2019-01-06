import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { MenuStateContext } from './MenuStateContext';
import { loadPage, deletePage } from './api';
import renderers from './RenderStyles';
import redraft from 'redraft';
import PageHeader from './PageHeader';

function WikiPage(props) {
  const { match, history } = props;
  const { dispatch } = useContext(MenuStateContext);

  const { space, wikipage_title } = match.params;
  const space_id = parseInt(match.params.space_id, 10);
  const id = parseInt(match.params.wikipage_id, 10);
  const [pageData, setPageData] = useState({});

  const {
    content = '',
    created_at = '',
    updated_at = '',
    title = ''
  } = pageData;

  const fetchPage = async id => {
    const page = await loadPage(id);
    setPageData(page);
  };

  useEffect(
    () => {
      fetchPage(id);
    },
    [id]
  );

  const renderWarning = () => {
    return <div>This wikipage is empty or there was an error</div>;
  };
  const handleDeletePage = async () => {
    await deletePage(id);
    dispatch({
      type: 'DELETE_PAGE',
      payload: { space_id, id }
    });
    history.push('/');
  };

  const rendered = content ? redraft(content, renderers) : null;
  return (
    <Container>
      <PageHeader>
        <h1>{title}</h1>
        <SettingsContainer>
          <Settings>
            <Link to={`/${space}/${space_id}/${wikipage_title}/${id}/edit`}>
              Edit <Icon className="fas fa-pencil-alt" />
            </Link>
          </Settings>
          <Settings onClick={handleDeletePage}>
            Delete <Icon className="fas fa-trash-alt" />
          </Settings>
        </SettingsContainer>
      </PageHeader>
      <p>{created_at}</p>
      <p>{updated_at}</p>

      <ContentContainer>
        {rendered ? rendered : renderWarning()}
      </ContentContainer>
    </Container>
  );
}
const Container = styled.div`
  padding: 2rem 3rem;
  color: ${({ theme }) => theme.color.text};
  width: 100%;
`;

const SettingsContainer = styled.ul`
  list-style: none;
`;

const Settings = styled.li`
  padding: 0 1rem;
  display: inline-block;
  cursor: pointer;
`;

const Icon = styled.i`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.primary};
  margin-left: 0.5rem;
`;

const ContentContainer = styled.div``;

export default withRouter(WikiPage);
