-- SELECT * FROM messages
-- WHERE room_id = ${room_id}

select message_id, message, sender_id, date_sent, username from messages

join canyon_users on canyon_users.user_id = messages.sender_id
WHERE room_id = ${room_id}