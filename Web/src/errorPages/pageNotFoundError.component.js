import React from 'react';
import BasicErrorMessage from './basicErrorMessage.component';
import ErrorPage from './errorPage.component';
import ProperLink from '../common/properLink.component';

const PageNotFoundError = () => (
  <ErrorPage errorTitle="404">
    <BasicErrorMessage>
      Page not found. Please check the page address for typos. Click{' '}
      <ProperLink to="/">here</ProperLink> to return to the home page.
    </BasicErrorMessage>
  </ErrorPage>
);

export default PageNotFoundError;
