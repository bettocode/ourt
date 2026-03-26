'use client'
import Image from "next/image";
import styles from "../page.module.css";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';



export default function Login ({ href }) {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('ourt-user')) || null
  )
  const [jwt_user, setJWTUser] = useState(
    JSON.parse(localStorage.getItem('ourt-user')) || null
  )
  const router = useRouter();


  async function userLogin () {
    const url = "https://eloy-back-timer-api-server.onrender.com/api/v1/auth/login";
    try {
      const response = await fetch(url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-api-key": process.env.xapikey
          },
          body: new URLSearchParams({ email: email, password: password })
        }
      )

      const data = await response.json();

      if (data.user) {
        setUser(data.user);
        setJWTUser(data.refresh_token);
        localStorage.setItem("ourt-user", JSON.stringify(data.user))
        localStorage.setItem("ourt-jwtUser", JSON.stringify(data.refresh_token))
      }

    } catch (error) {
      console.log("Error:", error)
    }
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Iniciar Sesión</h1>
          <form>
            <label>Correo Electrónico</label>
            <input
              type="text"
              placeholder="ejemplo@ourt.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="12345*%&#$"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="button"
              value="Ingresar"
              onClick={(e) => {
                e.preventDefault()
                userLogin();
              }}
            />
          </form>
          <Link href="/">
            <button>Home</button>
          </Link>
        </div>
      </main>
    </div>
  );
}