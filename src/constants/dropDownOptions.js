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
    { 'value': 'ar', 'label': 'Arabic' },
    { 'value': 'en', 'label': 'English' },
    { 'value': 'fr', 'label': 'French' },
    { 'value': 'de', 'label': 'German' },
    { 'value': 'hi', 'label': 'Hindi' },
    { 'value': 'ru', 'label': 'Russian' },
    { 'value': 'es', 'label': 'Spanish; Castilian' },
    { 'value': 'ab', 'label': 'Abkhaz' },
    { 'value': 'aa', 'label': 'Afar' },
    { 'value': 'af', 'label': 'Afrikaans' },
    { 'value': 'ak', 'label': 'Akan' },
    { 'value': 'sq', 'label': 'Albanian' },
    { 'value': 'am', 'label': 'Amharic' },
    { 'value': 'an', 'label': 'Aragonese' },
    { 'value': 'hy', 'label': 'Armenian' },
    { 'value': 'as', 'label': 'Assamese' },
    { 'value': 'av', 'label': 'Avaric' },
    { 'value': 'ae', 'label': 'Avestan' },
    { 'value': 'ay', 'label': 'Aymara' },
    { 'value': 'az', 'label': 'Azerbaijani' },
    { 'value': 'bm', 'label': 'Bambara' },
    { 'value': 'ba', 'label': 'Bashkir' },
    { 'value': 'eu', 'label': 'Basque' },
    { 'value': 'be', 'label': 'Belarusian' },
    { 'value': 'bn', 'label': 'Bengali' },
    { 'value': 'bh', 'label': 'Bihari' },
    { 'value': 'bi', 'label': 'Bislama' },
    { 'value': 'bs', 'label': 'Bosnian' },
    { 'value': 'br', 'label': 'Breton' },
    { 'value': 'bg', 'label': 'Bulgarian' },
    { 'value': 'my', 'label': 'Burmese' },
    { 'value': 'ca', 'label': 'Catalan; Valencian' },
    { 'value': 'ch', 'label': 'Chamorro' },
    { 'value': 'ce', 'label': 'Chechen' },
    { 'value': 'ny', 'label': 'Chichewa; Chewa; Nyanja' },
    { 'value': 'zh', 'label': 'Chinese' },
    { 'value': 'cv', 'label': 'Chuvash' },
    { 'value': 'kw', 'label': 'Cornish' },
    { 'value': 'co', 'label': 'Corsican' },
    { 'value': 'cr', 'label': 'Cree' },
    { 'value': 'hr', 'label': 'Croatian' },
    { 'value': 'cs', 'label': 'Czech' },
    { 'value': 'da', 'label': 'Danish' },
    { 'value': 'dv', 'label': 'Divehi; Dhivehi; Maldivian;' },
    { 'value': 'nl', 'label': 'Dutch' },
    { 'value': 'eo', 'label': 'Esperanto' },
    { 'value': 'et', 'label': 'Estonian' },
    { 'value': 'ee', 'label': 'Ewe' },
    { 'value': 'fo', 'label': 'Faroese' },
    { 'value': 'fj', 'label': 'Fijian' },
    { 'value': 'fi', 'label': 'Finnish' },
    { 'value': 'ff', 'label': 'Fula; Fulah; Pulaar; Pular' },
    { 'value': 'gl', 'label': 'Galician' },
    { 'value': 'ka', 'label': 'Georgian' },
    { 'value': 'el', 'label': 'Greek, Modern' },
    { 'value': 'gn', 'label': 'Guaraní' },
    { 'value': 'gu', 'label': 'Gujarati' },
    { 'value': 'ht', 'label': 'Haitian; Haitian Creole' },
    { 'value': 'ha', 'label': 'Hausa' },
    { 'value': 'he', 'label': 'Hebrew' },
    { 'value': 'iw', 'label': 'Hebrew' },
    { 'value': 'hz', 'label': 'Herero' },
    { 'value': 'ho', 'label': 'Hiri Motu' },
    { 'value': 'hu', 'label': 'Hungarian' },
    { 'value': 'ia', 'label': 'Interlingua' },
    { 'value': 'id', 'label': 'Indonesian' },
    { 'value': 'ie', 'label': 'Interlingue' },
    { 'value': 'ga', 'label': 'Irish' },
    { 'value': 'ig', 'label': 'Igbo' },
    { 'value': 'ik', 'label': 'Inupiaq' },
    { 'value': 'io', 'label': 'Ido' },
    { 'value': 'is', 'label': 'Icelandic' },
    { 'value': 'it', 'label': 'Italian' },
    { 'value': 'iu', 'label': 'Inuktitut' },
    { 'value': 'ja', 'label': 'Japanese' },
    { 'value': 'jv', 'label': 'Javanese' },
    { 'value': 'kl', 'label': 'Kalaallisut, Greenlandic' },
    { 'value': 'kn', 'label': 'Kannada' },
    { 'value': 'kr', 'label': 'Kanuri' },
    { 'value': 'ks', 'label': 'Kashmiri' },
    { 'value': 'kk', 'label': 'Kazakh' },
    { 'value': 'km', 'label': 'Khmer' },
    { 'value': 'ki', 'label': 'Kikuyu, Gikuyu' },
    { 'value': 'rw', 'label': 'Kinyarwanda' },
    { 'value': 'ky', 'label': 'Kirghiz, Kyrgyz' },
    { 'value': 'kv', 'label': 'Komi' },
    { 'value': 'kg', 'label': 'Kongo' },
    { 'value': 'ko', 'label': 'Korean' },
    { 'value': 'ku', 'label': 'Kurdish' },
    { 'value': 'kj', 'label': 'Kwanyama, Kuanyama' },
    { 'value': 'la', 'label': 'Latin' },
    { 'value': 'lb', 'label': 'Luxembourgish, Letzeburgesch' },
    { 'value': 'lg', 'label': 'Luganda' },
    { 'value': 'li', 'label': 'Limburgish, Limburgan, Limburger' },
    { 'value': 'ln', 'label': 'Lingala' },
    { 'value': 'lo', 'label': 'Lao' },
    { 'value': 'lt', 'label': 'Lithuanian' },
    { 'value': 'lu', 'label': 'Luba-Katanga' },
    { 'value': 'lv', 'label': 'Latvian' },
    { 'value': 'gv', 'label': 'Manx' },
    { 'value': 'mk', 'label': 'Macedonian' },
    { 'value': 'mg', 'label': 'Malagasy' },
    { 'value': 'ms', 'label': 'Malay' },
    { 'value': 'ml', 'label': 'Malayalam' },
    { 'value': 'mt', 'label': 'Maltese' },
    { 'value': 'mi', 'label': 'Māori' },
    { 'value': 'mr', 'label': 'Marathi (Marāṭhī)' },
    { 'value': 'mh', 'label': 'Marshallese' },
    { 'value': 'mn', 'label': 'Mongolian' },
    { 'value': 'na', 'label': 'Nauru' },
    { 'value': 'nv', 'label': 'Navajo, Navaho' },
    { 'value': 'nb', 'label': 'Norwegian Bokmål' },
    { 'value': 'nd', 'label': 'North Ndebele' },
    { 'value': 'ne', 'label': 'Nepali' },
    { 'value': 'ng', 'label': 'Ndonga' },
    { 'value': 'nn', 'label': 'Norwegian Nynorsk' },
    { 'value': 'no', 'label': 'Norwegian' },
    { 'value': 'ii', 'label': 'Nuosu' },
    { 'value': 'nr', 'label': 'South Ndebele' },
    { 'value': 'oc', 'label': 'Occitan' },
    { 'value': 'oj', 'label': 'Ojibwe, Ojibwa' },
    {
      'value': 'cu',
      'label': 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic',
    },
    { 'value': 'om', 'label': 'Oromo' },
    { 'value': 'or', 'label': 'Oriya' },
    { 'value': 'os', 'label': 'Ossetian, Ossetic' },
    { 'value': 'pa', 'label': 'Panjabi, Punjabi' },
    { 'value': 'pi', 'label': 'Pāli' },
    { 'value': 'fa', 'label': 'Persian' },
    { 'value': 'pl', 'label': 'Polish' },
    { 'value': 'ps', 'label': 'Pashto, Pushto' },
    { 'value': 'pt', 'label': 'Portuguese' },
    { 'value': 'qu', 'label': 'Quechua' },
    { 'value': 'rm', 'label': 'Romansh' },
    { 'value': 'rn', 'label': 'Kirundi' },
    { 'value': 'ro', 'label': 'Romanian, Moldavian, Moldovan' },
    { 'value': 'sa', 'label': 'Sanskrit (Saṁskṛta)' },
    { 'value': 'sc', 'label': 'Sardinian' },
    { 'value': 'sd', 'label': 'Sindhi' },
    { 'value': 'se', 'label': 'Northern Sami' },
    { 'value': 'sm', 'label': 'Samoan' },
    { 'value': 'sg', 'label': 'Sango' },
    { 'value': 'sr', 'label': 'Serbian' },
    { 'value': 'gd', 'label': 'Scottish Gaelic; Gaelic' },
    { 'value': 'sn', 'label': 'Shona' },
    { 'value': 'si', 'label': 'Sinhala, Sinhalese' },
    { 'value': 'sk', 'label': 'Slovak' },
    { 'value': 'sl', 'label': 'Slovene' },
    { 'value': 'so', 'label': 'Somali' },
    { 'value': 'st', 'label': 'Southern Sotho' },
    { 'value': 'su', 'label': 'Sundanese' },
    { 'value': 'sw', 'label': 'Swahili' },
    { 'value': 'ss', 'label': 'Swati' },
    { 'value': 'sv', 'label': 'Swedish' },
    { 'value': 'ta', 'label': 'Tamil' },
    { 'value': 'te', 'label': 'Telugu' },
    { 'value': 'tg', 'label': 'Tajik' },
    { 'value': 'th', 'label': 'Thai' },
    { 'value': 'ti', 'label': 'Tigrinya' },
    { 'value': 'bo', 'label': 'Tibetan Standard, Tibetan, Central' },
    { 'value': 'tk', 'label': 'Turkmen' },
    { 'value': 'tl', 'label': 'Tagalog' },
    { 'value': 'tn', 'label': 'Tswana' },
    { 'value': 'to', 'label': 'Tonga (Tonga Islands)' },
    { 'value': 'tr', 'label': 'Turkish' },
    { 'value': 'ts', 'label': 'Tsonga' },
    { 'value': 'tt', 'label': 'Tatar' },
    { 'value': 'tw', 'label': 'Twi' },
    { 'value': 'ty', 'label': 'Tahitian' },
    { 'value': 'ug', 'label': 'Uighur, Uyghur' },
    { 'value': 'uk', 'label': 'Ukrainian' },
    { 'value': 'ur', 'label': 'Urdu' },
    { 'value': 'uz', 'label': 'Uzbek' },
    { 'value': 've', 'label': 'Venda' },
    { 'value': 'vi', 'label': 'Vietnamese' },
    { 'value': 'vo', 'label': 'Volapük' },
    { 'value': 'wa', 'label': 'Walloon' },
    { 'value': 'cy', 'label': 'Welsh' },
    { 'value': 'wo', 'label': 'Wolof' },
    { 'value': 'fy', 'label': 'Western Frisian' },
    { 'value': 'xh', 'label': 'Xhosa' },
    { 'value': 'yi', 'label': 'Yiddish' },
    { 'value': 'yo', 'label': 'Yoruba' },
    { 'value': 'za', 'label': 'Zhuang, Chuang' },
  ]
