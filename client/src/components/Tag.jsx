import React from 'react';
import styles from '../css/Tag.module.css';
import { useDispatch } from 'react-redux';
import { toggleFilterTags } from '../reducers/tags';
import { setTag, unsetTag } from '../reducers/items';
import { createSeededRandomGenerator, CustomRandom } from '../utils/random';

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
        const generator = createSeededRandomGenerator(tag.color);
        const baseColor = generator.nextHslColor(271);
        const baseStyle = {
            backgroundColor: 'transparent',
            borderColor: tag.active ? baseColor : 'gray',
            color: tag.active ? baseColor : 'gray'
        };

        if (item) {
            if (!control) {
                return {
                    backgroundColor: baseColor,
                    color: '#121212'
                };
            }
            return {
                borderColor: set ? baseColor : 'gray',
                color: set ? baseColor : 'gray',
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