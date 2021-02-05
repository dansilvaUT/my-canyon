INSERT INTO messages (room_id,message,sender_id)
VALUES (${room_id},${message},${sender_id});

SELECT *
FROM messages
WHERE room_id = ${room_id};
