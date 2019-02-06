module.exports = {
    route: (req, res) => {
        res.render('index', { title: 'title' });
    },
    path: '/'
}