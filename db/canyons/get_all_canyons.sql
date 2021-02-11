SELECT c.canyon_id,  
c.canyon_name, 
c.canyon_pic,
u.username,
c.zipcode
FROM canyons c
JOIN canyon_users u ON u.user_id = c.canyon_owner
ORDER BY date_created;