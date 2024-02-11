import React from 'react'
import { useSelector } from 'react-redux'
import Tag from '../components/Tag';

const CollectionTags = () => {

    const tags = useSelector(state => state.tags.data);

    return (
        <div>
            {
                tags.map(
                    item => <Tag key={item.id} tag={item} />
                )
            }
        </div>
    )
}

export default CollectionTags