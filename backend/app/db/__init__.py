from pathlib import Path
import sqlite3


def init_db(db_path: str = 'data/db.sqlite3') -> None:
    path = Path(db_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(path)
    with open(Path(__file__).resolve().parents[2] / 'migrations' / '0001_init.sql', 'r', encoding='utf-8') as sql_file:
        conn.executescript(sql_file.read())
    conn.commit()
    conn.close()
