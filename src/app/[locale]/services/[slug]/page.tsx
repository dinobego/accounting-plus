'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const servicesContent: { [key: string]: any } = {
  'company-formation': {
    titleMe: '🏢 Osnivanje preduzeća',
    titleEn: '🏢 Company Formation',
    titleTr: '🏢 Şirket Kuruluşu',
    descriptionMe: 'Osnivanje preduzeća predstavlja ključni korak ka Vašem poslovnom uspjehu. Naš tim pruža kompletnu podršku u procesu registracije, pravnog savjetovanja i administrativne pripreme.',
    descriptionEn: 'Company formation is a key step towards your business success. Our team provides complete support in registration, legal consultation and administrative preparation.',
    descriptionTr: 'Şirket kurulması, ticari başarınıza giden önemli bir adımdır. Ekibimiz, kayıt, yasal danışmanlık ve idari hazırlık sürecinde tam destek sağlar.',
    contentMe: `
      <p>Bez obzira da li osnivate DOO, preduzetničku radnju, ortačko društvo ili filijalu strane kompanije, mi preuzimamo sve obaveze oko papirologije i komunikacije sa državnim institucijama.</p>
      
      <p>Pomažemo vam da izaberete najpovoljniji pravni oblik, pripremimo i podnesemo sve neophodne akte, otvorimo poslovni račun, te vas uvedemo u poreski sistem Crne Gore.</p>
      
      <h3>Naše usluge uključuju:</h3>
      <ul>
        <li>Registraciju pravnog lica u Centralnom registru privrednih subjekata (CRPS).</li>
        <li>Izradu osnivačkih akata i internih pravilnika.</li>
        <li>Savjetovanje o izboru poreskog i pravnog statusa.</li>
        <li>Prijavu u sistem PDV-a i poreske evidencije.</li>
        <li>Administrativnu podršku prilikom pokretanja poslovanja.</li>
      </ul>
      
      <h3>Zašto izabrati nas:</h3>
      <p>Uštedite vrijeme i novac, izbjegnite greške u procedurama i budite sigurni da Vaše preduzeće posluje u skladu sa zakonom od prvog dana.</p>
    `,
    contentEn: `
      <p>Whether you are establishing an LLC, sole proprietorship, partnership or branch of a foreign company, we take care of all paperwork and communication with state institutions.</p>
      
      <p>We help you choose the most favorable legal form, prepare and submit all necessary documents, open a business account, and introduce you to the tax system of Montenegro.</p>
      
      <h3>Our services include:</h3>
      <ul>
        <li>Legal entity registration in the Central Business Register (CRPS)</li>
        <li>Drafting founding documents and internal regulations</li>
        <li>Consultation on choice of tax and legal status</li>
        <li>Registration in VAT and tax register system</li>
        <li>Administrative support when starting a business</li>
      </ul>
      
      <h3>Why choose us:</h3>
      <p>Save time and money, avoid procedural mistakes and be sure your business operates in accordance with the law from day one.</p>
    `,
    contentTr: `
      <p>İster LLC, ister tek şahıs işletmesi, ister ortaklık ister yabancı şirketin şubesi kuruyor olun, tüm büro işleri ve devlet kurumlarıyla iletişimle ilgileniyoruz.</p>
      
      <p>En uygun yasal formu seçmenize, gerekli tüm belgeleri hazırlayıp sunmanıza, ticari hesap açmanıza ve Karadağ vergi sistemine katılmanıza yardımcı oluyoruz.</p>
      
      <h3>Hizmetlerimiz şunları içerir:</h3>
      <ul>
        <li>Merkezi İşletme Sicili (CRPS) nde tüzel kişi kaydı</li>
        <li>Kuruluş belgeleri ve iç yönetmeliklerin hazırlanması</li>
        <li>Vergi ve yasal statü seçimi hakkında danışmanlık</li>
        <li>KDV ve vergi sicil sistemine kayıt</li>
        <li>İşletmeyi başlatırken idari destek</li>
      </ul>
      
      <h3>Neden bizi seçin:</h3>
      <p>Zaman ve paradan tasarruf edin, prosedür hatalarından kaçının ve işletmenizin birinci günden itibaren kanuna uygun çalıştığından emin olun.</p>
    `
  },
  'residence-work-permits': {
    titleMe: '🛂 Dozvole za boravak i rad',
    titleEn: '🛂 Residence and Work Permits',
    titleTr: '🛂 İkamet ve Çalışma İzinleri',
    descriptionMe: 'Crna Gora postaje sve privlačnija destinacija za strance. Međutim, proces pribavljanja dozvola može biti složen. Naš tim pruža potpunu podršku.',
    descriptionEn: 'Montenegro is becoming increasingly attractive for foreigners. However, the process of obtaining permits can be complex. Our team provides complete support.',
    descriptionTr: 'Karadağ, yabancılar için giderek daha çekici hale geliyor. Ancak izin alma süreci karmaşık olabilir. Ekibimiz tam destek sağlar.',
    contentMe: `
      <p>Mi preuzimamo komunikaciju sa nadležnim institucijama, pripremamo i predajemo svu potrebnu dokumentaciju i obezbjeđujemo da proces teče brzo i bez prepreka.</p>
      
      <h3>Usluge koje pružamo:</h3>
      <ul>
        <li>Priprema i predaja dokumentacije za privremeni boravak.</li>
        <li>Dobijanje i produženje radnih dozvola.</li>
        <li>Savjetovanje o izboru tipa boravka (radni, investitorski, porodični).</li>
        <li>Prijava stranaca u sistem MUP-a i Poreske uprave.</li>
      </ul>
      
      <h3>Naša prednost:</h3>
      <p>Uz našu podršku, dobijate sve potrebne dozvole efikasno, zakonito i bez nepotrebnih troškova, uz garanciju profesionalnog pristupa i diskrecije.</p>
    `,
    contentEn: `
      <p>We handle communication with competent institutions, prepare and submit all necessary documentation and ensure the process runs smoothly and without obstacles.</p>
      
      <h3>Services we provide:</h3>
      <ul>
        <li>Preparation and submission of documentation for temporary residence</li>
        <li>Obtaining and extending work permits</li>
        <li>Consultation on choice of residence type (work, investment, family)</li>
        <li>Registration of foreigners in the Ministry of Interior and Tax Administration systems</li>
      </ul>
      
      <h3>Our advantage:</h3>
      <p>With our support, you get all necessary permits efficiently, legally and without unnecessary costs, with guaranteed professional approach and discretion.</p>
    `,
    contentTr: `
      <p>Yetkin kurumlarla iletişimi üstleniriz, gerekli tüm belgeleri hazırlayıp sunarız ve işlemin sorunsuz ve engelsiz ilerlemesini sağlarız.</p>
      
      <h3>Sağladığımız hizmetler:</h3>
      <ul>
        <li>Geçici ikamet için belgelendirme hazırlığı ve sunumu</li>
        <li>Çalışma izinlerinin alınması ve uzatılması</li>
        <li>İkamet türü seçimi hakkında danışmanlık (iş, yatırım, aile)</li>
        <li>Yabancıların İçişleri Bakanlığı ve Vergi İdaresi sistemlerine kaydı</li>
      </ul>
      
      <h3>Avantajımız:</h3>
      <p>Desteğimizle, tüm gerekli izinleri verimli, yasal ve gereksiz masraflar olmadan, profesyonel yaklaşım ve gizlilik garantisiyle elde edersiniz.</p>
    `
  },
  'bookkeeping': {
    titleMe: '📘 Knjigovodstvene usluge',
    titleEn: '📘 Bookkeeping Services',
    titleTr: '📘 Muhasebe Hizmetleri',
    descriptionMe: 'Pouzdano knjigovodstvo je temelj svakog uspješnog poslovanja. Naš računovodstveni tim obezbjeđuje precizno vođenje poslovnih knjiga.',
    descriptionEn: 'Reliable bookkeeping is the foundation of every successful business. Our accounting team ensures precise maintenance of business books.',
    descriptionTr: 'Güvenilir muhasebe, her başarılı işletmenin temelidir. Muhasebe ekibimiz işletme defterlerinin kesin bir şekilde tutulmasını sağlar.',
    contentMe: `
      <p>Radimo sa svim pravnim formama – od malih preduzetnika do velikih kompanija. Naša misija je da Vam omogućimo jasan uvid u vaše finansijsko stanje.</p>
      
      <h3>Šta obuhvata naša usluga:</h3>
      <ul>
        <li>Knjiženje svih poslovnih događaja.</li>
        <li>Obrada obračuna plata i doprinosa.</li>
        <li>Izrada mjesečnih i godišnjih finansijskih izvještaja.</li>
        <li>Poreske prijave (PDV, dohodak, dobit).</li>
        <li>Interno i eksterno finansijsko izvještavanje.</li>
      </ul>
      
      <h3>Zašto odabrati nas:</h3>
      <p>Tačnost, diskrecija i posvećenost svakom klijentu. Dok mi brinemo o brojkama, vi se možete posvetiti razvoju Vašeg biznisa.</p>
    `,
    contentEn: `
      <p>We work with all legal forms – from small entrepreneurs to large companies. Our mission is to give you a clear insight into your financial situation.</p>
      
      <h3>What our service includes:</h3>
      <ul>
        <li>Recording all business events</li>
        <li>Processing payroll and contributions calculations</li>
        <li>Preparation of monthly and annual financial reports</li>
        <li>Tax returns (VAT, income, profit)</li>
        <li>Internal and external financial reporting</li>
      </ul>
      
      <h3>Why choose us:</h3>
      <p>Accuracy, discretion and dedication to every client. While we take care of the numbers, you can focus on developing your business.</p>
    `,
    contentTr: `
      <p>Küçük girişimcilerden büyük şirketlere kadar tüm yasal formlarla çalışıyoruz. Amacımız size mali durumunuz hakkında net bir fikir vermektir.</p>
      
      <h3>Hizmetimiz neler içerir:</h3>
      <ul>
        <li>Tüm ticari olayların kaydedilmesi</li>
        <li>Bordro ve katkı hesaplamasının işlenmesi</li>
        <li>Aylık ve yıllık mali raporların hazırlanması</li>
        <li>Vergi beyannameleri (KDV, gelir, kar)</li>
        <li>İç ve dış mali raporlama</li>
      </ul>
      
      <h3>Neden bizi seçin:</h3>
      <p>Doğruluk, gizlilik ve her müşteriye adanmışlık. Biz rakamlara bakarken siz işletmenizi geliştirmeye odaklanabilirsiniz.</p>
    `
  },
  'tax-consulting': {
    titleMe: '💰 Poresko savjetovanje',
    titleEn: '💰 Tax Consulting',
    titleTr: '💰 Vergi Danışmanlığı',
    descriptionMe: 'Poreski sistem Crne Gore često se mijenja, a pravilno planiranje poreza presudno je za finansijsku stabilnost.',
    descriptionEn: 'Montenegro tax system often changes and proper tax planning is crucial for financial stability.',
    descriptionTr: 'Karadağ vergi sistemi sık sık değişir ve uygun vergi planlaması finansal istikrar için çok önemlidir.',
    contentMe: `
      <p>Naši stručnjaci za poreze pomažu Vam da optimizujete svoje obaveze i spriječite nepotrebne troškove. Kroz detaljnu analizu Vašeg poslovanja, predlažemo strategije koje omogućavaju zakonito smanjenje poreskog opterećenja.</p>
      
      <h3>Naše usluge uključuju:</h3>
      <ul>
        <li>Poresko planiranje i optimizaciju troškova.</li>
        <li>Savjetovanje o poreskim olakšicama.</li>
        <li>Pripremu poreskih prijava i obračuna.</li>
        <li>Podršku tokom poreskih kontrola i inspekcija.</li>
      </ul>
      
      <h3>Prednosti:</h3>
      <p>Zahvaljujući našoj ekspertizi, Vaša firma posluje u skladu sa propisima, a Vi imate potpunu kontrolu nad svojim finansijama.</p>
    `,
    contentEn: `
      <p>Our tax experts help you optimize your obligations and prevent unnecessary costs. Through detailed analysis of your business, we suggest strategies that enable legal reduction of tax burden.</p>
      
      <h3>Our services include:</h3>
      <ul>
        <li>Tax planning and cost optimization</li>
        <li>Consultation on tax relief measures</li>
        <li>Preparation of tax returns and calculations</li>
        <li>Support during tax audits and inspections</li>
      </ul>
      
      <h3>Benefits:</h3>
      <p>Thanks to our expertise, your company operates in accordance with regulations and you have complete control over your finances.</p>
    `,
    contentTr: `
      <p>Vergi danışmanlarımız yükümlülüklerinizi optimize etmenize ve gereksiz masrafları engellemenize yardımcı olur. İşletmenizin ayrıntılı analiziyle vergi yükünün yasal olarak azaltılmasını sağlayan stratejiler önerilir.</p>
      
      <h3>Hizmetlerimiz şunları içerir:</h3>
      <ul>
        <li>Vergi planlaması ve maliyet optimizasyonu</li>
        <li>Vergi kolaylıkları hakkında danışmanlık</li>
        <li>Vergi beyannameleri ve hesaplamaların hazırlanması</li>
        <li>Vergi denetimleri ve incelemeleri sırasında destek</li>
      </ul>
      
      <h3>Avantajlar:</h3>
      <p>Uzmanlığımız sayesinde şirketiniz yönetmeliklere uygun çalışır ve mali işlerinizin tam kontrolünü sağlarsınız.</p>
    `
  },
  'final-reports': {
    titleMe: '📊 Završni finansijski izveštaji za privredna društva',
    titleEn: '📊 Final Reports for Entrepreneurs',
    titleTr: '📊 Girişimciler için Nihai Raporlar',
    descriptionMe: 'Na kraju svake poslovne godine, preduzeća su u obavezi da predaju završne izvještaje. Naš tim priprema sveobuhvatne i tačne bilanse.',
    descriptionEn: 'At the end of each business year, companies are required to submit final reports. Our team prepares comprehensive and accurate financial statements.',
    descriptionTr: 'Her muhasebe yılının sonunda şirketler nihai raporları sunmak zorundadır. Ekibimiz kapsamlı ve doğru mali tabloları hazırlar.',
    contentMe: `
      <p>Pored same izrade, pružamo i analizu rezultata poslovanja kako biste imali jasnu sliku o finansijskom zdravlju vašeg biznisa.</p>
      
      <h3>Usluga obuhvata:</h3>
      <ul>
        <li>Izradu godišnjih finansijskih izvještaja.</li>
        <li>Bilans stanja, bilans uspjeha i dodatne napomene.</li>
        <li>Obračun i prijavu poreza na dobit.</li>
        <li>Izvještaje za potrebe menadžmenta i banaka.</li>
      </ul>
      
      <h3>Prednosti:</h3>
      <p>Sigurnost u tačnost podataka i profesionalan pristup koji eliminiše rizik od grešaka i sankcija.</p>
    `,
    contentEn: `
      <p>In addition to preparation, we also provide analysis of business results so you have a clear picture of the financial health of your business.</p>
      
      <h3>Service includes:</h3>
      <ul>
        <li>Preparation of annual financial statements</li>
        <li>Balance sheet, income statement and additional notes</li>
        <li>Calculation and submission of profit tax</li>
        <li>Reports for management and bank needs</li>
      </ul>
      
      <h3>Benefits:</h3>
      <p>Confidence in data accuracy and professional approach that eliminates the risk of errors and penalties.</p>
    `,
    contentTr: `
      <p>Hazırlamanın yanı sıra, işletmenizin mali sağlığının net bir resmini elde etmek için ticari sonuçların analizini de sağlarız.</p>
      
      <h3>Hizmet şunları içerir:</h3>
      <ul>
        <li>Yıllık mali raporların hazırlanması</li>
        <li>Bilanço, gelir tablosu ve ek notlar</li>
        <li>Kurumlar vergisinin hesaplanması ve sunumu</li>
        <li>Yönetim ve banka ihtiyaçları için raporlar</li>
      </ul>
      
      <h3>Avantajlar:</h3>
      <p>Veri doğruluğuna güven ve hatalar ile cezalardan kaçınan profesyonel yaklaşım.</p>
    `
  },
  'business-analysis': {
    titleMe: '📈 Analize poslovanja',
    titleEn: '📈 Business Analysis',
    titleTr: '📈 İş Analizleri',
    descriptionMe: 'U poslovnom okruženju, donošenje odluka bez jasnih podataka može biti rizično. Naše analize poslovanja daju Vam detaljan uvid.',
    descriptionEn: 'In today business environment, making decisions without clear data can be risky. Our business analysis provides you with detailed insight.',
    descriptionTr: 'Günümüzün iş ortamında net veriler olmadan karar almak riskli olabilir. İşletme analizimiz size ayrıntılı bir fikir verir.',
    contentMe: `
      <p>Na osnovu realnih podataka, pomažemo Vam da prepoznate prilike za rast, smanjite troškove i unaprijedite profitabilnost.</p>
      
      <h3>Šta nudimo:</h3>
      <ul>
        <li>Analizu finansijskih pokazatelja.</li>
        <li>Procjenu profitabilnosti i rizika.</li>
        <li>Analizu novčanih tokova.</li>
        <li>Komparativne analize sa tržištem.</li>
        <li>Preporuke za unapređenje poslovanja.</li>
      </ul>
      
      <h3>Prednosti:</h3>
      <p>Donošenje odluka zasnovanih na činjenicama i podacima, a ne na pretpostavkama.</p>
    `,
    contentEn: `
      <p>Based on real data, we help you recognize growth opportunities, reduce costs and improve profitability.</p>
      
      <h3>What we offer:</h3>
      <ul>
        <li>Analysis of financial indicators</li>
        <li>Assessment of profitability and risk</li>
        <li>Cash flow analysis</li>
        <li>Comparative market analysis</li>
        <li>Recommendations for business improvement</li>
      </ul>
      
      <h3>Benefits:</h3>
      <p>Making decisions based on facts and data, not assumptions.</p>
    `,
    contentTr: `
      <p>Gerçek verilere dayanarak, büyüme fırsatlarını tanımanıza, maliyetleri azaltmanıza ve kârlılığı iyileştirmenize yardımcı oluyoruz.</p>
      
      <h3>Sunduğumuz:</h3>
      <ul>
        <li>Finansal göstergelerin analizi</li>
        <li>Kârlılık ve risk değerlendirmesi</li>
        <li>Nakit akış analizi</li>
        <li>Pazarla karşılaştırmalı analiz</li>
        <li>İş iyileştirmesi için tavsiyeler</li>
      </ul>
      
      <h3>Avantajlar:</h3>
      <p>Varsayımlar değil, gerçeklere ve verilere dayalı karar alma.</p>
    `
  },
  'electronic-documents': {
    titleMe: '🧾 Elektronsko slanje i prijem dokumentacije',
    titleEn: '🧾 Electronic Document Management',
    titleTr: '🧾 Elektronik Belge Yönetimi',
    descriptionMe: 'Digitalizacija je budućnost poslovanja, a mi Vam pomažemo da budete korak ispred sa elektronskim slanjem i prijemom dokumenata.',
    descriptionEn: 'Digitalization is the future of business and we help you stay ahead with electronic document sending and receiving.',
    descriptionTr: 'Dijitalleşme işletmenin geleceğidir ve elektronik belge gönderme ve almakla bir adım öne geçmenize yardımcı oluyoruz.',
    contentMe: `
      <p>Naš sistem elektronskog slanja i prijema dokumenata omogućava brzu, sigurnu i efikasnu razmjenu informacija sa državnim institucijama i partnerima.</p>
      
      <h3>Naša rješenja omogućavaju:</h3>
      <ul>
        <li>Elektronsko potpisivanje dokumenata.</li>
        <li>Sigurno arhiviranje i čuvanje podataka.</li>
        <li>Integraciju sa e-servisima Vlade Crne Gore.</li>
        <li>Potpuno digitalno knjigovodstvo.</li>
      </ul>
      c
      <h3>Prednosti:</h3>
      <p>Ušteda vremena, smanjenje troškova i sigurnost podataka – sve na jednom mjestu.</p>
    `,
    contentEn: `
      <p>Our electronic document sending and receiving system enables fast, secure and efficient information exchange with government institutions and partners.</p>
      
      <h3>Our solutions enable:</h3>
      <ul>
        <li>Electronic document signing</li>
        <li>Secure archiving and data retention</li>
        <li>Integration with Government of Montenegro e-services</li>
        <li>Completely digital bookkeeping</li>
      </ul>
      
      <h3>Benefits:</h3>
      <p>Time saving, cost reduction and data security – all in one place.</p>
    `,
    contentTr: `
      <p>Elektronik belge gönderme ve alma sistemimiz, devlet kurumları ve ortaklarla hızlı, güvenli ve verimli bilgi alışverişini sağlar.</p>
      
      <h3>Çözümlerimiz sağlar:</h3>
      <ul>
        <li>Elektronik belge imzalama</li>
        <li>Güvenli arşivleme ve veri saklama</li>
        <li>Karadağ Hükümeti e-hizmetleriyle entegrasyon</li>
        <li>Tamamen dijital muhasebe</li>
      </ul>
      
      <h3>Avantajlar:</h3>
      <p>Zaman tasarrufu, maliyet azalması ve veri güvenliği – hepsi tek yerde.</p>
    `
  },
  'real-estate': {
    titleMe: '🏘️ Usluge nekretnina',
    titleEn: '🏘️ Real Estate Services',
    titleTr: '🏘️ Gayrimenkul Hizmetleri',
    descriptionMe: 'Pružamo profesionalnu podršku u svim pitanjima koja se tiču kupovine, prodaje, registracije i oporezivanja nekretnina.',
    descriptionEn: 'We provide professional support in all matters related to purchase, sale, registration and taxation of real estate.',
    descriptionTr: 'Gayrimenkul alımı, satışı, kaydı ve vergilendirilmesiyle ilgili tüm konularda profesyonel destek sağlarız.',
    contentMe: `
      <p>Naš tim kombinuje znanje iz oblasti prava, poreza i računovodstva kako bi Vaš proces bio siguran i transparentan.</p>
      
      <h3>Šta radimo za vas:</h3>
      <ul>
        <li>Registracija vlasništva u katastaru.</li>
        <li>Poreske analize i savjetovanje.</li>
        <li>Provjera dokumentacije i pravnog statusa.</li>
        <li>Procjena vrijednosti i pomoć u transakcijama.</li>
      </ul>
      
      <h3>Prednosti:</h3>
      <p>Bez rizika i neizvjesnosti – Vaš imovinski interes zaštićen je profesionalnim pristupom i iskustvom.</p>
    `,
    contentEn: `
      <p>Our team combines knowledge from law, tax and accounting to make your process safe and transparent.</p>
      
      <h3>What we do for you:</h3>
      <ul>
        <li>Property registration in the cadastre</li>
        <li>Tax analysis and consultation</li>
        <li>Verification of documentation and legal status</li>
        <li>Valuation and assistance in transactions</li>
      </ul>
      
      <h3>Benefits:</h3>
      <p>No risk and uncertainty – your property interests are protected by professional approach and experience.</p>
    `,
    contentTr: `
      <p>Ekibimiz, hukuk, vergi ve muhasebe bilgisini birleştirerek sürecinizi güvenli ve şeffaf hale getirir.</p>
      
      <h3>Sizin için neler yaparız:</h3>
      <ul>
        <li>Tapu ve kadastral kayıt</li>
        <li>Vergi analiizi ve danışmanlık</li>
        <li>Belge ve yasal durum doğrulaması</li>
        <li>Değerleme ve işlem desteği</li>
      </ul>
      
      <h3>Avantajlar:</h3>
      <p>Risk ve belirsizlik yok – emlak menfaatiniz profesyonel yaklaşım ve deneyime tarafından korunur.</p>
    `
  },
  'employment-agency-services': {
    titleMe: '👥 Posredovanje u zapošljavanju',
    titleEn: '👥 Employment Agency Services',
    titleTr: '👥 İstihdam Ajansı Hizmetleri',
    descriptionMe: 'Kvalitetan kadar je ključ svakog uspjeha. Pomažemo poslodavcima da pronađu pouzdane i kompetentne zaposlene.',
    descriptionEn: 'Quality personnel is the key to every success. We help employers find reliable and competent employees.',
    descriptionTr: 'Kaliteli personel her başarının anahtarıdır. İşverenlerin güvenilir ve yetkin çalışanlar bulmasına yardımcı oluyoruz.',
    contentMe: `
      <p>Pomažemo kandidatima da dođu do pravih prilika za rad sa pouzdanim i profesionalnim partnerima.</p>
      
      <h3>Usluga obuhvata:</h3>
      <ul>
        <li>Selekciju i regrutaciju kandidata.</li>
        <li>Pripremu ugovora o radu i dokumentacije.</li>
        <li>Administrativno vođenje zaposlenih.</li>
        <li>Savjetovanje u oblasti ljudskih resursa.</li>
      </ul>
      
      <h3>Prednosti:</h3>
      <p>Brže zapošljavanje, smanjenje fluktuacije i ušteda resursa uz profesionalno posredovanje.</p>
    `,
    contentEn: `
      <p>We help candidates find the right job opportunities with reliable and professional partners.</p>
      
      <h3>Service includes:</h3>
      <ul>
        <li>Candidate selection and recruitment</li>
        <li>Preparation of employment contracts and documentation</li>
        <li>Administrative management of employees</li>
        <li>Consultation in human resources</li>
      </ul>
      
      <h3>Benefits:</h3>
      <p>Faster employment, reduced turnover and resource savings with professional mediation.</p>
    `,
    contentTr: `
      <p>Adayların güvenilir ve profesyonel ortaklarla doğru iş fırsatlarını bulmasına yardımcı oluyoruz.</p>
      
      <h3>Hizmet şunları içerir:</h3>
      <ul>
        <li>Aday seçimi ve işe alımı</li>
        <li>Çalışma sözleşmesi ve belgelendirme hazırlığı</li>
        <li>Çalışanların idari yönetimi</li>
        <li>İnsan kaynakları danışmanlığı</li>
      </ul>
      
      <h3>Avantajlar:</h3>
      <p>Daha hızlı işe alım, azalan devir hızı ve profesyonel aracılıkla kaynak tasarrufu.</p>
    `
  },
  'visa': {
    titleMe: '🌍 Usluge viziranja',
    titleEn: '🌍 Visa Services',
    titleTr: '🌍 Vize Hizmetleri',
    descriptionMe: 'Nudimo potpunu podršku u pribavljanju viza i drugih putnih dokumenata za Crnu Goru i inostranstvo.',
    descriptionEn: 'We offer complete support in obtaining visas and other travel documents for Montenegro and abroad.',
    descriptionTr: 'Karadağ ve yurt dışı için vize ve diğer seyahat belgelerinin alınmasında tam destek sunuyoruz.',
    contentMe: `
      <p>Bilo da se radi o poslovnim, radnim ili turističkim vizama, naš tim vas vodi kroz cijeli proces sa stručnošću i diskrecijom.</p>
      
      <h3>Usluga uključuje:</h3>
      <ul>
        <li>Savjetovanje o vrsti i uslovima vize.</li>
        <li>Pripremu i provjeru dokumentacije.</li>
        <li>Praćenje statusa zahtjeva i obnavljanje viza.</li>
        <li>Koordinaciju sa ambasadama i institucijama.</li>
      </ul>
      
      <h3>Prednosti:</h3>
      <p>Brzo, sigurno i profesionalno — bez stresa i nepotrebnih odbijanja.</p>
    `,
    contentEn: `
      <p>Whether it's business, work or tourist visas, our team guides you through the entire process with expertise and discretion.</p>
      
      <h3>Service includes:</h3>
      <ul>
        <li>Consultation on visa type and requirements</li>
        <li>Preparation and verification of documentation</li>
        <li>Tracking request status and visa renewals</li>
        <li>Coordination with embassies and institutions</li>
      </ul>
      
      <h3>Benefits:</h3>
      <p>Fast, safe and professional — without stress and unnecessary rejections.</p>
    `,
    contentTr: `
      <p>İster iş ister çalışma ister turist vizesi olsun, ekibimiz tüm süreci uzmanlık ve gizlilikle sizi rehber eder.</p>
      
      <h3>Hizmet şunları içerir:</h3>
      <ul>
        <li>Vize türü ve gereksinimler hakkında danışmanlık</li>
        <li>Belgelendirme hazırlığı ve doğrulaması</li>
        <li>İstek durumunun takibi ve vize yenilemeleri</li>
        <li>Elçilik ve kurumlarla koordinasyon</li>
      </ul>
      
      <h3>Avantajlar:</h3>
      <p>Hızlı, güvenli ve profesyonel — stres ve gereksiz reddetmeler olmadan.</p>
    `
  }
};

