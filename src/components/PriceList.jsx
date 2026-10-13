import { ArrowLeft, Phone } from 'lucide-react';
import { contact } from '../data/site';
import { priceCategories } from '../data/prices';
import { useLang } from '../i18n';

export function PriceList() {
  const { t } = useLang();
  return <section className="job-page min-h-[55vh]">
    <div className="job-heading">
      <nav aria-label="Breadcrumb" className="job-breadcrumb"><a href="#home">{t('Home')}</a><span>/</span><span>{t('Price List')}</span></nav>
      <h1>{t('Price List')}</h1>
      <p>Affordable starting rates for our services</p>
    </div>
    <div className="price-list-grid">
      {priceCategories.map((category) => <section className="price-category" key={category.title}>
        <h2>{t(category.title)}</h2>
        <ul>{category.services.map((service) => <li className="price-row" key={service.name}>
          <div><h3>{t(service.name)}</h3><p>{service.basis}</p></div>
          <strong>{service.price}</strong>
        </li>)}</ul>
      </section>)}
    </div>
    <div className="price-notes">
      <p>Listed rates are starting prices. Final charges can change with work scope, duration, size, quantity and finish. Government or portal fees, materials, album printing, travel and advertising budget are extra where applicable. We will confirm the total before starting.</p>
      <a className="job-call" href={'tel:' + contact.phone1}><Phone size={18} />{t('Call Now')}</a>
      <a className="price-back" href="#services"><ArrowLeft size={17} />{t('Services')}</a>
    </div>
  </section>;
}
