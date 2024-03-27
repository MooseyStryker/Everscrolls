from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Note, Task, NoteBody, NoteAudio, NoteImage, many_notes_many_users
from app.forms import NoteForm, ShareNote, TaskForm, NoteBodyForm, NoteAudioForm, NoteImageForm
from sqlalchemy import select, and_

note_routes = Blueprint("notes", __name__)

#This will get all notes, tasks, images, and audio
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
            "created_at": results.created_at,
            "tasks": [task.to_dict() for task in results.notes_task],
            "bodies": [body.to_dict() for body in results.notes_body],
            "audios": [audio.to_dict() for audio in results.notes_audio],
            "images": [image.to_dict() for image in results.notes_images]
        }

        allNotes.append(results_info)
    return jsonify(allNotes)



@note_routes.route("", methods=["POST"])
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

    if note.creator_id != current_user.id:
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


@note_routes.route("/<int:note_id>", methods=["DELETE"])
@login_required
def yeet_note(note_id):
    stmt = select(Note).where(Note.id == note_id)
    yeeted_note = db.session.execute(stmt).scalar_one()
    if (yeeted_note.creator_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403
    db.session.delete(yeeted_note)
    db.session.commit()

    return jsonify({
        "Message": "Notebook deleted successfully"
    })



















#NoteBody to a note
@note_routes.route("/<int:note_id>/notebody", methods=["POST"])
@login_required
def adding_notebody(note_id):
    auth = select(Note).where(Note.id == note_id)
    note = db.session.execute(auth).scalar_one()
    if (note.creator_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    form = NoteBody()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        create_notebody = NoteBody(
            note_id=note_id,
            body = form.body.data
        )

        db.session.add(create_notebody)
        db.session.commit()

        return jsonify(create_notebody.to_dict()), 201

    return jsonify(form.errors), 400



@note_routes.route("/<int:note_id>/notebody/<int:notebody_id>", methods=["GET","PUT"])
@login_required
def edit_notebody(note_id, notebody_id):
    auth = select(Note).where(Note.id == note_id)
    note = db.session.execute(auth).scalar_one()
    permission_check = db.session.query(many_notes_many_users).filter_by(user_id=current_user.id, note_id=note_id).first()

    if note.creator_id != current_user.id and (permission_check is None or permission_check.permissions != 'View and Edit'):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    stmt = select(NoteBody).where(NoteBody.id == notebody_id)
    notebody = db.session.execute(stmt).scalar_one()

    if request.method == "PUT":
        form = NoteBody()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            notebody.body = form.body.data

            db.session.add(notebody)
            db.session.commit()

            return jsonify(notebody.to_dict()), 201
        else:
            return jsonify(form.errors), 400
    return jsonify(notebody.to_dict()), 201



@note_routes.route("/<int:note_id>/notebody/<int:notebody_id>", methods=["DELETE"])
@login_required
def yeet_notebody(note_id, notebody_id):
    auth = select(Note).where(Note.id == note_id)
    note = db.session.execute(auth).scalar_one()
    if (note.creator_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    stmt = select(NoteBody).where(NoteBody.id == notebody_id)
    yeet_body = db.session.execute(stmt).scalar_one()

    db.session.delete(yeet_body)
    db.session.commit()

    return jsonify({
        "Message": "NoteBody deleted successfully"
    })














# Tasks to a note

@note_routes.route("/<int:note_id>/tasks", methods=["POST"])
@login_required
def adding_tasks(note_id):
    stmt = select(Note).where(Note.id == note_id)
    note = db.session.execute(stmt).scalar_one()
    if (note.creator_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    form = TaskForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        newTask = Task(
            note_id = note_id,
            body = form.body.data,
            due_date = form.due_date.data,
        )
        db.session.add(newTask)
        db.session.commit()
        return jsonify(
            newTask.to_dict()
        ), 201
    return jsonify(form.errors), 400


@note_routes.route("/<int:note_id>/tasks/<int:task_id>", methods=["GET", "PUT"])
@login_required
def edit_task(note_id, task_id):
    stmt = select(Note).where(Note.id == note_id)
    note = db.session.execute(stmt).scalar_one()
    if (note.creator_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    stmt2 = select(Task).where(Task.id == task_id)
    task = db.session.execute(stmt2).scalar_one()

    if request.method == "PUT":
        form = TaskForm()  # Use TaskForm instead of Task
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            task.body = form.body.data
            task.due_date = form.due_date.data

            db.session.commit()

            return jsonify(
                task.to_dict()
            ), 200
        else:
            return jsonify(form.errors), 400

    return jsonify(task.to_dict()), 200


@note_routes.route("/<int:note_id>/tasks/<int:task_id>", methods=["DELETE"])
@login_required
def yeet_task(note_id, task_id):
    check_auth = select(Note).where(Note.id == note_id)
    note = db.session.execute(check_auth).scalar_one()
    if (note.creator_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    stmt = select(Task).where(Task.id == task_id)
    yeeted_task = db.session.execute(stmt).scalar_one()

    db.session.delete(yeeted_task)
    db.session.commit()

    return jsonify({
        "Message": "Task deleted successfully"
    })




#Images in a note
@note_routes.route("/<int:note_id>/images", methods=["POST"])
@login_required
def add_image(note_id):
    check_auth = select(Note).where(Note.id == note_id)
    note = db.session.execute(check_auth).scalar_one()
    if (note.creator_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    form = NoteImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        newImage = NoteImage(
            note_id = note_id,
            image_file = form.image_file.data,
        )
        db.session.add(newImage)
        db.session.commit()
        return jsonify(
            newImage.to_dict()
        ), 201
    return jsonify(form.errors), 400



@note_routes.route("/<int:note_id>/images/<int:image_id>", methods=["DELETE"])
@login_required
def delete_image(note_id, image_id):
    check_auth = select(Note).where(Note.id == note_id)
    note = db.session.execute(check_auth).scalar_one()
    if (note.creator_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    stmt = select(NoteImage).where(NoteImage.id == image_id)
    image = db.session.execute(stmt).scalar_one()
    if image.note_id != note_id:
        return jsonify({
            "Error": "Image not found in this note"
        }), 404

    db.session.delete(image)
    db.session.commit()
    return jsonify({
        "Success": "Image deleted"
    }), 200












#Audio in notes
@note_routes.route("/<int:note_id>/audios", methods=["POST"])
@login_required
def add_audio(note_id):
    check_auth = select(Note).where(Note.id == note_id)
    note = db.session.execute(check_auth).scalar_one()
    if (note.creator_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    form = NoteAudioForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        newAudio = NoteAudio(
            note_id = note_id,
            audio_file = form.audio_file.data,
        )
        db.session.add(newAudio)
        db.session.commit()
        return jsonify(
            newAudio.to_dict()
        ), 201
    return jsonify(form.errors), 400



@note_routes.route("/<int:note_id>/audios/<int:audio_id>", methods=["DELETE"])
@login_required
def delete_audio(note_id, audio_id):
    check_auth = select(Note).where(Note.id == note_id)
    note = db.session.execute(check_auth).scalar_one()
    if (note.creator_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    stmt = select(NoteAudio).where(NoteAudio.id == audio_id)
    audio = db.session.execute(stmt).scalar_one()
    if audio.note_id != note_id:
        return jsonify({
            "Error": "Audio not found in this note"
        }), 404

    db.session.delete(audio)
    db.session.commit()
    return jsonify({
        "Success": "Audio deleted"
    }), 200
















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


@note_routes.route("shared/<int:note_id>/user/<int:user_id>", methods=["POST"])
@login_required
def share_this_note(note_id, user_id):
    form = ShareNote()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        share_note = ShareNote(
            user_id = user_id,
            note_id = note_id,
            permissions = form.permissions.data
        )

        db.session.add(share_note)
        db.session.commit()
        return jsonify(share_note), 200
    else:
        return jsonify(form.errors), 400



@note_routes.route("shared/<int:note_id>/user/<int:user_id>", methods=["GET","PUT"])
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



@note_routes.route("shared/<int:note_id>/user/<int:user_id>", methods=["DELETE"])
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
