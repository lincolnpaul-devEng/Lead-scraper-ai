
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

const IntegrationSettings: React.FC = () => {
    return (
         <Card>
            <CardHeader>
                <CardTitle>CRM Integrations</CardTitle>
                <CardDescription>Connect your favorite tools to streamline your workflow.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flow-root">
                    <ul className="-my-4 divide-y divide-slate-200">
                        <li className="flex items-center justify-between py-4">
                            <div className="flex items-center">
                                {/* Placeholder for Salesforce Logo */}
                                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">S</div>
                                <p className="ml-4 text-sm font-medium text-slate-900">Salesforce</p>
                            </div>
                            <Button variant="secondary">Connect</Button>
                        </li>
                         <li className="flex items-center justify-between py-4">
                            <div className="flex items-center">
                                {/* Placeholder for Hubspot Logo */}
                                <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">H</div>
                                <p className="ml-4 text-sm font-medium text-slate-900">HubSpot</p>
                            </div>
                            <Button>Disconnect</Button>
                        </li>
                    </ul>
                </div>
            </CardContent>
             <CardFooter>
                 <p className="text-sm text-slate-500">More integrations coming soon.</p>
            </CardFooter>
        </Card>
    );
};

export default IntegrationSettings;
