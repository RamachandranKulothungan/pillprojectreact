import React, { useState, useContext, useEffect } from 'react'
import { useFetch } from "../hooks/use-fetch";
import CurrentUserContext from "../context/current-user-context";
import Constants from "../context/constants";
import { Link, Redirect } from "react-router-dom";

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
            alert("Passwords do not match")
        }
    }
    useEffect(() => {
        if (response) {
            if (response.email) {
                alert("password updated")
            }
        }
    }, [response])
    return (
        <div style={{
            textAlign: "center"
        }}>
            {response && (
                <>
                    {
                        response.email && (
                            < Redirect to="/" />
                        )
                    }
                    {
                        response.errors &&
                        <h4>{response.errors}</h4>
                    }
                </>
            )}

            <form onSubmit={handleSubmit}>
                <div className="container">
                    <table>
                        <tbody>
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
                        </tbody>
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