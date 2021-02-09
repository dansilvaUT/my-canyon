UPDATE canyon_users 
SET profile_pic = ${image}
WHERE user_id = ${id}

RETURNING profile_pic;