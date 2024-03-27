from flask_wtf import FlaskForm
from wtforms import BooleanField, SelectField
from wtforms.validators import DataRequired

class ShareNote(FlaskForm):
    opened = BooleanField('Opened', default=False)
    permissions = SelectField('Permissions', choices=[('View Only', 'View Only'), ('View and Edit', 'View and Edit')], validators=[DataRequired()])
