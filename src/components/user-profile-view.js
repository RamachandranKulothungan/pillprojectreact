import React, { useEffect } from "react";

export default function UserProfileView({ response, onLoad, loaded, onToggleEditProfile,
  editImage, onToggleEditImage, handleimagesubmit, onChangeFile }) {
  return (
    <div className="col-md-6">
      <div className="row justify-content-center">
        <h4>MyProfile</h4>
      </div>
      <div className="row justify-content-between ">
        <img
          style={{ display: loaded ? "block" : "none", height: "75px", width: "75px" }}
          src={`${response?.profile_image2}`}
          onLoad={onLoad}
        />
        <div>
          <h3>
            {response.name}
          </h3>

        </div>
        <div className="row justify-content-between">
          {!editImage && <button onClick={onToggleEditImage}>{response.profile_image2 == "" ? "Add Profile image" : "Edit image"}</button>}
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
              Email:
        </td>
            <td>
              {response.email}
            </td>
          </tr>
          <tr>
            <td>
              Contact:
        </td>
            <td>
              {response.contact}
            </td>
          </tr>
          <tr>
            <td>
              Country:
        </td>
            <td>
              {response.country}
            </td>
          </tr>
          <tr>
            <td>
              Blood group:
        </td>
            <td>
              {response.blood_group}
            </td>
          </tr>
          <tr>
            <td>
              Height:
        </td>
            <td>
              {response.height}
            </td>
          </tr>
          <tr>
            <td>
              Weight:
        </td>
            <td>
              {response.weight}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="row justify-content-center">
        <button onClick={onToggleEditProfile}>Edit</button>
      </div>
    </div >
  );
}
