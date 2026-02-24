export type UserTier = 'free' | 'tier2' | 'tier3';

export interface ExperienceItem {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface MasterCVData {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: string[];
  certificates: string[];
  languages: string[];
  awards: string[];
}

export interface TemplateMeta {
  id: string;
  name: string;
  tier: UserTier;
  description: string;
  thumbnail: string;
}

export interface TailorResult {
  tailoredData: MasterCVData;
  matchScore: number;
  keywords: string[];
}
