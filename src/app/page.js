
'use client'

import styles from "./page.module.css";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home () {
  const router = useRouter();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('ourt-user')) || null
  )

  useEffect(() => {
    if (user.email) router.push('/admin')
  }, [])

  if (user) {
    <div></div>
  }
  else {
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Ourt</h1>
          <p>Tu tiempo, tu dinero.</p>
          <Link href="/login">
            <button
              onClick={() => getCompanies()}
            >Comenzar</button>
          </Link>
        </div>
      </main>
    </div>
  }
}
