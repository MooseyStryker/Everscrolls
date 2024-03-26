from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class NoteForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(message="Title is required"), Length(max=255, message="Title cannot exceed 255 characters")])
