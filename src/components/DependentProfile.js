import React from "react";

export default function DependentProfileView({ response, onToggleAddDependent }) {
    return (
        <div>
            <div>
                name:
                {response.name}
            </div>
            <div>
                Email:
            {response.email}
            </div>
            <div>
                Relationship:
            {response.relationship}
            </div>
            <div>
                Contact:
            {response.contact}
            </div>
            <div>
                Country:
            {response.country}
            </div>
            <div>
                Blood group:
            {response.blood_group}
            </div>
            <div>
                Height:
            {response.height}
            </div>
            <div>
                Weight:
            {response.weight}
            </div>
            <button onClick={onToggleAddDependent}>Add Dependent</button>
        </div>
    );
}
