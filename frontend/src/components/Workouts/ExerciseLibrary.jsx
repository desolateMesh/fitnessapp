import React, { useEffect, useState } from 'react';
import { fetchExercises } from '../../store/slices/workoutSlice';
import { useDispatch, useSelector } from 'react-redux';

const ExerciseLibrary = () => {
  const dispatch = useDispatch();
  const { exercises } = useSelector(state => state.workout);
  
  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl mb-4">Exercise Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exercises.map(ex => (
          <div key={ex.id} className="border p-2">
            <h2 className="font-semibold">{ex.name}</h2>
            <video src={ex.videoUrl} controls className="w-full h-auto"></video>
            <p>{ex.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseLibrary;
