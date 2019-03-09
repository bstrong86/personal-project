insert into users (username, password, profile_pic)
values (${username}, ${password}, ${profile_pic})
returning user_id, username, profile_pic