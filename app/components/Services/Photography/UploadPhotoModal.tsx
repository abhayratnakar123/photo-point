import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import AddImage from "@/public/assets/Icons/AddImage";
import { useDispatch, useSelector } from "react-redux";
import {
  createFolder,
  uploadPhoto,
} from "@/app/redux/actions/photographyReducerAction";
import ImageUpload from "../ImageUpload";
import ProgressBarComponent from "../../ProgressBar/ProgressBar";
import ImageUploadTwo from "../ImageUploadTwo";

export default function UploadPhotoModal({
  id,
  index,
}: {
  id: any;
  index: any;
}) {
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [progressBarDisplay, setprogressBarDisplay] = useState(false);
  const [progress, setprogress] = useState(0);
  const authtoken = useSelector(
    (state) => (state as any).userReducer?.authtoken
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const updateProgressDispatch = (progress: any) => {
    setprogress(progress);
  };

  useEffect(() => {
    console.log(imageUrl);
    console.log(index);
  }, [imageUrl, index]);

  const uploadImageApi = async () => {
    try {
      const sendBody = {
        url: imageUrl,
      };
      const createdFolder = await fetch(
        `/api/routes/Photo/PhotoFolder/Upload?id=${id}`,
        {
          method: "PUT",
          headers: {
            authtoken: authtoken,
          },
          body: JSON.stringify(sendBody),
        }
      );
      const res = await createdFolder.json();
      return res; // Return the created folder
    } catch (error) {
      throw new Error("Failed to create folder"); // Throw an error for better handling
    }
  };

  const uploadImageFunc = async () => {
    if (typeof imageUrl === "string") {
      try {
        setprogressBarDisplay(true);
        const response = await uploadImageApi();
        if (response.message === "Image already exists") {
          setImageUrl(null);
          setprogress(0);
          setprogressBarDisplay(false);
          return alert("This image already exists.");
        } else {
          const temp = response.photoFolder.images;
          const uploadedImage = temp[temp.length - 1];
          dispatch(uploadPhoto({ UfId: id, Uurl: uploadedImage }));
          closeModal();
          setImageUrl(null);
          setprogress(0);
          setprogressBarDisplay(false);
        }
      } catch (error) {
        console.log(error);
        setprogress(0);
        setprogressBarDisplay(false);
      }
    } else {
      setprogress(0);
      setprogressBarDisplay(false);
      return alert("Please fill all the details");
    }
  };
  return (
    <>
      <div onClick={openModal} className="flex items-center gap-2">
        <AddImage fill="black" /> Add a photo
      </div>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed bg-black bg-opacity-10 inset-0 z-50 overflow-y-hidden "
          onClose={closeModal}
        >
          <div className="flex  text-black items-center justify-center min-h-screen  overflow-y-hidden sm: p-[21px]">
            <Dialog.Panel className="w-full max-w-md p-6 rounded-md bg-white shadow-xl sm: ml-[0px]">
              <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
                <b className="uppercase">Upload image</b> 
              </Dialog.Title>
              <div className="mb-6">
                <label className="block text-sm font-semibold uppercase text-gray-800 mb-1">
                 image <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={async (e: any) => {
                    updateProgressDispatch(10);
                    setprogressBarDisplay(true);
                    updateProgressDispatch(30);
                    if (index === 0) {
                      setImageUrl(
                        await ImageUpload(e, "DHEERAJ_PHOTO_POINT", "ds5fdn2yu")
                      );
                    }
                    if (index === 1) {
                      setImageUrl(
                        await ImageUpload(e, "DHEERAJ_PHOTO_POINT", "dnr7thjlu")
                      );
                    }
                    if (index === 2) {
                      setImageUrl(
                        await ImageUpload(e, "DHEERAJ_PHOTO_POINT", "dimv7myy9")
                      );
                    }
                    if (index === 3) {
                      setImageUrl(
                        await ImageUploadTwo(e, "4ff3af5727bbcad03796")
                      );
                    }
                    if (index === 4) {
                      setImageUrl(
                        await ImageUploadTwo(e, "25df74b02bcfa20387fd")
                      );
                    }
                    if (index === 5) {
                      setImageUrl(
                        await ImageUploadTwo(e, "f172a9bfe4613bd3df39")
                      );
                    }
                    if (index === 6) {
                      setImageUrl(
                        await ImageUpload(e, "DHEERAJ_PHOTO_POINT", "dnsydvkyd")
                      );
                    } else {
                      setImageUrl(
                        await ImageUpload(e, "DHEERAJ_PHOTO_POINT", "dnsydvkyd")
                      );
                    }

                    updateProgressDispatch(100);
                  }}
                  type="file"
                  className="rounded-sm text-gray-800 p-2 w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div
                className={`${
                  progressBarDisplay ? "flex" : "hidden"
                } flex-col px-1`}
              >
                <i className="text-sm mb-1">{progress===100?"UPLOADED":"Uploading image..."}</i>
                <ProgressBarComponent progress={progress} />
              </div>
              <div className="text-sm mt-6 font-semibold text-gray-800 mb-4">
                Are you sure you want to add this image?
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={uploadImageFunc}
                  className="flex-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  No
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
