import React, { useEffect } from "react";

export default function UserProfileView({ response, onLoad, loaded, onToggleEditProfile }) {
  return (
    <div>
      <h4>MyProfile</h4>
      <div className="row">
        <img
          style={{ display: loaded ? "block" : "none", height: "50px", width: "50px" }}
          src={`${response?.profile_image2}`}
          onLoad={onLoad}
        />
        <h3>
          {response.name}
        </h3>
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
