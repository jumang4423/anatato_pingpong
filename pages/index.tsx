
import Head from 'next/head'
import { useEffect, useState } from 'react'
import database from '../apis/firebase'
import styles from '../styles/Home.module.css'

import useSound from 'use-sound'

export default function Home() {

  const messagesRef = database.ref("message")
  const [todoList, setTodoList] = useState<number>(0)

  const [is_img_effect, setIs_img_effect] = useState<boolean>(true)

  const [play_pingpong] = useSound('/pong.mp3')

  useEffect(() => {
    messagesRef.on('value', (snapshot: any) => {
      const todos = snapshot.val()
      setTodoList(Number(todos.value))
    });
  }, [])

  useEffect(() => {
    play_pingpong()
  }, [todoList])

  const updatePingo = () => {
    // initialize data
    const data = { title: "pongie", value: Number(todoList) + 1 }
    //add to db
    messagesRef.update(data)

    // グレイにする
    setIs_img_effect(false)
    setTimeout(() => {
      setIs_img_effect(true)
    }, 1000);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>あなたとピンポン</title>
        <meta name="description" content="あなたとpingpongするサービス" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.title}>あなたとピンポン</div>

      <div className={styles.container2}>
        <img className={is_img_effect ? styles.img_gray : undefined} src={"/ping.png"} alt="バスのピンポン" width={200} onClick={() => { updatePingo() }} />
      </div>

      <footer className={styles.footer}>
        <a> https://github.com/jumang4423/anatato_pingpong </a>
      </footer>
    </div>
  )
}
