from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed


class NoteImageForm(FlaskForm):
    image_file = FileField('Image', validators=[
        FileAllowed(['png', 'jpg', 'jpeg', 'gif'], 'Images can only be png, jpg, jpeg, or gif!')
    ])
