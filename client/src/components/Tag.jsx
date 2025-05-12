import React from 'react';
import styles from '../css/Tag.module.css';
import { useDispatch } from 'react-redux';
import { toggleFilterTags } from '../reducers/tags';
import { setTag, unsetTag } from '../reducers/items';

const Tag = ({ tag, item, control, set }) => {
    const dispatch = useDispatch();

    const clickHandler = () => {
        if (!item) {
            dispatch(toggleFilterTags(tag.id));
        }
        if (control) {
            if (set) {
                dispatch(unsetTag({ tagId: tag.id, itemId: item.id }));
            } else {
                dispatch(setTag({ tagId: tag.id, itemId: item.id }));
            }
        }
    };

    const getTagStyle = () => {
        const baseStyle = {
            backgroundColor: tag.active ? `${tag.color}20` : 'transparent',
            borderColor: tag.active ? tag.color : 'gray',
            color: tag.active ? tag.color : 'gray'
        };

        if (item) {
            if (!control) {
                return {
                    backgroundColor: tag.color,
                    color: '#121212'
                };
            }
            return {
                borderColor: set ? tag.color : 'gray',
                color: set ? tag.color : 'gray'
            };
        }
        return baseStyle;
    };

    return (
        <span
            onClick={clickHandler}
            className={styles.tag}
            style={getTagStyle()}
            title={tag.name}
        >
            {tag.name}
        </span>
    );
};

export default Tag;