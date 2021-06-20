import React, { useState, useEffect } from 'react'
import { useFetch } from "../hooks/use-fetch";

export default function EditDependent({ dependentData, handleSuccessfulEditDependent, onToggleEditDependent }) {
    const [editDependentData, setEditDependentData] = useState({
        id: dependentData.id ? dependentData.id : "",
        name: dependentData.name ? dependentData.name : "",
        email: dependentData.email ? dependentData.email : "",
        contact: dependentData.contact ? dependentData.contact : "",
        relationship: dependentData.relationship ? dependentData.relationship : "",
        country: dependentData.country ? dependentData.country : "",
        dob: dependentData.dob ? dependentData.dob : "",
        blood_group: dependentData.blood_group ? dependentData.blood_group : "",
        weight: dependentData.weight ? dependentData.weight : "",
        height: dependentData.height ? dependentData.height : "",
        user_id: dependentData.user_id ? dependentData.user_id : "",
    });

    const editDependentFetch = useFetch(`${HOST_SERVER}/dependents/${editDependentData.id}.json`)

    const handleDependentChange = (e) => {
        setEditDependentData({
            ...editDependentData,
            [e.target.name]: e.target.value,
        })
    }

    const handleEditDependent = (e) => {
        e.preventDefault();
        editDependentFetch.doFetch({
            method: "put",
            body: JSON.stringify({ dependent: editDependentData }),
        })
    }

    useEffect(() => {
        if (editDependentFetch.response) {
            if (editDependentFetch.response.id) {
                handleSuccessfulEditDependent(editDependentData);
            }
        }
    }, [editDependentFetch.response])

    return (
        <div className="col-md-6" style={{ justifyContent: "center" }}>
            <h4>Edit Dependent</h4>
            <form onSubmit={handleEditDependent}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Name:
                    </td>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleDependentChange}
                                    value={editDependentData.name}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Email:
                    </td>
                            <td>
                                <input
                                    type="text"
                                    name="email"
                                    onChange={handleDependentChange}
                                    value={editDependentData.email}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Relationship:
                    </td>
                            <td>
                                <select
                                    name="relationship"
                                    onChange={handleDependentChange}
                                    value={editDependentData.relationship}
                                >
                                    <option>Mother</option>
                                    <option>Father</option>
                                    <option>Brother</option>
                                    <option>Sister</option>
                                    <option>Child</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Contact:
                    </td>
                            <td>
                                <input
                                    type="number"
                                    name="contact"
                                    onChange={handleDependentChange}
                                    value={editDependentData.contact}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Blood Group:
                    </td>
                            <td>
                                <input
                                    type="text"
                                    name="blood_group"
                                    onChange={handleDependentChange}
                                    value={editDependentData.blood_group}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Height(in cms):
                    </td>
                            <td>
                                <input
                                    type="number"
                                    name="height"
                                    onChange={handleDependentChange}
                                    value={editDependentData.height}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Weight(in kgs):
                    </td>
                            <td>
                                <input
                                    type="number"
                                    name="weight"
                                    onChange={handleDependentChange}
                                    value={editDependentData.weight}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Submit</button>
                <button onClick={onToggleEditDependent}>Cancel</button>
            </form>

        </div>
    )
}