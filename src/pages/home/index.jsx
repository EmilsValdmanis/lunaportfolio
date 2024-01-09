import React, { useState, useEffect } from "react"
import { storage } from "../../utils/firebase.utils"
import { ref, listAll, getDownloadURL } from "firebase/storage"

const Home = () => {
  const [allImages, setAllImages] = useState([])

  const fetchImages = async () => {
    try {
      const result = await listAll(ref(storage, "/"))
      const urlsArray = await Promise.all(result.items.map((imageRef) => getDownloadURL(imageRef)))
      setAllImages(urlsArray)
    } catch (error) {
      console.error("Error fetching images:", error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchImages()
    }

    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 xl:gap-4 max-w-7xl m-auto">
      {allImages.map((imageUrl, index) => 
        <div key={index} className="rounded-xl overflow-hidden">
          <img
            src={imageUrl}
            alt={imageUrl}
            className="w-full h-96 object-cover object-center rounded-xl"
          />
        </div>
      )}
    </div>
  )
}

export default Home
