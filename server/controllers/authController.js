const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {//TODO add profile pic later
        const { username, email, password } = req.body;
        const db = req.app.get('db');

        const findUser = await db.users.get_user({ username });
        const result = findUser[0];

        if (result) {
            return res.status(400).send(`sername already taken!`);
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        let date = new Date();//TODO Need to remove the generated profile pic once S3 is set up
        const newUser = await db.users.register({ username, email, hash, profile_pic: `https://robohash.org/${username}.png`, about: null, date });

        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');

        const findUser = await db.users.get_user({ username });
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
    }
}