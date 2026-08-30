import Header from '../components/Header';
import Hero from '../components/Hero';
import Trust from '../components/Trust';
import Problem from '../components/Problem';
import Services from '../components/Services';
import Process from '../components/Process';
import Work from '../components/Work';
import About from '../components/About';
import Faq from '../components/Faq';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Trust />
        <Problem />
        <Services />
        <Process />
        <Work />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
