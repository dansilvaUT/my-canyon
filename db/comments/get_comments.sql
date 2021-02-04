SELECT 
cm.comment_id,
cm.user_comment,
u.username,
u.profile_pic,
canyons.canyon_name,
u.user_id
FROM comments cm
JOIN canyon_users u ON u.user_id = cm.comment_owner
JOIN canyons ON canyons.canyon_id = cm.canyon_id
WHERE cm.canyon_id = ${id};
