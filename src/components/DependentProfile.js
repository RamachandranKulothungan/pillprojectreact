import React from "react";

export default function DependentProfileView({ response, onToggleAddDependent, onToggleEditDependent, isPersonSelected }) {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            name:
                </td>
                        <td>
                            {response.name}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email:
                </td>
                        <td>
                            {response.email}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Relationship:
                </td>
                        <td>
                            {response.relationship}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Contact:
                </td>
                        <td>
                            {response.contact}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Blood group:
                </td>
                        <td>
                            {response.blood_group}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Height:
                </td>
                        <td>
                            {response.height}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Weight:
                </td>
                        <td>
                            {response.weight}
                        </td>
                    </tr>
                </tbody>
            </table>
            {isPersonSelected && <button onClick={onToggleEditDependent}>Edit Data</button>}
            <button onClick={onToggleAddDependent}>Add Dependent</button>
        </div>
    );
}
