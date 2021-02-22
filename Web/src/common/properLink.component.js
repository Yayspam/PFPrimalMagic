import React from 'react';
import { NavLink } from 'react-router-dom';

const ProperLink = ({ to, ...otherProps }) => {
  return (
    <NavLink to={`${process.env.PUBLIC_URL}${to}`} {...otherProps}></NavLink>
  );
};

export default ProperLink;
