import React, { Fragment } from 'react';

const AonLink = ({ name, link }) => {
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

export default AonLink;
