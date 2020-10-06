import React from 'react'

export default function HistoryTable({ history, onToggleNotification, onDeleteHistory }) {
    return (
        <>
            <td>{history.illness}</td>
            <td>{history.doctor}</td>
            <td>{history.medicines}</td>
            <td>{history.start_date}</td>
            <td>{history.end_date}</td>
            <td>{history.dosage_amount}</td>
            <td>{history.dosage_frequency}</td>
            <td>{history.dosage_time}</td>
            <td>
                <>
                    {history.notification &&
                        <i onClick={() => onToggleNotification(history)} className="fas fa-toggle-on"></i>
                    }
                    {!history.notification &&
                        <i onClick={() => onToggleNotification(history)} className="fas fa-toggle-off"></i>
                    }
                </>
            </td>
            <td>
                <i onClick={() => onDeleteHistory(history)} className="fas fa-trash"></i>
            </td>
        </>
    );
} 