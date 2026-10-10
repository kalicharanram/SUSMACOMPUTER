import { ArrowLeft, ArrowRight, Phone, CheckCircle2 } from 'lucide-react';
import { computerJobs, jobBase } from '../data/computerJobs';
import { contact } from '../data/site';
import { useLang } from '../i18n';

// Reuse the supplied artwork without baking the page header/footer into each card.
function ServiceArtwork({ service }) {
  return <svg viewBox={service.crop.join(' ')} className="job-artwork" aria-hidden="true" focusable="false">
    <image href="./images/computer-job-work/service-artwork.jpg" width="1334" height="1888" preserveAspectRatio="none" />
  </svg>;
}

export function ComputerJobs({ slug }) {
  const { t } = useLang();
  const service = computerJobs.find(item => item.slug === slug);
  const missing = Boolean(slug && !service);
  const title = missing ? 'Service not found' : service?.title || 'Computer Job Work';
  return <section id="computer-job-work" className="job-page">
    {slug ? <div className="job-heading">
      <nav aria-label="Breadcrumb" className="job-breadcrumb"><a href="#home">{t('Home')}</a><span>/</span><a href={jobBase}>{t('Computer Job Work')}</a>{slug && <><span>/</span><span>{t(title)}</span></>}</nav>
      <h1>{t(title)}</h1>

    </div> : <h1 className="sr-only">{t(title)}</h1>}
    {missing ? <div className="job-detail"><p>This service page could not be found.</p><a className="job-back" href={jobBase}><ArrowLeft size={18} />Back to Computer Job Work</a></div> : service ?
      <div className="job-detail">
        <a className="job-back" href={jobBase}><ArrowLeft size={18} />Back to Computer Job Work</a>
        <div className="job-detail-grid">
          <div className="job-detail-art"><ServiceArtwork service={service} /></div>
          <div className="job-detail-copy">
            <h2>{service.summary}</h2>
            <ul>{service.items.map(item => <li key={item}><CheckCircle2 size={21} aria-hidden="true" /><span>{item}</span></li>)}</ul>
            <h3>How to get started</h3><p>{service.prepare}</p>
            <p className="job-note">Contact us for availability, charges and completion time.</p>
            <div className="job-actions"><a className="job-call" href={'tel:' + contact.phone1}><Phone size={18} />{t('Call Now')}</a><a className="job-whatsapp" href={contact.whatsapp + '?text=' + encodeURIComponent('Hello, I would like to enquire about ' + service.title + '.')} target="_blank" rel="noreferrer">WhatsApp <ArrowRight size={18} /></a></div>
          </div>
        </div>
        <h2 className="job-other-title">Explore other services</h2><div className="job-related">{computerJobs.filter(item => item !== service).map(item => <a key={item.slug} href={jobBase + '/' + item.slug}>{t(item.title)} <ArrowRight size={16} /></a>)}</div>
      </div> :
      <div className="job-grid">{computerJobs.map(item => <a key={item.slug} className="job-card" href={jobBase + '/' + item.slug} aria-label={t(item.title) + ' — View details'}><ServiceArtwork service={item} /><h2 className="sr-only">{t(item.title)}</h2><span className="job-card-link">View details <ArrowRight size={18} aria-hidden="true" /></span></a>)}</div>
    }
  </section>;
}
