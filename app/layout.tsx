import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { Providers } from './providers';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head title="عروسی عاطفه و آرین">
        <title>عروسی عاطفه و آرین</title>
        <link
          href="https://fontfont.ir/fonts/yekan/yekan.ttf"
          rel="stylesheet"
        />
      </head>
      <body
        className={clsx(
          'min-h-screen h-screen bg-background font-sans antialiased [&>div]:h-full',
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <div className="relative flex flex-col h-full">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
