import { TemplateMeta } from '@/types/cv';

export const templates: TemplateMeta[] = [
  { id: 'classic-free', name: 'Classic', tier: 'free', description: 'Simple one-column professional.', thumbnail: '/templates/classic.svg' },
  { id: 'modern-blue', name: 'Modern Blue', tier: 'tier2', description: 'Modern with accent color.', thumbnail: '/templates/modern-blue.svg' },
  { id: 'minimal-grid', name: 'Minimal Grid', tier: 'tier2', description: 'Compact and ATS friendly.', thumbnail: '/templates/minimal-grid.svg' },
  { id: 'executive', name: 'Executive', tier: 'tier2', description: 'Polished executive style.', thumbnail: '/templates/executive.svg' },
  { id: 'creative', name: 'Creative', tier: 'tier3', description: 'Visual style for portfolios.', thumbnail: '/templates/creative.svg' },
  { id: 'research', name: 'Research', tier: 'tier3', description: 'Academic focused layout.', thumbnail: '/templates/research.svg' },
  { id: 'compact-pro', name: 'Compact Pro', tier: 'tier3', description: 'Dense one-page format.', thumbnail: '/templates/compact-pro.svg' },
  { id: 'startup', name: 'Startup', tier: 'tier3', description: 'Fast-growth company style.', thumbnail: '/templates/startup.svg' },
  { id: 'enterprise', name: 'Enterprise', tier: 'tier3', description: 'Formal enterprise format.', thumbnail: '/templates/enterprise.svg' },
  { id: 'international', name: 'International', tier: 'tier3', description: 'Global job market optimized.', thumbnail: '/templates/international.svg' },
  { id: 'leadership', name: 'Leadership', tier: 'tier3', description: 'Leadership and impact first.', thumbnail: '/templates/leadership.svg' }
];

export const tierRank = { free: 1, tier2: 2, tier3: 3 } as const;
