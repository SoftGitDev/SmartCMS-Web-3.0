import { Download, History, Loader2 } from 'lucide-react';
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import LoaderUI from '../../../common/components/feedBack/loader/Loader';
import PageHeaeder from '../../../common/components/common/PageHeaeder';
import Textfield from '../../../common/components/ui/TextField/TextInput';


const dummyAccessLogs = `
2026-05-08 09:10:11 INFO  User admin logged in from 192.168.1.10
2026-05-08 09:10:52 INFO  Session created successfully for user admin
2026-05-08 09:11:20 WARN  Multiple failed login attempts detected for user demo
2026-05-08 09:11:48 INFO  User manager accessed Dashboard module
2026-05-08 09:12:05 ERROR Unauthorized access attempt blocked from 10.10.1.25
2026-05-08 09:12:44 INFO  User support exported access report
2026-05-08 09:13:01 INFO  Password updated successfully for user admin
2026-05-08 09:13:30 WARN  Session timeout warning triggered for user demo
2026-05-08 09:14:02 INFO  User finance logged out successfully
2026-05-08 09:14:45 INFO  Access token refreshed for user support
`;

const AccessLog = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [isDebugLoader, setIsDebugLoader] = useState<boolean>(false);

    const [rawLogData, setRawLogData] = useState<string>('');

    // Load Dummy Logs
    useEffect(() => {
        setIsDebugLoader(true);

        setTimeout(() => {
            setRawLogData(dummyAccessLogs);
            setIsDebugLoader(false);
        }, 1000);
    }, []);

    // Search Functionality
    const filteredLogText = useMemo(() => {
        const fullText = rawLogData || "";

        if (!searchTerm.trim()) return fullText;

        const lines = fullText.split('\n');

        const lowerSearch = searchTerm.toLowerCase();

        const matchedLines = lines.filter((line: any) =>
            line.toLowerCase().includes(lowerSearch)
        );

        return matchedLines.length > 0
            ? matchedLines.join('\n')
            : "No logs matched your search.";
    }, [rawLogData, searchTerm]);

    // Match Count
    const matchCount = useMemo(() => {
        if (!searchTerm.trim()) return null;

        const fullText = rawLogData || "";

        const lines = fullText.split('\n');

        const lowerSearch = searchTerm.toLowerCase();

        return lines.filter((line: any) =>
            line.toLowerCase().includes(lowerSearch)
        ).length;
    }, [rawLogData, searchTerm]);

    // Download Logs
    const handleDownload = () => {
        setIsLoader(true);

        setTimeout(() => {
            const blob = new Blob([filteredLogText], {
                type: 'text/plain',
            });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');

            link.href = url;
            link.download = 'access-log.txt';

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);

            setIsLoader(false);
        }, 1000);
    };

    return (
        <>
            {/* Main Header Component */}
            <Suspense fallback={<LoaderUI />}>
                <PageHeaeder
                    Icon={History}
                    title={'Access Log'}
                    description={'Monitor and review recent login activity, device details, and session history to ensure account security.'}
                />
            </Suspense>

            <div style={{ height: "calc(-180px + 100vh)", overflow: "auto", }} className='overflow-hidden d-flex  p-3 bg-white flex-column'>
                {/* Header */}
                <div className='bg-white border-bottom p-3'>
                    <div className="d-flex gap-3 align-items-center">

                        {/* Search */}
                        <div className="flex-grow-1 position-relative">
                            <Textfield 
                                type="text"
                                placeholder="Search access logs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ boxShadow: 'none' }}
                            />

                            {searchTerm.trim() && (
                                <span
                                    className="position-absolute text-muted"
                                    style={{
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        fontSize: '12px'
                                    }}
                                >
                                    {matchCount} line{matchCount !== 1 ? 's' : ''} matched
                                </span>
                            )}
                        </div>

                        {/* Download */}
                        <Button
                            variant='success'
                            className='d-flex align-items-center gap-2 px-4'
                            size='sm'
                            disabled={isLoader}
                            style={{ minWidth: '150px' }}
                            onClick={handleDownload}
                        >
                            {isLoader ? (
                                <>
                                    <Loader2 size={18} className='bx-spin' />
                                    Downloading...
                                </>
                            ) : (
                                <>
                                    <Download size={18} />
                                    Download
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Log Content */}
                {isDebugLoader ? (
                    <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                        <Loader2 className='bx-spin' />
                    </div>
                ) : (
                    <div className='flex-grow-1 overflow-hidden bg-slate-50 p-3'>
                        <div style={{ height: '100%' }}>
                            <textarea
                                ref={textareaRef}
                                className='apilog-section rounded-0 text-xs'
                                readOnly
                                value={filteredLogText || "No logs available"}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    resize: 'none',
                                    background: '#0f172a',
                                    color: '#e2e8f0',
                                    padding: '14px',
                                    fontFamily: 'monospace',
                                    border: '1px solid #334155',
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default AccessLog;