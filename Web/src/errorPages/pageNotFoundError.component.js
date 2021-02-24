import React from 'react';
import BasicErrorMessage from './basicErrorMessage.component';
import ErrorPage from './errorPage.component';
import { NavLink } from 'react-router-dom';

const PageNotFoundError = () => (
  <ErrorPage errorTitle="404">
    <BasicErrorMessage>
      Page not found. Please check the page address for typos. Click{' '}
      <NavLink to="/">here</NavLink> to return to the home page.
    </BasicErrorMessage>
  </ErrorPage>
);

export default PageNotFoundError;
