import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { object, string } from "zod";
import { trpc } from "../utils/trpc";
import { Tweet } from "../types/tweet"
export const tweetSchema = object({
  text: string({
    required_error: "Tweet text is required"
  }).min(10).max(280)
})


const CreateTweet = () => {
  const [text, setText] = useState("")
  const [error, setError] = useState("")
  const [tweetList, setTweetList] = useState<any[] | undefined>([])
  const [curTweet, setCurTweet] = useState<any | null>(null)
  const mutation = trpc.tweet.create.useMutation()
  const tweets = trpc.tweet.listAll.useQuery({ limit: 10 })
  const utils = trpc.useContext();
  useEffect(() => {
    if (tweets.data == undefined) {
      return
    } else {
      setTweetList(tweets.data)
    }
  }, [tweets])
  const mutate = async (tweet: string) => {
    mutation.mutate({ text: tweet }
    )
    setCurTweet(mutation.data)
  }
  const handleClick = async () => {
    await mutate(text)
    await utils.tweet.listAll.refetch()
    console.log(utils.tweet.listAll.refetch())
  }

  return (
    <>
      {error && JSON.stringify(error)}
      <div
        className=" text-gray-800 mb-4 mt-10 mx-auto flex w-8/12 flex-col rounded-md p-4  bg-white/10"
      >
        <textarea
          className="w-full h-full bg-transparent text-gray-300 rounded-lg  focus:outline-none"
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-4 flex justify-end">
          <button
            className="rounded-md bg-blue-400 text-gray-200 px-4 py-2"
            onClick={handleClick}
            type="submit"
          >
            Tweet
          </button>
        </div>
      </div>
      <div className="text-gray-200 flex flex-col items-center  w-full">
        <div className="w-5/12 overflow-y-scroll h-[65vh] ">

          {tweetList != undefined && tweetList.map(item => (
            <div className="bg-white/20 rounded-md p-4 m-4 flex items-center">
              <img src={item.author.image} className="rounded-full mr-10 w-6" />
              <p className="">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )

}

export default CreateTweet
