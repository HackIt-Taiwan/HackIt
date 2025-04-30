import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HackIt - 青少年駭客社群',
  description: '由台灣青少年為青少年打造的程式社群，一起創造、學習、分享程式的樂趣！',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-light min-h-screen antialiased">
        <div className="absolute w-full h-40 top-0 left-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
        <div className="min-h-screen relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
} 