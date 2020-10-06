import React from "react";

export default function UserProfileForm({ response, onLoad, loaded, handleChange, handleProfileUpdate, onToggleEditProfile }) {
    return (
        <div className="col-md-6">
            <h4>MyProfile</h4>
            <form onSubmit={handleProfileUpdate}>
                <img
                    style={{ display: loaded ? "block" : "none", height: "50px", width: "50px" }}
                    src={`${response?.profile_image2}`}
                    onLoad={onLoad}
                />
                {response.profile_image2 != "" &&
                    <input
                        type="file"
                        name="profile_image"
                        onChange={handleChange}
                    />
                }

                <div>
                    Name:
              <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        placeholder="name"
                        value={response.name}
                    />
                </div>
                <div>
                    Email:
              <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        value={response.email}
                    />
                </div>
                <div>
                    Contact:
              <input
                        type="number"
                        name="contact"
                        onChange={handleChange}
                        placeholder="contact"
                        value={response.contact}
                    />
                </div>
                <div>
                    Country:
              <input
                        type="text"
                        name="country"
                        onChange={handleChange}
                        placeholder="country"
                        value={response.country}
                    />
                </div>
                <div>
                    Blood Group:
              <input
                        type="text"
                        name="blood_group"
                        onChange={handleChange}
                        placeholder="blood group"
                        value={response.blood_group}
                    />
                </div>
                <div>
                    Height(in cms):
              <input
                        type="number"
                        name="height"
                        onChange={handleChange}
                        placeholder="height"
                        value={response.height}
                    />
                </div>
                <div>
                    Weight(in kgs):
              <input
                        type="number"
                        name="weight"
                        onChange={handleChange}
                        placeholder="weight"
                        value={response.weight}
                    />
                </div>
                <button type="submit">Submit</button>
                <button onClick={onToggleEditProfile}>Cancel</button>
            </form>

        </div>
    );
}
