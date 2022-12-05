import { Tweet } from "@prisma/client";
import { useEffect, useState } from "react"
import { trpc } from "../utils/trpc"


const TimeLine = () => {
  const tweetList = trpc.tweet.listAll.useQuery({
    limit: 9
  })
  const [tweets, setTweets] = useState<Tweet[] | undefined>();
  const [error, setError] = useState<string | null>("")
  useEffect(() => {
    if (tweetList.data == undefined) {
      return
    } else {
      setTweets(tweetList.data)
      console.log(tweetList)
    }
  }, [tweetList])
  return (
    <div>
      <p>{error}</p>
      {tweets?.map((item, index) => (
        <p key={index} className="text-gray-200">{item.text}</p>
      ))}
    </div>
  )
}

export default TimeLine
