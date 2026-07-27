import { NavLink } from "react-router-dom";
import { Home, Utensils, PlusCircle } from "lucide-react";

// Calqué sur BottomNavbar.jsx de CloneX (nav fixe en bas, visible
// uniquement sous lg puisque le Sidebar prend le relais au-dessus),
// sans logout/profil puisqu'il n'y a pas d'auth.
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
      {/* <NavLink
        to="/a-nourrir"
        className={({ isActive }) =>
          `p-3 transition-colors ${
            isActive ? "text-white" : "text-white/50 hover:text-white"
          }`
        }
      >
        <Utensils className="h-6 w-6 stroke-current" />
      </NavLink> */}
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
