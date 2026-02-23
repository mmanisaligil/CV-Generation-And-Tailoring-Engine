from app.schemas.cv import TemplateMeta


TEMPLATES: list[TemplateMeta] = [
    TemplateMeta(id='classic-free', name='Classic', tier='free', description='Simple one-column professional.', texFile='classic_free.tex.j2'),
    TemplateMeta(id='modern-blue', name='Modern Blue', tier='tier2', description='Modern with accent color.', texFile='modern_blue.tex.j2'),
    TemplateMeta(id='minimal-grid', name='Minimal Grid', tier='tier2', description='Compact and ATS friendly.', texFile='minimal_grid.tex.j2'),
    TemplateMeta(id='executive', name='Executive', tier='tier2', description='Polished executive style.', texFile='executive.tex.j2'),
    TemplateMeta(id='creative', name='Creative', tier='tier3', description='Visual style for portfolios.', texFile='creative.tex.j2'),
    TemplateMeta(id='research', name='Research', tier='tier3', description='Academic-focused layout.', texFile='research.tex.j2'),
    TemplateMeta(id='compact-pro', name='Compact Pro', tier='tier3', description='Dense one-page format.', texFile='compact_pro.tex.j2'),
    TemplateMeta(id='startup', name='Startup', tier='tier3', description='Startup style.', texFile='startup.tex.j2'),
    TemplateMeta(id='enterprise', name='Enterprise', tier='tier3', description='Formal enterprise format.', texFile='enterprise.tex.j2'),
    TemplateMeta(id='international', name='International', tier='tier3', description='International application format.', texFile='international.tex.j2'),
    TemplateMeta(id='leadership', name='Leadership', tier='tier3', description='Leadership and impact first.', texFile='leadership.tex.j2')
]


def get_template(template_id: str) -> TemplateMeta:
    return next((tpl for tpl in TEMPLATES if tpl.id == template_id), TEMPLATES[0])
