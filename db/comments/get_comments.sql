SELECT 
cm.comment_id,
cm.user_comment,
u.username,
canyons.canyon_name
FROM comments cm
JOIN canyon_users u ON u.user_id = cm.comment_owner
JOIN canyons ON canyons.canyon_id = cm.canyon_id
WHERE cm.canyon_id = ${id};
