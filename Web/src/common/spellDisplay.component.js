import React, { Fragment } from 'react';
import VM, { cl, time } from './variableMark.component';

const Spell = ({ name, linkName, casterLevel, save, saveType, duration }) => {
  return (
    <Fragment>
      <a
        href={`https://aonprd.com/SpellDisplay.aspx?ItemName=${encodeURIComponent(
          linkName ?? name
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>{' '}
      spell (<VM v={casterLevel} u={cl} />
      {duration || save ? '; ' : ''}
      {duration && <VM v={duration} u={time} />}
      {duration && save ? '; ' : ''}
      {save && <VM v={save} u={saveType} />})
    </Fragment>
  );
};

Spell.defaultProps = {
  linkName: undefined,
  save: undefined,
  duration: undefined,
};

export default Spell;
