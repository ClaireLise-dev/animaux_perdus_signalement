import { NavLink } from "react-router-dom";
import { Home, PlusCircle } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="bg-primary fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center py-2 lg:hidden">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `p-3 transition-colors ${
            isActive ? "text-white" : "text-white/50 hover:text-white"
          }`
        }
      >
        <Home className="h-6 w-6 stroke-current" />
      </NavLink>
      <NavLink
        to="/signaler"
        className={({ isActive }) =>
          `p-3 transition-colors ${
            isActive ? "text-white" : "text-white/50 hover:text-white"
          }`
        }
      >
        <PlusCircle className="h-6 w-6 stroke-current" />
      </NavLink>
    </nav>
  );
}
