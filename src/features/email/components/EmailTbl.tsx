import React, { JSX, useState } from 'react';
import { Datatable } from '../../../common/components/ui/DataTable/Datatable';
import { tableColumnProps } from '../../../services/type';
import { Dot, Mail, Star } from 'lucide-react';
import { Button } from 'react-bootstrap';
import '../../../assets/styles/Email.css';


interface EmailTblProps {
    category?: 'primary' | 'social' | 'promotions';
    handleEmailDtl: (row: any) => void
}

const columns: tableColumnProps[] = [
    { field: 'star', header: '', sorting: false, width: '36px' },
    { field: 'sender', header: 'Sender', sorting: true, width: '80px' },
    { field: 'subject', header: 'Subject & Snippet', sorting: true },
    // { field: 'label', header: 'Label', sorting: true },
    { field: 'date', header: 'Date', sorting: true },
];

const allEmailData: any[] = [
    { id: 1, sender: 'Peter, me', email: 'hello@deathtostockphoto.com', avatarLetter: 'P', subject: 'Trip to Colombo arranged', snippet: 'Trip home from Colombo has been arranged, then Jenna will come get me from Stockholm.', label: 'Support', date: 'Mar 7', starred: true, unread: false, category: 'primary' },
    { id: 2, sender: 'Susanna', email: 'hello@deathtostockphoto.com', avatarLetter: 'S', subject: 'Freelance opportunity', snippet: "Since you asked... I'm inconceivably bored at the train station – Alright, I'll have a look.", label: 'Freelance', date: 'Mar 7', starred: true, unread: true, category: 'primary' },
    { id: 3, sender: 'Peter', email: 'hello@deathtostockphoto.com', avatarLetter: 'P', subject: 'Off Thursday – support needed', snippet: 'UTI lad, please, you might as well stay here with us instead! Sent from my iPhone.', label: 'Support', date: 'Mar 4', starred: false, unread: false, category: 'primary' },
    { id: 4, sender: 'Medium Daily', email: 'hello@deathtostockphoto.com', avatarLetter: 'M', subject: "This week's top stories", snippet: 'Our top pick for you: The Man Who Destroyed Democracy — and What Came Next.', label: 'Social', date: 'Feb 28', starred: false, unread: true, category: 'social' },
    { id: 5, sender: 'Death to Stock', email: 'hello@deathtostockphoto.com', avatarLetter: 'D', subject: 'Monthly highlights: photos', snippet: 'To create this month pack, we hosted a party with local musician Jared Kraft.', label: 'Promotions', date: 'Feb 28', starred: false, unread: false, category: 'promotions' },
    { id: 6, sender: 'Miller, me (5)', avatarLetter: 'M', email: 'miller.family@gmail.com', subject: 'Last pic over the village', snippet: 'Yeah Id like that! Do you remember the festival video? Bring the drone next time.', label: 'Family', date: 'Feb 27', starred: true, unread: true, category: 'primary' },
    { id: 7, sender: 'Andrew Zimmer', avatarLetter: 'A', email: 'andrew.z@nobila.io', subject: 'Nobila Beta: subscription confirmed', snippet: 'Welcome to the rolling class of the Nobila early access programme. Enjoy!', label: 'Support', date: 'Feb 27', starred: false, unread: false, category: 'primary' },
    { id: 8, sender: 'Infinity HR', avatarLetter: 'I', email: 'careers@infinityhr.com', subject: 'Swiggy: flexible working role', snippet: 'Hey Nikola! Ill guide you through the UI.First tour starts Jan 2024 – let me know.', label: 'Freelance', date: 'Feb 27', starred: true, unread: false, category: 'primary' },
    { id: 9, sender: 'LinkedIn', avatarLetter: 'L', email: 'notifications@linkedin.com', subject: '5 new connections this week', snippet: 'People you may know are joining LinkedIn. See whos connecting with you now.', label: 'Social', date: 'Feb 26', starred: false, unread: false, category: 'social' },
    { id: 10, sender: 'Spotify', avatarLetter: 'S', email: 'offers@spotify.com', subject: 'Your weekly discount is here 🎵', snippet: '3 months of Premium for ₹59/mo – limited time offer for loyal listeners like you.', label: 'Promotions', date: 'Feb 25', starred: false, unread: true, category: 'promotions' },
];

