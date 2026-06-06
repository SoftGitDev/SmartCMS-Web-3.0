// Purpose: Category View Rights Table UI Module Screen
// Created by: Harish
// Created Date: 02-06-2026

import React, { useState, useCallback } from "react";
import { Button, Card } from "react-bootstrap";
import { ChevronDown, ChevronRight, Check, Building2, Mail } from "lucide-react";
import SelectField from "../../../common/components/ui/SelectBox/SelectField";
import StatusBadge from "../../../common/components/ui/customBadge/StatusBadge";
import Checkbox from "../../../common/components/ui/checkBox/Checkbox";


// ─── Types ───────

type UserItem = {
    id: number;
    name: string;
    initials: string;
    email: string;
};

type Department = {
    id: number;
    name: string;
    users: UserItem[];
};

// ─── Dummy Data ──

const DEPARTMENTS: Department[] = [
    {
        id: 1,
        name: "Development",
        users: [
            { id: 101, name: "Prateek Sharma", initials: "PS", email: "prateek@company.com" },
            { id: 102, name: "Sumit Patel", initials: "SP", email: "sumit@company.com" },
        ],
    },
    {
        id: 2,
        name: "Human Resource HR",
        users: [
            { id: 201, name: "Abhishek Parihar", initials: "AP", email: "abhishek@company.com" },
        ],
    },
    {
        id: 3,
        name: "CBS",
        users: [
            { id: 301, name: "Ravi Kumar", initials: "RK", email: "ravi@company.com" },
        ],
    },
    {
        id: 4,
        name: "Finance",
        users: [
            { id: 401, name: "Neha Gupta", initials: "NG", email: "neha@company.com" },
            { id: 402, name: "Rahul Verma", initials: "RV", email: "rahul@company.com" },
            { id: 403, name: "Sonal Jain", initials: "SJ", email: "sonal@company.com" },
        ],
    },
];

const CATEGORY_OPTIONS = [
    { label: "UPI Related", value: "upi" },
    { label: "NEFT / RTGS", value: "neft" },
    { label: "Account Services", value: "account" },
    { label: "Loan Queries", value: "loan" },
];

const SUB_CATEGORY_MAP: Record<string, { label: string; value: string }[]> = {
    upi: [{ label: "UPI Failure", value: "upi_fail" },
    { label: "UPI Limit Exceeded", value: "upi_limit" },
    { label: "Refund Status", value: "refund" }],
    neft: [{ label: "NEFT Delay", value: "neft_delay" },
    { label: "RTGS Pending", value: "rtgs_pending" }],
    account: [{ label: "KYC Update", value: "kyc" },
    { label: "Statement Request", value: "stmt" }],
    loan: [{ label: "EMI Inquiry", value: "emi" },
    { label: "Foreclosure", value: "foreclosure" }],
};



// ─── Main Component ───────────────────────────────────────────────────────────

