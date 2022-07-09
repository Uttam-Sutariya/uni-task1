import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-primary px-5">
            <div className="container px-5">
                <Link
                    to="/facultyList"
                    className="text-white text-decoration-none fw-bold"
                >
                    List Of Faculty
                </Link>
                <Link
                    to="/addFaculty"
                    className="text-white text-decoration-none fw-bold"
                >
                    Add Faculty
                </Link>
            </div>
        </div>
    );
};
