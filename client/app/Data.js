import { MdHomeFilled } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";

export const icons = [
    {
        icon: <MdHomeFilled />,
        text: "Home",
        link: "/"
    },
    {
        icon: <CiSearch />,
        text: "Search",
        link: "/pages/search"
    },
    {
        icon: <FaPlus />,
        text: "Create",
        link: "/pages/createPost"
    },
    {
        icon: <CiHeart />,
        text: "Favorite",
        link: "/favorite"
    },
]