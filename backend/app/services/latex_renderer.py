from pathlib import Path
import tempfile
from jinja2 import Environment, FileSystemLoader

from app.schemas.cv import RenderRequest
from app.services.template_registry import get_template


def render_latex_document(payload: RenderRequest) -> bytes:
    templates_dir = Path(__file__).resolve().parents[1] / 'templates'
    env = Environment(loader=FileSystemLoader(templates_dir))
    template_meta = get_template(payload.templateName)
    tex_template = env.get_template(template_meta.texFile)
    tex_content = tex_template.render(cv=payload.masterData.model_dump())

    # XeLaTeX pipeline stub: keep generated .tex for compatibility and return simple bytes.
    with tempfile.NamedTemporaryFile(suffix='.tex', delete=False) as tex_file:
        tex_file.write(tex_content.encode('utf-8'))

    return tex_content.encode('utf-8')
