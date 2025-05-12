import React from 'react';
import { useSelector } from 'react-redux';
import Tag from '../components/Tag';
import styles from '../css/CollectionTags.module.css';

const CollectionTags = () => {
    const tags = useSelector(state => state.tags.data);

    return (
        <div className={styles.container}>
            <div className={styles.tagsContainer}>
                {tags.map(item => (
                    <Tag key={item.id} tag={item} />
                ))}
            </div>
        </div>
    );
};

export default CollectionTags;