'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { tailorCV } from '@/lib/api';
import { useCVStore } from '@/store/useCVStore';

export default function TailorPage() {
  const router = useRouter();
  const masterData = useCVStore((s) => s.masterData);
  const setMasterData = useCVStore((s) => s.setMasterData);
  const jobDescription = useCVStore((s) => s.jobDescription);
  const setJobDescription = useCVStore((s) => s.setJobDescription);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [previewApplied, setPreviewApplied] = useState(false);

  const analyze = async () => {
    if (!masterData || !jobDescription.trim()) return;
    const result = await tailorCV(masterData, jobDescription);
    setMatchScore(result.matchScore);
    setKeywords(result.keywords);
    setMasterData(result.tailoredData);
    setPreviewApplied(true);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">JD Tailoring</h1>
      <Textarea rows={10} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste job description" />
      <Button onClick={analyze}>Analyze Fit</Button>
      {matchScore !== null && (
        <div className="rounded bg-white p-4">
          <p>Match score: <strong>{matchScore}%</strong></p>
          <p className="text-sm">Keywords: {keywords.join(', ')}</p>
          <Button className="mt-3" onClick={() => setPreviewApplied(true)}>Accept All Changes</Button>
        </div>
      )}
      <Button onClick={() => router.push('/dashboard/export')} disabled={!previewApplied}>Proceed to Export</Button>
    </div>
  );
}
