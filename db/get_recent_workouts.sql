select username, workout_name, profile_pic, workout_id
from users, workouts
where user_id = users_id
limit 10