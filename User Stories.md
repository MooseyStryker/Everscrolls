# User Stories

## Users

### Sign Up

**As an unregistered and unauthorized user**, I want to be able to sign up for the website via a sign-up form.

When I'm on the `/signup` page:
- I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
- I would like the website to log me in upon successful completion of the sign-up form.
  - So that I can seamlessly access the site's functionality

When I enter invalid data on the sign-up form:
- I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
  - So that I can try again without needing to refill forms I entered valid data into.

### Log in

**As a registered and unauthorized user**, I want to be able to log in to the website via a log-in form.

When I'm on the `/login` page:
- I would like to be able to enter my email and password on a clearly laid out form.
- I would like the website to log me in upon successful completion of the log-in form.
  - So that I can seamlessly access the site's functionality

When I enter invalid data on the log-in form:
- I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
  - So that I can try again without needing to refill forms I entered valid data into.

### Demo User

**As an unregistered and unauthorized user**, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.

When I'm on either the `/signup` or `/login` pages:
- I can click on a Demo User button to log me in and allow me access as a normal user.
  - So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

**As a logged in user**, I want to log out via an easy to find log out button on the navigation bar.

While on any page of the site:
- I can log out of my account and be redirected to the create user main page.
  - So that I can easily log out to keep my information secure.


### Create Notes

**As a logged in user**, I want to be able to post new notes.
When I'm on the `/new-note` page:
- I can write and submit a new note.
  - So that I can share my thoughts and ideas with myself or others.

### Viewing Notes

**As a logged in user**, I want to be able to view a selection of the most recent notes.

When I'm on the `/notes` page:
- I can view the ten most recently posted notes.
  - So that I can read and interact with the thoughts and ideas of myself or others.

**As a logged in user**, I want to be able to view a specific note and its associated comments and likes.

When I'm on the `/notes/:id` page:
- I can view the content of the note, as well as the associated comments and likes.
  - So that I can read and interact with the thoughts and ideas of myself or others, and add my own thoughts and ideas in the comments.

### Updating Notes

**As a logged in user**, I want to be able to edit my notes by clicking an Edit button associated with the note anywhere that note appears.

When I'm on the `/notes`, `/notes/:id`, or `/users/:id/notes` pages:
- I can click "Edit" to make permanent changes to notes I have posted.
  - So that I can fix any errors I make in my notes.

### Deleting Notes

**As a logged in user**, I want to be able to delete my notes by clicking a Delete button associated with the note anywhere that note appears.

When I'm on the `/notes`, `/notes/:id`, or `/users/:id/notes` pages:
- I can click "Delete" to permanently delete a note I have posted.
  - So that when I realize I shouldn't have publicly said something, I can easily remove it.

## Tasks

### Viewing Tasks

**As a logged in user**, I want to be able to view a selection of the most recent tasks.

When I'm on the `/tasks` page:
- I can view the ten most recently posted tasks.
  - So that I can read and interact with the tasks and plan my actions accordingly.

**As a logged in user**, I want to be able to view a specific task and its associated notes.

When I'm on the `/tasks/:id` page:
- I can view the content of the task, as well as the associated notes.
  - So that I can read and interact with the tasks and add my own thoughts and ideas in the notes.

### Updating Tasks

**As a logged in user**, I want to be able to edit my tasks by clicking an Edit button associated with the task anywhere that task appears.

When I'm on the `/tasks`, `/tasks/:id`, or `/users/:id/tasks` pages:
- I can click "Edit" to make permanent changes to tasks I have posted.
  - So that I can fix any errors I make in my tasks.

### Deleting Tasks

**As a logged in user**, I want to be able to delete my tasks by clicking a Delete button associated with the task anywhere that task appears.

When I'm on the `/tasks`, `/tasks/:id`, or `/users/:id/tasks` pages:
- I can click "Delete" to permanently delete a task I have posted.
  - So that I can manage my tasks and remove the ones that are no longer relevant.