export default function ServicePage() {
  const params = useParams();
  const locale = params.locale as string;
  const slug = params.slug as string;
  
  const content = servicesContent[slug];

  if (!content) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {locale === 'me' ? 'Usluga nije pronađena' : locale === 'tr' ? 'Hizmet bulunamadı' : 'Service not found'}
            </h1>
            <Link
              href="/services"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {locale === 'me' ? 'Nazad na usluge' : locale === 'tr' ? 'Hizmetlere geri dön' : 'Back to services'}
            </Link>
          </div>
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

  const getContent = () => {
    if (locale === 'me') return content.contentMe;
    if (locale === 'tr') return content.contentTr;
    return content.contentEn;
  };

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-5xl font-bold text-gray-900 mb-6">
              {getTitle()}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {getDescription()}
            </p>
          </motion.div>

                  {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16"
          >
            <style>{`
              .service-content h3 {
                font-size: 1.5rem;
                font-weight: bold;
                color: #111827;
                margin-top: 1.5rem;
                margin-bottom: 1rem;
                border-bottom: 3px solid #2563eb;
                padding-bottom: 0.75rem;
              }

              .service-content p {
                color: #4b5563;
                line-height: 1.8;
                margin-bottom: 1rem;
                font-size: 1.1rem;
              }

              .service-content ul {
                list-style: none;
                padding: 0;
                margin-bottom: 1.5rem;
              }

              .service-content li {
                color: #374151;
                margin-bottom: 0.75rem;
                padding-left: 2rem;
                position: relative;
                font-size: 1.05rem;
                line-height: 1.6;
              }

              .service-content li:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #2563eb;
                font-weight: bold;
                font-size: 1.3rem;
              }

              .service-content li strong {
                color: #1f2937;
              }
            `}</style>
            
            <div className="service-content" dangerouslySetInnerHTML={{ __html: getContent() }} />
          </motion.div>


                  {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
              {locale === 'me' ? 'Spremni da počnete?' : locale === 'tr' ? 'Başlamaya Hazır Mısınız?' : 'Ready to Get Started?'}
            </h2>
            <p className="text-lg mb-8 opacity-90">
              {locale === 'me' ? 'Kontaktirajte nas i dogovorite se za konsultacije.' : locale === 'tr' ? 'Bize ulaşın ve danışmanlık için randevu alın.' : 'Contact us and schedule a consultation.'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all hover:scale-105"
            >
              <span>{locale === 'me' ? 'Kontaktiraj nas' : locale === 'tr' ? 'İletişime geç' : 'Contact Us'}</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>

        </div>
      </div>

      <Footer />
    </>
  );
}
