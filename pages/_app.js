import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import theme from '@/theme/theme';
import Header from '@/components/header';
import BottomNav from '@/components/bottomNav';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <header>
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
  );
}
