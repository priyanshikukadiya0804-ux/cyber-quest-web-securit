import {
  BossQuestion,
  HeaderMatchChallenge,
  MissionMeta,
  PhishingChallenge,
  SqlChallenge,
  SslChallenge,
  UrlChallenge,
  XssChallenge,
} from '../types/game';

export const MISSIONS_META: MissionMeta[] = [
  {
    id: 'url-detective',
    levelNumber: 1,
    title: {
      en: 'Level 1: URL Detective',
      gu: 'લેવલ ૧: URL ડિટેક્ટિવ (URL તપાસ)',
    },
    shortTitle: {
      en: 'URL Detective',
      gu: 'URL ડિટેક્ટિવ',
    },
    subtitle: {
      en: 'Inspect protocols, subdomains, lookalike spellings, and URL paths.',
      gu: 'Protocol, Subdomain, નકલી સ્પેલિંગ અને Path તપાસીને શંકાસ્પદ URL ઓળખો.',
    },
    topicLabel: 'URL Security',
    topicLabelGu: 'URL સુરક્ષા',
    totalQuestions: 5,
  },
  {
    id: 'phishing-hunter',
    levelNumber: 2,
    title: {
      en: 'Level 2: Phishing Hunter',
      gu: 'લેવલ ૨: Phishing હન્ટર (ફિશિંગ શિકારી)',
    },
    shortTitle: {
      en: 'Phishing Hunter',
      gu: 'Phishing હન્ટર',
    },
    subtitle: {
      en: 'Spot urgent social engineering, sender mismatches, and deceptive links.',
      gu: 'ઉતાવળ કરાવતા સંદેશા, ખોટા Sender Address અને નકલી લિંક્સ ઓળખો.',
    },
    topicLabel: 'Phishing Defense',
    topicLabelGu: 'Phishing રક્ષણ',
    totalQuestions: 5,
  },
  {
    id: 'sql-injection',
    levelNumber: 3,
    title: {
      en: 'Level 3: SQL Injection Awareness',
      gu: 'લેવલ ૩: SQL Injection જાગૃતિ',
    },
    shortTitle: {
      en: 'SQL Injection',
      gu: 'SQL Injection',
    },
    subtitle: {
      en: 'Visualize why string concatenation fails and why parameterized queries protect data.',
      gu: 'String Concatenation કેમ જોખમી છે અને Parameterized Query કેવી રીતે રક્ષણ આપે છે તે સમજો.',
    },
    topicLabel: 'SQL Injection',
    topicLabelGu: 'SQL Injection સુરક્ષા',
    totalQuestions: 5,
  },
  {
    id: 'xss-awareness',
    levelNumber: 4,
    title: {
      en: 'Level 4: XSS Awareness',
      gu: 'લેવલ ૪: XSS (Cross-Site Scripting) જાગૃતિ',
    },
    shortTitle: {
      en: 'XSS Awareness',
      gu: 'XSS જાગૃતિ',
    },
    subtitle: {
      en: 'Understand plain text rendering, output encoding, and safe input handling.',
      gu: 'Plain Text રેન્ડરિંગ, Output Encoding અને સુરક્ષિત Input Handling નો તફાવત સમજો.',
    },
    topicLabel: 'XSS Prevention',
    topicLabelGu: 'XSS નિવારણ',
    totalQuestions: 5,
  },
  {
    id: 'security-headers',
    levelNumber: 5,
    title: {
      en: 'Level 5: Security Headers',
      gu: 'લેવલ ૫: Security Headers (સુરક્ષા હેડર્સ)',
    },
    shortTitle: {
      en: 'Security Headers',
      gu: 'Security Headers',
    },
    subtitle: {
      en: 'Match real defensive threats to CSP, HSTS, X-Content-Type-Options, and more.',
      gu: 'CSP, HSTS અને X-Content-Type-Options જેવા HTTP Security Headers ને યોગ્ય સમસ્યા સાથે જોડો.',
    },
    topicLabel: 'Security Headers',
    topicLabelGu: 'Security Headers',
    totalQuestions: 5,
  },
  {
    id: 'ssl-https',
    levelNumber: 6,
    title: {
      en: 'Level 6: SSL & HTTPS Detective',
      gu: 'લેવલ ૬: SSL અને HTTPS ડિટેક્ટિવ',
    },
    shortTitle: {
      en: 'SSL & HTTPS',
      gu: 'SSL અને HTTPS',
    },
    subtitle: {
      en: 'Inspect TLS certificates and separate connection encryption from site trust.',
      gu: 'TLS સર્ટિફિકેટ તપાસો અને Encryption તેમજ Website Trust વચ્ચેનો તફાવત સમજો.',
    },
    topicLabel: 'SSL & HTTPS',
    topicLabelGu: 'SSL અને HTTPS',
    totalQuestions: 5,
  },
  {
    id: 'cyber-boss',
    levelNumber: 7,
    title: {
      en: 'Final Level: Cyber Boss',
      gu: 'અંતિમ લેવલ: Cyber Boss (સાયબર બોસ)',
    },
    shortTitle: {
      en: 'Cyber Boss',
      gu: 'Cyber Boss',
    },
    subtitle: {
      en: '10 randomized defense challenges combining every web security discipline.',
      gu: 'અગાઉના તમામ વિષયોને જોડતા ૧૦ રેન્ડમ વેબ સુરક્ષા પડકારો.',
    },
    topicLabel: 'Combined Defense',
    topicLabelGu: 'સંયુક્ત સુરક્ષા',
    totalQuestions: 10,
  },
];

export const URL_CHALLENGES: UrlChallenge[] = [
  {
    id: 'url-1',
    url: 'https://n0vapay-security-verify.example/account/login',
    protocol: 'https://',
    subdomain: '(none)',
    domain: 'n0vapay-security-verify.example',
    path: '/account/login',
    isSuspicious: true,
    clues: [
      {
        en: 'Uses "0" instead of "o" in "n0vapay" (typosquatting / homograph trick).',
        gu: '"novapay" માં "o" ને બદલે શૂન્ય "0" નો ઉપયોગ થયો છે (Typosquatting યુક્તિ).',
      },
      {
        en: 'Appends alarm words like "-security-verify" to pressure users into logging in.',
        gu: 'ડર ઊભો કરવા "-security-verify" જેવા શબ્દો Domain માં ઉમેરેલા છે.',
      },
    ],
    hint: {
      en: 'Look closely at the spelling of the brand name in the root domain.',
      gu: 'Root Domain માં બ્રાન્ડના નામનો સ્પેલિંગ ધ્યાનથી જુઓ.',
    },
    explanation: {
      en: 'Suspicious! Even though it uses HTTPS, attackers often register lookalike domains ("n0vapay" with a zero) combined with "security-verify" to mimic trusted payment portals.',
      gu: 'આ URL શંકાસ્પદ છે! ભલે HTTPS હોય, હુમલાખોરો વારંવાર નકલી સ્પેલિંગ ("n0vapay" માં 0) અને "security-verify" જેવા શબ્દો વાપરીને વિશ્વાસપાત્ર સાઇટની નકલ કરે છે.',
    },
  },
  {
    id: 'url-2',
    url: 'https://portal.meridian-bank.example/statements/2026',
    protocol: 'https://',
    subdomain: 'portal',
    domain: 'meridian-bank.example',
    path: '/statements/2026',
    isSuspicious: false,
    clues: [
      {
        en: 'Uses HTTPS protocol and a clean subdomain ("portal") directly under the primary domain.',
        gu: 'HTTPS પ્રોટોકોલ છે અને મુખ્ય Domain ("meridian-bank.example") ની નીચે યોગ્ય Subdomain ("portal") છે.',
      },
      {
        en: 'Remember: URL structure alone never guarantees complete safety — always verify the source and TLS certificate too.',
        gu: 'યાદ રાખો: માત્ર URL દેખાવથી ૧૦૦% સુરક્ષા નક્કી થતી નથી — હંમેશા સ્ત્રોત અને TLS સર્ટિફિકેટ પણ તપાસો.',
      },
    ],
    hint: {
      en: 'Check where the real registered domain sits right before ".example" and whether there are deceptive keywords.',
      gu: '".example" ની બરાબર પહેલાંનો મુખ્ય Domain તપાસો કે તેમાં કોઈ છેતરપિંડીભર્યા શબ્દો છે કે નહીં.',
    },
    explanation: {
      en: 'Appears Legitimate (Verify Context): The root domain "meridian-bank.example" is clean, uses HTTPS, and has no typosquatting. However, analysts never label any URL 100% safe from text alone—always confirm how you received the link.',
      gu: 'પ્રાથમિક રીતે યોગ્ય જણાય છે (સંદર્ભ ચકાસો): મુખ્ય Domain "meridian-bank.example" સ્વચ્છ છે અને HTTPS વાપરે છે. તેમ છતાં, માત્ર URL વાંચીને ક્યારેય સંપૂર્ણ સુરક્ષિત ન માનો — લિંક ક્યાંથી આવી તે પણ ચકાસો.',
    },
  },
  {
    id: 'url-3',
    url: 'https://login.clouddrive.example.account-check-center.test/auth',
    protocol: 'https://',
    subdomain: 'login.clouddrive.example',
    domain: 'account-check-center.test',
    path: '/auth',
    isSuspicious: true,
    clues: [
      {
        en: 'The trusted brand "clouddrive.example" is placed as a SUBDOMAIN, not the real root domain.',
        gu: 'વિશ્વાસપાત્ર નામ "clouddrive.example" ને માત્ર Subdomain તરીકે આગળ મૂક્યું છે.',
      },
      {
        en: 'The actual domain controlling the page is "account-check-center.test".',
        gu: 'ખરેખર આ પેજને નિયંત્રિત કરતો મુખ્ય Domain "account-check-center.test" છે.',
      },
    ],
    hint: {
      en: 'Read the domain from right to left before the first single "/" to find who actually owns this site.',
      gu: 'પ્રથમ "/" ની ડાબી બાજુના છેલ્લા બે ભાગ વાંચીને ખરો માલિક કોણ છે તે ઓળખો.',
    },
    explanation: {
      en: 'Suspicious! Putting a legitimate brand name in a subdomain ("login.clouddrive.example...") is a classic deception trick. The true owner is always the root domain right before the first slash ("account-check-center.test").',
      gu: 'શંકાસ્પદ! Subdomain માં જાણીતી બ્રાન્ડનું નામ મૂકવું એ જાણીતી છેતરપિંડી છે. સાચો માલિક હંમેશા "/" પહેલાંનો મુખ્ય Domain ("account-check-center.test") હોય છે.',
    },
  },
  {
    id: 'url-4',
    url: 'http://update-billing.northstar-shop.example/card-confirm',
    protocol: 'http://',
    subdomain: 'update-billing',
    domain: 'northstar-shop.example',
    path: '/card-confirm',
    isSuspicious: true,
    clues: [
      {
        en: 'Uses unencrypted HTTP ("http://") on a sensitive billing and card confirmation path.',
        gu: 'બિલિંગ અને કાર્ડ કન્ફર્મેશન જેવા સંવેદનશીલ પેજ પર અસુરક્ષિત HTTP ("http://") નો ઉપયોગ થયો છે.',
      },
      {
        en: 'Sensitive financial pages without TLS encryption expose data in transit.',
        gu: 'TLS એન્ક્રિપ્શન વગરના પેજ પર ડેટા રસ્તામાં લીક થવાનું જોખમ રહે છે.',
      },
    ],
    hint: {
      en: 'Look at the very beginning of the URL (the protocol) and compare it to the sensitivity of "/card-confirm".',
      gu: 'URL ની શરૂઆતમાં Protocol ("http" કે "https") જુઓ અને તે સંવેદનશીલ કામ માટે યોગ્ય છે કે કેમ તે વિચારો.',
    },
    explanation: {
      en: 'Suspicious! A billing or payment confirmation page should NEVER run over plain HTTP. Without HTTPS/TLS, network traffic is unencrypted and vulnerable to interception.',
      gu: 'શંકાસ્પદ! બિલિંગ અથવા કાર્ડ કન્ફર્મેશન પેજ ક્યારેય સાદા HTTP પર ન હોવું જોઈએ. HTTPS વગર ડેટા એન્ક્રિપ્ટેડ રહેતો નથી.',
    },
  },
  {
    id: 'url-5',
    url: 'https://docs.websecurity-guide.example/headers/csp-reference',
    protocol: 'https://',
    subdomain: 'docs',
    domain: 'websecurity-guide.example',
    path: '/headers/csp-reference',
    isSuspicious: false,
    clues: [
      {
        en: 'Standard documentation subdomain ("docs") over HTTPS with a predictable, clean path.',
        gu: 'HTTPS સાથે "docs" Subdomain અને સ્પષ્ટ દસ્તાવેજીકરણ Path છે.',
      },
      {
        en: 'Still requires verifying browser certificate and site authenticity before downloading files or signing in.',
        gu: 'છતાં પણ ફાઇલ ડાઉનલોડ કે લોગિન કરતાં પહેલાં બ્રાઉઝર સર્ટિફિકેટ અને સ્ત્રોતની ખાતરી કરવી જરૂરી છે.',
      },
    ],
    hint: {
      en: 'Examine whether any deceptive brand spoofing, IP address, or unencrypted HTTP appears here.',
      gu: 'અહીં કોઈ નકલી બ્રાન્ડ, IP એડ્રેસ કે અસુરક્ષિત HTTP દેખાય છે કે કેમ તે તપાસો.',
    },
    explanation: {
      en: 'Appears Legitimate (Verify Context): No typosquatting, no misleading subdomains, and HTTPS is present. Always maintain verification discipline and never assume absolute safety without context.',
      gu: 'પ્રાથમિક રીતે યોગ્ય જણાય છે (સંદર્ભ ચકાસો): કોઈ નકલી સ્પેલિંગ કે છેતરપિંડીભર્યો Subdomain નથી અને HTTPS છે. તેમ છતાં સંદર્ભ ચકાસ્યા વિના કોઈ લિંકને આંખ બંધ કરીને સુરક્ષિત ન માનો.',
    },
  },
];

