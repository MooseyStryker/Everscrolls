from app.models import db, Notebook, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo notebook, you can add other notebooks here if you want
def seed_notebooks():
    notebook1 = Notebook(
        user_id=1,
        notebook_name='Notebook1',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    notebook2 = Notebook(
        user_id=2,
        notebook_name='Notebook2',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    notebook3 = Notebook(
        user_id=3,
        notebook_name='Notebook3',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    notebook4 = Notebook(
        user_id=1,
        notebook_name='Notebook12',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    notebook5 = Notebook(
        user_id=1,
        notebook_name='Notebook123',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    notebook6 = Notebook(
        user_id=1,
        notebook_name='Notebook1234',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    notebook7 = Notebook(
    user_id=2,
    notebook_name='Scribbles',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    notebook8 = Notebook(
        user_id=3,
        notebook_name='Ideas',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    notebook9 = Notebook(
        user_id=4,
        notebook_name='Musings',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    notebook7 = Notebook(
    user_id=2,
    notebook_name='Scribbles',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    notebook8 = Notebook(
        user_id=3,
        notebook_name='Ideas',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    notebook9 = Notebook(
        user_id=4,
        notebook_name='Musings',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    notebook10 = Notebook(
        user_id=1,
        notebook_name='Random Thoughts',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    notebook11 = Notebook(
        user_id=2,
        notebook_name='Dream Journal',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    notebook12 = Notebook(
        user_id=3,
        notebook_name='Inspirations',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    notebook13 = Notebook(
        user_id=4,
        notebook_name='Reflections',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    notebook14 = Notebook(
        user_id=1,
        notebook_name='Code Snippets',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(notebook1)
    db.session.add(notebook2)
    db.session.add(notebook3)
    db.session.add(notebook4)
    db.session.add(notebook5)
    db.session.add(notebook6)
    db.session.add(notebook7)
    db.session.add(notebook8)
    db.session.add(notebook9)
    db.session.add(notebook10)
    db.session.add(notebook11)
    db.session.add(notebook12)
    db.session.add(notebook13)
    db.session.add(notebook14)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the notebooks table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebooks"))

    db.session.commit()
