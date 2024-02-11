import React from 'react'
import { useSelector } from 'react-redux';
import styles from '../css/Tag.module.css';
import Tag from '../components/Tag';

const ItemTags = ({ item }) => {
    const tags = item.tags;

    return (
        <div className={styles.tagContainer}>
            {
                tags.map(
                    i => <Tag tag={i} key={i.id} item={item} />
                )
            }
        </div>
    )
}

export default ItemTags