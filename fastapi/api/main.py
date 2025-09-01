from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, workouts, routines
from .database import Base, engine


app = FastAPI()

Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=['https://workouts-b31rolftr-yadavgaya031s-projects.vercel.app', 'http://localhost:3000', 'https://workouts-nine-nu.vercel.app'],
    allow_credentials=True,
    allow_headers=['*'],
    allow_methods=['*']
)


@app.get('/')
def hello_World():
    return "hello world"

app.include_router(auth.router)
app.include_router(workouts.router)
app.include_router(routines.router)
