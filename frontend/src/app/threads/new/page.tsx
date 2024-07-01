import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const NewThread = () => {
  const router = useRouter()
  const [thread, setThread] = useState({
    title: '',
    name: '',
    email: '',
    content: '',
  })

  const createThread = async (e: any) => {
    e.preventDefault()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/threads`, {
        method: 'POST',
        body: JSON.stringify(thread),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) throw new Error('スレッドの作成に失敗しました')
      alert('スレッドを作成しました')
      router.push('/')
    } catch (err) {
      alert(err)
    }
  }

  const handleChange = (e: any) => {
    setThread({ ...thread, [e.target.name]: e.target.value })
  }

  return (
      <section className="mb-8">
        <div className="p-1.5 bg-green-200">
          <div className="mb-2 border border-black">
            <h2 className="p-3 text-xl font-semibold">新規スレッド書き込み</h2>
            <form onSubmit={createThread} className="max-w-2xl mb-8 px-8 grid grid-cols-12 gap-2">
              <label className="col-span-2 text-right" htmlFor="title">
                タイトル{' : '}
              </label>
              <input
                id="title"
                name="title"
                className="col-span-7 p-0.5 text-sm border border-gray-500 rounded"
                type="text"
                value={thread.title}
                onChange={handleChange}
              ></input>
              <div className="col-span-3 flex justify-end">
                <button className="px-1.5 py-0.5 text-sm bg-gray-300 border border-gray-500 rounded" type="submit">
                  新規スレッド書込
                </button>
              </div>
              <label className="col-span-2 text-right" htmlFor="name">
                名前{' : '}
              </label>
              <input
                id="name"
                name="name"
                className="col-span-4 p-0.5 text-sm border border-gray-500 rounded"
                type="text"
                value={thread.name}
                onChange={handleChange}
              ></input>
              <label className="col-span-2 text-right" htmlFor="email">
                E-mail{' : '}
              </label>
              <input
                id="email"
                name="email"
                className="col-span-4 p-0.5 text-sm border border-gray-500 rounded"
                type="text"
                value={thread.email}
                onChange={handleChange}
              ></input>
              <label className="col-span-2 text-right" htmlFor="content">
                内容{' : '}
              </label>
              <textarea
                id="content"
                name="content"
                className="col-span-10 p-0.5 text-sm border border-gray-500 rounded"
                value={thread.content}
                onChange={handleChange}
              ></textarea>
            </form>
          </div>
          <div className="py-1 text-center border border-black">
            <Link href="/" className="text-sm text-blue-900 underline">
              ■掲示板一覧■
            </Link>
          </div>
        </div>
      </section>
  )
}

export default NewThread