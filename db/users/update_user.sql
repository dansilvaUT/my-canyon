UPDATE canyon_users
SET about = ${description}
WHERE user_id = ${id}

-- SELECT username, email, profile_pic 
-- FROM canyon_users 
-- WHERE user_id = ${id};
RETURNING username, profile_pic, about;