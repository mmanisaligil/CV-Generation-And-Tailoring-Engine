from pydantic import BaseModel, Field


class EducationItem(BaseModel):
    school: str
    degree: str
    startDate: str
    endDate: str


class ExperienceItem(BaseModel):
    role: str
    company: str
    startDate: str
    endDate: str
    responsibilities: list[str] = Field(default_factory=list, min_length=5, max_length=5)


class MasterCVData(BaseModel):
    fullName: str
    email: str
    phone: str
    summary: str
    education: list[EducationItem]
    experience: list[ExperienceItem]
    skills: list[str]
    certificates: list[str]
    languages: list[str]
    awards: list[str]


class SummaryRequest(BaseModel):
    masterData: MasterCVData


class SummaryResponse(BaseModel):
    summary: str


class BulletsRequest(BaseModel):
    jobTitle: str
    company: str


class BulletsResponse(BaseModel):
    responsibilities: list[str] = Field(min_length=5, max_length=5)


class TailorRequest(BaseModel):
    masterData: MasterCVData
    jobDescription: str


class TailorResponse(BaseModel):
    tailoredData: MasterCVData
    matchScore: int
    keywords: list[str]


class RenderRequest(BaseModel):
    masterData: MasterCVData
    templateName: str
    sectionsSelected: list[str] | None = None


class TemplateMeta(BaseModel):
    id: str
    name: str
    tier: str
    description: str
    texFile: str
