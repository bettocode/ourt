import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';


export default function Home () {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Ourt</h1>
          <p>Tu tiempo, tu dinero.</p>
          <Link href="/login">
            <button>Comenzar</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
