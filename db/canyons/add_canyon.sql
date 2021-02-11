INSERT INTO canyons (
    canyon_name, 
    canyon_description, 
    canyon_pic, 
    canyon_state, 
    canyon_owner,
    date_created,
    zipcode
) VALUES (
    ${canyon_name},
    ${canyon_description},
    ${canyon_pic},
    ${canyon_state},
    ${user_id},
    ${date},
    ${zipcode}
);