SELECT 
c.canyon_id,
c.canyon_name, 
c.canyon_description,
c.canyon_pic,
c.canyon_state,
c.date_created,
u.username,
c.canyon_owner,
c.zipcode
FROM
canyons c
JOIN canyon_users u ON u.user_id = c.canyon_owner
WHERE c.canyon_id = ${id};