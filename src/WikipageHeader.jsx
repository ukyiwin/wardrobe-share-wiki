import React, { useContext } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import PageHeader from './common/PageHeader';
import Icon from './common/Icon';

import { MenuStateContext } from './MenuStateContext';
import { deletePage } from './api';

function WikiPage({ match, history, title = '', handleError }) {
  const { dispatch } = useContext(MenuStateContext);

  const { space } = match.params;
  const space_id = parseInt(match.params.space_id, 10);
  const id = parseInt(match.params.wikipage_id, 10);

  const handleDeletePage = async () => {
    try {
      await deletePage(id);
      dispatch({
        type: 'DELETE_PAGE',
        payload: { space_id, id }
      });
      history.push('/');
    } catch {
      handleError();
    }
  };

  return (
    <PageHeader>
      <h1>{title}</h1>
      <SettingsContainer>
        <Settings>
          <Link to={`/${space}/${space_id}/${title}/${id}/edit`}>
            Edit
            <Icon
              className="fas fa-pencil-alt"
              fontSize="1.2rem"
              margin="left"
            />
          </Link>
        </Settings>
        <Settings onClick={handleDeletePage}>
          Delete
          <Icon className="fas fa-trash-alt" fontSize="1.2rem" margin="left" />
        </Settings>
      </SettingsContainer>
    </PageHeader>
  );
}
const SettingsContainer = styled.ul`
  list-style: none;
`;

const Settings = styled.li`
  padding: 0 1rem;
  display: inline-block;
  cursor: pointer;
`;

export default withRouter(WikiPage);
