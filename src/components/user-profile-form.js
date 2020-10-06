import React from "react";

export default function UserProfileForm({ response, onLoad, loaded, handleChange,
    handleProfileUpdate, onToggleEditProfile, editImage,
    onToggleEditImage, handleimagesubmit, onChangeFile }) {
    return (
        <div className="col-md-6 ">
            <div className="row justify-content-center">
                <h4>MyProfile</h4>
            </div>
            <form onSubmit={handleProfileUpdate}>
                <div className="row justify-content-center">
                    <img
                        style={{ display: loaded ? "block" : "none", height: "75px", width: "75px" }}
                        src={`${response?.profile_image2}`}
                        onLoad={onLoad}
                    />
                    <div >
                        {!editImage && <button onClick={onToggleEditImage}>{response.profile_image2 == "" ? "Add Profile image" : "edit image"}</button>}
                        {editImage && (
                            <form onSubmit={handleimagesubmit}>
                                <input
                                    type="file"
                                    name="profile_image"
                                    onChange={onChangeFile}
                                />
                                <button type="submit">save</button>
                                <button onClick={onToggleEditImage}>Cancel</button>
                            </form>
                        )}
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Name:
                    </td>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    placeholder="name"
                                    value={response.name}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Email:
                    </td>
                            <td>
                                <input
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    placeholder="Email"
                                    value={response.email}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Contact:
                    </td>
                            <td>
                                <input
                                    type="number"
                                    name="contact"
                                    onChange={handleChange}
                                    placeholder="contact"
                                    value={response.contact}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Country:
                    </td>
                            <td>
                                <input
                                    type="text"
                                    name="country"
                                    onChange={handleChange}
                                    placeholder="country"
                                    value={response.country}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Blood Group:
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="blood_group"
                                    onChange={handleChange}
                                    placeholder="blood group"
                                    value={response.blood_group}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Height(in cms):
                    </td>
                            <td>
                                <input
                                    type="number"
                                    name="height"
                                    onChange={handleChange}
                                    placeholder="height"
                                    value={response.height}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Weight(in kgs):
                    </td>
                            <td>
                                <input
                                    type="number"
                                    name="weight"
                                    onChange={handleChange}
                                    placeholder="weight"
                                    value={response.weight}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="row justify-content-center">
                    <button type="submit">Submit</button>
                    <button onClick={onToggleEditProfile}>Cancel</button>
                </div>
            </form>

        </div>
    );
}
