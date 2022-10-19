import {useEffect,useState} from 'react';
import { NextPage } from 'next';
import { supabase } from '../utils/supabase';
import { Task,Notice } from '../types/types';
import { Layout } from '../components/Layout';
import Link from 'next/link';
import router from 'next/router';

const Csr=()=>{
  const [tasks,setTasks]=useState<Task[]>([])
  const[notices,setNotices]=useState<Notice[]>([])
  //このページがマウントされたときにスパベースにクライアントからフェッチをしたい
  useEffect(()=>{
    const getTasks=async()=>{
      const { data: tasks } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true })
      setTasks(tasks as Task[])
    }
    const getNotices=async()=>{
      const { data: notices } = await supabase
      .from('notices')
      .select('*')
      .order('created_at', { ascending: true })
      setNotices(notices as Notice[])
    }
    getTasks()
    getNotices()
    },[])//初回だけ実行。スパベースから取ってくる
  return(
    <>
    <Layout title="CSR">
        <p className="mb-3 text-blue-500">SSG+CSF</p>
        <ul className="mb-3">
          {tasks.map((task) => {
            return(
            <li key={task.id}>
              <p className="text-lg font-extrabold">{task.title}</p>
            </li>
          )})}
        </ul>
        <ul className="mb-3">
          {notices.map((notice) => (
            <li key={notice.id}>
              <p className="text-lg font-extrabold">{notice.content}</p>
            </li>
          ))}
        </ul>
        <Link href="/ssr" prefetch={false}>
          <a className='my-3 text-xs'>Link to SSR</a>
        </Link>
        <button className='mb-3 text-xs' onClick={()=>router.push('/ssr')}>Route to SSR</button>
      </Layout>
    </>
  )
}

export default Csr