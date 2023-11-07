const { Item, Collection, Attachment } = require('../models/models');
const ApiError = require('../error/ApiError');
const tryCatchWrapper = require('../utils/tryCatchWrapper');

class ItemController {

    async create(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { name, collectionId } = req.body;
                if (!collectionId) {
                    return next(ApiError.badRequest({ function: 'ItemController.create', message: `Не указан collectionId` }));
                }
                const colCheck = Collection.findOne({ where: { id: collectionId } });
                if (!colCheck) {
                    return next(ApiError.badRequest({ function: 'ItemController.create', message: `Коллекция с ID ${collectionId} не найдена` }));
                }

                const item = await Item.create({ name, collectionId });
                return res.json(item);
            }, req, res, next, 'ItemController.create'
        )
    }

    async edit(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { id } = req.params;
                const { name, collectionId, avatar_path, rating, order_number } = req.body;
                const item = await Item.findOne({ where: { id } });
                if (!item) {
                    return next(ApiError.badRequest({ function: 'ItemController.edit', message: 'Пункта коллекции не существует' }));
                }

                const result = await Item.update(
                    { name, collectionId, avatar_path, rating, order_number },
                    { where: { id } }
                );

                const newItem = await Item.findOne({ where: { id } });
                return res.json({ item: newItem, result });
            }, req, res, next, 'ItemController.edit'
        )
    }

    async delete(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { id } = req.params;
                if (id) {

                    const attachments = await Attachment.findAll({ where: { itemId: id } });
                    await Attachment.destroy({ where: { itemId: id } });

                    const item = await Item.findOne({ where: { id } });
                    await Item.destroy({ where: { id } });
                    return res.json(
                        {
                            item,
                            result: 1,
                            attachmentsDeleted: attachments.length
                        }
                    )
                }
            }, req, res, next, 'ItemController.delete'
        )
    }

    async getItemsByCollection(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { collectionId } = req.params;
                const items = await Item.findAll({ where: { collectionId } });
                return res.json(items);
            }, req, res, next, 'ItemController.getItemsByCollection'
        )
    }

    async getItemById(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { id } = req.params;
                const item = await Item.findOne({ where: { id } });
                return res.json(item);
            }, req, res, next, 'ItemController.getItemById'
        )
    }
}

module.exports = new ItemController();