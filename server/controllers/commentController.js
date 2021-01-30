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

    //MIGHT NOT NEED THIS BUT WILL KEEP IT HERE JUST IN CASE LATER ON
    getComment: (req, res) => {

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

    deleteComment: (req, res) => {
        const { comment_id } = req.body;
        req.app.get('db').comments.delete_comment({ comment_id })
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send(err);
                console.log(`Error: ${err.message}`);
            });
    },

    editComment: (req, res) => {
        const { comment_id, comment } = req.body;
        req.app.get('db').comments.edit_comment({ comment_id, comment })
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send(err);
                console.log(`Error: ${err.message}`);
            });
    }
}