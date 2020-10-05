import React from "react";

export default function UserProfileView({ response, onLoad, loaded, onToggleEditProfile }) {
  return (
    <div>
      <h4>MyProfile</h4>
      <img
        style={{ display: loaded ? "block" : "none", height: "200px" }}
        src={`${response?.profile_image2}`}
        onLoad={onLoad}
      />
      <div>
        name:
        {response.name}
      </div>
      <div>
        Email:
        {response.email}
      </div>
      <div>
        Contact:
        {response.contact}
      </div>
      <div>
        Country:
        {response.country}
      </div>
      <div>
        Blood group:
        {response.blood_group}
      </div>
      <div>
        Height:
        {response.height}
      </div>
      <div>
        Weight:
        {response.weight}
      </div>
      <button onClick={onToggleEditProfile}>Edit</button>
    </div>
  );
}
