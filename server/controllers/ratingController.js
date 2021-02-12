module.exports = {
    addRating: async (req, res) => {
        const { canyon_id: canyon, rating } = req.body;
        const { user_id } = req.session.user;
        const db = req.app.get('db');

        const query = await db.ratings.check_rating({ canyon, user_id });

        if (rating === null) {
            return res.status(400).send(`Rating is null!`);
        }

        if (query[0]) {
            return res.status(400).send(`You've already rated this canyon!`);
        }



        await db.ratings.add_rating({ canyon, user_id, rating })
            .then(() => res.sendStatus(201))
            .catch(err => {
                res.status(500).send(err);
                console.log(`Error: ${err.message}`);
            });
    },

    getRating: async (req, res) => {
        const db = req.app.get('db');
        const { id: canyon_id } = req.params;
        const [query] = await db.ratings.get_rating({ canyon_id });

        res.status(200).send(query);
    },

    checkIfUserRated: async (req, res) => {
        const { user_id } = req.session.user;
        const { parsedID: canyon } = req.params;
        const db = req.app.get('db');

        let foundRating = false;
        const query = await db.ratings.check_rating({ canyon, user_id });
 
        if (query[0]) {
            foundRating = true;
            return res.status(200).send(foundRating);
        }

        res.status(200).send(foundRating);
    }
}