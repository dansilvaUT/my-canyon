INSERT INTO canyon_users (
    username,
    email, 
    profile_pic,
    password,
    about,
    date_added
) VALUES (
    ${username},
    ${email},
    ${profile_pic},
    ${hash},
    ${about},
    ${date}
)

RETURNING user_id, username, email, profile_pic, about, date_added;