export const PHISHING_CHALLENGES: PhishingChallenge[] = [
  {
    id: 'phish-1',
    channel: 'Email',
    senderName: 'HR Payroll Support',
    senderAddress: 'payroll-urgent@company-hr-alerts.example',
    subject: {
      en: 'FINAL NOTICE: Salary Deposit Suspended — Verify Within 2 Hours',
      gu: 'અંતિમ સૂચના: તમારો પગાર અટકાવવામાં આવ્યો છે — ૨ કલાકમાં ચકાસો',
    },
    body: {
      en: 'Dear Employee, due to a system sync error your bank details were flagged. Click below within 2 hours to re-enter your login and PIN or payroll will be frozen.',
      gu: 'પ્રિય કર્મચારી, સિસ્ટમ ભૂલને કારણે તમારી બેંક વિગતો અટકાવાઈ છે. પગાર બંધ ન થાય તે માટે ૨ કલાકમાં નીચે ક્લિક કરી લોગિન અને PIN ફરી દાખલ કરો.',
    },
    linkLabel: 'Verify Payroll Account Now',
    linkPreviewUrl: 'http://hr-payroll-sync-portal.example/relogin',
    question: {
      en: 'Which combination of clues exposes this email as a phishing attempt?',
      gu: 'નીચેનામાંથી કયા પુરાવા સાબિત કરે છે કે આ ઈમેલ Phishing છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Extreme 2-hour urgency, generic greeting, external sender domain, and HTTP link asking for PIN.',
          gu: '૨ કલાકની ખોટી ઉતાવળ, સામાન્ય સંબોધન, અલગ Sender Domain અને PIN માંગતી અસુરક્ષિત HTTP લિંક.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Because the email uses the word "Employee" instead of a phone number.',
          gu: 'કારણ કે ઈમેલમાં ફોન નંબરને બદલે "Employee" શબ્દ લખ્યો છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'It is legitimate because payroll emails always ask for PIN verification via links.',
          gu: 'આ સાચો ઈમેલ છે કારણ કે પેરોલ વિભાગ હંમેશા લિંક દ્વારા PIN માંગે છે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Notice the time pressure ("Within 2 Hours"), sender domain, and the request for a PIN over HTTP.',
      gu: 'સમયની ઉતાવળ ("૨ કલાકમાં"), મોકલનારનું Domain અને HTTP લિંક પર PIN માંગવાની રીત જુઓ.',
    },
    explanation: {
      en: 'Phishing relies on artificial urgency ("2 hours"), generic greetings ("Dear Employee"), mismatched external domains, and requesting sensitive secrets like PINs over unencrypted links.',
      gu: 'Phishing માં ખોટી ઉતાવળ, "Dear Employee" જેવું સામાન્ય સંબોધન, અજાણ્યું Domain અને HTTP લિંક દ્વારા PIN જેવી ગુપ્ત માહિતી માંગવામાં આવે છે.',
    },
  },
  {
    id: 'phish-2',
    channel: 'SMS',
    senderName: 'ParcelTrack Alert',
    senderAddress: '+91-000-000-0199',
    subject: {
      en: 'Delivery Hold Notice',
      gu: 'પાર્સલ ડિલિવરી અટકી હોવાની સૂચના',
    },
    body: {
      en: 'Your parcel #4821 could not be delivered due to incomplete address. Pay Rs. 15 re-delivery fee today to avoid return:',
      gu: 'અપૂરતા સરનામાને કારણે તમારું પાર્સલ #4821 ડિલિવર થઈ શક્યું નથી. પરત ન જાય તે માટે આજે જ રૂ. ૧૫ ફી ચૂકવો:',
    },
    linkLabel: 'parcel-fee-update.example/pay',
    linkPreviewUrl: 'https://parcel-fee-update.example/card-entry',
    question: {
      en: 'What is the safest defensive response to this SMS (Smishing)?',
      gu: 'આ SMS (Smishing) માટે સૌથી સુરક્ષિત પગલું કયું છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Pay the small Rs. 15 fee quickly because the amount is tiny.',
          gu: 'રકમ માત્ર ૧૫ રૂપિયા જ છે એટલે તરત ચૂકવી દેવી.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Ignore the SMS link and verify tracking directly on the official courier website or app you trust.',
          gu: 'SMS ની લિંક પર ક્લિક કર્યા વગર સત્તાવાર કુરિયર વેબસાઇટ કે એપ પર જઈને જાતે તપાસ કરવી.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Reply to the SMS with your home address and card number.',
          gu: 'SMS ના જવાબમાં ઘરનું સરનામું અને કાર્ડ નંબર મોકલી આપવો.',
        },
      },
    ],
    correctOptionId: 'b',
    hint: {
      en: 'Small-fee courier SMS tricks aim to harvest credit/debit card details, not Rs. 15.',
      gu: 'નાની ફી વાળા કુરિયર SMS નો હેતુ ૧૫ રૂપિયા નહીં, પણ તમારા કાર્ડની વિગતો ચોરવાનો હોય છે.',
    },
    explanation: {
      en: 'Small-fee delivery SMS scams ("Smishing") trick users into entering payment card details on fake checkout pages. Always open the official courier site independently.',
      gu: 'નાની રકમના ડિલિવરી SMS (Smishing) કાર્ડની વિગતો ચોરવા માટે હોય છે. હંમેશા સત્તાવાર વેબસાઇટ કે એપ અલગથી ખોલીને તપાસ કરો.',
    },
  },
  {
    id: 'phish-3',
    channel: 'Email',
    senderName: 'CloudDrive Security Team',
    senderAddress: 'noreply@clouddrive-support.example',
    subject: {
      en: 'New Shared Document: Q4 Budget Sheet',
      gu: 'નવું શેર કરેલ ડોક્યુમેન્ટ: Q4 બજેટ શીટ',
    },
    body: {
      en: 'A colleague shared "Q4_Bonus_Adjustments.pdf" with you. Sign in with your corporate credentials to unlock preview.',
      gu: 'તમારા સહકર્મીએ "Q4_Bonus_Adjustments.pdf" શેર કર્યું છે. જોવા માટે તમારા ઓફિસ લોગિનથી સાઇન ઇન કરો.',
    },
    linkLabel: 'Open Document Preview',
    linkPreviewUrl: 'https://clouddrive.example.preview-auth.test/login',
    question: {
      en: 'Why should you avoid entering your password after clicking "Open Document Preview"?',
      gu: '"Open Document Preview" પર ક્લિક કરીને પાસવર્ડ શા માટે ન નાખવો જોઈએ?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'The link preview points to "preview-auth.test", not the legitimate "clouddrive.example" domain.',
          gu: 'લિંક પ્રિવ્યૂ "clouddrive.example" ને બદલે અજાણ્યા "preview-auth.test" Domain પર લઈ જાય છે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Because PDF files cannot contain financial numbers.',
          gu: 'કારણ કે PDF ફાઇલમાં નાણાકીય આંકડા હોઈ શકતા નથી.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Because the email was sent during business hours.',
          gu: 'કારણ કે ઈમેલ ઓફિસ સમય દરમિયાન આવ્યો છે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Inspect the Link Preview URL carefully before trusting the button text.',
      gu: 'બટનના લખાણ પર વિશ્વાસ કરતાં પહેલાં Link Preview URL ધ્યાનથી જુઓ.',
    },
    explanation: {
      en: 'Hovering or inspecting links reveals the true destination ("preview-auth.test"). Attackers also use enticing titles like "Bonus Adjustments" to trigger curiosity.',
      gu: 'લિંક પ્રિવ્યૂ તપાસવાથી અસલી વેબસાઇટ ("preview-auth.test") પકડાઈ જાય છે. હુમલાખોરો "Bonus" જેવા આકર્ષક શીર્ષકોથી લોગિન ચોરવાનો પ્રયાસ કરે છે.',
    },
  },
  {
    id: 'phish-4',
    channel: 'Email',
    senderName: 'IT Helpdesk',
    senderAddress: 'it-desk@northbridge-uni.example',
    subject: {
      en: 'Scheduled Maintenance Notice: Campus Wi-Fi Portal',
      gu: 'નિયત મેન્ટેનન્સ સૂચના: કેમ્પસ Wi-Fi પોર્ટલ',
    },
    body: {
      en: 'Heads up: Campus Wi-Fi will undergo maintenance Sunday 02:00–04:00 AM. No action or login is required. Check status anytime on the official IT status page.',
      gu: 'સૂચના: રવિવારે રાત્રે ૨:૦૦ થી ૪:૦૦ દરમિયાન કેમ્પસ Wi-Fi માં મેન્ટેનન્સ રહેશે. કોઈ લોગિન કે પગલાંની જરૂર નથી. સત્તાવાર IT પેજ પર સ્ટેટસ જોઈ શકો છો.',
    },
    linkLabel: 'View Official IT Status',
    linkPreviewUrl: 'https://status.northbridge-uni.example/network',
    question: {
      en: 'How does this message compare to typical phishing emails?',
      gu: 'સામાન્ય Phishing ઈમેલની સરખામણીમાં આ સંદેશો કેવો છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'It is definitely malicious because it mentions maintenance.',
          gu: 'આ ચોક્કસ નકલી છે કારણ કે તેમાં મેન્ટેનન્સનો ઉલ્લેખ છે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'It shows legitimate patterns: matching domain, HTTPS link, no credential request, and no panic urgency.',
          gu: 'તેમાં યોગ્ય લક્ષણો છે: સાચું Domain, HTTPS લિંક, પાસવર્ડની કોઈ માંગ નહીં અને ખોટી ઉતાવળ નહીં.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'It is phishing because it occurs on a Sunday.',
          gu: 'તે Phishing છે કારણ કે મેન્ટેનન્સ રવિવારે છે.',
        },
      },
    ],
    correctOptionId: 'b',
    hint: {
      en: 'Check if it asks for passwords, creates panic, or points to an external domain.',
      gu: 'શું તે પાસવર્ડ માંગે છે, ડર ઊભો કરે છે કે અજાણ્યા Domain પર મોકલે છે? તે તપાસો.',
    },
    explanation: {
      en: 'This notice matches legitimate communication: matching organizational domain, no request for passwords/OTPs, and informational tone without coercive urgency.',
      gu: 'આ સંદેશો વિશ્વાસપાત્ર લાક્ષણિકતાઓ ધરાવે છે: સંસ્થાનું સાચું Domain, પાસવર્ડ કે OTP ની કોઈ માંગ નથી અને કોઈ દબાણ નથી.',
    },
  },
  {
    id: 'phish-5',
    channel: 'Email',
    senderName: 'Chief Financial Officer',
    senderAddress: 'cfo.exec.office@gmail-mailer.example',
    subject: {
      en: 'Confidential Wire Request — Are you at your desk?',
      gu: 'ગુપ્ત વાયર ટ્રાન્સફર વિનંતી — શું તમે ડેસ્ક પર છો?',
    },
    body: {
      en: 'I am in a board meeting and cannot take calls. Please process an urgent vendor payment today and keep this strictly confidential between us.',
      gu: 'હું બોર્ડ મીટિંગમાં છું અને ફોન ઉપાડી શકતો નથી. કૃપા કરીને આજે જ તાત્કાલિક વેન્ડર પેમેન્ટ મોકલો અને આ વાત ગુપ્ત રાખો.',
    },
    linkLabel: 'Reply / Process Request',
    linkPreviewUrl: 'mailto:cfo.exec.office@gmail-mailer.example',
    question: {
      en: 'What type of attack is this and what is the primary defense?',
      gu: 'આ કયા પ્રકારનો હુમલો છે અને તેનો મુખ્ય બચાવ શું છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'CEO Fraud / Business Email Compromise (BEC): verify out-of-band via known phone or internal directory.',
          gu: 'CEO Fraud / BEC હુમલો: જાણીતા ફોન નંબર અથવા ઓફિસ ડિરેક્ટરી દ્વારા સીધી ખાતરી (Out-of-band Verification) કરવી.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Cross-Site Scripting: encode the subject line in HTML.',
          gu: 'Cross-Site Scripting: વિષયને HTML માં Encode કરવો.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Safe request because the sender asked for confidentiality.',
          gu: 'આ સુરક્ષિત વિનંતી છે કારણ કે મોકલનારે ગુપ્તતા રાખવા કહ્યું છે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Executives pressuring staff for secret payments from external email addresses while refusing phone calls is a classic BEC pattern.',
      gu: 'ફોન ન કરવાનું કહીને બહારના ઈમેલ પરથી ગુપ્ત પેમેન્ટની ઉતાવળ કરવી એ BEC (Business Email Compromise) ની ઓળખ છે.',
    },
    explanation: {
      en: 'Business Email Compromise (BEC) uses impersonated authority, secrecy, and "unable to take calls" excuses. Always verify financial requests through a trusted, independent channel.',
      gu: 'BEC હુમલામાં ઉચ્ચ અધિકારીનું નકલી નામ, ગુપ્તતા અને "મીટિંગમાં છું" જેવા બહાના વપરાય છે. નાણાકીય વિનંતીની ખાતરી હંમેશા અલગ વિશ્વાસપાત્ર માધ્યમથી કરો.',
    },
  },
];

