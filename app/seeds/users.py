from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        username='captainjames',
        first_name='James',
        last_name='Kirk',
        email='captainjames@starfleet.com',
        role='Captain',
        password='password123'
    )
    user2 = User(
        username='firstmatejohnpoipoiijopoike',
        first_name='John',
        last_name='Doe',
        email='firstmatejohn@starfleet.com',
        role='First Mate',
        password='password123'
    )
    user3 = User(
        username='crewmichael',
        first_name='Michael',
        last_name='Smith',
        email='crewmichael@starfleet.com',
        role='Crew',
        password='password123'
    )
    user4 = User(
        username='lydiag',
        first_name='Lydia',
        last_name='Ge',
        email='lydiag@starfleet.com',
        role='Crew',
        password='password123'
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
