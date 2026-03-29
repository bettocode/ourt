'use client'

import styles from "../page.module.css";
import { useEffect, useState } from 'react';

export default function Admin () {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('ourt-user')) || null
  )

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Bienvenido, {user.email}</h1>
      </main>
    </div>
  );
}
