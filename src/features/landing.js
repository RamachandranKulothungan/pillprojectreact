import React, { useContext, useState, useEffect } from "react";
import Constants from "../context/constants";
import CurrentUserContext from "../context/current-user-context";
import { useFetch } from "../hooks/use-fetch";
import HistoryTable from "../components/historyTable";
import MedicalHistoryForm from "../components/medicalHistoryform";
import DependentIdDropdown from "../components/dependentiddropdown"

function Landing() {
  const Constant = useContext(Constants);
  const [currentUserState, setCurrentUserState] = useContext(
    CurrentUserContext
  );
  const [histories, setHistories] = useState([]);
  const [addHistory, setAddHistory] = useState(false)
  const [dependentIds, setDependentIds] = useState([]);

  const [userData, setUserData] = useState({
    name: "",
  });

  const [History, setHistory] = useState({
    user_id: currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id"),
    dependent_id: "",
    illness: "",
    doctor: "",
    medicines: "",
    start_date: "",
    end_date: "",
    dosage_amount: "",
    dosage_frequency: "",
    notification: false,
  });

  const [emptyHistory, setemptyHistory] = useState({
    user_id: currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id"),
    dependent_id: "",
    illness: "",
    doctor: "",
    medicines: "",
    start_date: "",
    end_date: "",
    dosage_amount: "",
    dosage_frequency: "",
    notification: false,
  });

  const { isLoading, response, error, doFetch } = useFetch(
    `http://localhost:4000/users/${currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id")}.json`
  );

  const dependentfetch = useFetch(
    `http://localhost:4000/users/${currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id")}/dependents`
  );

  const addhistoryfetch = useFetch(Constant.HISTORY)

  const historyfetch = useFetch(
    `http://localhost:4000/histories/user/${currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id")}/current`
  )

  useEffect(() => {
    historyfetch.doFetch({
      method: "get",
    });
  }, []);

  useEffect(() => {
    if (!currentUserState.currentUser) return;
    doFetch({
      method: "get",
    });
    dependentfetch.doFetch({
      method: "get",
    });
  }, [currentUserState]);

  //setting username
  useEffect(() => {
    console.log("Profile: ", response);
    if (response) {
      setUserData({
        ...userData,
        ["name"]: response.name,
      })
    }
  }, [response])

  //setting dependentEmails////////////////////////
  useEffect(() => {
    if (dependentfetch.response) {
      console.log("Dependents", dependentfetch.response);
      let dependent_ids = dependentfetch.response.map((d) => {
        return d.id;
      });
      console.log("ids", dependent_ids);
      setDependentIds([...dependent_ids]);
    }
  }, [dependentfetch.response]);

  //setting histories///////////////////////////
  useEffect(() => {
    console.log(historyfetch.response);
    if (historyfetch.response) {
      if (historyfetch.response.length > 0) {
        setHistories([...historyfetch.response])
      }
    }
  }, [historyfetch.response]);

  useEffect(() => {
    if (addhistoryfetch.response) {
      if (addhistoryfetch.response.id) {
        handleAddHistoryToggle();
        historyfetch.doFetch({
          method: "get",
        });
        //handleAddHistoryToggle();
      }
    }
  }, [addhistoryfetch.response])

  const handleAddHistoryToggle = () => {
    setAddHistory(p => !p)
    setHistory(emptyHistory)
  }
  const handleAddHistory = (e) => {
    e.preventDefault();
    addhistoryfetch.doFetch({
      method: "post",
      body: JSON.stringify({ history: History }),
    });
  }

  const handleChange = (e) => {
    setHistory({
      ...History,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div className="container" style={{
      textAlign: "center"
    }}>
      <h2>Welcome {userData.name}</h2>
      <form onSubmit={handleAddHistory}>
        <div className="">
          <div className="form-group row">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>user id</th>
                  <th>dependent id</th>
                  <th>Illness</th>
                  <th>Doctor Name</th>
                  <th>Medicines</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Dosage Amount</th>
                  <th>Dosage Frequency</th>
                  <th>Dosage Time</th>
                  <th>Notifications</th>
                </tr>
                {histories.length != 0 && (
                  <>
                    {
                      histories.map((h) => {
                        return (
                          <tr key={h.id}>
                            <td>{h.user_id}</td>
                            <td>{h.dependent_id}</td>
                            <HistoryTable history={h} />
                          </tr>)
                      })
                    }
                  </>
                )}
                {addHistory && (
                  <tr>
                    <td>{currentUserState.currentUser.id}</td>
                    <td>{dependentIds && (
                      <select name="dependent_id" onChange={handleChange}>
                        <option></option>
                        <DependentIdDropdown dependentIds={dependentIds} />
                      </select>
                    )}</td>
                    <MedicalHistoryForm handleChange={handleChange}
                      handleSubmit={handleAddHistory} />
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {histories.length == 0 && !addHistory && (
            <h4>
              No medicines for today
            </h4>
          )}
          {addHistory && (
            <>
              <button type="submit">Save</button>
              <button onClick={handleAddHistoryToggle}>Cancel</button>
            </>
          )}
          {!addHistory && (
            <button onClick={handleAddHistoryToggle}>Add Medical History</button>
          )}
        </div>
      </form>
    </div>
  );
}
export default Landing;
