import { router } from '../zghost/app/init.js'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('catalog/index', { title: 'Home' });
});

module.exports = router;
