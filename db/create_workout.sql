insert into workouts (name, user_id)
values ($1, $2)
returning name