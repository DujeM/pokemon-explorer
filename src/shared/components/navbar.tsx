import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-[#fff2e8] border-b-4 border-black">
        <div className="max-w-7xl mx-auto w-full">
            <Link to="/" className="flex items-center gap-2">
                <img src="/src/assets/pokeball.svg" alt="Pokeball logo" width="48" height="48" />
                <h1 className="text-2xl font-bold">Pokemon</h1>
            </Link>
        </div>
    </nav>
  );
}