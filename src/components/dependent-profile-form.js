import React from "react";

export default function DependentProfileForm({ handleDependentChange, handleAddDependent, onToggleAddDependent }) {
    return (
        <div className="col-md-6">
            <h4>Add Dependent</h4>
            <form onSubmit={handleAddDependent}>
                <div>
                    Name:
              <input
                        type="text"
                        name="name"
                        onChange={handleDependentChange}
                        placeholder="name"
                    />
                </div>
                <div>
                    Email:
              <input
                        type="text"
                        name="email"
                        onChange={handleDependentChange}
                        placeholder="Email"
                    />
                </div>
                <div>
                    Email:
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
                </div>
                <div>
                    Contact:
              <input
                        type="number"
                        name="contact"
                        onChange={handleDependentChange}
                        placeholder="contact"
                    />
                </div>
                <div>
                    Country:
              <input
                        type="text"
                        name="country"
                        onChange={handleDependentChange}
                        placeholder="country"
                    />
                </div>
                <div>
                    Blood Group:
              <input
                        type="text"
                        name="blood_group"
                        onChange={handleDependentChange}
                        placeholder="blood group"
                    />
                </div>
                <div>
                    Height(in cms):
              <input
                        type="number"
                        name="height"
                        onChange={handleDependentChange}
                        placeholder="height"
                    />
                </div>
                <div>
                    Weight(in kgs):
              <input
                        type="number"
                        name="weight"
                        onChange={handleDependentChange}
                        placeholder="weight"
                    />
                </div>
                <button type="submit">Submit</button>
                <button onClick={onToggleAddDependent}>Cancel</button>
            </form>

        </div>
    );
}
