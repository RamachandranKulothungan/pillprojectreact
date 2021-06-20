import React, { useContext, useState, useEffect, useCallback } from "react";
import UserProfileView from "../components/user-profile-view";
import CurrentUserContext from "../context/current-user-context";
import Constants from "../context/constants";
import { useFetch } from "../hooks/use-fetch";
import DependentDropdown from "../components/dependentDropdown";
import DependentProfileView from "../components/DependentProfile";
import UserProfileForm from "../components/user-profile-form";
import DependentProfileForm from "../components/dependent-profile-form"
import Errorlist from "../components/errors";
import EditDependent from "../components/edit_dependent";

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
    id: "",
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
  const [errors, setErrors] = useState([])
  const [dependentEmails, setDependentEmails] = useState([]);
  const [editProfile, setEditProfile] = useState(false)
  const [addDependent, setAddDependent] = useState(false)
  const [isEditDependent, setIsEditDependent] = useState(false)
  const [loaded, setLoaded] = useState(false);
  const [editImage, setEditImage] = useState(false)
  const [isPersonSelected, setIsPersonSelected] = useState(false)

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const { isLoading, response, error, doFetch } = useFetch(
    `${HOST_SERVER}/users/${currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id")}.json`
  );
  const updatefetch = useFetch(
    `${HOST_SERVER}/users/${currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id")}.json`
  );
  const dependentfetch = useFetch(
    `${HOST_SERVER}/users/${currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id")}/dependents`
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
    setErrors({})
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
      if (updatefetch.response.id) {
        doFetch({
          method: "get"
        });
        onToggleEditProfile();
        setCurrentUserState((state) => ({
          ...state,
          currentUser: updatefetch.response,
        }));
      }
      else {
        setErrors(updatefetch.response)
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
      }
    }
  }, [updatefetch.response])

  //DependentProfile///////////////////////////////
  const dependentChange = (e) => {
    console.log(e.target.value)
    if (e.target.value == "Select Dependent") {
      setIsPersonSelected(false)
      setDependentData(emptydependentData)
    }
    else {
      setIsPersonSelected(true)
      let dependent = dependentfetch.response.find((d) => {
        return d.email == e.target.value
      })
      //console.log(dependent)
      if (dependent) {
        setDependentData(dependent)
      }
      //console.log(dependentData)
    }

  }

  //Edit Dependent profile//////////////////////////////
  const onToggleEditDependent = () => {
    setIsEditDependent(p => !p)
  }

  const handleSuccessfulEditDependent = (data) => {
    setDependentData(data)
    setIsEditDependent(p => !p)
    dependentfetch.doFetch({
      method: "get"
    })
  }

  //Add Dependent/////////////////////////////////////
  const onToggleAddDependent = () => {
    setAddDependent(
      p => !p
    )
    setDependentData(emptydependentData)
    setErrors({})
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
      else {
        setErrors(addDependentfetch.response)
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
          <div className="card col-md-6">
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
            {editProfile && (
              <>
                <UserProfileForm
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
                {errors && <Errorlist errors={errors} />}
              </>
            )}
          </div>
          <div className="card col-md-6">
            {!addDependent && (
              <div>
                <h4>Dependent Profile</h4>
                {!isEditDependent &&
                  dependentEmails && (
                    <select onChange={dependentChange}>
                      <option>Select Dependent</option>
                      <DependentDropdown dependentEmails={dependentEmails} />
                    </select>
                  )}
                {isEditDependent && (
                  <EditDependent handleSuccessfulEditDependent={handleSuccessfulEditDependent}
                    onToggleEditDependent={onToggleEditDependent}
                    dependentData={dependentData} />
                )}
                {!isEditDependent && (
                  <DependentProfileView response={dependentData}
                    onToggleAddDependent={onToggleAddDependent}
                    onToggleEditDependent={onToggleEditDependent}
                    isPersonSelected={isPersonSelected}
                    isEditDependent={isEditDependent} />
                )}
              </div>
            )}
            {addDependent && (
              <>
                <DependentProfileForm handleAddDependent={handleAddDependent}
                  onToggleAddDependent={onToggleAddDependent}
                  handleDependentChange={handleDependentChange} />
                {errors && <Errorlist errors={errors} />}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
