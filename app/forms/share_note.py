from flask_wtf import FlaskForm
from wtforms import BooleanField, SelectField, IntegerField
from wtforms.validators import DataRequired

class ShareNote(FlaskForm):
    note_id = IntegerField("Note ID",)
    user_id = IntegerField("User ID",)
    opened = BooleanField('Opened', default=False)
    permissions = SelectField('Permissions', choices=[('View Only', 'View Only'), ('View and Edit', 'View and Edit')], validators=[DataRequired()])
