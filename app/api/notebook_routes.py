from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Notebook, Note
from app.forms import NotebookForm, NoteForm
from sqlalchemy import select

notebook_routes = Blueprint("notebooks", __name__)

@notebook_routes.route("", methods=["GET"])
@login_required
def view_notebook():
    stmt = select(Notebook).where(Notebook.user_id == current_user.id)

    allNotebooks = []

    for row in db.session.execute(stmt):
        results = row.Notebook
        results_info = {
            "id": results.id,
            "notebook_name": results.notebook_name,
            "updated_at": results.updated_at,
            "created_at": results.created_at
        }

        allNotebooks.append(results_info)
    return jsonify(allNotebooks)


@notebook_routes.route("", methods=["POST"])
@login_required
def create_notebook():
    form = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        create_notebook = Notebook(
            user_id=current_user.id,
            notebook_name=form.notebook_name.data
        )

        db.session.add(create_notebook)
        db.session.commit()
        return jsonify(create_notebook.to_dict()), 201
    return jsonify(form.errors), 400



@notebook_routes.route("/<int:notebook_id>", methods=["GET","PUT"])
@login_required
def edit_notebook(notebook_id):
    stmt = select(Notebook).where(Notebook.id == notebook_id)
    notebook = db.session.execute(stmt).scalar_one()
    if (notebook.user_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403
    if request.method == "PUT":
        form = NotebookForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            notebook.notebook_name = form.notebook_name.data
            db.session.add(notebook)
            db.session.commit()
            return jsonify(notebook.to_dict()), 201
        else:
            return jsonify(form.errors), 400
    return jsonify(notebook.to_dict()), 201


@notebook_routes.route("/<int:notebook_id>", methods=["DELETE"])
@login_required
def yeet_delete(notebook_id):
    stmt = select(Notebook).where(Notebook.id == notebook_id)
    notebook = db.session.execute(stmt).scalar_one()
    if (notebook.user_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403
    db.session.delete(notebook)
    db.session.commit()

    return jsonify({
        "Message": "Notebook deleted successfully"
    })


@notebook_routes.route("/<int:notebook_id>/note", methods=["POST"])
@login_required
def new_note_in_notebook(notebook_id):
    form = NoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        newNote = Note(
            creator_id = current_user.id,
            notebook_id = notebook_id,
            title = form.title.data,
        )
        db.session.add(newNote)
        db.session.commit()
        return jsonify(
            newNote.to_dict()
        ), 201
    return jsonify(form.errors), 400
