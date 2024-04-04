from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Notebook
from app.forms import NotebookForm
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


@notebook_routes.route("/new", methods=["GET","POST"])
@login_required
def create_notebook():
    form = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        createNotebook = Notebook(
            user_id=current_user.id,
            notebook_name=form.notebook_name.data
        )

        db.session.add(createNotebook)
        db.session.commit()
        return jsonify(createNotebook.to_dict()), 201
    return jsonify(form.errors), 400



@notebook_routes.route("/<int:notebook_id>", methods=["GET","POST"])
@login_required
def edit_notebook(notebook_id):
    stmt = select
