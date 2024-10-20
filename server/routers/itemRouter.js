const Router = require('express');
const router = new Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, itemController.create);
router.put('/:id', authMiddleware, itemController.edit);
router.delete('/:id', authMiddleware, itemController.delete);
router.get('/id/:id', authMiddleware, itemController.getItemById);
router.get('/collection/:collectionId', authMiddleware, itemController.getItemsByCollection);

module.exports = router;