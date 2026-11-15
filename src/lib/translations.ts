export type Locale = "en" | "mr" | "hi";

export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    businesses: string;
    catalogue: string;
    vision: string;
    journey: string;
    news: string;
    careers: string;
    contact: string;
    partnerWithUs: string;
  };
  brand: {
    siteName: string;
    tagline: string;
    descriptor: string;
    corporateAssurance: string;
    corporateAssuranceDesc: string;
    headquarters: string;
    hqLocation: string;
  };
  actions: {
    getQuote: string;
    orderNow: string;
    chatWhatsApp: string;
    callSales: string;
    exploreProducts: string;
    exploreServices: string;
    viewCatalogue: string;
    initiateEnquiry: string;
    submitEnquiry: string;
    submitting: string;
    successMsg: string;
    errorMsg: string;
    viewAllBusinesses: string;
    corporateProfile: string;
    viewDetails: string;
    learnMore: string;
    backToHome: string;
  };
  trust: {
    wholesalePricing: string;
    wholesalePricingDesc: string;
    swiftLogistics: string;
    swiftLogisticsDesc: string;
    gstCompliant: string;
    gstCompliantDesc: string;
    dedicatedSupport: string;
    dedicatedSupportDesc: string;
    verifiedSeal: string;
    gstBillingBadge: string;
  };
  procurement: {
    tagline: string;
    titlePrefix: string;
    subtitle: string;
    step1Num: string;
    step1Title: string;
    step1Desc: string;
    step1Badge: string;
    step2Num: string;
    step2Title: string;
    step2Desc: string;
    step2Badge: string;
    step3Num: string;
    step3Title: string;
    step3Desc: string;
    step3Badge: string;
    stepIndicator: string;
  };
  forms: {
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    businessInterestLabel: string;
    selectBusiness: string;
    enquiryTypeLabel: string;
    selectType: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    orCallDirectly: string;
    privacyConsent: string;
  };
  chatbot: {
    title: string;
    verifiedDesk: string;
    onlineStatus: string;
    officialDesk: string;
    welcomeIntro: string;
    welcomePrompt: string;
    hotlinePrefix: string;
    topicPrompt: string;
    inputPlaceholder: string;
    namePlaceholder: string;
    chatButton: string;
    connectingStatus: string;
    callVoice: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    ourBusinesses: string;
    governanceLegal: string;
    connectWithUs: string;
    privacyPolicy: string;
    termsConditions: string;
    allRightsReserved: string;
    madeWithPride: string;
  };
  businesses: Record<
    string,
    {
      name: string;
      category: string;
      tagline: string;
      cta: string;
    }
  >;
}

