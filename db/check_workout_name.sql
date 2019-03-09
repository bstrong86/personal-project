select count(*)
from workouts
where workout_name = ${workout_name} 
and users_id = ${users_id}