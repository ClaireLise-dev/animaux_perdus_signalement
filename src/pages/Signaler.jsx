import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SignalementForm from "../components/SignalementForm/SignalementForm";

export default function Signaler() {
  return (
    <div className="flex flex-col gap-4 bg-base-100 p-4 lg:p-8 max-w-2xl mx-auto">
      <Link
        to="/"
        className="flex flex-row items-center gap-2 text-neutral mt-5 lg:mt-0"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </Link>
      <SignalementForm />
    </div>
  );
}
