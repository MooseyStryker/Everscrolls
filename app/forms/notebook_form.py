from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class NotebookForm(FlaskForm):
    notebook_name = StringField('Notebook Name', validators=[DataRequired(message="Notebook name is required"), Length(min=1, max=255, message="Notebook name cannot exceed 255 characters")])
