import React, { useContext, useState, useEffect } from "react";
import Constants from "../context/constants";
import CurrentUserContext from "../context/current-user-context";
import { useFetch } from "../hooks/use-fetch";
import HistoryTable from "../components/historyTable";
import MedicalHistoryForm from "../components/medicalHistoryform";
import DependentIdDropdown from "../components/dependentiddropdown"
import Errorlist from "../components/errors";

function Landing() {
  const Constant = useContext(Constants);
  const [currentUserState, setCurrentUserState] = useContext(
    CurrentUserContext
  );
  const [errors, setErrors] = useState([])
  const [histories, setHistories] = useState([]);
  const [addHistory, setAddHistory] = useState(false)
  const [dependentIds, setDependentIds] = useState([]);

  const [userData, setUserData] = useState();

  const [historyid, setHistoryid] = useState()

  const [Hist, setHist] = useState({
    user_id: currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id"),
    dependent_id: "",
    id: "",
    illness: "",
    doctor: "",
    medicines: "",
    start_date: "",
    end_date: "",
    dosage_amount: "",
    dosage_frequency: "",
    notification: false,
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
    `${HOST_SERVER}/users/${currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id")}.json`
  );

  const notiffetch = useFetch(`${HOST_SERVER}/histories/${Hist.id}.json`)

  const deletefetch = useFetch(`${HOST_SERVER}/histories/${historyid}.json`)

  const dependentfetch = useFetch(
    `${HOST_SERVER}/users/${currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id")}/dependents`
  );

  const addhistoryfetch = useFetch(Constant.HISTORY)

  const historyfetch = useFetch(
    `${HOST_SERVER}/histories/user/${currentUserState.currentUser.id ? currentUserState.currentUser.id : localStorage.getItem("user_id")}/current`
  )

  useEffect(() => {
    historyfetch.doFetch({
      method: "get",
    });
    doFetch({
      method: "get",
    });
    dependentfetch.doFetch({
      method: "get",
    });
  }, []);

  // useEffect(() => {
  //   if (!currentUserState.currentUser) return;

  // }, []);

  //setting username
  useEffect(() => {
    console.log("Profile: ", response);
    if (response) {
      if (response.name) {
        setUserData(response)
      }
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



  //AddingHistory//////////////////////////////////
  const handleAddHistoryToggle = () => {
    setAddHistory(p => !p)
    setHistory(emptyHistory)
    setErrors({})
  }

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
        //handleAddHistoryToggle();
      }
      else {
        setErrors(addhistoryfetch.response)
      }
    }
  }, [addhistoryfetch.response])


  //Notif Update/////////////////////////////////
  const onToggleNotification = (h) => {
    h.notification = !h.notification
    setHistoryid(h.id)
    setHist(h)
  }

  useEffect(() => {
    if (Hist.id) {
      notiffetch.doFetch({
        method: "put",
        body: JSON.stringify({ history: Hist })
      })
    }
  }, [Hist])

  useEffect(() => {
    historyfetch.doFetch({
      method: "get",
    });
  }, [notiffetch.response])

  //Delete Record//////////////////////////
  const onDeleteHistory = (h) => {
    if (window.confirm("Delete the item?")) {
      setHistoryid(h.id)
      deletefetch.doFetch({
        method: "delete",
      })
    }
  }

  useEffect(() => {
    historyfetch.doFetch({
      method: "get",
    });
  }, [deletefetch.response])

  return (
    <div className="container" style={{
      textAlign: "center"
    }}>
      <h2>Welcome {userData ? userData.name : "User"}</h2>
      <form onSubmit={handleAddHistory}>
        <div className="">
          <div className="form-group">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>Person</th>
                  <th>Illness</th>
                  <th>Doctor Name</th>
                  <th>Medicines</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Dosage Amount</th>
                  <th>Dosage Frequency</th>
                  <th>Dosage Time</th>
                  <th>Notifications</th>
                  <th>Remove</th>
                </tr>
                {histories.length != 0 && (
                  <>
                    {
                      histories.map((h) => {
                        return (
                          <tr key={h.id}>
                            <td>{h.dependent_id}</td>
                            <HistoryTable history={h} onToggleNotification={onToggleNotification}
                              onDeleteHistory={onDeleteHistory} />
                          </tr>)
                      })
                    }
                  </>
                )}
                {addHistory && (
                  <tr>
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
              {errors && <Errorlist errors={errors} />}
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
