import Axios from 'axios';

export const loadMenu = async () => {
  try {
    const response = await Axios.get(
      `${process.env.REACT_APP_ENDPOINT}/spaces`
    );
    return response.data;
  } catch {
    return null;
  }
};

export const createSpace = async title => {
  try {
    const response = await Axios.post(
      `${process.env.REACT_APP_ENDPOINT}/spaces`,
      { title }
    );
    return response.data.id;
  } catch {
    return null;
  }
};

export const updateSpace = async ({ space_id, title }) => {
  try {
    await Axios.put(`${process.env.REACT_APP_ENDPOINT}/spaces/${space_id}`, {
      title
    });
  } catch {
    return null;
  }
};

export const deleteSpace = async space_id => {
  try {
    await await Axios.delete(
      `${process.env.REACT_APP_ENDPOINT}/spaces/${space_id}`
    );
  } catch {
    return null;
  }
};

export const loadPages = async () => {
  try {
    const response = await Axios.get(
      `${process.env.REACT_APP_ENDPOINT}/wikipages`
    );
    return response.data;
  } catch {
    return null;
  }
};

export const loadPage = async id => {
  try {
    const response = await Axios.get(
      `${process.env.REACT_APP_ENDPOINT}/wikipages/${id}`
    );
    return response.data[0];
  } catch {
    return null;
  }
};

export const createPage = async ({ title, content, space_id }) => {
  try {
    const response = await Axios.post(
      `${process.env.REACT_APP_ENDPOINT}/wikipages`,
      {
        title,
        content,
        space_id
      }
    );
    return response.data.id;
  } catch {
    return null;
  }
};

export const updatePage = async ({ id, title, content, space_id }) => {
  try {
    await Axios.put(`${process.env.REACT_APP_ENDPOINT}/wikipages/${id}`, {
      title,
      content
    });
  } catch {
    return null;
  }
};

export const deletePage = async id => {
  try {
    await Axios.delete(`${process.env.REACT_APP_ENDPOINT}/wikipages/${id}`);
  } catch {
    return null;
  }
};
