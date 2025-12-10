import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import {
  CircleX,
  CreditCard,
  FileText,
  FrownIcon,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  User2,
} from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import ProfileDropdown from "./ui/ProfileDropdown";
import SidebarPortal from "./SideBarPortal";
import SkeletonImage from "./SkeletonImage";
import { useTheme } from "./theme-provider";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { logout } from "@/api/user";
import toast from "react-hot-toast";

const searchArray = [
  "HTML",
  "CSS",
  "Javascript",
  "Tailwind CSS",
  "Git & Github",
  "NPM",
  "React",
  "GSAP",
  "REDUX",
  "TypeScript",
  "Next JS",
];

const menuItems = [
  {
    label: "Profile",
    href: "/profile",
    icon: <User className="w-4 h-4" />,
  },
  {
    label: "Subscription",
    value: "subscription",
    href: "/subscription",
    icon: <CreditCard className="w-4 h-4" />,
  },
  {
    label: "Settings",
    href: "/",
    icon: <Settings className="w-4 h-4" />,
  },
  {
    label: "Terms & Policies",
    href: "/",
    icon: <FileText className="w-4 h-4" />,
    external: true,
  },
];

const navLinks = [
  {
    id: 1,
    url: "/product",
    title: "Products",
  },
  {
    id: 2,
    url: "/product/Inks&Toner",
    title: "Inks & Toner",
  },
  {
    id: 3,
    url: "/deals",
    title: "Deals",
  },
  {
    id: 4,
    url: "/support",
    title: "Support",
  },
  {
    id: 5,
    url: "/aboutus",
    title: "About us",
  },
];

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchBoxRef = useRef();
  const { setTheme } = useTheme();
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    const handleClickOutside = () => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setSearchValue("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let filteredSearch = searchArray.filter((value) =>
    value.toLowerCase().includes(searchValue)
  );

  const handleLogoutBtn = async () => {
    try {
      const data = await logout();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUser(null));
        localStorage.removeItem("accessToken");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav
        className="h-18 border backdrop-blur-3xl shadow-md  bg-(--bg-primary-clr)/20 sticky top-0 left-0 right-0 z-50"
        ref={searchBoxRef}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-2">
          <div className="flex items-center gap-1 h-full grow">
            <Link to="/">
              <div className="flex items-end gap-2">
                <div className="w-8 h-8">
                  <img src="./logo.png" alt="Printerly Logo" />
                </div>
                <h2 className="hidden xs:block text-lg sm:text-xl font-bold tracking-tight font-inter">
                  Printerly
                </h2>
              </div>
            </Link>
            {/* SearchBox Parent Div */}

            <div className="w-10/12  xs:w-1/2 relative ml-2 sm:ml-8">
              <div className="flex items-center bg-gray-200 dark:bg-gray-800 px-4 rounded-full border border-gray-400 dark:border-gray-600">
                <Search className="cursor-pointer" />
                <Input
                  onChange={(e) => {
                    setSearchValue(e.target.value.toLowerCase());
                  }}
                  type="text"
                  placeholder="Search"
                  className="border-0 shadow-none outline-0 focus-visible:border-0 focus-visible:ring-0 bg-gray-200 dark:bg-gray-800 font-[550] text-[16px] placeholder:text-[16px]"
                />
              </div>
              {/* Search Suggestion Div */}
              {searchValue && (
                <div className="absolute right-0 bg-gray-300 dark:bg-gray-800 w-11/12 mr-3 mt-1 p-2 rounded-md">
                  {!filteredSearch.length ? (
                    <div className="flex gap-2 items-center text-red-700">
                      <FrownIcon className="" />{" "}
                      <span className="text-lg">Not Found</span>
                    </div>
                  ) : (
                    filteredSearch.map((value, index) => {
                      return (
                        <p
                          key={index}
                          className="py-2 px-1 border-b border-zinc-600 cursor-pointer"
                        >
                          {value}
                        </p>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-6 items-center h-full ">
            <ul className="hidden lg:flex items-center  space-x-5 2xl:space-x-8 font-inter font-semibold mr-3 h-full text-nowrap [&>*]:cursor-pointer">
              {navLinks.map(({ id, title, url }) => (
                <li key={id}>
                  <NavLink to={url}>{title}</NavLink>
                </li>
              ))}
            </ul>
            <div className="gap-6 flex ml-2 xs:ml-0">
              {!user?.email ? (
                <div className="hidden md:flex gap-4">
                  <Button className="bg-gray-100 border border-gray-300 shadow-sm text-primary cursor-pointer  text-lg font-inter font-bold dark:bg-gray-700 dark:text-(--secondary-clr)/90 dark:border-gray-500 ">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                  <Button
                    variant="primary"
                    className="text-primary cursor-pointer text-lg font-inter font-bold dark:text-[#101F22]/90"
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                </div>
              ) : (
                <ProfileDropdown
                  menuItems={menuItems}
                  handleLogoutBtn={handleLogoutBtn}
                >
                  <div className="bg-gray-200  dark:dark:bg-gray-800 h-9 p-0.5 flex items-center justify-center w-9 rounded-full cursor-pointer">
                    {user.avatar ? (
                      <SkeletonImage
                        src={user?.avatar}
                        alt={user?.username}
                        rounded="rounded-full"
                        className="h-8 w-8 object-cover"
                      />
                    ) : (
                      <User2 />
                    )}
                  </div>
                </ProfileDropdown>
              )}
              <div className="hidden sm:block">
                <ModeToggle />
              </div>
            </div>
            {/* Sub Menu icon*/}
            <div className="bg-gray-200 dark:dark:bg-gray-800 h-9 flex lg:hidden items-center justify-center w-9 rounded-md cursor-pointer stroke-3">
              <Menu className="stroke-2" onClick={() => setSidebarOpen(true)} />
            </div>
          </div>
        </div>
      </nav>
      <SidebarPortal isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="sm:hidden">
            <Button
              onClick={() => setTheme("dark")}
              className=" bg-gray-200  block dark:hidden"
            >
              <Moon className="text-gray-800" size={30} />
            </Button>
            <Button
              onClick={() => setTheme("light")}
              className=" bg-gray-800 hidden dark:block"
            >
              <Sun className="text-gray-200" size={30} />
            </Button>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="sm:ml-auto">
            <CircleX size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <ul className="p-2 space-y-1">
          {navLinks.map(({ title, id, url }) => (
            <li
              key={id}
              className="hover:bg-blue-200 p-2 rounded-sm group transition ease-in-out hover:shadow-sm duration-500 text-xl font-inter border-b "
            >
              <NavLink
                to={url}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-400 group-hover:text-blue-900 transition duration-500"
                    : ""
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
        {!user && (
          <div className="flex gap-4 flex-col w-10/12 mx-auto mt-auto absolute bottom-4 left-0 right-0">
            <Button className="bg-gray-100 border border-gray-300 shadow-sm text-primary cursor-pointer  text-lg font-inter font-bold dark:bg-gray-700 dark:text-(--secondary-clr)/90 dark:border-gray-500 ">
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button
              variant="primary"
              className="text-primary cursor-pointer text-lg font-inter font-bold dark:text-[#101F22]/90"
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>
        )}
      </SidebarPortal>
    </>
  );
};

export default Navbar;
