import { useEffect, useState } from 'react';
import { TopBar, Header, Hero } from './components/Layout';
import { Services, WhyUs, Gallery, Reviews, Footer } from './components/Sections';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { ComputerJobs } from './components/ComputerJobs';
import { computerJobs, jobBase } from './data/computerJobs';
import { VideographyServices } from './components/VideographyServices';
import { DigitalMarketingServices } from './components/DigitalMarketingServices';

const videographyBase = '#/services/videography-services';
const digitalMarketingBase = '#/services/digital-marketing-social-media';

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  const jobPage = hash === jobBase || hash.startsWith(jobBase + '/');
  const videographyPage = hash === videographyBase;
  const digitalMarketingPage = hash === digitalMarketingBase;
  const slug = jobPage ? hash.slice(jobBase.length + 1).replace(/\/$/, '') : '';
  useEffect(() => {
    document.title = jobPage ? (computerJobs.find(item => item.slug === slug)?.title || 'Computer Job Work') + ' | Susma Computer' : videographyPage ? 'Videography Services | Susma Computer' : digitalMarketingPage ? 'Digital Marketing & Social Media | Susma Computer' : 'Susma Computer & Video Mixing Lab';
    const frame = requestAnimationFrame(() => {
      if (jobPage || hash.startsWith('#/')) window.scrollTo({ top: 0, behavior: 'instant' });
      else if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, jobPage, videographyPage, digitalMarketingPage, slug]);
  return <>
    <TopBar /><Header jobPage={jobPage || videographyPage || digitalMarketingPage} />
    <main>{jobPage ? <ComputerJobs slug={slug} /> : videographyPage ? <VideographyServices /> : digitalMarketingPage ? <DigitalMarketingServices /> : hash.startsWith('#/') ? <ComputerJobs slug="not-found" /> : <><Hero /><Services /><Gallery /><WhyUs /><Reviews /></>}</main>
    <Footer /><ThemeCustomizer />
  </>;
}
