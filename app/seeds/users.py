from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        username='user1',
        first_name='First1',
        last_name='Last1',
        email='user1@aa.io',
        role='Captain',
        password='password'
    )
    user2 = User(
        username='user2',
        first_name='First2',
        last_name='Last2',
        email='user2@aa.io',
        role='First Mate',
        password='password'
    )
    user3 = User(
        username='user3',
        first_name='First3',
        last_name='Last3',
        email='user3@aa.io',
        role='Crew',
        password='password'
    )
    user4 = User(
        username='ShareTest',
        first_name='Lydia',
        last_name='Ge',
        email='share@',
        role='Crew',
        password='password'
    )

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