const CategoryVieWrightTdl: React.FC = () => {
    // Filters
    const [category, setCategory] = useState<any>(CATEGORY_OPTIONS[0]);
    const [subCategory, setSubCategory] = useState<any>(null);

    // Tree state
    const [expanded, setExpanded] = useState<Record<number, boolean>>({ 1: true, 2: true });
    const [userChecked, setUserChecked] = useState<Record<number, boolean>>({});


    // Derived sub-category options
    const subOptions = category ? SUB_CATEGORY_MAP[category.value] ?? [] : [];

    // ── Selection helpers ──
    const getUsersForDept = (deptId: number) =>
        DEPARTMENTS.find((d) => d.id === deptId)?.users ?? [];

    const isDeptChecked = (deptId: number) =>
        getUsersForDept(deptId).every((u) => userChecked[u.id]);



    const handleDeptCheck = useCallback(
        (deptId: number, checked: boolean) => {
            const users = getUsersForDept(deptId);
            setUserChecked((prev) => {
                const next = { ...prev };
                users.forEach((u) => (next[u.id] = checked));
                return next;
            });
        },
        []
    );

    const handleUserCheck = useCallback((userId: number, deptId: number, checked: boolean) => {
        setUserChecked((prev) => ({ ...prev, [userId]: checked }));
    }, [userChecked]);

    const toggleExpand = (deptId: number) =>
        setExpanded((prev) => ({ ...prev, [deptId]: !prev[deptId] }));

    // ── Actions ──
    const selectedCount = Object.values(userChecked).filter(Boolean).length;

    const handleUpdate = () => {
    };


    // ─────────────

    return (
        <>

            {/* ── Filter bar ── */}
            <Card className="mb-4 border shadow-none" style={{ borderRadius: 10 }}>
                <Card.Body className="p-3">
                    <div className="d-flex align-items-end gap-3 flex-wrap">
                        <div style={{ flex: 1, minWidth: 200 }}>
                            <SelectField
                                label="Category"
                                options={CATEGORY_OPTIONS}
                                value={category}
                                onChange={(v: any) => { setCategory(v); setSubCategory(null); }}
                            />
                        </div>
                        <div style={{ flex: 2, minWidth: 200 }}>
                            <SelectField
                                label="Sub-category (optional)"
                                placeholder="Select sub-category"
                                options={subOptions}
                                value={subCategory}
                                onChange={setSubCategory}
                            />
                        </div>
                        <Button onClick={handleUpdate}>
                            <Check size={15} /> Update
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            {/* ── Department tree ── */}
            <Card className="border rounded-3" >
                {/* Header row */}
                <div className="px-3 py-2 d-flex align-items-center d-flex justify-content-between gap-2">
                    <div className="align-items-center gap-2 d-flex">
                        <Building2 size={14} color="#64748b" />
                        <span className=" text-primary">
                            Departments & Users
                        </span>
                    </div>
                    {selectedCount > 0 && (
                        <StatusBadge
                            label={`${selectedCount} selected`}
                            variant="transparent"
                        />
                    )}
                </div>

                <Card.Body className="p-0" style={{ height: "calc(-360px + 100vh)", overflow: "auto", }}>
                    {DEPARTMENTS.map((dept, di) => {
                        const isExp = !!expanded[dept.id];
                        const isChk = isDeptChecked(dept.id);
                        return (
                            <React.Fragment key={dept.id}>
                                {/* Department row */}
                                <div className="d-flex align-items-center gap-2 px-3 p-3 bg-primary-50" onClick={() => toggleExpand(dept.id)}>
                                    {isExp ? (
                                        <ChevronDown size={16} />
                                    ) : (
                                        <ChevronRight size={16} />
                                    )}
                                    <Building2 size={15} className="text-primary" />
                                    <span className="text-sm">
                                        {dept.name}
                                    </span>
                                    <span className="text-sm text-danger">
                                        {dept.users.length} user{dept.users.length !== 1 ? "s" : ""}
                                    </span>
                                    <div className="ms-auto" onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            checked={isChk}
                                            onChange={(e: any) => handleDeptCheck(dept.id, e.target.checked)}
                                        />
                                    </div>
                                </div>

                                {/* User rows */}
                                {isExp &&
                                    dept.users.map((user, ui) => (
                                        <div key={user.id} className="d-flex align-items-center gap-2 p-2 px-3" onClick={() => handleUserCheck(user.id, dept.id, !userChecked[user.id])}>
                                            <div style={{ width: 32 }} />

                                            <div className="d-flex align-items-center gap-2">
                                                <div className='blank-logo text-lg'>
                                                    {user.initials.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-sm">{user.name}</div>
                                                    <div className='text-xs text-slate-500'> <span className='text-primary'><Mail size={12} /> : </span>{user.email}</div>
                                                </div>
                                            </div>

                                            <div className="ms-auto" onClick={(e) => e.stopPropagation()}>
                                                <Checkbox
                                                    checked={!!userChecked[user.id]}
                                                    onChange={(e: any) =>
                                                        handleUserCheck(user.id, dept.id, e.target.checked)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </React.Fragment>
                        );
                    })}
                </Card.Body>
            </Card>
        </>
    );
};

export default CategoryVieWrightTdl;