SELECT ROUND(AVG(rating), 1) AS average
FROM ratings WHERE canyon = ${canyon_id};