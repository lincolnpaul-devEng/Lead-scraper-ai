
import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle: string;
    children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children }) => {
    return (
        <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
                    <p className="mt-1 text-slate-600">{subtitle}</p>
                </div>
                {children && <div className="flex-shrink-0">{children}</div>}
            </div>
        </div>
    );
};

export default PageHeader;
