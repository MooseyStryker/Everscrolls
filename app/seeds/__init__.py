from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notebooks import seed_notebooks, undo_notebooks
from .notes import seed_notes, undo_notes
from .task import seed_tasks, undo_tasks
from .notebody import seed_note_bodies, undo_note_bodies
from .noteaudio import seed_note_audios, undo_note_audios
from .noteimage import seed_note_images, undo_note_images
from .sharenotes import seed_share_notes, undo_share_notes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_share_notes()
        undo_note_images()
        undo_note_audios()
        undo_note_bodies()
        undo_tasks()
        undo_notes()
        undo_notebooks()
        undo_users()
    seed_users()
    seed_notebooks()
    seed_notes()
    seed_tasks()
    seed_note_bodies()
    seed_note_audios()
    seed_note_images()
    seed_share_notes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_share_notes()
    undo_note_images()
    undo_note_audios()
    undo_note_bodies()
    undo_tasks()
    undo_notes()
    undo_notebooks()
    undo_users()
    # Add other undo functions here
