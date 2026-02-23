'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { generateBullets, regenerateSummary } from '@/lib/api';
import { useCVStore } from '@/store/useCVStore';

export default function EditorPage() {
  const router = useRouter();
  const masterData = useCVStore((s) => s.masterData);
  const setMasterData = useCVStore((s) => s.setMasterData);
  const [activeTab, setActiveTab] = useState('personal');
  const tabs = useMemo(() => ['personal', 'summary', 'experience', 'education', 'skills'], []);

  if (!masterData) return <div className="p-6">No CV loaded yet.</div>;

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Master Profile Editor</h1>
      <div className="mb-6 flex gap-2">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-md px-3 py-2 text-sm ${activeTab === tab ? 'bg-slate-900 text-white' : 'bg-white'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'personal' && (
        <div className="grid gap-3 rounded-md bg-white p-4">
          <Input value={masterData.fullName} onChange={(e) => setMasterData({ ...masterData, fullName: e.target.value })} />
          <Input value={masterData.email} onChange={(e) => setMasterData({ ...masterData, email: e.target.value })} />
          <Input value={masterData.phone} onChange={(e) => setMasterData({ ...masterData, phone: e.target.value })} />
        </div>
      )}

      {activeTab === 'summary' && (
        <div className="space-y-3 rounded-md bg-white p-4">
          <Textarea value={masterData.summary} rows={6} onChange={(e) => setMasterData({ ...masterData, summary: e.target.value })} />
          <Button onClick={async () => setMasterData({ ...masterData, summary: await regenerateSummary(masterData) })}>✨ Regenerate Summary</Button>
        </div>
      )}

      {activeTab === 'experience' && (
        <div className="space-y-4 rounded-md bg-white p-4">
          {masterData.experience.map((exp, idx) => (
            <div key={idx} className="rounded border p-3">
              <p className="font-semibold">{exp.role} @ {exp.company}</p>
              <ul className="my-2 list-disc pl-5 text-sm">
                {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
              <Button onClick={async () => {
                const responsibilities = await generateBullets(exp.role, exp.company);
                const next = [...masterData.experience];
                next[idx] = { ...exp, responsibilities };
                setMasterData({ ...masterData, experience: next });
              }}>✨ Generate Bullets for This Job</Button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'education' && <pre className="rounded-md bg-white p-4 text-sm">{JSON.stringify(masterData.education, null, 2)}</pre>}
      {activeTab === 'skills' && <pre className="rounded-md bg-white p-4 text-sm">{JSON.stringify(masterData.skills, null, 2)}</pre>}

      <div className="mt-6">
        <Button onClick={() => router.push('/dashboard/templates')}>Next</Button>
      </div>
    </main>
  );
}
