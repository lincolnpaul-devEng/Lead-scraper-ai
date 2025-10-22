
export enum LeadStatus {
  New = 'New',
  Contacted = 'Contacted',
  Qualified = 'Qualified',
  Lost = 'Lost',
  Converted = 'Converted'
}

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  industry: string;
  status: LeadStatus;
  lastContacted: string;
  companySize: number;
  website: string;
}

export interface Plan {
    name: string;
    price: string;
    features: string[];
    leadsPerMonth: string;
    recommended?: boolean;
}
