import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@enterprise-monorepo/ui-components";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Dashboard | Enterprise Monorepo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Welcome to your dashboard!
            </h2>
            <p className="mb-4 text-gray-600">
              This is a placeholder dashboard page. In a real application, you
              would see charts, statistics, and other important information
              here.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800">Users</h3>
                <p className="text-2xl font-bold">1,024</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-medium text-green-800">Revenue</h3>
                <p className="text-2xl font-bold">$12,670</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h3 className="font-medium text-purple-800">Active Projects</h3>
                <p className="text-2xl font-bold">7</p>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/" passHref>
                <Button
                  variant="outline"
                  size="md"
                  className="text-blue-600 hover:text-blue-800"
                  disabled={false}
                >
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
