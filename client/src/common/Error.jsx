import React from 'react'
import styles from '../css/Error.module.css'

const Error = ({ error }) => {
    return (
        <pre className={styles.errorDisplay}>
            {error}
        </pre>
    )
}

export default Error