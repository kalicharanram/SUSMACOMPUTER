import { ArrowLeft, CheckCircle2, Phone } from 'lucide-react';
import { contact, videographyServices, digitalMarketingServices, idCardServices, stampServices } from '../data/site';
import { useLang } from '../i18n';

const serviceCollections = [null, videographyServices, digitalMarketingServices, idCardServices, stampServices];

export function PricedServiceDetail({ categoryIndex, category, service }) {
  const { t } = useLang();
  const image = serviceCollections[categoryIndex]?.find((item) => item.label === service.name)?.img;

  return <section className="job-page">
    <div className="job-heading">
      <nav aria-label="Breadcrumb" className="job-breadcrumb">
        <a href="#home">{t('Home')}</a><span>/</span>
        <a href="#/services">{t('Services')}</a><span>/</span>
        <a href="#/price-list">{t('Price List')}</a><span>/</span>
        <span>{service.name}</span>
      </nav>
      <h1>{service.name}</h1>
    </div>
    <div className="job-detail">
      <a className="job-back" href="#/price-list"><ArrowLeft size={18} />Back to Price List</a>
      <div className="job-detail-grid">
        {image && <div className="job-detail-art"><img src={`./images/services/${image}`} alt={service.name} className="job-artwork" /></div>}
        <div className="job-detail-copy">
          <p className="text-sm font-bold text-brand-blue">{category.title}</p>
          <h2>{service.name}</h2>
          <ul>
            <li><CheckCircle2 size={21} aria-hidden="true" /><span><strong>Starting price: {service.price}</strong></span></li>
            <li><CheckCircle2 size={21} aria-hidden="true" /><span>{service.basis}</span></li>
          </ul>
          <p className="job-note">Final charges depend on the work details. Please contact us to confirm your requirements and total price before starting.</p>
          <div className="job-actions">
            <a className="job-call" href={`tel:${contact.phone1}`}><Phone size={18} />{t('Call Now')}</a>
            <a className="job-whatsapp" href={`${contact.whatsapp}?text=${encodeURIComponent(`Hello, I would like to enquire about ${service.name}.`)}`} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
