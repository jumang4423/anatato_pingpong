
import Head from 'next/head'
import { useEffect, useState } from 'react'
import database from '../apis/firebase'
import styles from '../styles/Home.module.css'

import useSound from 'use-sound'
import { Button } from '@material-ui/core'

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
    // グレイにする
    setIs_img_effect(false)
    setTimeout(() => {
      setIs_img_effect(true)
    }, 250);
  }, [todoList])

  const updatePingo = () => {
    // initialize data
    const data = { title: "pongie", value: Number(todoList) + 1 }
    //add to db
    messagesRef.update(data)
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
        <img className={is_img_effect ? styles.img_gray : undefined} src={"/ping.png"} alt="バスのピンポン" width={200} onClick={() => { is_img_effect &&  updatePingo() }} />
      </div>

      <div className={styles.container3}>
        <Button className={styles.but} variant="contained" color="primary" href="https://twitter.com/intent/tweet?text=%E3%83%94%E3%83%B3%E3%83%9D%E3%83%B3%E4%B8%80%E7%B7%92%E3%81%AB%E3%81%97%E3%81%BE%E3%81%9B%E3%82%93%E3%81%8B!%0Ahttps%3A%2F%2Fanatato-pingpong.web.app%2F">
          Twitterでピンポン友達を探す
        </Button>
      </div>

      <footer className={styles.footer}>
        <a href={"https://github.com/jumang4423/anatato_pingpong"}> https://github.com/jumang4423/anatato_pingpong </a>
        <div> 
          トラフィック: {todoList}
        </div>
      </footer>
    </div>
  )
}
