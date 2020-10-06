import React, { useState, useContext } from 'react'
import { useFetch } from "../hooks/use-fetch";
import CurrentUserContext from "../context/current-user-context";
import Constants from "../context/constants";
import { Link } from "react-router-dom";

export default function ChangePassword() {
    const Constant = useContext(Constants);
    const [currentUserState, setCurrentUserState] = useContext(
        CurrentUserContext
    );
    const [password_confirmed, setPassword_Confirmed] = useState()
    const [formData, setFormData] = useState({
        email: currentUserState.currentUser.email,
        password: "",
        new_password: "",
        confirm_new_password: "",
    })

    const { isLoading, response, error, doFetch } = useFetch(
        "http://localhost:4000/session/update_password"
    );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.new_password == formData.confirm_new_password) {
            doFetch({
                method: "put",
                body: JSON.stringify(formData),
            });
        }
        else {

        }

    }
    return (
        <div style={{
            textAlign: "center"
        }}>
            {response && (
                <>
                    {
                        response.email &&
                        <h4>Password Updated</h4>
                    }
                    {
                        response.errors &&
                        <h4>{response.errors.password}</h4>
                    }
                </>
            )}

            <form onSubmit={handleSubmit}>
                <div className="container">
                    <table>
                        <tr>
                            <td style={{
                                textAlign: "left"
                            }}>
                                <label>Old Password:</label>
                            </td>
                            <td>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    placeholder="Old Password"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{
                                textAlign: "left"
                            }}>
                                <label>New Password:</label>
                            </td>
                            <td>
                                <input
                                    type="password"
                                    name="new_password"
                                    onChange={handleChange}
                                    placeholder="New Password"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{
                                textAlign: "left"
                            }}>
                                <label>Re-enter New Password:</label>
                            </td>
                            <td>
                                <input
                                    type="password"
                                    name="confirm_new_password"
                                    onChange={handleChange}
                                    placeholder="New Password"
                                />
                            </td>
                        </tr>
                    </table>
                </div>
                <button type="submit">Submit</button>
                <button><Link to="/">
                    Cancel
            </Link></button>
            </form>
        </div>
    )
}