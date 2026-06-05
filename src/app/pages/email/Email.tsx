import React, { useState } from 'react';
import './EmailDashboard.css';

// Interface definitions for strict TypeScript control
interface EmailRow {
    id: number;
    sender: string;
    avatarLetter?: string;
    subject: string;
    snippet: string;
    label: 'Support' | 'Freelance' | 'Social' | 'Promotions' | 'Family' | 'Friends';
    date: string;
    starred: boolean;
}

const EmailDashboard: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<'Primary' | 'Social' | 'Promotions'>('Primary');
    const [selectedEmails, setSelectedEmails] = useState<number[]>([]);

    // Dummy Data Engine mimicking your structural visual targets
    const emailData: EmailRow[] = [
        { id: 1, sender: "Peter, me", avatarLetter: "P", subject: "Hello", snippet: "Trip home from Colombo has been arranged, then Jenna will come get me from Stockholm. :)", label: "Support", date: "Mar 7", starred: true },
        { id: 2, sender: "Susanna", avatarLetter: "S", subject: "Freelance", snippet: "Since you asked... and I'm inconceivably bored at the train station - Alright thanks. I'll hav...", label: "Freelance", date: "Mar 7", starred: true },
        { id: 3, sender: "Peter", avatarLetter: "P", subject: "Support", snippet: "Off on Thursday - UTI lad, please, you might as well say here with us instead! Sent from...", label: "Support", date: "Mar 4", starred: false },
        { id: 4, sender: "Medium", avatarLetter: "M", subject: "Social", snippet: "This Week's Top Stories - Our top pick for you on Medium this week The Man Who Destroyed...", label: "Social", date: "Feb 28", starred: false },
        { id: 5, sender: "Death to Stock", avatarLetter: "D", subject: "Monthly Highlights: Photos", snippet: "To create this month's pack, we hosted a party with local musician Jared...", label: "Promotions", date: "Feb 28", starred: false },
        { id: 6, sender: "Miller, me (5)", avatarLetter: "M", subject: "Family", snippet: "Last pic over my village - Yeah I'd like that! Do you remember the video you showed me of...", label: "Family", date: "Feb 27", starred: true },
        { id: 7, sender: "Andrew Zimmer (2)", avatarLetter: "A", subject: "Nobila Beta: Subscription Confirmed", snippet: "You've been confirmed! Welcome to the rolling class of the...", label: "Support", date: "Feb 27", starred: false },
        { id: 8, sender: "Infinity HR", avatarLetter: "I", subject: "Swiggy: Flexible working job", snippet: "Hey Nikola Sandell! I will guide in the UI *First tour 2014*, let...", label: "Freelance", date: "Feb 27", starred: true },
    ];

    // Utility to match tag classes dynamically
    const getLabelBadgeClass = (label: string) => {
        return `badge-custom badge-${label.toLowerCase()}`;
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedEmails(emailData.map(email => email.id));
        } else {
            setSelectedEmails([]);
        }
    };

    const handleSelectRow = (id: number) => {
        if (selectedEmails.includes(id)) {
            setSelectedEmails(selectedEmails.filter(item => item !== id));
        } else {
            setSelectedEmails([...selectedEmails, id]);
        }
    };

    return (
        <div className="container-fluid p-3">
            <div className="row g-3">

                {/* ================= LEFT SIDEBAR ================= */}
                <div className="col-md-3 col-lg-2">
                    <div className="sidebar-container p-3 d-flex flex-column justify-content-between">
                        <div>
                            {/* Compose CTA */}
                            <button className="btn btn-compose w-100 mb-4 d-flex align-items-center justify-content-center gap-2">
                                <i className="bi bi-pencil-square"></i> Compose
                            </button>

                            {/* System Nav Inboxes */}
                            <div className="nav flex-column mb-4">
                                <a href="#" className="nav-link-custom active">
                                    <span><i className="bi bi-inboxes me-2"></i> All Inboxes</span>
                                    <span className="badge rounded-pill bg-light text-danger">15</span>
                                </a>
                                <a href="#" className="nav-link-custom">
                                    <span><i className="bi bi-envelope me-2"></i> Inbox</span>
                                    <span className="text-muted small">8</span>
                                </a>
                                <a href="#" className="nav-link-custom">
                                    <span><i className="bi bi-send me-2"></i> Sent</span>
                                </a>
                                <a href="#" className="nav-link-custom">
                                    <span><i className="bi bi-file-earmark-text me-2"></i> Drafts</span>
                                    <span className="text-muted small">3</span>
                                </a>
                                <a href="#" className="nav-link-custom">
                                    <span><i className="bi bi-exclamation-octagon me-2"></i> Spam</span>
                                    <span className="text-muted small">12</span>
                                </a>
                                <a href="#" className="nav-link-custom">
                                    <span><i className="bi bi-trash me-2"></i> Trash</span>
                                </a>
                            </div>

                            {/* Dynamic Labels Category Section */}
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center px-2 mb-2">
                                    <span className="text-uppercase fw-bold text-muted small tracking-wider">Labels</span>
                                    <i className="bi bi-plus text-muted cursor-pointer"></i>
                                </div>
                                <div className="nav flex-column">
                                    {['Support', 'Freelance', 'Social', 'Friends', 'Family'].map((label, index) => (
                                        <a href="#" key={index} className="nav-link-custom py-1 font-sm">
                                            <span>
                                                <span className={`badge bg-${index === 0 ? 'primary' : index === 1 ? 'warning' : index === 2 ? 'info' : 'secondary'} rounded-circle p-1 me-2`} style={{ width: '8px', height: '8px', display: 'inline-block' }}></span>
                                                {label}
                                            </span>
                                            <span className="text-muted small">{(index + 2) * 2 - 1}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Chat Subsystem Module */}
                            <div>
                                <div className="d-flex justify-content-between align-items-center px-2 mb-2">
                                    <span className="text-uppercase fw-bold text-muted small">Chat</span>
                                    <i className="bi bi-plus text-muted cursor-pointer"></i>
                                </div>
                                <div className="d-flex flex-column gap-3 px-2">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="bg-secondary rounded-circle" style={{ width: '32px', height: '32px' }}></div>
                                            <div style={{ lineHeight: '1.2' }}>
                                                <div className="fw-semibold small">Scott Median</div>
                                                <span className="text-muted x-small text-truncate d-inline-block" style={{ maxWidth: '110px' }}>Hello! are you there?</span>
                                            </div>
                                        </div>
                                        <span className="badge bg-danger rounded-pill x-small">2</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Storage Progress Engine */}
                        <div className="mt-4 pt-3 border-top">
                            <div className="d-flex justify-content-between text-muted x-small mb-1">
                                <span><i className="bi bi-cloud me-1"></i> 1.75 GB of 10 GB used</span>
                            </div>
                            <div className="progress" style={{ height: '4px' }}>
                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: '17.5%' }} aria-valuenow={17.5} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ================= MAIN CONTENT DATA AREA ================= */}
                <div className="col-md-9 col-lg-10">
                    <div className="main-content-container p-3 d-flex flex-column justify-content-between">

                        <div>
                            {/* Table Utility Actions Top Bar */}
                            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                                <div className="d-flex align-items-center gap-3">
                                    <input type="checkbox" className="form-check-input border-secondary" onChange={handleSelectAll} checked={selectedEmails.length === emailData.length} />
                                    <i className="bi bi-archive text-muted-custom cursor-pointer"></i>
                                    <i className="bi bi-exclamation-circle text-muted-custom cursor-pointer"></i>
                                    <i className="bi bi-trash text-muted-custom cursor-pointer"></i>
                                    <i className="bi bi-folder-symlink text-muted-custom cursor-pointer"></i>
                                    <i className="bi bi-three-dots-vertical text-muted-custom cursor-pointer"></i>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="input-group input-group-sm" style={{ width: '280px' }}>
                                        <span className="input-group-text bg-light border-end-0"><i className="bi bi-search text-muted"></i></span>
                                        <input type="text" className="form-control bg-light border-start-0" placeholder="Search emails..." />
                                    </div>
                                    <button className="btn btn-light btn-sm border text-muted-custom"><i className="bi bi-sliders"></i></button>
                                    <button className="btn btn-light btn-sm border text-muted-custom"><i className="bi bi-gear"></i></button>
                                </div>
                            </div>

                            {/* Categorization Channel Navigation Tabs */}
                            <ul className="nav custom-tabs border-bottom mb-2">
                                <li className="nav-item">
                                    <button className={`nav-link ${currentTab === 'Primary' ? 'active' : ''}`} onClick={() => setCurrentTab('Primary')}>Primary <span className="ms-1 badge rounded-pill bg-light text-secondary">15</span></button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${currentTab === 'Social' ? 'active' : ''}`} onClick={() => setCurrentTab('Social')}>Social <span className="ms-1 badge rounded-pill bg-light text-secondary">8</span></button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${currentTab === 'Promotions' ? 'active' : ''}`} onClick={() => setCurrentTab('Promotions')}>Promotions <span className="ms-1 badge rounded-pill bg-light text-secondary">5</span></button>
                                </li>
                            </ul>

                            {/* Main Matrix Data Table Engine */}
                            <div className="table-responsive">
                                <table className="table email-table align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '40px' }}></th>
                                            <th style={{ width: '40px' }}></th>
                                            <th style={{ width: '150px' }}>Sender</th>
                                            <th>Subject & Snippet</th>
                                            <th style={{ width: '110px' }}>Label</th>
                                            <th style={{ width: '80px' }} className="text-end">Date</th>
                                            <th style={{ width: '40px' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {emailData.map((email) => (
                                            <tr key={email.id} className={!selectedEmails.includes(email.id) ? "" : "table-light"}>
                                                <td>
                                                    <input type="checkbox" className="form-check-input border-secondary" checked={selectedEmails.includes(email.id)} onChange={() => handleSelectRow(email.id)} />
                                                </td>
                                                <td>
                                                    <i className={`bi ${email.starred ? 'bi-star-fill text-warning' : 'bi-star text-muted'} cursor-pointer`}></i>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className="avatar-initial">{email.avatarLetter}</div>
                                                        <span className="text-truncate d-inline-block" style={{ maxWidth: '110px' }}>{email.sender}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="fw-semibold me-1">{email.subject}</span>
                                                    <span className="text-muted font-sm">— {email.snippet}</span>
                                                </td>
                                                <td>
                                                    <span className={getLabelBadgeClass(email.label)}>{email.label}</span>
                                                </td>
                                                <td className={`text-end small ${email.id <= 3 ? 'text-danger fw-bold' : 'text-muted'}`}>
                                                    {email.date}
                                                </td>
                                                <td>
                                                    <i className="bi bi-three-dots-vertical text-muted cursor-pointer"></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ================= FOOTER PAGINATION CONTROL LAYER ================= */}
                        <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-3 text-muted small">
                            <div className="d-flex align-items-center gap-2">
                                <span>Show</span>
                                <select className="form-select form-select-sm" style={{ width: '70px' }} defaultValue="50">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </select>
                                <span>per page</span>
                            </div>

                            {/* Standardized Core Pagination Controls */}
                            <nav aria-label="Page navigation">
                                <ul className="pagination pagination-sm mb-0 gap-1">
                                    <li className="page-item disabled"><a className="page-line btn btn-light btn-sm px-2 py-1 border" href="#"><i className="bi bi-chevron-double-left"></i></a></li>
                                    <li className="page-item disabled"><a className="page-line btn btn-light btn-sm px-2 py-1 border" href="#"><i className="bi bi-chevron-left"></i></a></li>
                                    <li className="page-item active"><a className="page-link rounded bg-danger border-danger text-white px-2.5" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link rounded text-dark border-0 px-2.5" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link rounded text-dark border-0 px-2.5" href="#">3</a></li>
                                    <li className="page-item disabled"><span className="px-1">...</span></li>
                                    <li className="page-item"><a className="page-link rounded text-dark border-0 px-2.5" href="#">16</a></li>
                                    <li className="page-item"><a className="page-line btn btn-light btn-sm px-2 py-1 border" href="#"><i className="bi bi-chevron-right"></i></a></li>
                                    <li className="page-item"><a className="page-line btn btn-light btn-sm px-2 py-1 border" href="#"><i className="bi bi-chevron-double-right"></i></a></li>
                                </ul>
                            </nav>

                            <div>
                                <span>1-50 of 154</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default EmailDashboard;