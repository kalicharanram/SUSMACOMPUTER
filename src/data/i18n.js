/* ------------------------------------------------------------------ LANGS -- */
/**
 * Language options for the switcher in the top bar.
 *
 * `dir` is written onto <html> when a language is chosen: Urdu is right-to-left
 * and needs the whole document flipped, not just the text.
 */
export const LANGS = [
  // A distinct colour per language so the three read as separate choices at a
  // glance on the dark top bar, where three identical pills were easy to miss.
  // Blue / saffron / green also line up with how each is usually recognised.
  { code: 'en', label: 'ENGLISH', color: '#1B6DD6' },
  { code: 'hi', label: 'HINDI', color: '#F5820F', dir: 'ltr' },
  { code: 'ur', label: 'URDU', color: '#12A150', dir: 'rtl' },
];

/* ----------------------------------------------------------- TRANSLATIONS -- */
/**
 * Hindi and Urdu text, keyed by the English string it replaces.
 *
 * Keying on the source string rather than on an id means a component just wraps
 * its text in `t('...')` and the English copy stays in site.js, where it can
 * still be edited without touching this file. Anything with no entry here falls
 * back to the English original, so a missing translation degrades to readable
 * English instead of an empty gap.
 *
 * Deliberately NOT translated: the shop's own name and the web address
 * (susmacomputer.in), phone numbers, email, PIN, and the service acronyms GST /
 * ITR / PEN — those are how people search for and recognise them.
 */
