from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/current')
@login_required
def get_current_user():
    """
    Query for the currently logged in user and returns that user in a dictionary
    """

    user = User.query.get(current_user.id)
    return user.to_dict()

@user_routes.route('/search', methods=['POST'])
@login_required
def search_user():
    """
    Search for a user by email and return that user in a dictionary
    """
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()
    if user:
        return user.to_dict()
    else:
        return jsonify({"error": "User not found"}), 404
