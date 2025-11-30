"use client";

import { ChevronLeft, Home, Settings, Package, Plus } from "lucide-react";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SidebarItem from "@/components/sidebar-item";
import { useAuth } from "@/components/auth/auth-context";

interface SidebarProps {
  className?: string;
}

const CollapsibleSidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", slug: "/" },
    { icon: Package, label: "Products", slug: "/products" },
    { icon: Plus, label: "Add Product", slug: "/products/new" },
  ];

  const userActions = [
    { icon: Settings, label: "Settings", slug: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-r-gray-300 bg-white",
        isCollapsed ? "w-20" : "w-60",
        className
      )}
    >
      {/* Header */}
      <div className="relative px-4 py-3 border-b border-b-gray-300">
        <div className="flex items-center space-x-3">
          <img
            src="https://scontent.fbgw4-4.fna.fbcdn.net/v/t39.30808-6/592118495_827346483499315_3816189213489574518_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH22C9XIhdzL9UAgvOHtdKEqb2YDleVF5-pvZgOV5UXnx5rQFiPOtucys-87lzbsfzbtlshwb8Tga4hE-jZ97MF&_nc_ohc=9oyfG8CEXsIQ7kNvwEY4kdi&_nc_oc=Adk_ih7enDNoX0jP8k4-7_iVdKuOaxp7UwNqaHElVWdWjX_bG2yhjpc9aRXLkmUoclo&_nc_zt=23&_nc_ht=scontent.fbgw4-4.fna&_nc_gid=yxx73YRf2g52hQRRS2sxoA&oh=00_AfgFRk3DGEnxEThKsrWWCplG-_PcdSBH9tKukmc7aqM1Ng&oe=69326611"
            alt="App Name Logo"
            className="rounded-full size-6"
          />
          <span
            className={cn(
              "text-lg font-bold text-black transition-opacity duration-200",
              isCollapsed && "hidden opacity-0"
            )}
          >
            Mini Dashboard
          </span>
        </div>
        {/* Only show toggle button on desktop */}
        <button
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          className={cn(
            "absolute p-1 text-black bg-white border border-gray-300 rounded-full cursor-pointer top-4 -right-3 hover:bg-gray-200",
            "md:block hidden" // Only visible on desktop
          )}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isCollapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-2">
        <ul className="px-2 space-y-2">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <SidebarItem
                {...item}
                isCollapsed={isCollapsed}
                active={pathname === item.slug}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer/User Section */}
      <div className="mt-auto border-t border-t-gray-300">
        {/* User Profile */}
        <div className="flex items-center px-4 py-3 transition cursor-pointer hover:bg-gray-100">
          <img
            src="https://scontent.fbgw4-4.fna.fbcdn.net/v/t39.30808-6/592118495_827346483499315_3816189213489574518_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH22C9XIhdzL9UAgvOHtdKEqb2YDleVF5-pvZgOV5UXnx5rQFiPOtucys-87lzbsfzbtlshwb8Tga4hE-jZ97MF&_nc_ohc=9oyfG8CEXsIQ7kNvwEY4kdi&_nc_oc=Adk_ih7enDNoX0jP8k4-7_iVdKuOaxp7UwNqaHElVWdWjX_bG2yhjpc9aRXLkmUoclo&_nc_zt=23&_nc_ht=scontent.fbgw4-4.fna&_nc_gid=yxx73YRf2g52hQRRS2sxoA&oh=00_AfgFRk3DGEnxEThKsrWWCplG-_PcdSBH9tKukmc7aqM1Ng&oe=69326611"
            alt="User"
            className="rounded-full size-8"
          />
          <div
            className={cn(
              "ml-3 flex flex-col transition-opacity duration-200",
              isCollapsed && "hidden opacity-0"
            )}
          >
            <span className="text-sm font-medium text-black">
              {user?.email || "User"}
            </span>
            <span className="text-xs text-gray-600">Admin</span>
          </div>
        </div>

        {/* User Actions */}
        <div className="px-2 pb-2">
          {userActions.map((item, idx) => (
            <SidebarItem
              key={idx}
              {...item}
              isCollapsed={isCollapsed}
              active={pathname === item.slug}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-t-gray-300">
          <span
            className={cn(
              "text-xs text-gray-500 transition-opacity duration-200",
              isCollapsed && "hidden opacity-0"
            )}
          >
            Built by Faraidun ✨
          </span>
        </div>
      </div>
    </aside>
  );
};

export default CollapsibleSidebar;
