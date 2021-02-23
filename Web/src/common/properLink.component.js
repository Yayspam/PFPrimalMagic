import React from 'react';
import { NavLink } from 'react-router-dom';

const ProperLink = ({ to, ...otherProps }) => {
  return <NavLink to={to} {...otherProps}></NavLink>;
};

export default ProperLink;
