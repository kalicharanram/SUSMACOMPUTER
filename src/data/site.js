/**
 * ============================================================================
 *  POORI WEBSITE KA CONTENT — SIRF YAHAN
 *  ---------------------------------------------------------------------------
 *  Baaki har component is file ko padhta hai. Services add karni hain ya naam
 *  badalna hai to SIRF yahan edit karo, kuch aur nahi chhedna hai.
 *
 *  Icon ke liye `icon` field me lucide-react ka koi bhi icon ka naam daalo.
 *  Pastel colour ke liye `tone` field: blue | peach | pink | lav | mint | cream
 *
 *  NOTE: 22 services jo list hain woh DESIGN REFERENCE se 1:1 uthaaye gaye hain.
 *  Jahan spelling galat hai (jaise "Moerblig Itenn Sale") woh jaan-boojh kar
 *  waisa hi rakha gaya hai — aapne kaha tha kuch bhi change na karoon.
 *  Sahi karna ho to bas yahan text badal dijiye.
 * ============================================================================
 */

export const business = {
  name: 'SUSMA COMPUTER',
  nameAccent: '& VIDEO MIXING LAB',
  nameFull: 'Susma Computer & Video Mixing Lab',
  tagline: 'All Digital Solutions Under One Roof',
  // Design reference me ye line "All गमल Digital Solutions..." likhi hai.
  // Asli text yahan daalein — abhi reference wala hi rakha hai.
  taglineRaw: 'All गमल Digital Solutions Under One Roof',
};

/* ---------------------------------------------------------------- CONTACT -- */
export const contact = {
  city: 'Kadrabad, Bachhwara',
  district: 'Begusarai',
  state: 'Bihar',
  pin: '851112',

  // Asli number (was a placeholder in the design reference)
  phone1: '9534699946',
  phone2: '9534699946',

  email: 'susmacomputerr@gmail.com',
  // Custom domain, connected to GitHub Pages.
  // If DNS ever stops resolving, the GitHub Pages URL is the fallback:
  //   https://kalicharanram.github.io/SUSMACOMPUTER/
  website: 'susmacomputer.in',
  websiteHref: 'https://susmacomputer.in',
  websiteNote: '',

  hoursToday: '9:00 AM - 8:00 PM',
  openLabel: 'Open Now',

  mapsUrl: 'https://maps.app.goo.gl/',
  // wa.me needs the number in international form, no + or spaces
  whatsapp: 'https://wa.me/919534699946',
};

/* ------------------------------------------------------------------- HERO -- */
export const hero = {
  badge: 'Your Local Digital Solution Center',
  title1: 'SUSMA COMPUTER',
  title2: '& VIDEO MIXING LAB',
  subtitleHindi: 'कंप्यूटर से लेकर वीडियो तक, सभी सेवाएँ एक ही जगह',
  ticks: ['Trusted Service', 'Affordable Price', 'Fast Support'],
};

/* --------------------------------------------------------------- SERVICES -- */
/**
 * 22 services — design reference ke order me, 1:1.
 *
 * ✏️ IMAGES: `img` field apni photo ka naam hai (folder: public/images/services/).
 *    Filename wahi rakhna hai jo script ne banaya tha — `npm run services`
 *    har file ko sahi size me convert karke isi naam se wapas likhta hai.
 *    File na ho to card pe halka grey placeholder aa jayega.
 *
 * Naya service add karna ho: neeche ek line copy-paste kar do.
 */
