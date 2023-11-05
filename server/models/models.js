const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { Sequelize } = require('../db');

const User = sequelize.define(
    'user',
    {
        id: {type: DataTypes.UUID, primaryKey: true, unique: true, allowNull: false, defaultValue: Sequelize.literal('uuid_in((md5((random())::text))::cstring)')},
        login: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: true},
        role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'USER'}
    }
)

const CollectionType = sequelize.define(
    'collection_type',
    {
        id: {type: DataTypes.UUID, primaryKey: true, unique: true, allowNull: false, defaultValue: Sequelize.literal('uuid_in((md5((random())::text))::cstring)')},
        name: {type: DataTypes.STRING, unique: true, allowNull: false}
    }
)

const Tag = sequelize.define(
    'tag',
    {
        id: {type: DataTypes.UUID, primaryKey: true, unique: true, allowNull: false, defaultValue: Sequelize.literal('uuid_in((md5((random())::text))::cstring)')},
        name: {type: DataTypes.STRING, unique: true, allowNull: false}
    }
)

const Collection = sequelize.define(
    'collection',
    {
        id: {type: DataTypes.UUID, primaryKey: true, unique: true, allowNull: false, defaultValue: Sequelize.literal('uuid_in((md5((random())::text))::cstring)')},
        name: {type: DataTypes.STRING, allowNull: false}
    }
)

const Attachment = sequelize.define(
    'attachment',
    {
        id: {type: DataTypes.UUID, primaryKey: true, unique: true, allowNull: false, defaultValue: Sequelize.literal('uuid_in((md5((random())::text))::cstring)')},
        path: {type: DataTypes.STRING, allowNull: false}
    }
)

const Item = sequelize.define(
    'item',
    {
        id: {type: DataTypes.UUID, primaryKey: true, unique: true, allowNull: false, defaultValue: Sequelize.literal('uuid_in((md5((random())::text))::cstring)')},
        name: {type: DataTypes.STRING, allowNull: false},
        avatar_path: {type: DataTypes.STRING},
        rating: {type: DataTypes.FLOAT},
        order_number: {type: DataTypes.INTEGER}
    }
)

const TagItem = sequelize.define(
    'tag_item',
    {
        id: {type: DataTypes.UUID, primaryKey: true, unique: true, allowNull: false, defaultValue: Sequelize.literal('uuid_in((md5((random())::text))::cstring)')}
    }
)

Collection.belongsTo(User);
User.hasMany(Collection);

CollectionType.hasMany(Collection);
Collection.belongsTo(CollectionType);

Item.belongsTo(Collection);
Collection.hasMany(Item);

Attachment.belongsTo(Item);
Item.hasMany(Attachment);

Tag.belongsToMany(Item, {through: TagItem});
Item.belongsToMany(Tag, {through: TagItem});


module.exports = {
    User, Collection, CollectionType, Item, Attachment, Tag
};