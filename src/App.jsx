import { TopBar, Header, Hero } from './components/Layout';
import { Services, WhyUs, Gallery, Reviews, Footer } from './components/Sections';
import { ThemeCustomizer } from './components/ThemeCustomizer';

export default function App() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <WhyUs />
        <Reviews />
      </main>
      <Footer />
      {/* Visitor-facing theme controls, mounted last so the floating button sits
          above every section in the stacking order. */}
      <ThemeCustomizer />
    </>
  );
}