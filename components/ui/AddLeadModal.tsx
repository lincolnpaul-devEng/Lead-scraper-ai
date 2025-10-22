
import React, { useState, FormEvent } from 'react';
import { Lead, LeadStatus } from '../../types';
import { X } from '../icons';
import { Button } from './button';

interface AddLeadModalProps {
    onClose: () => void;
    onAddLead: (lead: Omit<Lead, 'id' | 'lastContacted'>) => void;
}

const AddLeadModal: React.FC<AddLeadModalProps> = ({ onClose, onAddLead }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        location: '',
        industry: '',
        status: LeadStatus.New,
        companySize: 0,
        website: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'companySize' ? parseInt(value, 10) || 0 : value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onAddLead(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-slate-800">Add New Lead</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:bg-slate-100"><X className="h-6 w-6" /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-slate-700">Company Name</label>
                                <input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="contactName" className="block text-sm font-medium text-slate-700">Contact Name</label>
                                <input type="text" name="contactName" id="contactName" value={formData.contactName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-slate-700">Location</label>
                                <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="industry" className="block text-sm font-medium text-slate-700">Industry</label>
                                <input type="text" name="industry" id="industry" value={formData.industry} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="companySize" className="block text-sm font-medium text-slate-700">Company Size</label>
                                <input type="number" name="companySize" id="companySize" value={formData.companySize === 0 ? '' : formData.companySize} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-slate-700">Website</label>
                                <input type="text" name="website" id="website" value={formData.website} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                                <select name="status" id="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                                    {Object.values(LeadStatus).map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center p-4 border-t bg-slate-50 rounded-b-lg">
                        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button type="submit" className="ml-2">Add Lead</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLeadModal;
