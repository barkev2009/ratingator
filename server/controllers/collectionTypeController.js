const { CollectionType } = require('../models/models');
const ApiError = require('../error/ApiError');
const tryCatchWrapper = require('../utils/tryCatchWrapper');

class CollectionTypeController {

    async create(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { name } = req.body;
                const collectionTypeCheck = await CollectionType.findAll({ where: { name } });
                if (collectionTypeCheck.length !== 0) {
                    return next(ApiError.badRequest({ function: 'CollectionTypeController.create', message: 'Тип коллекции уже существует' }));
                }

                const collectionType = await CollectionType.create({ name });
                return res.json(collectionType);
            }, req, res, next, 'CollectionTypeController.create'
        )
    }

    async edit(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { id } = req.params;
                const { name } = req.body;
                const collectionType = await CollectionType.findOne({ where: { id } });
                if (!collectionType) {
                    return next(ApiError.badRequest({ function: 'CollectionTypeController.edit', message: 'Типа коллекции не существует' }));
                }

                const result = await CollectionType.update(
                    { name },
                    { where: { id } }
                );

                const newCollectionType = await CollectionType.findOne({ where: { name } });
                return res.json({ collectionType: newCollectionType, result });
            }, req, res, next, 'CollectionTypeController.edit'
        )
    }

    async delete(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { id } = req.params;
                if (id) {
                    const collectionType = await CollectionType.findOne({ where: { id } });

                    await CollectionType.destroy({ where: { id } });
                    return res.json(
                        {
                            collectionType,
                            result: 1
                        }
                    )
                }
            }, req, res, next, 'CollectionTypeController.delete'
        )
    }

    async getAllCollectionTypes(req, res, next) {
        tryCatchWrapper(
            async () => {
                const collectionTypes = await CollectionType.findAll();
                return res.json(collectionTypes);
            }, req, res, next, 'CollectionTypeController.getAllCollectionTypes'
        )
    }

    async getCollectionTypeById(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { id } = req.params;
                const collectionType = await CollectionType.findOne({ where: { id } });
                return res.json(collectionType);
            }, req, res, next, 'CollectionTypeController.getCollectionTypeByName'
        )
    }
}

module.exports = new CollectionTypeController();