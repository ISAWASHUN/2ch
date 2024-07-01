'use client'

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import useSWR from "swr";
import { Link as Scroll } from 'react-scroll';
import Link from 'next/link';

interface Thread {
  id: number;
  title: string;
  responses_count: number;
  name: string;
  created_at: string;
  content: string;
  responses: Response[];
}

interface Response {
  id: number;
  response_no: number;
  name: string;
  created_at: string;
  content: string;
}

interface ResponseForm {
  name: string;
  email: string;
  content: string;
}

const Home = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR<{ threads: Thread[] }>(`${process.env.NEXT_PUBLIC_API_URL}/threads`, fetcher);
  const threads = data?.threads;
  const [responseForms, setResponseForms] = useState<ResponseForm[]>([]);

  useEffect(() => {
    if (threads) {
      setResponseForms(
        threads.map(() => ({
          name: '',
          email: '',
          content: '',
        }))
      );
    }
  }, [threads]);

  const createResponse = async (e: FormEvent<HTMLFormElement>, threadId: number, index: number) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/threads/${threadId}/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseForms[index]),
      });
      if (!res.ok) throw new Error('レスの作成に失敗しました');
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    setResponseForms((prev) => {
      const newResponses = [...prev];
      newResponses[index] = { ...newResponses[index], [name]: value };
      return newResponses;
    });
  };

  return (
    <>
      <section className="mb-8">
        <div className="p-1.5 bg-green-200">
          <div className="border border-black">
            <h2 className="p-3 text-xl font-semibold">スレッド一覧</h2>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="p-1.5 bg-green-200">
          <div className="p-1 space-x-2 border border-black">
            {threads &&
              threads.map((thread) => (
                <Scroll
                  key={thread.id}
                  to={thread.id.toString()}
                  className="text-sm text-blue-900 bg-orange-300 bg-opacity-50 underline cursor-pointer"
                >
                  {thread.id}: ★{thread.title}({thread.responses_count + 1})
                </Scroll>
              ))}
          </div>
        </div>
      </section>

      {threads &&
        threads.map((thread, index) => (
          <section id={thread.id.toString()} className="mb-8" key={thread.id}>
            <div className="p-1.5 bg-gray-200">
              <div className="p-2 border border-black">
                <div className="mb-8">
                  <div className="mb-4">
                    <h3 className="mb-4 font-semibold">
                      【{thread.id}:{thread.responses_count + 1}】
                      <span className="text-2xl text-red-600">{thread.title}</span>
                    </h3>
                    <p>
                      1 名前{' : '}
                      <span className="text-green-700 font-semibold">{thread.name}</span>
                      {' : '}
                      {thread.created_at}
                    </p>
                    <p className="px-8 whitespace-pre-wrap">{thread.content}</p>
                  </div>

                  {thread.responses.map((response) => (
                    <div className="mb-4" key={response.id}>
                      <p>
                        {response.response_no + 1}
                        {' 名前 : '}
                        <span className="text-green-700 font-semibold">{response.name}</span>
                        {' : '}
                        {response.created_at}
                      </p>
                      <p className="px-8 whitespace-pre-wrap">{response.content}</p>
                    </div>
                  ))}
                </div>

                <div className="px-8">
                  {responseForms[index] && (
                    <form className="mb-2" onSubmit={(e) => createResponse(e, thread.id, index)}>
                      <div className="space-x-1">
                        <button className="px-1.5 py-0.5 text-sm bg-gray-300 border border-gray-500 rounded">
                          書き込む
                        </button>
                        <label htmlFor={`name-${thread.id}`}>名前{' : '}</label>
                        <input
                          id={`name-${thread.id}`}
                          name="name"
                          className="p-0.5 text-sm border border-gray-500 rounded"
                          type="text"
                          value={responseForms[index].name}
                          onChange={(e) => handleChange(e, index)}
                        ></input>
                        <label htmlFor={`email-${thread.id}`}>E-mail{' : '}</label>
                        <input
                          id={`email-${thread.id}`}
                          name="email"
                          className="p-0.5 text-sm border border-gray-500 rounded"
                          type="text"
                          value={responseForms[index].email}
                          onChange={(e) => handleChange(e, index)}
                        ></input>
                      </div>
                      <div className="flex">
                        <textarea
                          id={`content-${thread.id}`}
                          name="content"
                          className="p-0.5 w-[510px] text-sm border border-gray-500 rounded"
                          value={responseForms[index].content}
                          onChange={(e) => handleChange(e, index)}
                        ></textarea>
                      </div>
                    </form>
                  )}

                  <Link href={`/threads/${thread.id}`} className="text-sm text-blue-900 underline">
                    全部読む
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}

      <section className="p-1.5 bg-green-200">
        <div className="py-1 text-center border border-black">
          <Link href="/threads/new" className="px-1.5 py-0.5 text-sm bg-gray-300 border border-gray-500 rounded">
            新規スレッド書き込み画面へ
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
