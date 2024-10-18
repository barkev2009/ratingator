import React, { useEffect, useState } from 'react'
import Tag from '../components/Tag';
import { useSelector } from 'react-redux';

const ControlTags = ({ item }) => {

    const tags = useSelector(state => state.tags.data);

    return (
        <div>
            {
                tags.map(
                    tag => <Tag key={tag.id + 'control'} item={item} tag={tag} control={true} set={item.tags.map(obj => obj.id).includes(tag.id)} />
                )
            }
        </div>
    )
}

export default ControlTags