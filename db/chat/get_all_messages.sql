SELECT message_id, message, sender_id, date_sent, username FROM messages

JOIN canyon_users ON canyon_users.user_id = messages.sender_id
WHERE room_id = ${room_id}