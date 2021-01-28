SELECT 
cm.comment_id,
cm.user_comment,
u.username
FROM comments cm
JOIN canyon_users u ON u.user_id = cm.comment_owner;
