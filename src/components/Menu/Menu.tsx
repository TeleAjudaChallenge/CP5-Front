import { Link } from "react-router-dom";

export default function Menu(){

    return(
        <nav>
            <Link to="/">LOGIN </Link>|
            <Link to="/cadastro"> CADASTRE-SE </Link>
        </nav>
    );
}