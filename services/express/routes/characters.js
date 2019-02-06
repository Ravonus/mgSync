module.exports = {
    route: (req, res) => {
        res.render('characters', { title: 'characters' });
    },
    path: '/characters'
}