module.exports = {
    //S3 TEST
    uploadPhoto: async (req, res) => {
        const { image } = req.body;
        const db = req.app.get('db');
        const { user_id } = req.session.user;
        await db.users.update_image({ id: user_id, image })
            .then(() => res.sendStatus(200))
            .catch(err => console.log(`Error: ${err.message}`));
    }
}