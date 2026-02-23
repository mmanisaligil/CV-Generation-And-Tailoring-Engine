'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseCV } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useCVStore, sampleMasterData } from '@/store/useCVStore';

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Upload CV or LinkedIn Screenshot');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const setMasterData = useCVStore((s) => s.setMasterData);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setLoading(true);
    setMessage('Analyzing with AI magic...');
    await new Promise((r) => setTimeout(r, 3000));
    try {
      const parsed = await parseCV(file);
      setMasterData(parsed);
    } catch {
      setMasterData(sampleMasterData);
    }
    router.push('/editor');
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold">Vibecoding CV Engine</h1>
      <p className="max-w-lg text-slate-600">Drop your CV and jump straight into a pre-filled editor in seconds.</p>
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full rounded-xl border-2 border-dashed border-slate-300 bg-white p-16 text-lg"
      >
        {loading ? '✨ ' + message : message}
      </button>
      <input ref={inputRef} type="file" accept=".pdf,image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      <Button onClick={() => handleFile(new File(['mock'], 'mock.pdf', { type: 'application/pdf' }))} disabled={loading}>
        Try Demo Flow
      </Button>
    </main>
  );
}
