module.exports = {
    getComments: async (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        const comments = await db.comments.get_comments({ id });

        if (!comments[0]) {
            return res.status(404).send(`No comments found`);
        }
        res.status(200).send(comments);
    },

    getComment: async (req, res) => {
        const { id } = req.params;
        const db = req.app.get('db');
        const [comment] = await db.comments.get_comment({ comment_id: id });

        res.status(200).send(comment);
    },

    addComment: async (req, res) => {
        const { user_id } = req.session.user;
        const { comment } = req.body;
        const { id } = req.params;

        const db = req.app.get('db');

        await db.comments.add_comment({ comment, canyon_id: id, owner_id: user_id })
            .then(() => res.sendStatus(201))
            .catch(err => {
                res.status(500).send(err);
                console.log(`Error: ${err.message}`);
            });
    },

    deleteComment: async (req, res) => {
        const { id } = req.params;

        await req.app.get('db').comments.delete_comment({ comment_id: id })
            .then(() => { res.sendStatus(200); })
            .catch(err => {
                res.status(500).send(err);
                console.log(`Error: ${err.message}`);
            });
    },

    editComment: (req, res) => {
        const { comment } = req.body;
        const { id:comment_id } = req.params;
        req.app.get('db').comments.edit_comment({ comment_id, comment })
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send(err);
                console.log(`Controller Error: ${err.message}`);
            });
    }
}