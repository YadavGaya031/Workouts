# Workout App

A full-stack web application for managing workouts and routines, built with FastAPI backend and Next.js frontend.

## Features

- User authentication (registration and login)
- Create, view, and delete workouts
- Create, view, and delete routines (collections of workouts)
- JWT-based authentication
- Responsive UI with Bootstrap
- Protected routes
- Error handling and loading states

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- SQLite database
- JWT authentication
- Python-Jose for token handling
- Passlib for password hashing

### Frontend
- Next.js 15
- React 19
- Bootstrap 5
- Axios for API calls

## Project Structure

```
workout/
├── fastapi/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── database.py
│   │   ├── deps.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── routers/
│   │       ├── __init__.py
│   │       ├── auth.py
│   │       ├── routines.py
│   │       └── workouts.py
│   ├── requirements.txt
│   └── workout_app.db
├── nextjs/
│   ├── src/
│   │   └── app/
│   │       ├── components/
│   │       │   └── ProtectedRoute.js
│   │       ├── context/
│   │       │   └── AuthContext.js
│   │       ├── login/
│   │       │   └── page.js
│   │       ├── page.js
│   │       ├── globals.css
│   │       ├── layout.js
│   │       └── page.module.css
│   ├── package.json
│   ├── jsconfig.json
│   ├── next.config.mjs
│   └── public/
│       ├── favicon.ico
│       ├── file.svg
│       ├── globe.svg
│       ├── next.svg
│       ├── vercel.svg
│       └── window.svg
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the fastapi directory:
   ```
   cd fastapi
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file in the fastapi directory with:
   ```
   AUTH_SECRET_KEY=your_secret_key_here
   AUTH_ALGORITHM=HS256
   ```

4. Run the FastAPI server:
   ```
   uvicorn api.main:app --reload
   ```

   The backend will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the nextjs directory:
   ```
   cd nextjs
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

   The frontend will be available at http://localhost:3000

## API Endpoints

### Authentication
- `POST /auth/` - Create a new user
- `POST /auth/token` - Login and get access token

### Workouts
- `GET /workouts/workouts` - Get all workouts for the authenticated user
- `GET /workouts/workouts/{workout_id}` - Get a specific workout
- `POST /workouts` - Create a new workout
- `DELETE /workouts?workout_id={id}` - Delete a workout

### Routines
- `GET /routines` - Get all routines for the authenticated user
- `POST /routines` - Create a new routine
- `DELETE /routines?routine_id={id}` - Delete a routine

All endpoints except user creation require JWT authentication via Authorization header: `Bearer {token}`

## Frontend Features

- **Login/Register Page**: Forms for user authentication
- **Home Page**: Dashboard for managing workouts and routines
- **Protected Routes**: Automatic redirection to login if not authenticated
- **Create Workout**: Form to add new workouts with name and description
- **Create Routine**: Form to add new routines, selecting from existing workouts
- **View Workouts**: List of user's workouts with delete functionality
- **View Routines**: List of user's routines showing associated workouts
- **Error Handling**: User-friendly error messages
- **Loading States**: Indicators during API calls

## Usage Examples

### Creating a Workout
1. Log in to the application
2. Click on "Create Workout" accordion
3. Enter workout name and description
4. Click "Create Workout"

### Creating a Routine
1. Ensure you have workouts created
2. Click on "Create Routine" accordion
3. Enter routine name and description
4. Select workouts to include in the routine
5. Click "Create Routine"

### Managing Data
- View all workouts and routines on the home page
- Delete workouts or routines using the respective delete buttons

## License

MIT License

Copyright (c) 2024 Workout App

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
