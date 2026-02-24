'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { renderPDF } from '@/lib/api';
import { useCVStore } from '@/store/useCVStore';

const defaultSections = ['summary', 'experience', 'education', 'skills'];

export default function ExportPage() {
  const masterData = useCVStore((s) => s.masterData);
  const selectedTemplate = useCVStore((s) => s.selectedTemplate);
  const [sections, setSections] = useState(defaultSections);
  const [onePage, setOnePage] = useState(true);

  const toggle = (section: string) => {
    setSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]));
  };

  const compile = async () => {
    if (!masterData) return;
    const blob = await renderPDF({
      masterData,
      templateName: selectedTemplate?.id || 'classic-free',
      sectionsSelected: onePage ? sections : undefined
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cv.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Export CV</h1>
      {defaultSections.map((section) => (
        <label key={section} className="flex items-center gap-2">
          <input type="checkbox" checked={sections.includes(section)} onChange={() => toggle(section)} />
          {section}
        </label>
      ))}
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={onePage} onChange={(e) => setOnePage(e.target.checked)} />
        1-page mode
      </label>
      <Button onClick={compile}>Compile LaTeX to PDF</Button>
    </div>
  );
}
