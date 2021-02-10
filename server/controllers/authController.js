const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {//TODO add profile pic later
        const { username, email, password } = req.body;
        const db = req.app.get('db');

        const findUser = await db.users.check_user({ username });
        const result = findUser[0];

        if (result) {
            return res.status(400).send(`Username already taken!`);
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        let date = new Date();
        const newUser = await db.users.register({ username, email, hash, profile_pic: null, about: null, date });

        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');

        const findUser = await db.users.check_user({ username });
        const result = findUser[0];

        if (!result) {
            return res.status(404).send(`Username not found!`);
        }

        const authenticated = bcrypt.compareSync(password, result.password);
        if (!authenticated) {
            return res.status(401).send(`Ah, Ah, Ah, you didn\'t say the magic word...`);
        }

        delete result.password;

        req.session.user = result;
        res.status(200).send(req.session.user);

    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    getUser: (req, res) => {
        if (req.session.user) {
            return res.send(req.session.user);
        }
        res.status(404).send(`No user found`);
    },

    getUsers: async (req, res) => {
        const db = req.app.get('db');
        const users = await db.users.get_all_users();

        if (!users[0]) {
            return res.status(204).send(`No users found`);
        }
        res.status(200).send(users);
    },

    addDescription: async (req, res) => {
        const { id } = req.params;
        const { description } = req.body;
        const db = req.app.get('db');

        await db.users.update_user({ id, description })
            .then((user) => {
                req.session.user = user[0];
                res.status(200).send(req.session.user);
            })
            .catch(err => console.log(`Controller Error: ${err.message}`));
    }
}