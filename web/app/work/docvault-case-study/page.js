import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import DocVaultCaseStudy from '../../../components/DocVaultCaseStudy';

const TITLE = 'DocVault — CAD Automation Case Study';
const DESCRIPTION =
  'How SPM built DocVault, a revision-aware document management system, for an engineering client drowning in drawing revisions — delivered in a single working session.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/work/docvault-case-study',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/work/docvault-case-study',
    type: 'article',
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function DocVaultCaseStudyPage() {
  return (
    <>
      <Header />
      <DocVaultCaseStudy />
      <Footer />
    </>
  );
}
