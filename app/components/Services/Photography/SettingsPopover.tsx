import { Popover, Transition } from "@headlessui/react"; 
import { Fragment } from "react";
import SettingIcon from "@/public/assets/Icons/settingIcon";
import DeleteFolderModal from "./DeleteFolderModal";
import ChangeFolderNameModal from "./ChangeFolderNameModal";
import UploadPhotoModal from "./UploadPhotoModal";
 

export default function SettingPopover({fId,setFoldername,index}:{fId:any,setFoldername:any,index:any}) {
  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button 
            className="outline-none "
            > 
                <SettingIcon/> 
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 mt-3 min-w-[15rem] ">
                <div className="shadow-xl border bg-white rounded-md px-2 py-2 flex flex-col gap-1 sm: ml-[50px]">
                  <div className="flex hover:bg-gray-200 p-2 focus:bg-gray-200  rounded-lg items-center gap-2"><UploadPhotoModal index={index} id={fId}/></div>    
                  <hr />             
                  <div className=" hover:bg-gray-200 focus:bg-gray-200 p-2  rounded-lg "><DeleteFolderModal setFoldername={setFoldername} fId={fId}/></div>  
                  <hr /> 
                  <div className=" hover:bg-gray-200 focus:bg-gray-200  p-2  rounded-lg  "><ChangeFolderNameModal changeNameFid={fId}/></div>               
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

