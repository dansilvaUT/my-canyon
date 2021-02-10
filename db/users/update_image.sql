UPDATE canyon_users 
SET profile_pic = ${image}
WHERE user_id = ${id};

-- RETURNING profile_pic;
SELECT user_id, 
username, 
email, 
about, 
date_added, 
profile_pic 
FROM canyon_users 
WHERE user_id = ${id};