export const slugTranslations: { [key: string]: { [key: string]: string } } = {
  'what-is-balance-sheet': {
    en: 'what-is-balance-sheet',
    tr: 'bilanco-nedir',
    me: 'sta-je-bilans-stanja'
  },
  'how-to-open-business': {
    en: 'how-to-open-business',
    tr: 'karadag-sirket-acma',
    me: 'kako-otvoriti-preduzece'
  },
  'corporate-income-tax': {
    en: 'corporate-income-tax',
    tr: 'kurumlar-vergisi',
    me: 'porez-na-dobit'
  },
  'vat-obligations-2025': {
    en: 'vat-obligations-2025',
    tr: 'kdv-yukumlulekleri-2025',
    me: 'pdv-obaveze-2025'
  },
  'bookkeeping-common-mistakes': {
    en: 'bookkeeping-common-mistakes',
    tr: 'defteri-kebir-hatalari',
    me: 'vodenje-knjiga-greske'
  },
  'year-end-checklist': {
    en: 'year-end-checklist',
    tr: 'yil-sonu-kontrol-listesi',
    me: 'checklista-kraju-godine'
  },
  'payroll-tax-calculation': {
    en: 'payroll-tax-calculation',
    tr: 'bordro-vergi-hesaplamasi',
    me: 'obracun-poreza-na-zarade'
  },
  'tips-working-accountant': {
    en: 'tips-working-accountant',
    tr: 'muhasebeci-ipuclari',
    me: '10-saveta-saradnja-racunovedjom'
  },
  'interpreting-financial-statements': {
    en: 'interpreting-financial-statements',
    tr: 'mali-tablolar-yorumlama',
    me: 'tumacenje-finansijskih-izvestaaja'
  },
  'budget-planning-small-business': {
    en: 'budget-planning-small-business',
    tr: 'kucuk-isletme-butce',
    me: 'planiranje-budzeta'
  },
  'when-need-accountant': {
    en: 'when-need-accountant',
    tr: 'muhasebeci-gerekli',
    me: 'kada-je-potreban-profesionalni-racunovoda'
  },
  'bookkeeping-vs-accounting': {
    en: 'bookkeeping-vs-accounting',
    tr: 'defter-tutma-muhasebe',
    me: 'razlika-knjigovodstva-racunovodstva'
  },
  'how-to-choose-accountant': {
    en: 'how-to-choose-accountant',
    tr: 'muhasebeci-secme',
    me: 'kako-izabrati-racunovodjeu'
  },
  'document-retention': {
    en: 'document-retention',
    tr: 'belge-saklama',
    me: 'cuvanje-dokumenata'
  }
};

// Obrnuta mapa - pronalazi ID iz slug-a
export function getPostIdFromSlug(slug: string, locale: string): string | null {
  for (const [postId, slugs] of Object.entries(slugTranslations)) {
    if (slugs[locale as keyof typeof slugs] === slug) {
      return postId;
    }
  }
  return null;
}

// Pronalazi slug za određeni jezik
export function getSlugForLocale(postId: string, locale: string): string | null {
  return slugTranslations[postId]?.[locale as keyof typeof slugTranslations[typeof postId]] || null;
}
