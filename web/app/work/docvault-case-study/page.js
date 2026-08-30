import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import DocVaultCaseStudy from '../../../components/DocVaultCaseStudy';

export const metadata = {
  title: 'DocVault — CAD Automation case study | SPM Design Solutions',
  description:
    'How SPM built DocVault, a revision-aware document management system, for an engineering client drowning in drawing revisions.',
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