export const services = [
  { id: 1, label: 'Computer Job Work', img: '01-computer-job-work.jpg', tone: 'blue' },
  { id: 2, label: 'Online Form Filling', img: '02-online-form-filling.jpg', tone: 'peach' },
  { id: 3, label: 'Videography Services', img: '03-videography.jpg', tone: 'pink' },
  { id: 4, label: 'Photography Services', img: '04-photography.jpg', tone: 'lav' },
  { id: 5, label: 'Video Mixing & Editing', img: '05-video-mixing.jpg', tone: 'mint' },
  { id: 6, label: 'Computer Assemble', img: '06-computer-assemble.jpg', tone: 'lav' },
  { id: 7, label: 'Computer Accessories', img: '07-computer-accessories.jpg', tone: 'pink' },
  { id: 8, label: 'Mobile Accessories', img: '08-mobile-accessories.jpg', tone: 'blue' },
  { id: 9, label: 'House Hold Item Sale', img: '09-household-items.jpg', tone: 'pink' },
  { id: 11, label: 'Mobile Recharge', img: '11-mobile-recharge.jpg', tone: 'mint' },
  { id: 12, label: 'Website Designing', img: '12-website-designing.jpg', tone: 'blue' },
  { id: 13, label: 'YouTube Channel Setup', img: '13-youtube-setup.jpg', tone: 'pink' },
  { id: 14, label: 'Poster Design', img: '14-poster-design.jpg', tone: 'blue' },
  { id: 15, label: 'ITR & GST Filing', img: '15-itr-gst-filing.jpg', tone: 'cream' },
  { id: 16, label: 'School & Other ID Card', img: '16-id-card.jpg', tone: 'pink' },
  { id: 17, label: 'Rubber Stamp Making', img: '17-rubber-stamp.jpg', tone: 'mint' },
  { id: 18, label: 'Digital Seva Kendra', img: '18-digital-seva-kendra.jpg', tone: 'blue' },
  { id: 19, label: 'Digital Busva Profile Setup', img: '19-digital-profile.jpg', tone: 'lav' },
  { id: 20, label: 'Google Business Profile Setup', img: '20-google-business.jpg', tone: 'mint' },
  { id: 21, label: 'Advertising Photo & Video', img: '21-advertising.jpg', tone: 'cream' },
  { id: 22, label: 'All Services', img: '22-all-services.jpg', tone: 'lav' },
];

/* --------------------------------------------------------------- WHY US --- */
export const whyUs = {
  heading: 'Why Choose Us?',
  items: [
    { title: 'Local Trusted Shop', sub: 'in Kadrabad', icon: 'BadgeCheck' },
    { title: 'Experienced Team', sub: '', icon: 'Users' },
    { title: 'All Services', sub: 'Under One Roof', icon: 'House' },
    { title: 'Fast & Reliable Service', sub: '', icon: 'Gauge' },
    { title: 'Customer Support', sub: '', icon: 'Headset' },
    { title: 'Affordable Price', sub: '& Best Quality', icon: 'Medal' },
  ],
};

/* --------------------------------------------------------------- GALLERY -- */
/**
 * Reference image ke 3 gallery photos. Abhi PLACEHOLDER use ho rahe hain —
 * apni dukaan ki asli photos bhej dijiye, main yahan laga dunga.
 */
export const gallery = [
  { src: './images/gallery-1.jpg', label: 'Our Shop' },
  { src: './images/gallery-2.jpg', label: 'Video Mixing Setup' },
  { src: './images/gallery-3.jpg', label: 'Store Interior' },
];

/* ---------------------------------------------------------------- REVIEWS -- */
export const reviews = [
  {
    name: 'Ramesh Kumar',
    text: 'बहुत अच्छा काम होता है, ऑनलाइन काम से लेकर फोटो-वीडियो सहज रूप से किया जाता है। मैं खुश हूँ।',
  },
  {
    name: 'Abhishek Anand',
    text: 'Computer ka kaam bahut accha aur jaldi hota hai. Video editing bhi same quality ki milti hai.',
  },
  {
    name: 'Manish Kumar',
    text: 'Yahan online form filling aur ITR filing dono ho gaya. Staff bahut helpful hai.',
  },
];

/* ------------------------------------------------------------------- NAV --- */
export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  {
    label: 'Services',
    href: '#services',
    children: [
      'Computer Job Work',
      'Computer Assemble',
      'Videography Services',
      'Video Mixing & Editing',
      'Website Designing',
      'ITR & GST Filing',
    ],
  },
  {
    label: 'Gallery',
    href: '#gallery',
    children: ['Our Shop', 'Video Mixing Setup', 'Store Interior'],
  },
  { label: 'Price List', href: '#services' },
  { label: 'Blog', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];