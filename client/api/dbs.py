"""Database model file"""
# pylint: disable=no-member
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class Users(db.Model):
    """User table to handle the user logins"""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    is_active = db.Column(db.Boolean)
    is_authenticated = db.Column(db.Boolean)

    def get_id(self):
        """get user id"""
        return self.id

    def signin(self, uname, pwd):
        """Adding a new user to the User database"""
        user = Users.query.filter_by(username=uname).first()
        if not user:
            return 1
        elif not check_password_hash(user.password, pwd):
            return 2
        else:
            return user

    def signup(self, uname, pwd):
        """Adding a new user to the User database"""
        new_user = Users(
            username=uname,
            password=generate_password_hash(pwd, method="sha256"),
            is_active=True,
            is_authenticated=True,
        )
        db.session.add(new_user)
        db.session.commit()

    def get_username(self, user_id):
        """Returns the username for a given user_id"""
        user = Users.query.filter_by(id=user_id).first()
        if not user:
            return "anonymous"
        else:
            return user.username


class UserProfile(db.Model):
    """Database to store user profile information"""

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    # profile_pic = db.Column(db.BLOB)

    def update_user_profile(self, user_id, email, first_name, last_name):
        """Function used to update a user's profile"""
        profile = UserProfile.query.filter_by(user_id=user_id).first()
        if not profile:
            return "Profile Not Found"
        else:
            if email != "":
                profile.email = email
            if first_name != "":
                profile.first_name = first_name
            if last_name != "":
                profile.last_name = last_name
            # if profile_pic is not None:
            #     profile.profile_pic = profile_pic
            db.session.commit()
            return "Profile Successfully Updated"

    def get_user_profile(self, user_id):
        """function to pull the user's profile from the db"""
        user_profile = UserProfile.query.filter_by(user_id=user_id).first()
        if not user_profile:
            return "Profile Not Found"
        else:
            return user_profile


class Lists(db.Model):
    """Database to store the user lists header information"""

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False)
    list_name = db.Column(db.String(100), nullable=False)
    media_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))

    def add_list(self, user_id, list_name, media_type, description):
        """Function to add a new list for a user"""
        new_list = Lists(
            user_id=user_id,
            list_name=list_name,
            media_type=media_type,
            description=description,
        )
        db.session.add(new_list)
        db.session.commit()
        return new_list.id

    def edit_list(self, list_id, list_name, description):
        """Function to edit the header information for an existing list"""
        my_list = Lists.query.filter_by(id=list_id).first()
        if not my_list:
            return "List Not Found"
        else:
            if list_name != "":
                my_list.list_name = list_name
            if description != "":
                my_list.description = description
            db.session.commit()
            return "List Updated"

    def delete_list(self, list_id):
        """Function to delete a list"""
        ListItems.query.filter_by(list_id=list_id).delete()
        Lists.query.filter_by(id=list_id).delete()
        db.session.commit()
        return 1

    def get_user_lists(self, user_id):
        """function to return all lists for a given user"""
        lists = db.session.query(Lists).filter_by(user_id=user_id).all()
        if not lists:
            return []
        else:
            my_lists = []
            for my_list in lists:
                list_id = my_list.id
                user_id = my_list.user_id
                list_name = my_list.list_name
                media_type = my_list.media_type
                description = my_list.description
                list_content = ListItems.get_list_items(ListItems, list_id)
                my_lists.append(
                    {
                        "id": list_id,
                        "user_id": user_id,
                        "list_name": list_name,
                        "media_type": media_type,
                        "description": description,
                        "list_content": list_content,
                    }
                )

            return my_lists


class ListItems(db.Model):
    """Database that stores each entry in a list"""

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, nullable=False)
    media_id = db.Column(
        db.String(50), nullable=False
    )  # may need to change to string depending on IDs given by API
    rating = db.Column(db.Integer)

    def add_list_item(self, list_id, media_id):
        """Fucntion to add a new entry to a list"""
        new_item = ListItems.query.filter_by(list_id=list_id, media_id=media_id).first()
        if not new_item:
            new_list_item = ListItems(list_id=list_id, media_id=media_id)
            db.session.add(new_list_item)
            db.session.commit()
            return new_list_item.id
        else:
            return -1

    def delete_list_item(self, list_id):
        """Function to delete an entry from a list"""
        ListItems.query.filter_by(id=list_id).delete()
        db.session.commit()
        return 1

    def get_list_items(self, list_id):
        """Function to get all items for a given list"""
        items = ListItems.query.filter_by(list_id=list_id).all()
        list_items = []
        for item in items:
            list_id = item.id
            list_id = item.list_id
            media_id = item.media_id
            list_items.append(
                {
                    "id": list_id,
                    "list_id": list_id,
                    "media_id": media_id,
                }
            )

        return list_items


class ListSharedWith(db.Model):
    """Database to store what lists are shared with specific users"""

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, nullable=False)
    # Only user_id OR email need to be populated
    user_id = db.Column(db.String(100))
    email = db.Column(db.String(100))

    def add_shared_with(self, list_id, user_id, email):
        """Function to add to who you are sharing with"""
        if user_id != "":
            shared = ListSharedWith.query.filter_by(
                list_id=list_id, user_id=user_id
            ).first()
            if not shared:
                new_shared = ListSharedWith(list_id=list_id, user_id=user_id, email="")
                db.session.add(new_shared)
            else:
                return "List already shared with user"
        else:
            shared = ListSharedWith.query.filter_by(
                list_id=list_id, email=email
            ).first()
            if not shared:
                new_shared = ListSharedWith(list_id=list_id, user_id="", email=email)
                db.session.add(new_shared)
            else:
                return "List already shared with email"
