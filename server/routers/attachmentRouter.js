const Router = require('express');
const router = new Router();
const attachmentController = require('../controllers/attachmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, attachmentController.create);
router.put('/:id', authMiddleware, attachmentController.edit);
router.delete('/:id', authMiddleware, attachmentController.delete);
router.get('/all', authMiddleware, attachmentController.getAllAttachments);
router.get('/id/:id', authMiddleware, attachmentController.getAttachmentById);
router.get('/item/:itemId', authMiddleware, attachmentController.getAttachmentsByItem);
router.get('/collection/:collectionId', authMiddleware, attachmentController.getAttachmentsByCollection);

module.exports = router;