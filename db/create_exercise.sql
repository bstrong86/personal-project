insert into exercises (exercise_name, reps, sets, weight, workouts_id)
values (${exercise_name}, ${reps}, ${sets}, ${weight}, ${workouts_id})
returning exercise_name, reps, sets, weight