'use client'

import styles from "../page.module.css";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';



export default function Login () {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('ourt-user')) || null
  )

  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();


  async function userLogin () {
    const url = "https://eloy-back-timer-api-server.onrender.com/api/v1/auth/login";
    console.log(process.env.xapikey)
    try {
      const response = await fetch(url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-api-key": process.env.NEXT_PUBLIC_XAPIKEY
          },
          body: new URLSearchParams({ email: email, password: password })
        }
      )
      if (response.status === 200) {
        const data = await response.json();

        if (data.user) {
          setUser(data.user);
          localStorage.setItem("ourt-user", JSON.stringify(data.user))
          localStorage.setItem("ourt-jwt-access", JSON.stringify(data.access_token))
          localStorage.setItem("ourt-jwt-refresh", JSON.stringify(data.refresh_token))
        }
      }

      if (response.status === 401) setErrorMessage("Invalid email or password")
      if (response.status === 403) setErrorMessage("Account is inactive")

    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    if (user) {
      router.push('/admin')
    }
  }, [user])

  if (!user) {
    <div div className={styles.page} >
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
            <p>{errorMessage}</p>
          </form>
          <Link href="/">
            <button>Home</button>
          </Link>
        </div>
      </main>
    </div>
  } else {
    <div></div>
  }
}