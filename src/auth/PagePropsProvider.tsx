import React, { createContext, useContext } from 'react';

const PagePropsContext = createContext(null);

export const usePageProps = () => useContext(PagePropsContext);

export const PagePropsProvider = ({ children, pageProps }:any) => (
  <PagePropsContext.Provider value={pageProps}>
    {children}
  </PagePropsContext.Provider>
);