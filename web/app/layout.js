import './globals.css';
import { LanguageProvider } from '../components/LanguageProvider';

export const metadata = {
  title: 'SPM Design Solutions — Time-Saving Automation & Software for Engineering Teams',
  description:
    'SPM Design Solutions builds CAD automation, AI workflows and custom productivity apps — document management, Gantt planning and more — that cut 40–70% of repetitive work for engineering teams.',
  icons: {
    icon: '/assets/brand/spm-icon-256.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
