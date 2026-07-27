import { Home, Utensils, PlusCircle, Sun, Moon } from "lucide-react";
import { NavLink } from "react-router-dom";

// Version simplifiée du Sidebar de CloneX : pas de logo, pas de
// logout/avatar/profil (pas d'auth). Nav + toggle de thème centrés
// verticalement dans la hauteur disponible.
export default function Sidebar() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center w-72 p-3 h-full gap-10">
      <div className="flex flex-col gap-6 w-full text-lg font-medium">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-row gap-5 items-center
             rounded-lg w-full p-3 transition-colors ${
               isActive ? "text-white" : "text-white/50 hover:text-white"
             }`
          }
        >
          <Home className="h-6 w-6 stroke-current" />
          <p>Animaux recherchés</p>
        </NavLink>

        <NavLink
          to="/a-nourrir"
          className={({ isActive }) =>
            `flex flex-row gap-5 items-center
             rounded-lg w-full p-3 transition-colors ${
               isActive ? "text-white" : "text-white/50 hover:text-white"
             }`
          }
        >
          <Utensils className="h-6 w-6 stroke-current" />
          <p>Animaux à nourrir</p>
        </NavLink>

        <NavLink
          to="/signaler"
          className={({ isActive }) =>
            `flex flex-row gap-5 items-center
             rounded-lg w-full p-3 transition-colors ${
               isActive ? "text-white" : "text-white/50 hover:text-white"
             }`
          }
        >
          <PlusCircle className="h-6 w-6 stroke-current" />
          <p>Signaler un animal</p>
        </NavLink>
      </div>

      <div className="flex flex-row justify-center w-full items-center rounded-2xl p-3 gap-2 text-white/50">
        <Sun className="h-4 w-4" />
        <input
          type="checkbox"
          value="nightX"
          className="toggle theme-controller"
        />
        <Moon className="h-4 w-4" />
      </div>
    </div>
  );
}