;

const assignmentTypes = [
  { value: 'lessThanOneMonth', label: 'Less than 1 month duration' },
  { value: 'moreThanOneMonth', label: 'More than 1 month duration' },
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
    label: 'Learning and Development Solutions',
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
];

const fieldsOfExperience = [
  {
    value: 'finance',
    label: 'Finance',
    subfields: [
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
    subfields: [
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
    subfields: [
      { label: 'Product Design', value: 'productDesign' },
      { label: 'Digital Marketing', value: 'digitalMarketing' },
      { label: 'Promotion and Advertising', value: 'promotionAndAdvertising' },
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
    subfields: [
      { label: 'Curriculum Design', value: 'curriculumDesign' },
      { label: 'Teaching Techniques', value: 'teachingTechniques' },
      { label: 'Schools Management', value: 'schoolsManagement' },
      { label: 'Universities Management', value: 'universitiesManagement' },
    ],
  },
  {
    value: 'development',
    label: 'Development',
    subfields: [
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
    subfields: [
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
    subfields: [
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
    subfields: [
      { label: 'Process Optimization', value: 'processOptimization' },
      { label: 'Quality Assurance', value: 'qualityAssurance' },
      { label: 'Operations Management', value: 'operationsManagement' },
      { label: 'Outsourcing', value: 'outsourcing' },
    ],
  },
  {
    value: 'supplyChain',
    label: 'Supply Chain',
    subfields: [
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
    subfields: [
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
    subfields: [
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
    subfields: [
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
    subfields: [
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
    subfields: [
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
    subfields: [
      {
        label: 'Projects Design and Planning',
        value: 'projectsDesignAndPlanning',
      },
      { label: 'Fundraising', value: 'fundraising' },
      { label: 'Teams Management', value: 'teamsManagement' },
    ],
  },
  {
    value: 'analytics',
    label: 'Analytics',
    subfields: [
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
  industries,
  fieldsOfExperience,
};
