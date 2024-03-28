from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Note, Task, many_notes_many_users
from app.forms import NoteForm, ShareNote, TaskForm
from sqlalchemy import select, and_

task_routes = Blueprint("tasks", __name__)

@task_routes.route("/<int:task_id>/delete", methods=["DELETE"])
@login_required
def yeet_task(task_id):
    stmt = select(Task).where(Task.id == task_id)
    yeeted_task = db.session.execute(stmt).scalar_one()
    if (yeeted_task.user_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403
    db.session.delete(yeeted_task)
    db.session.commit()

    return jsonify({
        "Message": "Notebook deleted successfully"
    })
