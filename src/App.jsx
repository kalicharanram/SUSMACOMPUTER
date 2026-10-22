import { useEffect, useState } from 'react';
import { TopBar, Header, Hero } from './components/Layout';
import { Services, AboutUs, ContactPage, Gallery, Reviews, Footer } from './components/Sections';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { ComputerJobs } from './components/ComputerJobs';
import { SarkariJobs } from './components/SarkariJobs';
import { computerJobs, jobBase } from './data/computerJobs';
import { VideographyServices } from './components/VideographyServices';
import { DigitalMarketingServices } from './components/DigitalMarketingServices';
import { IdCardServices } from './components/IdCardServices';
import { StampServices } from './components/StampServices';
import { PriceList } from './components/PriceList';
import { PricedServiceDetail } from './components/PricedServiceDetail';
import { priceCategories } from './data/prices';
import { sarkariBase } from './data/sarkariJobs';

const videographyBase = '#/services/videography-services';
const digitalMarketingBase = '#/services/digital-marketing-social-media';
const idCardBase = '#/services/id-card-design-printing';
const stampBase = '#/services/stamp-making';
const serviceBases = [jobBase, videographyBase, digitalMarketingBase, idCardBase, stampBase];
const slugify = (value) => value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  const jobPage = hash === jobBase || hash.startsWith(jobBase + '/');
  const videographyPage = hash === videographyBase || hash.startsWith(videographyBase + '/');
  const digitalMarketingPage = hash === digitalMarketingBase || hash.startsWith(digitalMarketingBase + '/');
  const idCardPage = hash === idCardBase || hash.startsWith(idCardBase + '/');
  const stampPage = hash === stampBase || hash.startsWith(stampBase + '/');
  const pricePage = hash === '#/price-list';
  const aboutPage = hash === '#/about-us';
  const galleryPage = hash === '#/gallery';
  const contactPage = hash === '#/contact';
  const sarkariPage = hash === sarkariBase || hash.startsWith(sarkariBase + '/');
  const slug = jobPage ? hash.slice(jobBase.length + 1).replace(/\/$/, '') : '';
  const detailCategoryIndex = serviceBases.findIndex((base) => hash.startsWith(base + '/'));
  const detailSlug = detailCategoryIndex >= 0 ? hash.slice(serviceBases[detailCategoryIndex].length + 1).replace(/\/$/, '') : '';
  const detailCategory = detailCategoryIndex >= 0 ? priceCategories[detailCategoryIndex] : null;
  const detailService = detailCategory?.services.find((service) => {
    if (detailCategoryIndex === 0) return computerJobs.find((item) => item.slug === detailSlug)?.title === service.name;
    return slugify(service.name) === detailSlug;
  });
  useEffect(() => {
    document.title = sarkariPage ? 'Sarkari Job Updates | Susma Computer' : aboutPage ? 'About Us | Susma Computer' : contactPage ? 'Contact | Susma Computer' : galleryPage ? 'Gallery | Susma Computer' : pricePage ? 'Price List | Susma Computer' : detailService ? `${detailService.name} | Susma Computer` : jobPage ? (computerJobs.find(item => item.slug === slug)?.title || 'Computer & Online Services') + ' | Susma Computer' : videographyPage ? 'Videography Services | Susma Computer' : digitalMarketingPage ? 'Digital Marketing & Social Media | Susma Computer' : idCardPage ? 'ID Card Design & Printing | Susma Computer' : stampPage ? 'Stamp Making | Susma Computer' : 'Susma Computer & Video Mixing Lab';
    const frame = requestAnimationFrame(() => {
      if (sarkariPage || jobPage || videographyPage || digitalMarketingPage || idCardPage || stampPage || hash.startsWith('#/')) window.scrollTo({ top: 0, behavior: 'instant' });
      else if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, jobPage, videographyPage, digitalMarketingPage, idCardPage, stampPage, pricePage, aboutPage, galleryPage, contactPage, sarkariPage, slug, detailService]);
  return <>
    <TopBar /><Header jobPage={jobPage || videographyPage || digitalMarketingPage || idCardPage || stampPage || sarkariPage} pricePage={pricePage} aboutPage={aboutPage} galleryPage={galleryPage} contactPage={contactPage} />
    <main>{sarkariPage ? <SarkariJobs /> : aboutPage ? <><Hero /><AboutUs /></> : contactPage ? <><Hero /><ContactPage /></> : galleryPage ? <Gallery /> : pricePage ? <PriceList /> : jobPage ? <ComputerJobs slug={slug} /> : detailService && detailCategory ? <PricedServiceDetail categoryIndex={detailCategoryIndex} category={detailCategory} service={detailService} /> : videographyPage ? <VideographyServices /> : digitalMarketingPage ? <DigitalMarketingServices /> : idCardPage ? <IdCardServices /> : stampPage ? <StampServices /> : hash.startsWith('#/') ? <ComputerJobs slug="not-found" /> : <><Hero /><Services /><Reviews /></>}</main>
    <Footer /><ThemeCustomizer />
  </>;
}
