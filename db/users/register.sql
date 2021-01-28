INSERT INTO canyon_users (
    username,
    email, 
    profile_pic,
    password
) VALUES (
    ${username},
    ${email},
    ${profile_pic},
    ${hash}
)

RETURNING user_id, username, email, profile_pic;