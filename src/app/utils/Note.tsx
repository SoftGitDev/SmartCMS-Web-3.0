import React from 'react'

interface noteProps {
    data: string[]
}

const Note: React.FC<noteProps> = ({ data }) => {
    return (
        <div
            style={{
                background: "#f9f9f9",
                padding: "10px",
                borderRadius: "5px",
            }}>
            <span
                style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    borderBottom: "1px solid",
                }}
                className='text-danger'
            >
                Note -{" "}
            </span>
            <br />
            <ol className="noteOl mt-3">
                {data.map((items: string, id: number) => (
                    <li key={id} className='text-sm text-slate-500 mt-2'>
                        {items}
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default Note