const { Attachment, Item, Collection } = require('../models/models');
const ApiError = require('../error/ApiError');
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const fs = require('fs');
const pathLib = require('path');
const uuid = require('uuid');
const imageThumbnail = require('image-thumbnail');

class AttachmentController {

    async create(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { path, itemId } = req.body;
                const itemCheck = await Item.findOne({ where: { id: itemId } });
                if (!itemCheck) {
                    return next(ApiError.badRequest({ function: 'AttachmentController.create', message: `Пункт коллекции с ID ${itemId} не найден` }));
                }
                const splits = path.split('.');
                const fmt = splits[splits.length - 1];
                if (!['jpg', 'png', 'webp', 'jpeg'].includes(fmt.toLowerCase())) {
                    return next(ApiError.badRequest({ function: 'AttachmentController.create', message: 'Формат не подходит' }));
                }
                const thumbnail = await imageThumbnail({ uri: path });
                const fileName = uuid.v4();
                if (itemCheck.avatar_path !== null) {
                    const dashes = itemCheck.avatar_path.split('/');
                    console.log(pathLib.resolve(__dirname, '..', 'static', dashes[dashes.length - 1] ));
                    fs.rmSync(pathLib.resolve(__dirname, '..', 'static', dashes[dashes.length - 1] ));
                }

                fs.writeFileSync(pathLib.resolve(__dirname, '..', 'static', fileName + '.' + fmt), thumbnail);

                const result = await Item.update(
                    { avatar_path: `${process.env.SERVER_URL}/${fileName}.${fmt}` },
                    { where: { id: itemId } }
                );

                const attachment = await Attachment.create({ path, itemId });
                return res.json(attachment);
            }, req, res, next, 'AttachmentController.create'
        )
    }

    async edit(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { id } = req.params;
                const { path, itemId } = req.body;
                const attachment = await Attachment.findOne({ where: { id } });
                if (!attachment) {
                    return next(ApiError.badRequest({ function: 'AttachmentController.edit', message: 'Приложения не существует' }));
                }

                const result = await Attachment.update(
                    { path, itemId },
                    { where: { id } }
                );

                const newAttachment = await Attachment.findOne({ where: { id } });
                return res.json({ attachment: newAttachment, result });
            }, req, res, next, 'AttachmentController.edit'
        )
    }

    async getAllAttachments(req, res, next) {
        tryCatchWrapper(
            async () => {
                const attachments = await Attachment.findAll();
                return res.json(attachments);
            }, req, res, next, 'AttachmentController.getAllAttachments'
        )
    }

    async delete(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { id } = req.params;
                if (id) {

                    const attachment = await Attachment.findOne({ where: { id } });
                    await Attachment.destroy({ where: { id } });
                    return res.json(
                        {
                            attachment,
                            result: 1
                        }
                    )
                }
            }, req, res, next, 'AttachmentController.delete'
        )
    }

    async getAttachmentById(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { id } = req.params;
                const attachment = await Attachment.findOne({ where: { id } });
                return res.json(attachment);
            }, req, res, next, 'AttachmentController.getAttachmentById'
        )
    }

    async getAttachmentsByItem(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { itemId } = req.params;
                const attachments = await Attachment.findAll({ where: { itemId } });
                return res.json(attachments);
            }, req, res, next, 'AttachmentController.getAttachmentsByItem'
        )
    }

    async getAttachmentsByCollection(req, res, next) {
        tryCatchWrapper(
            async () => {
                const { collectionId } = req.params;
                const attachments = await Attachment.findAll(
                    {
                        include: {
                            model: Item,
                            where: { collectionId }
                        }
                    }
                );
                return res.json(attachments);
            }, req, res, next, 'AttachmentController.getAttachmentsByItem'
        )
    }
}

module.exports = new AttachmentController();