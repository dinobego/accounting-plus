'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const servicesContent: { [key: string]: any } = {
  'company-formation': {
    title: 'Company Formation',
    titleTr: 'Şirket Kuruluşu',
    titleMe: 'Osnivanje preduzeća',
    titleEn: 'Company Formation',
    descriptionEn: 'Complete legal and administrative support in establishing your business entity',
    descriptionTr: 'İşletmenizi kurmada tam yasal ve idari destek',
    descriptionMe: 'Kompletna pravna i administrativna podrška pri osnivanju vašeg preduzeća',
    featuresEn: [
      'Legal entity registration and documentation',
      'Business license acquisition',
      'Tax registration',
      'Initial business setup consultation',
      'Document preparation and filing',
      'Corporate structure guidance'
    ],
    featuresTr: [
      'Tüzel kişi kaydı ve belge hazırlığı',
      'İşletme belgesi alınması',
      'Vergi kaydı',
      'İlk işletme kurulum danışmanlığı',
      'Belge hazırlığı ve dosya işlemi',
      'Kurumsal yapı rehberliği'
    ],
    featuresMe: [
      'Registracija pravnog lica i dokumentacija',
      'Nabavka dozvole za poslovanje',
      'Poreska registracija',
      'Konsultacija za početnu postavku poslovanja',
      'Priprema dokumenata i podnošenje',
      'Vodistvo za korporativnu strukturu'
    ],
    benefitsEn: 'Our experienced team ensures a smooth and efficient company formation process, allowing you to focus on your business growth.',
    benefitsTr: 'Deneyimli ekibimiz, şirket kuruluşu sürecinin sorunsuz ve verimli olmasını sağlayarak işletmeniz büyütmesine odaklanmanızı sağlar.',
    benefitsMe: 'Naš iskusan tim osigurava nesmetanu i efikasnu preduzeću osnivanja, omogućavajući vam da se fokusirate na rast vašeg poslovanja.'
  },
  'residence-work-permits': {
    title: 'Residence and Work Permits',
    titleTr: 'İkamet ve Çalışma İzinleri',
    titleMe: 'Dozvole za boravak i rad',
    titleEn: 'Residence and Work Permits',
    descriptionEn: 'Professional assistance in obtaining residence and work permits for foreign nationals',
    descriptionTr: 'Yabancı vatandaşlar için ikamet ve çalışma izni alınmasında profesyonel yardım',
    descriptionMe: 'Stručna pomoć pri nabavci dozvola za boravak i rad za strane državljane',
    featuresEn: [
      'Visa and permit consultation',
      'Documentation preparation',
      'Application submission',
      'Government liaison',
      'Ongoing compliance support',
      'Renewal assistance'
    ],
    featuresTr: [
      'Vize ve izin danışmanlığı',
      'Belge hazırlığı',
      'Başvuru sunumu',
      'Devlet kurumları ile iletişim',
      'Devam eden uyum desteği',
      'Yenileme yardımı'
    ],
    featuresMe: [
      'Vizuelni i dozvola konsultacija',
      'Priprema dokumentacije',
      'Podnošenje aplikacije',
      'Veza sa vladinim institucijama',
      'Tekuća podrška za usklađenost',
      'Pomoć pri obnavljanju'
    ],
    benefitsEn: 'Navigate the complex immigration process with confidence with our expert guidance and support.',
    benefitsTr: 'Karmaşık göçmenlik sürecini uzman rehberlik ve desteğimizle güvenle yönetin.',
    benefitsMe: 'Krećite kroz kompleksan proces imigracije s povjerenjem sa našim stručnim vodistvom i podrškom.'
  },
  'bookkeeping': {
    title: 'Bookkeeping Services',
    titleTr: 'Muhasebe Hizmetleri',
    titleMe: 'Knjigovodstvene usluge',
    titleEn: 'Bookkeeping Services',
    descriptionEn: 'Comprehensive bookkeeping and financial record maintenance',
    descriptionTr: 'Kapsamlı muhasebe ve mali kayıt tutma',
    descriptionMe: 'Sveobuhvatne knjigovodstvene usluge i održavanje finansijskih evidencija',
    featuresEn: [
      'Transaction recording and classification',
      'Bank reconciliation',
      'Financial statement preparation',
      'Expense tracking',
      'Invoice management',
      'Monthly financial reports'
    ],
    featuresTr: [
      'İşlem kaydı ve sınıflandırması',
      'Banka mutabakatı',
      'Mali tablo hazırlığı',
      'Harcama takibi',
      'Fatura yönetimi',
      'Aylık mali raporlar'
    ],
    featuresMe: [
      'Bilježenje i klasifikacija transakcija',
      'Usklađivanje bankovnih računa',
      'Priprema finansijskih izveštaja',
      'Praćenje rashoda',
      'Upravljanje fakturama',
      'Mjesečni finansijski izvještaji'
    ],
    benefitsEn: 'Maintain accurate financial records and gain valuable insights into your business performance.',
    benefitsTr: 'Doğru mali kayıtları tutun ve işletme performansınız hakkında değerli bilgiler edinin.',
    benefitsMe: 'Održavajte točne financijske evidencije i dobijte dragocjene uvide u performanse vašeg poslovanja.'
  },
  'tax-consulting': {
    title: 'Tax Consulting',
    titleTr: 'Vergi Danışmanlığı',
    titleMe: 'Poresko savetovanje',
    titleEn: 'Tax Consulting',
    descriptionEn: 'Expert tax planning and compliance consultation',
    descriptionTr: 'Vergi planlaması ve uyum danışmanlığı',
    descriptionMe: 'Stručno poresko planiranje i konsultacija za usklađenost',
    featuresEn: [
      'Tax strategy planning',
      'Tax return preparation',
      'Deduction optimization',
      'Audit support',
      'Tax planning consultation',
      'Compliance monitoring'
    ],
    featuresTr: [
      'Vergi stratejisi planlama',
      'Vergi beyannamesi hazırlığı',
      'Kesinti optimizasyonu',
      'Denetim desteği',
      'Vergi planlama danışmanlığı',
      'Uyum izlemesi'
    ],
    featuresMe: [
      'Planiranje poreske strategije',
      'Priprema poreske prijave',
      'Optimizacija odbitaka',
      'Podrška pri reviziji',
      'Konsultacija za poresko planiranje',
      'Monitoriranje usklađenosti'
    ],
    benefitsEn: 'Minimize tax liability while maintaining full compliance with all regulations.',
    benefitsTr: 'Vergi yükümlülüğünü minimize edin ve tüm düzenlemelere tam uyum sağlayın.',
    benefitsMe: 'Minimizujte poresku obavezu dok održavate potpunu usklađenost sa svim propisima.'
  },
  'final-reports': {
    title: 'Final Reports for Entrepreneurs',
    titleTr: 'Girişimciler için Nihai Raporlar',
    titleMe: 'Završni izveštaji za preduzetnike',
    titleEn: 'Final Reports for Entrepreneurs',
    descriptionEn: 'Professional preparation of annual financial statements and reports',
    descriptionTr: 'Yıllık mali tablo ve raporların profesyonel hazırlığı',
    descriptionMe: 'Stručna priprema godišnjih finansijskih izveštaja i izvještaja',
    featuresEn: [
      'Annual financial statement preparation',
      'Balance sheet compilation',
      'Income statement creation',
      'Tax return filing',
      'Year-end reconciliation',
      'Report presentation'
    ],
    featuresTr: [
      'Yıllık mali tablo hazırlığı',
      'Bilanço derlemesi',
      'Gelir tablosu oluşturma',
      'Vergi beyannamesi dosyalama',
      'Yıl sonu uzlaştırması',
      'Rapor sunumu'
    ],
    featuresMe: [
      'Priprema godišnjih finansijskih izveštaja',
      'Kompajliranje bilansa',
      'Stvaranje izveštaja o dohodku',
      'Podnošenje poreske prijave',
      'Usklađivanje na kraju godine',
      'Prezentacija izvještaja'
    ],
    benefitsEn: 'Accurate final reports ensure proper tax compliance and provide clear financial performance indicators.',
    benefitsTr: 'Doğru nihai raporlar, uygun vergi uyumunu sağlar ve açık finansal performans göstergelerini sunar.',
    benefitsMe: 'Točni završni izvještaji osiguravaju odgovarajuću poresku usklađenost i pružaju jasne pokazatelje finansijske performanse.'
  },
  'business-analysis': {
    title: 'Business Analysis',
    titleTr: 'İş Analizleri',
    titleMe: 'Analize poslovanja',
    titleEn: 'Business Analysis',
    descriptionEn: 'Comprehensive financial analysis and business performance evaluation',
    descriptionTr: 'Kapsamlı mali analiz ve işletme performansı değerlendirmesi',
    descriptionMe: 'Sveobuhvatna finansijska analiza i procjena performansi poslovanja',
    featuresEn: [
      'Financial ratio analysis',
      'Profitability assessment',
      'Cash flow analysis',
      'Trend analysis',
      'Benchmarking comparison',
      'Strategic recommendations'
    ],
    featuresTr: [
      'Mali oran analizi',
      'Karlılık değerlendirmesi',
      'Nakit akış analizi',
      'Trend analizi',
      'Kıyaslama karşılaştırması',
      'Stratejik öneriler'
    ],
    featuresMe: [
      'Analiza finansijskih omjera',
      'Procjena profitabilnosti',
      'Analiza novčanog toka',
      'Analiza trenda',
      'Poređenje sa merili',
      'Strateške preporuke'
    ],
    benefitsEn: 'Gain actionable insights to improve business performance and make informed strategic decisions.',
    benefitsTr: 'İşletme performansını iyileştirmek ve bilinçli stratejik kararlar almak için işlem yapılabilir içgörüler elde edin.',
    benefitsMe: 'Dobijte praktične uvide za poboljšanje performansi poslovanja i donošenje informisanih strateških odluka.'
  },
  'electronic-documents': {
    title: 'Electronic Document Management',
    titleTr: 'Elektronik Belge Yönetimi',
    titleMe: 'Elektronsko slanje i prijem dokumentacije',
    titleEn: 'Electronic Document Management',
    descriptionEn: 'Digital document processing and electronic filing with authorities',
    descriptionTr: 'Dijital belge işleme ve elektronik dosya işlemi',
    descriptionMe: 'Digitalna obrada dokumenata i elektronsko podnošenje organima vlasti',
    featuresEn: [
      'Document digitalization',
      'Electronic filing systems',
      'Government e-services integration',
      'Digital signatures',
      'Secure document storage',
      'Compliance documentation'
    ],
    featuresTr: [
      'Belge dijitalizasyonu',
      'Elektronik dosya sistemleri',
      'Devlet e-hizmetleri entegrasyonu',
      'Dijital imzalar',
      'Güvenli belge depolaması',
      'Uyum belgelendirmesi'
    ],
    featuresMe: [
      'Digitalizacija dokumenata',
      'Elektronski sistemi za podnošenje',
      'Integracija vladanih e-usluga',
      'Digitalni potpisi',
      'Sigurno skladištenje dokumenata',
      'Dokumentacija za usklađenost'
    ],
    benefitsEn: 'Streamline your document processes and ensure secure, compliant electronic filing.',
    benefitsTr: 'Belge işlemlerinizi kolaylaştırın ve güvenli, uyumlu elektronik dosyalama sağlayın.',
    benefitsMe: 'Pojednostavnite svoje procese dokumenata i osigurajte sigurno, usklađeno elektronsko podnošenje.'
  },
  'real-estate': {
    title: 'Real Estate Services',
    titleTr: 'Gayrimenkul Hizmetleri',
    titleMe: 'Usluge nekretnina',
    titleEn: 'Real Estate Services',
    descriptionEn: 'Property registration, documentation and real estate tax consultation',
    descriptionTr: 'Mülk kaydı, belgelendirme ve gayrimenkul vergisi danışmanlığı',
    descriptionMe: 'Registracija svojine, dokumentacija i porezna konsultacija za nekretnine',
    featuresEn: [
      'Property registration assistance',
      'Title documentation',
      'Real estate tax planning',
      'Inheritance property matters',
      'Due diligence support',
      'Property valuation consultation'
    ],
    featuresTr: [
      'Mülk kaydı yardımı',
      'Unvan belgelendirmesi',
      'Gayrimenkul vergisi planlaması',
      'Miras mülkü konuları',
      'İhraç durum desteği',
      'Mülk değerlendirme danışmanlığı'
    ],
    featuresMe: [
      'Pomoć pri registraciji svojine',
      'Dokumentacija vlasništva',
      'Planiranje poreza na nekretnine',
      'Pitanja naslijeđene svojine',
      'Podrška pri provjeri',
      'Konsultacija za procjenu svojine'
    ],
    benefitsEn: 'Ensure secure property ownership and optimize real estate taxation.',
    benefitsTr: 'Güvenli mülk sahipliğini sağlayın ve gayrimenkul vergilendirilmesini optimize edin.',
    benefitsMe: 'Osigurajte sigurno vlasništvo nad svojinom i optimizujte oporezivanje nekretnina.'
  },
  'employment-agency-services': {
    title: 'Employment Agency Services',
    titleTr: 'İstihdam Ajansı Hizmetleri',
    titleMe: 'Usluge agencije za zapošljavanje',
    titleEn: 'Employment Agency Services',
    descriptionEn: 'Recruitment and employment management services for businesses',
    descriptionTr: 'İşletmeler için işe alım ve istihdam yönetimi hizmetleri',
    descriptionMe: 'Usluge zapošljavanja i upravljanja zaposlenicima za preduzeća',
    featuresEn: [
      'Candidate recruitment and screening',
      'Employment contract preparation',
      'Staff placement services',
      'Payroll management',
      'Employee compliance support',
      'HR consultation'
    ],
    featuresTr: [
      'Aday işe alımı ve taraması',
      'İstihdam sözleşmesi hazırlığı',
      'Personel yerleştirme hizmetleri',
      'Bordro yönetimi',
      'Çalışan uyum desteği',
      'İnsan kaynakları danışmanlığı'
    ],
    featuresMe: [
      'Zapošljavanje i filtriranje kandidata',
      'Priprema ugovora o zaposlenju',
      'Usluge postavljanja osoblja',
      'Upravljanje platnom listom',
      'Podrška za usklađenost zaposlenika',
      'Konsultacija o ljudskim resursima'
    ],
    benefitsEn: 'Find qualified talent and streamline your employment processes efficiently.',
    benefitsTr: 'Nitelikli yetenekleri bulun ve istihdam süreclerinizi verimli bir şekilde kolaylaştırın.',
    benefitsMe: 'Pronađite kvalificirane talente i efikasno pojednostavnite vaše procese zapošljavanja.'
  },
  'visa': {
    title: 'Visa Services',
    titleTr: 'Vize Hizmetleri',
    titleMe: 'Usluge vizuma',
    titleEn: 'Visa Services',
    descriptionEn: 'Complete visa application and travel documentation assistance',
    descriptionTr: 'Vize başvurusu ve seyahat belgelendirme yardımı',
    descriptionMe: 'Potpuna pomoć pri aplikaciji za vizu i dokumentacija putovanja',
    featuresEn: [
      'Visa consultation and guidance',
      'Application documentation preparation',
      'Government submission support',
      'Visa status tracking',
      'Renewal assistance',
      'Multi-country visa coordination'
    ],
    featuresTr: [
      'Vize danışmanlığı ve rehberliği',
      'Başvuru belgeleri hazırlığı',
      'Devlet sunumu desteği',
      'Vize durumu takibi',
      'Yenileme yardımı',
      'Çok ülkeli vize koordinasyonu'
    ],
    featuresMe: [
      'Konsultacija i vodistvo za vizu',
      'Priprema aplikacijske dokumentacije',
      'Podrška pri podnošenju vladi',
      'Praćenje statusa vizuma',
      'Pomoć pri obnavljanju',
      'Koordinacija viza za više država'
    ],
    benefitsEn: 'Navigate visa requirements with expert support and ensure timely approvals.',
    benefitsTr: 'Uzman destekle viza gerekliliklerini yönetin ve zamanında onaylar sağlayın.',
    benefitsMe: 'Krećite kroz zahtjeve za vizu sa stručnom podrškom i osigurajte pravovremena odobrenja.'
  }
};

