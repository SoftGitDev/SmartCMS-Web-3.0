// Created by: Harish
// Created Date: 02-06-2026

import React, { useCallback, useState } from "react";
import { Button, Card, CardBody } from "react-bootstrap";
import {
    Building2,
    ChevronDown,
    ChevronRight,
    LucideLayoutGrid,
    Mail,
} from "lucide-react";

import Checkbox from "../../../common/components/ui/checkBox/Checkbox";
import StatusBadge from "../../../common/components/ui/customBadge/StatusBadge";
import SelectField from "../../../common/components/ui/SelectBox/SelectField";

const ESCALATION_LEVELS = [
    {
        id: 1,
        name: "Level 1 Escalation",
        users: [
            {
                id: 1,
                name: "Alice Johnson",
                email: "alice@example.com",
            },
            {
                id: 2,
                name: "Bob Smith",
                email: "bob@example.com",
            },
            {
                id: 3,
                name: "Charlie Davis",
                email: "charlie@example.com",
            },
        ],
    },
    {
        id: 2,
        name: "Level 2 Escalation",
        users: [
            {
                id: 4,
                name: "Diana Prince",
                email: "diana@example.com",
            },
            {
                id: 5,
                name: "Ethan Hunt",
                email: "ethan@example.com",
            },
            {
                id: 6,
                name: "Fiona Gallagher",
                email: "fiona@example.com",
            },
        ],
    },
    {
        id: 3,
        name: "Level 3 Escalation",
        users: [
            {
                id: 7,
                name: "George Miller",
                email: "george@example.com",
            },
            {
                id: 8,
                name: "Hannah Abbott",
                email: "hannah@example.com",
            },
            {
                id: 9,
                name: "Ian Wright",
                email: "ian@example.com",
            },
            {
                id: 10,
                name: "Julia Roberts",
                email: "julia@example.com",
            },
            {
                id: 11,
                name: "Kevin Hart",
                email: "kevin@example.com",
            },
            {
                id: 12,
                name: "Laura Croft",
                email: "laura@example.com",
            },
            {
                id: 13,
                name: "Michael Scott",
                email: "michael@example.com",
            },
            {
                id: 14,
                name: "Nina Simone",
                email: "nina@example.com",
            },
            {
                id: 15,
                name: "Oscar Isaac",
                email: "oscar@example.com",
            },
        ],
    },
];

const EscalationLevelAssign = () => {
    const [expanded, setExpanded] = useState<Record<number, boolean>>({ 1: true, });

    const [userChecked, setUserChecked] = useState<Record<number, boolean>>({});

    const getUsersForLevel = (levelId: number) => {
        return (
            ESCALATION_LEVELS.find((level) => level.id === levelId)?.users || []
        );
    };

    const isLevelChecked = (levelId: number) => {
        const users = getUsersForLevel(levelId);

        return (
            users.length > 0 &&
            users.every((user) => userChecked[user.id])
        );
    };

    const handleLevelCheck = useCallback(
        (levelId: number, checked: boolean) => {
            const users = getUsersForLevel(levelId);

            setUserChecked((prev) => {
                const next = { ...prev };

                users.forEach((user) => {
                    next[user.id] = checked;
                });

                return next;
            });
        },
        []
    );

    const handleUserCheck = useCallback(
        (userId: number, checked: boolean) => {
            setUserChecked((prev) => ({
                ...prev,
                [userId]: checked,
            }));
        },
        []
    );

    const toggleExpand = (levelId: number) => {
        setExpanded((prev) => ({
            ...prev,
            [levelId]: !prev[levelId],
        }));
    };

    const selectedCount = Object.values(userChecked).filter(Boolean).length;

    return (
        <>
            {/* Filter */}
            <Card className="mb-3">
                <CardBody>
                    <div className='ms-auto d-flex gap-3'>
                        <div style={{ width: 320 }}>
                            <SelectField
                                placeholder='Select matrix level'
                            />
                        </div>
                        <Button>
                            Update
                        </Button>
                    </div>
                </CardBody>
            </Card>


            <Card className="border rounded-3">
                <div className="px-3 py-2 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <LucideLayoutGrid size={15} />
                        <span className="text-primary fw-medium">
                            Escalation Levels
                        </span>
                    </div>

                    {selectedCount > 0 && (
                        <StatusBadge
                            label={`${selectedCount} Selected`}
                            variant="transparent"
                        />
                    )}
                </div>

                <Card.Body className="p-0" style={{ height: "calc(100vh - 330px)", overflowY: "auto", }}>
                    {ESCALATION_LEVELS.map((level) => {
                        const isExpanded = !!expanded[level.id];
                        const isChecked = isLevelChecked(level.id);

                        return (
                            <React.Fragment key={level.id}>
                                <div className="d-flex align-items-center gap-2 px-3 py-3 bg-primary-50 cursor-pointer" onClick={() => toggleExpand(level.id)}>
                                    {isExpanded ? (
                                        <ChevronDown size={16} />
                                    ) : (
                                        <ChevronRight size={16} />
                                    )}

                                    <Building2
                                        size={16}
                                        className="text-primary"
                                    />

                                    <span className="fw-medium">
                                        {level.name}
                                    </span>

                                    <span className="text-danger small">
                                        {level.users.length} Users
                                    </span>

                                    <div
                                        className="ms-auto"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Checkbox
                                            checked={isChecked}
                                            onChange={(e: any) =>
                                                handleLevelCheck(
                                                    level.id,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                {isExpanded &&
                                    level.users.map((user) => (
                                        <div
                                            key={user.id}
                                            className="d-flex align-items-center gap-2 px-3 py-2 border-bottom"
                                            onClick={() =>
                                                handleUserCheck(
                                                    user.id,
                                                    !userChecked[user.id]
                                                )
                                            }
                                        >
                                            <div style={{ width: 32 }} />

                                            <div className="blank-logo text-lg">
                                                {user.name.charAt(0)}
                                            </div>

                                            <div>
                                                <div className="text-sm">
                                                    {user.name}
                                                </div>

                                                <div className="text-xs text-muted d-flex align-items-center gap-1">
                                                    <Mail size={12} />
                                                    {user.email}
                                                </div>
                                            </div>

                                            <div
                                                className="ms-auto"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <Checkbox
                                                    checked={
                                                        !!userChecked[user.id]
                                                    }
                                                    onChange={(e: any) =>
                                                        handleUserCheck(
                                                            user.id,
                                                            e.target.checked
                                                        )
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

export default EscalationLevelAssign;