export const SQL_CHALLENGES: SqlChallenge[] = [
  {
    id: 'sql-1',
    scenarioTitle: {
      en: 'Simulated Login Query Construction',
      gu: 'લોગિન ક્વેરી બનાવવાનું સિમ્યુલેશન',
    },
    sampleInputUsername: "' OR '1'='1",
    sampleInputPassword: 'anything',
    unsafePattern: "SELECT id FROM users WHERE username = '" + "{input}" + "' AND active = 1;",
    safePattern: 'SELECT id FROM users WHERE username = ? AND active = 1;',
    question: {
      en: 'Why does direct string concatenation make the unsafe query vulnerable?',
      gu: 'સીધું String Concatenation કરવાથી ક્વેરી કેમ અસુરક્ષિત બને છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'User input quotes and logic operators (like OR 1=1) merge into SQL command syntax instead of staying data.',
          gu: 'યુઝરના ઇનપુટમાં રહેલા અવતરણ ચિહ્નો (\') અને OR જેવા શબ્દો ડેટા રહેવાને બદલે SQL કમાન્ડનો ભાગ બની જાય છે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Because SQL databases cannot read usernames longer than 5 characters.',
          gu: 'કારણ કે SQL ડેટાબેઝ ૫ અક્ષરથી લાંબું યુઝરનેમ વાંચી શકતો નથી.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Because SELECT queries should always be written in lowercase.',
          gu: 'કારણ કે SELECT ક્વેરી હંમેશા નાના અક્ષરોમાં લખવી જોઈએ.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Notice how the single quote (\') closes the SQL string early in the visual query simulator.',
      gu: 'વિઝ્યુઅલ ક્વેરીમાં સિંગલ ક્વોટ (\') કેવી રીતે SQL સ્ટ્રિંગને વચ્ચેથી બંધ કરી દે છે તે જુઓ.',
    },
    explanation: {
      en: 'When input is concatenated directly into SQL text, characters like quotes and SQL keywords alter the query structure. Parameterized queries treat input strictly as data, never executable SQL.',
      gu: 'જ્યારે ઇનપુટ સીધું SQL સ્ટ્રિંગમાં જોડાય છે ત્યારે તે ક્વેરીનો અર્થ બદલી શકે છે. Parameterized Query માં ઇનપુટને માત્ર ડેટા ગણવામાં આવે છે, કમાન્ડ નહીં.',
    },
  },
  {
    id: 'sql-2',
    scenarioTitle: {
      en: 'Choosing the Secure Code Pattern',
      gu: 'સુરક્ષિત કોડ પેટર્ન પસંદ કરો',
    },
    sampleInputUsername: 'alice_smith',
    sampleInputPassword: 'user_secret',
    unsafePattern: 'db.query(`SELECT * FROM orders WHERE email = "${req.email}"`)',
    safePattern: 'db.execute("SELECT * FROM orders WHERE email = ?", [req.email])',
    question: {
      en: 'Which backend pattern reliably prevents SQL Injection across all user inputs?',
      gu: 'બધા પ્રકારના યુઝર ઇનપુટ સામે SQL Injection રોકવા કઈ પદ્ધતિ સૌથી વિશ્વસનીય છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Using a Prepared Statement / Parameterized Query with placeholders (?, $1).',
          gu: 'Prepared Statement અથવા Parameterized Query (?, $1) નો ઉપયોગ કરવો.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Hiding the database error message only in the browser CSS.',
          gu: 'માત્ર બ્રાઉઝર CSS માં ડેટાબેઝ એરર સંદેશ છુપાવી દેવો.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Checking input length only in frontend HTML maxlength.',
          gu: 'માત્ર HTML માં maxlength મૂકીને તપાસ કરવી.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Look for the solution that separates SQL code structure from parameter data values.',
      gu: 'એવો વિકલ્પ શોધો જે SQL કોડ અને યુઝર ડેટાને સંપૂર્ણ અલગ રાખે છે.',
    },
    explanation: {
      en: 'Parameterized queries (Prepared Statements) compile the SQL command structure separately from user-supplied values, making SQL injection structurally impossible.',
      gu: 'Parameterized Queries (Prepared Statements) SQL ના માળખા અને ડેટાને અલગ રાખે છે, જેથી યુઝર ઇનપુટ ક્યારેય SQL કમાન્ડ તરીકે ચાલી શકતું નથી.',
    },
  },
  {
    id: 'sql-3',
    scenarioTitle: {
      en: 'Why Frontend Validation Alone Is Not Enough',
      gu: 'માત્ર Frontend ચકાસણી કેમ પૂરતી નથી?',
    },
    sampleInputUsername: "admin'--",
    sampleInputPassword: '(ignored)',
    unsafePattern: 'SELECT * FROM accounts WHERE user = \'' + "admin'--" + '\' AND pass = \'...\'',
    safePattern: 'SELECT * FROM accounts WHERE user = $1 AND pass_hash = $2',
    question: {
      en: 'If a login form restricts special characters in JavaScript, is the backend now safe from SQLi?',
      gu: 'જો લોગિન ફોર્મ માત્ર JavaScript વડે ખાસ અક્ષરો રોકે, તો શું Backend SQLi થી સુરક્ષિત થઈ ગયું?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Yes, because browsers always enforce JavaScript rules on servers.',
          gu: 'હા, કારણ કે બ્રાઉઝરના JavaScript નિયમો સર્વર પર પણ લાગુ પડે છે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'No — HTTP requests can bypass frontend UI checks, so parameterization must live on the server.',
          gu: 'ના — HTTP વિનંતીઓ સીધી સર્વર પર મોકલી શકાય છે, તેથી સર્વર પર Parameterization ફરજિયાત છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Yes, as long as the input box type is "password".',
          gu: 'હા, જો ઇનપુટ બોક્સનો પ્રકાર "password" હોય તો સુરક્ષિત છે.',
        },
      },
    ],
    correctOptionId: 'b',
    hint: {
      en: 'Think about where the database query actually runs: browser or server?',
      gu: 'વિચારો કે ડેટાબેઝ ક્વેરી ક્યાં ચાલે છે: બ્રાઉઝરમાં કે સર્વર પર?',
    },
    explanation: {
      en: 'Client-side validation only improves user experience; anyone can send custom HTTP requests directly to an API endpoint. Database protection must always be enforced on the server via parameterized queries.',
      gu: 'Frontend ચકાસણી માત્ર સગવડ માટે છે; સર્વર પર સીધી HTTP વિનંતી મોકલીને તેને ટાળી શકાય છે. તેથી સર્વર પર Parameterized Queries જરૂરી છે.',
    },
  },
  {
    id: 'sql-4',
    scenarioTitle: {
      en: 'Spotting Unsafe Search Endpoint Code',
      gu: 'અસુરક્ષિત Search Endpoint ઓળખો',
    },
    sampleInputUsername: 'laptop',
    sampleInputPassword: 'N/A',
    unsafePattern: 'const sql = "SELECT name, price FROM items WHERE name LIKE \'%" + term + "%\'";',
    safePattern: 'const sql = "SELECT name, price FROM items WHERE name LIKE ?"; params = [`%${term}%`];',
    question: {
      en: 'Why is the "safePattern" above secure even though it includes % wildcards?',
      gu: 'ઉપરના safePattern માં % હોવા છતાં તે કેમ સુરક્ષિત છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Because the wildcard string is passed as a bound parameter value, not concatenated into SQL syntax.',
          gu: 'કારણ કે % વાળી સ્ટ્રિંગને Parameter Value તરીકે મોકલવામાં આવે છે, SQL કોડમાં જોડવામાં આવતી નથી.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Because LIKE queries never access database tables.',
          gu: 'કારણ કે LIKE ક્વેરી ક્યારેય ડેટાબેઝ ટેબલ વાંચતી નથી.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Because single quotes were replaced with backticks in JavaScript.',
          gu: 'કારણ કે JavaScript માં Backticks નો ઉપયોગ થયો છે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Check how `params` passes `%${term}%` to the `?` placeholder.',
      gu: 'જુઓ કે `params` કેવી રીતે `?` placeholder ને કિંમત આપે છે.',
    },
    explanation: {
      en: 'Building the `%term%` string in memory and binding it to `?` keeps SQL syntax completely isolated from user input.',
      gu: '`%term%` ને અલગ બનાવીને `?` Parameter માં બાંધવાથી SQL કોડ અને યુઝર ડેટા અલગ રહે છે.',
    },
  },
  {
    id: 'sql-5',
    scenarioTitle: {
      en: 'Defense in Depth for Database Access',
      gu: 'ડેટાબેઝ માટે Defense in Depth (બહુસ્તરીય સુરક્ષા)',
    },
    sampleInputUsername: 'analyst_demo',
    sampleInputPassword: 'hashed_password',
    unsafePattern: 'DB user connects as SUPERUSER / ADMIN for web app queries',
    safePattern: 'Web app DB user has Least Privilege (SELECT/INSERT/UPDATE on app tables only)',
    question: {
      en: 'Alongside parameterized queries, what principle limits database impact if a flaw ever occurs?',
      gu: 'Parameterized Queries ઉપરાંત, જો ક્યારેય કોઈ ખામી રહે તો નુકસાન ઘટાડવા કયો સિદ્ધાંત મદદ કરે છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Principle of Least Privilege: give the app database account only the minimum permissions it needs.',
          gu: 'Principle of Least Privilege: એપના ડેટાબેઝ એકાઉન્ટને માત્ર જરૂરી હોય તેટલી જ ન્યૂનતમ પરવાનગી આપવી.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Store passwords in plain text so queries run faster.',
          gu: 'ક્વેરી ઝડપી ચલાવવા પાસવર્ડ Plain Text માં સેવ કરવા.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Return full database stack traces to users so they can debug issues.',
          gu: 'યુઝરને પૂરી ડેટાબેઝ એરર બતાવવી જેથી તેઓ સમજી શકે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Think about minimizing what a single application DB account is allowed to touch.',
      gu: 'એપના ડેટાબેઝ એકાઉન્ટને કેટલા અધિકાર મળવા જોઈએ તે વિચારો.',
    },
    explanation: {
      en: 'Least Privilege restricts database accounts to only required tables and operations, while generic error messages prevent leaking schema details.',
      gu: 'Least Privilege મુજબ ડેટાબેઝ એકાઉન્ટને માત્ર જરૂરી ટેબલ અને ક્રિયાઓની જ પરવાનગી હોવી જોઈએ.',
    },
  },
];

