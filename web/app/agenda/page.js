import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Agenda from '../../components/Agenda';

export const metadata = {
  title: 'Book a Call',
  description: 'Schedule a discovery call with SPM Design Solutions over Google Meet.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AgendaPage() {
  return (
    <>
      <Header />
      <main id="top">
        <Agenda />
      </main>
      <Footer />
    </>
  );
}
