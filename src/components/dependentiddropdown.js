import React from 'react'

export default function DependentIdDropdown({ dependentIds }) {
    return (
        <>
            {dependentIds.map(id => {
                return (<option key={id}>{id}</option>);
            })
            }
        </>
    )
}