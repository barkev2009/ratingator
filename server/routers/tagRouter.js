const Router = require('express');
const router = new Router();
const tagController = require('../controllers/tagController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, tagController.create);
router.delete('/:id', authMiddleware, tagController.delete);
router.get('/:collectionId', authMiddleware, tagController.getAllByCollection);
router.post('/set', authMiddleware, tagController.set);
router.post('/unset', authMiddleware, tagController.unset);

module.exports = router;