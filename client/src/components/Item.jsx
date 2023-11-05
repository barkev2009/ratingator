import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../slices/items';
import styles from '../css/Item.module.css';

const Item = ({item}) => {

    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(deleteItem({id: item.id}))
    }

  return (
    <div className={styles.itemContainer}>
        <div><b>{`${item.name}`}</b></div>
        <div onClick={deleteHandler}>DELETE</div>
    </div>
  )
}

export default Item