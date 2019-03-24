create table users (
    user_id serial primary key,
    username varchar,
    password varchar,
    profile_pic varchar
    );
create table workouts (
    workout_id serial primary key,
    workout_name varchar,
    users_id integer references users(user_id) on delete cascade
    );
create table exercises ( 
    exercise_id serial primary key,
    exercise_name varchar,
    reps integer,
    sets integer,
    weight integer,
    workouts_id integer references workouts(workout_id) on delete cascade
)
insert into users (username, password, profile_pic)
values ('Test', '1','test_image')
insert into users (username, password, profile_pic)
values ('Test2', '1','test_image')
insert into users (username, password, profile_pic)
values ('Test3', '1','test_image')

insert into workouts (name)
values (${name})
