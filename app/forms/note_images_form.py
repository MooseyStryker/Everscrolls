from flask_wtf import FlaskForm
from wtforms import StringField

class NoteImageForm(FlaskForm):
    image_file = StringField('Image File')
