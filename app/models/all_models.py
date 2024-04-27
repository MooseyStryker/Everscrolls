from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy import Enum, DateTime
from sqlalchemy import ForeignKey, String, Integer, Float, Boolean, Date, Text
from sqlalchemy.orm import relationship

role_enum = Enum('Captain', 'First Mate', 'Crew', 'Bucket swabbler', name='role_types')
permission_enum = Enum('View Only', 'View and Edit', name='permission_types')


class UserNote(db.Model):
    __tablename__ = 'users_to_notes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    note_id = db.Column(db.Integer, db.ForeignKey('notes.id'))
    opened = db.Column(db.Boolean, default=False)
    permissions = db.Column(permission_enum, nullable=False)

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # relationships
    user = db.relationship("User", back_populates="notes")
    note = db.relationship("Note", back_populates="users")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'note_id': self.note_id,
            'opened': self.opened,
            'permissions': self.permissions
        }



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    role = db.Column(role_enum, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow)

    notes = db.relationship("UserNote", back_populates="user")


    user_tasks = db.relationship("Task", back_populates='task_to_user', cascade="all, delete-orphan")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at
        }

class Notebook(db.Model):
    __tablename__ = 'notebooks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    notebook_name = db.Column(db.String(255))
    created_at = db.Column(DateTime, default=datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #The relationships attached to Notebook
    notebook_to_notes = db.relationship("Note", back_populates='notes_to_notebook', cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'notebook_name': self.notebook_name,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }


class Note(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    notebook_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('notebooks.id')))
    title = db.Column(db.String(255))
    created_at = db.Column(DateTime, default=datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #The relationships attached to Notes

    users = db.relationship("UserNote", back_populates="note")


    notes_to_notebook = db.relationship("Notebook", back_populates='notebook_to_notes')
    notes_task = db.relationship("Task", back_populates='tasks_to_notes', cascade="all, delete-orphan")
    notes_body = db.relationship("NoteBody", back_populates='bodys_to_notes', cascade="all, delete-orphan")
    notes_audio = db.relationship("NoteAudio", back_populates='audios_to_notes', cascade="all, delete-orphan")
    notes_images = db.relationship("NoteImage", back_populates='images_to_notes', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'notebook_id': self.notebook_id,
            'title': self.title,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }



class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    note_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('notes.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    body = db.Column(db.String(600))
    # due_date = db.Column(DateTime, nullable=True)
    complete = db.Column(db.Boolean, default=False)

    task_to_user = db.relationship("User", back_populates='user_tasks')
    tasks_to_notes = db.relationship("Note", back_populates='notes_task')

    def to_dict(self):
        return {
            'id': self.id,
            'note_id': self.note_id,
            'user_id': self.user_id,
            'body': self.body,
            # 'due_date': self.due_date,
            'complete': self.complete
        }




class NoteBody(db.Model):
    __tablename__ = 'note_bodys'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    note_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('notes.id')))
    body = db.Column(db.String())
    created_at = db.Column(DateTime, default=datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    bodys_to_notes = db.relationship("Note", back_populates='notes_body')

    def to_dict(self):
        return {
            'id': self.id,
            'note_id': self.note_id,
            'body': self.body,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }




class NoteAudio(db.Model):
    __tablename__ = 'note_audios'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    note_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('notes.id')))
    audio_file = db.Column(db.String())

    audios_to_notes = db.relationship("Note", back_populates='notes_audio')

    def to_dict(self):
        return {
            'id': self.id,
            'note_id': self.note_id,
            'audio_file': self.audio_file
        }





class NoteImage(db.Model):
    __tablename__ = 'note_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    note_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('notes.id')))
    image_file = db.Column(db.String())

    images_to_notes = db.relationship("Note", back_populates='notes_images')

    def to_dict(self):
        return {
            'id': self.id,
            'note_id': self.note_id,
            'image_file': self.image_file
        }














#gimme space
