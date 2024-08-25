import os
from dotenv import load_dotenv
from supabase import create_client, Client
from flask import Flask, jsonify, request, render_template, send_file
import hashlib

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app = Flask(__name__)

def getUser(username: str):
    return supabase.from_("users").select("*").eq("username", username)

def authenticate(username: str, password: str):
    hashed_password = hashlib.sha256(password.encode("utf-8")).hexdigest()

    response = supabase.from_("users").select("*").eq("username", username).eq("password", hashed_password).execute()

    valid: bool = len(response.data) > 0
    return valid

def createUser(username: str, email: str, password: str):
    hashed_password = hashlib.sha256(password.encode("utf-8")).hexdigest()

    response = supabase.from_("users").insert({
        "username": username, "email": email, "password": hashed_password
    }).execute()

    return response.data

def createPost(username: str, password: str, subject: str, content: str, image_urls: list[str]):
    if not authenticate(username, password): return

    response = supabase.from_("posts").insert({
        "subject": subject, "content": content, "image_urls": image_urls
    }).execute()

    response_user = getUser(username).execute()
    # print(response_user)
    new_list = response_user.data[0]["post_ids"]
    new_list.append(response.data[0]["id"])
    supabase.from_("users").update({ "post_ids": new_list }).eq("username", username).execute()

    return response.data

def getPost(id: int):
    response = supabase.from_("posts").select("*").eq("id", id).execute()
    return response.data[0]

print(getPost(5))

# =================================================================================

# ROUTING

@app.route("/user/<username>")
def user(username: str):
    data = getUser(username).execute().data[0]
    print(data)
    return render_template("user.html", **data)


@app.route("/<path>")
def path(path: str):
    return send_file(f"static/{path}")

if __name__ == '__main__':
    app.run(debug=True)