import React from 'react';
import BasicErrorMessage from './basicErrorMessage.component';
import { Link } from 'react-router-dom';
import ErrorPage from './errorPage.component';

const PageNotFoundError = () => (
  <ErrorPage errorTitle="404">
    <BasicErrorMessage>
      Page not found. Please check the page address for typos or contact
      support. Click <Link to="/">here</Link> to return to the home page.
    </BasicErrorMessage>
  </ErrorPage>
);

export default PageNotFoundError;
