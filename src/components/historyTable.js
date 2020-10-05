import React from 'react'

export default function HistoryTable({ history }) {
    return (
        <tr>
            <td>{history.illness}</td>
            <td>{history.doctor}</td>
            <td>{history.medicines}</td>
            <td>{history.start_date}</td>
            <td>{history.end_date}</td>
            <td>{history.dosage_amount}</td>
            <td>{history.dosage_frequency}</td>
            <td>{history.dosage_time}</td>
            <td>
                {/* {<input
                    type="checkbox"
                    name="notification"
                    className="form-control"
                    placeholder="Notifications"
                    checked={history.notification}
                />} */}
                <>
                    {history.notification &&
                        <i class="fas fa-toggle-on"></i>
                    }
                    {!history.notification &&
                        <i class="fas fa-toggle-off"></i>
                    }
                </>
            </td>
        </tr>
    );
} 