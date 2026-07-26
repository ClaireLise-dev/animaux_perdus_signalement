import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import BottomNav from "../components/BottomNavbar/BottomNavbar";
import Footer from "../components/Footer/Footer";

// Fusion de Main.jsx + ConnectedLayout.jsx de CloneX : plus besoin de
// distinguer connecté/non-connecté puisqu'il n'y a plus d'auth.
export default function Layout() {
  return (
    <div className="flex h-screen bg-primary p-2 lg:p-4 gap-4">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-base-100 rounded-2xl shadow-xl pb-20 lg:pb-0">
        <Outlet />
        <Footer />
      </main>
      <BottomNav />
    </div>
  );
}
