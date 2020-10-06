import React, { useContext, useState, useEffect, useCallback } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import DependentDropdown from "../components/dependentDropdown";
import CurrentUserContext from "../context/current-user-context";
import Constants from "../context/constants";
import { useFetch } from "../hooks/use-fetch";
import HistoryTable from "../components/historyTable";
import MedicalHistoryForm from "../components/medicalHistoryform";

export default function MedicalHistory() {
  const Constant = useContext(Constants);
  const [currentUserState, setCurrentUserState] = useContext(
    CurrentUserContext
  );

  const [dependentEmails, setDependentEmails] = useState([]);
  const [histories, setHistories] = useState([]);
  const [addHistory, setAddHistory] = useState(false)
  const [personselected, setpersonselected] = useState(false)
  const [dependentData, setDependentData] = useState({
    id: "",
    email: "",
    user_id: currentUserState.currentUser.id,
  });

  const [History, setHistory] = useState({
    user_id: currentUserState.currentUser.id,
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
    user_id: currentUserState.currentUser.id,
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

  const addhistoryfetch = useFetch(Constant.HISTORY)

  const dependentfetch = useFetch(
    `http://localhost:4000/users/${currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id")}/dependents`
  );

  const historyfetch = useFetch(
    `http://localhost:4000/histories/user/${currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id")}`
  )

  //getting dependents
  useEffect(() => {
    if (!currentUserState.currentUser) return;
    dependentfetch.doFetch({
      method: "get",
    });
    historyfetch.doFetch({
      method: "get",
    });
  }, [currentUserState]);

  //setting dependentEmails////////////////////////
  useEffect(() => {
    if (dependentfetch.response) {
      console.log("Dependents", dependentfetch.response);
      let dependent_emails = dependentfetch.response.map((d) => {
        return d.email;
      });
      // console.log("data", dependentEmails)
      // console.log("emails", dependent_emails);
      setDependentEmails([...dependent_emails]);
      //console.log([...dependent_emails])
    }
  }, [dependentfetch.response]);

  //setting histories for self on load
  useEffect(() => {
  }, [historyfetch.response])

  //setting medical history, histories///////////////////////////////
  const dependentChange = (e) => {
    if (e.target.value === "Select person") {
      setpersonselected(false)
      setHistories([])
    }
    else if (e.target.value === "Self") {
      setpersonselected(true)
      if (historyfetch.response) {
        let self_histories = historyfetch.response.filter((h) => {
          return h.dependent_id == null
        })
        setHistories([...self_histories])
        setHistory({
          ...History,
          ["dependent_id"]: null
        })
      }
    }
    else {
      setpersonselected(true)
      let dependent = dependentfetch.response.find((d) => {
        return d.email == e.target.value
      })
      if (dependent) {
        setDependentData({
          ...dependentData,
          ["id"]: dependent.id,
          ["email"]: dependent.email
        })
      }
    }
  }

  useEffect(() => {
    if (historyfetch.response) {
      let dependent_histories = historyfetch.response.filter((h) => {
        return h.dependent_id == dependentData.id
      })
      setHistories([...dependent_histories])
    }
    setHistory({
      ...History,
      ["dependent_id"]: dependentData.id
    })
  }, [dependentData])

  useEffect(() => {
    console.log(histories)
  }, [histories])

  //Adding Medical History///////////////////////////////////
  const handleAddHistoryToggle = () => {
    setAddHistory(p => !p)
    setemptyHistory({
      ...emptyHistory,
      ["dependent_id"]: dependentData.id
    })
  }

  useEffect(() => {
    setHistory(emptyHistory)
  }, [emptyHistory])

  const handleChange = (e) => {
    setHistory({
      ...History,
      [e.target.name]: e.target.value,
    });
  }

  const handleAddHistory = (e) => {
    e.preventDefault();
    addhistoryfetch.doFetch({
      method: "post",
      body: JSON.stringify({ history: History }),
    });
  }

  useEffect(() => {
    if (addhistoryfetch.response) {
      if (addhistoryfetch.response.id) {
        handleAddHistoryToggle();
        historyfetch.doFetch({
          method: "get",
        });
        histories.push(addhistoryfetch.response)
        setHistories(
          histories
        )
      }
    }
  }, [addhistoryfetch.response])

  return (
    <div className="container" style={{
      textAlign: "center"
    }}>
      <select onChange={dependentChange}>
        <option>Select person</option>
        <option>Self</option>
        <DependentDropdown dependentEmails={dependentEmails} />
      </select>
      <form onSubmit={handleAddHistory}>
        {personselected && (
          <div className="">
            <div className="form-group row">
              <table className="table table-striped">
                <tbody>
                  <tr>
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
                              <HistoryTable history={h} />
                            </tr>)
                        })
                      }
                    </>
                  )}
                  {addHistory && (
                    <tr>
                      <MedicalHistoryForm handleChange={handleChange}
                        handleSubmit={handleAddHistory} />
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {histories.length == 0 && !addHistory && (
              <h4>
                No Record Added
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
        )}
      </form>
    </div >
  );
}
