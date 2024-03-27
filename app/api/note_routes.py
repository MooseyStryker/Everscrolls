from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Note, many_notes_many_users
from app.forms import NoteForm, ShareNote
from sqlalchemy import select, and_

note_routes = Blueprint("notes", __name__)

@note_routes.route("", methods=["GET"])
@login_required
def view_note():
    stmt = select(Note).where(Note.creator_id == current_user.id)

    allNotes = []

    for row in db.session.execute(stmt):
        results = row.Notebook
        results_info = {
            "id": results.id,
            "creator_id": results.creator_id,
            "note_title": results.notebook_name,
            "updated_at": results.updated_at,
            "created_at": results.created_at
        }

        allNotes.append(results_info)
    return jsonify(allNotes)



@note_routes.route("/new", methods=["POST"])
@login_required
def new_note():
    form = NoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        newNote = Note(
            creator_id = current_user.id,
            title = form.title.data,
        )
        db.session.add(newNote)
        db.session.commit()
        return jsonify(
            newNote.to_dict()
        ), 201
    return jsonify(form.errors), 400


@note_routes.route("/<int:note_id>", methods=["GET","PUT"])
@login_required
def edit_note(note_id):
    stmt = select(Note).where(Note.id == note_id)
    note = db.session.execute(stmt).scalar_one()

    if note.user_id != current_user.id:
        return jsonify({
            "Not Authorized": "forbidden"
        }), 403

    if request.method == "PUT":
        form = NoteForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            note.title = form.title.data
            db.session.add(note)
            db.session.commit()

            return jsonify(
                note.to_dict()
            ), 201
        else:
            return jsonify(form.errors), 400
    return jsonify(note.to_dict()), 201


@note_routes.route("/<int:note_id>/delete", methods=["DELETE"])
@login_required
def yeet_note(note_id):
    stmt = select(Note).where(Note.id == note_id)
    yeeted_note = db.session.execute(stmt).scalar_one()
    if (yeeted_note.user_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403
    db.session.delete(yeeted_note)
    db.session.commit()

    return jsonify({
        "Message": "Notebook deleted successfully"
    })




# Adding tasks to a note














# Sharing a note!!!!
@note_routes.route("/shared", methods=["GET"])
@login_required
def view_shared_notes():
    stmt = select(Note).join(many_notes_many_users).where(many_notes_many_users.c.user_id == current_user.id)

    allNotes = []

    for row in db.session.execute(stmt):
        results = row.Notebook
        results_info = {
            "id": results.id,
            "creator_id": results.creator_id,
            "note_title": results.notebook_name,
            "updated_at": results.updated_at,
            "created_at": results.created_at
        }

        allNotes.append(results_info)
    return jsonify(allNotes)


@note_routes.route("shared/<int:note_id>/user/<int:user_id>/new", methods=["POST"])
@login_required
def share_this_note(note_id, user_id):
    form = ShareNote()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        share_note = ShareNote(
            user_id,
            note_id,
            permissions = form.permissions.data
        )

        db.session.add(share_note)
        db.session.commit()
        return jsonify(share_note), 200
    else:
        return jsonify(form.errors), 400



@note_routes.route("shared/<int:note_id>/user/<int:user_id>/edit", methods=["GET","PUT"])
@login_required
def edit_shared_note(note_id, user_id):
    stmt = select(many_notes_many_users).where(and_(many_notes_many_users.c.user_id == user_id, many_notes_many_users.c.note_id == note_id))
    shared_note = db.session.execute(stmt).scalar_one()

    if shared_note.user_id != current_user.id:
        return jsonify({
            "Not Authorized": "forbidden"
        }), 403

    if shared_note is None:
        return jsonify({
            "Not Found": "The specified user-note association does not exist."
        }), 404

    if request.method == "PUT":
        form = NoteForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            shared_note.permissions = form.permissions.data

            db.session.add(shared_note)
            db.session.commit()

            return jsonify(
                shared_note.to_dict()
            ), 201
        else:
            return jsonify(form.errors), 400
    return jsonify(shared_note.to_dict()), 201



@note_routes.route("shared/<int:note_id>/user/<int:user_id>/delete", methods=["DELETE"])
@login_required
def yeete_shared_note(note_id, user_id):
    stmt = select(many_notes_many_users).where(and_(many_notes_many_users.c.user_id == user_id, many_notes_many_users.c.note_id == note_id))
    no_more_share = db.session.execute(stmt).scalar_one()

    if no_more_share is None:
        return jsonify({
            "Not Found": "The specified user-note association does not exist."
        }), 404

    if no_more_share.user_id != current_user.id:
        return jsonify({
            "Not Authorized": "forbidden"
        }), 403

    db.session.delete(no_more_share)
    db.session.commit()

    return jsonify({
        "Success": "No longer sharing this note with this specific person"
    }), 200
