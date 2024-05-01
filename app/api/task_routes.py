from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Note, Task
# many_notes_many_users
from app.forms import NoteForm, ShareNoteForm, TaskForm
from sqlalchemy import select, and_

task_routes = Blueprint("tasks", __name__)

@task_routes.route("", methods=["GET"])
@login_required
def get_all_tasks():
    stmt = select(Task).where(Task.user_id == current_user.id)

    all_tasks = []

    for row in db.session.execute(stmt):
        results = row.Task
        results_info = {
                "id": results.id,
                "note_id": results.note_id,
                "user_id": results.user_id,
                "body": results.body,
                # "due_date": results.due_date,
                "complete": results.complete,
        }

        all_tasks.append(results_info)

    return jsonify(all_tasks)


@task_routes.route("/<int:task_id>", methods=["DELETE"])
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
