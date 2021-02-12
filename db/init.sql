CREATE TABLE IF NOT EXISTS canyon_users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    profile_pic TEXT,
    password VARCHAR(250) NOT NULL,
    about TEXT,
    date_added TIMESTAMP,
)

CREATE TABLE IF NOT EXISTS canyons (
    canyon_id SERIAL PRIMARY KEY,
    canyon_name VARCHAR(50) NOT NULL,
    canyon_description TEXT NOT NULL,
    canyon_city VARCHAR(100),
    canyon_state VARCHAR(20),
    canyon_owner INTEGER REFERENCES canyon_users(user_id) ON DELETE CASCADE,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    zipcode INT
)

CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL PRIMARY KEY,
    user_comment TEXT NOT NULL,
    canyon_id INTEGER  REFERENCES canyons(canyon_id),
    comment_owner INTEGER REFERENCES canyon_users(user_id) ON DELETE CASCADE,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE IF NOT EXISTS chat_rooms (
    id SERIAL INT PRIMARY KEY,
    room_id VARCHAR(100),
    user1 INT,
    user2 INT
)

CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    room_id VARCHAR(100) ,
    message TEXT,
    sender_id INT REFERENCES canyon_users(user_id),
    date_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE ratings (
id SERIAL PRIMARY KEY,
canyon INT REFERENCES canyons(canyon_id),
user_id INT REFERENCES canyon_users(user_id),
rating INT NOT NULL 
)


-- CREATE TABLE IF NOT EXISTS canyon_users (
--     user_id SERIAL PRIMARY KEY,
--     username VARCHAR(60) NOT NULL,
--     email VARCHAR(60) NOT NULL,
--     profile_pic TEXT,
--     password VARCHAR(250) NOT NULL,
--     about TEXT,
--     date_added TIMESTAMP
-- )

-- CREATE TABLE IF NOT EXISTS canyons (
--     canyon_id SERIAL PRIMARY KEY,
--     canyon_name VARCHAR(50) NOT NULL,
--     canyon_description TEXT NOT NULL,
--     canyon_city VARCHAR(100),
--     canyon_state VARCHAR(20),
--     canyon_owner INTEGER REFERENCES canyon_users(user_id) ON DELETE CASCADE,
--     date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     zipcode INT
-- )

-- CREATE TABLE IF NOT EXISTS comments (
--     comment_id SERIAL PRIMARY KEY,
--     user_comment TEXT NOT NULL,
--     canyon_id INTEGER  REFERENCES canyons(canyon_id),
--     comment_owner INTEGER REFERENCES canyon_users(user_id) ON DELETE CASCADE,
--     date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- )

-- CREATE TABLE IF NOT EXISTS chat_rooms (
--     id SERIAL PRIMARY KEY,
--     room_id VARCHAR(100),
--     user1 INT,
--     user2 INT
-- )

-- CREATE TABLE IF NOT EXISTS messages (
--     message_id SERIAL PRIMARY KEY,
--     room_id VARCHAR(100) ,
--     message TEXT,
--     sender_id INT REFERENCES canyon_users(user_id),
--     date_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- )

-- CREATE TABLE ratings (
-- id SERIAL PRIMARY KEY,
-- canyon INT REFERENCES canyons(canyon_id),
-- user_id INT REFERENCES canyon_users(user_id),
-- rating INT NOT NULL 
-- )