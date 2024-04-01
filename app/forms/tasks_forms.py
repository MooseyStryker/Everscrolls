from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, BooleanField
from wtforms.validators import Length
from wtforms.validators import Optional

class TaskForm(FlaskForm):
    body = StringField('Body', validators=[Length(max=600, message="Body cannot exceed 600 characters")])
    due_date = DateTimeField('Due Date', validators=[Optional()])
    complete = BooleanField('Complete')