export const XSS_CHALLENGES: XssChallenge[] = [
  {
    id: 'xss-1',
    scenarioTitle: {
      en: 'Profile Bio Text Handling',
      gu: 'પ્રોફાઇલ બાયો ટેક્સ્ટ હેન્ડલિંગ',
    },
    sampleInput: '<script>alert("demo")</script>',
    unsafeRenderDescription: {
      en: 'Unsafe sink (e.g. raw innerHTML) treats "<script>" as active HTML markup instead of harmless text.',
      gu: 'અસુરક્ષિત રીત (જેમ કે raw innerHTML) "<script>" ને સાદા લખાણને બદલે સક્રિય HTML કોડ ગણી લે છે.',
    },
    safeEncodedOutput: '&lt;script&gt;alert(&quot;demo&quot;)&lt;/script&gt;',
    question: {
      en: 'What happens when a web app applies proper Output Encoding before displaying user text?',
      gu: 'જ્યારે વેબ એપ યુઝરનું લખાણ બતાવતા પહેલાં યોગ્ય Output Encoding કરે છે ત્યારે શું થાય છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Special characters like < and > become HTML entities (&lt; &gt;), rendering safely as plain visible text.',
          gu: '< અને > જેવા ખાસ અક્ષરો HTML entities (&lt; &gt;) માં ફેરવાઈને માત્ર સાદા લખાણ તરીકે દેખાય છે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'The browser executes the tag invisibly in the background.',
          gu: 'બ્રાઉઝર તે ટેગને બેકગ્રાઉન્ડમાં છૂપી રીતે ચલાવી દે છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'The database automatically deletes the user account.',
          gu: 'ડેટાબેઝ આપમેળે યુઝરનું એકાઉન્ટ ડિલીટ કરી દે છે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Check the "Safe Encoded Output" box in the simulator above.',
      gu: 'ઉપરના સિમ્યુલેટરમાં "Safe Encoded Output" બોક્સ જુઓ.',
    },
    explanation: {
      en: 'Output encoding converts HTML control characters (<, >, &, ", \') into safe entities so the browser displays them literally as text and never parses them as scripts.',
      gu: 'Output Encoding ખાસ HTML અક્ષરો (<, >, &, ") ને સુરક્ષિત ટેક્સ્ટ કોડમાં ફેરવે છે, જેથી બ્રાઉઝર તેને માત્ર અક્ષરો તરીકે બતાવે અને સ્ક્રિપ્ટ તરીકે ન ચલાવે.',
    },
  },
  {
    id: 'xss-2',
    scenarioTitle: {
      en: 'Safe DOM API Selection',
      gu: 'સુરક્ષિત DOM API ની પસંદગી',
    },
    sampleInput: 'Hello <b>Team</b>! <img src="x" onerror="demo()">',
    unsafeRenderDescription: {
      en: 'Inserting untrusted strings into element.innerHTML parses tags and inline event attributes.',
      gu: 'અવિશ્વસનીય લખાણને element.innerHTML માં મૂકવાથી HTML ટેગ્સ અને ઇવેન્ટ્સ પ્રોસેસ થાય છે.',
    },
    safeEncodedOutput: 'Hello &lt;b&gt;Team&lt;/b&gt;! &lt;img src=&quot;x&quot; onerror=&quot;demo()&quot;&gt;',
    question: {
      en: 'Which DOM property inserts plain user text safely without parsing HTML?',
      gu: 'HTML પાર્સ કર્યા વગર સાદું યુઝર ટેક્સ્ટ સુરક્ષિત રીતે મૂકવા કઈ DOM પ્રોપર્ટી વપરાય છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'element.textContent (or React JSX {value} text binding)',
          gu: 'element.textContent (અથવા React JSX માં {value})',
        },
      },
      {
        id: 'b',
        label: {
          en: 'element.innerHTML = userInput',
          gu: 'element.innerHTML = userInput',
        },
      },
      {
        id: 'c',
        label: {
          en: 'document.write(userInput)',
          gu: 'document.write(userInput)',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Choose the API designed strictly for plain text nodes rather than HTML markup.',
      gu: 'એવો વિકલ્પ પસંદ કરો જે HTML નહીં પણ માત્ર સાદું ટેક્સ્ટ લખવા માટે બન્યો છે.',
    },
    explanation: {
      en: 'Using `textContent` (and React’s default `{expression}` escaping) guarantees user strings remain text nodes and cannot create HTML elements or attributes.',
      gu: '`textContent` (અને React નું ડિફોલ્ટ `{expression}`) ખાતરી કરે છે કે યુઝરની સ્ટ્રિંગ માત્ર ટેક્સ્ટ જ રહે અને નવા HTML ટેગ્સ ન બનાવે.',
    },
  },
  {
    id: 'xss-3',
    scenarioTitle: {
      en: 'Reflected Search Query Display',
      gu: 'સર્ચ રિઝલ્ટમાં રિફ્લેક્ટેડ ટેક્સ્ટ',
    },
    sampleInput: 'search?q=<svg onload=demo()>',
    unsafeRenderDescription: {
      en: 'Echoing URL query parameters directly into raw HTML causes Reflected XSS.',
      gu: 'URL ના query parameter ને સીધા raw HTML માં છાપવાથી Reflected XSS થઈ શકે છે.',
    },
    safeEncodedOutput: 'Results for: &lt;svg onload=demo()&gt;',
    question: {
      en: 'Why are URL query parameters (?q=...) considered untrusted input?',
      gu: 'URL ના query parameters (?q=...) ને અવિશ્વસનીય (Untrusted) ઇનપુટ કેમ ગણવામાં આવે છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Anyone can craft or modify a URL link and send it to a victim; its parameters must be encoded before rendering.',
          gu: 'કોઈપણ વ્યક્તિ URL બદલીને લિંક મોકલી શકે છે; તેથી તેને પેજ પર બતાવતા પહેલાં Encode કરવું જરૂરી છે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Because browsers only support 3 query parameters.',
          gu: 'કારણ કે બ્રાઉઝર માત્ર ૩ જ query parameters ને સપોર્ટ કરે છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'URLs never reach the browser address bar.',
          gu: 'URL ક્યારેય બ્રાઉઝરના એડ્રેસ બાર સુધી પહોંચતા નથી.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Think about who controls the text inside `?q=` when someone clicks a shared link.',
      gu: 'વિચારો કે શેર કરેલી લિંકમાં `?q=` ની અંદરનું લખાણ કોણ બદલી શકે છે.',
    },
    explanation: {
      en: 'Every external input — forms, URL parameters, headers, and stored comments — must be treated as untrusted and encoded appropriately for the output context.',
      gu: 'ફોર્મ, URL parameter કે સેવ કરેલી કોમેન્ટ — દરેક બહારના ઇનપુટને અવિશ્વસનીય ગણીને Output Encoding કરવું જોઈએ.',
    },
  },
  {
    id: 'xss-4',
    scenarioTitle: {
      en: 'Validating URL Links Submitted by Users',
      gu: 'યુઝરે આપેલી વેબસાઇટ લિંકની ચકાસણી',
    },
    sampleInput: 'javascript:demo_action()',
    unsafeRenderDescription: {
      en: 'Placing unvalidated schemes into <a href="..."> can trigger script execution when clicked.',
      gu: 'ચકાસ્યા વગરની લિંક <a href="..."> માં મૂકવાથી ક્લિક વખતે સ્ક્રિપ્ટ ચાલી શકે છે.',
    },
    safeEncodedOutput: 'Blocked: only allow https:// or http:// URLs',
    question: {
      en: 'When letting users add a "Website Link" to their profile, what extra check is essential beyond HTML escaping?',
      gu: 'યુઝરને પ્રોફાઇલમાં "Website Link" ઉમેરવા દેતી વખતે HTML Escaping ઉપરાંત કઈ તપાસ જરૂરી છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Allowlist the URL protocol so only safe schemes like "https://" or "http://" are accepted.',
          gu: 'માત્ર સુરક્ષિત URL protocol ("https://" કે "http://") ને જ મંજૂરી આપવી (Protocol Allowlist).',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Make the link text bold.',
          gu: 'લિંકના અક્ષરોને Bold કરી દેવા.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Remove spaces from the user’s display name.',
          gu: 'યુઝરના નામમાંથી જગ્યા (Space) કાઢી નાખવી.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'HTML encoding quotes does not stop a `javascript:` protocol inside `href`.',
      gu: 'HTML escaping માત્ર અક્ષરો બદલે છે, `href` ની અંદર `javascript:` જેવા protocol ને રોકવા માટે protocol તપાસવો પડે.',
    },
    explanation: {
      en: 'Always validate URLs against an explicit protocol allowlist (`https:`, `http:`) before placing user-supplied links into `href` attributes.',
      gu: 'યુઝરની આપેલી લિંકને `href` માં મૂકતા પહેલાં હંમેશા ખાતરી કરો કે તે `https://` અથવા `http://` થી જ શરૂ થાય છે.',
    },
  },
  {
    id: 'xss-5',
    scenarioTitle: {
      en: 'Second Layer Defense: Content Security Policy',
      gu: 'બીજું સુરક્ષા કવચ: Content Security Policy',
    },
    sampleInput: 'Defense-in-depth policy header',
    unsafeRenderDescription: {
      en: 'Without a Content-Security-Policy, browsers allow inline scripts and external script domains freely.',
      gu: 'Content-Security-Policy વગર બ્રાઉઝર કોઈપણ inline કે બહારની સ્ક્રિપ્ટ ચલાવી શકે છે.',
    },
    safeEncodedOutput: "Content-Security-Policy: default-src 'self'; object-src 'none'",
    question: {
      en: 'How does Content-Security-Policy (CSP) help defend against XSS?',
      gu: 'Content-Security-Policy (CSP) XSS સામે કેવી રીતે મદદ કરે છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'It restricts which script sources the browser is allowed to load or execute, reducing XSS impact.',
          gu: 'તે બ્રાઉઝર કયા સ્ત્રોતમાંથી સ્ક્રિપ્ટ ચલાવી શકે તે મર્યાદિત કરે છે, જેથી XSS નું જોખમ ઘટે છે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'It encrypts the user’s Wi-Fi router password.',
          gu: 'તે યુઝરના Wi-Fi રાઉટરનો પાસવર્ડ એન્ક્રિપ્ટ કરે છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'It replaces the need for input validation and output encoding.',
          gu: 'તેનાથી Output Encoding કરવાની જરૂર રહેતી નથી.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Think of CSP as a browser-enforced allowlist for scripts, styles, and frames.',
      gu: 'CSP ને બ્રાઉઝર માટે સ્ક્રિપ્ટ્સની પરવાનગી-યાદી (Allowlist) તરીકે વિચારો.',
    },
    explanation: {
      en: 'CSP provides a strong second line of defense by blocking unauthorized inline scripts and unapproved third-party script domains, complementing proper output encoding.',
      gu: 'CSP અનધિકૃત inline સ્ક્રિપ્ટ અને બહારના ડોમેનને અટકાવીને Output Encoding સાથે વધારાનું સુરક્ષા કવચ આપે છે.',
    },
  },
];

