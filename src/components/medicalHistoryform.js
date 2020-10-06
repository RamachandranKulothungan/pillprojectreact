import React from 'react'

export default function MedicalHistoryForm({ handleChange }) {
    return (
        <>
            <td>
                <div className="col-xs-6">
                    <input
                        type="text"
                        name="illness"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="illness"
                    />
                </div>
            </td>
            <td>
                <div className="col-xs-6">
                    <input
                        type="text"
                        name="doctor"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Doctor Name"
                    />
                </div>
            </td>
            <td>
                <div className="col-xs-6">
                    <input
                        type="text"
                        name="medicines"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Medicines"
                    />
                </div>
            </td>
            <td>
                <div className="col-xs-6">
                    <input
                        type="date"
                        name="start_date"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Start date"
                    />
                </div>
            </td>
            <td>
                <div className="col-xs-6">
                    <input
                        type="date"
                        name="end_date"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="End date"
                    />
                </div>
            </td>
            <td>
                <div className="col-xs-6">
                    <input
                        type="text"
                        name="dosage_amount"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Dosage Amount"
                    />
                </div>
            </td>
            <td>
                <div className="col-xs-6">
                    <input
                        type="text"
                        name="dosage_frequency"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Dosage frequency"
                    />
                </div>
            </td>
            <td>
                <div className="col-xs-6">
                    <input
                        type="text"
                        name="dosage_time"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Dosage time"
                    />
                </div>
            </td>
            <td>
                <div className="col-xs-6">
                    <input
                        type="checkbox"
                        name="notification"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Notifications"
                    />
                </div>
            </td>
        </>
    )
}