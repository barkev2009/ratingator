const { Collection, CollectionType, User, Item } = require('../models/models');
const ApiError = require('../error/ApiError');
const tryCatchWrapper = require('../utils/tryCatchWrapper');

class CollectionController {

    async create(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { name, collectionTypeId, userId } = req.body;
                if (!collectionTypeId || !userId) {
                    return next(ApiError.badRequest({ function: 'CollectionController.create', message: `Неверные параметры: collectionTypeId - ${collectionTypeId}, userId - ${userId}` }));
                }
                const colTypeCheck = CollectionType.findOne({ where: { id: collectionTypeId } });
                if (!colTypeCheck) {
                    return next(ApiError.badRequest({ function: 'CollectionController.create', message: `Тип коллекции с ID ${collectionTypeId} не найден` }));
                }
                const userCheck = User.findOne({ where: { id: userId } });
                if (!userCheck) {
                    return next(ApiError.badRequest({ function: 'CollectionController.create', message: `Пользователь с ID ${userId} не найден` }));
                }

                const collection = await Collection.create({ name, collectionTypeId, userId });
                return res.json(collection);
            }, req, res, next, 'CollectionController.create'
        )
    }

    async edit(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { id } = req.params;
                const { name, collectionTypeId, userId } = req.body;
                const collection = await Collection.findOne({ where: { id } });
                if (!collection) {
                    return next(ApiError.badRequest({ function: 'CollectionController.edit', message: 'Коллекции не существует' }));
                }

                const result = await Collection.update(
                    { name, collectionTypeId, userId },
                    { where: { id } }
                );

                const newCollection = await Collection.findOne({ where: { id } });
                return res.json({ collection: newCollection, result });
            }, req, res, next, 'CollectionController.edit'
        )
    }

    async getAllCollections(req, res, next) {
        tryCatchWrapper(
            async () => {
                const collections = await Collection.findAll();
                return res.json(collections);
            }, req, res, next, 'CollectionController.getAllCollections'
        )
    }

    async delete(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { id } = req.params;
                if (id) {

                    const items = await Item.findAll({ where: { collectionId: id } });
                    await Item.destroy({ where: { collectionId: id } });

                    const collection = await Collection.findOne({ where: { id } });
                    await Collection.destroy({ where: { id } });
                    return res.json(
                        {
                            collection,
                            result: 1,
                            itemsDeleted: items.length
                        }
                    )
                }
            }, req, res, next, 'CollectionController.delete'
        )
    }

    async getCollectionById(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { id } = req.params;
                const collection = await Collection.findOne({ where: { id } });
                return res.json(collection);
            }, req, res, next, 'CollectionController.getCollectionById'
        )
    }

    async getCollectionByUserType(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { collectionTypeId, userId } = req.query;
                const collections = await Collection.findAll({ where: { collectionTypeId, userId } });
                return res.json(collections);
            }, req, res, next, 'CollectionController.getCollectionByUserType'
        )
    }
}

module.exports = new CollectionController();