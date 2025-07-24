import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('UA-57647446-1'); // Replace with your Google Analytics Tracking ID
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
