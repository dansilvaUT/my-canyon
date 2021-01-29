INSERT INTO canyons (
    canyon_name, 
    canyon_description, 
    canyon_pic, 
    canyon_rating, 
    canyon_city, 
    canyon_state, 
    canyon_owner,
    date_created
) VALUES (
    ${canyon_name},
    ${canyon_description},
    ${canyon_pic},
    ${canyon_rating},
    ${canyon_city},
    ${canyon_state},
    ${user_id},
    ${date}
);