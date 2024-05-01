from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo task, you can add other tasks here if you want
def seed_tasks():
    task1 = Task(
        user_id=1,  # Add user_id
        note_id=1,
        body='Task1',
        # due_date=datetime.utcnow(),
        complete=False  # Add complete
    )
    task2 = Task(
        user_id=2,  # Add user_id
        note_id=2,
        body='Task2',
        # due_date=datetime.utcnow(),
        complete=False  # Add complete
    )
    task3 = Task(
        user_id=3,  # Add user_id
        note_id=3,
        body='Task3',
        # due_date=datetime.utcnow(),
        complete=False  # Add complete
    )

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the tasks table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
