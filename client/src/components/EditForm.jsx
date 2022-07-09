import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const URL = `https://uni-task1.herokuapp.com/faculty/`;

export const EditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact_no, setContact_no] = useState("");
    const [image, setImage] = useState(null);

    const loadUser = () => {
        axios.get(`${URL}${id}`).then((res) => {
            const { name, email, contact_no } = res.data;
            setName(name);
            setEmail(email);
            setContact_no(contact_no);
        });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("name", name);
        fd.append("email", email);
        fd.append("contact_no", contact_no);
        if (image) {
            fd.append("photo", image);
        }

        axios
            .patch(`${URL}${id}`, fd)
            .then((res) => {
                alert(`Faculty Data Updated`);
                console.log(res);
                navigate(-1);
            })
            .catch((err) => {
                alert("something went wrong");
                console.log(err);
            });
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <form
                method="POST"
                encType="multipart/form-data"
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label">
                        Name
                    </label>
                    <div className="col-12 col-md-10">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-12 col-md-10">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label
                        htmlFor="contact"
                        className="col-sm-2 col-form-label"
                    >
                        Contact
                    </label>
                    <div className="col-12 col-md-10">
                        <input
                            type="text"
                            maxLength={10}
                            minLength={10}
                            className="form-control"
                            id="contact"
                            name="contact_no"
                            value={contact_no}
                            onChange={(e) => setContact_no(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="photo" className="col-sm-2 col-form-label">
                        Image
                    </label>
                    <div className="col-12 col-md-10">
                        <input
                            type="file"
                            className="form-control"
                            id="photo"
                            name="photo"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );
};
