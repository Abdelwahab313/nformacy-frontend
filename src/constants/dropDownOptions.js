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

export {
  gender,
  employmentStatus,
  assignmentLanguage,
  assignmentTypes,
  assignmentLocations,
  industries,
};
