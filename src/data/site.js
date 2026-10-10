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
  /* Address.
     `full` is the single line used in the top bar and the hero card, so the
     wording can never drift between those two. The footer breaks the same
     parts across separate lines. */
  street: 'Kadrabad, Pull Ke Pass, Near Masjid',
  town: 'Bachhwara',
  district: 'Begusarai',
  state: 'Bihar',
  pin: '851111',

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

  /* Google Maps link for the shop's location — the owner's own listing, shared
     from their phone. It resolves to "Susma Computer & Video Mixing Lab" at
     25.579741, 85.946581, about 4.7 km east of Bachhwara town centre and inside
     the Kadrabad area. The listing carries a place id and a CID, so Maps opens
     the shop by name rather than dropping a bare pin, which is why a short
     maps.app.goo.gl link is used instead of a /maps/dir/ URL — the dir/ form has
     to guess the shop from address text and opens whatever name matched first.
     Read by BOTH the hero's "Get Direction" button and the location square in
     the top bar (see `socials.maps`), so changing this one line moves the pin
     everywhere at once. Swap it for a new short link if the shop ever moves. */
  mapsUrl: 'https://maps.app.goo.gl/7gcz5sgknpWjqhbA6',
  // wa.me needs the number in international form, no + or spaces
  whatsapp: 'https://wa.me/919534699946',
};

/* ---------------------------------------------------------- VISIT COUNTER -- */
/**
 * Visitor counter for the centre of the footer.
 *
 * `backend: 'local'` keeps the number in this browser's own storage. It works
 * straight away with no account, no server and no cost, but it can only ever
 * count visits made on this one device — so it is a rough figure, not a traffic
 * report.
 *
 * Switching to `backend: 'firebase'` gives a real, shared count across every
 * visitor. It needs the `kadrabadmarts` Firebase project on the Blaze plan
 * (Realtime Database creation is refused on the free Spark plan) and a database
 * instance whose rules allow reads and writes at `/susma/visits`. Change this one
 * line once those exist; no component code needs touching.
 */
export const visitCounter = {
  enabled: true,
  backend: 'local',

  // -- local backend
  storeKey: 'susma:visits',

  // -- firebase backend
  dbUrl: 'https://kadrabadmarts-default-rtdb.asia-southeast1.firebasedatabase.app',

  // Marks that this tab has already been counted, so pressing F5 is not a new
  // visit. Applies to both backends.
  sessionKey: 'susma:counted',
};

/* Social profile links for the coloured squares in the top bar.
   Keys must match `SOCIALS` in components/Icons.jsx. A key set to `null` is not
   drawn as a link at all, so the square cannot be clicked and bounce the visitor
   to the top of the page — which is what a bare `href="#"` does. */
export const socials = {
  youtube: 'http://www.youtube.com/@susmacomputer',
  facebook: 'https://www.facebook.com/profile.php?id=61595040813380',
  instagram: 'https://www.instagram.com/susmacomputer?stkn=MTZoY3ZqcGZvNHFsMA==',
  // The green square is the location mark rather than a social profile, so it
  // points at the same pin the hero's "Get Direction" button uses. Reading it
  // from `contact.mapsUrl` keeps the two from drifting apart if the shop moves.
  maps: contact.mapsUrl,
};

/** One-line form of the address, built from the parts above. */
export const addressFull = `${contact.street}, ${contact.town}, ${contact.district}, ${contact.state} - ${contact.pin}`;

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
  // Replaces "Computer Assemble" and "Computer Accessories". It reuses the
  // assemble artwork, which was the closest fit already on disk and is no longer
  // spoken for; point `img` at a different file if a proper photo arrives.
  { id: 23, label: 'Computer Work', img: '06-computer-assemble.jpg', tone: 'lav' },
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
  { id: 20, label: 'Google Business Profile Setup', img: '20-google-business.jpg', tone: 'mint' },
  { id: 21, label: 'Advertising Photo & Video', img: '21-advertising.jpg', tone: 'cream' },
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
  { src: './images/gallery/1.jpg', label: '1' },
  { src: './images/gallery/data-entry.jpg', label: 'DATA ENTRY' },
  { src: './images/gallery/gst.jpg', label: 'GST' },
  { src: './images/gallery/itr.jpg', label: 'ITR' },
  { src: './images/gallery/job-work.jpg', label: 'JOB WORK' },
  { src: './images/gallery/mixing.jpg', label: 'Mixing' },
  { src: './images/gallery/pasport-photo.jpg', label: 'Pasport PHOTO' },
  { src: './images/gallery/pen.jpg', label: 'PEN' },
  { src: './images/gallery/photo-albumb.jpg', label: 'PHOTO Albumb' },
  { src: './images/gallery/photo.jpg', label: 'PHOTO' },
  { src: './images/gallery/udhog-adhar.jpg', label: 'UDHOG ADHAR' },
  { src: './images/gallery/video.jpg', label: 'VIDEO' },
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
    /* Built from the `services` list rather than written out by hand.
       A second hand-kept copy of these names is exactly how a menu ends up
       showing "Computer Assemble" twice while the strip shows it once, so the
       menu is derived instead. `new Set` also collapses any repeat, making a
       duplicate entry impossible even if the services list grows one. */
    children: [...new Set(services.map((s) => s.label))],
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