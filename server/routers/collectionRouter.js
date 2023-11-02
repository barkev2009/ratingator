const Router = require('express');
const router = new Router();
const collectionController = require('../controllers/collectionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, collectionController.create);
router.put('/:id', authMiddleware, collectionController.edit);
router.delete('/:id', authMiddleware, collectionController.delete);
router.get('/', authMiddleware, collectionController.getAllCollections);
router.get('/id/:id', authMiddleware, collectionController.getCollectionById);
router.get('/by_user_type', authMiddleware, collectionController.getCollectionByUserType);

module.exports = router;