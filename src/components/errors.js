import React from 'react'

export default function Errorlist({ errors }) {
    return (
        <div className="row justify-content-center">
            <div style={{ width: 400 }}>
                <ul>
                    {
                        Object.entries(errors).map((error) => {
                            return <li>{error[0]} {error[1]}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}