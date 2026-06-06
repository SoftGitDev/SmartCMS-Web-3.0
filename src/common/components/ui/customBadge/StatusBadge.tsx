/************************************************************
// Component     : User Page
// Purpose       : In this we Get all the users entry
// Created by    : Prateek
// Created Date  : 26-07-2025
// Description   : In this we Get all the users entry

// Change History:
// 
************************************************************/

import * as Icons from "lucide-react";
import React from "react";

export type VariantType =
  | "primary"
  | "success"
  | "danger"
  | "dark"
  | "light"
  | "warning"
  | "transparent";

interface StatusBadgeProps {
  label: any;
  icon?: any;
  variant?: string; // changed from VariantType to string
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  onClick?: () => void;
  length?: number;
  style?: React.CSSProperties;
}

const variantColors: Record<string, { bg: string; text: string }> = {
  primary: { bg: "#cfe2ff", text: "#0d6efd" },
  success: { bg: "#a7ea9d81", text: "#14653fff" },
  danger: { bg: "#f8d7da", text: "#dc3545" },
  dark: { bg: "#d3d3d4", text: "#212529" },
  light: { bg: "#f8f9fa", text: "#5a5a5a" },
  warning: { bg: "#b37b141a", text: "#9A5700" },
  transparent: { bg: "white", text: "#7786a8ff" },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  icon,
  variant,
  backgroundColor,
  textColor,
  onClick,
  style,
  length,
  className = "",
}) => {
  const bg = backgroundColor || (variant ? variantColors[variant].bg : "#eee");
  const text = textColor || (variant ? variantColors[variant].text : "#333");

  const isTransparent = variant === "transparent";
  const borderStyle = isTransparent ? "1px solid #ccc" : "none";;
  return (
    <>
      <span
        className={`badge rounded-2 d-inline-flex fw-semibold align-items-center px-2 py-1 ${className}`}
        onClick={onClick}
        style={{
          backgroundColor: bg,
          color: text,
          border: borderStyle,
          ...style
        }}>
        {icon && React.createElement((Icons as any)[icon], { width: 14, height: 14 })}
        <span className="text-md" style={{ padding: "2px 5px" }}>{label}</span>
      </span>
      {length && length > 0 && <span className="text-xs" style={{ padding: "2px 5px" }}>{length - 2}</span>}
    </>
  );
};

export default StatusBadge;
