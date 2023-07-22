const index = (req, res) =>{
    res.render('catalog/index', { title: 'Home' });
}

module.exports = index