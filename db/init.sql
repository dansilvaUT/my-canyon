CREATE TABLE IF NOT EXISTS canyon_users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    profile_pic TEXT,
    password VARCHAR(250) NOT NULL,
    about TEXT,
    date_added TIMESTAMP,
    about VARCHAR(300)
)

CREATE TABLE IF NOT EXISTS canyons (
    canyon_id SERIAL PRIMARY KEY,
    canyon_name VARCHAR(50) NOT NULL,
    canyon_description TEXT NOT NULL,
    canyon_pic TEXT NOT NULL,
    canyon_rating INTEGER,
    canyon_city VARCHAR(100),
    canyon_state VARCHAR(20),
    canyon_owner INTEGER REFERENCES canyon_users(user_id),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL PRIMARY KEY,
    user_comment TEXT NOT NULL,
    canyon_id INTEGER  REFERENCES canyons(canyon_id),
    comment_owner INTEGER REFERENCES canyon_users(user_id),
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)