
import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    About Us
                </h1>
                <p className="mt-5 max-w-xl mx-auto text-xl text-slate-600">
                    Learn about our mission to revolutionize lead generation.
                </p>
            </div>
            {/* Add about content here */}
        </div>
    );
};

export default AboutPage;
