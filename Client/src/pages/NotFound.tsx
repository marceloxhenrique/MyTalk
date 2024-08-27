import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-2xl transition-all lg:text-6xl">
      <p>Oops... page not found, go back to Home.</p>
      <button
        className="an m-4 rounded-sm border border-gray-600 bg-white px-4 py-2 text-lg text-black hover:bg-slate-800 hover:text-white"
        onClick={() => {
          navigate("/");
        }}
      >
        BACK TO HOME
      </button>
    </div>
  );
}
