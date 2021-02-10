UPDATE canyon_users
SET about = ${description}
WHERE user_id = ${id};

SELECT user_id, 
username, 
email, 
about, 
date_added, 
profile_pic 
FROM canyon_users 
WHERE user_id = ${id};