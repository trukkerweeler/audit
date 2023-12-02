import '@/styles/globals.css'
import '@fontsource/poppins'
import type { AppProps } from 'next/app';
import type { ServerRouter } from '@/server/router'
import { createTRPCNext } from '@trpc/next';
import { httpBatchLink } from '@trpc/client';
import App from '../components/App';

function getBaseUrl() {
  if (typeof window === 'undefined') {
    return process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : `http://localhost:3000/api/trpc`
  }
  return '/api/trpc'
}

const { withTRPC } = createTRPCNext<ServerRouter>({
  config({ ctx }) {
    const links = [
      httpBatchLink({
        url: getBaseUrl(),
      }),
    ];
    return { links };
  },
  ssr: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <App>
    <Component {...pageProps} />
  </App>
  );

}

export default withTRPC(MyApp);
