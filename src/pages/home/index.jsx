import React, { useState, useEffect } from "react"
import { storage } from "../../utils/firebase.utils"
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage"
import Loading from "../../components/loading"

const groupImagesByMonth = (imagesArray) =>
  imagesArray.reduce((groupedImages, image) => {
    const month = image.createdAt.split("T")[0].substring(0, 7)
    groupedImages[month] = [...(groupedImages[month] || []), image]
    return groupedImages
  }, {})


const formatMonthTitle = (month) => {
  const [year, monthNum] = month.split("-")
  const monthName = new Date(`${year}-${monthNum}-01`).toLocaleString('default', { month: 'long' })
  return `${monthName} ${year}`
}


const Home = () => {
  const [allImages, setAllImages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchImages = async () => {
    try {
      const result = await listAll(ref(storage, "/"))
      const imagesDataArray = await Promise.all(
        result.items.map(async (imageRef) => {
          const imageUrl = await getDownloadURL(imageRef)
          const metadata = await getMetadata(imageRef)
          const imageName = metadata.name
          const createdAt = metadata.timeCreated
  
          return { url: imageUrl, name: imageName, createdAt }
        })
      )
      setAllImages(groupImagesByMonth(imagesDataArray))
      setLoading(false)
    } catch (error) {
      console.error("Error fetching images:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchImages()
    }

    fetchData()
  }, [])

  return (
    <div>
      {loading ? (
        <Loading type="spin" color="#000" height={50} width={50} />
      ) : (
        <div className="flex flex-col gap-8">
          {Object.keys(allImages)
            .sort((a, b) => new Date(b) - new Date(a))
            .map((month, index) => (
              <div key={index}>
                <div className="max-w-7xl m-auto flex flex-col gap-6">
                  <h2 className="text-4xl font-calligraphy">{formatMonthTitle(month)}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allImages[month]
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .map((image, index) => (
                      <div key={index} className="rounded-xl overflow-hidden shadow hover:shadow-xl transition-transform transform duration-300 hover:scale-105">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-96 object-cover object-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
