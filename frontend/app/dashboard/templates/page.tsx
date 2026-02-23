'use client';

import { useRouter } from 'next/navigation';
import { templates, tierRank } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { useCVStore } from '@/store/useCVStore';

export default function TemplatesPage() {
  const router = useRouter();
  const userTier = useCVStore((s) => s.userTier);
  const selected = useCVStore((s) => s.selectedTemplate);
  const setSelectedTemplate = useCVStore((s) => s.setSelectedTemplate);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Template Gallery</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {templates.map((tpl) => {
          const locked = tierRank[userTier] < tierRank[tpl.tier];
          return (
            <div key={tpl.id} className="rounded-lg border bg-white p-4">
              <img src={tpl.thumbnail} alt={`${tpl.name} template preview`} className="mb-3 h-36 w-full rounded border object-cover" />
              <h3 className="font-semibold">{tpl.name}</h3>
              <p className="text-sm text-slate-600">{tpl.description}</p>
              {locked ? (
                <p className="mt-2 text-xs text-amber-600">Locked — upgrade required</p>
              ) : (
                <Button className="mt-3" onClick={() => setSelectedTemplate(tpl)}>
                  {selected?.id === tpl.id ? 'Selected' : 'Select'}
                </Button>
              )}
            </div>
          );
        })}
      </div>
      <Button className="mt-6" onClick={() => router.push(userTier === 'tier3' ? '/dashboard/tailor' : '/dashboard/export')}>
        Next
      </Button>
    </div>
  );
}
