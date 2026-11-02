from importlib.metadata import version
from pathlib import Path
from tempfile import TemporaryDirectory
import json
from copier import run_copy

with TemporaryDirectory() as tmp:
    root = Path(tmp)
    source, target = root / "template", root / "adopted"
    source.mkdir()
    (source / "copier.yml").write_text("name:\n  type: str\n  default: E08\n", encoding="utf-8")
    (source / "result.txt.jinja").write_text("Hello {{ name }}!", encoding="utf-8")
    (source / ".copier-answers.yml.jinja").write_text("{{ _copier_answers | to_nice_yaml }}", encoding="utf-8")
    run_copy(str(source), str(target), defaults=True, quiet=True)
    assert (target / "result.txt").read_text(encoding="utf-8") == "Hello E08!"
    assert (target / ".copier-answers.yml").is_file()
print(json.dumps({"consumer": "copier", "version": version("copier"), "result": "PASS"}))
