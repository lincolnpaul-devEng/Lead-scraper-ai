
import { Lead, LeadStatus, Plan } from './types';

export const PRICING_PLANS: Plan[] = [
  {
    name: 'Starter',
    price: '49',
    leadsPerMonth: '500 leads/month',
    features: [
      'Basic search filters',
      'Email support',
      'Google Sheets export',
      'Standard lead enrichment'
    ]
  },
  {
    name: 'Growth',
    price: '149',
    leadsPerMonth: '2,000 leads/month',
    features: [
      'Advanced filters + AI categorization',
      'Priority email & chat support',
      'CRM integrations (Salesforce, Hubspot)',
      'API access',
      'AI-powered lead scoring'
    ],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: '499',
    leadsPerMonth: '10,000 leads/month',
    features: [
      'Custom search parameters',
      'Dedicated account manager',
      'White-label options',
      '99.9% Uptime SLA',
      'Onboarding & team training'
    ]
  }
];

export const MOCK_LEADS: Lead[] = [
    {
        id: '1',
        companyName: 'Innovate Inc.',
        contactName: 'Alice Johnson',
        email: 'alice.j@innovate.com',
        phone: '555-0101',
        location: 'San Francisco, CA',
        industry: 'Technology',
        status: LeadStatus.New,
        lastContacted: '2023-10-26',
        companySize: 150,
        website: 'innovate.com'
    },
    {
        id: '2',
        companyName: 'Data Solutions LLC',
        contactName: 'Bob Williams',
        email: 'bob.w@datasolutions.com',
        phone: '555-0102',
        location: 'New York, NY',
        industry: 'Data Analytics',
        status: LeadStatus.Contacted,
        lastContacted: '2023-10-25',
        companySize: 75,
        website: 'datasolutions.com'
    },
    {
        id: '3',
        companyName: 'Creative Minds Agency',
        contactName: 'Charlie Brown',
        email: 'charlie.b@creativeminds.com',
        phone: '555-0103',
        location: 'Chicago, IL',
        industry: 'Marketing',
        status: LeadStatus.Qualified,
        lastContacted: '2023-10-22',
        companySize: 30,
        website: 'creativeminds.com'
    },
    {
        id: '4',
        companyName: 'GreenScape Landscaping',
        contactName: 'Diana Miller',
        email: 'diana.m@greenscape.com',
        phone: '555-0104',
        location: 'Austin, TX',
        industry: 'Services',
        status: LeadStatus.Converted,
        lastContacted: '2023-09-15',
        companySize: 50,
        website: 'greenscape.com'
    },
    {
        id: '5',
        companyName: 'HealthWell Clinics',
        contactName: 'Evan Davis',
        email: 'evan.d@healthwell.com',
        phone: '555-0105',
        location: 'Miami, FL',
        industry: 'Healthcare',
        status: LeadStatus.Lost,
        lastContacted: '2023-10-20',
        companySize: 250,
        website: 'healthwell.com'
    },
    {
        id: '6',
        companyName: 'Quantum Computing Co',
        contactName: 'Fiona Garcia',
        email: 'fiona.g@quantum.com',
        phone: '555-0106',
        location: 'Boston, MA',
        industry: 'Technology',
        status: LeadStatus.New,
        lastContacted: '2023-10-27',
        companySize: 500,
        website: 'quantum.com'
    },
    {
        id: '7',
        companyName: 'NextGen Logistics',
        contactName: 'George Harris',
        email: 'george.h@nextgen.com',
        phone: '555-0107',
        location: 'Los Angeles, CA',
        industry: 'Logistics',
        status: LeadStatus.Contacted,
        lastContacted: '2023-10-26',
        companySize: 120,
        website: 'nextgen.com'
    },
    {
        id: '8',
        companyName: 'Ember Eateries',
        contactName: 'Hannah Clark',
        email: 'hannah.c@embereateries.com',
        phone: '555-0108',
        location: 'Seattle, WA',
        industry: 'Food & Beverage',
        status: LeadStatus.Qualified,
        lastContacted: '2023-10-24',
        companySize: 85,
        website: 'embereateries.com'
    },
];
