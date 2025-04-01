import { Button } from '@enterprise-monorepo/ui-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    console.log('Get Started button clicked!');
    // For now, we'll just navigate to a placeholder dashboard
    router.push('/dashboard');
  };

  const handleDocumentation = () => {
    console.log('Documentation button clicked!');
    // Open documentation in a new tab
    window.open('https://github.com/yourusername/enterprise-monorepo', '_blank');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Enterprise Monorepo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Enterprise Monorepo</span>
        </h1>

        <p className="mt-3 text-2xl">
          A production-ready monorepo architecture for enterprise applications
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-center sm:w-full">
          <Button
            variant="primary"
            size="lg"
            className="m-2"
            disabled={false}
            onClick={handleGetStarted}
          >
            Get Started
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="m-2"
            disabled={false}
            onClick={handleDocumentation}
          >
            Documentation
          </Button>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center"
          href="https://github.com/yourusername/enterprise-monorepo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Enterprise Monorepo
        </a>
      </footer>
    </div>
  );
}
