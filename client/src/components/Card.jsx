import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";

const URL = `https://uni-task1.herokuapp.com/faculty/`;

export const Card = (props) => {
    const { name, email, contact_no, photo, _id } = props.data;

    const handleDelete = () => {
        const confirmBox = window.confirm(
            "Do you really want to delete ? " + name
        );

        if (confirmBox === true) {
            axios
                .delete(`${URL}${_id}`)
                .then(() => {
                    alert(`Deleted succesfully`);
                    props.fetchFaculty();
                })
                .catch((err) => {
                    console.log(err);
                    alert("something went wrong");
                });
        }
    };

    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="card">
                <img src={photo.secure_url} className="card-img-top" />
                <div className="card-body text-center">
                    <h4 className="card-title">{name}</h4>
                    <hr />
                    <div className="d-flex justify-content-around">
                        <span className="text-danger">Professor</span>
                        <span className="fw-bold">{email}</span>
                    </div>
                    <hr />
                    <p className="card-text">
                        This is a longer card with supporting text
                        {contact_no}
                    </p>
                    <div className="d-flex justify-content-around">
                        <div>
                            <Link
                                to={"/about"}
                                className="text-decoration-none text-white btn btn-sm btn-primary"
                            >
                                View details
                            </Link>
                        </div>
                        <div className="d-flex">
                            <button
                                className="btn btn-outline-danger  btn-sm me-1"
                                onClick={handleDelete}
                            >
                                <MdDelete />
                            </button>
                            <Link
                                className="btn btn-outline-success btn-sm"
                                to={`/editFaculty/${_id}`}
                            >
                                <MdEdit />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
