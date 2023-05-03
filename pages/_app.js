import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux';
import { useState } from 'react';
import {
  // Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { store } from '@/redux/app/store';
import theme from '@/theme/theme';
import Header from '@/components/header';
import BottomNav from '@/components/bottomNav';
import '../styles/globals.css';
import OfflineWarner from '@/components/offlineWarner';
import SnackBar from '@/components/snackbar';
import { QueryBoundary } from '@/components/queryBoundary';

export default function App({ Component, pageProps }) {
  // const [queryClient] = useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           suspense: true,
  //         },
  //       },
  //     }),
  // );
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Provider store={store}>
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <title>Lolo's Reads</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <header>
              <OfflineWarner />
              <Header />
            </header>
            <main>
              <Container
                maxWidth="md"
                sx={{
                  pt: '6em',
                  pb: { xs: '4em', sm: '8em' },
                }}
              >
                <QueryClientProvider client={queryClient}>
                  <QueryBoundary>
                    {/* <Hydrate state={pageProps.dehydratedState}> */}
                      <Component {...pageProps} />
                    {/* </Hydrate> */}
                  </QueryBoundary>
                  <ReactQueryDevtools />
                </QueryClientProvider>
                <SnackBar />
              </Container>
            </main>
            <footer>
              <BottomNav />
            </footer>
          </CssBaseline>
        </ThemeProvider>
      </Provider>
    </>
  );
}
