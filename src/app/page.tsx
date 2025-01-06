'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import dynamic from 'next/dynamic';

const LocationMap = dynamic(
  () => import('@/components/Maps/LocationMap').then((mod) => mod.LocationMap),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <LocationMap />
      </div>
    </main>
  )
}
