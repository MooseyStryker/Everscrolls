from flask_wtf import FlaskForm
from wtforms import StringField

class NoteBodyForm(FlaskForm):
    body = StringField('Body')
