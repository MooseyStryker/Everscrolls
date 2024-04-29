from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Note, Task, NoteBody, NoteAudio, NoteImage, ShareNote
# ShareNote
from app.forms import NoteForm, ShareNoteForm, TaskForm, NoteBodyForm, NoteAudioForm, NoteImageForm
from sqlalchemy import select, and_
from sqlalchemy.orm import joinedload

note_routes = Blueprint("notes", __name__)



# This route gets all notes, tasks, images, and audio for the current user
@note_routes.route("", methods=["GET"])
@login_required
def view_note():
    stmt = select(Note).where(Note.creator_id == current_user.id)           # Select all notes where the creator is the current user


    allNotes = []

    for row in db.session.execute(stmt):                                    # Execute the statement and iterate over the results
        results = row.Note

        results_info = {                                                    # Create a dictionary with the note details
            "id": results.id,
            "creator_id": results.creator_id,
            "notebook_id": results.notebook_id,
            "note_title": results.title,
            "updated_at": results.updated_at,
            "created_at": results.created_at,
            "tasks": [task.to_dict() for task in results.notes_task],
            "bodies": [body.to_dict() for body in results.notes_body],
            "audios": [audio.to_dict() for audio in results.notes_audio],
            "images": [image.to_dict() for image in results.notes_images]
        }

        allNotes.append(results_info)                                       # Append the note details to the list of all notes
    return jsonify(allNotes)







# This route adds a new note
@note_routes.route("", methods=["POST"])
@login_required
def new_note():
    form = NoteForm()                                           # Create a new form for the note
    form["csrf_token"].data = request.cookies["csrf_token"]     # Set the CSRF token from the request cookies

    # Validate the form
    if form.validate_on_submit():
        newNote = Note(                                         # Create a new note with the form data
            creator_id = current_user.id,
            notebook_id = form.notebook_id.data,
            title = form.title.data,
        )
        db.session.add(newNote)                                 # Add the new note to the database session
        db.session.commit()
        return jsonify(
            newNote.to_dict()
        ), 201

    return jsonify(form.errors), 400





# This route gets or edits a note
@note_routes.route("/<int:note_id>", methods=["GET","PUT"])
@login_required
def edit_note(note_id):
    stmt = select(Note).where(Note.id == note_id)               # Select the note with the given ID
    note = db.session.execute(stmt).scalar_one()                # Execute the statement and get the note

    if note.creator_id != current_user.id:                      # Check if the current user is the creator of the note
        return jsonify({
            "Not Authorized": "forbidden"
        }), 403

    # If the request method is PUT, edit the note
    if request.method == "PUT":
        form = NoteForm()                                       # Create a new form for the note
        form["csrf_token"].data = request.cookies["csrf_token"] # Set the CSRF token from the request cookies

        # Validate the form
        if form.validate_on_submit():
            note.title = form.title.data                        # Update the note title with the form data
            db.session.add(note)
            db.session.commit()

            return jsonify(
                note.to_dict()
            ), 201

        else:
            return jsonify(form.errors), 400                    # If the form is not valid, return the form errors as a JSON response with a 400 status code

    return jsonify(note.to_dict()), 201                         # If the request method is GET, return the note as a JSON response with a 201 status code



# This route deletes a note
@note_routes.route("/<int:note_id>", methods=["DELETE"])
@login_required
def yeet_note(note_id):
    stmt = select(Note).where(Note.id == note_id)       # Select the note with the given ID
    yeeted_note = db.session.execute(stmt).scalar_one() # Execute the statement and get the note

    if (yeeted_note.creator_id != current_user.id):     # Checks if the current user is the creator of the note
        return jsonify({                                # If not, return a 403 status code with an error message
            "Not authorized": "Forbidden"
        }), 403

    db.session.delete(yeeted_note)                      # Delete the note from the database session
    db.session.commit()                                 # Commit the database session

    return jsonify({                                    # Return a success message as a JSON response
        "Message": "Notebook deleted successfully"
    })




















