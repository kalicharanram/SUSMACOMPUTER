import { services } from '../data/site';
import { useLang } from '../i18n';

/**
 * All five service categories in one page, each linking to its own detail page.
 *
 * `services` in site.js carries the image, label and tone; the detail route is
 * the one thing missing from the data (only four of the five have `href`), so it
 * is resolved here — "Computer & Online Services" (id 1) has no `href` in the
 * data but lives at the computer-job-work route. Keeping the fallback in one
 * place matches how the homepage strip (Sections.jsx) and the header dropdown
 * already resolve it, so all three stay in sync.
 */
const detailHref = (s) => s.href || (s.id === 1 ? '#/services/computer-job-work' : '#services');

export function ServicesPage() {
  const { t } = useLang();

  return <section id="services-page" className="job-page">
    <div className="job-heading">
      <nav aria-label="Breadcrumb" className="job-breadcrumb">
        <a href="#home">{t('Home')}</a><span>/</span>
        <span>{t('Services')}</span>
      </nav>
      <h1>{t('Services')}</h1>
      <p>{t('All digital solutions under one roof — choose a service to see details and prices')}</p>
    </div>
    <div className="job-grid">
      {services.map((service) => {
        const tone = service.tone;
        return <a key={service.id} href={detailHref(service)} className="job-card">
          <img
            src={`./images/services/${service.img}`}
            alt={t(service.label)}
            loading="lazy"
            width="200"
            height="120"
            className="aspect-[5/3] w-full object-cover"
          />
          <h2 className={`px-3 pt-3 text-center text-base font-bold ${tone === 'mint' ? 'text-[#12A268]' : tone === 'pink' ? 'text-[#DB4A78]' : 'text-[#2C6BD6]'} dark:text-white`}>{t(service.label)}</h2>
          <span className="job-card-link">{t('View Details')} →</span>
        </a>;
      })}
    </div>
  </section>;
}
