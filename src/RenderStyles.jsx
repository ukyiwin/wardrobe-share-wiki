import React from 'react';

const styles = {
  code: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Anonymous Pro", monospace',
    padding: '0.1rem'
  }
};

const addBreaklines = children =>
  children.map((child, index) => [child, <br key={index} />]);

const renderers = {
  inline: {
    BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
    ITALIC: (children, { key }) => <em key={key}>{children}</em>,
    UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
    CODE: (children, { key }) => (
      <span key={key} style={styles.code}>
        {children}
      </span>
    )
  },
  blocks: {
    unstyled: (children, { keys }) =>
      children.map((child, index) => <p key={keys[index]}>{child}</p>),
    blockquote: (children, { keys }) =>
      children.map((child, index) => (
        <blockquote key={keys[index]} className="blockquote">
          {addBreaklines(child)}
        </blockquote>
      )),
    'header-one': (children, { keys }) =>
      children.map((child, index) => <h1 key={keys[index]}>{child}</h1>),
    'header-two': (children, { keys }) =>
      children.map((child, index) => <h2 key={keys[index]}>{child}</h2>),
    'header-three': (children, { keys }) =>
      children.map((child, index) => <h3 key={keys[index]}>{child}</h3>),
    'header-four': (children, { keys }) =>
      children.map((child, index) => <h4 key={keys[index]}>{child}</h4>),
    'header-five': (children, { keys }) =>
      children.map((child, index) => <h5 key={keys[index]}>{child}</h5>),
    'header-six': (children, { keys }) =>
      children.map((child, index) => <h6 key={keys[index]}>{child}</h6>),
    'code-block': (children, { keys }) =>
      children.map((child, index) => (
        <pre className="codeblock" key={keys[index]}>
          {addBreaklines(child)}
        </pre>
      )),
    'unordered-list-item': (children, { depth, keys }) => (
      <ul key={keys[keys.length - 1]} className={`ul-level-${depth}`}>
        {children.map((child, index) => (
          <li key={keys[index]}>{child}</li>
        ))}
      </ul>
    ),
    'ordered-list-item': (children, { depth, keys }) => (
      <ol key={keys.join('|')} className={`ol-level-${depth}`}>
        {children.map((child, index) => (
          <li key={keys[index]}>{child}</li>
        ))}
      </ol>
    )
  }
};

export default renderers;
