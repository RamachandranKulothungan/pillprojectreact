import React from "react";

export default function DependentProfileForm({ handleDependentChange, handleAddDependent, onToggleAddDependent }) {
    return (
        <div className="col-md-6" style={{ justifyContent: "center" }}>
            <h4>Add Dependent</h4>
            <form onSubmit={handleAddDependent}>
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
                                    placeholder="name"
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
                                    placeholder="Email"
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
                                    placeholder="contact"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Country:
                    </td>
                            <td>
                                <input
                                    type="text"
                                    name="country"
                                    onChange={handleDependentChange}
                                    placeholder="country"
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
                                    placeholder="blood group"
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
                                    placeholder="height"
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
                                    placeholder="weight"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Submit</button>
                <button onClick={onToggleAddDependent}>Cancel</button>
            </form>

        </div>
    );
}
