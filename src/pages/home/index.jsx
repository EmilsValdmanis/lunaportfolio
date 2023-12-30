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
    fetchImages()
  }, [])

  const uploadImage = async () => {
    if (selectedFile) {
      await uploadFile(ref(storage, selectedFile.name), selectedFile, { contentType: 'image/jpeg' })
      fetchImages()
    }
  }

  return (
    <>
      <div>
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
      <div>
        {allImages.map((imageUrl, index) => <img src={imageUrl} key={index} alt={imageUrl} />)}
      </div>
    </>
  )
}

export default Home
