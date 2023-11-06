const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const collectionTypeRouter = require('./collectionTypeRouter');
const collectionRouter = require('./collectionRouter');
const itemRouter = require('./itemRouter');
const attachmentRouter = require('./attachmentRouter');

router.use('/user', userRouter);
router.use('/collectionType', collectionTypeRouter);
router.use('/collection', collectionRouter);
router.use('/item', itemRouter);
router.use('/attachment', attachmentRouter);

module.exports = router;