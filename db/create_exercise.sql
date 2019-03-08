insert into exercises (name, reps, sets, weight, workout_id)
values (${name}, ${reps}, ${sets}, ${weight})
returning name, reps, sets, weight