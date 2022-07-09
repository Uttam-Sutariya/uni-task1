import { useState, useEffect } from "react";
import { Card } from "./Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Main = () => {
    const [facultyList, setFacultyList] = useState([]);

    const navigate = useNavigate();

    async function fetchFaculty() {
        const result = await axios.get(
            "https://uni-task1.herokuapp.com/faculty/"
        );
        console.log(result.data.faculties);
        setFacultyList(result.data.faculties);
    }

    useEffect(() => {
        fetchFaculty();
    }, []);

    return facultyList.length > 0 ? (
        <>
            <div className="container mt-5">
                <div className="row g-4">
                    {facultyList.map((faculty) => (
                        <Card
                            key={faculty._id}
                            data={faculty}
                            fetchFaculty={fetchFaculty}
                        />
                    ))}
                </div>
            </div>
        </>
    ) : (
        <>{navigate("/addFaculty", { replace: true })}</>
    );
};