const labelStyles: Record<string, { background: string; color: string }> = {
    Support: { background: '#E6F1FB', color: '#0C447C' },
    Freelance: { background: '#EEEDFE', color: '#3C3489' },
    Social: { background: '#EAF3DE', color: '#27500A' },
    Promotions: { background: '#FAEEDA', color: '#633806' },
    Family: { background: '#FBEAF0', color: '#72243E' },
};

const avatarColors: Record<string, { background: string; color: string }> = {
    P: { background: '#B5D4F4', color: '#0C447C' },
    S: { background: '#F4C0D1', color: '#72243E' },
    M: { background: '#C0DD97', color: '#27500A' },
    D: { background: '#FAC775', color: '#633806' },
    A: { background: '#CECBF6', color: '#3C3489' },
    I: { background: '#9FE1CB', color: '#085041' },
    L: { background: '#B5D4F4', color: '#185FA5' },
};

const EmailTbl: React.FC<EmailTblProps> = ({ category, handleEmailDtl }) => {
    const [emailData, setEmailData] = useState<any[]>(category ? allEmailData.filter(e => e.category === category) : allEmailData);
    const [selectData, setSelectData] = useState<any[]>([]);

    // star
    const toggleStar = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setEmailData(prev =>
            prev.map(email => email.id === id ? { ...email, starred: !email.starred } : email)
        );
    };

    const isSelected = (row: any) => selectData?.some((item: any) => item.id === row.id);

    return (
        <Datatable
            data={emailData}
            columns={columns}
            isSearchBar
            isNotCardRequired
            style={{ height: 'calc(-385px + 100vh)', overflow: 'auto' }}
            checkbox
            onDoubleClick={(row: any) => handleEmailDtl(row)}
            selectData={selectData}
            setSelectData={setSelectData}
            columnStyle={(row: any) =>
                isSelected(row)
                    ? { backgroundColor: 'var(--primaryColor25, #EEF4FF)', transition: '0.2s ease' }
                    : {}
            }
        >
            {(child: { row: any; column: tableColumnProps; rowIndex: number }): JSX.Element => (
                <>
                    {/* ── Star column ── */}
                    {child.column.field === 'star' && (
                        <Button variant='' className=' border-0 pointer-event' onClick={(e) => toggleStar(e, child.row.id)} style={{ color: child.row.starred ? '#BA7517' : '#ccc', }} title={child.row.starred ? 'Unstar' : 'Star'}>
                            <Star size={16} fill={child.row.starred ? '#BA7517' : 'none'} stroke={child.row.starred ? '#BA7517' : '#ccc'} />
                        </Button>
                    )}

                    {/* ── Sender column ── */}
                    {child.column.field === 'sender' && (
                        <div className="d-flex align-items-center gap-2">
                            {/* Avatar */}
                            <div className="email-icon-person" style={{ ...(avatarColors[child.row.avatarLetter] ?? { background: '#e5e7eb', color: '#555' }), }}>
                                {child.row.avatarLetter}
                            </div>

                            {/* Name + Email */}
                            <div className="d-flex flex-column justify-content-center" >
                                <span className="fw-semibold text-truncate">
                                    {child.row.sender}
                                </span>
                                <span className='text-xs'>
                                    <Mail className='text-primary' size={14} /> {child.row.email}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* ── Subject & Snippet column ── */}
                    {child.column.field === 'subject' && (
                        <div>
                            <div className='fw-bold'>
                                {child.row.subject}
                                {child.row.unread && (<Dot className='text-primary' />)}
                            </div>
                            <div className='text-sm' >
                                {child.row.snippet}
                            </div>
                        </div>
                    )}

                    {/* ── Label column ── */}
                    {child.column.field === 'label' && (
                        <span className='p-1 rounded-5 text-xs'
                            style={{
                                fontWeight: 500, whiteSpace: 'nowrap',
                                ...(labelStyles[child.row.label] ?? { background: '#e5e7eb', color: '#555' }),
                            }}>
                            {child.row.label}
                        </span>


                    )}

                    {/* ── Date column ── */}
                    {child.column.field === 'date' && (
                        <span className='text-muted text-sm'>
                            {child.row.date}
                        </span>
                    )}
                </>
            )}
        </Datatable>
    );
};

export default EmailTbl;