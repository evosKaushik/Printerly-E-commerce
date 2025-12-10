import  { useState } from "react";

const MobileNav = ({navListsItems}) => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <nav
      className="fixed bottom-0 left-0 w-full bg-background border-t border-gray-300 dark:border-gray-700
        flex items-center gap-3 py-2 px-4  justify-center  sm:hidden shadow-lg overflow-x-auto scrollbar-thin"
    >
      {navListsItems.map(({ id, title, icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex flex-col items-center shrink-0 text-xs ${
            activeTab === id
              ? "text-blue-700 dark:text-blue-300"
              : "text-gray-500"
          }`}
        >
          {icon}
          <span className="text-[11px]">{title}</span>
        </button>
      ))}
    </nav>
  );
};

export default MobileNav;
