import { MdClose } from "react-icons/md";
import Link from "next/link";

interface SidebarProps {
  toggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ toggle }) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-white border-r border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        <h1 className="text-lg font-semibold">Sidebar</h1>
        <MdClose
          className="text-xl text-gray-500 cursor-pointer md:hidden"
          onClick={toggle}
        />
      </div>

      <ul className="p-4">
        <li className="text-sm font-medium text-gray-900 hover:text-red-500">
          <Link href="/">Home</Link>
        </li>
        <li className="text-sm font-medium text-gray-900 hover:text-red-500">
          <Link href="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};
