from flask_wtf import FlaskForm
from wtforms import StringField

class NoteAudioForm(FlaskForm):
    audio_file = StringField('Audio File')


w
