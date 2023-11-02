const Router = require('express');
const router = new Router();
const collectionTypeController = require('../controllers/collectionTypeController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), collectionTypeController.create);
router.put('/:id', checkRole('ADMIN'), collectionTypeController.edit);
router.delete('/:id', checkRole('ADMIN'), collectionTypeController.delete);
router.get('/', authMiddleware, collectionTypeController.getAllCollectionTypes);
router.get('/:id', authMiddleware, collectionTypeController.getCollectionTypeById);

module.exports = router;