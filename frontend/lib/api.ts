import { MasterCVData, TailorResult, TemplateMeta } from '@/types/cv';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function parseCV(file: File): Promise<MasterCVData> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_URL}/api/parse`, { method: 'POST', body: formData });
  if (!response.ok) throw new Error('Failed to parse CV.');
  return response.json();
}

export async function regenerateSummary(masterData: MasterCVData): Promise<string> {
  const response = await fetch(`${API_URL}/api/enhance/summary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ masterData })
  });
  if (!response.ok) throw new Error('Failed to regenerate summary.');
  const payload = await response.json();
  return payload.summary;
}

export async function generateBullets(jobTitle: string, company: string): Promise<string[]> {
  const response = await fetch(`${API_URL}/api/enhance/bullets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobTitle, company })
  });
  if (!response.ok) throw new Error('Failed to generate bullets.');
  const payload = await response.json();
  return payload.responsibilities;
}

export async function tailorCV(masterData: MasterCVData, jobDescription: string): Promise<TailorResult> {
  const response = await fetch(`${API_URL}/api/tailor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ masterData, jobDescription })
  });
  if (!response.ok) throw new Error('Failed to tailor CV.');
  return response.json();
}

export async function fetchTemplates(): Promise<TemplateMeta[]> {
  const response = await fetch(`${API_URL}/api/templates`);
  if (!response.ok) throw new Error('Failed to load templates.');
  return response.json();
}

export async function renderPDF(payload: { masterData: MasterCVData; templateName: string; sectionsSelected?: string[] }) {
  const response = await fetch(`${API_URL}/api/render`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Failed to render PDF.');
  return response.blob();
}
