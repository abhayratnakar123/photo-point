import React from 'react'
import MyModal from "./DeleteImageModal";
import PhotoModal from './PhotoModal';


const Photos = (props:any) => {
    const {photos,folderName}=props;

    console.log("Inside Pghoyodvnfjcvbnj" , folderName);
    
    console.log("Inside Pghoyodvnfjcvbnj" , photos);
  return (
    <div className="lg:grid lg:grid-cols-2 gap-4 justify-center sm:grid-cols-1">
    {(photos as any).length > 0
      ? photos
          .find((e: any, i: number) => i === folderName)
          .images.map((image: any, index: any) => {
            return (
              <div className="m-4 relative" key={index + 169}>
                <img
                  src={`${image.url}`}
                  className="w-full"
                  alt={`Image ${index}`}
                  // onClick={() => {
                  //   // Open the modal when the image is clicked
                  //   PhotoModal({ id: photos._id, url: photos.images[index].url });
                  // }}
                />
                <div className="absolute right-2 top-2">
                  <MyModal
                    id={
                      photos.find((e: any, i: number) => i === folderName)
                        ._id
                    }
                    url={image.url}
                  />
                </div>
              </div>
            );
          })
      : ""}
  </div>
  )
}

export default Photos 