"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../../Navbar/page";
import Footer from "../../Footer";
import { useDispatch, useSelector } from "react-redux";
import { inititalizePhotography } from "@/app/redux/actions/photographyReducerAction";
import SettingPopover from "./SettingsPopover";
import CreateFolderModal from "./CreateFolderModal";
import Photos from "@/app/components/Services/Photography/Photos";
import Loader from "../../Loader/Loader";

const Photography = () => {
  const [folderName, setFolderName] = useState(0);
  const photos = useSelector((state) => (state as any).photosReducer?.photos);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  const isLoggedIn = localStorage.getItem("authToken");

  console.log(isLoggedIn);

  useEffect(() => {
    if ((photos as any).length > 0) {
      setloading(false);
    }
    console.log(loading);
    setloading(true);
    const fetchPhotosForInitialization = async () => {
      try {
        const response = await fetch("/api/routes/Photo/PhotoFolder/FindAll", {
          method: "GET",
        });
        const photos = await response.json();

        console.log(photos);
        if (
          Array.isArray(photos.photoFolder) &&
          photos.photoFolder.length > 0
        ) {
          dispatch(inititalizePhotography(photos.photoFolder));
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };
    setloading(false)
    fetchPhotosForInitialization();

  }, [loading]);

  // const isLoggedIn = localStorage.getItem("token") !== null;

  // console.log(isLoggedIn);

  return (
    <>
      {/* <ImageUpload cloudname="dnr7thjlu" uploadPreset="DHEERAJ_PHOTO_POINT"/> */}
      <NavBar />
      <div className="bg-gray-100 text-black py-6 min-h-[100vh]">
        <h1 className="text-5xl font-bold tracking-wide text-center mb-8">
          Photography
        </h1>

        <div className="px-4 md:px-8 lg:px-16 xl:px-32">
  <div className="flex flex-col md:flex-row justify-between items-center py-4 sm:flex-col">
    <div className="block"></div>
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 list-none font-light sm:flex-col">
      {photos.length > 0 &&
        photos.map((e: any, i: any) => (
          <div
            className="hover:cursor-pointer mb-2 md:mb-0" // Adjust margin for mobile
            key={i + 69}
            onClick={() => {
              setFolderName(i);
              setloading(true);
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className={`hover:text-blue-400 uppercase transition ${
                  folderName === i
                    ? "border-b border-blue-400 text-blue-400"
                    : ""
                }`}
              >
                {e.name}
              </span>{" "}
              {isLoggedIn && (
                <SettingPopover
                  index={folderName}
                  fId={e._id}
                  setFoldername={setFolderName}
                />
              )}
            </div>
          </div>
        ))}
    </div>
    <div className="pr-6 mt-4 md:mt-0 hover:scale-[1.05] transition"> {/* Adjust margin for mobile */}
      {isLoggedIn && <CreateFolderModal />}
    </div>
  </div>
</div>

        {loading ? (
          <div className="flex items-center justify-center h-[70vh]">
            <Loader />
          </div>
        ) : (
          <Photos photos={photos} folderName={folderName} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Photography;
