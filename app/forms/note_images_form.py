from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, IntegerField
from wtforms.validators import DataRequired
from app.api.aws import ALLOWED_EXTENSIONS


class NoteImageForm(FlaskForm):
    note_id = IntegerField("Note ID", validators=[DataRequired()])
    image_file = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Send image")
