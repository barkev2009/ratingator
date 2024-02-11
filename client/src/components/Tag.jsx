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
    }

    const styleHandler = (item) => {
        if (item) {
            if (!control) {
                return ({ color: 'white', backgroundColor: tag.color, borderRadius: '5px' })
            } else {
                if (set) {
                    return ({ color: tag.color, border: `1px solid ${tag.color}`, borderRadius: '5px' });
                }
                return ({ color: 'gray', border: `1px solid gray`, borderRadius: '5px' });
            }
        } else {
            if (tag.active) {
                return ({ color: tag.color, border: `1px solid ${tag.color}`, borderRadius: '5px' });
            }
            return ({ color: 'gray', border: `1px solid gray`, borderRadius: '5px' });
        }

    }

    return (
        <span onClick={clickHandler} className={styles.tag} style={styleHandler(item)}>
            {tag.name}
        </span>
    )
}

export default Tag