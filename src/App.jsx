import { TopBar, Header, Hero } from './components/Layout';
import { Services, WhyUs, Gallery, Reviews, Footer } from './components/Sections';

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
    </>
  );
}