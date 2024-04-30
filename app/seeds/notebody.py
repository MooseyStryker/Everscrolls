from app.models import db, NoteBody, NoteAudio, NoteImage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo note body, you can add other note bodies here if you want
def seed_note_bodies():
    note_body1 = NoteBody(
        note_id=1,
        body='NoteBody1',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note_body2 = NoteBody(
        note_id=2,
        body='NoteBody2',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note_body3 = NoteBody(
        note_id=3,
        body='NoteBody3',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note_body4 = NoteBody(
    note_id=4,
    body='Whimsical',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    note_body5 = NoteBody(
        note_id=5,
        body='Serene',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note_body6 = NoteBody(
    note_id=6,
    body='Ethereal',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    note_body7 = NoteBody(
        note_id=7,
        body='Luminous',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body8 = NoteBody(
        note_id=8,
        body='Mystical',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body9 = NoteBody(
        note_id=9,
        body='Radiant',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body10 = NoteBody(
        note_id=10,
        body='Vibrant',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body11 = NoteBody(
        note_id=11,
        body='Harmonious',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body12 = NoteBody(
        note_id=12,
        body='Exuberant',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body13 = NoteBody(
        note_id=13,
        body='Intriguing',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body14 = NoteBody(
        note_id=14,
        body='Captivating',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body15 = NoteBody(
        note_id=15,
        body='Enchanting',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note_body16 = NoteBody(
    note_id=16,
    body='Celestial',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    note_body17 = NoteBody(
        note_id=17,
        body='Whimsical',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body18 = NoteBody(
        note_id=18,
        body='Serenity',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body19 = NoteBody(
        note_id=19,
        body='Ethereal',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body20 = NoteBody(
        note_id=20,
        body='Luminous',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body21 = NoteBody(
        note_id=21,
        body='Mystical',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body22 = NoteBody(
        note_id=22,
        body='Radiant',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body23 = NoteBody(
        note_id=23,
        body='Vibrant',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body24 = NoteBody(
        note_id=24,
        body='Harmonious',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body25 = NoteBody(
        note_id=25,
        body='Exuberant',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body26 = NoteBody(
        note_id=26,
        body='Intriguing',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body27 = NoteBody(
        note_id=27,
        body='Captivating',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body28 = NoteBody(
        note_id=28,
        body='Enchanting',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body29 = NoteBody(
        note_id=29,
        body='Resplendent',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body30 = NoteBody(
        note_id=30,
        body='Transcendent',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body31 = NoteBody(
        note_id=31,
        body='Jubilant',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body32 = NoteBody(
        note_id=32,
        body='Effervescent',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body33 = NoteBody(
        note_id=33,
        body='Incandescent',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body34 = NoteBody(
        note_id=34,
        body='Illustrious',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body35 = NoteBody(
        note_id=35,
        body='Zephyr',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    note_body36 = NoteBody(
    note_id=36,
    body='Sapphire',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
    )

    note_body37 = NoteBody(
        note_id=37,
        body='Quixotic',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body38 = NoteBody(
        note_id=38,
        body='Labyrinthine',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body39 = NoteBody(
        note_id=39,
        body='Nebulous',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body40 = NoteBody(
        note_id=40,
        body='Incognito',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body41 = NoteBody(
        note_id=41,
        body='Ephemeral',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body42 = NoteBody(
        note_id=42,
        body='Halcyon',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body43 = NoteBody(
        note_id=43,
        body='Serendipity',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body44 = NoteBody(
        note_id=44,
        body='Zephyrus',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body45 = NoteBody(
        note_id=4,
        body='Aureate',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body46 = NoteBody(
        note_id=3,
        body='Verdant',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body47 = NoteBody(
        note_id=2,
        body='Cerulean',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body48 = NoteBody(
        note_id=1,
        body='Luminol',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body49 = NoteBody(
        note_id=3,
        body='Peregrine',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body50 = NoteBody(
        note_id=4,
        body='Umbra',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body51 = NoteBody(
        note_id=3,
        body='Sylvan',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body52 = NoteBody(
        note_id=2,
        body='Astral',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body53 = NoteBody(
        note_id=1,
        body='Chiaroscuro',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body54 = NoteBody(
        note_id=1,
        body='Ethereal',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    note_body55 = NoteBody(
        note_id=1,
        body='Sonorous',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )




    db.session.add(note_body1)
    db.session.add(note_body2)
    db.session.add(note_body3)
    db.session.add(note_body4)
    db.session.add(note_body5)
    db.session.add(note_body6)
    db.session.add(note_body7)
    db.session.add(note_body8)
    db.session.add(note_body9)
    db.session.add(note_body10)
    db.session.add(note_body11)
    db.session.add(note_body12)
    db.session.add(note_body13)
    db.session.add(note_body14)
    db.session.add(note_body15)
    db.session.add(note_body16)
    db.session.add(note_body16)
    db.session.add(note_body17)
    db.session.add(note_body18)
    db.session.add(note_body19)
    db.session.add(note_body20)
    db.session.add(note_body21)
    db.session.add(note_body22)
    db.session.add(note_body23)
    db.session.add(note_body24)
    db.session.add(note_body25)
    db.session.add(note_body26)
    db.session.add(note_body27)
    db.session.add(note_body28)
    db.session.add(note_body29)
    db.session.add(note_body30)
    db.session.add(note_body31)
    db.session.add(note_body32)
    db.session.add(note_body33)
    db.session.add(note_body34)
    db.session.add(note_body35)
    db.session.add(note_body36)
    db.session.add(note_body37)
    db.session.add(note_body38)
    db.session.add(note_body39)
    db.session.add(note_body40)
    db.session.add(note_body41)
    db.session.add(note_body42)
    db.session.add(note_body43)
    db.session.add(note_body44)
    db.session.add(note_body45)
    db.session.add(note_body46)
    db.session.add(note_body47)
    db.session.add(note_body48)
    db.session.add(note_body49)
    db.session.add(note_body50)
    db.session.add(note_body51)
    db.session.add(note_body52)
    db.session.add(note_body53)
    db.session.add(note_body54)
    db.session.add(note_body55)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the tables. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_note_bodies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.note_bodys RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM note_bodys"))

    db.session.commit()
