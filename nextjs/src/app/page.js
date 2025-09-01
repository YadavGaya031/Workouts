"use client";

import { useContext, useState, useEffect } from 'react';
import AuthContext from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [routineName, setRoutineName] = useState('');
  const [routineDescription, setRoutineDescription] = useState('');
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [creatingWorkout, setCreatingWorkout] = useState(false);
  const [creatingRoutine, setCreatingRoutine] = useState(false);
  const [deletingWorkout, setDeletingWorkout] = useState(null);
  const [deletingRoutine, setDeletingRoutine] = useState(null);
  // const token = localStorage.getItem('token');

  // useEffect(() => {
  //   const fetchWorkoutsAndRoutines = async () => {
  //     try {
  //       const token = localStorage.getItem('token'); 
  //       const [workoutsResponse, routinesResponse] = await Promise.all([
  //         axios.get('http://localhost:8000/workouts/workouts', {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }),
  //         axios.get('http://localhost:8000/routines', {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }),
  //       ]);

  //       setWorkouts(workoutsResponse.data);
  //       setRoutines(routinesResponse.data);
  //     } catch (error) {
  //       console.error('Failed to fetch data:', error);
  //     }
  //   };

  //   fetchWorkoutsAndRoutines();
  // }, []);
   useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchWorkoutsAndRoutines = async () => {
      setLoading(true);
      setError('');
      try {
        const [workoutsResponse, routinesResponse] = await Promise.all([
          axios.get('http://localhost:8000/workouts/workouts', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8000/routines', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setWorkouts(workoutsResponse.data);
        setRoutines(routinesResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to load workouts and routines. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutsAndRoutines();
  }, [token]);

  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    setCreatingWorkout(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/workouts', {
        name: workoutName,
        description: workoutDescription,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts([...workouts, response.data]);
      setWorkoutName('');
      setWorkoutDescription('');
    } catch (error) {
      console.error('Failed to create workout:', error);
      setError('Failed to create workout. Please try again.');
    } finally {
      setCreatingWorkout(false);
    }
  };

  const handleCreateRoutine = async (e) => {
    e.preventDefault();
    setCreatingRoutine(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/routines', {
        name: routineName,
        description: routineDescription,
        workouts: selectedWorkouts,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoutines([...routines, response.data]);
      setRoutineName('');
      setRoutineDescription('');
      setSelectedWorkouts([]);
    } catch (error) {
      console.error('Failed to create routine:', error);
      setError('Failed to create routine. Please try again.');
    } finally {
      setCreatingRoutine(false);
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    setDeletingWorkout(workoutId);
    setError('');
    try {
      await axios.delete(`http://localhost:8000/workouts?workout_id=${workoutId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts(workouts.filter(workout => workout.id !== workoutId));
    } catch (error) {
      console.error('Failed to delete workout:', error);
      setError('Failed to delete workout. Please try again.');
    } finally {
      setDeletingWorkout(null);
    }
  };

  const handleDeleteRoutine = async (routineId) => {
    setDeletingRoutine(routineId);
    setError('');
    try {
      await axios.delete(`http://localhost:8000/routines?routine_id=${routineId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoutines(routines.filter(routine => routine.id !== routineId));
    } catch (error) {
      console.error('Failed to delete routine:', error);
      setError('Failed to delete routine. Please try again.');
    } finally {
      setDeletingRoutine(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container">
        <h1>Welcome!</h1>
        <button onClick={logout} className="btn btn-danger">Logout</button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {loading && <div className="alert alert-info mt-3">Loading...</div>}

        <div className="accordion mt-5 mb-5" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Create Workout
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <form onSubmit={handleCreateWorkout}>
                  <div className="mb-3">
                    <label htmlFor="workoutName" className="form-label">Workout Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="workoutName"
                      value={workoutName}
                      onChange={(e) => setWorkoutName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="workoutDescription" className="form-label">Workout Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="workoutDescription"
                      value={workoutDescription}
                      onChange={(e) => setWorkoutDescription(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={creatingWorkout}>
                    {creatingWorkout ? 'Creating...' : 'Create Workout'}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Create Routine
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <form onSubmit={handleCreateRoutine}>
                  <div className="mb-3">
                    <label htmlFor="routineName" className="form-label">Routine Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="routineName"
                      value={routineName}
                      onChange={(e) => setRoutineName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="routineDescription" className="form-label">Routine Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="routineDescription"
                      value={routineDescription}
                      onChange={(e) => setRoutineDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="workoutSelect" className="form-label">Select Workouts</label>
                    <select
                      multiple
                      className="form-control"
                      id="workoutSelect"
                      value={selectedWorkouts}
                      onChange={(e) => setSelectedWorkouts([...e.target.selectedOptions].map(option => option.value))}
                    >
                      {workouts.map(workout => (
                        <option key={workout.id} value={workout.id}>
                          {workout.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={creatingRoutine}>
                    {creatingRoutine ? 'Creating...' : 'Create Routine'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3>Your Workouts:</h3>
          {workouts.length === 0 ? (
            <p>No workouts found.</p>
          ) : (
            <div className="row">
              {workouts.map(workout => (
                <div key={workout.id} className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{workout.name}</h5>
                      <p className="card-text">{workout.description}</p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteWorkout(workout.id)}
                        disabled={deletingWorkout === workout.id}
                      >
                        {deletingWorkout === workout.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5">
          <h3>Your Routines:</h3>
          {routines.length === 0 ? (
            <p>No routines found.</p>
          ) : (
            <div className="row">
              {routines.map(routine => (
                <div key={routine.id} className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{routine.name}</h5>
                      <p className="card-text">{routine.description}</p>
                      <h6>Workouts:</h6>
                      <ul className="list-group list-group-flush">
                        {routine.workouts && routine.workouts.map(workout => (
                          <li key={workout.id} className="list-group-item">
                            <strong>{workout.name}</strong>: {workout.description}
                          </li>
                        ))}
                      </ul>
                      <button
                        className="btn btn-danger btn-sm mt-2"
                        onClick={() => handleDeleteRoutine(routine.id)}
                        disabled={deletingRoutine === routine.id}
                      >
                        {deletingRoutine === routine.id ? 'Deleting...' : 'Delete Routine'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Home;