import React from 'react';

interface NoteProps {
    data: string[];
}

const Note: React.FC<NoteProps> = ({ data }) => {
    return (
        <div
            className="mt-3"
            style={{
                background: "#f8f9fa",
                padding: "12px 16px",
                borderRadius: "8px",
                borderLeft: "4px solid #dc3545",
            }}
        >
            <span
                className="text-danger fw-semibold"
                style={{
                    fontSize: "13px",
                    borderBottom: "1px solid #dc3545",
                }}
            >
                Note
            </span>

            <div className="mt-3">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="mb-2 text-secondary"
                        style={{ fontSize: "13px" }}
                    >
                        <span className="fw-semibold me-1">
                            {index + 1}.
                        </span>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Note;