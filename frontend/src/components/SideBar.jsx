import { LogOutIcon, SidebarClose } from "lucide-react";
import { useState } from "react";
import SkeletonImage from "./SkeletonImage";
import { Skeleton } from "./ui/skeleton";
import { Link } from "react-router-dom";

const SideBar = ({ navListItems, userDetails, onClickHandleLogout }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  return (
    <aside
      className={`bg-background border-r border-gray-300 dark:border-gray-700 shadow-lg 
            transition-all duration-300 ease-in-out 
            ${isSideBarOpen ? "w-[280px]" : "w-[85px]"} 
            hidden sm:block sticky top-[72px] h-[calc(100vh-72px)]`}
    >
      <div className="relative h-full p-4">
        {/* Toggle Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <SidebarClose
              className={`text-primary transition-transform duration-300 ${
                isSideBarOpen ? "rotate-0" : "rotate-180"
              }`}
              size={26}
            />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4 mt-6">
          <div className="relative shrink-0">
            <SkeletonImage
              src={userDetails?.avatar}
              alt={userDetails?.username}
              rounded="shrink-0 rounded-full"
              className={`  ${isSideBarOpen ? "h-12 w-12" : "h-10 w-10 ml-2"}`}
            />
          </div>
          {isSideBarOpen && (
            <div className="w-full">
              <h3 className="text-base font-semibold truncate">
                <span>
                  {userDetails?.username || (
                    <Skeleton className="w-10/12 h-4" />
                  )}
                </span>
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 truncate w-11/12">
                <span title={userDetails?.email}>
                  {userDetails?.email || (
                    <Skeleton className="w-full h-4 mt-2" />
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1">
          {navListItems.map(({ id, title, icon }) => (
            <Link
              key={id}
              to=""
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-4 p-3 rounded-md 
                    hover:bg-blue-100 dark:hover:bg-blue-900/30 
                    transition-colors duration-200
                    ${
                      activeTab === id ? "bg-blue-100 dark:bg-blue-900/40" : ""
                    }`}
            >
              <span className="text-blue-700 dark:text-blue-300">{icon}</span>
              {isSideBarOpen && (
                <span className="font-medium truncate">{title}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={onClickHandleLogout}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-3 rounded-md
                text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 w-[85%]"
        >
          <LogOutIcon size={24} />
          {isSideBarOpen && <span className="font-semibold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
