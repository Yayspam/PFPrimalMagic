import React, { Fragment } from 'react';
import VM, { cl, time } from './variableMark.component';

const Spell = ({ link, name, casterLevel, save, saveType, duration }) => {
  return (
    <Fragment>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {name}
      </a>{' '}
      spell (<VM v={casterLevel} u={cl} />
      {duration || save ? '; ' : ''}
      {duration && <VM v={duration} u={time} />}
      {duration ? '; ' : ''}
      {save && <VM v={save} u={saveType} />}
      {save ? ';' : ''}
      ).
    </Fragment>
  );
};

Spell.defaultProps = {
  duration: undefined,
};

export default Spell;
