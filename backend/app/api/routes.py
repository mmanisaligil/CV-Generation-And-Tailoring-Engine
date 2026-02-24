from fastapi import APIRouter, File, UploadFile
from fastapi.responses import Response

from app.schemas.cv import (
    BulletsRequest,
    BulletsResponse,
    MasterCVData,
    RenderRequest,
    SummaryRequest,
    SummaryResponse,
    TailorRequest,
    TailorResponse,
    TemplateMeta,
)
from app.services.latex_renderer import render_latex_document
from app.services.mock_data import sample_master_data
from app.services.template_registry import TEMPLATES

router = APIRouter(prefix='/api', tags=['api'])


@router.post('/parse', response_model=MasterCVData)
async def parse_cv(file: UploadFile = File(...)) -> MasterCVData:
    _ = await file.read()  # placeholder for OCR/vision extraction
    return sample_master_data()


@router.post('/enhance/summary', response_model=SummaryResponse)
def enhance_summary(payload: SummaryRequest) -> SummaryResponse:
    return SummaryResponse(summary=f"{payload.masterData.summary} Improved for clarity and impact.")


@router.post('/enhance/bullets', response_model=BulletsResponse)
def enhance_bullets(payload: BulletsRequest) -> BulletsResponse:
    bullets = [
        f'Delivered measurable impact as {payload.jobTitle} at {payload.company}.',
        'Collaborated cross-functionally with product and design teams.',
        'Improved reliability through observability and testing practices.',
        'Optimized workflows to reduce cycle times and increase throughput.',
        'Mentored peers and documented team best practices.',
    ]
    return BulletsResponse(responsibilities=bullets)


@router.post('/tailor', response_model=TailorResponse)
def tailor_cv(payload: TailorRequest) -> TailorResponse:
    keywords = [k.strip('.,') for k in payload.jobDescription.split()[:8] if len(k) > 4]
    tailored = payload.masterData.model_copy(deep=True)
    tailored.summary = f"{tailored.summary} Tailored to: {', '.join(keywords[:3])}."
    return TailorResponse(tailoredData=tailored, matchScore=82, keywords=keywords[:8])


@router.post('/render')
def render_cv(payload: RenderRequest) -> Response:
    content = render_latex_document(payload)
    return Response(content=content, media_type='application/pdf', headers={'Content-Disposition': 'attachment; filename=cv.pdf'})


@router.get('/templates', response_model=list[TemplateMeta])
def list_templates() -> list[TemplateMeta]:
    return TEMPLATES