export const translations: Record<Locale, TranslationDictionary> = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      businesses: "Our Businesses",
      catalogue: "Catalogue",
      vision: "Our Vision",
      journey: "Our Journey",
      news: "News & Updates",
      careers: "Careers",
      contact: "Contact",
      partnerWithUs: "Partner With Us",
    },
    brand: {
      siteName: "SANGALES",
      tagline: "Building Businesses. Creating Opportunities.",
      descriptor: "A Group of Companies",
      corporateAssurance: "SANGALES Corporate Assurance",
      corporateAssuranceDesc:
        "All commercial agreements and deliveries are backed by the statutory diligence and governance of SANGALES – A GROUP OF COMPANIES.",
      headquarters: "Corporate Headquarters",
      hqLocation: "Nashik, Maharashtra, India",
    },
    actions: {
      getQuote: "Get Quote",
      orderNow: "Order Now",
      chatWhatsApp: "Chat on WhatsApp",
      callSales: "Call Sales",
      exploreProducts: "Explore Products",
      exploreServices: "Explore Services",
      viewCatalogue: "View Catalogue",
      initiateEnquiry: "Initiate an Enquiry",
      submitEnquiry: "Submit Enquiry",
      submitting: "Submitting...",
      successMsg: "Enquiry submitted successfully. Our team will contact you shortly.",
      errorMsg: "Something went wrong. Please try again or reach out on WhatsApp.",
      viewAllBusinesses: "All Businesses",
      corporateProfile: "Corporate Profile",
      viewDetails: "View Details",
      learnMore: "Learn More",
      backToHome: "Back to Home",
    },
    trust: {
      wholesalePricing: "Direct Wholesale Pricing",
      wholesalePricingDesc: "Transparent manufacturer rates with tiered volume discounts.",
      swiftLogistics: "Swift Dispatch & Logistics",
      swiftLogisticsDesc: "Staged warehouse inventory with rapid transit across Maharashtra & Pan-India.",
      gstCompliant: "100% GST Tax Compliant",
      gstCompliantDesc: "Full statutory billing eligible for commercial input tax credit (ITC).",
      dedicatedSupport: "Dedicated Account Support",
      dedicatedSupportDesc: "Instant hotline (+91 75077 00936) & WhatsApp contractor coordination.",
      verifiedSeal: "Official Brand Seal",
      gstBillingBadge: "Statutory 100% GST Billing",
    },
    procurement: {
      tagline: "Commercial Workflow",
      titlePrefix: "How Procurement Works with",
      subtitle:
        "Streamlined 3-step commercial process engineered for institutional buyers, contractors, distributors, and enterprise clients.",
      step1Num: "01",
      step1Title: "Specify Requirements & Volume",
      step1Desc:
        "Select your required product line or packaging dimensions, estimate your order quantities, and share your delivery pincode via our quick quote form or direct WhatsApp.",
      step1Badge: "Quick 2-Minute Response",
      step2Num: "02",
      step2Title: "Receive Commercial Proforma & Samples",
      step2Desc:
        "Our sales desk delivers clear, volume-tiered wholesale quotations with statutory GST pricing, technical data sheets, and expedited physical sample kits if needed.",
      step2Badge: "Transparent B2B Pricing",
      step3Num: "03",
      step3Title: "Consignment Dispatch & GST Invoicing",
      step3Desc:
        "Following proforma confirmation, your order is inspected, packed, and dispatched with GST tax invoice, transport consignment notes, and end-to-end transit tracking.",
      step3Badge: "Assured Fast Transit",
      stepIndicator: "Step",
    },
    forms: {
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "e.g. Rahul Sharma",
      phoneLabel: "Mobile Number",
      phonePlaceholder: "+91 98765 43210",
      emailLabel: "Email Address",
      emailPlaceholder: "name@company.com",
      businessInterestLabel: "Business of Interest",
      selectBusiness: "Select Business Entity",
      enquiryTypeLabel: "Enquiry Type",
      selectType: "Select Nature of Enquiry",
      messageLabel: "Enquiry Message & Quantities",
      messagePlaceholder: "Please share product requirements, estimated volume, and delivery destination...",
      submitButton: "Send Business Enquiry",
      orCallDirectly: "Or speak directly with our commercial desk:",
      privacyConsent: "I agree to be contacted by SANGALES Group regarding this business enquiry.",
    },
    chatbot: {
      title: "Ask to Samiksha",
      verifiedDesk: "Verified Desk",
      onlineStatus: "Corporate Representative • Online Now",
      officialDesk: "Official Desk",
      welcomeIntro: "Namaste! 🙏 Welcome to SANGALES – A GROUP OF COMPANIES.",
      welcomePrompt:
        "How can I assist your business today? Select a department below or type your message to connect directly with me on WhatsApp.",
      hotlinePrefix: "Hotline:",
      topicPrompt: "Select an Enquiry Topic:",
      inputPlaceholder: "Type your message for WhatsApp representative...",
      namePlaceholder: "Your Name (optional)",
      chatButton: "Chat on WhatsApp (Direct)",
      connectingStatus: "Connecting to WhatsApp...",
      callVoice: "Or voice call:",
    },
    footer: {
      description:
        "A diversified Indian business group bringing together wholesome food, sustainable agriculture, commercial trading, packaging solutions, and next-generation enterprise innovation.",
      quickLinks: "Quick Navigation",
      ourBusinesses: "Group Portfolio",
      governanceLegal: "Governance & Policies",
      connectWithUs: "Commercial Desk",
      privacyPolicy: "Privacy Policy",
      termsConditions: "Terms of Service",
      allRightsReserved: "All Rights Reserved.",
      madeWithPride: "SANGALES – A GROUP OF COMPANIES",
    },
    businesses: {
      "sangales-enterprises": {
        name: "Sangales Enterprises",
        category: "Electrical & Lighting Solutions",
        tagline: "Illuminating spaces with energy-efficient innovation.",
        cta: "Explore Products",
      },
      "sangales-trading": {
        name: "Sangales Trading",
        category: "Construction Steel & Building Materials",
        tagline: "Core structural steel & premium interior finishings.",
        cta: "Business Enquiry",
      },
      "sangales-packaging": {
        name: "Sangales Packaging",
        category: "Packaging Solutions & Disposables",
        tagline: "High-grade food packaging and wholesale disposables.",
        cta: "Request Wholesale Quote",
      },
      "annamrit-foods": {
        name: "Annamrit Foods",
        category: "Healthy Chaat, Sprouts & Wholesome Meals",
        tagline: "Nourishing lives with natural purity and hygiene.",
        cta: "Order Now",
      },
      "sangales-farms": {
        name: "Sangales Farms",
        category: "Agro Commodities & Wholesome Grains",
        tagline: "Naturally cultivated grains, vegetables, and ancient millets.",
        cta: "Product Enquiry",
      },
      "sangales-digital": {
        name: "Sangales Digital",
        category: "Software, CRM & Enterprise Solutions",
        tagline: "Architecting modern digital infrastructure and custom software.",
        cta: "Explore Services",
      },
      "anvayi-farms": {
        name: "Anvayi Farms",
        category: "Pure A2 Vedic Desi Cow Bilona Ghee",
        tagline: "Traditional Bilona method A2 Ghee from grass-fed cows.",
        cta: "Buy Pure Ghee",
      },
    },
  },

  mr: {
    nav: {
      home: "मुखपृष्ठ",
      about: "आमच्याबद्दल",
      businesses: "आमचे व्यवसाय",
      catalogue: "उत्पादन सूची",
      vision: "आमचा दृष्टिकोन",
      journey: "आमचा प्रवास",
      news: "घडामोडी व बातम्या",
      careers: "करिअर",
      contact: "संपर्क",
      partnerWithUs: "सहकार्य करा",
    },
    brand: {
      siteName: "सांगळे",
      tagline: "व्यवसाय निर्मिती. संधींची निर्मिती.",
      descriptor: "कंपन्यांचा समूह",
      corporateAssurance: "सांगळे ग्रुप कॉर्पोरेट हमी",
      corporateAssuranceDesc:
        "सर्व व्यावसायिक करार आणि पुरवठा 'सांगळे – कंपन्यांचा समूह' च्या कायदेशीर मानकांनुसार आणि विश्वासार्हतेनुसार चालवले जातात.",
      headquarters: "मुख्य कॉर्पोरेट कार्यालय",
      hqLocation: "नाशिक, महाराष्ट्र, भारत",
    },
    actions: {
      getQuote: "दरपत्रक मिळवा",
      orderNow: "ऑर्डर करा",
      chatWhatsApp: "व्हॉट्सॲपवर संपर्क करा",
      callSales: "विक्री विभागास कॉल करा",
      exploreProducts: "उत्पादने पहा",
      exploreServices: "सेवांची माहिती घ्या",
      viewCatalogue: "कॅटलॉग पहा",
      initiateEnquiry: "चौकशी सुरू करा",
      submitEnquiry: "चौकशी पाठवा",
      submitting: "माहिती पाठवत आहे...",
      successMsg: "आपली चौकशी यशस्वीरीत्या नोंदवली गेली आहे. आमची टीम लवकरच संपर्क करेल.",
      errorMsg: "काही तांत्रिक अडचण आली आहे. कृपया पुन्हा प्रयत्न करा किंवा व्हॉट्सॲपवर संपर्क साधा.",
      viewAllBusinesses: "सर्व व्यवसाय",
      corporateProfile: "व्यवसाय माहिती",
      viewDetails: "सविस्तर माहिती",
      learnMore: "अधिक जाणून घ्या",
      backToHome: "मुखपृष्ठावर जा",
    },
    trust: {
      wholesalePricing: "थेट घाऊक दर",
      wholesalePricingDesc: "मोठ्या ऑर्डर्ससाठी थेट उत्पादक दर आणि आकर्षक व्हॉल्यूम सवलती.",
      swiftLogistics: "जलद वाहतूक व वितरण",
      swiftLogisticsDesc: "महाराष्ट्र व देशभरात वेळेवर आणि सुरक्षित मालाची पोहोच.",
      gstCompliant: "१००% अधिकृत जीएसटी बिलिंग",
      gstCompliantDesc: "सर्व ऑर्डर्ससाठी योग्य जीएसटी टॅक्स इनव्हॉईस आणि आयटीसी (ITC) लाभ.",
      dedicatedSupport: "समर्पित ग्राहक सहकार्य",
      dedicatedSupportDesc: "थेट हेल्पलाइन (+91 75077 00936) आणि व्हॉट्सॲपवरून जलद मदत.",
      verifiedSeal: "अधिकृत ब्रँड शिक्का",
      gstBillingBadge: "१००% अधिकृत जीएसटी बिलिंग",
    },
    procurement: {
      tagline: "व्यावसायिक खरेदी प्रक्रिया",
      titlePrefix: "खरेदी प्रक्रिया &bull;",
      subtitle:
        "व्यापारी, कंत्राटदार, घाऊक विक्रेते आणि संस्थात्मक ग्राहकांसाठी सोपी व विश्वासार्ह ३-टप्प्यांची कार्यपद्धती.",
      step1Num: "०१",
      step1Title: "उत्पादन व प्रमाणाची माहिती द्या",
      step1Desc:
        "आपल्याला आवश्यक असणारे उत्पादन, आकारमान किंवा परिमाणे निवडा आणि डिलिव्हरी पिनकोडसह व्हॉट्सॲप किंवा फॉर्मद्वारे कळवा.",
      step1Badge: "२ मिनिटांत प्रतिसाद",
      step2Num: "०२",
      step2Title: "दरपत्रक व नमुने मिळवा",
      step2Desc:
        "आमच्या विक्री विभागाकडून पारदर्शक जीएसटी दरपत्रक, तांत्रिक माहिती आणि आवश्यक असल्यास सॅम्पल किट पाठवले जातात.",
      step2Badge: "पारदर्शक B2B दर",
      step3Num: "०३",
      step3Title: "मालाची रवानगी व जीएसटी बिल",
      step3Desc:
        "ऑर्डर निश्चितीनंतर मालाची कसून तपासणी करून जीएसटी इनव्हॉईस व ट्रान्सपोर्ट पावत्यांसह थेट साइटवर सुरक्षित रवानगी केली जाते.",
      step3Badge: "खात्रीशीर जलद डिलिव्हरी",
      stepIndicator: "टप्पा",
    },
    forms: {
      fullNameLabel: "पूर्ण नाव",
      fullNamePlaceholder: "उदा. राहुल पाटील / सचिन सांगळे",
      phoneLabel: "मोबाईल नंबर",
      phonePlaceholder: "+91 98765 43210",
      emailLabel: "ईमेल पत्ता",
      emailPlaceholder: "name@company.com",
      businessInterestLabel: "संबंधित व्यवसाय निवडा",
      selectBusiness: "व्यवसाय निवडा",
      enquiryTypeLabel: "चौकशीचे स्वरूप",
      selectType: "चौकशीचा प्रकार निवडा",
      messageLabel: "आपली आवश्यकता व प्रमाण",
      messagePlaceholder: "कृपया उत्पादनाचे नाव, आवश्यक प्रमाण आणि डिलिव्हरीचे ठिकाण लिहा...",
      submitButton: "चौकशी पाठवा",
      orCallDirectly: "किंवा थेट विक्री विभागाशी बोला:",
      privacyConsent: "मी सांगळे समूहाला या व्यावसायिक चौकशीबाबत माझ्याशी संपर्क साधण्याची संमती देतो/देते.",
    },
    chatbot: {
      title: "समीक्षाशी बोला",
      verifiedDesk: "अधिकृत कक्ष",
      onlineStatus: "कॉर्पोरेट प्रतिनिधी • ऑनलाइन उपलब्ध",
      officialDesk: "अधिकृत प्रतिनिधी",
      welcomeIntro: "नमस्ते! 🙏 सांगळे – कंपन्यांच्या समूहामध्ये आपले स्वागत आहे.",
      welcomePrompt:
        "मी आज आपल्या व्यवसायासाठी कशी मदत करू शकते? खालील विषय निवडा किंवा व्हॉट्सॲपवर थेट संवाद साधण्यासाठी आपला संदेश टाइप करा.",
      hotlinePrefix: "हेल्पलाइन:",
      topicPrompt: "चौकशीचा विषय निवडा:",
      inputPlaceholder: "व्हॉट्सॲप प्रतिनिधीसाठी संदेश लिहा...",
      namePlaceholder: "आपले नाव (ऐच्छिक)",
      chatButton: "व्हॉट्सॲपवर चॅट करा (थेट)",
      connectingStatus: "व्हॉट्सॲपशी जोडत आहे...",
      callVoice: "किंवा थेट कॉल करा:",
    },
    footer: {
      description:
        "पौष्टिक अन्न उत्पादने, सेंद्रिय शेती, व्यावसायिक स्टील व बांधकाम साहित्य, पॅकेजिंग आणि आधुनिक डिजिटल तंत्रज्ञानाचा एकाच छताखाली संगम असणारा महाराष्ट्रातील अग्रगण्य उद्योग समूह.",
      quickLinks: "महत्त्वाच्या लिंक्स",
      ourBusinesses: "समूहातील व्यवसाय",
      governanceLegal: "नियम व धोरणे",
      connectWithUs: "व्यावसायिक संपर्क",
      privacyPolicy: "गोपनीयता धोरण",
      termsConditions: "नियम व अटी",
      allRightsReserved: "सर्व हक्क राखीव.",
      madeWithPride: "सांगळे – कंपन्यांचा समूह",
    },
    businesses: {
      "sangales-enterprises": {
        name: "सांगळे एंटरप्रायझेस",
        category: "विद्युत व आधुनिक एलईडी प्रकाश व्यवस्था",
        tagline: "ऊर्जा बचत आणि अत्याधुनिक एलईडी तंत्रज्ञानाने उजळणारी प्रकाश व्यवस्था.",
        cta: "उत्पादने पहा",
      },
      "sangales-trading": {
        name: "सांगळे ट्रेडिंग",
        category: "बांधकाम स्टील व अंतर्गत सजावट साहित्य",
        tagline: "उच्च प्रतीचे टीएमटी स्टील, वॉटरप्रूफ पीव्हीसी प्लाय आणि लक्झरी वॉलपेपर्स.",
        cta: "व्यावसायिक चौकशी",
      },
      "sangales-packaging": {
        name: "सांगळे पॅकेजिंग",
        category: "अन्न पॅकेजिंग व डिस्पोजेबल उत्पादने",
        tagline: "हॉटेल व क्लाउड किचनसाठी दर्जेदार जेवणाचे बॉक्सेस, फॉइल कंटेनर्स व पेपर बॅग्ज.",
        cta: "होलसेल दरपत्रक मिळवा",
      },
      "annamrit-foods": {
        name: "अमृतान्न (अन्नमृत) फूड्स",
        category: "पौष्टिक चाट, मोड आलेली कडधान्ये व आहार",
        tagline: "नैसर्गिक शुद्धता, स्वच्छता आणि चवीने परिपूर्ण आरोग्यदायी आहार.",
        cta: "ऑर्डर करा",
      },
      "sangales-farms": {
        name: "सांगळे फार्म्स",
        category: "सेंद्रिय शेती व अस्सल धान्य उत्पादने",
        tagline: "रासायनिक खतांविरहित सेंद्रिय भाजीपाला, गहू, बाजरी, ज्वारी व भरड धान्ये.",
        cta: "उत्पादन चौकशी",
      },
      "sangales-digital": {
        name: "सांगळे डिजिटल",
        category: "सॉफ्टवेअर, सीआरएम व डिजिटल प्लॅटफॉर्म्स",
        tagline: "उद्योगांसाठी आधुनिक डिजिटल वेबसाइट्स, कस्टम सीआरएम व एआय सिस्टीम्स.",
        cta: "सेवांची माहिती घ्या",
      },
      "anvayi-farms": {
        name: "अन्वयी फार्म्स",
        category: "अस्सल देशी गायीचे ए२ बिलोना तूप",
        tagline: "पारंपरिक वैदिक बिलोना पद्धतीने तयार केलेले अस्सल साजूक तूप.",
        cta: "शुद्ध तूप खरेदी करा",
      },
    },
  },

  hi: {
    nav: {
      home: "मुख्य पृष्ठ",
      about: "हमारे बारे में",
      businesses: "हमारे व्यवसाय",
      catalogue: "उत्पाद कैटलॉग",
      vision: "हमारा विजन",
      journey: "हमारा सफर",
      news: "समाचार एवं अपडेट्स",
      careers: "करियर",
      contact: "संपर्क करें",
      partnerWithUs: "भागीदारी करें",
    },
    brand: {
      siteName: "सांगळे",
      tagline: "व्यवसाय निर्माण. अवसरों का सृजन.",
      descriptor: "कंपनियों का समूह",
      corporateAssurance: "सांगळे ग्रुप कॉर्पोरेट भरोसा",
      corporateAssuranceDesc:
        "सभी वाणिज्यिक समझौते और माल आपूर्ति 'सांगळे – कंपनियों का समूह' के वैधानिक मानकों और विश्वसनीयता द्वारा समर्थित हैं।",
      headquarters: "कॉर्पोरेट मुख्यालय",
      hqLocation: "नासिक, महाराष्ट्र, भारत",
    },
    actions: {
      getQuote: "कोटेशन प्राप्त करें",
      orderNow: "ऑर्डर करें",
      chatWhatsApp: "व्हाट्सएप पर संपर्क करें",
      callSales: "सेल्स टीम को कॉल करें",
      exploreProducts: "उत्पाद देखें",
      exploreServices: "सेवाएं देखें",
      viewCatalogue: "कैटलॉग देखें",
      initiateEnquiry: "पूछताछ शुरू करें",
      submitEnquiry: "पूछताछ भेजें",
      submitting: "भेजा जा रहा है...",
      successMsg: "आपकी पूछताछ सफलतापूर्वक दर्ज कर ली गई है। हमारी टीम जल्द ही आपसे संपर्क करेगी।",
      errorMsg: "कुछ तकनीकी समस्या आई है। कृपया पुनः प्रयास करें या व्हाट्सएप पर संपर्क करें।",
      viewAllBusinesses: "सभी व्यवसाय",
      corporateProfile: "कंपनी प्रोफाइल",
      viewDetails: "विस्तृत विवरण",
      learnMore: "और जानें",
      backToHome: "मुख्य पृष्ठ पर जाएं",
    },
    trust: {
      wholesalePricing: "सीधे थोक मूल्य",
      wholesalePricingDesc: "निर्माता दर पर पारदर्शी मूल्य और बड़े ऑर्डर पर विशेष छूट।",
      swiftLogistics: "त्वरित माल प्रेषण व लॉजिस्टिक्स",
      swiftLogisticsDesc: "महाराष्ट्र और पूरे भारत में सुरक्षित और तीव्र गति से माल आपूर्ति।",
      gstCompliant: "100% जीएसटी बिलिंग",
      gstCompliantDesc: "व्यावसायिक इनपुट टैक्स क्रेडिट (ITC) के लिए पूर्ण वैधानिक इनवॉइस।",
      dedicatedSupport: "समर्पित ग्राहक सहायता",
      dedicatedSupportDesc: "सीधी हेल्पलाइन (+91 75077 00936) और व्हाट्सएप पर त्वरित सहायता।",
      verifiedSeal: "आधिकारिक ब्रांड सील",
      gstBillingBadge: "100% अधिकृत जीएसटी बिलिंग",
    },
    procurement: {
      tagline: "व्यावसायिक खरीद प्रक्रिया",
      titlePrefix: "व्यावसायिक खरीद प्रक्रिया &bull;",
      subtitle:
        "संस्थागत खरीदारों, ठेकेदारों, थोक विक्रेताओं और कॉर्पोरेट ग्राहकों के लिए सुगम 3-चरणीय व्यवस्था।",
      step1Num: "01",
      step1Title: "आवश्यकता और मात्रा दर्ज करें",
      step1Desc:
        "अपने आवश्यक उत्पाद या पैकेजिंग आयाम चुनें, अनुमानित मात्रा और डिलीवरी पिनकोड व्हाट्सएप या ऑनलाइन फॉर्म से साझा करें।",
      step1Badge: "2 मिनट में त्वरित उत्तर",
      step2Num: "02",
      step2Title: "कोटेशन और सैंपल प्राप्त करें",
      step2Desc:
        "हमारी सेल्स टीम से पारदर्शी जीएसटी कोटेशन, तकनीकी विनिर्देश और आवश्यकतानुसार सैंपल किट प्राप्त करें।",
      step2Badge: "पारदर्शी थोक दर",
      step3Num: "03",
      step3Title: "माल प्रेषण और जीएसटी इनवॉइस",
      step3Desc:
        "पुष्टि के बाद ऑर्डर की जांच, सुरक्षित पैकिंग और जीएसटी इनवॉइस तथा ट्रांसपोर्ट बिल्टी के साथ सुरक्षित प्रेषण।",
      step3Badge: "निश्चित तीव्र डिलीवरी",
      stepIndicator: "चरण",
    },
    forms: {
      fullNameLabel: "पूरा नाम",
      fullNamePlaceholder: "उदा. राहुल शर्मा",
      phoneLabel: "मोबाइल नंबर",
      phonePlaceholder: "+91 98765 43210",
      emailLabel: "ईमेल पता",
      emailPlaceholder: "name@company.com",
      businessInterestLabel: "संबंधित व्यवसाय चुनें",
      selectBusiness: "व्यवसाय चुनें",
      enquiryTypeLabel: "पूछताछ का प्रकार",
      selectType: "पूछताछ का प्रकार चुनें",
      messageLabel: "आवश्यक उत्पाद एवं विवरण",
      messagePlaceholder: "कृपया उत्पाद का नाम, आवश्यक मात्रा और डिलीवरी स्थान लिखें...",
      submitButton: "पूछताछ भेजें",
      orCallDirectly: "या सीधे हमारे सेल्स डेस्क से बात करें:",
      privacyConsent: "मैं सांगळे समूह को इस व्यावसायिक पूछताछ के संबंध में मुझसे संपर्क करने की सहमति देता/देती हूँ।",
    },
    chatbot: {
      title: "समीक्षा से पूछें",
      verifiedDesk: "सत्यापित डेस्क",
      onlineStatus: "कॉर्पोरेट प्रतिनिधि • ऑनलाइन उपलब्ध",
      officialDesk: "आधिकारिक डेस्क",
      welcomeIntro: "नमस्ते! 🙏 सांगळे – कंपनियों के समूह में आपका स्वागत है।",
      welcomePrompt:
        "मैं आज आपके व्यवसाय की क्या सहायता कर सकती हूँ? नीचे से विषय चुनें या सीधे व्हाट्सएप पर जुड़ने के लिए अपना संदेश लिखें।",
      hotlinePrefix: "हेल्पलाइन:",
      topicPrompt: "पूछताछ का विषय चुनें:",
      inputPlaceholder: "व्हाट्सएप प्रतिनिधि के लिए संदेश लिखें...",
      namePlaceholder: "आपका नाम (वैकल्पिक)",
      chatButton: "व्हाट्सएप पर चैट करें (सीधे)",
      connectingStatus: "व्हाट्सएप से जोड़ा जा रहा है...",
      callVoice: "या कॉल करें:",
    },
    footer: {
      description:
        "पौष्टिक खाद्य पदार्थ, प्राकृतिक कृषि, निर्माण सामग्री, आधुनिक पैकेजिंग और नेक्स्ट-जेन डिजिटल सिस्टम का संगम - भारत का अग्रणी व्यापारिक समूह।",
      quickLinks: "महत्वपूर्ण लिंक्स",
      ourBusinesses: "समूह के व्यवसाय",
      governanceLegal: "नीतियां एवं नियम",
      connectWithUs: "व्यावसायिक संपर्क",
      privacyPolicy: "गोपनीयता नीति",
      termsConditions: "नियम एवं शर्तें",
      allRightsReserved: "सर्वाधिकार सुरक्षित।",
      madeWithPride: "सांगळे – कंपनियों का समूह",
    },
    businesses: {
      "sangales-enterprises": {
        name: "सांगळे एंटरप्राइजेज",
        category: "इलेक्ट्रिकल एवं आधुनिक एलईडी लाइटिंग",
        tagline: "ऊर्जा-कुशल और अत्याधुनिक एलईडी प्रकाश समाधान।",
        cta: "उत्पाद देखें",
      },
      "sangales-trading": {
        name: "सांगळे ट्रेडिंग",
        category: "निर्माण स्टील एवं इंटीरियर फिनिशिंग सामग्री",
        tagline: "उच्च गुणवत्ता टीएमटी स्टील, वाटरप्रूफ पीवीसी प्लाई और लक्जरी वॉलपेपर्स।",
        cta: "व्यावसायिक पूछताछ",
      },
      "sangales-packaging": {
        name: "सांगळे पैकेजिंग",
        category: "पैकेजिंग समाधान एवं डिस्पोजेबल्स",
        tagline: "रेस्टोरेंट और फूड डिलीवरी हेतु मील बॉक्स, एल्युमीनियम कंटेनर्स व पेपर बैग्स।",
        cta: "थोक कोटेशन प्राप्त करें",
      },
      "annamrit-foods": {
        name: "अमृतान्न (अन्नमृत) फूड्स",
        category: "पौष्टिक चाट, अंकुरित अनाज व आहार",
        tagline: "प्राकृतिक शुद्धता, स्वच्छता और स्वाद से भरपूर सेहतमंद आहार।",
        cta: "ऑर्डर करें",
      },
      "sangales-farms": {
        name: "सांगळे फार्म्स",
        category: "प्राकृतिक कृषि उत्पाद एवं अनाज",
        tagline: "रासायनिक मुक्त जैविक सब्जियां, गेहूं, बाजरा, ज्वार और पोषक मिलेट्स।",
        cta: "उत्पाद पूछताछ",
      },
      "sangales-digital": {
        name: "सांगळे डिजिटल",
        category: "सॉफ्टवेयर, सीआरएम एवं डिजिटल इंफ्रास्ट्रक्चर",
        tagline: "उद्यमों के लिए आधुनिक डिजिटल प्लेटफॉर्म, कस्टम सीआरएम व सॉफ्टवेयर।",
        cta: "सेवाएं देखें",
      },
      "anvayi-farms": {
        name: "अन्वयी फार्म्स",
        category: "शुद्ध ए2 वैदिक बिलोना गाय का घी",
        tagline: "पारंपरिक वैदिक बिलोना पद्धति से निर्मित शुद्ध देशी गाय का घी।",
        cta: "शुद्ध घी खरीदें",
      },
    },
  },
};

/**
 * Helper to get nested translation value safely
 */
export function getTranslation(locale: Locale, path: string): string {
  const dict = translations[locale] || translations.en;
  const parts = path.split(".");
  let current: any = dict;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      // Fallback to English if not found
      let fallback: any = translations.en;
      for (const fbPart of parts) {
        if (fallback && typeof fallback === "object" && fbPart in fallback) {
          fallback = fallback[fbPart];
        } else {
          return path;
        }
      }
      return typeof fallback === "string" ? fallback : path;
    }
  }

  return typeof current === "string" ? current : path;
}

