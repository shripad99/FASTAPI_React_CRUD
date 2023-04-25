from fastapi import APIRouter
from config.db import con
from models.user import users
from schemas.user import User
user = APIRouter()

@user.get('/')
async def fetch_users():
    return con.execute(users.select()).fetchall()

@user.get('/{id}')
async def fetch_user(id: int):
    return con.execute(users.select().where(users.c.id == id)).first()

@user.post('/')
async def create_users(user: User):
    con.execute(users.insert().values(
        name = user.name,
        email = user.email,
        password = user.password
    ))
    return con.execute(users.select()).fetchall()

@user.put('/{id}')
async def update_user(id: int, user: User):
    con.execute(users.update().values(
        name = user.name,
        email = user.email,
        password = user.password
    ).where(users.c.id == id))
    return con.execute(users.select()).fetchall()

@user.delete('/{id}')
async def delete_user(id: int):
    con.execute(users.delete().where(users.c.id == id))
    return con.execute(users.select()).fetchall()