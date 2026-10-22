import { ArrowLeft, Phone } from 'lucide-react';
import { sarkariCategories, sarkariTop } from '../data/sarkariJobs';
import { contact } from '../data/site';
import { useLang } from '../i18n';

/**
 * Sarkari Job Updates — ek link-board page.
 *
 * Har link abhi "#" (placeholder) hai. Asli link lagane ke liye sirf
 * `src/data/sarkariJobs.js` me `url` badal do — component nahi chhedna.
 */
export function SarkariJobs() {
  const { t } = useLang();

  return (
    <section id="sarkari-jobs" className="sarkari-page">
      <div className="sarkari-head">
        <nav aria-label="Breadcrumb" className="sarkari-crumb">
          <a href="#home">{t('Home')}</a>
          <span>/</span>
          <span>{t('Sarkari Job Updates')}</span>
        </nav>
        <h1>{t('Sarkari Job Updates')}</h1>
        <p>{t('Latest government job forms, results, admit cards & answer keys')}</p>
      </div>

      <div className="sarkari-wrap">
        {/* Top coloured buttons */}
        <div className="sarkari-top">
          {sarkariTop.map((btn, i) => (
            <a
              key={i}
              href={btn.url}
              className="sarkari-btn"
              style={{ backgroundColor: btn.tone }}
            >
              {t(btn.text)}
            </a>
          ))}
        </div>

        {/* Category boxes */}
        <div className="sarkari-grid">
          {sarkariCategories.map((cat) => (
            <div key={cat.title} className="sarkari-box">
              <h2>{t(cat.title)}</h2>
              <ul>
                {cat.items.map((item, i) => (
                  <li key={i}>
                    <a href={item.url}>{t(item.text)}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Help strip — form bharna ho to seedha call karein. */}
        <div className="sarkari-help">
          <p>{t('Online form bharne, document banane ya print ke liye humein call karein.')}</p>
          <a className="sarkari-call" href={`tel:${contact.phone1}`}>
            <Phone size={18} />
            {t('Call Now')}
          </a>
          <a className="sarkari-back" href="#home">
            <ArrowLeft size={16} />
            {t('Back to Home')}
          </a>
        </div>
      </div>
    </section>
  );
}
