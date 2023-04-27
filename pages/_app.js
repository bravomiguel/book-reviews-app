import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux';

import { store } from '@/redux/app/store';
import theme from '@/theme/theme';
import Header from '@/components/header';
import BottomNav from '@/components/bottomNav';
import '../styles/globals.css';
import OfflineWarner from '@/components/offlineWarner';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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
                <Component {...pageProps} />
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