export const translations = {
  /* ============================================================ HINDI ==== */
  hi: {
    // ---- shop identity
    'All Digital Solutions Under One Roof':
      'सभी डिजिटल समाधान एक ही जगह',

    // ---- contact
    '9:00 AM - 8:00 PM': 'सुबह 9:00 - रात 8:00',
    'Open Now': 'अभी खुला है',
    'Kadrabad, Pull Ke Pass, Near Masjid': 'कद्राबाद, पुल के पास, मस्जिद के निकट',

    // ---- hero
    'Your Local Digital Solution Center': 'आपका स्थानीय डिजिटल समाधान केंद्र',
    'Trusted Service': 'विश्वसनीय सेवा',
    'Affordable Price': 'किफायती दाम',
    'Fast Support': 'तेज़ सहायता',
    'Call Now': 'अभी कॉल करें',
    'WhatsApp': 'व्हाट्सएप',
    'Get Direction': 'दिशा देखें',

    // ---- services (19)
    'Computer Job Work': 'कंप्यूटर जॉब वर्क',
    'Computer Work': 'कंप्यूटर का काम',
    'Videography Services': 'वीडियोग्राफी सेवाएँ',
    'Computer Assemble': 'कंप्यूटर असेंबल',
    'Computer Accessories': 'कंप्यूटर एक्सेसरीज़',
    'YouTube Channel Setup': 'यूट्यूब चैनल सेटअप',
    'School & Other ID Card': 'स्कूल और अन्य पहचान पत्र',
    'Rubber Stamp Making': 'रबर स्टैंप बनाना',

    // ---- why choose us
    'Why Choose Us?': 'हमें क्यों चुनें?',
    'Local Trusted Shop': 'स्थानीय भरोसेमंद दुकान',
    'in Kadrabad': 'कद्राबाद में',
    'Experienced Team': 'अनुभवी टीम',
    'All Services': 'सभी सेवाएँ',
    'Under One Roof': 'एक ही जगह',
    'Fast & Reliable Service': 'तेज़ और भरोसेमंद सेवा',
    'Customer Support': 'ग्राहक सहायता',
    '& Best Quality': 'और बेहतरीन गुणवत्ता',

    // ---- menu
    Home: 'होम',
    'About Us': 'हमारे बारे में',
    Services: 'सेवाएँ',
    Gallery: 'गैलरी',
    'Price List': 'मूल्य सूची',
    Blog: 'ब्लॉग',
    Contact: 'संपर्क',

    // ---- gallery photo captions
    'DATA ENTRY': 'डेटा एंट्री',
    'JOB WORK': 'जॉब वर्क',
    Mixing: 'मिक्सिंग',
    'Pasport PHOTO': 'पासपोर्ट फोटो',
    PEN: 'पेन',
    'PHOTO Albumb': 'फोटो एल्बम',
    'UDHOG ADHAR': 'उद्योग आधार',

    // ---- reviews
    'Computer ka kaam bahut accha aur jaldi hota hai. Video editing bhi same quality ki milti hai.':
      'कंप्यूटर का काम बहुत अच्छा और जल्दी होता है। वीडियो एडिटिंग भी उसी क्वालिटी की मिलती है।',
    'Yahan online form filling aur ITR filing dono ho gaya. Staff bahut helpful hai.':
      'यहाँ ऑनलाइन फॉर्म भरना और आईटीआर फाइलिंग दोनों हो गया। स्टाफ़ बहुत मददगार है।',
    'बहुत अच्छा काम होता है, ऑनलाइन काम से लेकर फोटो-वीडियो सहज रूप से किया जाता है। मैं खुश हूँ।':
      'बहुत अच्छा काम होता है, ऑनलाइन काम से लेकर फोटो-वीडियो सहज रूप से किया जाता है। मैं खुश हूँ।',

    // ---- misc UI
    'Search Services...': 'सेवाएँ खोजें...',
    'Customer Reviews': 'ग्राहक समीक्षा',
    'View All': 'सभी देखें',
    'View on Google Maps': 'Google Maps पर देखें',
    '(Call / WhatsApp)': '(कॉल / व्हाट्सएप)',
    'All rights reserved.': 'सर्वाधिकार सुरक्षित।',
    'Open menu': 'मेन्यू खोलें',
    'Close menu': 'मेन्यू बंद करें',
    'Previous photo': 'पिछली फोटो',
    'Next photo': 'अगली फोटो',
    'Previous review': 'पिछला समीक्षा',
    'Next review': 'अगला समीक्षा',
    'Full screen': 'पूरा स्क्रीन',
  },

  /* ============================================================ URDU ==== */
  ur: {
    // ---- shop identity
    'All Digital Solutions Under One Roof': 'تمام ڈیجیٹل حل ایک ہی جگہ',

    // ---- contact
    '9:00 AM - 8:00 PM': 'صبح 9:00 - رات 8:00',
    'Open Now': 'ابھی کھلا ہے',
    'Kadrabad, Pull Ke Pass, Near Masjid': 'قادرآباد، پل کے پاس، مسجد کے قریب',

    // ---- hero
    'Your Local Digital Solution Center': 'آپ کا مقامی ڈیجیٹل حل مرکز',
    // Keyed on the Hindi original: site.js holds this line in Devanagari, so an
    // English key would never match and Urdu would silently fall back to Hindi.
    'कंप्यूटर से लेकर वीडियो तक, सभी सेवाएँ एक ही जगह':
      'کمپیوٹر سے لے کر ویڈیو تک، تمام خدمات ایک ہی جگہ',
    'Trusted Service': 'قابلِ اعتماد خدمت',
    'Affordable Price': 'کم قیمت',
    'Fast Support': 'فوری مدد',
    'Call Now': 'ابھی کال کریں',
    'WhatsApp': 'واٹس ایپ',
    'Get Direction': 'راستہ دیکھیں',

    // ---- services (19)
    'Computer Job Work': 'کمپیوٹر کا کام',
    'Computer Work': 'کمپیوٹر کا کام',
    'Videography Services': 'ویڈیوگرافی خدمات',
    'Computer Assemble': 'کمپیوٹر اسمبل',
    'Computer Accessories': 'کمپیوٹر ایکسیسریز',
    'YouTube Channel Setup': 'یوٹیوب چینل سیٹ اپ',
    'School & Other ID Card': 'اسکول اور دیگر شناختی کارڈ',
    'Rubber Stamp Making': 'ربر اسٹیمپ بنانا',

    // ---- why choose us
    'Why Choose Us?': 'ہمیں کیوں منتخب کریں؟',
    'Local Trusted Shop': 'مقامی قابلِ اعتماد دکان',
    'in Kadrabad': 'قادرآباد میں',
    'Experienced Team': 'تجربہ کار ٹیم',
    'All Services': 'تمام خدمات',
    'Under One Roof': 'ایک ہی جگہ',
    'Fast & Reliable Service': 'فوری اور قابلِ اعتماد خدمت',
    'Customer Support': 'کسٹمر سپورٹ',
    '& Best Quality': 'اور بہترین معیار',

    // ---- menu
    Home: 'ہوم',
    'About Us': 'ہمارے بارے میں',
    Services: 'خدمات',
    Gallery: 'گیلری',
    'Price List': 'قیمت فہرست',
    Blog: 'بلاگ',
    Contact: 'رابطہ',

    // ---- gallery photo captions
    'DATA ENTRY': 'ڈیٹا انٹری',
    'JOB WORK': 'جاب ورک',
    Mixing: 'مکسنگ',
    'Pasport PHOTO': 'پاسپورٹ فوٹو',
    PEN: 'پین',
    'PHOTO Albumb': 'فوٹو البم',
    'UDHOG ADHAR': 'صنعتی رجسٹریشن',

    // ---- reviews
    'Computer ka kaam bahut accha aur jaldi hota hai. Video editing bhi same quality ki milti hai.':
      'کمپیوٹر کا کام بہت اچھا اور جلدی ہوتا ہے۔ ویڈیو ایڈیٹنگ بھی اسی معیار کی ملتی ہے۔',
    'Yahan online form filling aur ITR filing dono ho gaya. Staff bahut helpful hai.':
      'یہاں آن لائن فارم بھرنا اور آئی ٹی آر فائلنگ دونوں ہو گیا۔ اسٹاف بہت مددگار ہے۔',
    'बहुत अच्छा काम होता है, ऑनलाइन काम से लेकर फोटो-वीडियो सहज रूप से किया जाता है। मैं खुश हूँ।':
      'کام بہت اچھا ہوتا ہے، آن لائن کام سے لے کر فوٹو ویڈیو آسانی سے کیا جاتا ہے۔ میں خوش ہوں۔',

    // ---- misc UI
    'Search Services...': 'خدمات تلاش کریں...',
    'Customer Reviews': 'کسٹمر رائیو',
    'View All': 'سب دیکھیں',
    'View on Google Maps': 'Google Maps پر دیکھیں',
    '(Call / WhatsApp)': '(کال / واٹس ایپ)',
    'All rights reserved.': 'جملہ حقوق محفوظ ہیں۔',
    'Open menu': 'مینو کھولیں',
    'Close menu': 'مینو بند کریں',
    'Previous photo': 'پچھلی تصویر',
    'Next photo': 'اگلی تصویر',
    'Previous review': 'پچھلا جائزہ',
    'Next review': 'اگلا جائزہ',
    'Full screen': 'مکمل اسکرین',
  },
};