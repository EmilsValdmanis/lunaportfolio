import React, { useState, useEffect } from "react"
import { auth } from "../../utils/firebase.utils"
import { useAuthState } from "react-firebase-hooks/auth"
import { useUploadFile } from 'react-firebase-hooks/storage'
import { storage } from "../../utils/firebase.utils"
import { ref, listAll, getDownloadURL } from "firebase/storage"

const Home = () => {
  const [user] = useAuthState(auth)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadFile] = useUploadFile()
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

  const uploadImage = async () => {
    if (selectedFile) {
      await uploadFile(ref(storage, selectedFile.name), selectedFile, { contentType: 'image/jpeg' })
      await fetchImages()
    }
  }

  return (
    <>
      <div className="flex justify-center">
        {user && (
          <>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => {
                setSelectedFile(e.target.files[0])
              }}
            />
            <button
              className="border"
              onClick={uploadImage}
            >
              Upload
            </button>
          </>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 xl:gap-4 max-w-7xl m-auto">
        {allImages.map((imageUrl, index) => 
          <img
            src={imageUrl}
            key={index}
            alt={imageUrl}
            className={`rounded-lg object-fit ${
              Math.random() <= 0.4 ? "grid-cols-subgrid col-span-1" : "col-span-2"
            }`}
          />
        )}
      </div>
    </>
  )
}

export default Home
