import React, { useMemo } from 'react';
import { CheckCheck } from 'lucide-react';

interface StepIndicatorProps {
    currentStep: any;
    allSteps: any;
}



const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, allSteps }) => {

    return (
        <div className="d-flex align-items-center justify-content-center">
            {allSteps.map((step: any, index: number) => {
                const Icon = step.icon;
                const isActive = step.step === currentStep;
                const isCompleted = step.step < currentStep;
                const isConnectorActive = step.step < currentStep;

                return (
                    <React.Fragment key={step.step}>
                        <div className="d-flex flex-column align-items-center" style={{ minWidth: '120px' }}>
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle mb-2 transition-all"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: isActive ? 'var(--primaryColor)' : isCompleted ? 'hsl(145 65% 42%)' : 'var(--primaryColor25)',
                                    color: isActive || isCompleted ? 'white' : 'var(--primaryColor)',
                                }}
                            >
                                {isCompleted ? <CheckCheck size={20} /> : <Icon size={18} />}
                            </div>
                            <span className="fw-medium text-center" style={{ fontSize: '12px', color: isActive ? 'var(--primaryColor)' : isCompleted ? 'hsl(145 65% 42%)' : 'hsl(220 10% 45%)', }}>
                                {step.title}
                            </span>
                            <span className="text-center" style={{ fontSize: '11px', color: 'hsl(220 10% 55%)', }}>
                                {step.subtitle}
                            </span>
                        </div>
                        {index < allSteps.length - 1 && (
                            <div
                                className="step-connector mx-1"
                                style={{
                                    width: '60px',
                                    height: '2px',
                                    backgroundColor: isConnectorActive
                                        ? 'rgb(37, 177, 95)'
                                        : 'hsl(220 15% 88%)',
                                    marginBottom: '28px',
                                }}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default StepIndicator;