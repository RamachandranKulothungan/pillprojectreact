import React, { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../context/current-user-context";
import { useFetch } from "../hooks/use-fetch";

function Landing() {
  const [currentUserState, setCurrentUserState] = React.useContext(
    CurrentUserContext
  );
  const { isLoading, response, error, doFetch } = useFetch(
    `http://localhost:3000/medical_histories/${currentUserState.id}/users`
  );

  useEffect(() => {
    doFetch({
      method: "get",
    });
  }, []);

  React.useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <div>
      <h4>User Profile</h4>
      <p>Welcome</p>
      <button>Add Medical History</button>
      {/* dependent_id: null
       dosage_amount: "1 dosage"
      dosage_frequency: "daily-twice"
      dosage_time: "2pm"
      drname: "Dr. Strange"
      email_notify: true
      enddate: "2020-10-04"
      id: 68
      illness: "Fever"
      medicine: "Paracetomol"
      startdate: "2020-10-01"
      */}

      {response &&
        response.map((r) => {
          return (
            <div key={r.id} className="card mt-2 p-2">
              <h4>{r.drname}</h4>
              <p>{r.illness}</p>
            </div>
          );
        })}
    </div>
  );
}
export default Landing;