# NoteBody to a note
@note_routes.route("/<int:note_id>/notebody", methods=["GET"])
@login_required
def get_notebody(note_id):
    stmt = select(NoteBody).where(NoteBody.note_id == note_id)

    allNoteBodies = []

    for row in db.session.execute(stmt):
        results = row.NoteBody
        results_info = {
                "id": results.id,
                "note_id": results.note_id,
                "body": results.body,
                "created_at": results.created_at,
                "updated_at": results.updated_at,
            }

        allNoteBodies.append(results_info)


    return jsonify(allNoteBodies)




@note_routes.route("/<int:note_id>/notebody", methods=["POST"])
@login_required
def adding_notebody(note_id):
    auth = select(Note).where(Note.id == note_id)
    note = db.session.execute(auth).scalar_one()
    if (note.creator_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    form = NoteBodyForm()
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





# NoteBody to a note
# This contains an additional auth that im going to be testing when sharing code. I would like the shared note with another user to edit the same document
@note_routes.route("/<int:note_id>/notebody/<int:notebody_id>", methods=["GET","PUT"])
@login_required
def edit_notebody(note_id, notebody_id):
    auth = select(Note).where(Note.id == note_id)                                                                               # Select the note with the given ID
    note = db.session.execute(auth).scalar_one()                                                                                # Execute the statement and get the note
    permission_check = db.session.query(ShareNote).filter_by(user_id=current_user.id, note_id=note_id).first()      # Check if the note shared has permission to edit the note

    if note.creator_id != current_user.id and (permission_check is None or permission_check.permissions != 'View and Edit'):    # If the current user is not the creator of the note and does not have 'View and Edit' permissions, return a 403 status code with an error message
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    stmt = select(NoteBody).where(NoteBody.id == notebody_id)                                                                   # 2nd select the NoteBody with the given ID
    notebody = db.session.execute(stmt).scalar_one()                                                                            # Execute the statement and get the NoteBody

    # If the request method is PUT, edit the NoteBody
    if request.method == "PUT":
        form = NoteBody()                                                                                                       # Create a new form for the NoteBody
        form["csrf_token"].data = request.cookies["csrf_token"]                                                                 # Set the CSRF token from the request cookies

        # Validate the form
        if form.validate_on_submit():
            notebody.body = form.body.data                                                                                      # Update the NoteBody body with the form data

            db.session.add(notebody)
            db.session.commit()

            return jsonify(notebody.to_dict()), 201                                                                             # Return the NoteBody as a JSON response with a 201 status code
        else:
            return jsonify(form.errors), 400                                                                                    # If the form is not valid, return the form errors as a JSON response with a 400 status code

    return jsonify(notebody.to_dict()), 201                                                                                     # If the request method is GET, return the NoteBody as a JSON response with a 201 status code




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


@note_routes.route("/<int:note_id>/notebody", methods=["DELETE"])
@login_required
def delete_all_notebody(note_id):
    auth = select(Note).where(Note.id == note_id)
    note = db.session.execute(auth).scalar_one()
    if (note.creator_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    stmt = select(NoteBody).where(NoteBody.note_id == note_id)
    all_notebodies = db.session.execute(stmt).scalars().all()

    for notebody in all_notebodies:
        db.session.delete(notebody)

    db.session.commit()

    return jsonify({
        "Message": "All NoteBody instances deleted successfully"
    })
















# Tasks to a note

@note_routes.route("/<int:note_id>/tasks", methods=["GET"])
@login_required
def get_all_tasks(note_id):
    stmt = select(Task).where(Task.note_id == note_id)

    allTasks = []

    for row in db.session.execute(stmt):
        results = row.Task
        results_info = {
                "id": results.id,
                "user_id": results.user_id,
                "note_id": results.note_id,
                "description": results.body,
                # "due_date": results.due_date,
                "complete": results.complete,
         }

        allTasks.append(results_info)
    return jsonify(allTasks)


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
            user_id = current_user.id,
            note_id = note_id,
            body = form.body.data,
            # due_date = form.due_date.data,
            complete = form.complete.data,
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
        form = TaskForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            task.note_id = form.note_id.data
            task.body = form.body.data
            task.complete = form.complete.data
            # task.due_date = form.due_date.data

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
@note_routes.route("/<int:note_id>/images", methods=["GET"])
@login_required
def view_all_image(note_id):
    check_auth = select(Note).where(Note.id == note_id)
    note = db.session.execute(check_auth).scalar_one()
    if (note.creator_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    get_image = select(NoteImage).where(NoteImage.note_id == note_id)
    allImages = db.session.execute(get_image).all()

    results_info = [
        {
            "id": image.id,
            "note_id": image.note_id,
            "image_file": image.image_file
        }
        for image in allImages
    ]

    return jsonify(results_info)



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
@note_routes.route("/<int:note_id>/audio", methods=["POST"])
@login_required
def get_all_audio(note_id):
    check_auth = select(Note).where(Note.id == note_id)
    note = db.session.execute(check_auth).scalar_one()
    if (note.creator_id != current_user.id):
        return jsonify({
            "Not authorized": "Forbidden"
        }), 403

    get_audio = select(NoteAudio).where(NoteAudio.note_id == note_id)
    allAudios = db.session.execute(get_audio).all()

    results_info = [
        {
            "id": audio.id,
            "note_id": audio.note_id,
            "audio_file": audio.audio_file
        }
        for audio in allAudios
    ]

    return jsonify(results_info)


@note_routes.route("/<int:note_id>/audio", methods=["POST"])
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



@note_routes.route("/<int:note_id>/audio/<int:audio_id>", methods=["DELETE"])
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
def view_all_shared_notes():

    stmt = select(ShareNote).where(ShareNote.user_id == current_user.id)

    all_notes = []

    for row in db.session.execute(stmt):
        results = row.ShareNote
        results_info = {
            "id": results.id,
            "user_id": results.user_id,
            "note_id": results.note_id,
            "opened": results.opened,
            "permissions": results.permissions
        }

        all_notes.append(results_info)

    return jsonify(all_notes)


# Trying to figure out how to make this eager loaded with all the right data, currently just the title
@note_routes.route("/shared/all/<int:shared_user_id>", methods=["GET"])
@login_required
def view_note_shared_with_user(shared_user_id):

    shared_notes_query = (
        db.session.query(ShareNote)
        .filter(ShareNote.user_id == shared_user_id)
        .options(
            db.joinedload(ShareNote.note)
            .joinedload(Note.notes_body),
            db.joinedload(ShareNote.note)
            .joinedload(Note.notes_task)
            )
        .all()
    )


    shared_notes = []
    for share_note in shared_notes_query:

        note_info = {
            "id": share_note.id,
            "note_id": share_note.note_id,
            "note_title": share_note.note.title,
            "permissions": share_note.permissions,
        }
        shared_notes.append(note_info)



    print("&" * 60)
    print("-" * 60)
    print(shared_notes)
    return jsonify(shared_notes)


@note_routes.route("/shared/<int:note_id>", methods=["GET"])
@login_required
def view_shared_notes(note_id):
    print("WE hit here!!!")
    stmt = select(ShareNote).where(ShareNote.note_id == note_id)

    allNotes = []

    for row in db.session.execute(stmt):
        results = row.ShareNote
        results_info = {
            "id": results.id,
            "user_id": results.user_id,
            "note_id": results.note_id,
            "opened": results.opened,
            "permissions": results.permissions
        }

        allNotes.append(results_info)
    return jsonify(allNotes)


@note_routes.route("/shared", methods=["POST"])
@login_required
def share_this_note():
    form = ShareNote()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        share_note = ShareNote(
            user_id = form.user_id.data,
            note_id = form.note_id.data,
            opened = form.opened.data,
            permissions = form.permissions.data
        )

        print(share_note)
        db.session.add(share_note)
        db.session.commit()
        return jsonify(share_note.to_dict()), 200
    else:
        return jsonify(form.errors), 400



@note_routes.route("/shared/<int:note_id>/user/<int:user_id>", methods=["GET","PUT"])
@login_required
def edit_shared_note(note_id, user_id):
    stmt = select(ShareNote).where(and_(ShareNote.c.user_id == user_id, ShareNote.c.note_id == note_id))
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



@note_routes.route("/shared/<int:note_id>/", methods=["DELETE"])
@login_required
def yeete_shared_note(note_id):
    stmt = select(ShareNote).where(ShareNote.c.note_id == note_id)
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
