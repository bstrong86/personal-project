select * from workouts
join users on users.user_id = workouts.user_id
where users_id = ${users_id}