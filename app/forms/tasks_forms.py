from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import Length

class TaskForm(FlaskForm):
    body = StringField('Body', validators=[Length(max=600, message="Body cannot exceed 600 characters")])
    due_date = DateTimeField('Due Date')
