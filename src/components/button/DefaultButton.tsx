/** @format */

import React from "react";

interface DefaultButtonProps {
	children: React.ReactNode;
	className?: string;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
	children,
	className,
}) => {
	return <button className={className}>{children}</button>;
};

export default DefaultButton;