export const HEADER_MATCH_CHALLENGES: HeaderMatchChallenge[] = [
  {
    id: 'hdr-1',
    scenario: {
      en: 'Prevent attackers from embedding your banking dashboard inside an invisible overlay iframe (Clickjacking).',
      gu: 'તમારા બેંકિંગ ડેશબોર્ડને અદ્રશ્ય iframe માં મૂકીને થતા Clickjacking હુમલાને રોકો.',
    },
    threatExample: {
      en: 'Threat: Clickjacking / UI Redressing',
      gu: 'જોખમ: Clickjacking (છૂપી iframe ફ્રેમિંગ)',
    },
    options: [
      { id: 'csp-frame', headerName: 'X-Frame-Options', headerValue: 'DENY' },
      { id: 'nosniff', headerName: 'X-Content-Type-Options', headerValue: 'nosniff' },
      { id: 'hsts', headerName: 'Strict-Transport-Security', headerValue: 'max-age=31536000' },
      { id: 'referrer', headerName: 'Referrer-Policy', headerValue: 'strict-origin' },
    ],
    correctHeaderId: 'csp-frame',
    hint: {
      en: 'Look for the header whose name specifically controls "Frame" embedding.',
      gu: 'જે હેડરના નામમાં "Frame" (iframe નિયંત્રણ) છે તે શોધો.',
    },
    explanation: {
      en: 'X-Frame-Options: DENY (or CSP frame-ancestors \'none\') instructs the browser never to render the site inside an iframe, stopping clickjacking.',
      gu: 'X-Frame-Options: DENY (અથવા CSP frame-ancestors \'none\') બ્રાઉઝરને તમારી સાઇટ iframe માં ખોલતા અટકાવે છે.',
    },
  },
  {
    id: 'hdr-2',
    scenario: {
      en: 'Stop browsers from guessing ("sniffing") a file’s MIME type and treating an uploaded text file as executable JavaScript.',
      gu: 'બ્રાઉઝરને ફાઇલનો પ્રકાર જાતે અનુમાન લગાવતા (MIME Sniffing) અટકાવો.',
    },
    threatExample: {
      en: 'Threat: MIME-Type Confusion Execution',
      gu: 'જોખમ: MIME-Type Sniffing',
    },
    options: [
      { id: 'hsts', headerName: 'Strict-Transport-Security', headerValue: 'max-age=31536000' },
      { id: 'nosniff', headerName: 'X-Content-Type-Options', headerValue: 'nosniff' },
      { id: 'frame', headerName: 'X-Frame-Options', headerValue: 'SAMEORIGIN' },
      { id: 'csp', headerName: 'Content-Security-Policy', headerValue: "default-src 'self'" },
    ],
    correctHeaderId: 'nosniff',
    hint: {
      en: 'The header value literally says "nosniff".',
      gu: 'આ હેડરની કિંમતમાં જ "nosniff" લખેલું છે.',
    },
    explanation: {
      en: 'X-Content-Type-Options: nosniff forces the browser to strictly honor the server’s declared Content-Type instead of guessing.',
      gu: 'X-Content-Type-Options: nosniff બ્રાઉઝરને સર્વરે જણાવેલ Content-Type નું કડક પાલન કરવા ફરજ પાડે છે.',
    },
  },
  {
    id: 'hdr-3',
    scenario: {
      en: 'Force browsers to connect to your domain strictly over HTTPS for the next year, blocking insecure HTTP downgrade attempts.',
      gu: 'બ્રાઉઝરને હંમેશા HTTPS દ્વારા જ જોડાણ કરવા ફરજ પાડો અને અસુરક્ષિત HTTP ડાઉનગ્રેડ રોકો.',
    },
    threatExample: {
      en: 'Threat: SSL Stripping / HTTP Downgrade',
      gu: 'જોખમ: SSL Stripping / HTTP ડાઉનગ્રેડ',
    },
    options: [
      { id: 'hsts', headerName: 'Strict-Transport-Security', headerValue: 'max-age=31536000; includeSubDomains' },
      { id: 'nosniff', headerName: 'X-Content-Type-Options', headerValue: 'nosniff' },
      { id: 'referrer', headerName: 'Referrer-Policy', headerValue: 'no-referrer' },
      { id: 'frame', headerName: 'X-Frame-Options', headerValue: 'DENY' },
    ],
    correctHeaderId: 'hsts',
    hint: {
      en: 'HSTS stands for HTTP Strict Transport Security.',
      gu: 'HSTS નું પૂરું નામ Strict-Transport-Security છે.',
    },
    explanation: {
      en: 'Strict-Transport-Security (HSTS) tells the browser to automatically upgrade all future requests to HTTPS for the configured max-age.',
      gu: 'Strict-Transport-Security (HSTS) બ્રાઉઝરને ભવિષ્યની દરેક વિનંતી આપમેળે HTTPS દ્વારા જ મોકલવાનો નિર્દેશ આપે છે.',
    },
  },
  {
    id: 'hdr-4',
    scenario: {
      en: 'Restrict scripts, styles, and images so only resources from your own trusted origin can execute on the page.',
      gu: 'માત્ર તમારી પોતાની વિશ્વાસપાત્ર વેબસાઇટની સ્ક્રિપ્ટ અને રિસોર્સ જ ચાલે તેવો નિયમ મૂકો.',
    },
    threatExample: {
      en: 'Threat: Unauthorized Script Injection (XSS)',
      gu: 'જોખમ: અનધિકૃત સ્ક્રિપ્ટ લોડિંગ (XSS)',
    },
    options: [
      { id: 'csp', headerName: 'Content-Security-Policy', headerValue: "default-src 'self'; script-src 'self'" },
      { id: 'nosniff', headerName: 'X-Content-Type-Options', headerValue: 'nosniff' },
      { id: 'referrer', headerName: 'Referrer-Policy', headerValue: 'same-origin' },
      { id: 'hsts', headerName: 'Strict-Transport-Security', headerValue: 'max-age=31536000' },
    ],
    correctHeaderId: 'csp',
    hint: {
      en: 'Which policy defines `default-src` and `script-src`?',
      gu: 'કયા હેડરમાં `default-src` અને `script-src` જેવા નિયમો હોય છે?',
    },
    explanation: {
      en: 'Content-Security-Policy (CSP) is one of the strongest browser-side controls to limit where scripts and media can load from.',
      gu: 'Content-Security-Policy (CSP) બ્રાઉઝરને જણાવે છે કે કયા સ્ત્રોતમાંથી scripts, styles કે images લોડ કરવાની મંજૂરી છે.',
    },
  },
  {
    id: 'hdr-5',
    scenario: {
      en: 'Control how much URL path information is shared in the Referer header when a user clicks an external link on your site.',
      gu: 'જ્યારે યુઝર બહારની લિંક પર ક્લિક કરે ત્યારે કેટલી URL માહિતી Referer હેડરમાં મોકલવી તે નિયંત્રિત કરો.',
    },
    threatExample: {
      en: 'Threat: Sensitive Query Token Leakage via Referer',
      gu: 'જોખમ: Referer દ્વારા ખાનગી URL માહિતી લીક થવી',
    },
    options: [
      { id: 'referrer', headerName: 'Referrer-Policy', headerValue: 'strict-origin-when-cross-origin' },
      { id: 'frame', headerName: 'X-Frame-Options', headerValue: 'DENY' },
      { id: 'nosniff', headerName: 'X-Content-Type-Options', headerValue: 'nosniff' },
      { id: 'hsts', headerName: 'Strict-Transport-Security', headerValue: 'max-age=31536000' },
    ],
    correctHeaderId: 'referrer',
    hint: {
      en: 'Look at the header name that governs the HTTP Referer information.',
      gu: 'જે હેડરના નામમાં "Referrer" છે તે પસંદ કરો.',
    },
    explanation: {
      en: 'Referrer-Policy prevents sensitive internal paths or query parameters from leaking to third-party sites when users follow external links.',
      gu: 'Referrer-Policy બહારની સાઇટ્સ પર જતી વખતે ખાનગી URL પાથ કે માહિતી લીક થતી અટકાવે છે.',
    },
  },
];

