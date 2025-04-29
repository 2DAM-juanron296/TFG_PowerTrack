import { Link } from "react-router-dom";

export function Header() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link className="text-white" to="/home/users">
          Users
        </Link>
        <Link className="text-white" to="/home/routines">
          Routines
        </Link>
      </nav>
    </div>
  );
}
