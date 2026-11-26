export const slugTranslations: { [key: string]: { [key: string]: string } } = {
  'what-is-balance-sheet': {
    en: 'what-is-balance-sheet',
    tr: 'bilanco-nedir',
    me: 'sta-je-bilans-stanja',
    sq: 'cfare-eshte-bilanci-i-gjendjes',
  },
  'how-to-open-business': {
    en: 'how-to-open-business',
    tr: 'karadag-sirket-acma',
    me: 'kako-otvoriti-preduzece',
    sq: 'si-te-hapni-nje-kompani-ne-mal-te-zi',
  },
  'corporate-income-tax': {
    en: 'corporate-income-tax',
    tr: 'kurumlar-vergisi',
    me: 'porez-na-dobit',
    sq: 'tatimi-mbi-fitimin',
  },
  'vat-obligations-2025': {
    en: 'vat-obligations-2025',
    tr: 'kdv-yukumlulekleri-2025',
    me: 'pdv-obaveze-2025',
    sq: 'detyrimet-e-pdv-se-2025',
  },
  'bookkeeping-common-mistakes': {
    en: 'bookkeeping-common-mistakes',
    tr: 'defteri-kebir-hatalari',
    me: 'vodenje-knjiga-greske',
    sq: 'gabimet-ne-mbajtjen-e-librave',
  },
  'year-end-checklist': {
    en: 'year-end-checklist',
    tr: 'yil-sonu-kontrol-listesi',
    me: 'checklista-kraju-godine',
    sq: 'lista-e-kontrollit-ne-fund-te-vitit',
  },
  'payroll-tax-calculation': {
    en: 'payroll-tax-calculation',
    tr: 'bordro-vergi-hesaplamasi',
    me: 'obracun-poreza-na-zarade',
    sq: 'llogaritja-e-tatimit-mbi-pagat',
  },
  'tips-working-accountant': {
    en: 'tips-working-accountant',
    tr: 'muhasebeci-ipuclari',
    me: '10-saveta-saradnja-racunovedjom',
    sq: '10-keshilla-per-bashkepunim-me-kontabilistin',
  },
  'interpreting-financial-statements': {
    en: 'interpreting-financial-statements',
    tr: 'mali-tablolar-yorumlama',
    me: 'tumacenje-finansijskih-izvestaaja',
    sq: 'si-te-interpretoni-pasqyrat-financiare',
  },
  'budget-planning-small-business': {
    en: 'budget-planning-small-business',
    tr: 'kucuk-isletme-butce',
    me: 'planiranje-budzeta',
    sq: 'planifikimi-i-buxhetit',
  },
  'when-need-accountant': {
    en: 'when-need-accountant',
    tr: 'muhasebeci-gerekli',
    me: 'kada-je-potreban-profesionalni-racunovoda',
    sq: 'kur-ju-duhet-nje-kontabilist',
  },
  'bookkeeping-vs-accounting': {
    en: 'bookkeeping-vs-accounting',
    tr: 'defter-tutma-muhasebe',
    me: 'razlika-knjigovodstva-racunovodstva',
    sq: 'ndryshimi-mes-librave-dhe-kontabilitetit',
  },
  'how-to-choose-accountant': {
    en: 'how-to-choose-accountant',
    tr: 'muhasebeci-secme',
    me: 'kako-izabrati-racunovodjeu',
    sq: 'si-te-zgjidhni-kontabilistin',
  },
  'document-retention': {
    en: 'document-retention',
    tr: 'belge-saklama',
    me: 'cuvanje-dokumenata',
    sq: 'ruajtja-e-dokumenteve',
  },
};

export function getPostIdFromSlug(slug: string, locale: string): string | null {
  for (const [postId, slugs] of Object.entries(slugTranslations)) {
    if (slugs[locale as keyof typeof slugs] === slug) {
      return postId;
    }
  }
  return null;
}

export function getSlugForLocale(postId: string, locale: string): string | null {
  return slugTranslations[postId]?.[locale as keyof typeof slugTranslations[typeof postId]] || null;
}
