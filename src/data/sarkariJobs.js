/**
 * ============================================================================
 *  SARKARI JOB UPDATES — CONTENT (sirf yahan)
 *  ---------------------------------------------------------------------------
 *  Is page ka poora data yahan hai. Nayi job / link add karni ho to sirf
 *  is file me edit karo, component nahi chhedna.
 *
 *  Har item: { text, url }  — url "#" rakho jab tak asli link na mile.
 *  url par click karne par wahi link khulega; "#" se visitor page ke top par
 *  chala jata hai (isliye khali "#" ke bajaye site ke official portal ka link
 *  bhi daal sakte ho).
 *
 *  `tone` sirf top buttons ke colour ke liye hai (Tailwind background class).
 * ============================================================================
 */

/** Top coloured buttons — 8 sabse important live forms. */
export const sarkariTop = [
  { text: 'BPSC School Teacher Form (33,320 Posts)', url: '#', tone: '#dc2626' },
  { text: 'Daily 5 Minutes Meditation & Crack Exams', url: '#', tone: '#ea580c' },
  { text: 'RRB NTPC Graduate Level Form (3548 Posts)', url: '#', tone: '#d81b60' },
  { text: 'Rajasthan Safai Karmchari (24,752 Posts)', url: '#', tone: '#1565c0' },
  { text: 'UPESSC Assistant Teacher Form (12405 Posts)', url: '#', tone: '#8a8a00' },
  { text: 'UPSSC Inter Level Form (1784 Posts)', url: '#', tone: '#16327a' },
  { text: 'RRB NTPC UG Level Form (1688 Posts)', url: '#', tone: '#a01818' },
  { text: 'UP Anganwadi Bharti Online Form', url: '#', tone: '#2e7d32' },
];

/**
 * Category boxes — image ke order me.
 * Har box: { title, items: [ { text, url } ] }
 */
