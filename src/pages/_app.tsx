import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../store";
import AuthProvider from "../auth/AuthProvider";
import { PagePropsProvider } from "../auth/PagePropsProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ErrorBoundary from "../components/ErrorBoundary";
import { getMenuRoutes } from "../utils/api/Httproutes";
import Login from "../components/Login";
import { useRouter } from 'next/router';
import { ThemeProvider } from "next-themes";


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isSpecialPage = router.pathname.includes('webstories/view') ;
  const isCeckoutPage = router.pathname.includes('check-out') ;
  
  return (
    <>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

    <PagePropsProvider pageProps={pageProps} >
      <AuthProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          {() => (
              <>
          <ErrorBoundary>
                {!isSpecialPage && <Header />}
                {!isSpecialPage && <Loader /> }
                {!isSpecialPage && <Login />}
                  <Component {...pageProps} />
                {!isSpecialPage && !isCeckoutPage && <Footer />}
                </ErrorBoundary>
                </>
            )}
          </PersistGate>
        </Provider>
      </AuthProvider>
    </PagePropsProvider>
    </ThemeProvider>

    </>
  )
}