export const SSL_CHALLENGES: SslChallenge[] = [
  {
    id: 'ssl-1',
    siteUrl: 'https://gift-voucher-claim.example/login',
    hasPadlock: true,
    protocol: 'TLS 1.3',
    issuer: 'Example Free CA',
    subjectDomain: 'gift-voucher-claim.example',
    validStatus: 'Valid',
    trustNote: {
      en: 'The domain has a valid TLS 1.3 certificate, yet the site itself was created yesterday to impersonate a retail brand.',
      gu: 'આ સાઇટ પાસે માન્ય TLS 1.3 સર્ટિફિકેટ છે, પરંતુ તે ગઈકાલે જ કોઈ બ્રાન્ડની નકલ કરવા બનાવવામાં આવી છે.',
    },
    question: {
      en: 'What does the HTTPS padlock actually guarantee on this page?',
      gu: 'આ પેજ પર દેખાતું HTTPS તાળાનું ચિહ્ન (Padlock) ખરેખર શું ખાતરી આપે છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Only that traffic between your browser and gift-voucher-claim.example is encrypted — NOT that the website is trustworthy.',
          gu: 'માત્ર એટલું જ કે તમારો ડેટા એન્ક્રિપ્ટેડ છે — વેબસાઇટ પોતે ભરોસાપાત્ર કે અસલી છે તેની કોઈ ખાતરી નથી.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'That the website is verified by the government as honest.',
          gu: 'કે આ વેબસાઇટ સરકાર દ્વારા પ્રમાણિત અને સંપૂર્ણ સુરક્ષિત છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'That the website cannot ask for phishing passwords.',
          gu: 'કે આ વેબસાઇટ ક્યારેય Phishing કરી શકતી નથી.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Anyone—including an attacker—can obtain a free valid TLS certificate for a domain they own.',
      gu: 'હુમલાખોર પણ પોતાના નકલી Domain માટે મફત માન્ય TLS સર્ટિફિકેટ મેળવી શકે છે.',
    },
    explanation: {
      en: 'Critical rule: HTTPS encrypts the connection in transit, preventing eavesdropping, but it does NOT verify the website owner’s honesty. Phishing sites routinely use HTTPS padlocks!',
      gu: 'મહત્વપૂર્ણ નિયમ: HTTPS માત્ર કનેક્શનને એન્ક્રિપ્ટ કરે છે, વેબસાઇટ સાચી છે કે નહીં તે સાબિત કરતું નથી. ફિશિંગ સાઇટ્સ પર પણ HTTPS તાળું હોઈ શકે છે!',
    },
  },
  {
    id: 'ssl-2',
    siteUrl: 'https://billing.harborcloud.example',
    hasPadlock: false,
    protocol: 'TLS 1.3',
    issuer: 'Example Public CA',
    subjectDomain: 'shop.otherdomain.example',
    validStatus: 'Domain Mismatch',
    trustNote: {
      en: 'Browser warning: Certificate Subject CN does not match the visited hostname.',
      gu: 'બ્રાઉઝર ચેતવણી: સર્ટિફિકેટ પર લખેલું Domain અને તમે ખોલેલું Domain અલગ છે.',
    },
    question: {
      en: 'Why does the browser display a certificate warning here?',
      gu: 'અહીં બ્રાઉઝર સર્ટિફિકેટ ચેતવણી શા માટે બતાવે છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'The certificate was issued for "shop.otherdomain.example", not "billing.harborcloud.example" (identity mismatch).',
          gu: 'સર્ટિફિકેટ "shop.otherdomain.example" માટે છે, "billing.harborcloud.example" માટે નહીં (ઓળખ મેળ ખાતી નથી).',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Because TLS 1.3 is too new for web browsers.',
          gu: 'કારણ કે TLS 1.3 બ્રાઉઝર માટે બહુ નવું છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Because the site uses HTTPS instead of HTTP.',
          gu: 'કારણ કે સાઇટ HTTP ને બદલે HTTPS વાપરે છે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Compare `Site URL` with `Subject Domain` in the inspector card.',
      gu: 'ઇન્સ્પેક્ટર કાર્ડમાં `Site URL` અને `Subject Domain` ની સરખામણી કરો.',
    },
    explanation: {
      en: 'Digital certificates bind a public key to a specific domain name. If the certificate domain does not match the URL you visited, you may be facing misconfiguration or interception.',
      gu: 'ડિજિટલ સર્ટિફિકેટ ચોક્કસ Domain ની ઓળખની ખાતરી આપે છે. જો નામ મેળ ન ખાય, તો કનેક્શનમાં છેડછાડ કે ખોટી ગોઠવણી હોઈ શકે છે.',
    },
  },
  {
    id: 'ssl-3',
    siteUrl: 'https://portal.citylibrary.example',
    hasPadlock: false,
    protocol: 'TLS 1.2',
    issuer: 'Example Public CA',
    subjectDomain: 'portal.citylibrary.example',
    validStatus: 'Expired',
    trustNote: {
      en: 'Certificate validity ended 45 days ago.',
      gu: 'સર્ટિફિકેટની મુદત ૪૫ દિવસ પહેલાં પૂરી થઈ ગઈ છે.',
    },
    question: {
      en: 'What is the proper action when encountering an expired TLS certificate warning on a login site?',
      gu: 'લોગિન સાઇટ પર મુદત પૂરી થયેલ (Expired) TLS સર્ટિફિકેટની ચેતવણી આવે ત્યારે શું કરવું જોઈએ?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Do not bypass the warning to enter passwords; notify or wait until the site renews a valid certificate.',
          gu: 'ચેતવણીને અવગણીને પાસવર્ડ ન નાખવો; માન્ય સર્ટિફિકેટ રિન્યૂ થાય ત્યાં સુધી રાહ જોવી.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Click "Proceed anyway" because expired certificates mean stronger security.',
          gu: 'આગળ વધો પર ક્લિક કરવું કારણ કે જૂનું સર્ટિફિકેટ વધુ મજબૂત હોય છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Change the URL from https:// to http:// to make the warning disappear.',
          gu: 'ચેતવણી હટાવવા URL ને https:// માંથી http:// કરી દેવું.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Bypassing certificate warnings or downgrading to HTTP removes security guarantees.',
      gu: 'ચેતવણી અવગણવાથી કે HTTP વાપરવાથી સુરક્ષા કવચ નીકળી જાય છે.',
    },
    explanation: {
      en: 'Never click through certificate warnings on sensitive portals or downgrade to HTTP. Expired certificates cannot be reliably verified against revocation or compromise.',
      gu: 'ક્યારેય સર્ટિફિકેટ ચેતવણી અવગણીને લોગિન ન કરો અને HTTP પર પાછા ન જાઓ.',
    },
  },
  {
    id: 'ssl-4',
    siteUrl: 'https://api.greenleaf.example',
    hasPadlock: true,
    protocol: 'TLS 1.3',
    issuer: 'Trusted Root CA Authority',
    subjectDomain: 'api.greenleaf.example',
    validStatus: 'Valid',
    trustNote: {
      en: 'Modern TLS 1.3 handshake completed with forward secrecy.',
      gu: 'આધુનિક TLS 1.3 હેન્ડશેક પૂર્ણ થયું છે.',
    },
    question: {
      en: 'What role does a Certificate Authority (CA) play in HTTPS?',
      gu: 'HTTPS માં Certificate Authority (CA) ની ભૂમિકા શું છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'A trusted third party that verifies domain control and digitally signs the website’s public key certificate.',
          gu: 'એક વિશ્વાસપાત્ર તૃતીય પક્ષ જે Domain ના માલિકની ચકાસણી કરીને સર્ટિફિકેટ પર ડિજિટલ સહી કરે છે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'It stores every user’s personal passwords in plaintext.',
          gu: 'તે બધા યુઝરના પાસવર્ડ સાદા લખાણમાં સાચવે છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'It builds the HTML layout of the website.',
          gu: 'તે વેબસાઇટની HTML ડિઝાઇન બનાવે છે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Why does your browser trust a site’s public key without meeting the site owner personally?',
      gu: 'તમારું બ્રાઉઝર અજાણી વેબસાઇટની Public Key પર કેવી રીતે વિશ્વાસ કરે છે?',
    },
    explanation: {
      en: 'Certificate Authorities (CAs) cryptographically sign certificates so browsers can verify that a server’s public key truly belongs to that domain.',
      gu: 'Certificate Authorities (CAs) સર્ટિફિકેટ પર ડિજિટલ સહી કરે છે, જેથી બ્રાઉઝર ખાતરી કરી શકે કે Public Key તે જ Domain ની છે.',
    },
  },
  {
    id: 'ssl-5',
    siteUrl: 'https://legacy.archive-portal.example',
    hasPadlock: false,
    protocol: 'TLS 1.0 (Deprecated)',
    issuer: 'Example CA',
    subjectDomain: 'legacy.archive-portal.example',
    validStatus: 'Valid',
    trustNote: {
      en: 'Server only negotiates outdated TLS 1.0 protocol.',
      gu: 'સર્વર માત્ર જૂના અને અસુરક્ષિત TLS 1.0 પ્રોટોકોલને જ સપોર્ટ કરે છે.',
    },
    question: {
      en: 'Which TLS versions are recommended for modern secure web applications?',
      gu: 'આધુનિક સુરક્ષિત વેબ એપ્લિકેશન માટે કયા TLS વર્ઝનની ભલામણ કરવામાં આવે છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'TLS 1.2 and TLS 1.3 (disabling SSLv3, TLS 1.0, and TLS 1.1).',
          gu: 'TLS 1.2 અને TLS 1.3 (જૂના SSLv3, TLS 1.0 અને 1.1 બંધ કરવા જોઈએ).',
        },
      },
      {
        id: 'b',
        label: {
          en: 'SSL 2.0 because it is the original version.',
          gu: 'SSL 2.0 કારણ કે તે સૌથી પહેલું વર્ઝન છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Plain HTTP because TLS slows down encryption.',
          gu: 'સાદું HTTP કારણ કે TLS જરૂરી નથી.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Modern browsers have deprecated TLS 1.0 and 1.1 due to known cryptographic weaknesses.',
      gu: 'આધુનિક બ્રાઉઝરોએ જૂની ખામીઓને કારણે TLS 1.0 અને 1.1 બંધ કર્યા છે.',
    },
    explanation: {
      en: 'Modern web servers should support TLS 1.3 (preferred) and TLS 1.2 with strong cipher suites, while disabling deprecated SSL and TLS 1.0/1.1 protocols.',
      gu: 'સુરક્ષિત વેબ સર્વરે TLS 1.3 અને TLS 1.2 નો ઉપયોગ કરવો જોઈએ અને જૂના અસુરક્ષિત વર્ઝન બંધ કરવા જોઈએ.',
    },
  },
];