export default function ServicePage() {
  const params = useParams();
  const locale = params.locale as string;
  const service = params.service as string;
  
  const t = useTranslations('services');
  const content = servicesContent[service];

  if (!content) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-900">Service not found</h1>
        </div>
        <Footer />
      </>
    );
  }

  const getTitle = () => {
    if (locale === 'me') return content.titleMe;
    if (locale === 'tr') return content.titleTr;
    return content.titleEn;
  };

  const getDescription = () => {
    if (locale === 'me') return content.descriptionMe;
    if (locale === 'tr') return content.descriptionTr;
    return content.descriptionEn;
  };

  const getFeatures = () => {
    if (locale === 'me') return content.featuresMe;
    if (locale === 'tr') return content.featuresTr;
    return content.featuresEn;
  };

  const getBenefits = () => {
    if (locale === 'me') return content.benefitsMe;
    if (locale === 'tr') return content.benefitsTr;
    return content.benefitsEn;
  };

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {getTitle()}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {getDescription()}
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              {locale === 'me' ? 'Što uključujemo' : locale === 'tr' ? 'Neler Dahil' : 'What We Include'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {getFeatures().map((feature: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.05 }}
                  className="flex items-start space-x-4 bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all"
                >
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                  <p className="text-gray-700 text-lg">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">
              {locale === 'me' ? 'Zašto nas odabrati' : locale === 'tr' ? 'Neden Bizi Seçin' : 'Why Choose Us'}
            </h2>
            <p className="text-lg opacity-90">
              {getBenefits()}
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {locale === 'me' ? 'Spreman da počneš?' : locale === 'tr' ? 'Başlamaya Hazır Mısınız?' : 'Ready to Get Started?'}
            </h2>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105"
            >
              <span>{locale === 'me' ? 'Kontaktiraj nas' : locale === 'tr' ? 'Bize Ulaşın' : 'Contact Us'}</span>
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
