SELECT ROUND(AVG(rating), 2) AS average
FROM ratings WHERE canyon = ${canyon_id};