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
    user_id: currentUserState.currentUser.id,
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
    user_id: currentUserState.currentUser.id,
  });

  const [dependentEmails, setDependentEmails] = useState([]);
  const [editProfile, setEditProfile] = useState(false)
  const [addDependent, setAddDependent] = useState(false)
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const { isLoading, response, error, doFetch } = useFetch(
    `http://localhost:4000/users/${currentUserState.currentUser.id}.json`
  );

  const dependentfetch = useFetch(
    `http://localhost:4000/users/${currentUserState.currentUser.id}/dependents`
  );

  const addDependentfetch = useFetch(Constant.DEPENDENTS);

  //getting userData//////////////////////////////
  useEffect(() => {
    if (!currentUserState.currentUser) return;
    doFetch({
      method: "get",
    });
  }, [currentUserState]);

  //setting userdata ,getting dependent data on load
  useEffect(() => {
    console.log("Profile: ", response);
    if (response) {
      console.log(response.name)
      setUserData({
        ...userData,
        ["name"]: response.name,
        ["email"]: response.email,
        ["contact"]: response.contact,
        ["country"]: response.country,
        ["dob"]: response.dob,
        ["blood_group"]: response.blood_group,
        ["weight"]: response.weight,
        ["height"]: response.height
      })
      console.log(userData)
    }
    dependentfetch.doFetch({
      method: "get",
    });
    onToggleEditProfile();

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
    doFetch({
      method: "put",
      body: JSON.stringify({ user: userData }),
    });
  }

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
      console.log(dependent)
      if (dependent) {
        setDependentData({
          ...dependentData,
          ["name"]: dependent.name,
          ["email"]: dependent.email,
          ["contact"]: dependent.contact,
          ["relationship"]: dependent.relationship,
          ["country"]: dependent.country,
          ["dob"]: dependent.dob,
          ["blood_group"]: dependent.blood_group,
          ["weight"]: dependent.weight,
          ["height"]: dependent.height
        }
        )
      }
      console.log(dependentData)
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
    console.log(dependentData)
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



  return (
    <div className="container">
      {response?.email && (
        <div className="row">
          <div className="col-md-6">
            {!editProfile && (<UserProfileView
              response={userData}
              onLoad={onLoad}
              loaded={loaded}
              onToggleEditProfile={onToggleEditProfile}
            />
            )}
            {editProfile && (<UserProfileForm
              response={userData}
              onLoad={onLoad}
              loaded={loaded}
              handleChange={handleChange}
              handleProfileUpdate={handleProfileUpdate}
              onToggleEditProfile={onToggleEditProfile}
            />
            )}
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
