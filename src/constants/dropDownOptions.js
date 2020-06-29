const gender = [
  { value: 'F', label: 'Female' },
  { value: 'M', label: 'Male' },
];

const employmentStatus = [
  { value: 'businessOwner', label: 'Business Owner' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'employedByGovernment', label: 'Employed by government' },
  { value: 'employedByNGO', label: 'Employed by NGO' },
  {
    value: 'employedByPrivateOrganization',
    label: 'Employed by Private Organisation',
  },
];

const assignmentLanguage = [
  { value: 'ar', label: 'Arabic' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
];

const assignmentTypes = [
  { value: 'fullTime', label: 'Full-Time' },
  { value: 'partTime', label: 'Part-Time' },
];

const assignmentLocations = [
  { value: 'countryOfResidence', label: 'Country of Residence' },
  { value: 'virtualAssignments', label: 'Virtual Assignments' },
  { value: 'openForTravel', label: 'Open for Travel' },
  { value: 'noPreference', label: 'No Preference' },
];

const industries = [
  {
    value: 'artsEntertainmentRecreation',
    label: 'Arts, Entertainment, and Recreation',
  },
  {
    value: 'broadcasting',
    label: 'Broadcasting',
  },
  {
    value: 'banking',
    label: 'Banking',
  },
  {
    value: 'collegeUniversityAdultEducation',
    label: 'College, University, and Adult Education',
  },
  {
    value: 'computerElectronicsManufacturing',
    label: 'Computer and Electronics Manufacturing',
  },
  {
    value: 'construction',
    label: 'Construction',
  },
  {
    value: 'consulting',
    label: 'Consulting',
  },
  {
    value: 'financeInsurance',
    label: 'Finance and Insurance',
  },
  {
    value: 'governmentPublicAdministration',
    label: 'Government and Public Administration',
  },
  {
    value: 'healthCareSocialAssistance',
    label: 'Health Care and Social Assistance',
  },
  {
    value: 'homemaker',
    label: 'Homemaker',
  },
  {
    value: 'hotelFoodServices',
    label: 'Hotel and Food Services',
  },
  {
    value: 'informationServicesDataProcessing',
    label: 'Information Services and Data Processing',
  },
  {
    value: 'legalServices',
    label: 'Legal Services',
  },
  {
    value: 'mediaCommunications',
    label: 'Media and Communications',
  },
  {
    value: 'military',
    label: 'Military',
  },
  {
    value: 'mining',
    label: 'Mining',
  },
  {
    value: 'learningDevelopmentSolutions',
    label: 'Learning and Development solutions',
  },
  {
    value: 'manufacturing',
    label: 'Manufacturing',
  },
  {
    value: 'primarySecondaryKEducation',
    label: 'Primary/Secondary (K-12) Education',
  },
  {
    value: 'publishing',
    label: 'Publishing',
  },
  {
    value: 'RealEstateRentalLeasing',
    label: 'Real Estate, Rental and Leasing',
  },
  {
    value: 'research',
    label: 'Research',
  },
  {
    value: 'religious',
    label: 'Religious',
  },
  {
    value: 'retail',
    label: 'Retail',
  },
  {
    value: 'scientificTechnicalServices',
    label: 'Scientific or Technical Services',
  },
  {
    value: 'software',
    label: 'Software',
  },
  {
    value: 'telecommunications',
    label: 'Telecommunications',
  },
  {
    value: 'transportationWarehousing',
    label: 'Transportation and Warehousing',
  },
  {
    value: 'utilities',
    label: 'Utilities',
  },
  {
    value: 'wholesale',
    label: 'Wholesale',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const fieldsOfExperience = [
  {
    value: 'finance',
    label: 'Finance',
    subfield: [
      { label: 'Auditing', value: 'auditing' },
      { label: 'Accounting', value: 'accounting' },
      { label: 'Costing', value: 'costing' },
      { label: 'Financial Analysis', value: 'financialAnalysis' },
      { label: 'Management Accounting', value: 'managementAccounting' },
      { label: 'Banking Solutions', value: 'bankingSolutions' },
      { label: 'Investment', value: 'investment' },
      { label: 'Credit Management', value: 'creditManagement' },
      { label: 'Insurance', value: 'insurance' },
      { label: 'Capital Management', value: 'capitalManagement' },
      { label: 'Risk Management', value: 'riskManagement' },
    ],
  },
  {
    value: 'humanResource',
    label: 'Human Resource',
    subfield: [
      { label: 'HR Strategic Planning', value: 'hRStrategicPlanning' },
      { label: 'Performance Management', value: 'performanceManagement' },
      { label: 'HR Analytics and Reporting', value: 'hRAnalyticsAndReporting' },
      { label: 'HR Data Science', value: 'hRDataScience' },
      {
        label: 'Compensations and Benefits',
        value: 'compensationsAndBenefits',
      },
      { label: 'HR Operations', value: 'hROperations' },
      { label: 'Career Management', value: 'careerManagement' },
      { label: 'Talent Management', value: 'talentManagement' },
      { label: 'Recruitment', value: 'recruitment' },
      { label: 'Learning and Development', value: 'learningAndDevelopment' },
      {
        label: 'Organization Design and Development',
        value: 'organizationDesignAndDevelopment',
      },
      { label: 'Organization Culture', value: 'organizationCulture' },
    ],
  },
  {
    value: 'marketingAndPR',
    label: 'Marketing and PR',
    subfield: [
      { label: 'Product Design', value: 'productDesign' },
      { label: 'Digital Marketing', value: 'digitalMarketing' },
      { label: 'Promotion and advertising', value: 'promotionAndAdvertising' },
      { label: 'Market Research', value: 'marketResearch' },
      {
        label: 'Corporate Social Responsibility',
        value: 'corporateSocialResponsibility',
      },
      { label: 'Press and Media Management', value: 'pressAndMediaManagement' },
    ],
  },
  {
    value: 'formalEducation',
    label: 'Formal Education',
    subfield: [
      { label: 'Curriculum Design', value: 'curriculumDesign' },
      { label: 'Teaching Techniques', value: 'teachingTechniques' },
      { label: 'Schools Management', value: 'schoolsManagement' },
      { label: 'Universities Management', value: 'universitiesManagement' },
    ],
  },
  {
    value: 'development',
    label: 'Development',
    subfield: [
      {
        label: 'Development Programs Design',
        value: 'developmentProgramsDesign',
      },
      {
        label: 'Development Programs Delivery',
        value: 'developmentProgramsDelivery',
      },
      { label: 'Coaching', value: 'coaching' },
    ],
  },
  {
    value: 'entrepreneurshipStartups',
    label: 'Entrepreneurship & Start ups',
    subfield: [
      { label: 'Strategy', value: 'strategy' },
      { label: 'Financial Modeling', value: 'financialModeling' },
      { label: 'Technology', value: 'technology' },
      { label: 'Market Studies', value: 'marketStudies' },
      { label: 'Lean Startup Methods', value: 'leanStartupMethods' },
      { label: 'Operations Management', value: 'operationsManagement' },
    ],
  },
  {
    value: 'strategy',
    label: 'Strategy',
    subfield: [
      { label: 'Strategic Planning', value: 'strategicPlanning' },
      { label: 'Strategy Execution', value: 'strategyExecution' },
      { label: 'Business Modeling', value: 'businessModeling' },
      { label: 'Organization Performance', value: 'organizationPerformance' },
      { label: 'Sustainability', value: 'sustainability' },
      { label: 'Business Planning', value: 'businessPlanning' },
    ],
  },
  {
    value: 'operationsManagement',
    label: 'Operations Management',
    subfield: [
      { label: 'Process Optimization', value: 'processOptimization' },
      { label: 'Quality Assurance', value: 'qualityAssurance' },
      { label: 'Operations Management', value: 'operationsManagement' },
      { label: 'Outsourcing', value: 'outsourcing' },
    ],
  },
  {
    value: 'supplyChain',
    label: 'Supply Chain',
    subfield: [
      { label: 'Procurement', value: 'procurement' },
      { label: 'Logistics', value: 'logistics' },
      { label: 'Warehouse Management', value: 'warehouseManagement' },
      { label: 'Fleets Management', value: 'fleetsManagement' },
      { label: 'Shipments', value: 'shipments' },
      { label: 'Channels', value: 'channels' },
    ],
  },
  {
    value: 'digitization',
    label: 'digitization',
    subfield: [
      { label: 'Automation', value: 'automation' },
      { label: 'Digital Strategy design', value: 'digitalStrategyDesign' },
      {
        label: 'Digital Strategy Execution',
        value: 'digitalStrategyExecution',
      },
      { label: 'ERP', value: 'eRP' },
      { label: 'Big Data', value: 'bigData' },
    ],
  },
  {
    value: 'salesAndCustomerCare',
    label: 'Sales and Customer Care',
    subfield: [
      { label: 'Whole sales', value: 'wholeSales' },
      { label: 'Retail', value: 'retail' },
      { label: 'Channels Management', value: 'channelsManagement' },
      { label: 'Stores Management', value: 'storesManagement' },
      { label: 'Customer Journey', value: 'customerJourney' },
      { label: 'Customer Care Strategies', value: 'customerCareStrategies' },
    ],
  },
  {
    value: 'legal',
    label: 'Legal',
    subfield: [
      { label: 'Corporates Law', value: 'corporatesLaw' },
      { label: 'Digital Law', value: 'digitalLaw' },
      { label: 'Employment Law', value: 'employmentLaw' },
      { label: 'Copy Rights', value: 'copyRights' },
      { label: 'Disputes Resolution', value: 'disputesResolution' },
      { label: 'Commercial Law', value: 'commercialLaw' },
      { label: 'Banking and Finance', value: 'bankingAndFinance' },
      { label: 'Mobile Money', value: 'mobileMoney' },
      { label: 'Integrity and Compliance', value: 'integrityAndCompliance' },
    ],
  },
  {
    value: 'finTech',
    label: 'finTech',
    subfield: [
      { label: 'Blockchain', value: 'blockchain' },
      { label: 'Payments (PayTech)', value: 'payments(PayTech)' },
      { label: 'Lending (LendTech)', value: 'lending(LendTech)' },
      { label: 'Regulatory (RegTeh)', value: 'regulatory(RegTeh)' },
      { label: 'Trading (TradTech)', value: 'trading(TradTech)' },
    ],
  },
  {
    value: 'environment',
    label: 'Environment',
    subfield: [
      { label: 'Renewable Energy', value: 'renewableEnergy' },
      { label: 'Waste', value: 'waste' },
      { label: 'Recycling', value: 'recycling' },
      {
        label: 'Environmental Risk Assessment',
        value: 'environmentalRiskAssessment',
      },
      { label: 'Urban Planning', value: 'urbanPlanning' },
    ],
  },
  {
    value: 'projectManagement',
    label: 'Project Management',
    subfield: [
      {
        label: 'Projects Design and planning',
        value: 'projectsDesignAndPlanning',
      },
      { label: 'Fundraising', value: 'fundraising' },
      { label: 'Teams Management', value: 'teamsManagement' },
    ],
  },
  {
    value: 'analytics',
    label: 'Analytics',
    subfield: [
      { label: 'Data Analysis', value: 'dataAnalysis' },
      { label: 'Market Trends', value: 'marketTrends' },
      { label: 'Big Data', value: 'bigData' },
    ],
  },
];

export {
  gender,
  employmentStatus,
  assignmentLanguage,
  assignmentTypes,
  assignmentLocations,
  industries,
  fieldsOfExperience,
};
