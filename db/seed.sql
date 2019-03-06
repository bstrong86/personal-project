create table users (
    username varchar,
    password varchar,
    profile_pic varchar
    );
create table workouts (
    id serial primary key,
    name varchar,
    user_id integer references users(id)
    );
create table exercises (
    id serial primary key,
    name varchar,
    reps integer,
    sets integer,
    workout_id integer references workouts(id)
)
insert into users (username, password, profile_pic)
values ('Test', '1','test_image')
insert into users (username, password, profile_pic)
values ('Test2', '1','test_image')
insert into users (username, password, profile_pic)
values ('Test3', '1','test_image')

insert into workouts (name)
values (${name})
