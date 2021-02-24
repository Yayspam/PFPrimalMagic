import React, { Fragment } from 'react';

const AonLink = ({ name, link, noHighlight }) => {
  if (noHighlight) {
    return (
      <Fragment>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <mark>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </mark>
    </Fragment>
  );
};

AonLink.defaultProps = {
  noHighlight: false,
};

export default AonLink;
