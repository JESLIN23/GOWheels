import React from 'react'
import styles from './ErrorPage.module.css'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className={styles.container}>
        <h2>Page Not found</h2>
        <Link to='/home'>go home</Link>
    </div>
  )
}

export default ErrorPage