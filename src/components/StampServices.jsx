import { stampServices } from '../data/site';
import { useLang } from '../i18n';

export function StampServices() {
  const { t } = useLang();

  return <section className="job-page">
    <div className="job-heading">
      <nav aria-label="Breadcrumb" className="job-breadcrumb">
        <a href="#home">{t('Home')}</a><span>/</span>
        <a href="#/services">{t('Services')}</a><span>/</span>
        <span>{t('Stamp Making')}</span>
      </nav>
      <h1>{t('Stamp Making')}</h1>
    </div>
    <div className="job-grid">
      {stampServices.map((service) => <article key={service.label} className="job-card">
        <img
          src={`./images/services/${service.img}`}
          alt={t(service.label)}
          loading="lazy"
          width="200"
          height="120"
          className="aspect-[5/3] w-full object-cover"
        />
        <h2 className="px-3 py-3 text-center text-base font-bold text-ink dark:text-white">{t(service.label)}</h2>
      </article>)}
    </div>
  </section>;
}
