import React from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { adminNavigation, sellerNavigation } from "../../utils";
import classNames from "classnames";

const Sidebar = ({ isProfileLayout = false }) => {
  const pathName = useLocation().pathname;
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  const sideBarLayout = isAdmin ? adminNavigation : sellerNavigation;

  return (
    <div className="flex grow flex-col gap-y-7 overflow-y-auto bg-gradient-to-b from-gray-900 to-black px-6 pb-6 shadow-lg">
      {/* Header */}
      <div className="flex h-16 items-center gap-x-3 pt-4">
        <FaTachometerAlt className="h-8 w-8 text-emerald-400" />
        <h1 className="text-white text-xl font-bold tracking-wide">
          {isAdmin ? "Admin Panel" : "Seller Panel"}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-2">
              {sideBarLayout.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={classNames(
                      pathName === item.href
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white",
                      "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-semibold leading-6 transition-all duration-300"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        pathName === item.href
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white",
                        "text-lg"
                      )}
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
