UPDATE canyon_users
SET username = ${username}
WHERE user_id = ${id};

RETURNING username, email, profile_pic;