export const BOSS_QUESTION_POOL: BossQuestion[] = [
  {
    id: 'boss-1',
    topic: 'URL Security',
    topicGu: 'URL સુરક્ષા',
    snippet: 'https://login.novabank.example.verify-session.test/auth',
    question: {
      en: 'Who actually owns and controls the webpage at this URL?',
      gu: 'આ URL માં વેબપેજનો સાચો માલિક અને નિયંત્રક Domain કયો છે?',
    },
    options: [
      { id: 'a', label: { en: 'verify-session.test', gu: 'verify-session.test' } },
      { id: 'b', label: { en: 'novabank.example', gu: 'novabank.example' } },
      { id: 'c', label: { en: 'login.novabank', gu: 'login.novabank' } },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Check the root domain immediately to the left of the first single slash "/".',
      gu: 'પ્રથમ "/" ની તરત જ ડાબી બાજુના મુખ્ય Domain ને જુઓ.',
    },
    explanation: {
      en: 'The actual root domain is "verify-session.test". "login.novabank.example" is merely a misleading subdomain prefix.',
      gu: 'સાચો Root Domain "verify-session.test" છે; "login.novabank.example" માત્ર લોકોને છેતરવા મૂકેલો Subdomain છે.',
    },
  },
  {
    id: 'boss-2',
    topic: 'URL Security',
    topicGu: 'URL સુરક્ષા',
    snippet: 'https://support.meridian.example/help',
    question: {
      en: 'If a colleague sends you this clean-looking URL, why should you still verify context?',
      gu: 'જો આ URL દેખાવમાં સ્વચ્છ લાગતું હોય, તો પણ સંદર્ભ (Context) કેમ ચકાસવો જોઈએ?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Because URL appearance alone cannot guarantee complete safety without confirming the source and site integrity.',
          gu: 'કારણ કે માત્ર URL ના દેખાવ પરથી ૧૦૦% સુરક્ષા નક્કી ન થાય; સ્ત્રોત અને સર્ટિફિકેટ પણ તપાસવા પડે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Because HTTPS links always contain viruses.',
          gu: 'કારણ કે HTTPS લિંકમાં હંમેશા વાયરસ હોય છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Because "/help" paths are forbidden in browsers.',
          gu: 'કારણ કે "/help" પાથ બ્રાઉઝરમાં ચાલતા નથી.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Never assume absolute safety from URL text alone.',
      gu: 'માત્ર URL વાંચીને કોઈપણ સાઇટને સંપૂર્ણ સુરક્ષિત ન માનો.',
    },
    explanation: {
      en: 'A clean URL structure is a good sign, not proof of absolute safety. Always verify sender intent, domain authenticity, and TLS status.',
      gu: 'સ્વચ્છ URL એક સારો સંકેત છે, પરંતુ સંપૂર્ણ સુરક્ષાની ખાતરી નથી. હંમેશા સ્ત્રોત અને TLS તપાસો.',
    },
  },
  {
    id: 'boss-3',
    topic: 'URL Security',
    topicGu: 'URL સુરક્ષા',
    snippet: 'https://payp4l-billing-alert.example/update',
    question: {
      en: 'Which deception technique is used in "payp4l"?',
      gu: '"payp4l" શબ્દમાં કઈ છેતરપિંડી યુક્તિ વપરાઈ છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Character substitution / Typosquatting (replacing "a" with "4").',
          gu: 'અક્ષર બદલવાની યુક્તિ / Typosquatting ("a" ને બદલે "4").',
        },
      },
      {
        id: 'b',
        label: {
          en: 'SQL Parameterization.',
          gu: 'SQL Parameterization.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Strict Transport Security.',
          gu: 'Strict Transport Security.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Look at the number "4" inside the brand name.',
      gu: 'બ્રાન્ડ નામમાં વપરાયેલ અંક "4" જુઓ.',
    },
    explanation: {
      en: 'Typosquatting swaps visually similar characters (like "4" for "a" or "0" for "o") to trick quick readers.',
      gu: 'Typosquatting માં મળતા આવતા અક્ષરો કે અંકો ("a" ને બદલે "4") મૂકીને યુઝરને છેતરવામાં આવે છે.',
    },
  },
  {
    id: 'boss-4',
    topic: 'Phishing Defense',
    topicGu: 'Phishing રક્ષણ',
    question: {
      en: 'An email claims your bank account will be locked in 30 minutes unless you click a link and enter your OTP. What should you do?',
      gu: 'એક ઈમેલ કહે છે કે ૩૦ મિનિટમાં લિંક પર OTP નહીં નાખો તો બેંક એકાઉન્ટ બંધ થશે. તમે શું કરશો?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Do not click the link; open your bank’s official app or type its known URL independently.',
          gu: 'લિંક પર ક્લિક ન કરો; બેંકની સત્તાવાર એપ અથવા જાણીતી વેબસાઇટ જાતે ખોલીને તપાસ કરો.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Reply to the email with your OTP quickly.',
          gu: 'તાત્કાલિક ઈમેલના જવાબમાં OTP મોકલી આપો.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Forward the link to coworkers to ask if it works.',
          gu: 'લિંક કામ કરે છે કે નહીં તે જોવા સહકર્મીઓને ફોરવર્ડ કરો.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Artificial urgency + OTP request = classic credential phishing.',
      gu: 'ખોટી ઉતાવળ + OTP ની માંગ = Phishing ની સ્પષ્ટ નિશાની.',
    },
    explanation: {
      en: 'Legitimate institutions never demand OTPs or passwords through urgent email links. Always navigate independently via trusted bookmarks or official apps.',
      gu: 'સાચી બેંકો ક્યારેય ઈમેલ લિંક દ્વારા OTP માંગતી નથી. હંમેશા સત્તાવાર એપ કે જાતે ટાઇપ કરેલા URL થી જ તપાસ કરો.',
    },
  },
  {
    id: 'boss-5',
    topic: 'Phishing Defense',
    topicGu: 'Phishing રક્ષણ',
    question: {
      en: 'Why do attackers impersonate CEOs or managers asking for "confidential" urgent transfers while "in a meeting"?',
      gu: 'હુમલાખોરો મીટિંગમાં હોવાનું બહાનું બતાવી "ગુપ્ત" તાત્કાલિક પેમેન્ટ માટે CEO નું રૂપ કેમ લે છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'To exploit authority and prevent the employee from calling to verify.',
          gu: 'અધિકારીના ડરનો ઉપયોગ કરીને કર્મચારી ફોન કરીને ખાતરી ન કરે તે માટે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Because corporate email servers block non-urgent messages.',
          gu: 'કારણ કે ઓફિસ સર્વર સાદા મેસેજ રોકી દે છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'To test if the company has HSTS enabled.',
          gu: 'કંપનીમાં HSTS ચાલુ છે કે નહીં તે તપાસવા.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Think about the psychology of Business Email Compromise (BEC).',
      gu: 'Business Email Compromise (BEC) ની માનસિક યુક્તિ વિશે વિચારો.',
    },
    explanation: {
      en: 'Secrecy and authority pressure are designed to bypass normal approval and out-of-band phone verification.',
      gu: 'ગુપ્તતા અને અધિકારનું દબાણ કર્મચારીને સામાન્ય ચકાસણી અને ફોન વેરિફિકેશન કરતા રોકવા માટે હોય છે.',
    },
  },
  {
    id: 'boss-6',
    topic: 'Phishing Defense',
    topicGu: 'Phishing રક્ષણ',
    question: {
      en: 'Before clicking a button in an email, what is the best way to inspect where it actually goes?',
      gu: 'ઈમેલમાં કોઈ બટન પર ક્લિક કરતાં પહેલાં તે ખરેખર ક્યાં લઈ જાય છે તે કેવી રીતે તપાસવું?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Hover or long-press to preview the actual destination URL without opening it.',
          gu: 'ક્લિક કર્યા વગર માઉસ Hover કરીને અથવા Long-press વડે અસલી Destination URL જોવું.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Check only the color of the button.',
          gu: 'માત્ર બટનનો રંગ તપાસવો.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Click it twice quickly.',
          gu: 'ઝડપથી બે વાર ક્લિક કરવું.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Button text can say anything, while the underlying `href` reveals the real domain.',
      gu: 'બટન પર કંઈ પણ લખેલું હોઈ શકે છે, અસલી લિંક Hover કરવાથી દેખાય છે.',
    },
    explanation: {
      en: 'Previewing the link destination reveals domain mismatches before any browser navigation occurs.',
      gu: 'લિંક પ્રિવ્યૂ જોવાથી પેજ ખોલ્યા વગર જ નકલી Domain ઓળખી શકાય છે.',
    },
  },
  {
    id: 'boss-7',
    topic: 'SQL Injection',
    topicGu: 'SQL Injection',
    snippet: 'db.query("SELECT * FROM users WHERE email = \'" + email + "\'")',
    question: {
      en: 'What makes this query pattern unsafe?',
      gu: 'આ ક્વેરી પેટર્ન શા માટે અસુરક્ષિત છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Direct string concatenation lets user input break out of quotes and alter SQL logic.',
          gu: 'સીધા String Concatenation થી યુઝર ઇનપુટ SQL ના માળખા અને લોજિકને બદલી શકે છે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Email addresses cannot be queried in SQL.',
          gu: 'SQL માં ઈમેલ એડ્રેસ શોધી શકાતા નથી.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Because the table is named "users".',
          gu: 'કારણ કે ટેબલનું નામ "users" છે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Mixing SQL syntax and raw user strings creates injection risk.',
      gu: 'SQL સિન્ટેક્સ અને કાચા યુઝર ઇનપુટને ભેગું કરવાથી જોખમ ઊભું થાય છે.',
    },
    explanation: {
      en: 'Always replace concatenated user input with parameterized placeholders (`?`, `$1`) or ORM bound parameters.',
      gu: 'હંમેશા સીધા લખાણને બદલે Parameterized Placeholders (`?`, `$1`) નો ઉપયોગ કરો.',
    },
  },
  {
    id: 'boss-8',
    topic: 'SQL Injection',
    topicGu: 'SQL Injection',
    question: {
      en: 'Which approach completely separates SQL commands from user-supplied values?',
      gu: 'કઈ પદ્ધતિ SQL કમાન્ડ અને યુઝરની વિગતોને સંપૂર્ણ અલગ રાખે છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Parameterized Queries (Prepared Statements).',
          gu: 'Parameterized Queries (Prepared Statements).',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Using client-side CSS `display: none` on error alerts.',
          gu: 'CSS થી એરર સંદેશ છુપાવવો.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Renaming database columns to random letters.',
          gu: 'ડેટાબેઝ કોલમના નામ બદલી નાખવા.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'It is the gold-standard defense against SQL Injection.',
      gu: 'આ SQL Injection સામેનો સૌથી શ્રેષ્ઠ ઉપાય છે.',
    },
    explanation: {
      en: 'Prepared statements bind parameters safely at the database driver level so input is never parsed as SQL commands.',
      gu: 'Prepared Statements ડેટાને માત્ર વેલ્યુ તરીકે જ લે છે અને કમાન્ડ તરીકે ચાલવા દેતા નથી.',
    },
  },
  {
    id: 'boss-9',
    topic: 'SQL Injection',
    topicGu: 'SQL Injection',
    question: {
      en: 'Why should an application database user NOT run with full Administrator / Superuser privileges?',
      gu: 'વેબ એપના ડેટાબેઝ યુઝર પાસે પૂરા Administrator અધિકારો શા માટે ન હોવા જોઈએ?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Least Privilege limits damage if any query bug or breach occurs.',
          gu: 'Least Privilege મુજબ જો કોઈ ખામી રહે તો પણ મોટું નુકસાન અટકાવી શકાય છે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Superusers cannot run SELECT queries.',
          gu: 'Superuser ક્યારેય SELECT ક્વેરી ચલાવી શકતા નથી.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'It increases CSS animation speed.',
          gu: 'તે CSS એનિમેશનની ઝડપ વધારે છે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Think about minimizing blast radius.',
      gu: 'સંભવિત નુકસાન મર્યાદિત રાખવા વિશે વિચારો.',
    },
    explanation: {
      en: 'Applying the Principle of Least Privilege to database accounts ensures apps only access the tables and actions they truly need.',
      gu: 'Least Privilege સિદ્ધાંત ખાતરી કરે છે કે એપ માત્ર જરૂરી ટેબલ્સ જ વાપરી શકે.',
    },
  },
  {
    id: 'boss-10',
    topic: 'XSS Prevention',
    topicGu: 'XSS નિવારણ',
    question: {
      en: 'When displaying a user’s comment as plain text in the browser, which approach prevents XSS?',
      gu: 'બ્રાઉઝરમાં યુઝરની કોમેન્ટને સાદા ટેક્સ્ટ તરીકે બતાવતી વખતે કઈ રીત XSS અટકાવે છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Output encoding / `textContent` (converting `<` and `>` into `&lt;` and `&gt;`).',
          gu: 'Output Encoding / `textContent` (`<` અને `>` ને `&lt;` અને `&gt;` માં ફેરવવું).',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Passing the raw comment straight to `innerHTML`.',
          gu: 'કાચી કોમેન્ટ સીધી `innerHTML` માં મૂકવી.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Using `eval()` on the comment string.',
          gu: 'કોમેન્ટ સ્ટ્રિંગ પર `eval()` ચલાવવું.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Safe text rendering never parses user input as live HTML.',
      gu: 'સુરક્ષિત રેન્ડરિંગ યુઝરના લખાણને ક્યારેય લાઇવ HTML ગણતું નથી.',
    },
    explanation: {
      en: 'Output encoding and safe text bindings (`textContent`, React JSX `{comment}`) ensure user input renders strictly as harmless text.',
      gu: 'Output Encoding અને `textContent` ખાતરી કરે છે કે યુઝરનું લખાણ માત્ર સાદું ટેક્સ્ટ જ રહે.',
    },
  },
  {
    id: 'boss-11',
    topic: 'XSS Prevention',
    topicGu: 'XSS નિવારણ',
    snippet: '<a href="{userWebsite}">Profile Link</a>',
    question: {
      en: 'Before rendering `{userWebsite}` inside an `href` attribute, what must your app verify?',
      gu: '`href` ની અંદર `{userWebsite}` મૂકતા પહેલાં એપે શું ચકાસવું જોઈએ?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'That the URL starts with an allowed safe protocol like `https://` or `http://`.',
          gu: 'કે URL માત્ર સુરક્ષિત `https://` અથવા `http://` થી જ શરૂ થાય છે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'That the URL contains at least one uppercase letter.',
          gu: 'કે URL માં ઓછામાં ઓછો એક મોટો અક્ષર (Uppercase) છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Nothing — `href` blocks all script schemes automatically.',
          gu: 'કંઈ નહીં — `href` આપમેળે બધી સ્ક્રિપ્ટ રોકે છે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Prevent dangerous schemes like `javascript:` inside link attributes.',
      gu: 'લિંકની અંદર `javascript:` જેવા જોખમી પ્રોટોકોલ રોકવા જરૂરી છે.',
    },
    explanation: {
      en: 'HTML entity encoding alone does not block `javascript:` URIs inside `href`; explicit protocol allowlisting (`https:` / `http:`) is required.',
      gu: '`href` ની અંદર માત્ર HTML encoding પૂરતું નથી; સુરક્ષિત `https:`/`http:` પ્રોટોકોલની ચકાસણી પણ કરવી પડે છે.',
    },
  },
  {
    id: 'boss-12',
    topic: 'XSS Prevention',
    topicGu: 'XSS નિવારણ',
    question: {
      en: 'How does React’s standard `{userName}` JSX syntax help protect against XSS?',
      gu: 'React ની સામાન્ય `{userName}` JSX સિન્ટેક્સ XSS સામે કેવી રીતે રક્ષણ આપે છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'React automatically escapes text values before inserting them into the DOM.',
          gu: 'React DOM માં મૂકતા પહેલાં ટેક્સ્ટને આપમેળે Escape (Encode) કરી દે છે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'React disables the internet connection.',
          gu: 'React ઇન્ટરનેટ કનેક્શન બંધ કરી દે છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'React converts every string into an SQL query.',
          gu: 'React દરેક સ્ટ્રિંગને SQL ક્વેરીમાં ફેરવે છે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Think about what React does by default when rendering strings inside `{}`.',
      gu: 'React માં `{}` ની અંદર લખાણ બતાવતી વખતે શું થાય છે તે વિચારો.',
    },
    explanation: {
      en: 'React escapes values rendered in JSX by default, treating `<` and `>` as plain text rather than executable markup.',
      gu: 'React ડિફોલ્ટ રીતે JSX ની કિંમતોને Escape કરે છે, જેથી `<` અને `>` સાદા ટેક્સ્ટ તરીકે જ દેખાય.',
    },
  },
  {
    id: 'boss-13',
    topic: 'Security Headers',
    topicGu: 'Security Headers',
    question: {
      en: 'Which HTTP response header instructs browsers to always use HTTPS and block HTTP downgrades?',
      gu: 'કયું HTTP હેડર બ્રાઉઝરને હંમેશા HTTPS વાપરવા અને HTTP ડાઉનગ્રેડ રોકવા કહે છે?',
    },
    options: [
      { id: 'a', label: { en: 'Strict-Transport-Security (HSTS)', gu: 'Strict-Transport-Security (HSTS)' } },
      { id: 'b', label: { en: 'X-Content-Type-Options', gu: 'X-Content-Type-Options' } },
      { id: 'c', label: { en: 'Referrer-Policy', gu: 'Referrer-Policy' } },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Look for HSTS.',
      gu: 'HSTS હેડર શોધો.',
    },
    explanation: {
      en: 'Strict-Transport-Security (HSTS) pins HTTPS usage in the browser for the specified `max-age`.',
      gu: 'Strict-Transport-Security (HSTS) બ્રાઉઝરમાં નક્કી કરેલ સમય માટે HTTPS ફરજિયાત બનાવે છે.',
    },
  },
  {
    id: 'boss-14',
    topic: 'Security Headers',
    topicGu: 'Security Headers',
    question: {
      en: 'What does `X-Content-Type-Options: nosniff` prevent?',
      gu: '`X-Content-Type-Options: nosniff` શું અટકાવે છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'Browsers guessing a different MIME type (like treating plain text as an executable script).',
          gu: 'બ્રાઉઝર દ્વારા ફાઇલનો પ્રકાર જાતે અનુમાન લગાવીને (MIME Sniffing) ટેક્સ્ટને સ્ક્રિપ્ટ ગણવાની ભૂલ.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Users changing their password.',
          gu: 'યુઝરને પાસવર્ડ બદલવાથી.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Images loading over HTTPS.',
          gu: 'HTTPS પર ચિત્રો લોડ થવાથી.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Think about MIME-type sniffing.',
      gu: 'MIME-type sniffing વિશે વિચારો.',
    },
    explanation: {
      en: '`nosniff` ensures browsers strictly follow the Content-Type sent by the server.',
      gu: '`nosniff` બ્રાઉઝરને સર્વર દ્વારા જણાવેલ Content-Type નું કડક પાલન કરવા કહે છે.',
    },
  },
  {
    id: 'boss-15',
    topic: 'Security Headers',
    topicGu: 'Security Headers',
    question: {
      en: 'Which two controls help defend against Clickjacking (framing your site inside another page)?',
      gu: 'Clickjacking (તમારી સાઇટને બીજા પેજની iframe માં મૂકવી) રોકવા કયા હેડર્સ મદદ કરે છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: '`X-Frame-Options` or CSP `frame-ancestors`',
          gu: '`X-Frame-Options` અથવા CSP `frame-ancestors`',
        },
      },
      {
        id: 'b',
        label: {
          en: '`Cache-Control` and `Accept-Language`',
          gu: '`Cache-Control` અને `Accept-Language`',
        },
      },
      {
        id: 'c',
        label: {
          en: '`User-Agent` and `Content-Length`',
          gu: '`User-Agent` અને `Content-Length`',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Both controls explicitly reference "Frame" or "frame-ancestors".',
      gu: 'બંને નિયમોમાં "Frame" શબ્દ આવે છે.',
    },
    explanation: {
      en: 'CSP `frame-ancestors` (modern) and `X-Frame-Options` control which origins may embed your app in a frame.',
      gu: 'CSP `frame-ancestors` અને `X-Frame-Options` નક્કી કરે છે કે તમારી સાઇટને iframe માં કોણ બતાવી શકે.',
    },
  },
  {
    id: 'boss-16',
    topic: 'SSL & HTTPS',
    topicGu: 'SSL અને HTTPS',
    question: {
      en: 'Does an HTTPS padlock icon prove that a shopping website is honest and not a scam?',
      gu: 'શું HTTPS તાળાનું ચિહ્ન (Padlock) સાબિત કરે છે કે શોપિંગ વેબસાઇટ અસલી છે અને છેતરપિંડી કરતી નથી?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'No — it only proves the connection is encrypted; scammers can also obtain valid TLS certificates.',
          gu: 'ના — તે માત્ર કનેક્શન એન્ક્રિપ્ટેડ હોવાની ખાતરી આપે છે; નકલી સાઇટ્સ પાસે પણ TLS સર્ટિફિકેટ હોઈ શકે છે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'Yes — padlocks are only issued to verified Fortune 500 companies.',
          gu: 'હા — તાળું માત્ર મોટી કંપનીઓને જ મળે છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'Yes — browsers audit the business ethics of every HTTPS site.',
          gu: 'હા — બ્રાઉઝર દરેક સાઇટના વ્યવસાયની તપાસ કરે છે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Separate encryption-in-transit from website trustworthiness.',
      gu: 'એન્ક્રિપ્શન અને વેબસાઇટની વિશ્વસનીયતા બંને અલગ બાબતો છે.',
    },
    explanation: {
      en: 'HTTPS protects privacy and integrity in transit, while trustworthiness depends on verifying the domain identity and reputation.',
      gu: 'HTTPS ડેટાને રસ્તામાં સુરક્ષિત રાખે છે, જ્યારે વિશ્વસનીયતા માટે Domain અને સાઇટની અસલ ઓળખ તપાસવી પડે છે.',
    },
  },
  {
    id: 'boss-17',
    topic: 'SSL & HTTPS',
    topicGu: 'SSL અને HTTPS',
    question: {
      en: 'What happens if a TLS certificate’s Subject Domain does not match the website URL you visited?',
      gu: 'જો TLS સર્ટિફિકેટનું Domain અને તમે ખોલેલા વેબસાઇટનું URL મેળ ન ખાય તો શું થાય છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'The browser shows a security warning because server identity cannot be verified.',
          gu: 'બ્રાઉઝર સુરક્ષા ચેતવણી બતાવે છે કારણ કે સર્વરની ઓળખ સાબિત થતી નથી.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'The page loads twice as fast.',
          gu: 'પેજ બમણી ઝડપે ખૂલે છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'The browser automatically converts the site to SQL.',
          gu: 'બ્રાઉઝર સાઇટને SQL માં ફેરવી દે છે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Identity verification is a core job of a digital certificate.',
      gu: 'સર્ટિફિકેટનું મુખ્ય કામ Domain ની ઓળખ ચકાસવાનું છે.',
    },
    explanation: {
      en: 'Domain mismatch indicates either a misconfigured server or potential traffic interception, so browsers block/warn before sending sensitive data.',
      gu: 'Domain અલગ હોવું એ ખોટી ગોઠવણી અથવા વચ્ચેથી ડેટા અટકાવવાનો સંકેત હોઈ શકે છે.',
    },
  },
  {
    id: 'boss-18',
    topic: 'SSL & HTTPS',
    topicGu: 'SSL અને HTTPS',
    question: {
      en: 'Why is TLS 1.3 preferred over legacy SSL 3.0 or TLS 1.0?',
      gu: 'જૂના SSL 3.0 કે TLS 1.0 કરતાં TLS 1.3 કેમ વધુ સારું છે?',
    },
    options: [
      {
        id: 'a',
        label: {
          en: 'TLS 1.3 removes broken legacy ciphers, enforces forward secrecy, and completes handshakes faster and more securely.',
          gu: 'TLS 1.3 જૂના નબળા અલ્ગોરિધમ દૂર કરે છે, Forward Secrecy આપે છે અને વધુ ઝડપી તથા સુરક્ષિત છે.',
        },
      },
      {
        id: 'b',
        label: {
          en: 'TLS 1.3 turns off encryption for speed.',
          gu: 'TLS 1.3 ઝડપ માટે એન્ક્રિપ્શન બંધ કરી દે છે.',
        },
      },
      {
        id: 'c',
        label: {
          en: 'TLS 1.3 only works on plain HTTP ports.',
          gu: 'TLS 1.3 માત્ર સાદા HTTP પોર્ટ પર ચાલે છે.',
        },
      },
    ],
    correctOptionId: 'a',
    hint: {
      en: 'Modern TLS drops weak algorithms and strengthens session security.',
      gu: 'આધુનિક TLS નબળી પદ્ધતિઓ હટાવીને મજબૂત સુરક્ષા આપે છે.',
    },
    explanation: {
      en: 'TLS 1.3 streamlines the handshake and mandates modern authenticated encryption with Perfect Forward Secrecy.',
      gu: 'TLS 1.3 આધુનિક એન્ક્રિપ્શન અને Forward Secrecy સાથે વધુ ઝડપી અને સુરક્ષિત જોડાણ આપે છે.',
    },
  },
];

export function pickRandomBossQuestions(count = 10): BossQuestion[] {
  const copy = [...BOSS_QUESTION_POOL];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}
