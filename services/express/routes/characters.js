module.exports = {
    route: (req, res) => {
        res.render('characters', { title: 'title' });
    },
    path: '/characters'
}