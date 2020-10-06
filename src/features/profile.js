import React, { useContext, useState, useEffect, useCallback } from "react";
import UserProfileView from "../components/user-profile-view";
import CurrentUserContext from "../context/current-user-context";
import Constants from "../context/constants";
import { useFetch } from "../hooks/use-fetch";
import DependentDropdown from "../components/dependentDropdown";
import DependentProfileView from "../components/DependentProfile";
import UserProfileForm from "../components/user-profile-form";
import DependentProfileForm from "../components/dependent-profile-form"

export default function Profile() {
  const Constant = useContext(Constants);
  const [currentUserState, setCurrentUserState] = useContext(
    CurrentUserContext
  );

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact: "",
    country: "",
    dob: "",
    blood_group: "",
    weight: "",
    height: "",
    profile_image2: "",
  });

  const [dependentData, setDependentData] = useState({
    name: "",
    email: "",
    contact: "",
    relationship: "",
    country: "",
    dob: "",
    blood_group: "",
    weight: "",
    height: "",
    user_id: currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id"),
  });

  const [emptydependentData, setemptyDependentData] = useState({
    name: "",
    email: "",
    contact: "",
    relationship: "",
    country: "",
    dob: "",
    blood_group: "",
    weight: "",
    height: "",
    user_id: currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id"),
  });

  const [imagestate, setImagestate] = useState({
    id: currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id"),
    profile_image: "",
  })
  const [dependentEmails, setDependentEmails] = useState([]);
  const [editProfile, setEditProfile] = useState(false)
  const [addDependent, setAddDependent] = useState(false)
  const [loaded, setLoaded] = useState(false);
  const [editImage, setEditImage] = useState(false)

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const { isLoading, response, error, doFetch } = useFetch(
    `http://localhost:4000/users/${currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id")}.json`
  );
  const updatefetch = useFetch(
    `http://localhost:4000/users/${currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id")}.json`
  );
  const dependentfetch = useFetch(
    `http://localhost:4000/users/${currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id")}/dependents`
  );

  const addDependentfetch = useFetch(Constant.DEPENDENTS);

  //getting userData//////////////////////////////
  useEffect(() => {
    if (!currentUserState.currentUser) return;
    doFetch({
      method: "get",
    });
  }, []);

  //setting userdata ,getting dependent data on load
  useEffect(() => {
    if (response) {
      if (response.name) {
        console.log("Profile: ", response);
        console.log(response.name)
        setUserData({
          ...userData,
          ["name"]: response.name ? response.name : "",
          ["email"]: response.email ? response.email : "",
          ["contact"]: response.contact ? response.contact : "",
          ["country"]: response.country ? response.country : "",
          ["dob"]: response.dob ? response.dob : "",
          ["profile_image2"]: response.profile_image2 ? response.profile_image2 : "",
          ["blood_group"]: response.blood_group ? response.blood_group : "",
          ["weight"]: response.weight ? response.weight : "",
          ["height"]: response.height ? response.height : ""
        })
        dependentfetch.doFetch({
          method: "get",
        });
      }
    }
  }, [response]);

  // useEffect(() => {
  //   console.log("userData", userData)
  // }, [userData])

  //setting dependentEmails////////////////////////
  useEffect(() => {
    if (dependentfetch.response) {
      console.log("Dependents", dependentfetch.response);
      let dependent_emails = dependentfetch.response.map((d) => {
        return d.email;
      });
      console.log("data", dependentEmails)
      console.log("emails", dependent_emails);
      setDependentEmails([...dependent_emails]);
      console.log([...dependent_emails])
    }
  }, [dependentfetch.response]);

  //User Profile //////////////////////////////////
  const onToggleEditProfile = () => {
    console.log("toggle edit")
    setEditProfile(
      e => !e
    )
  }

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log(userData)
    updatefetch.doFetch({
      method: "put",
      body: JSON.stringify({ user: userData }),
    });
  }

  useEffect(() => {
    if (updatefetch.response) {
      doFetch({
        method: "get"
      });
      onToggleEditProfile();
    }
  }, [updatefetch.response])

  //DependentProfile///////////////////////////////
  const dependentChange = (e) => {
    console.log(e.target.value)
    if (e.target.value == "Select Dependent") {
      setDependentData(emptydependentData)
    }
    else {
      let dependent = dependentfetch.response.find((d) => {
        return d.email == e.target.value
      })
      //console.log(dependent)
      if (dependent) {
        setDependentData(dependent
          //   {
          //   // ...dependentData,
          //   // ["name"]: dependent.name,
          //   // ["email"]: dependent.email,
          //   // ["contact"]: dependent.contact,
          //   // ["relationship"]: dependent.relationship,
          //   // ["country"]: dependent.country,
          //   // ["dob"]: dependent.dob,
          //   // ["blood_group"]: dependent.blood_group,
          //   // ["weight"]: dependent.weight,
          //   // ["height"]: dependent.height
          // }
        )
      }
      //console.log(dependentData)
    }

  }



  //Add Dependent/////////////////////////////////////
  const onToggleAddDependent = () => {
    setAddDependent(
      p => !p
    )
    setDependentData(emptydependentData)
  }

  const handleDependentChange = (e) => {
    setDependentData({
      ...dependentData,
      [e.target.name]: e.target.value,
    });
  }

  const handleAddDependent = (e) => {
    e.preventDefault();
    //console.log(dependentData)
    addDependentfetch.doFetch({
      method: "post",
      body: JSON.stringify({ dependent: dependentData }),
    });
  }

  // reloading dependents////////////////////////////////
  useEffect(() => {
    if (addDependentfetch.response) {
      if (addDependentfetch.response.id) {
        dependentfetch.doFetch({
          method: "get",
        });
        onToggleAddDependent();
      }
    }
  }, [addDependentfetch.response]);

  // image form///////////////////////////////////
  const onToggleEditImage = () => {
    console.log("image toggle")
    setEditImage(p => !p)
  }

  const onChangeFile = e => {
    console.log(e.target.files[0]);
    setImagestate({
      ...imagestate,
      profile_image: e.target.files[0]
    });
  };

  const handleimagesubmit = (e) => {
    e.preventDefault();
    if (imagestate.profile_image) {
      const formData = new FormData();
      formData.append("user[id]", imagestate.id);
      formData.append("user[profile_image]", imagestate.profile_image);

      console.log("formData", formData);
      doFetch({
        method: "put",
        noContentType: true,
        body: formData
      });
      onToggleEditImage();
    }
  }


  return (
    <div className="container">
      {response?.email && (
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-md-6">
            {!editProfile && (<UserProfileView
              response={userData}
              onLoad={onLoad}
              loaded={loaded}
              onToggleEditProfile={onToggleEditProfile}
              handleimagesubmit={handleimagesubmit}
              onChangeFile={onChangeFile}
              onToggleEditImage={onToggleEditImage}
              editImage={editImage}
            />
            )}
            {editProfile && (<UserProfileForm
              response={userData}
              onLoad={onLoad}
              loaded={loaded}
              handleChange={handleChange}
              handleProfileUpdate={handleProfileUpdate}
              onToggleEditProfile={onToggleEditProfile}
              handleimagesubmit={handleimagesubmit}
              onChangeFile={onChangeFile}
              onToggleEditImage={onToggleEditImage}
              editImage={editImage}
            />
            )}
            {/* {!editImage && <button onClick={onToggleEditImage}>edit image</button>}
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
            )} */}
          </div>
          <div className="col-md-6">
            {!addDependent && (
              <div>
                <h4>Dependent Profile</h4>
                {dependentEmails && (
                  <select onChange={dependentChange}>
                    <option>Select Dependent</option>
                    <DependentDropdown dependentEmails={dependentEmails} />
                  </select>
                )}
                <DependentProfileView response={dependentData}
                  onToggleAddDependent={onToggleAddDependent} />
              </div>
            )}
            {addDependent && (
              <DependentProfileForm handleAddDependent={handleAddDependent}
                onToggleAddDependent={onToggleAddDependent}
                handleDependentChange={handleDependentChange} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