export const sarkariCategories = [
  {
    title: 'Results',
    items: [
      { text: 'UPSC CDS-II Result 2026 – Out', url: '#' },
      { text: 'HPSC HCS Final Result 2026', url: '#' },
      { text: 'UPSC Geo Scientist Final Result 2026', url: '#' },
      { text: 'RRB Section Controller Answer Key 2026 – Out', url: '#' },
    ],
  },
  {
    title: 'Admit Cards',
    items: [
      { text: 'UPSSSC PET Admit Card 2026', url: '#' },
      { text: 'MPPSC ADPO Admit Card 2026', url: '#' },
      { text: 'BSF HC RO / RM Admit Card 2026', url: '#' },
      { text: 'RRB ALP CBAT Exam City Details', url: '#' },
    ],
  },
  {
    title: 'Latest Jobs',
    items: [
      { text: 'Indian Army Dental Corps Online Form 2026 – Last Date Today', url: '#' },
      { text: 'RRB NTPC 10+2 UG Online Form 2026 (1688 Posts)', url: '#' },
      { text: 'BPSC School Teacher TRE 4.0 Online Form', url: '#' },
    ],
  },
  {
    title: 'Answer Key',
    items: [
      { text: 'RRB Section Controller Answer Key 2026 – Out', url: '#' },
      { text: 'Railway RRB Technician Answer Key 2026 – Out', url: '#' },
      { text: 'Bihar BPSC APO Final Answer Key 2026', url: '#' },
      { text: 'SSC Selection Phase 14 Answer Key 2026 – Out', url: '#' },
      { text: 'MPESB Group-2 Sub Group-4 Patwari Answer Key 2026', url: '#' },
      { text: 'Rajasthan State Eligibility Test SET Answer Key 2026', url: '#' },
      { text: 'Uttarakhand TET Answer Key 2026 – Out', url: '#' },
      { text: 'NFBMS Group A, B & C Various Post', url: '#' },
    ],
  },
  {
    title: 'Documents',
    items: [
      { text: 'NIELIT CCC Online Form, Admit Card, Result 2026', url: '#' },
      { text: 'UP Scholarship Online Form 2026-27', url: '#' },
      { text: 'Rajasthan Uttar Matric Scholarship 2026', url: '#' },
      { text: 'Aadhar Card Download, Correction, Status 2026', url: '#' },
      { text: 'PAN Card Registration, Correction & Other Service 2026', url: '#' },
      { text: 'UP Income, Cast, Residential Certificate Online Verification 2026', url: '#' },
      { text: 'Bihar Income, Cast, Residential Certificate Online Apply & Verification 2026', url: '#' },
      { text: 'Voter ID Registration & Other Voter', url: '#' },
    ],
  },
  {
    title: 'Admission',
    items: [
      { text: 'Bihar Library Eligibility Test BLET Online Form 2026 – Date Extend', url: '#' },
      { text: 'AIBE 22th Online Form 2026', url: '#' },
      { text: 'CLAT Online Form 2026', url: '#' },
      { text: 'NTA NIFTEE Online Form 2027', url: '#' },
      { text: 'NTA UGC NET JRF December Online Form 2026', url: '#' },
      { text: 'NTA CSIR UGC NET December Online Form 2026', url: '#' },
      { text: 'NTA SWAYAM Online Form 2026', url: '#' },
      { text: 'Bihar BSEB DELED Spot Admission 2025-27', url: '#' },
      { text: 'BCECE Mop-Up Revised Counselling Schedule 2025', url: '#' },
    ],
  },
  {
    title: '10th/ITI Jobs',
    items: [
      { text: 'RRB NTPC 10+2 UG Online Form 2026 (1688 Posts)', url: '#' },
      { text: 'UPSSSC Inter (12th) Level Online Form 2026', url: '#' },
      { text: 'UKSSSC Group C Scaler Online Form 2026 – Last Date Today', url: '#' },
      { text: 'Rajasthan Safai Karmchari Online Form 2026 (24,752 posts)', url: '#' },
      { text: 'Railway RRC NWR Apprentice Online Form 2026', url: '#' },
      { text: 'MPESB MP Police Constable Driver Online Form 2026', url: '#' },
      { text: 'UPSSC Junior Engineer JE (Electrical) Online Form 2026', url: '#' },
      { text: 'UPSSC Junior Engineer JE (Mechanical) Online Form 2026 (1156 Posts)', url: '#' },
      { text: 'MPESB Group 3 Sub Engineer & Other Post Online Form 2026', url: '#' },
    ],
  },
  {
    title: 'Outsourcing Jobs',
    items: [
      { text: 'UP Hapur ECCE Educator Online Form 2026', url: '#' },
      { text: 'UP Jhansi ECCE Educator Online Form 2026', url: '#' },
      { text: 'UP Mathura ECCE Educator Online Form 2026', url: '#' },
      { text: 'UP Shahjahanpur ECCE Educator Online Form 2026', url: '#' },
      { text: 'UP Ayodhya ECCE Educator Online Form 2026', url: '#' },
      { text: 'UP Mathura ECCE Educator Online Form 2026', url: '#' },
      { text: 'UP Rampur ECCE Educator Online Form 2026', url: '#' },
      { text: 'UP Ghaziabad ECCE Educator Online Form 2026', url: '#' },
      { text: 'UP Basic Shiksha Vibhag Computer Operator Online Form 2026', url: '#' },
      { text: 'UP Basic Shiksha Vibhag Assistant Online Form 2026', url: '#' },
    ],
  },
  {
    title: 'Syllabus',
    items: [
      { text: 'RRB NTPC 10+2 UG Online Form 2026 (1688 Posts)', url: '#' },
      { text: 'BPSC School Teacher TRE 4.0 Online Form 2026 (33,320 Posts)', url: '#' },
      { text: 'RRB NTPC Graduate Level Online Form 2026 (3548 Posts)', url: '#' },
      { text: 'UPESSC PRT Assistant Teacher Online Form 2026 (12405 Posts)', url: '#' },
      { text: 'Bihar STET Admit Card 2026', url: '#' },
      { text: 'RRB Junior Engineer JE Exam City Details 2026', url: '#' },
      { text: 'AAI Junior Executive & Manager Admit Card 2026', url: '#' },
      { text: 'NIELIT CCC Online Form, Admit Card, Result 2026', url: '#' },
      { text: 'ISRO ICRB Scientist / Engineer New Exam Date 2026', url: '#' },
      { text: 'SSC CHSL 10+2 Online Form 2026 (2536 Posts)', url: '#' },
    ],
  },
];

/** Page ka base hash-route — App.jsx isi se page pehchanta hai. */
export const sarkariBase = '#/sarkari-jobs';
