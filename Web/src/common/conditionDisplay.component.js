import React, { Fragment } from 'react';

const Condition = ({ name }) => {
  return (
    <Fragment>
      <mark>
        <a
          href={`https://aonprd.com/Rules.aspx?Name=Conditions&Category=Combat#ctl00_MainContent_RulesResult:~:text=${name}:`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </a>
      </mark>
    </Fragment>
  );
};

export default Condition;
