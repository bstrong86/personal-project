insert into workouts (workout_name, users_id)
values (${workout_name}, ${users_id})
returning workout_id, workout_name