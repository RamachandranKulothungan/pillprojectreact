import React from 'react'

export default function DependentDropdown({ dependentEmails }) {
    return (
        <>
            {dependentEmails.map(email => {
                return (<option key={email}>{email}</option>);
            })
            }
        </>
    )
}