const ApiError = require('../error/ApiError');
const { Tag, TagItem, Item } = require('../models/models');
const tryCatchWrapper = require('../utils/tryCatchWrapper');

class TagController {

    async create(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { name, collectionId } = req.body;
                const colors = [
                    'crimson', 'chocolate', 'blueviolet',
                    'darkgoldenrod', 'darkgreen', 'darkmagenta', 'darkorchid',
                    'firebrick', 'indigo', 'midnightblue', 'olive',
                    'palevioletred', 'seagreen', 'steelblue', 'tomato'
                ];
                if (!collectionId) {
                    return next(ApiError.badRequest({ function: 'TagController.create', message: `Неверные параметры: collectionId - ${collectionId}` }));
                }

                const tag = await Tag.create({ name, collectionId, color: colors[Math.floor(Math.random() * colors.length)] });
                return res.json(tag);
            }, req, res, next, 'TagController.create'
        )
    }

    async getAllByCollection(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { collectionId } = req.params;
                const tags = await Tag.findAll({ where: { collectionId } });
                return res.json(tags);
            }, req, res, next, 'TagController.getAllByCollection'
        )
    }

    async set(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { tagId, itemId } = req.body;
                const tag = Tag.findOne({ where: { id: tagId } });
                if (!tag) {
                    return next(ApiError.badRequest({ function: 'TagController.set', message: `Не существует tag c ID ${tagId}` }));
                }
                let item = Item.findOne({ where: { id: itemId } });
                if (!item) {
                    return next(ApiError.badRequest({ function: 'TagController.set', message: `Не существует item c ID ${itemId}` }));
                }
                await TagItem.create({ tagId, itemId });
                item = await Item.findOne({
                    where: { id: itemId },
                    include: [
                        {
                            model: Tag,
                            as: 'tags',
                            through: {
                                model: TagItem,
                                attributes: [],
                                required: false
                            },
                            required: false
                        }
                    ]
                });
                return res.json(item);
            }, req, res, next, 'TagController.set'
        )
    }

    async unset(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { tagId, itemId } = req.body;
                const tagItem = await TagItem.findOne({ tagId, itemId });
                if (!tagItem) {
                    return next(ApiError.badRequest({ function: 'TagController.unset', message: `Не существует tagItem c tagId ${tagId}, itemId ${itemId}` }));
                }

                await TagItem.destroy({ where: { tagId, itemId } });
                const item = await Item.findOne({
                    where: { id: itemId },
                    include: [
                        {
                            model: Tag,
                            as: 'tags',
                            through: {
                                model: TagItem,
                                attributes: [],
                                required: false
                            },
                            required: false
                        }
                    ]
                });
                return res.json(
                    {
                        item,
                        result: 1
                    }
                )
            }, req, res, next, 'TagController.unset'
        )
    }

    async delete(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { id } = req.params;
                if (id) {

                    const tagItems = await TagItem.findAll({ where: { tagId: id } });
                    await TagItem.destroy({ where: { tagId: id } });

                    const tag = await Tag.findOne({ where: { id } });
                    await Tag.destroy({ where: { id } });
                    return res.json(
                        {
                            tag,
                            result: 1,
                            itemsDeleted: tagItems.length
                        }
                    )
                }
            }, req, res, next, 'TagController.delete'
        )
    }
}

module.exports = new TagController();