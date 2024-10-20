const { Item, Collection, Attachment, Tag, TagItem } = require('../models/models');
const ApiError = require('../error/ApiError');
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const { model } = require('../db');
const fs = require('fs');
const pathLib = require('path');
const uuid = require('uuid');
const sharp = require('sharp');
const axios = require('axios');

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

                const crItem = await Item.create({ name, collectionId, rating: 0 });
                const item = await Item.findOne({
                    where: { id: crItem.id },
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
                    { name, collectionId, rating, order_number },
                    { where: { id } }
                );

                if (avatar_path !== null && avatar_path !== undefined) {
                    const splits = avatar_path.split('?')[0].split('.');
                    const fmt = splits[splits.length - 1];
                    if (!['jpg', 'png', 'webp', 'jpeg'].includes(fmt.toLowerCase())) {
                        return next(ApiError.badRequest({ function: 'ItemController.edit', message: 'Формат не подходит' }));
                    }
                    const input = (await axios({ url: avatar_path, responseType: "arraybuffer" })).data;
                    const fileName = uuid.v4();
                    if (item.avatar_path !== null) {
                        const dashes = item.avatar_path.split('/');
                        console.log(pathLib.resolve(__dirname, '..', 'static', dashes[dashes.length - 1]));
                        fs.rmSync(pathLib.resolve(__dirname, '..', 'static', dashes[dashes.length - 1]));
                    }

                    const pipeline = sharp(input).resize(200, 200, {fit: 'cover'}).toFile(pathLib.resolve(__dirname, '..', 'static', fileName + '.' + fmt));

                    const anotherResult = await Item.update(
                        { avatar_path: `${process.env.SERVER_URL}/${fileName}.${fmt}` },
                        { where: { id } }
                    );
                }

                const newItem = await Item.findOne({
                    where: { id },
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
                const { limit, offset, sortByRating, tags } = req.query;
                let order = [['createdAt', 'DESC']];
                if (sortByRating === 'true') {
                    order = [['rating', 'DESC'], ['createdAt', 'DESC']]
                }
                let items = await Item.findAll({
                    where: { collectionId },
                    limit,
                    offset,
                    order,
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
                if (tags && tags.length > 0) {
                    items = items.filter(
                        item =>
                            item.tags.map(tag => tag.name).length > 0 &&
                            tags.every(
                                elem => item.tags.map(tag => tag.id).includes(elem)
                            )
                    )
                }
                return res.json(items);
            }, req, res, next, 'ItemController.getItemsByCollection'
        )
    }

    async getItemById(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { id } = req.params;
                const item = await Item.findOne(
                    {
                        where: { id },
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
                    }
                );
                return res.json(item);
            }, req, res, next, 'ItemController.getItemById'
        )
    }
}

module.exports = new ItemController();