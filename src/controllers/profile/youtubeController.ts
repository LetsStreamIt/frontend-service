import axios from 'axios'
import { type VideoProfile } from '@/model/profile/videoProfile'

const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY

/**
 * Get video information from YouTube API
 * @param videoId - YouTube video ID
 * @returns Video information
 */
export const getVideoInfo = async (videoId: string): Promise<VideoProfile | null> => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,status&id=${videoId}&key=${apiKey}`
    )
    const videoDetails = response.data.items[0]
    const { viewCount, likeCount } = videoDetails.statistics
    const { title, thumbnails } = videoDetails.snippet
    let { duration } = videoDetails.contentDetails
    duration = duration.replace('PT', '').replace('H', 'h').replace('M', 'm').replace('S', 's')
    let thumbnail = 'https://placehold.co/400'
    if (thumbnails['maxres']) {
      thumbnail = thumbnails['maxres'].url
    } else if (thumbnails['default']) {
      thumbnail = thumbnails['default'].url
    }
    return { id: videoId, title, thumbnail, duration, viewCount, likeCount }
  } catch (error) {
    console.error(error)
    return null
  }
}
