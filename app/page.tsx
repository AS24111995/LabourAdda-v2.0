"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Plus, 
  X, 
  ChevronRight, 
  Settings, 
  CheckCircle2, 
  UserCheck, 
  Clock, 
  IndianRupee,
  Briefcase,
  Wrench,
  Hammer,
  Users,
  Sprout,
  HelpCircle,
  AlertCircle,
  Volume2,
  VolumeX,
  Upload,
  Camera,
  ArrowLeft,
  Check,
  FileText,
  Award,
  TrendingUp,
  Copy,
  Edit3,
  Share2,
  Download,
  ChevronDown,
  Calendar,
  Info,
  RefreshCw,
  Play,
  Pause,
  Filter,
  SlidersHorizontal,
  Sparkles,
  Phone,
  MessageSquare,
  Eye,
  Bookmark,
  Shield,
  Coins,
  CreditCard,
  CheckCircle,
  ShieldAlert
} from "lucide-react";

import {
  ProfessionIllustration,
  CategoryIllustration,
  DashboardIllustration,
  IntelIllustration,
  HeroIllustration
} from "../components/ProfessionIllustrations";

// Initial static dataset of professions based on the required categories
interface Profession {
  id: string;
  name: string;
  hindiName: string;
  category: "construction" | "repair" | "general" | "rural" | "helper";
  roleLabel: string;
  typicalTasks: string[];
  wageRange: {
    min: number;
    max: number;
    unit: "day" | "hour" | "contract";
  };
  availability: "Daily" | "Hourly" | "Contract" | "Flexible";
  description: string;
  imageSeed: string; // Used for unique visual backgrounds
}

const INITIAL_PROFESSIONS: Profession[] = [
  {
    id: "p1",
    name: "Mason",
    hindiName: "राजमिस्त्री (Rajmistri)",
    category: "construction",
    roleLabel: "राजमिस्त्री / Mason",
    typicalTasks: [
      "ईंटों की चिनाई और दीवार बनाना (Bricklaying & wall construction)",
      "प्लास्टर और कंक्रीट का काम (Plastering & concrete work)",
      "नींव और टाइल्स लगाने का काम (Foundation & tiling)"
    ],
    wageRange: { min: 750, max: 1100, unit: "day" },
    availability: "Daily",
    description: "निर्माण कार्यों में अनुभवी पेशेवर जो दीवार बनाने, कंक्रीट मिक्स करने और उत्कृष्ट प्लास्टरिंग में सक्षम हैं।",
    imageSeed: "mason"
  },
  {
    id: "p2",
    name: "Carpenter",
    hindiName: "बढ़ई (Badhai)",
    category: "repair",
    roleLabel: "बढ़ई / Carpenter",
    typicalTasks: [
      "फर्नीचर की मरम्मत और असेंबली (Furniture repair & assembly)",
      "दरवाजे और खिड़की के फ्रेम लगाना (Door & window installation)",
      "अलमारी और तालों की मरम्मत (Cabinet & lock repairs)"
    ],
    wageRange: { min: 650, max: 950, unit: "day" },
    availability: "Daily",
    description: "लकड़ी के काम में निपुण कारीगर जो नए फर्नीचर बनाने, फिटिंग और मरम्मत कार्यों के विशेषज्ञ हैं।",
    imageSeed: "carpenter"
  },
  {
    id: "p3",
    name: "Painter",
    hindiName: "रंगसाज़ (Painter)",
    category: "repair",
    roleLabel: "रंगसाज़ / Painter",
    typicalTasks: [
      "दीवार की घिसाई, पुट्टी और प्राइमर (Wall scraping & putty preparation)",
      "आंतरिक और बाहरी दीवारों की पुताई (Interior & exterior painting)",
      "टेक्सचर कोटिंग और पॉलिश का काम (Texture coating & wood polishing)"
    ],
    wageRange: { min: 600, max: 850, unit: "day" },
    availability: "Daily",
    description: "दीवारों की तैयारी और शानदार फिनिशिंग के साथ उच्च गुणवत्ता वाले पेंटिंग काम के विशेषज्ञ।",
    imageSeed: "painter"
  },
  {
    id: "p4",
    name: "Electrician",
    hindiName: "बिजली मिस्त्री (Electrician)",
    category: "repair",
    roleLabel: "बिजली मिस्त्री / Electrician",
    typicalTasks: [
      "वायरिंग और शॉर्ट-सर्किट ठीक करना (Wiring & troubleshooting)",
      "इन्वर्टर और स्विचबोर्ड लगाना (Inverter & board installations)",
      "घरेलू उपकरणों की मरम्मत (Appliance repairs)"
    ],
    wageRange: { min: 150, max: 400, unit: "hour" },
    availability: "Hourly",
    description: "घरेलू वायरिंग, सुरक्षा जांच और बिजली के उपकरणों की त्वरित मरम्मत के प्रमाणित मिस्त्री।",
    imageSeed: "electrician"
  },
  {
    id: "p5",
    name: "Plumber",
    hindiName: "नलसाज (Plumber)",
    category: "repair",
    roleLabel: "नलसाज / Plumber",
    typicalTasks: [
      "लीकेज और पाइप लाइन की मरम्मत (Leakage & pipe repairs)",
      "नल और फिटिंग लगाना (Tap & bathroom fittings)",
      "पानी की टंकी और पंप की मरम्मत (Water tank & pump servicing)"
    ],
    wageRange: { min: 150, max: 350, unit: "hour" },
    availability: "Hourly",
    description: "नल फिटिंग, जल निकासी और पाइपलाइन संबंधी सभी घरेलू समस्याओं का स्थायी समाधान करने वाले प्लंबर।",
    imageSeed: "plumbing"
  },
  {
    id: "p6",
    name: "General Labourer",
    hindiName: "मजदूर (General Labour)",
    category: "general",
    roleLabel: "सामान्य मजदूर / General Labour",
    typicalTasks: [
      "सामान की लोडिंग और अनलोडिंग (Material loading & shifting)",
      "साइट की सफाई और मिट्टी खुदाई (Site cleaning & soil excavation)",
      "मुख्य कारीगरों की सहायता करना (Assisting senior tradespersons)"
    ],
    wageRange: { min: 450, max: 600, unit: "day" },
    availability: "Daily",
    description: "निर्माण, सामान शिफ्टिंग, सफाई और अन्य शारीरिक श्रम कार्यों के लिए ऊर्जावान और भरोसेमंद मजदूर।",
    imageSeed: "general labourer"
  },
  {
    id: "p7",
    name: "Agricultural Worker",
    hindiName: "खेती मजदूर (Agri Worker)",
    category: "rural",
    roleLabel: "कृषि सहायक / Agricultural Worker",
    typicalTasks: [
      "फसलों की कटाई और बुवाई (Crop harvesting & sowing)",
      "खेतों की सिंचाई और निराई (Irrigation & field weeding)",
      "ट्रैक्टर और कृषि यंत्र संचालन (Agri machinery support)"
    ],
    wageRange: { min: 400, max: 550, unit: "day" },
    availability: "Daily",
    description: "फसलों की देखभाल, कटाई, बुवाई और खेतों के मौसमी कार्यों में कुशल अनुभवी ग्रामीण मजदूर।",
    imageSeed: "agricultural worker"
  },
  {
    id: "p8",
    name: "Domestic Helper",
    hindiName: "सहायक (Domestic Helper)",
    category: "helper",
    roleLabel: "सहायक / Helper",
    typicalTasks: [
      "घर या कार्यालय की सफाई (Cleaning & dusting)",
      "रसोई और पेंट्री सहायता (Kitchen & pantry support)",
      "दैनिक काम और सामान लाना (Daily errands & deliveries)"
    ],
    wageRange: { min: 400, max: 600, unit: "day" },
    availability: "Daily",
    description: "साफ-सफाई, घरेलू मदद, दुकान की देखरेख और दैनिक कार्यों के लिए विनम्र एवं फुर्तीले सहायक।",
    imageSeed: "domestic helper"
  },
  {
    id: "p9",
    name: "Tile Worker",
    hindiName: "टाइल कारीगर (Tile Worker)",
    category: "construction",
    roleLabel: "टाइल कारीगर / Tile Worker",
    typicalTasks: [
      "फर्श और दीवारों पर टाइल्स फिटिंग (Floor & wall tile fitting)",
      "संगमरमर और ग्रेनाइट कटिंग (Marble & granite cutting)",
      "ग्राउटिंग और जोइंट्स सीलिंग (Grouting & joint sealing)"
    ],
    wageRange: { min: 700, max: 1000, unit: "day" },
    availability: "Daily",
    description: "कमरों, शौचालयों और रसोई घरों में टाइल्स और मार्बल बिछाने के अनुभवी कारीगर।",
    imageSeed: "tile worker"
  },
  {
    id: "p10",
    name: "POP Worker",
    hindiName: "पीओपी कारीगर (POP Worker)",
    category: "construction",
    roleLabel: "पीओपी और फॉल्स सीलिंग / POP Worker",
    typicalTasks: [
      "फॉल्स सीलिंग और जिप्सम बोर्ड (False ceiling & gypsum boarding)",
      "दीवार पर कॉर्निस और मोल्डिंग (Wall cornices & moldings)",
      "प्लास्टर ऑफ पेरिस डिजाइनिंग (Plaster of Paris decorative designs)"
    ],
    wageRange: { min: 650, max: 950, unit: "day" },
    availability: "Daily",
    description: "घरों में सुंदर सीलिंग डिजाइन, मोल्डिंग और जिप्सम बोर्ड का काम करने के एक्सपर्ट।",
    imageSeed: "pop worker"
  },
  {
    id: "p11",
    name: "Steel Fixer",
    hindiName: "लोहा बांधने वाला (Steel Fixer)",
    category: "construction",
    roleLabel: "सरिया बांधने वाला / Steel Fixer",
    typicalTasks: [
      "आरसीसी बीम और कॉलम बांधना (RCC beam & column grid fixing)",
      "लोहे की जाली तैयार करना (Creating steel mesh frameworks)",
      "ब्लूप्रिंट के अनुसार सरिया काटना (Cutting rebar as per site blueprints)"
    ],
    wageRange: { min: 650, max: 900, unit: "day" },
    availability: "Daily",
    description: "लेंथ, बीम और छत ढलाई के समय कंक्रीट स्ट्रक्चर के लिए मजबूत लोहे का जाल बांधने वाले कारीगर।",
    imageSeed: "steel fixer"
  },
  {
    id: "p12",
    name: "Bar Bender",
    hindiName: "सरिया मोड़ने वाला (Bar Bender)",
    category: "construction",
    roleLabel: "सरिया कारीगर / Bar Bender",
    typicalTasks: [
      "स्टील रीइन्फोर्समेंट छड़ों को मोड़ना (Bending steel reinforcement bars)",
      "रिंग्स और स्टिरप्स का निर्माण (Manufacturing stirrups and rings)",
      "साइट पर सरिया वेल्डिंग सपोर्ट (On-site steel bending and sizing)"
    ],
    wageRange: { min: 600, max: 850, unit: "day" },
    availability: "Daily",
    description: "ढलाई और पिलर के लिए सरियों को निर्दिष्ट कोणों पर मोड़ने और रिंग बनाने के कुशल कारीगर।",
    imageSeed: "bar bender"
  },
  {
    id: "p13",
    name: "Fabricator",
    hindiName: "फैब्रिकेटर (Fabricator)",
    category: "repair",
    roleLabel: "लोहा फैब्रिकेटर / Fabricator",
    typicalTasks: [
      "लोहे के गेट और ग्रिल बनाना (Iron gate & grill fabrication)",
      "टीन शेड और धातु फ्रेम्स (Tin shade & metal frame installations)",
      "गैस कटर और वेल्डिंग कम्बाइंड वर्क (Gas cutting and sheet metal works)"
    ],
    wageRange: { min: 700, max: 1050, unit: "day" },
    availability: "Daily",
    description: "मेटल स्ट्रक्चर, लोहे के दरवाजे, सीढ़ियों की ग्रिल और खिड़की के फ्रेम बनाने के निपुण मिस्त्री।",
    imageSeed: "fabricator"
  },
  {
    id: "p14",
    name: "Roofer",
    hindiName: "छत बनाने वाला (Roofer)",
    category: "construction",
    roleLabel: "रूफिंग कारीगर / Roofer",
    typicalTasks: [
      "टीन और एस्बेस्टस शेड लगाना (Installing tin & asbestos roof sheets)",
      "खपरैल और वॉटरप्रूफिंग (Tile roofing & roof waterproofing)",
      "छत की कंक्रीट ढलाई सपोर्ट (Roof casting scaffolding setup)"
    ],
    wageRange: { min: 650, max: 950, unit: "day" },
    availability: "Daily",
    description: "विभिन्न प्रकार की छतों की फिटिंग, लीक रिपेयर और ढलाई से पहले वॉटरप्रूफिंग करने वाले विशेषज्ञ।",
    imageSeed: "roofer"
  },
  {
    id: "p15",
    name: "Driver",
    hindiName: "चालक (Driver)",
    category: "helper",
    roleLabel: "कमर्शियल चालक / Driver",
    typicalTasks: [
      "लोडिंग गाड़ी और डंपर चलाना (Driving commercial loading trucks)",
      "निजी वाहन या एम्बुलेंस चलाना (Driving private cars or ambulances)",
      "सुरक्षित वाहन रखरखाव (Vehicle safety maintenance)"
    ],
    wageRange: { min: 500, max: 800, unit: "day" },
    availability: "Flexible",
    description: "सभी आवश्यक ड्राइविंग लाइसेंस के साथ भारी और हल्के वाहनों को सुरक्षित चलाने के अनुभवी ड्राइवर।",
    imageSeed: "driver"
  },
  {
    id: "p16",
    name: "Security Guard",
    hindiName: "सुरक्षा गार्ड (Security Guard)",
    category: "helper",
    roleLabel: "सुरक्षा गार्ड / Security Guard",
    typicalTasks: [
      "प्रवेश द्वार की निगरानी (Gate keeping & entry logs)",
      "रात की गश्त और सुरक्षा राउंड (Night patrolling & safety rounds)",
      "सीसीटीवी फुटेज चेकिंग (CCTV monitoring & emergency response)"
    ],
    wageRange: { min: 450, max: 700, unit: "day" },
    availability: "Daily",
    description: "फैक्ट्रियों, सोसायटियों और व्यावसायिक स्थलों की दिन-रात सुरक्षा करने वाले अनुशासित गार्ड।",
    imageSeed: "security guard"
  },
  {
    id: "p17",
    name: "HVAC Technician",
    hindiName: "एसी मिस्त्री (HVAC Tech)",
    category: "repair",
    roleLabel: "एसी और वेंटिलेशन / HVAC Technician",
    typicalTasks: [
      "सेंट्रल और स्प्लिट एसी सर्विस (Central & split AC servicing)",
      "गैस चार्जिंग और लीकेज ठीक करना (AC gas filling & leak repair)",
      "डक्टिंग और वेंटिलेशन पाइपिंग (Ducting & ventilation piping)"
    ],
    wageRange: { min: 200, max: 450, unit: "hour" },
    availability: "Hourly",
    description: "एयर कंडीशनर, रेफ्रिजरेटर और बड़े वेंटिलेशन प्लांट की मरम्मत के कुशल और अनुभवी मिस्त्री।",
    imageSeed: "hvac technician"
  },
  {
    id: "p18",
    name: "Solar Technician",
    hindiName: "सोलर कारीगर (Solar Tech)",
    category: "repair",
    roleLabel: "सोलर इंस्टॉलेशन / Solar Technician",
    typicalTasks: [
      "सोलर पैनल माउंटिंग (Solar panel mounting & setup)",
      "इन्वर्टर और बैटरी वायरिंग (Solar inverter & battery wiring)",
      "रखरखाव और वोल्टेज चेकिंग (System maintenance & voltage checking)"
    ],
    wageRange: { min: 200, max: 400, unit: "hour" },
    availability: "Hourly",
    description: "घरों और सोलर पंपों पर सोलर ग्रिड पैनल और बैटरी असेंबली लगाने के प्रशिक्षित तकनीशियन।",
    imageSeed: "solar technician"
  },
  {
    id: "p19",
    name: "Helper",
    hindiName: "हेल्पर (Helper)",
    category: "general",
    roleLabel: "कुशल सहायक / Helper",
    typicalTasks: [
      "मुख्य मिस्त्री की सहायता (Assisting lead technician on site)",
      "सामान की साफ-सफाई और लोडिंग (On-site cleaning & material shifting)",
      "दुकान या साइट का काम संभालना (Handling minor tool movements)"
    ],
    wageRange: { min: 450, max: 550, unit: "day" },
    availability: "Daily",
    description: "काम को गति देने के लिए मुख्य कारीगरों की मदद करने वाले और वजन उठाने में सक्षम मेहनती हेल्पर।",
    imageSeed: "helper_role"
  },
  {
    id: "p20",
    name: "Machine Operator",
    hindiName: "मशीन ऑपरेटर (Machine Operator)",
    category: "general",
    roleLabel: "मशीन ऑपरेटर / Machine Operator",
    typicalTasks: [
      "फैक्ट्री यूनिट्स का संचालन (Operating industrial manufacturing units)",
      "कटर और कंप्रेशर हैंडलिंग (Handling cutter, compressor & drills)",
      "मशीनों की सामान्य मरम्मत (Basic machinery troubleshooting)"
    ],
    wageRange: { min: 550, max: 800, unit: "day" },
    availability: "Daily",
    description: "औद्योगिक इकाइयों में कंक्रीट मिक्सर, कटर और अन्य स्वचालक मशीनों को चलाने वाले ऑपरेटर।",
    imageSeed: "machine operator"
  },
  {
    id: "p21",
    name: "Scaffolding Worker",
    hindiName: "पाड़ बांधने वाला (Scaffolder)",
    category: "construction",
    roleLabel: "पाड़ कारीगर / Scaffolding Worker",
    typicalTasks: [
      "लोहे और बांस की पाड़ बांधना (Erecting steel & bamboo scaffolding)",
      "सुरक्षा जाली और नेट लगाना (Installing construction safety nets)",
      "ऊंचाई पर काम करने का सपोर्ट (Dismantling scaffolds post-project)"
    ],
    wageRange: { min: 650, max: 900, unit: "day" },
    availability: "Daily",
    description: "बहुमंजिला इमारतों में पेंटिंग या कंक्रीट कार्य के लिए सुरक्षित और मजबूत सीढ़ियां (पाड़) बनाने वाले कारीगर।",
    imageSeed: "scaffolding worker"
  },
  {
    id: "p22",
    name: "Road Construction Worker",
    hindiName: "सड़क मजदूर (Road Worker)",
    category: "construction",
    roleLabel: "सड़क निर्माण सहायक / Road Construction Worker",
    typicalTasks: [
      "डामर और गिट्टी फैलाना (Spreading asphalt & gravel)",
      "रोड रोलर के साथ लेबलिंग सपोर्ट (Assisting road roller leveling)",
      "सड़क किनारे ड्रेनेज लाइन बनाना (Excavating drainage trenches)"
    ],
    wageRange: { min: 500, max: 650, unit: "day" },
    availability: "Daily",
    description: "एक्सप्रेसवे, हाईवे और जिला संपर्क सड़कों के निर्माण कार्य में अनुभवी परिश्रमी मजदूर।",
    imageSeed: "road construction worker"
  },
  {
    id: "p23",
    name: "Civil Supervisor",
    hindiName: "सिविल सुपरवाइजर (Supervisor)",
    category: "helper",
    roleLabel: "साइट सुपरवाइजर / Civil Supervisor",
    typicalTasks: [
      "कामगारों की हाजिरी दर्ज करना (Logging worker daily attendance)",
      "मटेरियल की आवक का रिकॉर्ड (Checking on-site material supply)",
      "काम की गुणवत्ता की जांच (Verifying construction quality as per plan)"
    ],
    wageRange: { min: 800, max: 1300, unit: "day" },
    availability: "Flexible",
    description: "कामगारों का प्रबंधन करने और ठेकेदार व इंजीनियर के निर्देशों का पालन कराने वाले अनुभवी सुपरवाइजर।",
    imageSeed: "civil supervisor"
  },
  {
    id: "p24",
    name: "Site Engineer",
    hindiName: "साइट इंजीनियर (Site Engineer)",
    category: "helper",
    roleLabel: "सिविल इंजीनियर / Site Engineer",
    typicalTasks: [
      "नक्शे के अनुसार लेआउट मार्किंग (Marking site layouts as per drawings)",
      "कंक्रीट और स्टील टेस्ट रिपोर्ट (Conducting concrete slump and rebar tests)",
      "सुरक्षा मानदंडों का अनुपालन (Ensuring absolute strict safety compliance)"
    ],
    wageRange: { min: 1000, max: 1800, unit: "day" },
    availability: "Contract",
    description: "कम्प्यूटर डिजाइन और सिविल प्लान के अनुसार निर्माण कार्य को संचालित और सत्यापित करने वाले डिग्री/डिप्लोमा धारक इंजीनियर।",
    imageSeed: "site engineer"
  },
  {
    id: "p25",
    name: "Welder",
    hindiName: "वेल्डर (Welder)",
    category: "repair",
    roleLabel: "वेल्डर / Welder",
    typicalTasks: [
      "लोहे और स्टील की वेल्डिंग (Arc and MIG welding of iron/steel)",
      "कटिंग और मेटल जॉइनिंग (Metal cutting and joint profiling)",
      "साइट पर संरचनात्मक वेल्डिंग (Structural welding on active construction sites)"
    ],
    wageRange: { min: 650, max: 950, unit: "day" },
    availability: "Daily",
    description: "गेट, ग्रिल, गर्डर और पिलर रीइन्फोर्समेंट के जोड़ों को आर्क या गैस वेल्डिंग से सुरक्षित करने वाले वेल्डर।",
    imageSeed: "welder"
  },
  {
    id: "p6",
    name: "General Labour",
    hindiName: "सामान्य मजदूर (General Labour)",
    category: "general",
    roleLabel: "सामान्य मजदूर / General Labour",
    typicalTasks: [
      "सामान की लोडिंग और अनलोडिंग (Material loading & shifting)",
      "साइट की सफाई और मिट्टी खुदाई (Site cleaning & soil excavation)",
      "मुख्य कारीगरों की सहायता करना (Assisting senior tradespersons)"
    ],
    wageRange: { min: 450, max: 600, unit: "day" },
    availability: "Daily",
    description: "निर्माण, सामान शिफ्टिंग, सफाई और अन्य शारीरिक श्रम कार्यों के लिए ऊर्जावान और भरोसेमंद मजदूर।",
    imageSeed: "labour"
  },
  {
    id: "p7",
    name: "Agricultural Worker",
    hindiName: "खेती मजदूर (Agri Worker)",
    category: "rural",
    roleLabel: "कृषि सहायक / Agricultural Worker",
    typicalTasks: [
      "फसलों की कटाई और बुवाई (Crop harvesting & sowing)",
      "खेतों की सिंचाई और निराई (Irrigation & field weeding)",
      "ट्रैक्टर और कृषि यंत्र संचालन (Agri machinery support)"
    ],
    wageRange: { min: 400, max: 550, unit: "day" },
    availability: "Daily",
    description: "फसलों की देखभाल, कटाई, बुवाई और खेतों के मौसमी कार्यों में कुशल अनुभवी ग्रामीण मजदूर।",
    imageSeed: "farming"
  },
  {
    id: "p8",
    name: "Domestic Helper",
    hindiName: "सहायक (Domestic Helper)",
    category: "helper",
    roleLabel: "सहायक / Helper",
    typicalTasks: [
      "घर या कार्यालय की सफाई (Cleaning & dusting)",
      "रसोई और पेंट्री सहायता (Kitchen & pantry support)",
      "दैनिक काम और सामान लाना (Daily errands & deliveries)"
    ],
    wageRange: { min: 400, max: 600, unit: "day" },
    availability: "Daily",
    description: "साफ-सफाई, घरेलू मदद, दुकान की देखरेख और दैनिक कार्यों के लिए विनम्र एवं फुर्तीले सहायक।",
    imageSeed: "helper"
  }
];

// Locations spanning urban, semi-urban, and rural environments
const LOCATIONS = [
  { type: "urban", label: "Delhi NCR (Central Hub)", sub: "Okhla, Narela, Bawana Industrial Areas" },
  { type: "urban", label: "Mumbai MMR", sub: "Dharavi, Kurla, Thane Hubs" },
  { type: "semi-urban", label: "Gorakhpur District", sub: "Sahjanwa Town & Industrial Area" },
  { type: "semi-urban", label: "Coimbatore", sub: "Peelamedu & Sulur Manufacturing Belts" },
  { type: "rural", label: "Harichandanpur Block", sub: "Keonjhar, Odisha (Mining & Agro Zone)" },
  { type: "rural", label: "Channapatna Taluk", sub: "Ramanagara, Karnataka (Artisan Villages)" }
];

export interface DiscoverableWorker {
  id: string;
  name: string;
  trade: string; // Mason, Electrician, Painter, Plumber, Carpenter, Welder, Helper, Agricultural Worker, General Labour
  experience: string;
  experienceYears: number;
  district: string;
  state: string;
  wage: number;
  trustScore: number;
  attendance: number;
  gpsStatus: "Active" | "Offline";
  distance: number;
  languages: string[];
  availableFrom: "Available Today" | "Tomorrow" | "This Week" | "Immediately";
  preferredShift: "Day Shift" | "Night Shift" | "Flexible";
  history: string;
  completion: number;
  aiMatch: number;
  recommendation: "Highly Recommended" | "Recommended" | "Nearby" | "New Worker" | "Top Performer";
  aadhaar: boolean;
  passport: boolean;
  gpsActive: boolean;
  police: boolean;
  skillCertified: boolean;
  phone: string;
  passportId: string;
  avatarSeed: string;
}

const INITIAL_DISCOVERABLE_WORKERS: DiscoverableWorker[] = [
  {
    id: "dw-1",
    name: "Suresh Kumar Maurya",
    trade: "Mason",
    experience: "7 Years",
    experienceYears: 7,
    district: "Gorakhpur",
    state: "Uttar Pradesh",
    wage: 750,
    trustScore: 98,
    attendance: 97,
    gpsStatus: "Active",
    distance: 1.8,
    languages: ["Hindi", "Bhojpuri"],
    availableFrom: "Available Today",
    preferredShift: "Day Shift",
    history: "Worked on 42 projects in Gorakhpur Bypass Corridor",
    completion: 99,
    aiMatch: 98,
    recommendation: "Highly Recommended",
    aadhaar: true,
    passport: true,
    gpsActive: true,
    police: true,
    skillCertified: true,
    phone: "9876543210",
    passportId: "UP-74-MAS-892",
    avatarSeed: "suresh"
  },
  {
    id: "dw-2",
    name: "Amit Vishwakarma",
    trade: "Electrician",
    experience: "5 Years",
    experienceYears: 5,
    district: "Gorakhpur",
    state: "Uttar Pradesh",
    wage: 850,
    trustScore: 96,
    attendance: 94,
    gpsStatus: "Active",
    distance: 3.2,
    languages: ["Hindi", "English"],
    availableFrom: "Available Today",
    preferredShift: "Day Shift",
    history: "Completed 28 wiring and panel installations in GIDA Phase II",
    completion: 95,
    aiMatch: 95,
    recommendation: "Recommended",
    aadhaar: true,
    passport: true,
    gpsActive: true,
    police: false,
    skillCertified: true,
    phone: "9876543211",
    passportId: "UP-74-ELE-431",
    avatarSeed: "amit"
  },
  {
    id: "dw-3",
    name: "Ramesh Yadav",
    trade: "Painter",
    experience: "4 Years",
    experienceYears: 4,
    district: "Gorakhpur",
    state: "Uttar Pradesh",
    wage: 650,
    trustScore: 94,
    attendance: 92,
    gpsStatus: "Active",
    distance: 4.5,
    languages: ["Hindi", "Bhojpuri"],
    availableFrom: "Available Today",
    preferredShift: "Day Shift",
    history: "Completed 18 residential wall coating contracts",
    completion: 92,
    aiMatch: 91,
    recommendation: "Nearby",
    aadhaar: true,
    passport: false,
    gpsActive: true,
    police: true,
    skillCertified: false,
    phone: "9876543212",
    passportId: "UP-74-PAI-710",
    avatarSeed: "ramesh"
  },
  {
    id: "dw-4",
    name: "Karan Bahadur",
    trade: "Welder",
    experience: "8 Years",
    experienceYears: 8,
    district: "Gorakhpur",
    state: "Uttar Pradesh",
    wage: 900,
    trustScore: 97,
    attendance: 95,
    gpsStatus: "Offline",
    distance: 8.2,
    languages: ["Hindi", "Bhojpuri", "English"],
    availableFrom: "Tomorrow",
    preferredShift: "Flexible",
    history: "Specialist structural welder on GIDA flyover projects",
    completion: 98,
    aiMatch: 89,
    recommendation: "Top Performer",
    aadhaar: true,
    passport: true,
    gpsActive: false,
    police: true,
    skillCertified: true,
    phone: "9876543213",
    passportId: "UP-74-WEL-301",
    avatarSeed: "karan"
  },
  {
    id: "dw-5",
    name: "Vikram Singh",
    trade: "Carpenter",
    experience: "12 Years",
    experienceYears: 12,
    district: "Lucknow",
    state: "Uttar Pradesh",
    wage: 1100,
    trustScore: 99,
    attendance: 98,
    gpsStatus: "Active",
    distance: 24.5,
    languages: ["Hindi", "English", "Awadhi"],
    availableFrom: "This Week",
    preferredShift: "Day Shift",
    history: "Top-tier custom furniture artisan and office interior setup specialist",
    completion: 100,
    aiMatch: 85,
    recommendation: "Top Performer",
    aadhaar: true,
    passport: true,
    gpsActive: true,
    police: true,
    skillCertified: true,
    phone: "9876543214",
    passportId: "UP-32-CAR-115",
    avatarSeed: "vikram"
  },
  {
    id: "dw-6",
    name: "Santosh Nishad",
    trade: "Helper",
    experience: "2 Years",
    experienceYears: 2,
    district: "Gorakhpur",
    state: "Uttar Pradesh",
    wage: 450,
    trustScore: 90,
    attendance: 88,
    gpsStatus: "Active",
    distance: 0.9,
    languages: ["Hindi", "Bhojpuri"],
    availableFrom: "Available Today",
    preferredShift: "Day Shift",
    history: "Assisted in 35 residential construction sites and material handling",
    completion: 90,
    aiMatch: 96,
    recommendation: "Nearby",
    aadhaar: true,
    passport: false,
    gpsActive: true,
    police: false,
    skillCertified: false,
    phone: "9876543215",
    passportId: "UP-74-HEL-990",
    avatarSeed: "santosh"
  },
  {
    id: "dw-7",
    name: "Manoj Prajapati",
    trade: "Plumber",
    experience: "6 Years",
    experienceYears: 6,
    district: "Gorakhpur",
    state: "Uttar Pradesh",
    wage: 700,
    trustScore: 95,
    attendance: 93,
    gpsStatus: "Active",
    distance: 2.1,
    languages: ["Hindi"],
    availableFrom: "Available Today",
    preferredShift: "Night Shift",
    history: "Fitted heavy sewage pipelines and water setups in industrial layouts",
    completion: 96,
    aiMatch: 93,
    recommendation: "Recommended",
    aadhaar: true,
    passport: true,
    gpsActive: true,
    police: false,
    skillCertified: true,
    phone: "9876543216",
    passportId: "UP-74-PLU-156",
    avatarSeed: "manoj"
  },
  {
    id: "dw-8",
    name: "Rakesh Rajbhar",
    trade: "Agricultural Worker",
    experience: "10 Years",
    experienceYears: 10,
    district: "Gorakhpur",
    state: "Uttar Pradesh",
    wage: 500,
    trustScore: 96,
    attendance: 96,
    gpsStatus: "Offline",
    distance: 12.0,
    languages: ["Hindi", "Bhojpuri"],
    availableFrom: "Immediately",
    preferredShift: "Day Shift",
    history: "Expert in seasonal crop sowing, machine harvesting, and agro-fencing",
    completion: 95,
    aiMatch: 92,
    recommendation: "Top Performer",
    aadhaar: true,
    passport: false,
    gpsActive: false,
    police: true,
    skillCertified: false,
    phone: "9876543217",
    passportId: "UP-74-AGR-402",
    avatarSeed: "rakesh"
  },
  {
    id: "dw-9",
    name: "Arjun Prasad",
    trade: "General Labour",
    experience: "1 Year",
    experienceYears: 1,
    district: "Gorakhpur",
    state: "Uttar Pradesh",
    wage: 420,
    trustScore: 85,
    attendance: 85,
    gpsStatus: "Active",
    distance: 5.4,
    languages: ["Hindi"],
    availableFrom: "Immediately",
    preferredShift: "Day Shift",
    history: "General site clearing, cement carrying, and loading-unloading works",
    completion: 88,
    aiMatch: 88,
    recommendation: "New Worker",
    aadhaar: true,
    passport: false,
    gpsActive: true,
    police: false,
    skillCertified: false,
    phone: "9876543218",
    passportId: "UP-74-GEN-308",
    avatarSeed: "arjun"
  },
  {
    id: "dw-10",
    name: "Vijay Sharma",
    trade: "Electrician",
    experience: "3 Years",
    experienceYears: 3,
    district: "Gorakhpur",
    state: "Uttar Pradesh",
    wage: 600,
    trustScore: 92,
    attendance: 91,
    gpsStatus: "Active",
    distance: 1.5,
    languages: ["Hindi", "English"],
    availableFrom: "Available Today",
    preferredShift: "Day Shift",
    history: "Household electrical wiring and switchboard replacement repairs",
    completion: 93,
    aiMatch: 94,
    recommendation: "Nearby",
    aadhaar: true,
    passport: false,
    gpsActive: true,
    police: false,
    skillCertified: false,
    phone: "9876543219",
    passportId: "UP-74-ELE-512",
    avatarSeed: "vijay"
  },
  {
    id: "dw-11",
    name: "Harpreet Singh",
    trade: "Welder",
    experience: "9 Years",
    experienceYears: 9,
    district: "Amritsar",
    state: "Punjab",
    wage: 1200,
    trustScore: 97,
    attendance: 95,
    gpsStatus: "Offline",
    distance: 25.0,
    languages: ["Punjabi", "Hindi", "English"],
    availableFrom: "This Week",
    preferredShift: "Flexible",
    history: "Precision industrial pipe welding and boiler construction repairs",
    completion: 97,
    aiMatch: 81,
    recommendation: "Top Performer",
    aadhaar: true,
    passport: true,
    gpsActive: false,
    police: true,
    skillCertified: true,
    phone: "9876543220",
    passportId: "PB-02-WEL-881",
    avatarSeed: "harpreet"
  },
  {
    id: "dw-12",
    name: "Pradip Halder",
    trade: "Painter",
    experience: "11 Years",
    experienceYears: 11,
    district: "Kolkata",
    state: "West Bengal",
    wage: 800,
    trustScore: 98,
    attendance: 97,
    gpsStatus: "Active",
    distance: 15.4,
    languages: ["Bengali", "Hindi"],
    availableFrom: "Immediately",
    preferredShift: "Day Shift",
    history: "High-end exterior coating and textured wall designs in urban highrises",
    completion: 99,
    aiMatch: 84,
    recommendation: "Top Performer",
    aadhaar: true,
    passport: true,
    gpsActive: true,
    police: true,
    skillCertified: true,
    phone: "9876543221",
    passportId: "WB-01-PAI-503",
    avatarSeed: "pradip"
  }
];

export default function HomePage() {
  const [professions, setProfessions] = useState<Profession[]>(INITIAL_PROFESSIONS);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
  
  // Post-hydration client-only language initialization to guarantee SSR stability
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"hi" | "en">("hi");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("labouradda_lang");
      if (savedLang === "hi" || savedLang === "en") {
        setLang(savedLang);
      }
    }
  }, []);

  // 3. Voice Assisted Navigation States
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeechText, setActiveSpeechText] = useState<string | null>(null);

  // Admin Panel States
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [newProfName, setNewProfName] = useState("");
  const [newProfHindiName, setNewProfHindiName] = useState("");
  const [newProfCategory, setNewProfCategory] = useState<"construction" | "repair" | "general" | "rural" | "helper">("construction");
  const [newProfMinWage, setNewProfMinWage] = useState("500");
  const [newProfMaxWage, setNewProfMaxWage] = useState("800");
  const [newProfUnit, setNewProfUnit] = useState<"day" | "hour">("day");
  const [newProfTasks, setNewProfTasks] = useState("");
  const [newProfDesc, setNewProfDesc] = useState("");
  const [adminStatusMsg, setAdminStatusMsg] = useState("");
  
  // National Labour Intelligence Dashboard State
  const [showLabourIntel, setShowLabourIntel] = useState(false);

  // Location Selector Modal State
  const [isLocModalOpen, setIsLocModalOpen] = useState(false);

  // Authentication & Role-Based Registration State Managers
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedRoleForRegister, setSelectedRoleForRegister] = useState<string | null>(null);
  const [selectedRoleForLogin, setSelectedRoleForLogin] = useState<string | null>(null);
  const [loginStep, setLoginStep] = useState<"role" | "mobile" | "otp" | "success">("role");
  const [registerStep, setRegisterStep] = useState<"role" | "mobile" | "otp" | "details" | "success" | "worker-flow" | "employer-flow">("role");

  // Employer Registration states
  const [employerRegStep, setEmployerRegStep] = useState<number>(1);
  const [empName, setEmpName] = useState("");
  const [empOrgName, setEmpOrgName] = useState("");
  const [empCategory, setEmpCategory] = useState<string>("household");
  const [empState, setEmpState] = useState("");
  const [empDistrict, setEmpDistrict] = useState("");
  const [empAddress, setEmpAddress] = useState("");
  const [empWorkerCount, setEmpWorkerCount] = useState("");
  const [empPreferredTrades, setEmpPreferredTrades] = useState<string[]>([]);
  const [empHiringFrequency, setEmpHiringFrequency] = useState("Daily");
  const [empIdType, setEmpIdType] = useState("Aadhaar");
  const [empIdNumber, setEmpIdNumber] = useState("");
  const [empCoords, setEmpCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [empIsDetectingLocation, setEmpIsDetectingLocation] = useState(false);
  const [empPassportId, setEmpPassportId] = useState("");

  // Employer Dashboard States
  const [empHiringStatusActive, setEmpHiringStatusActive] = useState(true);
  const [empActiveJobsCount, setEmpActiveJobsCount] = useState(2);
  const [empSavedWorkersCount, setEmpSavedWorkersCount] = useState(3);
  const [empTrustScore, setEmpTrustScore] = useState(98);
  const [employerJobs, setEmployerJobs] = useState([
    { id: "ej-1", titleHi: "दीवार चिनाई का काम", titleEn: "Boundary Wall Construction", tradeHi: "राजमिस्त्री", tradeEn: "Mason", wage: "₹650 / Day", location: "Sector 4, GIDA, Gorakhpur", status: "Active", applicantsCount: 4 },
    { id: "ej-2", titleHi: "कार्यालय पेंटिंग कार्य", titleEn: "Office Painting and Touchup", tradeHi: "पेंटर", tradeEn: "Painter", wage: "₹600 / Day", location: "Cyber Tower, Gorakhpur", status: "Active", applicantsCount: 2 }
  ]);
  const [hiredWorkers, setHiredWorkers] = useState([
    { id: "hw-1", name: "Manoj Kumar", tradeHi: "राजमिस्त्री", tradeEn: "Mason", status: "Present", phone: "9876543210", passportId: "LP-IND-482094-A" },
    { id: "hw-2", name: "Rajesh Prasad", tradeHi: "पेंटर", tradeEn: "Painter", status: "Active", phone: "9812345678", passportId: "LP-IND-521098-A" },
    { id: "hw-3", name: "Sunil Yadav", tradeHi: "सहायक / हेल्पर", tradeEn: "Helper", status: "Present", phone: "9555123456", passportId: "LP-IND-239482-A" }
  ]);
  const [isPostingNewJob, setIsPostingNewJob] = useState(false);
  const [newJobTitleHi, setNewJobTitleHi] = useState("");
  const [newJobTitleEn, setNewJobTitleEn] = useState("");
  const [newJobTradeHi, setNewJobTradeHi] = useState("राजमिस्त्री");
  const [newJobTradeEn, setNewJobTradeEn] = useState("Mason");
  const [newJobWage, setNewJobWage] = useState("650");
  const [newJobLocation, setNewJobLocation] = useState("");

  useEffect(() => {
    if (registerStep === "employer-flow" && employerRegStep === 7 && !empPassportId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmpPassportId(`EMP-IND-${Math.floor(100000 + Math.random() * 900000)}-N`);
    }
  }, [registerStep, employerRegStep, empPassportId]);

  // Worker Registration states
  const [workerRegStep, setWorkerRegStep] = useState<number>(1);
  const [regDob, setRegDob] = useState("");
  const [regPhoto, setRegPhoto] = useState<string | null>(null);
  const [regSelectedSkills, setRegSelectedSkills] = useState<string[]>([]);
  const [workerExp, setWorkerExp] = useState("");
  const [workerAvailability, setWorkerAvailability] = useState("");
  const [workerRadius, setWorkerRadius] = useState("");
  const [workerWageBasis, setWorkerWageBasis] = useState("Daily");
  const [workerWageAmount, setWorkerWageAmount] = useState("");
  const [docAadhaar, setDocAadhaar] = useState("");
  const [docPan, setDocPan] = useState("");
  const [docDl, setDocDl] = useState("");
  const [docVoter, setDocVoter] = useState("");
  const [docPassport, setDocPassport] = useState("");
  const [detectedCoords, setDetectedCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [passportId, setPassportId] = useState("");
  
  // Worker Dashboard Interactive States
  const [workerStatusActive, setWorkerStatusActive] = useState(true);
  const [attendanceLogged, setAttendanceLogged] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [currentWageDemand, setCurrentWageDemand] = useState("");

  // Contractor Dashboard States
  const [contractorActionModal, setContractorActionModal] = useState<string | null>(null);
  
  // Prompt-15 AI Smart Hiring States
  const [prompt15Shortlisted, setPrompt15Shortlisted] = useState<string[]>([]);
  const [prompt15OffersSent, setPrompt15OffersSent] = useState<string[]>([]);
  const [prompt15ViewingPassport, setPrompt15ViewingPassport] = useState<string | null>(null);
  const [prompt15CallingWorker, setPrompt15CallingWorker] = useState<string | null>(null);

  // Prompt-16 National Digital Labour Passport States
  const [prompt16WorkerVerified, setPrompt16WorkerVerified] = useState(false);
  const [prompt16HistoryModal, setPrompt16HistoryModal] = useState(false);
  const [prompt16Downloaded, setPrompt16Downloaded] = useState(false);
  const [prompt16Shared, setPrompt16Shared] = useState(false);
  const [prompt16ContractorScan, setPrompt16ContractorScan] = useState(false);
  const [prompt16ContractorIdInput, setPrompt16ContractorIdInput] = useState("");
  const [prompt16ContractorIdVerified, setPrompt16ContractorIdVerified] = useState(false);
  const [prompt16ContractorApproved, setPrompt16ContractorApproved] = useState(false);

  const [contractorNotifications, setContractorNotifications] = useState([
    { id: "cn-1", type: "applied", textHi: "राम सिंह (राजमिस्त्री) ने आपके GIDA प्रोजेक्ट के लिए आवेदन किया है।", textEn: "Ram Singh (Mason) applied for your GIDA project.", time: "2 min ago", unread: true },
    { id: "cn-2", type: "accepted", textHi: "श्याम लाल (पेंटर) ने आपका कार्य निमंत्रण स्वीकार किया है।", textEn: "Shyam Lal (Painter) accepted your work invitation.", time: "15 min ago", unread: true },
    { id: "cn-3", type: "attendance", textHi: "१२ कामगारों ने आज GIDA साइट पर चेक-इन किया है।", textEn: "12 workers checked in today at GIDA Site.", time: "1 hour ago", unread: false },
    { id: "cn-4", type: "passport", textHi: "मनोज कुमार का डिजिटल लेबर पासपोर्ट सत्यापित हो गया है।", textEn: "Manoj Kumar's Digital Labour Passport has been verified.", time: "3 hours ago", unread: false },
    { id: "cn-5", type: "completed", textHi: "सेक्टर ५ पेंटिंग कार्य सफलतापूर्वक पूरा हुआ।", textEn: "Sector 5 painting job marked completed by contractor.", time: "Yesterday", unread: false },
    { id: "cn-6", type: "payment", textHi: "₹१५,००० का भुगतान एस्क्रो खाते में जमा किया गया है।", textEn: "₹15,000 payment deposited in escrow account.", time: "2 days ago", unread: false }
  ]);

  // Enriched Contractor Requirements with full pipeline stages (Applied, Invited, Shortlisted, Confirmed)
  const [contractorRequirements, setContractorRequirements] = useState([
    {
      id: "cr-1",
      titleHi: "राष्ट्रीय राजमार्ग पुल निर्माण - कंक्रीट टीम",
      titleEn: "National Highway Bridge - Concrete Team",
      tradeHi: "राजमिस्त्री",
      tradeEn: "Mason",
      open: 8,
      filled: 5,
      pending: 12,
      workersCount: 8,
      locationHi: "गोरखपुर बाईपास सेक्टर २",
      locationEn: "Gorakhpur Bypass Sector 2",
      expectedWage: "₹750 / Day",
      duration: "3 Months",
      startDate: "2026-07-10",
      experience: "5+ Years",
      status: "OPEN", // OPEN, INVITING, SHORTLISTING, CONFIRMED, IN PROGRESS, COMPLETED, CANCELLED
      applicantsCount: 12,
      applied: [
        { id: "wa-1", name: "Sohan Lal", tradeEn: "Mason", score: 94, experience: "6 Years", distance: "2.4 km", wage: "750", trustScore: 92, attendance: 90, passportVerified: true, gpsReady: true, availability: "Immediate", language: "Hindi, Bhojpuri" },
        { id: "wa-2", name: "Ramesh Kumar", tradeEn: "Mason", score: 91, experience: "5 Years", distance: "3.1 km", wage: "700", trustScore: 88, attendance: 92, passportVerified: true, gpsReady: true, availability: "Immediate", language: "Hindi" },
        { id: "wa-3", name: "Gopal Prasad", tradeEn: "Mason", score: 85, experience: "3 Years", distance: "4.8 km", wage: "650", trustScore: 84, attendance: 88, passportVerified: false, gpsReady: true, availability: "3 Days", language: "Hindi" }
      ],
      invited: [
        { id: "wi-1", name: "Suresh Maurya", tradeEn: "Mason", score: 98, experience: "7 Years", distance: "1.2 km", wage: "750", trustScore: 98, attendance: 96, passportVerified: true, gpsReady: true, availability: "Immediate", language: "Hindi, English" }
      ],
      shortlisted: [
        { id: "ws-1", name: "Amit Vishwakarma", tradeEn: "Mason", score: 88, experience: "4 Years", distance: "4.5 km", wage: "720", trustScore: 90, attendance: 85, passportVerified: true, gpsReady: false, availability: "2 Days", language: "Hindi" }
      ],
      confirmed: [
        { id: "wc-1", name: "Manoj Kumar", tradeEn: "Mason", score: 96, experience: "8 Years", distance: "0.8 km", wage: "750", trustScore: 97, attendance: 94, passportVerified: true, gpsReady: true, availability: "Immediate", language: "Hindi" }
      ],
      completed: [],
      cancelled: [],
      timeline: ["Requirement Created", "Workers Invited", "Workers Accepted", "Workers Confirmed"]
    },
    {
      id: "cr-2",
      titleHi: "GIDA इंडस्ट्रियल शेड वायरिंग",
      titleEn: "GIDA Industrial Shed Wiring",
      tradeHi: "बिजली मिस्त्री",
      tradeEn: "Electrician",
      open: 4,
      filled: 4,
      pending: 3,
      workersCount: 4,
      locationHi: "गीडा सेक्टर ४, गोरखपुर",
      locationEn: "Sector 4, GIDA, Gorakhpur",
      expectedWage: "₹800 / Day",
      duration: "1 Month",
      startDate: "2026-07-08",
      experience: "3+ Years",
      status: "CONFIRMED",
      applicantsCount: 3,
      applied: [],
      invited: [],
      shortlisted: [],
      confirmed: [
        { id: "wc-2", name: "Amit Vishwakarma", tradeEn: "Electrician", score: 96, experience: "5 Years", distance: "1.8 km", wage: "800", trustScore: 95, attendance: 91, passportVerified: true, gpsReady: true, availability: "Immediate", language: "Hindi" }
      ],
      completed: [],
      cancelled: [],
      timeline: ["Requirement Created", "Workers Invited", "Workers Accepted", "Workers Confirmed"]
    },
    {
      id: "cr-3",
      titleHi: "नया बस टर्मिनल सटरिंग वर्क",
      titleEn: "New Bus Terminal Shuttering Work",
      tradeHi: "शटरिंग कारपेंटर",
      tradeEn: "Carpenter",
      open: 6,
      filled: 1,
      pending: 5,
      workersCount: 6,
      locationHi: "गोरखपुर बस स्टैंड",
      locationEn: "New Bus Stand, Gorakhpur",
      expectedWage: "₹850 / Day",
      duration: "2 Months",
      startDate: "2026-07-15",
      experience: "4+ Years",
      status: "INVITING",
      applicantsCount: 5,
      applied: [
        { id: "wa-4", name: "Karan Bahadur", tradeEn: "Carpenter", score: 95, experience: "10 Years", distance: "1.5 km", wage: "800", trustScore: 96, attendance: 95, passportVerified: true, gpsReady: true, availability: "Immediate", language: "Hindi" }
      ],
      invited: [],
      shortlisted: [],
      confirmed: [],
      completed: [],
      cancelled: [],
      timeline: ["Requirement Created", "Workers Invited"]
    }
  ]);

  const [newReqTitleHi, setNewReqTitleHi] = useState("");
  const [newReqTitleEn, setNewReqTitleEn] = useState("");
  const [newReqTrade, setNewReqTrade] = useState("Mason");
  const [newReqCount, setNewReqCount] = useState("5");

  // Dynamic counters offset for simulation
  const [jpeHiredTodayOffset, setJpeHiredTodayOffset] = useState(0);
  const [jpePendingJobsOffset, setJpePendingJobsOffset] = useState(0);
  const [jpeHiringActivityOffset, setJpeHiringActivityOffset] = useState(0);

  // National Job Posting Engine form states
  const [jpeTitle, setJpeTitle] = useState("");
  const [jpeTrade, setJpeTrade] = useState("Mason");
  const [jpeWorkers, setJpeWorkers] = useState("12");
  const [jpeWage, setJpeWage] = useState("750");
  const [jpePaymentType, setJpePaymentType] = useState("Daily");
  const [jpeDuration, setJpeDuration] = useState("3 Months");
  const [jpeState, setJpeState] = useState("Uttar Pradesh");
  const [jpeDistrict, setJpeDistrict] = useState("Gorakhpur");
  const [jpeAddress, setJpeAddress] = useState("");
  const [jpeJoiningDate, setJpeJoiningDate] = useState("2026-07-06");
  const [jpeAccommodation, setJpeAccommodation] = useState("Yes");
  const [jpeFood, setJpeFood] = useState("Yes");
  const [jpeSafety, setJpeSafety] = useState("Yes");
  const [jpeDescription, setJpeDescription] = useState("");

  // Simulation states
  const [jpeIsPublishing, setJpeIsPublishing] = useState(false);
  const [jpePublishStep, setJpePublishStep] = useState(0); // 0=Idle, 1=Publishing, 2=Passport, 3=District, 4=Matching, 5=National Grid, 6=Success
  const [jpeShowPreview, setJpeShowPreview] = useState(false);
  const [jpeActivities, setJpeActivities] = useState([
    { textHi: "शेड वायरिंग कार्य के लिए १ मजदूर की पुष्टि", textEn: "Confirmed 1 worker for Industrial Shed Wiring", timeHi: "१० मिनट पहले", timeEn: "10 min ago" },
    { textHi: "राष्ट्रीय राजमार्ग पुल परियोजना बनाई गई", textEn: "Created Highway Bridge Project Demand", timeHi: "१ घंटा पहले", timeEn: "1 hour ago" }
  ]);
  const [jpeSuccessToast, setJpeSuccessToast] = useState<string | null>(null);
  const [jpeMatchingToast, setJpeMatchingToast] = useState<string | null>(null);
  const [jpeDrafts, setJpeDrafts] = useState<any[]>([]);

  // National Worker Discovery Engine state variables
  const [discoverTrade, setDiscoverTrade] = useState<string>("All");
  const [discoverExp, setDiscoverExp] = useState<string>("All");
  const [discoverWage, setDiscoverWage] = useState<number>(1500);
  const [discoverDistance, setDiscoverDistance] = useState<string>("All");
  const [discoverAvail, setDiscoverAvail] = useState<string>("Immediately");
  const [discoverAadhaar, setDiscoverAadhaar] = useState<boolean>(false);
  const [discoverPassport, setDiscoverPassport] = useState<boolean>(false);
  const [discoverGPS, setDiscoverGPS] = useState<boolean>(false);
  const [discoverPolice, setDiscoverPolice] = useState<boolean>(false);
  const [discoverSkill, setDiscoverSkill] = useState<boolean>(false);
  const [discoverLangs, setDiscoverLangs] = useState<string[]>([]);
  const [discoverSort, setDiscoverSort] = useState<string>("Highest Match");
  const [discoverCompareList, setDiscoverCompareList] = useState<string[]>([]);
  const [discoverSearchQuery, setDiscoverSearchQuery] = useState<string>("");
  const [discoverPassportModal, setDiscoverPassportModal] = useState<any | null>(null);
  const [discoverInviteModal, setDiscoverInviteModal] = useState<any | null>(null);
  const [discoverToast, setDiscoverToast] = useState<string | null>(null);

  const filteredDiscoverWorkers = useMemo(() => {
    let result = [...INITIAL_DISCOVERABLE_WORKERS];

    // Filter by Trade
    if (discoverTrade !== "All") {
      result = result.filter(w => w.trade.toLowerCase() === discoverTrade.toLowerCase());
    }

    // Filter by Experience
    if (discoverExp !== "All") {
      if (discoverExp === "0-2 Years") {
        result = result.filter(w => w.experienceYears <= 2);
      } else if (discoverExp === "3-5 Years") {
        result = result.filter(w => w.experienceYears >= 3 && w.experienceYears <= 5);
      } else if (discoverExp === "5-10 Years") {
        result = result.filter(w => w.experienceYears >= 5 && w.experienceYears <= 10);
      } else if (discoverExp === "10+ Years") {
        result = result.filter(w => w.experienceYears >= 10);
      }
    }

    // Filter by Wage (Expected Wage slider: up to discoverWage)
    result = result.filter(w => w.wage <= discoverWage);

    // Filter by Distance
    if (discoverDistance !== "All") {
      if (discoverDistance === "Within 2 km") {
        result = result.filter(w => w.distance <= 2.0);
      } else if (discoverDistance === "Within 5 km") {
        result = result.filter(w => w.distance <= 5.0);
      } else if (discoverDistance === "Within 10 km") {
        result = result.filter(w => w.distance <= 10.0);
      } else if (discoverDistance === "Within 25 km") {
        result = result.filter(w => w.distance <= 25.0);
      } else if (discoverDistance === "Entire District") {
        result = result.filter(w => w.distance <= 50.0 || w.district === "Gorakhpur");
      }
    }

    // Filter by Availability
    if (discoverAvail) {
      if (discoverAvail === "Available Today") {
        result = result.filter(w => w.availableFrom === "Available Today" || w.availableFrom === "Immediately");
      } else if (discoverAvail === "Tomorrow") {
        result = result.filter(w => w.availableFrom === "Available Today" || w.availableFrom === "Tomorrow" || w.availableFrom === "Immediately");
      } else if (discoverAvail === "This Week") {
        result = result.filter(w => w.availableFrom === "Available Today" || w.availableFrom === "Tomorrow" || w.availableFrom === "This Week" || w.availableFrom === "Immediately");
      } else if (discoverAvail === "Immediately") {
        result = result.filter(w => w.availableFrom === "Immediately" || w.availableFrom === "Available Today");
      }
    }

    // Filter by Verification checkboxes
    if (discoverAadhaar) {
      result = result.filter(w => w.aadhaar);
    }
    if (discoverPassport) {
      result = result.filter(w => w.passport);
    }
    if (discoverGPS) {
      result = result.filter(w => w.gpsActive);
    }
    if (discoverPolice) {
      result = result.filter(w => w.police);
    }
    if (discoverSkill) {
      result = result.filter(w => w.skillCertified);
    }

    // Filter by languages if any are selected
    if (discoverLangs.length > 0) {
      result = result.filter(w => 
        discoverLangs.some(langFilter => w.languages.includes(langFilter))
      );
    }

    // Filter by Search Query
    if (discoverSearchQuery.trim()) {
      const q = discoverSearchQuery.toLowerCase();
      result = result.filter(w => 
        w.name.toLowerCase().includes(q) || 
        w.trade.toLowerCase().includes(q) || 
        w.district.toLowerCase().includes(q) ||
        w.state.toLowerCase().includes(q)
      );
    }

    // Sort options: Newest, Highest Match, Nearest, Lowest Wage, Highest Rating, Most Experienced, Recently Active
    if (discoverSort === "Newest") {
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else if (discoverSort === "Highest Match") {
      result.sort((a, b) => b.aiMatch - a.aiMatch);
    } else if (discoverSort === "Nearest") {
      result.sort((a, b) => a.distance - b.distance);
    } else if (discoverSort === "Lowest Wage") {
      result.sort((a, b) => a.wage - b.wage);
    } else if (discoverSort === "Highest Rating" || discoverSort === "Highest Trust") {
      result.sort((a, b) => b.trustScore - a.trustScore);
    } else if (discoverSort === "Most Experienced") {
      result.sort((a, b) => b.experienceYears - a.experienceYears);
    } else if (discoverSort === "Recently Active") {
      result.sort((a, b) => (b.gpsStatus === "Active" ? 1 : 0) - (a.gpsStatus === "Active" ? 1 : 0));
    }

    return result;
  }, [
    discoverTrade,
    discoverExp,
    discoverWage,
    discoverDistance,
    discoverAvail,
    discoverAadhaar,
    discoverPassport,
    discoverGPS,
    discoverPolice,
    discoverSkill,
    discoverLangs,
    discoverSearchQuery,
    discoverSort
  ]);

  // National Hiring Workspace & Matching Engine state variables
  const [selectedReqId, setSelectedReqId] = useState<string>("cr-1");
  const [workspaceFilter, setWorkspaceFilter] = useState<string>("ALL"); // ALL, OPEN, INVITING, SHORTLISTING, CONFIRMED, IN PROGRESS, COMPLETED, CANCELLED
  const [matchingPanelOpen, setMatchingPanelOpen] = useState(false);
  const [selectedWorkerForMatching, setSelectedWorkerForMatching] = useState<any | null>(null);
  const [offerPanelOpen, setOfferPanelOpen] = useState(false);
  const [isEditingReqId, setIsEditingReqId] = useState<string | null>(null);
  const [editReqWorkersCount, setEditReqWorkersCount] = useState("5");
  const [editReqWage, setEditReqWage] = useState("750");
  const [editReqLocation, setEditReqLocation] = useState("");
  
  // Job Offer Form States
  const [offerWageType, setOfferWageType] = useState<"Daily" | "Weekly" | "Monthly" | "Task">("Daily");
  const [offerWageAmountState, setOfferWageAmountState] = useState("750");
  const [offerJoiningDate, setOfferJoiningDate] = useState("2026-07-06");
  const [offerNotes, setOfferNotes] = useState("");
  const [offerVoiceInstructionEnabled, setOfferVoiceInstructionEnabled] = useState(false);
  const [previewWorkOrder, setPreviewWorkOrder] = useState<any | null>(null);

  // Digital Work Orders State
  const [digitalWorkOrders, setDigitalWorkOrders] = useState([
    {
      id: "WO-2026-89230",
      workerName: "Manoj Kumar",
      contractorName: "Prasad Labour Supplies",
      trade: "Mason",
      location: "Gorakhpur Bypass Sector 2",
      joiningDate: "2026-07-06",
      wage: "₹750 / Day",
      duration: "3 Months",
      status: "ISSUED" // ISSUED, ACTIVE, COMPLETED, CANCELLED
    },
    {
      id: "WO-2026-47128",
      workerName: "Sohan Lal",
      contractorName: "Prasad Labour Supplies",
      trade: "Mason",
      location: "Gorakhpur Bypass Sector 2",
      joiningDate: "2026-07-08",
      wage: "₹750 / Day",
      duration: "3 Months",
      status: "ACTIVE"
    }
  ]);

  // Worker Dashboard - Matching & Application Pipeline States
  const [workerInvitations, setWorkerInvitations] = useState([
    {
      id: "inv-1",
      company: "Prasad Labour Supplies",
      contractor: "Ankur Sahani",
      location: "Sahjanwa Industrial Area",
      distance: "2.1 km",
      trade: "Mason",
      expectedWage: "₹750 / Day",
      duration: "1 Month",
      trustScore: "98%",
      status: "PENDING" // PENDING, ACCEPTED, REJECTED, SAVED
    },
    {
      id: "inv-2",
      company: "GIDA Construction Corp",
      contractor: "R. K. Mishra",
      location: "GIDA Factory Corridor",
      distance: "3.5 km",
      trade: "Mason",
      expectedWage: "₹700 / Day",
      duration: "2 Weeks",
      trustScore: "94%",
      status: "PENDING"
    }
  ]);

  const [workerAppliedJobsList, setWorkerAppliedJobsList] = useState([
    { id: "aj-1", title: "National Highway Bridge", contractor: "Prasad Labour Supplies", location: "Gorakhpur bypass", status: "Applied", date: "2 days ago" },
    { id: "aj-2", title: "Residential Complex Masonry", contractor: "Purvanchal Developers", location: "Golghar, Gorakhpur", status: "Shortlisted", date: "4 days ago" }
  ]);

  const [workerSavedJobsList, setWorkerSavedJobsList] = useState([
    { id: "sj-1", title: "Metro Station Tiling Work", contractor: "UP Metro Rail Corp", location: "Gorakhpur Center", wage: "₹800 / Day" }
  ]);

  const [viewingTrustJobId, setViewingTrustJobId] = useState<string | null>(null);

  // Smart Filters State for National Matching Panel
  const [matchFilterTrade, setMatchFilterTrade] = useState("all");
  const [matchFilterDistrict, setMatchFilterDistrict] = useState("Gorakhpur");
  const [matchFilterExperience, setMatchFilterExperience] = useState("all");
  const [matchFilterWage, setMatchFilterWage] = useState("1000");
  const [matchFilterDistance, setMatchFilterDistance] = useState("10");
  const [matchFilterAvailability, setMatchFilterAvailability] = useState("all");
  const [matchFilterVerifiedOnly, setMatchFilterVerifiedOnly] = useState(true);
  const [matchFilterTrustScore, setMatchFilterTrustScore] = useState("80");
  const [matchFilterGpsEnabled, setMatchFilterGpsEnabled] = useState(true);
  const [matchFilterImmediateJoining, setMatchFilterImmediateJoining] = useState(false);

  useEffect(() => {
    if (registerStep === "worker-flow" && workerRegStep === 9 && !passportId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPassportId(`LP-IND-${Math.floor(100000 + Math.random() * 900000)}-A`);
    }
  }, [registerStep, workerRegStep, passportId]);

  // National Job Posting Engine simulation steps
  useEffect(() => {
    if (jpeIsPublishing) {
      if (jpePublishStep < 6) {
        const timer = setTimeout(() => {
          setJpePublishStep(prev => prev + 1);
        }, 850);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          const newReqObj = {
            id: `cr-${Date.now()}`,
            titleHi: `राष्ट्रीय भर्ती: ${jpeTitle || "सिविल कंक्रीट कार्य"}`,
            titleEn: jpeTitle || "National Civil Concrete Work",
            tradeHi: jpeTrade === "Mason" ? "राजमिस्त्री" : jpeTrade === "Electrician" ? "बिजली मिस्त्री" : jpeTrade === "Painter" ? "पेंटर" : jpeTrade === "Plumber" ? "प्लंबर" : jpeTrade === "Carpenter" ? "बढ़ई" : jpeTrade === "Welder" ? "वेल्डर" : "कुशल मजदूर",
            tradeEn: jpeTrade,
            open: parseInt(jpeWorkers) || 12,
            filled: 0,
            pending: parseInt(jpeWorkers) || 12,
            workersCount: parseInt(jpeWorkers) || 12,
            locationHi: `${jpeDistrict}, ${jpeState}`,
            locationEn: `${jpeDistrict}, ${jpeState}`,
            expectedWage: `₹${jpeWage} / ${jpePaymentType}`,
            duration: jpeDuration,
            startDate: jpeJoiningDate,
            experience: "1+ Years",
            status: "OPEN" as const,
            applicantsCount: 0,
            applied: [],
            invited: [],
            shortlisted: [],
            confirmed: [],
            completed: [],
            cancelled: [],
            timeline: ["Requirement Created", "Published to National Grid", "Nearby Workers Notified"]
          };
          
          setContractorRequirements(prev => [newReqObj, ...prev]);
          
          // Adjust dynamic counters
          setJpeHiredTodayOffset(prev => prev + (parseInt(jpeWorkers) || 12));
          setJpePendingJobsOffset(prev => prev + 1);
          setJpeHiringActivityOffset(prev => prev + 8);
          
          // Add activity logs
          setJpeActivities(prev => [
            { textHi: `नयी आवश्यकता प्रकाशित: ${jpeTitle || "सिविल कार्य"}`, textEn: `Published demand: ${jpeTitle || "Civil Work"}`, timeHi: "अभी-अभी", timeEn: "Just now" },
            { textHi: `${jpeWorkers} कामगारों के लिए एआई मैचिंग प्रारंभ`, textEn: `AI Matching started for ${jpeWorkers} workers`, timeHi: "अभी-अभी", timeEn: "Just now" },
            ...prev
          ]);
          
          // Trigger Toasts
          setJpeSuccessToast(lang === "hi" ? "श्रम मांग सफलतापूर्वक राष्ट्रीय ग्रिड पर प्रसारित की गई!" : "Demand successfully broadcasted to National Labour Grid!");
          setJpeMatchingToast(lang === "hi" ? `एआई मैचिंग इंजन ने ${jpeTrade} श्रेणी के ७ नजदीकी कामगारों को सतर्क किया!` : `AI Matching Engine alerted 7 nearby workers in ${jpeTrade}!`);
          
          // Reset publishing states & form
          setJpeIsPublishing(false);
          setJpePublishStep(0);
          setJpeTitle("");
          setJpeAddress("");
          setJpeDescription("");
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [jpeIsPublishing, jpePublishStep, jpeTitle, jpeTrade, jpeWorkers, jpeDistrict, jpeState, jpeWage, jpePaymentType, jpeDuration, jpeJoiningDate, lang, setContractorRequirements]);

  const calculateCompletion = () => {
    let score = 0;
    if (regName) score += 15;
    if (regGender) score += 10;
    if (regAge) score += 10;
    if (regDob) score += 10;
    if (regSelectedSkills.length > 0) score += 15;
    if (workerExp) score += 10;
    if (workerAvailability) score += 10;
    if (workerRadius) score += 10;
    if (workerWageAmount) score += 5;
    if (docAadhaar || docPan || docDl || docVoter || docPassport) score += 5;
    return Math.min(score, 100);
  };

  // Registration Inputs
  const [regMobile, setRegMobile] = useState("");
  const [regOtp, setRegOtp] = useState("");
  const [regName, setRegName] = useState("");
  const [regGender, setRegGender] = useState("");
  const [regAge, setRegAge] = useState("");
  const [regState, setRegState] = useState("");
  const [regDistrict, setRegDistrict] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regPin, setRegPin] = useState("");
  const [regPrimarySkill, setRegPrimarySkill] = useState("");
  const [regExperience, setRegExperience] = useState("");
  const [regWage, setRegWage] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regCategory, setRegCategory] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regCrop, setRegCrop] = useState("");
  const [regOrgName, setRegOrgName] = useState("");
  const [regEmail, setRegEmail] = useState("");

  // Login Inputs
  const [loginMobile, setLoginMobile] = useState("");
  const [loginOtp, setLoginOtp] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<{ name: string; role: string } | null>(null);

  // Prompt-14: Platform Fee, Settlement & Revenue Model Engine states
  const [prompt14TradeFees, setPrompt14TradeFees] = useState([
    { id: "mason", nameHi: "राजमिस्त्री", nameEn: "Mason", avgWage: 750, feePercent: 4.0, minFee: 15, maxFee: 50, phase: "Launch" },
    { id: "painter", nameHi: "रंगसाज़", nameEn: "Painter", avgWage: 650, feePercent: 3.5, minFee: 15, maxFee: 40, phase: "Launch" },
    { id: "plumber", nameHi: "नलसाज", nameEn: "Plumber", avgWage: 700, feePercent: 4.5, minFee: 20, maxFee: 60, phase: "Growth" },
    { id: "electrician", nameHi: "बिजली मिस्त्री", nameEn: "Electrician", avgWage: 800, feePercent: 5.0, minFee: 20, maxFee: 70, phase: "Growth" },
    { id: "carpenter", nameHi: "बढ़ई", nameEn: "Carpenter", avgWage: 800, feePercent: 4.0, minFee: 20, maxFee: 65, phase: "Growth" },
    { id: "general_labour", nameHi: "मजदूर", nameEn: "General Labour", avgWage: 500, feePercent: 3.0, minFee: 10, maxFee: 30, phase: "Launch" },
    { id: "agricultural_worker", nameHi: "खेती मजदूर", nameEn: "Agricultural Worker", avgWage: 450, feePercent: 3.0, minFee: 10, maxFee: 30, phase: "Launch" },
    { id: "helper", nameHi: "सहायक", nameEn: "Helper", avgWage: 550, feePercent: 3.5, minFee: 12, maxFee: 35, phase: "Launch" },
  ]);

  const [prompt14WorkerSettlement, setPrompt14WorkerSettlement] = useState({
    receiptId: "LA-SET-2026-001",
    wageEarned: 900,
    platformFee: 36,
    status: "Completed",
    paymentMode: "UPI",
    trustImpact: 2,
    date: "2026-07-05 12:44 UTC",
  });

  const [prompt14ContractorSettlements, setPrompt14ContractorSettlements] = useState([
    {
      id: "set-c-1",
      jobNameHi: "राजमिस्त्री का काम — गोरखपुर बाईपास सेक्टर २",
      jobNameEn: "Masonry Concrete Work — Gorakhpur Bypass Sec 2",
      workerName: "Hari Ram (हरि राम)",
      wage: 900,
      platformFee: 36,
      tradeId: "mason",
      status: "Pending", // Pending, Paying, Paid, Completed
      receiptId: "LA-SET-2026-002",
      paymentMode: "None",
      date: "Pending Completion",
    }
  ]);

  const [prompt14AdminRevenue, setPrompt14AdminRevenue] = useState({
    todayRevenue: 18560,
    monthlyProjected: 540000,
    completedCount: 642,
    avgFee: 29,
    wageProtected: 100,
    disputeFreeRate: 96.8,
  });

  const [prompt14SustainabilityIndex, setPrompt14SustainabilityIndex] = useState(98.4);
  const [prompt14ShowPaymentModal, setPrompt14ShowPaymentModal] = useState(false);
  const [prompt14ActivePayId, setPrompt14ActivePayId] = useState<string | null>(null);
  const [prompt14SuccessMsg, setPrompt14SuccessMsg] = useState("");
  const [prompt14WorkerTrustScore, setPrompt14WorkerTrustScore] = useState(96);
  const [prompt14ContractorTrustScore, setPrompt14ContractorTrustScore] = useState(98);
  const [prompt14ShowVerifiedBadge, setPrompt14ShowVerifiedBadge] = useState(true);

  // Save language preference dynamically
  const handleLangChange = (selected: "hi" | "en") => {
    setLang(selected);
    if (typeof window !== "undefined") {
      localStorage.setItem("labouradda_lang", selected);
    }
  };

  // Voice Speech Synthesizer Assistant
  const handleVoiceSpeak = (textHi: string, textEn: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Avoid triggering card click
    }

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Stop any running voice
      
      const speechText = lang === "hi" ? textHi : textEn;
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = lang === "hi" ? "hi-IN" : "en-IN";
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        setActiveSpeechText(speechText);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setActiveSpeechText(null);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setActiveSpeechText(null);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Direct UI simulator fallback for restricted frame environments
      const speechText = lang === "hi" ? textHi : textEn;
      setIsSpeaking(true);
      setActiveSpeechText(speechText);
      const timer = setTimeout(() => {
        setIsSpeaking(false);
        setActiveSpeechText(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  };

  // Category Configuration (HI | EN labels styled)
  const categories = [
    { id: "all", labelHi: "सभी श्रेणियां", labelEn: "All Sectors", icon: Briefcase },
    { id: "construction", labelHi: "निर्माण और कुशल कार्य", labelEn: "Construction & Skilled Trades", icon: Hammer },
    { id: "repair", labelHi: "घर की मरम्मत और रखरखाव", labelEn: "Home Repair & Maintenance", icon: Wrench },
    { id: "general", labelHi: "दैनिक मजदूरी और सामान्य श्रम", labelEn: "Daily Wage & General Labour", icon: Users },
    { id: "rural", labelHi: "ग्रामीण और कृषि कार्य", labelEn: "Rural & Agricultural Work", icon: Sprout },
    { id: "helper", labelHi: "सहायक और सहायक भूमिकाएं", labelEn: "Helper & Support Roles", icon: HelpCircle }
  ];

  // Filtering professions based on category and search query
  const filteredProfessions = useMemo(() => {
    return professions.filter((prof) => {
      const matchesCategory = selectedCategory === "all" || prof.category === selectedCategory;
      const matchesSearch = 
        prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.hindiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.roleLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [professions, selectedCategory, searchQuery]);

  // Handle adding a new profession (Admin Panel Action)
  const handleAddProfession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfName || !newProfHindiName) {
      setAdminStatusMsg("कृपया अंग्रेजी और हिंदी दोनों नाम दर्ज करें / Please fill in both English and Hindi names.");
      return;
    }

    const tasksArray = newProfTasks
      ? newProfTasks.split(",").map(t => t.trim()).filter(Boolean)
      : ["इस ट्रेड से जुड़े सामान्य कर्तव्य", "सुरक्षा दिशानिर्देशों का पालन"];

    const newProf: Profession = {
      id: `p-${Date.now()}`,
      name: newProfName,
      hindiName: `${newProfHindiName} (${newProfName})`,
      category: newProfCategory,
      roleLabel: `${newProfHindiName} / ${newProfName}`,
      typicalTasks: tasksArray,
      wageRange: {
        min: parseInt(newProfMinWage) || 500,
        max: parseInt(newProfMaxWage) || 800,
        unit: newProfUnit
      },
      availability: "Daily",
      description: newProfDesc || `Professional ${newProfName} services for community and district projects.`,
      imageSeed: newProfName.toLowerCase().replace(/\s+/g, "-")
    };

    setProfessions([newProf, ...professions]);
    setNewProfName("");
    setNewProfHindiName("");
    setNewProfTasks("");
    setNewProfDesc("");
    setAdminStatusMsg(`सफलता: '${newProfHindiName}' को होम स्क्रीन में जोड़ा गया! / Success: '${newProfName}' deployed dynamically!`);
    setTimeout(() => setAdminStatusMsg(""), 4000);
  };

  // Background styling mapping for realistic visuals
  const getCardStyle = (seed: string) => {
    switch (seed) {
      case "masonry":
        return "from-slate-900 via-slate-900 to-amber-950/40 border-amber-500/30";
      case "woodwork":
        return "from-slate-900 via-slate-900 to-orange-950/40 border-orange-500/30";
      case "painting":
        return "from-slate-900 via-slate-900 to-teal-950/40 border-teal-500/30";
      case "electrical":
        return "from-slate-900 via-slate-900 to-red-950/40 border-red-500/30";
      case "plumbing":
        return "from-slate-900 via-slate-900 to-sky-950/40 border-sky-500/30";
      case "labour":
        return "from-slate-900 via-slate-900 to-neutral-900/40 border-neutral-600/30";
      case "farming":
        return "from-slate-900 via-slate-900 to-emerald-950/40 border-emerald-500/30";
      case "helper":
        return "from-slate-900 via-slate-900 to-violet-950/40 border-violet-500/30";
      default:
        return "from-slate-900 via-slate-900 to-zinc-900 border-zinc-500/30";
    }
  };

  if (!mounted) {
    return (
      <div id="app-root-skeleton" className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center antialiased">
        <div className="text-center">
          <div className="bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 px-4 py-2 rounded-xl shadow-lg font-bold text-lg tracking-wider inline-block font-mono mb-4 animate-pulse">
            LA
          </div>
          <p className="text-xs font-mono text-slate-400">LOADING LABOURADDA INFRASTRUCTURE...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="app-root" className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-900 antialiased pb-24">
      
      {/* 1. App Header with LabourAdda v2.0 Branding & Language Switcher */}
      <header id="app-header" className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3.5 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Platform Tagline */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 p-2.5 rounded-xl shadow-lg font-bold text-lg tracking-wider flex items-center justify-center font-mono">
                LA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-white font-mono leading-none">
                    LabourAdda <span className="text-amber-500 font-sans text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-500/10">v2.0</span>
                  </h1>
                </div>
                <p className="text-[9px] text-slate-400 font-mono tracking-wider uppercase mt-1">
                  {lang === "hi" ? "भारत का डिजिटल श्रम बुनियादी ढांचा" : "India's Digital Labour Infrastructure"}
                </p>
              </div>
            </div>

            {/* Language Toggle visible on mobile directly as well */}
            <div className="sm:hidden">
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 h-10 min-w-[96px]">
                <button
                  id="btn-lang-toggle-hi-mobile"
                  onClick={() => handleLangChange("hi")}
                  className={`flex-1 h-full rounded text-xs font-bold transition-all cursor-pointer ${
                    lang === "hi" ? "bg-amber-500 text-slate-950" : "text-slate-400"
                  }`}
                >
                  HI
                </button>
                <button
                  id="btn-lang-toggle-en-mobile"
                  onClick={() => handleLangChange("en")}
                  className={`flex-1 h-full rounded text-xs font-bold transition-all cursor-pointer ${
                    lang === "en" ? "bg-amber-500 text-slate-950" : "text-slate-400"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>

          {/* Quick Interaction, Location Selector & Interactive Lang Switcher */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* 1. Global Language Toggle (HI | EN switch) - Accessible in One Tap */}
            <div className="hidden sm:flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 h-10">
              <button
                id="btn-lang-toggle-hi-desktop"
                onClick={() => handleLangChange("hi")}
                className={`px-3.5 h-full rounded text-xs font-bold transition-all cursor-pointer ${
                  lang === "hi" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                HI (हिंदी)
              </button>
              <button
                id="btn-lang-toggle-en-desktop"
                onClick={() => handleLangChange("en")}
                className={`px-3.5 h-full rounded text-xs font-bold transition-all cursor-pointer ${
                  lang === "en" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                EN (English)
              </button>
            </div>

            {/* Location Display Selector with Stacked HI/EN hint */}
            <button 
              id="btn-location-selector"
              onClick={() => setIsLocModalOpen(true)}
              className="flex items-center gap-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 px-4 py-1.5 rounded-xl text-xs transition duration-150 cursor-pointer min-h-[48px]"
            >
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <div className="text-left">
                <p className="text-[8px] text-slate-400 uppercase tracking-widest leading-none font-mono">स्थान / Location</p>
                <p className="font-semibold text-slate-100 leading-tight mt-0.5 text-xs">{selectedLocation.label}</p>
              </div>
            </button>

            {/* Auth Gateway Buttons */}
            {loggedInUser ? (
              <div className="flex items-center gap-2">
                <div className="flex flex-col text-right">
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest font-mono leading-none">सक्रिय / Active</span>
                  <span className="text-xs font-bold text-emerald-400 leading-tight mt-0.5">{loggedInUser.name}</span>
                  <span className="text-[9px] text-slate-400 leading-none font-mono">({loggedInUser.role})</span>
                </div>
                <button
                  id="btn-logout"
                  onClick={() => {
                    setLoggedInUser(null);
                    handleVoiceSpeak("सफलतापूर्वक लॉगआउट हो गया।", "Logged out successfully.");
                  }}
                  className="flex flex-col items-center justify-center bg-red-950/30 hover:bg-red-900/40 border border-red-500/20 hover:border-red-500/40 text-red-200 px-3 py-1.5 rounded-xl text-xs transition duration-150 cursor-pointer min-h-[48px]"
                >
                  <span className="text-xs font-bold leading-none">बाहर निकलें</span>
                  <span className="text-[8px] text-red-400 leading-none mt-0.5 font-mono">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  id="btn-login-gateway-trigger"
                  onClick={() => {
                    setLoginStep("role");
                    setSelectedRoleForLogin(null);
                    setIsLoginModalOpen(true);
                    handleVoiceSpeak("लॉगिन पोर्टल में आपका स्वागत है। अपनी श्रेणी चुनें।", "Welcome to login portal. Select your role.");
                  }}
                  className="flex flex-col items-center justify-center bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 px-3.5 py-1.5 rounded-xl text-xs transition duration-150 cursor-pointer min-h-[48px]"
                >
                  <span className="text-xs font-bold leading-none">लॉगिन</span>
                  <span className="text-[9px] text-slate-400 leading-none mt-0.5 font-mono">Login</span>
                </button>
                <button
                  id="btn-register-gateway-trigger"
                  onClick={() => {
                    setRegisterStep("role");
                    setSelectedRoleForRegister(null);
                    setIsRegisterModalOpen(true);
                    handleVoiceSpeak("पंजीकरण पोर्टल में आपका स्वागत है। अपनी श्रेणी चुनें।", "Welcome to registration portal. Select your role.");
                  }}
                  className="flex flex-col items-center justify-center bg-gradient-to-tr from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 px-3.5 py-1.5 rounded-xl text-xs font-bold transition duration-150 cursor-pointer min-h-[48px] shadow-lg border border-amber-400/20"
                >
                  <span className="text-xs font-bold leading-none">रजिस्टर</span>
                  <span className="text-[9px] text-slate-950/80 leading-none mt-0.5 font-mono">Register</span>
                </button>
              </div>
            )}

            {/* Developer State Control Toggle with Stacked HI/EN hint */}
            <button
              id="btn-admin-panel-toggle"
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl text-xs font-mono transition duration-150 border cursor-pointer min-h-[48px] ${
                isAdminMode 
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md" 
                  : "bg-slate-800/50 hover:bg-slate-800 text-slate-300 border-slate-700"
              }`}
            >
              <span className="text-xs font-bold leading-none">{isAdminMode ? "कंट्रोल बंद" : "व्यवस्थापक"}</span>
              <span className="text-[9px] opacity-85 leading-none mt-0.5">{isAdminMode ? "Exit Admin" : "Admin Panel"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 5. Jury Visibility Requirement: India-first Language & Accessibility Layer Indicator Banner */}
      <section id="accessibility-layer-banner" className="bg-gradient-to-r from-amber-500/10 via-amber-600/15 to-amber-500/10 border-b border-amber-500/25 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/20 text-amber-400 p-2 rounded-lg shrink-0">
              <Volume2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                India-first Language & Accessibility Layer Active
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5">
                This feature ensures inclusion of workers with low digital literacy, enabling nationwide adoption beyond metro cities.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-lg text-[10px] text-slate-400 font-mono shrink-0">
            <span>Voice Guide Supports:</span>
            <span className="text-amber-500 font-bold">HI (हिन्दी)</span>
            <span>&</span>
            <span className="text-amber-500 font-bold">EN (English)</span>
          </div>
        </div>
      </section>

      {/* Hero Header Section */}
      <section id="hero-banner" className="relative overflow-hidden bg-slate-900 border-b border-slate-800 py-10 sm:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.03),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="max-w-3xl">
            {/* Trust and Safety Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-full px-3.5 py-1 mb-4 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>National Startup Advisory Showcase — JURY DEMO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {lang === "hi" ? "आदरणीय दैनिक वेतन भोगी श्रमिक।" : "Honorable Daily Wage Workers."} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                {lang === "hi" ? "प्रत्यक्ष विश्वास-लिंक्ड खोज।" : "Direct Trust-Linked Discovery."}
              </span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {lang === "hi" 
                ? "निर्माण, कृषि और सामान्य श्रमिकों के शोषण को समाप्त करना। भारत के ग्रामीण ब्लॉकों से लेकर मेट्रो हब तक फैले श्रम बाजारों के लिए तैयार किया गया एक शून्य-कमीशन, पहचान-सत्यापित बुनियादी ढांचा।"
                : "Eliminating exploitation of construction, agricultural, and general workers. A zero-commission, identity-verified infrastructure tailored for Indian labor markets spanning rural blocks to metro hubs."
              }
            </p>

            {/* Primary Search Bar */}
            <div id="search-container" className="mt-8 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  id="input-worker-search"
                  type="text"
                  placeholder={
                    lang === "hi" 
                      ? "पेशा खोजें (जैसे कि राजमिस्त्री, पेंटर, प्लंबर, मजदूर)... / Search by trade..."
                      : "Search by trade (e.g., Mason, Painter, Plumber, Labour)... / पेशा खोजें..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 hover:bg-slate-950/90 focus:bg-slate-950 text-white placeholder-slate-500 pl-12 pr-4 py-3.5 rounded-xl border border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm transition duration-150 shadow-inner"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <p className="mt-2 text-xs text-slate-500 font-mono">
                {lang === "hi" ? "सुझाए गए ट्रेड: " : "Suggested trades: "} 
                <span className="text-amber-500 hover:underline cursor-pointer" onClick={() => setSearchQuery("Rajmistri")}>Rajmistri / राजमिस्त्री</span>,{" "}
                <span className="text-amber-500 hover:underline cursor-pointer" onClick={() => setSearchQuery("Electrician")}>Electrician / बिजली मिस्त्री</span>
              </p>
            </div>
          </div>

          {/* Infrastructure trust cards */}
          <div id="trust-indicators-grid" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 border-t border-slate-800/80 pt-8">
            <div className="flex gap-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
              <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded-lg shrink-0 self-start">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">
                  {lang === "hi" ? "पहचान और केवाईसी सत्यापित" : "Identity & KYC Verified"}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === "hi" 
                    ? "स्थानीय ग्राम पंचायत और नगर निगम वार्डों के साथ जुड़े आधार-सत्यापित प्रोफाइल।" 
                    : "Aadhaar-authenticated profiles connected with local village & city council registers."
                  }
                </p>
              </div>
            </div>

            <div className="flex gap-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
              <div className="bg-amber-500/10 text-amber-400 p-2 rounded-lg shrink-0 self-start">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">
                  {lang === "hi" ? "पारदर्शी स्थानीयकृत मजदूरी" : "Transparent Localized Wages"}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === "hi" 
                    ? "कोई बिचौलिया कमीशन नहीं। न्यूनतम सरकारी दिशानिर्देशों के अनुसार तय मजदूरी दरें।" 
                    : "No middlemen commissions. Indicated market ranges protect both employers and workers."
                  }
                </p>
              </div>
            </div>

            <div className="flex gap-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
              <div className="bg-blue-500/10 text-blue-400 p-2 rounded-lg shrink-0 self-start">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">
                  {lang === "hi" ? "अनुकूलनीय बुकिंग मॉडल" : "Adaptable Booking Models"}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === "hi" 
                    ? "दैनिक श्रम, प्रति घंटे काम, या निश्चित मूल्य अनुबंध के आधार पर तत्काल सेवाएं।" 
                    : "Seamless daily wage hiring, hourly assistance, or custom lump-sum labor contracts."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* National Labour Intelligence - Landing Highlight Card */}
          <div className="mt-8 bg-gradient-to-r from-amber-500/10 via-amber-600/15 to-transparent border border-amber-500/30 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="bg-amber-500 text-slate-950 p-2.5 rounded-xl shrink-0 shadow-lg shadow-amber-500/10">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  {lang === "hi" ? "वंदे भारतम इम्पैक्ट इंटेलिजेंस" : "Vande Bharatam Impact Intelligence Layer"}
                </span>
                <h4 className="text-base font-bold text-white font-mono mt-0.5">
                  {lang === "hi" ? "राष्ट्रीय लेबर इंटेलिजेंस" : "National Labour Intelligence"}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 max-w-xl">
                  {lang === "hi" 
                    ? "भारत के सत्यापित श्रम बल के लिए वास्तविक समय जिला-वार मांग और कौशल अंतर विश्लेषण।" 
                    : "Real-time district-wise demand, wage visibility, and skill gap insights for India’s verified workforce."}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowLabourIntel(true);
                handleVoiceSpeak(
                  "राष्ट्रीय लेबर इंटेलिजेंस डैशबोर्ड खोला जा रहा है।", 
                  "Opening National Labour Intelligence Dashboard..."
                );
              }}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold font-mono transition shadow-lg shrink-0 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <TrendingUp className="w-4 h-4" />
              <span>{lang === "hi" ? "डैशबोर्ड खोलें" : "Open Dashboard"}</span>
            </button>
          </div>

        </div>
      </section>

      {/* Main Grid & Navigation */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* WORKER DIGITAL DASHBOARD (COHESIVE FULLY FUNCTIONAL VIEW) */}
        {loggedInUser && loggedInUser.role === "worker" && (
          <div id="worker-dashboard-panel" className="mb-10 space-y-6 animate-fadeIn bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {lang === "hi" ? "श्रमिक राष्ट्रीय डिजिटल डैशबोर्ड" : "National Worker Digital Dashboard"}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === "hi" 
                    ? "सत्यापित राष्ट्रीय श्रम अवसंरचना पोर्टल। आपका डिजिटल श्रम पासपोर्ट सक्रिय है।" 
                    : "Verified National Labor Grid. Your portable Digital Passport is active and synchronized."}
                </p>
              </div>

              {/* Speech Assist Trigger */}
              <button
                onClick={() => handleVoiceSpeak(
                  `विवरण। नमस्कार ${loggedInUser.name}। आपका डिजिटल श्रम पासपोर्ट एक्टिव है। आपकी वर्तमान मजदूरी दर ${currentWageDemand || workerWageAmount || "500"} रुपये है।`,
                  `Welcome back ${loggedInUser.name}. Your passport is active and set at ${currentWageDemand || workerWageAmount || "500"} rupees.`
                )}
                className="self-start md:self-center p-2 px-3 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 rounded-xl border border-amber-500/25 transition cursor-pointer flex items-center gap-2 text-xs font-semibold"
              >
                <Volume2 className="w-4 h-4" />
                <span>{lang === "hi" ? "डैशबोर्ड रिपोर्ट सुनें" : "Listen to Status"}</span>
              </button>
            </div>

            {/* TWO-COLUMN LAYOUT: PASSPORT DISPLAY & INTERACTIVE TOOLS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Visual Passport Card */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/30 border-2 border-amber-500/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden w-full max-w-sm mx-auto">
                  {/* Flag Ribbon */}
                  <div className="absolute top-0 right-0 flex h-1 w-16">
                    <div className="bg-[#FF9933] flex-1" />
                    <div className="bg-white flex-1" />
                    <div className="bg-[#138808] flex-1" />
                  </div>

                  {/* Government Seal Silhouette background */}
                  <div className="absolute -bottom-6 -right-6 text-slate-900 pointer-events-none opacity-20">
                    <Award className="w-40 h-40" />
                  </div>

                  <div className="flex justify-between items-start border-b border-slate-800 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-500 text-slate-950 px-1.5 py-1 rounded font-mono font-bold text-[10px] leading-none">
                        LA
                      </div>
                      <div>
                        <h5 className="text-[9px] font-bold text-white tracking-wider uppercase font-mono leading-none">LabourAdda v2.0</h5>
                        <span className="text-[6px] text-slate-500 block font-mono uppercase mt-0.5">National Grid</span>
                      </div>
                    </div>
                    <span className="text-[7px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono uppercase font-bold">
                      VERIFIED (सत्यापित)
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 relative z-10">
                    <div className="col-span-1">
                      <div className="w-full aspect-[4/5] bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
                        {regPhoto ? (
                          <img src={regPhoto} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <Camera className="w-5 h-5 text-slate-600" />
                        )}
                      </div>
                    </div>

                    <div className="col-span-2 space-y-1.5 text-left text-xs">
                      <div>
                        <span className="text-[6px] text-slate-500 uppercase tracking-widest block font-mono leading-none">नाम / Full Name</span>
                        <span className="font-bold text-white mt-0.5 block truncate text-xs">{loggedInUser.name}</span>
                      </div>
                      <div>
                        <span className="text-[6px] text-slate-500 uppercase tracking-widest block font-mono leading-none">पहचान पत्र आईडी / Passport ID</span>
                        <span className="text-[10px] font-bold text-amber-400 font-mono mt-0.5 block">{passportId || "LP-IND-391821-A"}</span>
                      </div>
                      <div>
                        <span className="text-[6px] text-slate-500 uppercase tracking-widest block font-mono leading-none">कौशल / Skills</span>
                        <span className="text-[9px] font-bold text-slate-200 mt-0.5 block truncate">
                          {regSelectedSkills.length > 0 ? regSelectedSkills.join(", ") : "Mason, Painter"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between gap-2 relative z-10">
                    <div className="text-left space-y-0.5">
                      <div>
                        <span className="text-[5px] text-slate-500 block leading-none font-mono">STATE & DISTRICT</span>
                        <span className="text-[8px] font-bold text-slate-300 font-mono">{regDistrict || "Gorakhpur"}, {regState || "UP"}</span>
                      </div>
                      <div>
                        <span className="text-[5px] text-slate-500 block leading-none font-mono">EXPECTED WAGE</span>
                        <span className="text-[9px] font-bold text-amber-500 font-mono">₹{currentWageDemand || workerWageAmount || "500"} / {workerWageBasis || "Daily"}</span>
                      </div>
                    </div>

                    {/* QR Code Graphic */}
                    <div className="bg-white p-0.5 rounded-md shrink-0 border border-slate-200 shadow-sm">
                      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" fill="white" />
                        <rect x="1" y="1" width="6" height="6" fill="black" />
                        <rect x="2" y="2" width="4" height="4" fill="white" />
                        <rect x="17" y="1" width="6" height="6" fill="black" />
                        <rect x="18" y="2" width="4" height="4" fill="white" />
                        <rect x="1" y="17" width="6" height="6" fill="black" />
                        <rect x="2" y="18" width="4" height="4" fill="white" />
                        <rect x="9" y="9" width="6" height="6" fill="black" />
                        <rect x="10" y="10" width="4" height="4" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Grid Tools */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Card 1: Active Presence Toggle */}
                  <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider block">उपस्थिति स्थिति / Presence Status</span>
                      <h4 className="text-xs font-bold text-white mt-1">
                        {workerStatusActive 
                          ? (lang === "hi" ? "● काम के लिए सक्रिय उपलब्ध" : "● Active & Available for Jobs")
                          : (lang === "hi" ? "○ वर्तमान में ऑफलाइन" : "○ Currently Offline")}
                      </h4>
                    </div>

                    <button
                      onClick={() => {
                        setWorkerStatusActive(!workerStatusActive);
                        handleVoiceSpeak(
                          workerStatusActive ? "अब आप ऑफलाइन हैं।" : "अब आप काम के लिए उपलब्ध हैं।",
                          workerStatusActive ? "You are offline." : "You are marked active and ready for hire."
                        );
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        workerStatusActive 
                          ? "bg-emerald-500 text-slate-950 font-extrabold" 
                          : "bg-slate-850 hover:bg-slate-800 text-slate-400 border border-slate-800"
                      }`}
                    >
                      <span>{workerStatusActive ? (lang === "hi" ? "सक्रिय बंद करें" : "Go Offline") : (lang === "hi" ? "काम के लिए सक्रिय करें" : "Go Active & Available")}</span>
                    </button>
                  </div>

                  {/* Card 2: Daily Attendance Logger */}
                  <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider block">दैनिक जीपीएस हाजिरी / Attendance</span>
                      <h4 className="text-xs text-slate-300 mt-1 leading-normal">
                        {attendanceLogged 
                          ? (lang === "hi" ? "आज की हाजिरी दर्ज हो चुकी है।" : "Attendance logged for today at Sahjanwa, Gorakhpur.")
                          : (lang === "hi" ? "दैनिक काम पाने के लिए हाजिरी लगाएं।" : "Mark daily presence to appear on hiring map.")}
                      </h4>
                    </div>

                    <button
                      onClick={() => {
                        setAttendanceLogged(true);
                        handleVoiceSpeak(
                          "उपस्थिति दर्ज की गई। दैनिक हाजिरी रजिस्टर अद्यतन किया गया।",
                          "Attendance successfully logged. Synced with Gorakhpur cluster."
                        );
                      }}
                      disabled={attendanceLogged}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        attendanceLogged 
                          ? "bg-slate-900 border border-slate-850 text-emerald-400" 
                          : "bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>
                        {attendanceLogged 
                          ? (lang === "hi" ? "हाजिरी दर्ज ✓ (12:44 UTC)" : "Attendance Recorded ✓")
                          : (lang === "hi" ? "हाजिरी लगाएं" : "Log Daily Attendance")}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Wage Demand Adjuster Form */}
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div>
                    <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider block">मजदूरी दर अद्यतन / Modify Wage Demands</span>
                    <p className="text-xs text-slate-400 mt-0.5 leading-none">
                      {lang === "hi" ? "अपनी वर्तमान वेतन मांग बदलें:" : "Adjust your current price/wage for direct contractors:"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-2 text-xs text-slate-500 font-bold">₹</span>
                      <input
                        type="number"
                        placeholder={workerWageAmount || "500"}
                        value={currentWageDemand}
                        onChange={(e) => setCurrentWageDemand(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-white pl-7 pr-3 py-1.5 rounded-xl text-xs font-bold focus:border-amber-500 outline-none"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (!currentWageDemand) return;
                        handleVoiceSpeak(
                          `वेतन मांग बदलकर ${currentWageDemand} रुपये प्रतिदिन कर दी गई है।`,
                          `Wage demand successfully adjusted to ${currentWageDemand} rupees.`
                        );
                        alert(`वेतन मांग बदलकर ₹${currentWageDemand} प्रतिदिन कर दी गई है। / Wage adjusted successfully.`);
                      }}
                      className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer"
                    >
                      {lang === "hi" ? "बदलें" : "Update"}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* PROMPT-16: NATIONAL DIGITAL LABOUR PASSPORT FOR WORKER */}
            <div id="national-digital-labour-passport-section" className="mt-8 border-t border-slate-800 pt-8 space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-gradient-to-tr from-emerald-500 to-emerald-600 text-slate-950 rounded-2xl shadow-xl">
                    <ShieldCheck className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white font-sans tracking-tight flex items-center gap-2">
                      {lang === "hi" ? "राष्ट्रीय डिजिटल श्रम पासपोर्ट" : "National Digital Labour Passport"}
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase">LIVE INFRA</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {lang === "hi"
                        ? "असंगठित कामगारों के लिए भारत की पोर्टेबल, डिजिटल रूप से सत्यापित पहचान और क्रेडेंशियल।"
                        : "India's portable, digitally verified identity & credentials for informal sector workforce participants."}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-wider self-start sm:self-center">
                  LP-IND-391821-A
                </span>
              </div>

              {/* JURY DEMO HIGHLIGHT */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                <div className="text-xs">
                  <p className="text-amber-400 font-bold font-mono uppercase tracking-wide text-[10px]">Jury Demo Highlight / जूरी डेमो विशेषता:</p>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    <strong>English:</strong> “Digital Labour Passport transforms informal workers into verified, portable, bankable workforce participants.”
                  </p>
                  <p className="text-slate-400 mt-1 leading-relaxed text-[11px] border-t border-slate-900/60 pt-1.5">
                    <strong>Hindi:</strong> “डिजिटल श्रम पासपोर्ट असंगठित कामगारों को सत्यापित, पोर्टेबल और वित्तीय रूप से सक्षम कार्यबल में बदलता है।”
                  </p>
                </div>
              </div>

              {/* SIMULATED TOASTS / STATUS NOTIFICATIONS */}
              {prompt16WorkerVerified && (
                <div className="bg-emerald-500 text-slate-950 p-4 rounded-xl space-y-1.5 shadow-lg relative animate-fadeIn">
                  <button 
                    onClick={() => setPrompt16WorkerVerified(false)}
                    className="absolute top-2 right-2 hover:opacity-80 text-slate-950 font-bold font-mono text-xs"
                  >
                    ✕
                  </button>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="font-bold text-xs uppercase font-mono">
                      {lang === "hi" ? "सत्यापन सफलतापूर्वक संपन्न हुआ" : "Passport Verified Successfully"}
                    </span>
                  </div>
                  <p className="text-xs leading-normal">
                    <strong>English:</strong> “Passport verified successfully. Worker identity, skill, trust score, and attendance history are authenticated.”
                  </p>
                  <p className="text-xs leading-normal border-t border-emerald-600/40 pt-1">
                    <strong>Hindi:</strong> “पासपोर्ट सफलतापूर्वक सत्यापित हो गया है। कामगार की पहचान, हुनर, विश्वास स्कोर और उपस्थिति इतिहास प्रमाणित हैं।”
                  </p>
                </div>
              )}

              {prompt16HistoryModal && (
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 shadow-lg relative animate-fadeIn">
                  <button 
                    onClick={() => setPrompt16HistoryModal(false)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-xs text-white uppercase font-mono">
                      {lang === "hi" ? "सत्यापित कार्य इतिहास ट्रैक" : "Verified Work History Record"}
                    </span>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto text-xs font-mono text-slate-300">
                    <div className="p-2 bg-slate-950 rounded border border-slate-850">
                      <div className="flex justify-between font-bold text-white">
                        <span>{lang === "hi" ? "प्लास्टर और कंक्रीट मिक्सिंग" : "Plaster & Concrete Mix"}</span>
                        <span className="text-emerald-400">₹900/Day</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">Gorakhpur Industrial Corridor | Completed on 28 June 2026</p>
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-850">
                      <div className="flex justify-between font-bold text-white">
                        <span>{lang === "hi" ? "ईंट चिनाई कार्य" : "Brickwork Construction"}</span>
                        <span className="text-emerald-400">₹850/Day</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">Sahjanwa Housing Block | Completed on 15 June 2026</p>
                    </div>
                  </div>
                </div>
              )}

              {prompt16Downloaded && (
                <div className="bg-blue-500 text-white p-3 rounded-xl flex items-center justify-between font-mono text-xs font-bold animate-pulse shadow-lg">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>{lang === "hi" ? "डेमो आईडी कार्ड डाउनलोड शुरू हुआ..." : "Downloading Demo National Labour ID..."}</span>
                  </div>
                  <button onClick={() => setPrompt16Downloaded(false)} className="text-white hover:opacity-80 font-bold">✕</button>
                </div>
              )}

              {prompt16Shared && (
                <div className="bg-purple-500 text-white p-3 rounded-xl flex items-center justify-between font-mono text-xs font-bold animate-pulse shadow-lg">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    <span>{lang === "hi" ? "साझा लिंक क्लिपबोर्ड पर कॉपी किया गया!" : "Secure QR Verification Link Copied to Clipboard!"}</span>
                  </div>
                  <button onClick={() => setPrompt16Shared(false)} className="text-white hover:opacity-80 font-bold">✕</button>
                </div>
              )}

              {/* Main Grid: QR Card and Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Visual Passport QR Box (Col 5) */}
                <div className="md:col-span-5 flex flex-col justify-center">
                  <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/20 border-2 border-emerald-500/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                    {/* Flag Ribbon */}
                    <div className="absolute top-0 right-0 flex h-1 w-16">
                      <div className="bg-[#FF9933] flex-1" />
                      <div className="bg-white flex-1" />
                      <div className="bg-[#138808] flex-1" />
                    </div>

                    <div className="flex justify-between items-start border-b border-slate-800 pb-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded font-mono font-extrabold text-[9px] leading-none">
                          IND
                        </div>
                        <div>
                          <h5 className="text-[9px] font-bold text-white tracking-wider uppercase font-mono leading-none">DIGITAL PASSPORT</h5>
                          <span className="text-[6px] text-slate-500 block font-mono uppercase mt-0.5">MIGRANT LABOUR AUTHORITY</span>
                        </div>
                      </div>
                      <span className="text-[7px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded font-mono uppercase font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" /> AADHAAR KYC VERIFIED
                      </span>
                    </div>

                    {/* QR Code Visual representation */}
                    <div className="flex flex-col items-center justify-center py-4 bg-slate-950/60 rounded-xl border border-slate-900 mb-3 space-y-3">
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-md">
                        {/* Custom Pure-CSS Grid QR Pattern */}
                        <div className="grid grid-cols-7 gap-1 w-32 h-32">
                          <div className="bg-slate-950"></div><div className="bg-slate-950"></div><div className="bg-slate-950"></div><div className="bg-slate-300"></div><div className="bg-slate-950"></div><div className="bg-slate-950"></div><div className="bg-slate-950"></div>
                          <div className="bg-slate-950"></div><div className="bg-slate-300"></div><div className="bg-slate-950"></div><div className="bg-slate-300"></div><div className="bg-slate-950"></div><div className="bg-slate-300"></div><div className="bg-slate-950"></div>
                          <div className="bg-slate-950"></div><div className="bg-slate-950"></div><div className="bg-slate-950"></div><div className="bg-slate-950"></div><div className="bg-slate-950"></div><div className="bg-slate-950"></div><div className="bg-slate-950"></div>
                          <div className="bg-slate-300"></div><div className="bg-slate-300"></div><div className="bg-slate-950"></div><div className="bg-slate-300"></div><div className="bg-slate-950"></div><div className="bg-slate-300"></div><div className="bg-slate-300"></div>
                          <div className="bg-slate-950"></div><div className="bg-slate-950"></div><div className="bg-slate-950"></div><div className="bg-slate-950"></div><div className="bg-slate-300"></div><div className="bg-slate-950"></div><div className="bg-slate-950"></div>
                          <div className="bg-slate-950"></div><div className="bg-slate-300"></div><div className="bg-slate-950"></div><div className="bg-slate-300"></div><div className="bg-slate-950"></div><div className="bg-slate-300"></div><div className="bg-slate-950"></div>
                          <div className="bg-slate-950"></div><div className="bg-slate-950"></div><div className="bg-slate-950"></div><div className="bg-slate-300"></div><div className="bg-slate-950"></div><div className="bg-slate-950"></div><div className="bg-slate-950"></div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest animate-pulse flex items-center gap-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping inline-block" /> QR AUTHENTICATION ACTIVE
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono text-center border-t border-slate-900 pt-2 flex justify-between">
                      <span>VERIFIED: 06 JULY 2026</span>
                      <span className="text-emerald-400 font-bold">SECURE ENCRYPTED QR</span>
                    </div>
                  </div>
                </div>

                {/* Metadata Details & Actions (Col 7) */}
                <div className="md:col-span-7 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                      <span className="text-[9px] text-slate-500 block uppercase">{lang === "hi" ? "पासपोर्ट आईडी" : "PASSPORT ID"}</span>
                      <span className="font-bold text-white block mt-0.5">LP-IND-391821-A</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                      <span className="text-[9px] text-slate-500 block uppercase">{lang === "hi" ? "कामगार का नाम" : "WORKER NAME"}</span>
                      <span className="font-bold text-white block mt-0.5">Hari Ram</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                      <span className="text-[9px] text-slate-500 block uppercase">{lang === "hi" ? "प्रमाणित पेशा" : "VERIFIED TRADES"}</span>
                      <span className="font-bold text-amber-500 block mt-0.5">Mason, Painter</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                      <span className="text-[9px] text-slate-500 block uppercase">{lang === "hi" ? "राज्य / जिला" : "STATE / DISTRICT"}</span>
                      <span className="font-bold text-slate-300 block mt-0.5">Gorakhpur, UP</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                      <span className="text-[9px] text-slate-500 block uppercase">{lang === "hi" ? "उपस्थिति विश्वसनीयता" : "ATTENDANCE RELIABILITY"}</span>
                      <span className="font-bold text-emerald-400 block mt-0.5">📊 99%</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                      <span className="text-[9px] text-slate-500 block uppercase">{lang === "hi" ? "ट्रस्ट स्कोर" : "TRUST SCORE"}</span>
                      <span className="font-bold text-emerald-400 block mt-0.5">🛡️ 98%</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                      <span className="text-[9px] text-slate-500 block uppercase">{lang === "hi" ? "कार्य इतिहास" : "WORK HISTORY"}</span>
                      <span className="font-bold text-white block mt-0.5">💼 156 Jobs</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                      <span className="text-[9px] text-slate-500 block uppercase">{lang === "hi" ? "विवाद मुक्त रिकॉर्ड" : "DISPUTE-FREE RECORD"}</span>
                      <span className="font-bold text-emerald-400 block mt-0.5">✓ 96.8%</span>
                    </div>
                  </div>

                  {/* Compliance Warning */}
                  <div className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-850 text-[10px] text-slate-500 text-left font-mono leading-snug">
                    🛡️ <strong>Demo Compliance Note:</strong> No real Aadhaar, banking, or government API is connected. This module demonstrates cryptographic passport-based verification workflow only.
                  </div>

                  {/* Actions Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPrompt16WorkerVerified(true);
                        handleVoiceSpeak("लेबर पासपोर्ट सफलतापूर्वक सत्यापित किया गया।", "Labour Passport authenticated successfully.");
                      }}
                      className="p-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl transition font-extrabold font-mono text-[11px] flex items-center justify-center gap-1 cursor-pointer min-h-[38px]"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{lang === "hi" ? "पासपोर्ट सत्यापित" : "Verify Passport"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPrompt16HistoryModal(true);
                        handleVoiceSpeak("सत्यापित कार्य इतिहास लोड हो रहा है।", "Verified work history logs retrieved.");
                      }}
                      className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition font-bold font-mono text-[11px] flex items-center justify-center gap-1 cursor-pointer min-h-[38px]"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-500" />
                      <span>{lang === "hi" ? "कार्य इतिहास" : "Work History"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPrompt16Downloaded(true);
                        setTimeout(() => setPrompt16Downloaded(false), 3000);
                        handleVoiceSpeak("श्रम पहचान डाउनलोड हो रही है।", "Downloading portable Labor ID card template.");
                      }}
                      className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition font-bold font-mono text-[11px] flex items-center justify-center gap-1 cursor-pointer min-h-[38px]"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-400" />
                      <span>{lang === "hi" ? "आईडी डाउनलोड" : "Download ID"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPrompt16Shared(true);
                        setTimeout(() => setPrompt16Shared(false), 3000);
                        handleVoiceSpeak("क्यूआर कोड सत्यापित लिंक कॉपी किया गया।", "Secure QR authentication link copied.");
                      }}
                      className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition font-bold font-mono text-[11px] flex items-center justify-center gap-1 cursor-pointer min-h-[38px]"
                    >
                      <Share2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>{lang === "hi" ? "क्यूआर साझा" : "Share QR"}</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* TAILORED JOB OPPORTUNITIES SECTION */}
            <div className="pt-4 border-t border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  {lang === "hi" ? "आपके कौशल के लिए अनुशंसित नौकरियां" : "Recommended Job Openings matching your Trades"}
                </h4>
                <span className="text-[10px] text-amber-500 font-mono font-bold uppercase bg-amber-500/15 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                  Gorakhpur Grid
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: "job-1", titleHi: "राजमिस्त्री की आवश्यकता", titleEn: "Masonry Support Work", contractor: "A. K. Builders", location: "Sahjanwa Housing Block", wage: "₹650 / Day", skill: "Mason" },
                  { id: "job-2", titleHi: "ट्रैक्टर चालक/मददगार", titleEn: "Welding & Repair Help", contractor: "Gorakhpur Industries", location: "Industrial Corridor Sector-4", wage: "₹850 / Day", skill: "Welder" },
                  { id: "job-3", titleHi: "सफाई कर्मचारी/मजदूर", titleEn: "Daily Plaster Helper", contractor: "Golghar Developers", location: "Golghar Commercial Plaza", wage: "₹550 / Day", skill: "Helper" }
                ].map((job) => {
                  const hasApplied = appliedJobs.includes(job.id);
                  return (
                    <div key={job.id} className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-850 hover:border-slate-800 transition flex flex-col justify-between space-y-3.5">
                      <div className="space-y-1.5 text-left">
                        <div className="flex justify-between items-start gap-2">
                          <h5 className="text-xs font-bold text-white">{lang === "hi" ? job.titleHi : job.titleEn}</h5>
                          <span className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-500 px-2 py-0.5 rounded font-mono uppercase font-bold shrink-0">
                            {job.skill}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono leading-none">{job.contractor}</p>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{job.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-900">
                        <span className="text-xs font-bold text-emerald-400 font-mono">{job.wage}</span>
                        <button
                          onClick={() => {
                            if (hasApplied) return;
                            setAppliedJobs([...appliedJobs, job.id]);
                            handleVoiceSpeak(
                              "आवेदन दर्ज किया गया। ठेकेदार को सूचना भेजी गई।",
                              "Job application submitted successfully. Contractor notified via SMS."
                            );
                          }}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                            hasApplied 
                              ? "bg-slate-900 border border-slate-800 text-emerald-400 cursor-default" 
                              : "bg-amber-500 hover:bg-amber-600 text-slate-950"
                          }`}
                        >
                          {hasApplied 
                            ? (lang === "hi" ? "आवेदन स्वीकृत ✓" : "Applied ✓") 
                            : (lang === "hi" ? "अभी आवेदन करें" : "Apply Now")}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI SKILL-TO-JOB MATCHING ENGINE */}
            <div id="ai-matching-engine-section" className="pt-6 border-t border-slate-800/80 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    {lang === "hi" ? "एआई कौशल-से-नौकरी मिलान इंजन" : "AI Skill-to-Job Matching Engine"}
                  </h4>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const primarySkill = regSelectedSkills.length > 0 ? regSelectedSkills[0] : "Mason";
                      const textHi = `एआई मिलान रिपोर्ट। आपके ${primarySkill} कौशल के आधार पर, ३ नजदीकी नौकरियों की सिफारिश की गई है। आपका औसत मिलान स्कोर ९३ प्रतिशत है।`;
                      const textEn = `AI Match Report. Based on your ${primarySkill} skills, 3 nearby jobs have been recommended. Your average match score is 93 percent.`;
                      handleVoiceSpeak(textHi, textEn);
                    }}
                    className="p-1.5 px-3 bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 rounded-xl border border-amber-500/30 transition cursor-pointer flex items-center gap-1.5 text-[10px] font-bold"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{lang === "hi" ? "एआई मैच रिपोर्ट सुनें" : "Listen to AI Match"}</span>
                  </button>

                  <span className="text-[9px] text-amber-400 font-mono font-bold uppercase bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-full">
                    AI Active Match (एआई सक्रिय मिलान)
                  </span>
                </div>
              </div>

              {/* JURY DEMO HIGHLIGHT */}
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-slate-950 p-4 rounded-2xl border border-amber-500/20 text-left">
                <div className="flex items-start gap-2.5">
                  <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] font-mono text-amber-500 uppercase tracking-wider font-bold block">
                      {lang === "hi" ? "जूरी डेमो हाइलाइट" : "Jury Demo Highlight"}
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed mt-1 font-sans">
                      {lang === "hi"
                        ? "“लेबरअड्डा नौकरी खोज घर्षण को कम करने, मजदूरी पारदर्शिता में सुधार करने और सत्यापित श्रमिकों को विश्वसनीय स्थानीय अवसरों से जोड़ने के लिए एआई-सहायता प्राप्त मिलान का उपयोग करता है।”"
                        : "“LabourAdda uses AI-assisted matching to reduce job search friction, improve wage transparency, and connect verified workers with trusted local opportunities.”"}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 AI RECOMMENDED JOBS CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    id: "aim-1",
                    titleEn: `${regSelectedSkills.length > 0 ? regSelectedSkills[0] : "Mason"} Specialist Work`,
                    titleHi: `विशेषज्ञ ${regSelectedSkills.length > 0 ? regSelectedSkills[0] : "राजमिस्त्री"} कार्य`,
                    employerEn: "L&T Infrastructure",
                    employerHi: "एलएंडटी इंफ्रास्ट्रक्चर",
                    locationEn: "Sahjanwa Industrial Area",
                    locationHi: "सहजनवा औद्योगिक क्षेत्र",
                    matchPercentage: 98,
                    tradeMatchHi: "पूर्ण मिलान (100%)",
                    tradeMatchEn: "Full Match (100%)",
                    wageEn: "₹850 / Day",
                    wageHi: "₹850 / प्रतिदिन",
                    wageMatchHi: "अपेक्षा से अधिक (+₹100)",
                    wageMatchEn: "Higher than expected (+₹100)",
                    distanceEn: "1.5 km away",
                    distanceHi: "1.5 किमी दूर",
                    distanceMatchHi: "बहुत नजदीक",
                    distanceMatchEn: "Very close",
                    trustScore: 99,
                    trustMatchHi: "उत्कृष्ट (99% ट्रस्ट)",
                    trustMatchEn: "Excellent (99% Trust)",
                    experienceReqEn: "3+ Years Required",
                    experienceReqHi: "3+ वर्ष अनुभव आवश्यक",
                    experienceMatchHi: "योग्य (अनुभव पर्याप्त है)",
                    experienceMatchEn: "Qualified",
                    reasons: {
                      skillAlignedHi: "कौशल मेल खाता है (Skill Aligned)",
                      skillAlignedEn: "Skill aligned",
                      wageHighHi: "मजदूरी अपेक्षा से बेहतर (+₹100/दिन)",
                      wageHighEn: "Wage higher than expected (+₹100)",
                      nearbyHi: "पास का स्थान (1.5 किमी दूर)",
                      nearbyEn: "Nearby location (1.5 km)",
                      verifiedHi: "सत्यापित नियोक्ता (99% स्कोर)",
                      verifiedEn: "Verified employer (99% Score)",
                      fastJoiningHi: "त्वरित जॉइनिंग उपलब्ध",
                      fastJoiningEn: "Fast joining available"
                    }
                  },
                  {
                    id: "aim-2",
                    titleEn: `Commercial ${regSelectedSkills.length > 0 ? regSelectedSkills[0] : "Mason"} Project`,
                    titleHi: `वाणिज्यिक ${regSelectedSkills.length > 0 ? regSelectedSkills[0] : "राजमिस्त्री"} परियोजना`,
                    employerEn: "Purvanchal Developers",
                    employerHi: "पूर्वांचल डेवलपर्स",
                    locationEn: "Golghar Complex, Gorakhpur",
                    locationHi: "गोलघर परिसर, गोरखपुर",
                    matchPercentage: 94,
                    tradeMatchHi: "पूर्ण मिलान (100%)",
                    tradeMatchEn: "Full Match (100%)",
                    wageEn: "₹780 / Day",
                    wageHi: "₹780 / प्रतिदिन",
                    wageMatchHi: "अपेक्षा के अनुकूल (+₹30)",
                    wageMatchEn: "Matches expectation (+₹30)",
                    distanceEn: "3.2 km away",
                    distanceHi: "3.2 किमी दूर",
                    distanceMatchHi: "मध्यम दूरी",
                    distanceMatchEn: "Moderate distance",
                    trustScore: 95,
                    trustMatchHi: "सत्यापित (95% ट्रस्ट)",
                    trustMatchEn: "Verified (95% Trust)",
                    experienceReqEn: "5+ Years Required",
                    experienceReqHi: "5+ वर्ष अनुभव आवश्यक",
                    experienceMatchHi: "योग्य (उत्कृष्ट मिलान)",
                    experienceMatchEn: "Qualified (Perfect Match)",
                    reasons: {
                      skillAlignedHi: "कौशल अनुकूल (Skill Aligned)",
                      skillAlignedEn: "Skill aligned",
                      wageHighHi: "प्रतिस्पर्धी दैनिक मजदूरी",
                      wageHighEn: "Competitive daily wage",
                      nearbyHi: "शहर के केंद्र में (3.2 किमी)",
                      nearbyEn: "In city center (3.2 km)",
                      verifiedHi: "सत्यापित नियोक्ता (Aadhaar Verified)",
                      verifiedEn: "Verified employer (Aadhaar Verified)",
                      fastJoiningHi: "सप्ताह के भीतर जॉइनिंग",
                      fastJoiningEn: "Fast joining available"
                    }
                  },
                  {
                    id: "aim-3",
                    titleEn: `Urgent Repair & Maintenance`,
                    titleHi: `त्वरित मरम्मत और रखरखाव`,
                    employerEn: "Gorakhpur Civic Hub",
                    employerHi: "गोरखपुर सिविक हब",
                    locationEn: "Medical College Road",
                    locationHi: "मेडिकल कॉलेज रोड",
                    matchPercentage: 88,
                    tradeMatchHi: "पूर्ण मिलान (100%)",
                    tradeMatchEn: "Full Match (100%)",
                    wageEn: "₹750 / Day",
                    wageHi: "₹750 / प्रतिदिन",
                    wageMatchHi: "अपेक्षा के अनुरूप (₹750)",
                    wageMatchEn: "Matches expectation (₹750)",
                    distanceEn: "4.8 km away",
                    distanceHi: "4.8 किमी दूर",
                    distanceMatchHi: "सुलभ दूरी",
                    distanceMatchEn: "Accessible distance",
                    trustScore: 92,
                    trustMatchHi: "भरोसेमंद (92% ट्रस्ट)",
                    trustMatchEn: "Trusted (92% Trust)",
                    experienceReqEn: "2+ Years Required",
                    experienceReqHi: "2+ वर्ष अनुभव आवश्यक",
                    experienceMatchHi: "अधिकतम योग्यता",
                    experienceMatchEn: "Overqualified",
                    reasons: {
                      skillAlignedHi: "सटीक कार्य मेल (Job Aligned)",
                      skillAlignedEn: "Job aligned",
                      wageHighHi: "मानक सरकारी दर मजदूरी",
                      wageHighEn: "Standard government rate wage",
                      nearbyHi: "कनेक्टेड मार्ग पर (4.8 किमी)",
                      nearbyEn: "On connected route (4.8 km)",
                      verifiedHi: "सत्यापित सरकारी ठेकेदार",
                      verifiedEn: "Verified govt contractor",
                      fastJoiningHi: "तत्काल आज ही शामिल हों",
                      fastJoiningEn: "Immediate joining available"
                    }
                  }
                ].map((job) => {
                  const hasApplied = appliedJobs.includes(job.id);
                  const isSaved = workerSavedJobsList.some(sj => sj.id === `sj-${job.id}`);
                  const isViewingTrust = viewingTrustJobId === job.id;

                  return (
                    <div
                      key={job.id}
                      className="bg-slate-950/90 p-5 rounded-2xl border-2 border-slate-850 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 text-left relative overflow-hidden group shadow-lg"
                    >
                      {/* Top Match Badge */}
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 font-mono text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl border-l border-b border-amber-500/20 shadow flex items-center gap-1">
                        <Sparkles className="w-3 h-3 animate-pulse" />
                        <span>{job.matchPercentage}% {lang === "hi" ? "मिलान" : "Match"}</span>
                      </div>

                      {/* Job Info */}
                      <div className="space-y-3 pt-2">
                        <div>
                          <span className="text-[9px] text-amber-500 font-mono uppercase tracking-widest block font-bold">
                            {lang === "hi" ? job.employerHi : job.employerEn}
                          </span>
                          <h5 className="text-sm font-extrabold text-white leading-snug mt-1">
                            {lang === "hi" ? job.titleHi : job.titleEn}
                          </h5>
                          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1 font-mono">
                            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>{lang === "hi" ? job.locationHi : job.locationEn} ({lang === "hi" ? job.distanceHi : job.distanceEn})</span>
                          </div>
                        </div>

                        {/* Five-Fold Score Parameters (Match breakdown) */}
                        <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                          <div className="flex justify-between items-center text-[10px] border-b border-slate-800/40 pb-1.5">
                            <span className="text-slate-500 uppercase">{lang === "hi" ? "कौशल्या मिलान / Trade Match:" : "Trade Match:"}</span>
                            <span className="text-white font-bold">{lang === "hi" ? job.tradeMatchHi : job.tradeMatchEn}</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] border-b border-slate-800/40 pb-1.5">
                            <span className="text-slate-500 uppercase">{lang === "hi" ? "मजदूरी मिलान / Wage Match:" : "Wage Match:"}</span>
                            <span className="text-emerald-400 font-bold">{lang === "hi" ? job.wageMatchHi : job.wageMatchEn}</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] border-b border-slate-800/40 pb-1.5">
                            <span className="text-slate-500 uppercase">{lang === "hi" ? "दूरी मिलान / Distance Match:" : "Distance Match:"}</span>
                            <span className="text-amber-400 font-bold">{lang === "hi" ? job.distanceMatchHi : job.distanceMatchEn}</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] border-b border-slate-800/40 pb-1.5">
                            <span className="text-slate-500 uppercase">{lang === "hi" ? "नियोक्ता रेटिंग / Trust Match:" : "Trust Match:"}</span>
                            <span className="text-teal-400 font-bold">{lang === "hi" ? job.trustMatchHi : job.trustMatchEn}</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-500 uppercase">{lang === "hi" ? "अनुभव मिलान / Experience Match:" : "Experience Match:"}</span>
                            <span className="text-blue-400 font-bold">{lang === "hi" ? job.experienceMatchHi : job.experienceMatchEn}</span>
                          </div>
                        </div>

                        {/* Explainable Matching Reasons Block */}
                        <div className="space-y-1 bg-slate-900/30 p-2.5 rounded-xl border border-slate-800/50">
                          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block pb-0.5">
                            {lang === "hi" ? "एआई मिलान के कारण / Matching Analysis:" : "AI Matching Analysis:"}
                          </span>
                          <div className="grid grid-cols-1 gap-1 text-[10px]">
                            <div className="flex items-center gap-1.5 text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              <span>{lang === "hi" ? job.reasons.skillAlignedHi : job.reasons.skillAlignedEn}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>{lang === "hi" ? job.reasons.wageHighHi : job.reasons.wageHighEn}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                              <span>{lang === "hi" ? job.reasons.nearbyHi : job.reasons.nearbyEn}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                              <span>{lang === "hi" ? job.reasons.verifiedHi : job.reasons.verifiedEn}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                              <span>{lang === "hi" ? job.reasons.fastJoiningHi : job.reasons.fastJoiningEn}</span>
                            </div>
                          </div>
                        </div>

                        {/* Optional Expanded Trust Screen */}
                        {isViewingTrust && (
                          <div className="bg-slate-900/90 p-3 rounded-xl border border-teal-500/30 text-[11px] space-y-2 animate-fadeIn font-mono">
                            <div className="flex items-center gap-1 text-teal-400 font-bold border-b border-slate-800 pb-1 uppercase text-[9px]">
                              <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
                              <span>{lang === "hi" ? "सत्यापित नियोक्ता प्रोफ़ाइल" : "Verified Employer Profile"}</span>
                            </div>
                            <div className="space-y-1 text-slate-300">
                              <div className="flex justify-between">
                                <span>Aadhaar/GSTIN Status:</span>
                                <span className="text-emerald-400 font-bold">100% VERIFIED</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Timely Wage Payout Rate:</span>
                                <span className="text-emerald-400 font-bold">98.7% (Excellent)</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Site Safety Compliance:</span>
                                <span className="text-amber-400 font-bold">Grade A (Certified)</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Worker Retention Index:</span>
                                <span className="text-teal-400 font-bold">4.9 / 5.0 Rating</span>
                              </div>
                            </div>
                            <p className="text-[9px] text-slate-500 italic leading-snug pt-1">
                              {lang === "hi" 
                                ? "यह डेटा राष्ट्रीय लेबर इंटेलिजेंस ग्रिड द्वारा सुरक्षित है।" 
                                : "Employer verification tracked and synced by National Labour Intelligence Grid."}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons row */}
                      <div className="pt-3 border-t border-slate-900 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-emerald-400 font-mono">
                            {lang === "hi" ? job.wageHi : job.wageEn}
                          </span>
                          
                          <div className="flex items-center gap-1.5">
                            {/* Save Opportunity Button */}
                            <button
                              type="button"
                              onClick={() => {
                                const isAlreadySaved = workerSavedJobsList.some(sj => sj.id === `sj-${job.id}`);
                                if (!isAlreadySaved) {
                                  const newSaved = {
                                    id: `sj-${job.id}`,
                                    title: lang === "hi" ? job.titleHi : job.titleEn,
                                    contractor: lang === "hi" ? job.employerHi : job.employerEn,
                                    location: lang === "hi" ? job.locationHi : job.locationEn,
                                    wage: lang === "hi" ? job.wageHi : job.wageEn
                                  };
                                  setWorkerSavedJobsList([newSaved, ...workerSavedJobsList]);
                                  handleVoiceSpeak(
                                    "नौकरी सुरक्षित कर ली गई है। आप इसे सहेजे गए कार्यों में देख सकते हैं।",
                                    "Job saved successfully. You can view it in your saved opportunities."
                                  );
                                  alert(lang === "hi" ? "नौकरी सहेजी गई!" : "Job saved successfully!");
                                } else {
                                  alert(lang === "hi" ? "नौकरी पहले से ही सहेजी गई है।" : "Job is already saved.");
                                }
                              }}
                              className={`p-1.5 rounded-lg border text-xs transition cursor-pointer flex items-center justify-center ${
                                isSaved
                                  ? "bg-slate-900 border-slate-850 text-amber-500 font-bold"
                                  : "bg-slate-950 hover:bg-slate-900 border-slate-850 text-slate-400 hover:text-white"
                              }`}
                              title={lang === "hi" ? "नौकरी सहेजें" : "Save Job"}
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                              <span className="text-[9px] font-bold ml-1">{isSaved ? (lang === "hi" ? "सहेजी गई" : "Saved") : (lang === "hi" ? "सहेजें" : "Save")}</span>
                            </button>

                            {/* View Employer Trust */}
                            <button
                              type="button"
                              onClick={() => {
                                setViewingTrustJobId(isViewingTrust ? null : job.id);
                                handleVoiceSpeak(
                                  `विवरण। ${job.employerHi} का ट्रस्ट स्कोर ${job.trustScore} प्रतिशत है। इनका समय पर भुगतान रिकॉर्ड उत्कृष्ट है।`,
                                  `Details. ${job.employerEn} has a Trust Score of ${job.trustScore} percent with an excellent payout history.`
                                );
                              }}
                              className={`p-1.5 rounded-lg border text-xs transition cursor-pointer flex items-center justify-center gap-1 ${
                                isViewingTrust
                                  ? "bg-teal-500/15 border-teal-500 text-teal-400"
                                  : "bg-slate-950 hover:bg-slate-900 border-slate-850 text-slate-400 hover:text-white"
                              }`}
                            >
                              <Shield className="w-3.5 h-3.5" />
                              <span className="text-[9px] font-bold">{lang === "hi" ? "ट्रस्ट देखें" : "Trust"}</span>
                            </button>
                          </div>
                        </div>

                        {/* Apply Now Button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (hasApplied) return;
                            setAppliedJobs([...appliedJobs, job.id]);
                            const newApp = {
                              id: `aj-aim-${Date.now()}`,
                              title: lang === "hi" ? job.titleHi : job.titleEn,
                              contractor: lang === "hi" ? job.employerHi : job.employerEn,
                              location: lang === "hi" ? job.locationHi : job.locationEn,
                              status: "Applied",
                              date: "Just now"
                            };
                            setWorkerAppliedJobsList([newApp, ...workerAppliedJobsList]);
                            handleVoiceSpeak(
                              "आवेदन दर्ज किया गया। ठेकेदार को सूचना भेजी गई।",
                              "Job application submitted successfully. Contractor notified via SMS."
                            );
                            alert(lang === "hi" ? "आवेदन सफलतापूर्वक भेजा गया! ठेकेदार को सूचित कर दिया गया है।" : "Application submitted! The contractor has been notified.");
                          }}
                          className={`w-full py-2 rounded-xl text-xs font-mono uppercase tracking-widest transition cursor-pointer flex items-center justify-center gap-1 ${
                            hasApplied 
                              ? "bg-slate-900 border border-slate-800 text-emerald-400 font-bold" 
                              : "bg-amber-500 hover:bg-amber-600 text-slate-950 font-black"
                          }`}
                        >
                          {hasApplied 
                            ? (lang === "hi" ? "आवेदन स्वीकृत ✓" : "Applied ✓") 
                            : (lang === "hi" ? "अभी आवेदन करें" : "Apply Now")}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* WORKER INVITATIONS & APPLICATIONS MANAGEMENT (PROMPT-09F) */}
            <div className="pt-6 border-t border-slate-800/80 space-y-5">
              <div className="border-b border-slate-900 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    {lang === "hi" ? "कार्य निमंत्रण और आवेदन इतिहास" : "Your Job Invitations & Application History"}
                  </h4>
                </div>
                <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded font-mono uppercase font-bold">
                  Verified Labor Grid Connection
                </span>
              </div>

              {/* Grid: Invitations and Application logs */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Active Invitations from Contractors (Col 7) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">{lang === "hi" ? "प्राप्त ठेकेदार निमंत्रण" : "Incoming Contractor Invitations"}</span>
                    <span className="text-[9px] font-mono text-slate-500 uppercase">{workerInvitations.filter(i => i.status === "PENDING").length} Pending Offers</span>
                  </div>

                  {workerInvitations.filter(i => i.status === "PENDING").length === 0 ? (
                    <div className="bg-slate-900/30 p-8 rounded-2xl border border-slate-850 text-center font-mono text-xs text-slate-500">
                      {lang === "hi" ? "कोई सक्रिय नौकरी निमंत्रण नहीं मिला।" : "No pending contractor invitations active at this moment."}
                    </div>
                  ) : (
                    workerInvitations.filter(i => i.status === "PENDING").map((inv) => (
                      <div key={inv.id} className="bg-slate-950 p-4.5 rounded-2xl border border-slate-850 text-left space-y-3 relative overflow-hidden group font-sans">
                        <div className="absolute top-0 right-0 w-1.5 h-full bg-amber-500/20 group-hover:bg-amber-500 transition" />
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="text-[9px] text-amber-500 font-mono uppercase tracking-wider block font-bold">{inv.company}</span>
                            <h5 className="text-xs font-extrabold text-white mt-1 leading-tight">{lang === "hi" ? `राजमिस्त्री कार्य / ${inv.trade}` : `${inv.trade} Requirement`}</h5>
                            <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">Contractor: {inv.contractor} | Dist: {inv.distance}</span>
                          </div>
                          <span className="text-xs font-black text-emerald-400 font-mono shrink-0">{inv.expectedWage}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 bg-slate-900/60 p-2 rounded text-[10px] font-mono text-slate-400">
                          <div>
                            <span className="text-slate-500 block text-[8px] uppercase">Duration:</span>
                            <span className="font-bold text-white">{inv.duration}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[8px] uppercase">Trust Score:</span>
                            <span className="font-bold text-emerald-400">{inv.trustScore}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[8px] uppercase">Status:</span>
                            <span className="font-bold text-amber-500 uppercase">{inv.status}</span>
                          </div>
                        </div>

                        {/* Invite Actions */}
                        <div className="flex gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = workerInvitations.map(x => x.id === inv.id ? { ...x, status: "ACCEPTED" as const } : x);
                              setWorkerInvitations(updated);
                              
                              // Add to applied/accepted list
                              const acceptedJob = {
                                id: `aj-${Date.now()}`,
                                title: `${inv.trade} Project`,
                                contractor: inv.company,
                                location: inv.location || "Gorakhpur Bypass",
                                status: "Accepted",
                                date: "Just now"
                              };
                              setWorkerAppliedJobsList([acceptedJob, ...workerAppliedJobsList]);
                              
                              handleVoiceSpeak(
                                "बधाई हो, आपने कार्य निमंत्रण स्वीकार कर लिया है। आपका डिजिटल पासपोर्ट अद्यतन हो गया है और एक नया काम का आदेश जारी किया गया है।",
                                "Congratulations, you have accepted the work invitation. Your portable labor passport is now active on this job order."
                              );
                              alert("बधाई हो! कार्य निमंत्रण स्वीकार किया गया। डिजिटल काम का आदेश आपके राष्ट्रीय श्रम पासपोर्ट से लिंक हो चुका है। / Work invitation accepted.");
                            }}
                            className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl text-[10px] font-mono uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{lang === "hi" ? "स्वीकार करें" : "Accept Offer"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const updated = workerInvitations.map(x => x.id === inv.id ? { ...x, status: "REJECTED" as const } : x);
                              setWorkerInvitations(updated);
                              handleVoiceSpeak("निमंत्रण अस्वीकार कर दिया गया है।", "Invitation declined.");
                            }}
                            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-xl border border-slate-800 text-[10px] font-mono uppercase tracking-wider transition cursor-pointer"
                          >
                            <span>{lang === "hi" ? "अस्वीकार" : "Decline"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => alert(`चैट संपर्क शुरू हो रहा है... / Connecting with Contractor ${inv.contractor}...`)}
                            className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-xl border border-slate-800 text-[10px] font-mono transition cursor-pointer"
                          >
                            Chat
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Applications and Saved Pipelines (Col 5) */}
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-[11px] font-mono text-slate-400 font-bold uppercase block text-left">{lang === "hi" ? "आवेदन इतिहास और सहेजे गए कार्य" : "Application Pipeline & History"}</span>
                  
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-3">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block text-left">Active Job Applications</span>
                    <div className="space-y-2 text-left">
                      {workerAppliedJobsList.map((aj) => (
                        <div key={aj.id} className="bg-slate-900 p-3 rounded-xl border border-slate-850 flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-white block">{aj.title}</span>
                            <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{aj.contractor} | {aj.location}</span>
                          </div>
                          <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                            aj.status === "Applied" || aj.status === "Accepted" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                            aj.status === "Shortlisted" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                            "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}>
                            {aj.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-3 text-left">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Saved Opportunities</span>
                    <div className="space-y-2">
                      {workerSavedJobsList.map((sj) => (
                        <div key={sj.id} className="bg-slate-900 p-3 rounded-xl border border-slate-850 flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-white block">{sj.title}</span>
                            <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{sj.contractor} | {sj.location}</span>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className="text-[10px] font-bold text-emerald-400 font-mono">{sj.wage}</span>
                            <button
                              type="button"
                              onClick={() => {
                                alert("आवेदन किया गया! / Application submitted.");
                                const newApp = { id: `aj-${Date.now()}`, title: sj.title, contractor: sj.contractor, location: sj.location, status: "Applied", date: "Just now" };
                                setWorkerAppliedJobsList([newApp, ...workerAppliedJobsList]);
                                setWorkerSavedJobsList(workerSavedJobsList.filter(x => x.id !== sj.id));
                              }}
                              className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-bold rounded"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PROMPT-14: Today's Settlement Receipt Section */}
                  <div className="bg-slate-950 p-5 rounded-2xl border-2 border-amber-500/20 space-y-4 text-left shadow-lg relative overflow-hidden">
                    {/* Glowing Accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                    
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[9px] text-emerald-400 font-mono font-bold tracking-widest uppercase block">
                          {lang === "hi" ? "दैनिक सुरक्षा ऑडिट" : "WAGE SECURITY AUDIT"}
                        </span>
                        <h4 className="text-sm font-bold text-white font-mono mt-0.5">
                          {lang === "hi" ? "आज की सेटलमेंट रसीद" : "Today's Settlement Receipt"}
                        </h4>
                      </div>
                      <span className="text-[8px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2 py-1 rounded font-mono uppercase font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        {lang === "hi" ? "सुरक्षित" : "Wage Protected"}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-900">
                        <span className="text-slate-400">
                          {lang === "hi" ? "कामगार दैनिक मजदूरी" : "Worker Daily Wage"}
                        </span>
                        <span className="font-mono text-white font-semibold">₹{prompt14WorkerSettlement.wageEarned}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-900">
                        <span className="text-slate-400">
                          {lang === "hi" ? "प्लेटफॉर्म शुल्क (ठेकेदार द्वारा देय)" : "Platform Fee (Paid by Contractor)"}
                        </span>
                        <span className="font-mono text-amber-500 font-semibold">+₹{prompt14WorkerSettlement.platformFee}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-900 bg-slate-900/40 px-2 rounded-lg">
                        <span className="text-emerald-400 font-medium">
                          {lang === "hi" ? "कामगार को प्राप्त राशि" : "Worker Received Amount"}
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">₹{prompt14WorkerSettlement.wageEarned}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-900">
                        <span className="text-slate-400">
                          {lang === "hi" ? "लेबरअड्डा मंच की कमाई" : "LabourAdda Platform Earnings"}
                        </span>
                        <span className="font-mono text-slate-300">₹{prompt14WorkerSettlement.platformFee}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-500 text-[10px]">
                          {lang === "hi" ? "रसीद आईडी / समय" : "Settlement ID / Date"}
                        </span>
                        <span className="font-mono text-slate-400 text-[10px] text-right">
                          {prompt14WorkerSettlement.receiptId}<br/>
                          <span className="text-[8px] opacity-70">{prompt14WorkerSettlement.date}</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-900">
                        <span className="text-slate-500 text-[10px]">
                          {lang === "hi" ? "भुगतान विधि" : "Payment Mode"}
                        </span>
                        <span className="font-mono text-emerald-400 text-[10px] font-bold uppercase">{prompt14WorkerSettlement.paymentMode}</span>
                      </div>
                    </div>

                    {/* Trust Impact badge */}
                    <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between text-[11px]">
                      <span className="text-slate-300 font-medium flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        {lang === "hi" ? "ट्रस्ट स्कोर प्रभाव:" : "Trust Score Impact:"}
                      </span>
                      <span className="text-emerald-400 font-mono font-bold">
                        +{prompt14WorkerSettlement.trustImpact} {lang === "hi" ? "विश्वसनीयता अंक" : "Reliability Points"}
                      </span>
                    </div>

                    <p className="text-[10px] text-amber-400/80 italic leading-snug">
                      * {lang === "hi"
                        ? "कामगार की मजदूरी से कोई कटौती नहीं की जाती है। लेबरअड्डा द्वारा प्रमाणित ₹900 कामगार को बिना किसी कमीशन के मिलते हैं।"
                        : "Worker wage is never reduced. Platform micro-fee is paid transparently by contractor after job completion."}
                    </p>

                    {/* Safety / Compliance warning banner */}
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[9px] text-slate-500 leading-normal">
                      <p>
                        <strong>{lang === "hi" ? "डेमो अनुपालन सूचना:" : "Demo Compliance Note:"}</strong>{" "}
                        {lang === "hi"
                          ? "यह एक सिम्युलेटेड पेमेंट लेयर है। कोई वास्तविक पैसा संसाधित नहीं किया जाता है और कोई वित्तीय एपीआई एकीकरण नहीं है।"
                          : "This is a simulated demo payment layer. No real money is processed. No payment credentials required."}
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

        {/* EMPLOYER DIGITAL DASHBOARD (COHESIVE FULLY FUNCTIONAL VIEW) */}
        {loggedInUser && loggedInUser.role !== "worker" && loggedInUser.role !== "contractor" && (
          <div id="employer-dashboard-panel" className="mb-10 space-y-6 animate-fadeIn bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {lang === "hi" ? "राष्ट्रीय नियोक्ता डिजिटल डैशबोर्ड" : "National Employer Digital Dashboard"}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === "hi" 
                    ? "सत्यापित राष्ट्रीय श्रम आवंटन नेटवर्क। आपका डिजिटल नियोक्ता पासपोर्ट सक्रिय है।" 
                    : "Verified National Labor Grid. Your portable Employer Passport is active and synchronized."}
                </p>
              </div>

              {/* Speech Assist Trigger */}
              <button
                type="button"
                onClick={() => handleVoiceSpeak(
                  `विवरण। नमस्कार ${loggedInUser.name}। आपका नियोक्ता डिजिटल क्रेडेंशियल सक्रिय है। आपके पास वर्तमान में ${employerJobs.length} सक्रिय नौकरियां और ${hiredWorkers.length} कामगार सूची में हैं। आपका ट्रस्ट स्कोर ${empTrustScore} प्रतिशत है।`,
                  `Welcome back ${loggedInUser.name}. Your employer credential is active with ${employerJobs.length} active jobs and ${hiredWorkers.length} hired workers. Your Trust Score is ${empTrustScore} percent.`
                )}
                className="self-start md:self-center p-2 px-3 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 rounded-xl border border-amber-500/25 transition cursor-pointer flex items-center gap-2 text-xs font-semibold"
              >
                <Volume2 className="w-4 h-4" />
                <span>{lang === "hi" ? "डैशबोर्ड रिपोर्ट सुनें" : "Listen to Status"}</span>
              </button>
            </div>

            {/* SUMMARY METRICS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-950/50 p-4.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Active Jobs / सक्रिय मांग</span>
                  <span className="text-2xl font-extrabold text-white mt-1 block font-mono">{employerJobs.length}</span>
                </div>
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-950/50 p-4.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Hired Workers / कामगार</span>
                  <span className="text-2xl font-extrabold text-white mt-1 block font-mono">{hiredWorkers.length}</span>
                </div>
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-950/50 p-4.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Trust Score / विश्वसनीयता</span>
                  <span className="text-2xl font-extrabold text-emerald-400 mt-1 block font-mono">{empTrustScore}%</span>
                </div>
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-950/50 p-4.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Passport ID / क्रेडेंशियल</span>
                  <span className="text-xs font-bold text-slate-300 mt-2 block font-mono truncate max-w-[130px]">
                    {empPassportId || "EMP-IND-583921-N"}
                  </span>
                </div>
                <div className="p-3 bg-slate-900 text-slate-400 rounded-xl font-mono text-[9px] font-bold">
                  EMP
                </div>
              </div>
            </div>

            {/* TWO-COLUMN LAYOUT: MANAGE DEMANDS & WORKER LIST */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Post Job & Live Postings */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Active Hiring Toggle & Post Job Button */}
                <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-3.5 h-3.5 rounded-full ${empHiringStatusActive ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                    <div className="text-left">
                      <span className="text-[10px] text-slate-500 font-mono block uppercase">HIRING CHANNEL STATUS</span>
                      <span className="text-xs font-bold text-white">
                        {empHiringStatusActive 
                          ? (lang === "hi" ? "सक्रिय भर्ती (नजदीकी कामगारों को दृश्यमान)" : "Active Hiring (Visible on Grid)")
                          : (lang === "hi" ? "भर्ती निष्क्रिय (ऑफलाइन)" : "Hiring Channel Paused")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setEmpHiringStatusActive(!empHiringStatusActive);
                        handleVoiceSpeak(
                          empHiringStatusActive ? "भर्ती बंद की गई।" : "भर्ती चैनल सक्रिय किया गया।",
                          empHiringStatusActive ? "Hiring channel paused." : "Hiring channel activated."
                        );
                      }}
                      className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-850 border border-slate-850 transition cursor-pointer"
                    >
                      {empHiringStatusActive ? (lang === "hi" ? "रोकें" : "Pause") : (lang === "hi" ? "शुरू करें" : "Resume")}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setIsPostingNewJob(!isPostingNewJob)}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition flex items-center justify-center gap-1 cursor-pointer font-sans"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === "hi" ? "नई नौकरी डालें" : "Post New Job"}</span>
                    </button>
                  </div>
                </div>

                {/* Inline Post Job Form Panel */}
                {isPostingNewJob && (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newJobTitleEn || !newJobLocation) {
                        alert("कृपया सभी आवश्यक फ़ील्ड भरें। / Please fill in all required fields.");
                        return;
                      }
                      
                      const tradesMap: Record<string, { hi: string, en: string }> = {
                        "Mason": { hi: "राजमिस्त्री", en: "Mason" },
                        "Painter": { hi: "पेंटर", en: "Painter" },
                        "Carpenter": { hi: "बढ़ई", en: "Carpenter" },
                        "Electrician": { hi: "बिजली मिस्त्री", en: "Electrician" },
                        "Plumber": { hi: "प्लंबर", en: "Plumber" },
                        "Helper": { hi: "सहायक / हेल्पर", en: "Helper" },
                        "Welder": { hi: "वेल्डर", en: "Welder" },
                        "Agricultural": { hi: "कृषि मजदूर", en: "Agricultural" }
                      };

                      const mappedTrade = tradesMap[newJobTradeEn] || { hi: newJobTradeEn, en: newJobTradeEn };

                      const newJobObj = {
                        id: `ej-${Date.now()}`,
                        titleHi: newJobTitleHi || `${newJobTitleEn} (हिंदी अनुवाद)`,
                        titleEn: newJobTitleEn,
                        tradeHi: mappedTrade.hi,
                        tradeEn: mappedTrade.en,
                        wage: `₹${newJobWage || "650"} / Day`,
                        location: newJobLocation,
                        status: "Active",
                        applicantsCount: 0
                      };

                      setEmployerJobs([newJobObj, ...employerJobs]);
                      setIsPostingNewJob(false);
                      setNewJobTitleHi("");
                      setNewJobTitleEn("");
                      setNewJobLocation("");
                      
                      handleVoiceSpeak(
                        `बधाई हो! आपकी नई नौकरी "${newJobTitleEn}" सफलतापूर्वक प्रकाशित कर दी गई है।`,
                        `Success! Your job posting for "${newJobTitleEn}" is now live on the National Grid.`
                      );
                    }}
                    className="bg-slate-950/80 p-5 rounded-2xl border border-amber-500/20 space-y-4 animate-fadeIn"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                      <span className="text-[10px] text-amber-500 font-mono uppercase tracking-wider font-bold">
                        {lang === "hi" ? "नई नौकरी पोस्टिंग फॉर्म" : "Post Live Labour Requirement"}
                      </span>
                      <button type="button" onClick={() => setIsPostingNewJob(false)} className="text-slate-500 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">Job Title (English) *</span>
                          <input
                            type="text"
                            placeholder="Boundary Wall Plastering"
                            required
                            value={newJobTitleEn}
                            onChange={(e) => setNewJobTitleEn(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-850 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">नौकरी का शीर्षक (Hindi)</span>
                          <input
                            type="text"
                            placeholder="दीवार का प्लास्टर कार्य"
                            value={newJobTitleHi}
                            onChange={(e) => setNewJobTitleHi(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-850 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">Preferred Trade Category *</span>
                          <select
                            value={newJobTradeEn}
                            onChange={(e) => setNewJobTradeEn(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-850 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none h-10"
                          >
                            <option value="Mason">Mason / राजमिस्त्री</option>
                            <option value="Painter">Painter / पेंटर</option>
                            <option value="Carpenter">Carpenter / बढ़ई</option>
                            <option value="Electrician">Electrician / बिजली मिस्त्री</option>
                            <option value="Plumber">Plumber / प्लंबर</option>
                            <option value="Helper">Helper / सहायक</option>
                            <option value="Welder">Welder / वेल्डर</option>
                            <option value="Agricultural">Agricultural / कृषि</option>
                          </select>
                        </label>
                      </div>

                      <div>
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">Expected Daily Wage (₹) *</span>
                          <input
                            type="number"
                            placeholder="650"
                            required
                            value={newJobWage}
                            onChange={(e) => setNewJobWage(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-850 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none font-mono"
                          />
                        </label>
                      </div>

                      <div className="col-span-1 sm:col-span-2">
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">Work Site Location (GIDA/Gorakhpur etc) *</span>
                          <input
                            type="text"
                            placeholder={empAddress || "Sector 5, GIDA, Gorakhpur"}
                            required
                            value={newJobLocation}
                            onChange={(e) => setNewJobLocation(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-850 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none"
                          />
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full min-h-[44px] bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold flex items-center justify-center text-xs transition cursor-pointer mt-2"
                    >
                      {lang === "hi" ? "राष्ट्रीय ग्रिड पर प्रकाशित करें" : "Publish to National Labour Grid"}
                    </button>
                  </form>
                )}

                {/* Job Postings Directory */}
                <div className="space-y-3.5 text-left">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    {lang === "hi" ? "आपके सक्रिय श्रम आवश्यकताएँ" : "Your Active Job Postings"}
                  </h4>

                  {employerJobs.length === 0 ? (
                    <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-850 text-center text-xs text-slate-500 font-mono">
                      {lang === "hi" ? "कोई सक्रिय नौकरी पोस्ट नहीं मिला।" : "No active job listings. Post a job to start receiving matching worker alerts."}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {employerJobs.map((job) => (
                        <div key={job.id} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-850 flex flex-col justify-between space-y-4">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <h5 className="text-xs font-bold text-white truncate max-w-[170px]">
                                {lang === "hi" ? job.titleHi : job.titleEn}
                              </h5>
                              <span className="text-[9px] bg-amber-500/15 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold shrink-0">
                                {lang === "hi" ? job.tradeHi : job.tradeEn}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{job.location}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2.5 border-t border-slate-900 text-xs">
                            <div className="text-left font-mono">
                              <span className="text-[9px] text-slate-500 block">DAILY WAGE RATE</span>
                              <span className="font-bold text-emerald-400">{job.wage}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-400 font-mono">
                                {job.applicantsCount} {lang === "hi" ? "आवेदक" : "Applicants"}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setEmployerJobs(employerJobs.filter(j => j.id !== job.id));
                                  handleVoiceSpeak(
                                    `नौकरी पोस्ट हटा दी गई।`,
                                    `Job posting deleted successfully.`
                                  );
                                }}
                                className="p-1 px-2 hover:bg-red-500/10 text-slate-500 hover:text-red-400 border border-slate-800 rounded-lg text-[9px] font-mono transition cursor-pointer"
                              >
                                {lang === "hi" ? "हटाएं" : "Archive"}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Hired/Saved Workers Directory */}
              <div className="lg:col-span-5 space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    {lang === "hi" ? "सत्यापित कर्मचारी सूची" : "Verified Worker Directory"}
                  </h4>
                  <span className="text-[9px] bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold">
                    SECURED
                  </span>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3.5">
                  <div className="text-[10px] text-slate-500 font-mono uppercase border-b border-slate-900 pb-2">
                    DISPATCH LIST ({hiredWorkers.length} Active Workers)
                  </div>

                  <div className="space-y-3">
                    {hiredWorkers.map((worker) => (
                      <div key={worker.id} className="bg-slate-950 p-3 rounded-xl border border-slate-850 hover:border-slate-800 transition flex items-center justify-between gap-3 text-xs">
                        <div className="text-left space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white">{worker.name}</span>
                            <span className="text-[9px] font-mono text-slate-400">({worker.passportId})</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-[10px]">
                            <span className="text-amber-500 font-mono uppercase text-[9px]">{lang === "hi" ? worker.tradeHi : worker.tradeEn}</span>
                            <span className="text-slate-600 font-mono">|</span>
                            <span className="text-emerald-400 font-mono uppercase text-[9px]">● {worker.status}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            handleVoiceSpeak(
                              `${worker.name} को कॉल की जा रही है। उनका मोबाइल नंबर है ${worker.phone}।`,
                              `Calling ${worker.name} at number ${worker.phone}.`
                            );
                            alert(`कॉलिंग ${worker.name}: +91 ${worker.phone} / Initializing direct trust-call...`);
                          }}
                          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-[10px] transition cursor-pointer shrink-0 font-mono uppercase"
                        >
                          {lang === "hi" ? "कॉल करें" : "Direct Call"}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>ZERO-COMMISSION DIRECT NETWORK</span>
                    <span className="text-emerald-400">100% SECURE</span>
                  </div>
                </div>

                {/* Matchmaker Search Widget */}
                <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-4.5 rounded-2xl border border-slate-800 text-left space-y-3.5">
                  <div>
                    <span className="text-[9px] text-amber-500 font-mono uppercase tracking-widest block font-bold">GORAKHPUR CORRIDOR DIRECT MATCHMAKER</span>
                    <p className="text-xs text-slate-400 mt-1 leading-normal">
                      {lang === "hi" ? "तत्काल कामगारों की आवश्यकता है? कौशल के अनुसार खोजें:" : "Need on-demand labor instantly? Select skill block for active matches:"}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {["Mason", "Painter", "Helper"].map((mSkill) => (
                      <button
                        type="button"
                        key={mSkill}
                        onClick={() => {
                          setSearchQuery(mSkill);
                          handleVoiceSpeak(
                            `गोरखपुर ग्रिड पर उपलब्ध ${mSkill}ों की खोज की जा रही है।`,
                            `Searching active ${mSkill}s in Gorakhpur Central Corridor.`
                          );
                        }}
                        className="p-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[10px] font-mono rounded-lg transition hover:text-white cursor-pointer"
                      >
                        Find {mSkill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* CONTRACTOR DIGITAL DASHBOARD (COHESIVE FULLY FUNCTIONAL VIEW) */}
        {loggedInUser && loggedInUser.role === "contractor" && (
          <div id="contractor-dashboard-panel" className="mb-10 space-y-6 animate-fadeIn bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
            {/* Header with voice and status */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {lang === "hi" ? "राष्ट्रीय ठेकेदार डिजिटल डैशबोर्ड और प्रबंधन प्रणाली" : "National Contractor Digital Dashboard & Workforce Management"}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === "hi" 
                    ? "भारत का डिजिटल श्रम अवसंरचना portal - अधिकृत ठेकेदार कार्यक्षेत्र।" 
                    : "Government of India Portal - Authorized Contractor Control Desk."}
                </p>
              </div>

              {/* Speech Assist Trigger */}
              <button
                type="button"
                onClick={() => handleVoiceSpeak(
                  `नमस्कार ${loggedInUser.name}। आपका राष्ट्रीय कांट्रेक्टर डैशबोर्ड सक्रिय है। आपके ४२ कामगार अभी सक्रिय हैं।`,
                  `Welcome ${loggedInUser.name}. Your National Contractor Dashboard is active. You have 42 active workers today.`
                )}
                className="self-start md:self-center p-2 px-3 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 rounded-xl border border-amber-500/25 transition cursor-pointer flex items-center gap-2 text-xs font-semibold"
              >
                <Volume2 className="w-4 h-4" />
                <span>{lang === "hi" ? "डैशबोर्ड रिपोर्ट सुनें" : "Listen to Workspace"}</span>
              </button>
            </div>

            {/* BENTO GRID ROW 1: PROFILE (Col 4) & LIVE WORKFORCE OVERVIEW (Col 8) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* SECTION 1: Contractor Profile (Col 4) */}
              <div className="lg:col-span-4 bg-slate-950/40 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 relative overflow-hidden">
                {/* Flag Ribbon */}
                <div className="absolute top-0 right-0 flex h-1 w-16">
                  <div className="bg-[#FF9933] flex-1" />
                  <div className="bg-white flex-1" />
                  <div className="bg-[#138808] flex-1" />
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-900">
                    <div className="bg-amber-500/10 text-amber-500 p-2 rounded-xl border border-amber-500/20">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-mono">{loggedInUser.name}</h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-0.5">
                        {regCompany || "Prasad Labour Supplies"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span className="text-slate-500">{lang === "hi" ? "श्रेणी" : "Category"}:</span>
                      <span className="font-bold text-slate-300 font-mono">{regCategory || "Civil & Manpower"}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span className="text-slate-500">{lang === "hi" ? "सत्यापन स्थिति" : "Verification"}:</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {lang === "hi" ? "सत्यापित" : "Verified"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span className="text-slate-500">Contractor Passport ID:</span>
                      <span className="font-mono text-white text-[10px] font-bold">CON-UP-83921-N</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span className="text-slate-500">GSTIN:</span>
                      <span className="font-mono text-slate-400 text-[10px]">09PRASD8392A1Z0</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span className="text-slate-500">{lang === "hi" ? "मासिक क्षमता" : "Hiring Volume"}:</span>
                      <span className="font-bold text-amber-500 font-mono">150 Workers / {lang === "hi" ? "माह" : "mo"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{lang === "hi" ? "कार्य जिला / राज्य" : "District / State"}:</span>
                      <span className="font-bold text-slate-300">{regDistrict || "Gorakhpur"}, {regState || "UP"}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{lang === "hi" ? "विश्वास स्कोर" : "Trust Score"}:</span>
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <Award className="w-4 h-4 text-amber-500 animate-bounce" />
                    <span>98%</span>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Live Workforce Overview (Col 8) */}
              <div className="lg:col-span-8 bg-slate-950/40 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                    {lang === "hi" ? "सक्रिय कार्यबल लाइव अवलोकन" : "Live Workforce Telemetry Overview"}
                  </h4>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono uppercase font-bold animate-pulse">
                    ● Live Grid Sync
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-left">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">{lang === "hi" ? "सक्रिय कामगार" : "Currently Active"}</span>
                    <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">{42 + jpePendingJobsOffset}</span>
                    <span className="text-[9px] text-slate-500 block mt-1 font-mono">Dispatched at GIDA / Bypass</span>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-left">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">{lang === "hi" ? "आज नियोजित" : "Hired Today"}</span>
                    <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">{12 + jpeHiredTodayOffset}</span>
                    <span className="text-[9px] text-slate-500 block mt-1 font-mono">Instant QR Registered</span>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-left">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">{lang === "hi" ? "आसपास उपलब्ध" : "Available Nearby"}</span>
                    <span className="text-2xl font-black text-white font-mono mt-1 block">{156 + jpeHiringActivityOffset}</span>
                    <span className="text-[9px] text-emerald-400 block mt-1 font-mono">● Active in Gorakhpur</span>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-left">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">{lang === "hi" ? "कल के लिए अनुसूचित" : "Scheduled Tomorrow"}</span>
                    <span className="text-2xl font-black text-blue-400 font-mono mt-1 block">{28 + jpePendingJobsOffset}</span>
                    <span className="text-[9px] text-slate-500 block mt-1 font-mono">Contracts Confirmed</span>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-left">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">{lang === "hi" ? "पूर्ण किए गए कार्य" : "Completed Jobs"}</span>
                    <span className="text-2xl font-black text-white font-mono mt-1 block">340</span>
                    <span className="text-[9px] text-slate-500 block mt-1 font-mono">Direct Settlements</span>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-left flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-mono">{lang === "hi" ? "मासिक भर्ती प्रगति" : "Monthly Hiring Progress"}</span>
                      <span className="text-lg font-black text-amber-500 font-mono mt-0.5 block">84%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800 mt-2">
                      <div className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full" style={{ width: "84%" }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* PROMPT-14: Platform Fee, Settlement & Revenue Model Panel */}
            <div className="bg-slate-900 border-2 border-amber-500/20 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden text-left space-y-5">
              {/* Decorative background blur */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                      {lang === "hi" ? "राजस्व और निपटान इंजन" : "REVENUE & SETTLEMENT ENGINE"}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-sans mt-0.5">
                    {lang === "hi" ? "पारदर्शी मंच शुल्क और भुगतान सेटलमेंट पैनल" : "Transparent Platform Fee & Settlement Panel"}
                  </h3>
                </div>
                
                <span className="text-[9px] bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2.5 py-1 rounded-xl font-mono uppercase font-bold flex items-center gap-1 shrink-0 self-start sm:self-center">
                  <Coins className="w-3.5 h-3.5" />
                  {lang === "hi" ? "सिम्युलेटेड भुगतान" : "Simulated Demo Layer"}
                </span>
              </div>

              {prompt14SuccessMsg && (
                <div className="p-3 bg-emerald-950/50 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <div>{prompt14SuccessMsg}</div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left side: Settlement queue (Col 7) */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                    {lang === "hi" ? "सक्रिय दैनिक सेटलमेंट कतार" : "Active Daily Settlement Queue"}
                  </h4>

                  <div className="space-y-3.5">
                    {prompt14ContractorSettlements.map((set) => (
                      <div key={set.id} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-850 hover:border-slate-800 transition space-y-3">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="text-[9px] font-mono text-slate-500 uppercase">{lang === "hi" ? "कार्य स्थल" : "JOB SITE"}</span>
                            <h5 className="text-xs font-bold text-white">{lang === "hi" ? set.jobNameHi : set.jobNameEn}</h5>
                          </div>
                          <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                            set.status === "Pending" ? "bg-slate-800 text-slate-400 border border-slate-700" :
                            set.status === "Paying" ? "bg-amber-500/10 text-amber-500 border border-amber-500/30 animate-pulse" :
                            set.status === "Paid" ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" :
                            "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          }`}>
                            {set.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2.5 border-t border-slate-900 text-xs">
                          <div>
                            <span className="text-slate-500 block text-[9px] uppercase">{lang === "hi" ? "कामगार" : "Worker"}:</span>
                            <span className="font-bold text-slate-300 font-mono">{set.workerName}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[9px] uppercase">{lang === "hi" ? "श्रमिक वेतन" : "Worker Wage"}:</span>
                            <span className="font-bold text-emerald-400 font-mono">₹{set.wage}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[9px] uppercase">{lang === "hi" ? "मंच शुल्क" : "Platform Fee"}:</span>
                            <span className="font-bold text-amber-500 font-mono">₹{set.platformFee}</span>
                          </div>
                        </div>

                        {/* Interactive Steps depending on status */}
                        <div className="pt-3 border-t border-slate-900 flex flex-wrap gap-2.5">
                          {set.status === "Pending" && (
                            <button
                              onClick={() => {
                                setPrompt14ContractorSettlements(prompt14ContractorSettlements.map(x => x.id === set.id ? { ...x, status: "Paying" } : x));
                                setPrompt14ActivePayId(set.id);
                                setPrompt14ShowPaymentModal(true);
                                handleVoiceSpeak(
                                  "सेटलमेंट इनवॉइस जेनरेट हो गया है। कृपया भुगतान विधि चुनें।",
                                  "Settlement invoice generated. Please choose a demo payment mode."
                                );
                              }}
                              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>{lang === "hi" ? "सेटलमेंट रसीद उत्पन्न करें" : "Generate Settlement Receipt"}</span>
                            </button>
                          )}

                          {set.status === "Paying" && (
                            <button
                              onClick={() => {
                                setPrompt14ActivePayId(set.id);
                                setPrompt14ShowPaymentModal(true);
                              }}
                              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>{lang === "hi" ? "प्लेटफॉर्म शुल्क डेमो भुगतान करें" : "Pay Platform Fee Demo"}</span>
                            </button>
                          )}

                          {set.status === "Paid" && (
                            <button
                              onClick={() => {
                                // Complete Settlement
                                setPrompt14ContractorSettlements(prompt14ContractorSettlements.map(x => x.id === set.id ? { ...x, status: "Completed", date: "Just now", paymentMode: "UPI" } : x));
                                setPrompt14WorkerSettlement({
                                  receiptId: set.receiptId,
                                  wageEarned: set.wage,
                                  platformFee: set.platformFee,
                                  status: "Completed",
                                  paymentMode: "UPI",
                                  trustImpact: 2,
                                  date: "Just Now (Simulated)",
                                });
                                // Add Trust Score
                                setPrompt14WorkerTrustScore(prev => Math.min(100, prev + 2));
                                setPrompt14ContractorTrustScore(prev => Math.min(100, prev + 3));
                                // Update Admin Metrics
                                setPrompt14AdminRevenue(prev => ({
                                  ...prev,
                                  todayRevenue: prev.todayRevenue + set.platformFee,
                                  completedCount: prev.completedCount + 1,
                                }));
                                setPrompt14ShowVerifiedBadge(true);
                                setPrompt14SuccessMsg(
                                  lang === "hi" 
                                    ? `सफलता: सेटलमेंट पूर्ण! श्रमिक को ₹${set.wage} की पूरी मजदूरी नकद/बैंक अंतरण द्वारा दी गई। मंच शुल्क ₹${set.platformFee} सफलतापूर्वक संसाधित किया गया।`
                                    : `Success: Settlement marked complete! Worker received full ₹${set.wage} wage. Platform fee of ₹${set.platformFee} simulated successfully.`
                                );
                                handleVoiceSpeak(
                                  `सेटलमेंट दर्ज किया गया। कामगार को ₹${set.wage} की पूरी मजदूरी मिली। मंच शुल्क संसाधित हुआ।`,
                                  `Settlement finalized. Worker received full ₹${set.wage} wage, and micro-fee is safely deposited.`
                                );
                                setTimeout(() => setPrompt14SuccessMsg(""), 6000);
                              }}
                              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>{lang === "hi" ? "सेटलमेंट पूरा चिह्नित करें" : "Mark Settlement Complete"}</span>
                            </button>
                          )}

                          {set.status === "Completed" && (
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                              <ShieldCheck className="w-4 h-4" />
                              <span>{lang === "hi" ? "सत्यापित सेटलमेंट ✓ (मजदूरी शत प्रतिशत सुरक्षित)" : "Verified Settlement ✓ (100% Wage Protected)"}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side: Invoice break-down or payment selector depending on state (Col 5) */}
                <div className="lg:col-span-5">
                  {(() => {
                    const currentActiveSet = prompt14ContractorSettlements.find(x => x.id === prompt14ActivePayId) || prompt14ContractorSettlements[0];
                    const activeWageVal = currentActiveSet ? currentActiveSet.wage : 900;
                    const activeTradeVal = currentActiveSet ? currentActiveSet.tradeId : "mason";
                    const tradeFeeRule = prompt14TradeFees.find(tf => tf.id === activeTradeVal) || { feePercent: 4.0 };
                    const activeFeePercentVal = tradeFeeRule.feePercent;
                    const activeFeeVal = Math.round(activeWageVal * (activeFeePercentVal / 100));
                    const totalPayableVal = activeWageVal + activeFeeVal;

                    if (prompt14ShowPaymentModal && prompt14ActivePayId) {
                      return (
                        <div className="bg-slate-950 p-4.5 rounded-2xl border-2 border-amber-500/20 space-y-4">
                          <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
                            <h4 className="text-xs font-bold text-white font-mono">
                              {lang === "hi" ? "प्लेटफॉर्म शुल्क भुगतान गेटवे (डेमो)" : "Platform Fee Gateway (Demo)"}
                            </h4>
                            <button 
                              onClick={() => setPrompt14ShowPaymentModal(false)}
                              className="text-slate-400 hover:text-white text-xs font-bold"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                            <div className="flex justify-between">
                              <span className="text-slate-400">{lang === "hi" ? "कामगार दैनिक मजदूरी" : "Worker Wage"}:</span>
                              <span className="text-emerald-400 font-bold">₹{activeWageVal}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">{lang === "hi" ? "लेबरअड्डा मंच शुल्क" : "LabourAdda Platform Fee"}:</span>
                              <span className="text-amber-500 font-bold">₹{activeFeeVal} ({activeFeePercentVal}%)</span>
                            </div>
                            <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-white">
                              <span>{lang === "hi" ? "कुल देय राशि" : "Total Settlement"}:</span>
                              <span className="text-amber-500 font-bold">₹{totalPayableVal}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] text-slate-500 font-mono uppercase block">
                              {lang === "hi" ? "सिम्युलेटेड भुगतान विकल्प चुनें" : "Select Simulated Payment Option"}
                            </span>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <button
                                onClick={() => {
                                  setPrompt14ContractorSettlements(prompt14ContractorSettlements.map(x => x.id === prompt14ActivePayId ? { ...x, status: "Paid", platformFee: activeFeeVal } : x));
                                  setPrompt14ShowPaymentModal(false);
                                  handleVoiceSpeak("यूपीआई भुगतान सिम्युलेटेड।", "UPI platform fee payment simulated.");
                                  alert("डेमो यूपीआई भुगतान स्वीकार किया गया! / Demo UPI payment simulated.");
                                }}
                                className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 rounded-xl text-white font-bold transition flex flex-col items-center justify-center gap-1 cursor-pointer"
                              >
                                <span className="text-emerald-400 font-mono font-bold">GPay / UPI</span>
                                <span className="text-[8px] text-slate-400 font-normal">Instant QR Scan</span>
                              </button>

                              <button
                                onClick={() => {
                                  setPrompt14ContractorSettlements(prompt14ContractorSettlements.map(x => x.id === prompt14ActivePayId ? { ...x, status: "Paid", platformFee: activeFeeVal } : x));
                                  setPrompt14ShowPaymentModal(false);
                                  handleVoiceSpeak("डेमो कार्ड भुगतान सफल।", "Demo card payment simulated successfully.");
                                  alert("डेमो डेबिट/क्रेडिट कार्ड भुगतान सफल! / Demo Card payment simulated.");
                                }}
                                className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 rounded-xl text-white font-bold transition flex flex-col items-center justify-center gap-1 cursor-pointer"
                              >
                                <span className="text-amber-400 font-mono font-bold">Visa / Rupay</span>
                                <span className="text-[8px] text-slate-400 font-normal">Card Sandbox</span>
                              </button>
                            </div>
                          </div>

                          <p className="text-[9px] text-slate-500 leading-normal bg-slate-900 p-2 rounded-lg">
                            ⚠️ <strong>{lang === "hi" ? "डेमो सुरक्षा नीति:" : "Demo Policy:"}</strong>{" "}
                            {lang === "hi" 
                              ? "यह केवल एक डेमो भुगतान स्क्रीन है। कोई कार्ड विवरण या वास्तविक पैसा दर्ज न करें।" 
                              : "This is a demo sandbox. Do not enter actual card numbers or make real payment."}
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-850 space-y-4">
                          <h4 className="text-xs font-bold text-white font-mono border-b border-slate-900 pb-2">
                            {lang === "hi" ? "सक्रिय सेटलमेंट रसीद ब्रेकडाउन" : "Invoice-Style Settlement Breakdown"}
                          </h4>

                          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-850 space-y-3.5 text-xs font-mono">
                            <div className="flex justify-between items-center text-slate-400">
                              <span>{lang === "hi" ? "श्रमिक की दैनिक मजदूरी (१००% सुरक्षित)" : "Worker Wage (100% Protected)"}:</span>
                              <span className="text-emerald-400 font-bold">₹{activeWageVal}.00</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-400">
                              <span>{lang === "hi" ? "पारदर्शी लेबरअड्डा मंच शुल्क" : "Transparent LabourAdda Micro-Fee"}:</span>
                              <span className="text-amber-500 font-bold">₹{activeFeeVal}.00 ({activeFeePercentVal}%)</span>
                            </div>
                            <div className="border-t border-slate-800 pt-2.5 flex justify-between items-center font-bold text-white text-sm">
                              <span>{lang === "hi" ? "कुल ठेकेदार देय राशि" : "Total Contractor Payable"}:</span>
                              <span className="text-amber-400 font-black">₹{totalPayableVal}.00</span>
                            </div>
                          </div>

                      {/* Trust Integration Indicator */}
                      <div className="p-3 bg-gradient-to-r from-amber-500/5 via-amber-600/10 to-transparent border border-amber-500/20 rounded-xl space-y-2 text-xs">
                        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                          <Award className="w-4 h-4" />
                          <span>{lang === "hi" ? "ट्रस्ट स्कोर और विश्वसनीयता अपडेट" : "Trust Score & Reliability Updates"}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-snug">
                          {lang === "hi" 
                            ? "सेटलमेंट पूरा करने पर: श्रमिक को +२ विश्वसनीयता अंक और ठेकेदार को +३ भुगतान समयबद्धता अंक दिए जाते हैं।"
                            : "Upon completion: Worker reliability gets +2, and Contractor payment score gets +3."}
                        </p>
                        
                        <div className="flex justify-between items-center pt-1 border-t border-slate-900 text-[10px] font-mono">
                          <span className="text-slate-400">{lang === "hi" ? "श्रमिक नया स्कोर" : "Worker Trust"}: <strong className="text-emerald-400">{prompt14WorkerTrustScore}%</strong></span>
                          <span className="text-slate-400">{lang === "hi" ? "ठेकेदार नया स्कोर" : "Contractor Trust"}: <strong className="text-emerald-400">{prompt14ContractorTrustScore}%</strong></span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-900 border border-slate-850 rounded-xl text-[9px] text-slate-500 leading-normal">
                        <p>
                          🛡️ <strong>{lang === "hi" ? "मजदूरी संरक्षण नीति:" : "Wage Protection Policy:"}</strong>{" "}
                          {lang === "hi" 
                            ? "कामगारों से कोई कमीशन नहीं लिया जाता है। उनका पूरा वेतन सीधे उनके हाथ या बैंक खाते में मिलता है।" 
                            : "Micro-fee model enables scalable operations without exploiting workers. No fee is deducted from worker wage."}
                        </p>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
              </div>

            </div>

            {/* SECTION 3: Quick Workforce Actions */}
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold border-b border-slate-900 pb-2">
                {lang === "hi" ? "त्वरित कांट्रेक्टर कार्यप्रवाह क्रियाएं" : "Quick Workforce Direct Actions"}
              </h4>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { id: "find", hi: "कामगार खोजें", en: "Find Workers", icon: Search, bg: "hover:bg-amber-500/10 hover:border-amber-500/40" },
                  { id: "post", hi: "आवश्यकता पोस्ट करें", en: "Post Requirement", icon: Plus, bg: "hover:bg-emerald-500/10 hover:border-emerald-500/40" },
                  { id: "invite", hi: "कामगार को बुलाएं", en: "Invite Worker", icon: UserCheck, bg: "hover:bg-blue-500/10 hover:border-blue-500/40" },
                  { id: "applications", hi: "आवेदन देखें", en: "View Applications", icon: FileText, bg: "hover:bg-purple-500/10 hover:border-purple-500/40" },
                  { id: "workforce", hi: "कार्यबल प्रबंध", en: "Manage Workforce", icon: Users, bg: "hover:bg-pink-500/10 hover:border-pink-500/40" },
                  { id: "passport", hi: "लेबर पासपोर्ट देखें", en: "View Passport ID", icon: Award, bg: "hover:bg-teal-500/10 hover:border-teal-500/40" }
                ].map((act) => {
                  const Icon = act.icon;
                  return (
                    <button
                      type="button"
                      key={act.id}
                      onClick={() => {
                        setContractorActionModal(contractorActionModal === act.id ? null : act.id);
                        handleVoiceSpeak(
                          `ओपनिंग पैनल: ${act.hi}`,
                          `Opening control panel for: ${act.en}`
                        );
                      }}
                      className={`p-3 bg-slate-900/80 border border-slate-800 rounded-xl transition-all duration-150 text-center flex flex-col items-center justify-center space-y-2 cursor-pointer min-h-[90px] ${act.bg} ${contractorActionModal === act.id ? "bg-amber-500/10 border-amber-500" : ""}`}
                    >
                      <Icon className={`w-5 h-5 ${contractorActionModal === act.id ? "text-amber-500" : "text-slate-400"}`} />
                      <div>
                        <span className="text-[11px] font-bold text-white block leading-tight">{act.hi}</span>
                        <span className="text-[9px] text-slate-500 block leading-none mt-0.5 font-mono">{act.en}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* ACTION PANELS INLINE (INTERACTIVE & PRODUCTION-SAFE) */}
              {contractorActionModal && (
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-850 animate-fadeIn space-y-4 relative">
                  <button
                    type="button"
                    onClick={() => setContractorActionModal(null)}
                    className="absolute top-4 right-4 bg-slate-900 hover:bg-slate-800 text-slate-400 p-1.5 rounded-lg border border-slate-800 transition cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Panel: Find Workers */}
                  {contractorActionModal === "find" && (
                    <div className="space-y-6 text-left animate-fadeIn">
                      {/* HEADER SECTION */}
                      <div className="border-b border-slate-900 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-amber-500/15 border border-amber-500/20 text-amber-500 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold">
                              {lang === "hi" ? "राष्ट्रीय श्रम ग्रिड" : "NATIONAL LABOR GRID"}
                            </span>
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold">{lang === "hi" ? "सिस्टम ऑनलाइन" : "System Live"}</span>
                          </div>
                          <h4 className="text-lg font-black text-white font-mono mt-1.5 tracking-tight">
                            {lang === "hi" ? "राष्ट्रीय कामगार खोज इंजन" : "National Worker Discovery Engine"}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1">
                            {lang === "hi" 
                              ? "इंटेलिजेंट फिल्टर और एआई-असिस्टेड मिलान का उपयोग करके भारत के डिजिटल लेबर ग्रिड से सत्यापित कामगारों की खोज करें।" 
                              : "Search verified workers from India's Digital Labour Grid using intelligent filters and AI-assisted matching."}
                          </p>
                        </div>
                        
                        <div className="shrink-0 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const textHi = `राष्ट्रीय कामगार खोज इंजन सक्रिय है। कुल ${filteredDiscoverWorkers.length} कामगार मेल खाते हैं। प्रथम अनुशंसित कामगार ${filteredDiscoverWorkers[0]?.name || "कोई नहीं"} है।`;
                              const textEn = `National Worker Discovery Engine is active. Found ${filteredDiscoverWorkers.length} workers matching your filters. The top recommended worker is ${filteredDiscoverWorkers[0]?.name || "none"}.`;
                              handleVoiceSpeak(textHi, textEn);
                            }}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 cursor-pointer min-h-[38px]"
                          >
                            <Volume2 className="w-4 h-4 text-amber-500 animate-pulse" />
                            {lang === "hi" ? "खोज सारांश सुनें" : "Listen to Discovery"}
                          </button>
                        </div>
                      </div>

                      {/* TOP ANALYTICS STRIP */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs text-left font-mono">
                        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-900 flex flex-col justify-between hover:border-slate-850 transition">
                          <div>
                            <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "सत्यापित कामगार" : "VERIFIED WORKERS"}</span>
                            <span className="font-extrabold text-white text-base block mt-0.5">18,420</span>
                          </div>
                          <span className="text-[8px] text-emerald-400 mt-1 block">● {lang === "hi" ? "राष्ट्रीय ग्रिड लाइव" : "National Grid Live"}</span>
                        </div>

                        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-900 flex flex-col justify-between hover:border-slate-850 transition">
                          <div>
                            <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "आज उपलब्ध" : "AVAILABLE TODAY"}</span>
                            <span className="font-extrabold text-white text-base block mt-0.5">5,284</span>
                          </div>
                          <span className="text-[8px] text-amber-500 mt-1 block">▲ {lang === "hi" ? "२८० कामगार सक्रिय" : "280 active now"}</span>
                        </div>

                        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-900 flex flex-col justify-between hover:border-slate-850 transition">
                          <div>
                            <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "स्थान के निकट" : "NEAR LOCATION"}</span>
                            <span className="font-extrabold text-white text-base block mt-0.5">162</span>
                          </div>
                          <span className="text-[8px] text-blue-400 mt-1 block">■ {lang === "hi" ? "५ किमी त्रिज्या" : "5 km radius"}</span>
                        </div>

                        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-900 flex flex-col justify-between hover:border-slate-850 transition">
                          <div>
                            <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "औसत मैच सटीकता" : "MATCH ACCURACY"}</span>
                            <span className="font-extrabold text-white text-base block mt-0.5">96.4%</span>
                          </div>
                          <span className="text-[8px] text-purple-400 mt-1 block">⚡ {lang === "hi" ? "एआई संचालित" : "AI Powered"}</span>
                        </div>

                        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-900 flex flex-col justify-between hover:border-slate-850 transition">
                          <div>
                            <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "औसत प्रतिक्रिया समय" : "RESPONSE TIME"}</span>
                            <span className="font-extrabold text-white text-base block mt-0.5">11 Min</span>
                          </div>
                          <span className="text-[8px] text-pink-400 mt-1 block">⏱ {lang === "hi" ? "त्वरित एसएमएस प्रेषण" : "Direct SMS dispatch"}</span>
                        </div>

                        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-900 flex flex-col justify-between hover:border-slate-850 transition">
                          <div>
                            <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "सरकारी सत्यापित" : "GOVT VERIFIED"}</span>
                            <span className="font-extrabold text-white text-base block mt-0.5">100%</span>
                          </div>
                          <span className="text-[8px] text-emerald-400 mt-1 block">✓ {lang === "hi" ? "आधार लिंक सुरक्षित" : "Aadhaar Link Secured"}</span>
                        </div>
                      </div>

                      {/* MAIN WORKSPACE GRID */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* LEFT COLUMN: FILTERS (4 SPANS) */}
                        <div className="lg:col-span-4 bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-5 text-left">
                          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                              {lang === "hi" ? "इंटेली-फ़िल्टर पैनल" : "Intelli-Filter Control"}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setDiscoverTrade("All");
                                setDiscoverExp("All");
                                setDiscoverWage(1500);
                                setDiscoverDistance("All");
                                setDiscoverAvail("Immediately");
                                setDiscoverAadhaar(false);
                                setDiscoverPassport(false);
                                setDiscoverGPS(false);
                                setDiscoverPolice(false);
                                setDiscoverSkill(false);
                                setDiscoverLangs([]);
                                setDiscoverSearchQuery("");
                                handleVoiceSpeak("सभी फ़िल्टर रीसेट कर दिए गए हैं।", "All filters have been reset.");
                              }}
                              className="text-[10px] text-slate-500 hover:text-amber-500 font-mono transition"
                            >
                              {lang === "hi" ? "रीसेट करें" : "Reset All"}
                            </button>
                          </div>

                          {/* 1. Trade Dropdown */}
                          <label className="block">
                            <span className="text-xs text-slate-400 font-bold block mb-1.5">{lang === "hi" ? "व्यापार श्रेणी / पेशा" : "Trade Category"}</span>
                            <select
                              value={discoverTrade}
                              onChange={(e) => {
                                setDiscoverTrade(e.target.value);
                                handleVoiceSpeak(`पेशा चुना गया: ${e.target.value}`, `Selected trade: ${e.target.value}`);
                              }}
                              className="w-full bg-slate-900 border border-slate-850 text-white px-3 py-2 rounded-xl text-xs outline-none h-10 font-mono"
                            >
                              <option value="All">{lang === "hi" ? "सभी पेशे (All Trades)" : "All Trades"}</option>
                              <option value="Mason">{lang === "hi" ? "राजमिस्त्री (Mason)" : "Mason"}</option>
                              <option value="Electrician">{lang === "hi" ? "बिजली मिस्त्री (Electrician)" : "Electrician"}</option>
                              <option value="Painter">{lang === "hi" ? "रंगसाज़ (Painter)" : "Painter"}</option>
                              <option value="Plumber">{lang === "hi" ? "प्लंबर (Plumber)" : "Plumber"}</option>
                              <option value="Carpenter">{lang === "hi" ? "बढ़ई (Carpenter)" : "Carpenter"}</option>
                              <option value="Welder">{lang === "hi" ? "वेल्डर (Welder)" : "Welder"}</option>
                              <option value="Helper">{lang === "hi" ? "सहायक (Helper)" : "Helper"}</option>
                              <option value="Agricultural Worker">{lang === "hi" ? "कृषि श्रमिक (Agricultural)" : "Agricultural Worker"}</option>
                              <option value="General Labour">{lang === "hi" ? "मजदूर (General Labour)" : "General Labour"}</option>
                            </select>
                          </label>

                          {/* 2. Experience Dropdown */}
                          <label className="block">
                            <span className="text-xs text-slate-400 font-bold block mb-1.5">{lang === "hi" ? "न्यूनतम अनुभव स्तर" : "Minimum Experience"}</span>
                            <select
                              value={discoverExp}
                              onChange={(e) => setDiscoverExp(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-850 text-white px-3 py-2 rounded-xl text-xs outline-none h-10 font-mono"
                            >
                              <option value="All">{lang === "hi" ? "कोई भी अनुभव (Any Experience)" : "Any Experience"}</option>
                              <option value="0-2 Years">0-2 {lang === "hi" ? "वर्ष" : "Years"}</option>
                              <option value="3-5 Years">3-5 {lang === "hi" ? "वर्ष" : "Years"}</option>
                              <option value="5-10 Years">5-10 {lang === "hi" ? "वर्ष" : "Years"}</option>
                              <option value="10+ Years">10+ {lang === "hi" ? "वर्ष" : "Years"}</option>
                            </select>
                          </label>

                          {/* 3. Expected Wage Slider */}
                          <div className="space-y-1.5">
                            <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "अपेक्षित दैनिक मजदूरी सीमा" : "Expected Daily Wage Limit"}</span>
                            <div className="flex justify-between text-[10px] font-mono text-slate-500">
                              <span>₹400</span>
                              <span className="text-amber-500 font-extrabold">₹{discoverWage} {lang === "hi" ? "या कम" : "or less"}</span>
                              <span>₹1500</span>
                            </div>
                            <input
                              type="range"
                              min="400"
                              max="1500"
                              step="50"
                              value={discoverWage}
                              onChange={(e) => setDiscoverWage(parseInt(e.target.value))}
                              className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                          </div>

                          {/* 4. Distance Dropdown */}
                          <label className="block">
                            <span className="text-xs text-slate-400 font-bold block mb-1.5">{lang === "hi" ? "दूरी (त्रिज्या)" : "Distance (Radius)"}</span>
                            <select
                              value={discoverDistance}
                              onChange={(e) => setDiscoverDistance(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-850 text-white px-3 py-2 rounded-xl text-xs outline-none h-10 font-mono"
                            >
                              <option value="All">{lang === "hi" ? "पूरी रेंज (Entire Corridor)" : "Entire Corridor"}</option>
                              <option value="Within 2 km">{lang === "hi" ? "२ किमी के भीतर" : "Within 2 km"}</option>
                              <option value="Within 5 km">{lang === "hi" ? "५ किमी के भीतर" : "Within 5 km"}</option>
                              <option value="Within 10 km">{lang === "hi" ? "१० किमी के भीतर" : "Within 10 km"}</option>
                              <option value="Within 25 km">{lang === "hi" ? "२५ किमी के भीतर" : "Within 25 km"}</option>
                              <option value="Entire District">{lang === "hi" ? "पूरा जिला" : "Entire District"}</option>
                            </select>
                          </label>

                          {/* 5. Availability (Buttons) */}
                          <div className="space-y-2 text-left">
                            <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "उपलब्धता स्थिति" : "Availability Status"}</span>
                            <div className="grid grid-cols-2 gap-1.5">
                              {["Immediately", "Available Today", "Tomorrow", "This Week"].map((availOpt) => (
                                <button
                                  key={availOpt}
                                  type="button"
                                  onClick={() => setDiscoverAvail(availOpt)}
                                  className={`py-2 px-2.5 rounded-xl text-[10px] font-mono border font-bold transition flex items-center justify-center cursor-pointer ${
                                    discoverAvail === availOpt
                                      ? "bg-amber-500/20 text-amber-500 border-amber-500/40"
                                      : "bg-slate-900 text-slate-400 border-slate-850 hover:text-white"
                                  }`}
                                >
                                  {availOpt === "Immediately" && (lang === "hi" ? "तत्काल" : "Immediately")}
                                  {availOpt === "Available Today" && (lang === "hi" ? "आज उपलब्ध" : "Available Today")}
                                  {availOpt === "Tomorrow" && (lang === "hi" ? "कल से" : "Tomorrow")}
                                  {availOpt === "This Week" && (lang === "hi" ? "इस सप्ताह" : "This Week")}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* 6. Verification Checkboxes */}
                          <div className="space-y-2 text-left">
                            <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "सत्यापन और सुरक्षा स्थिति" : "Verification & Safety Badges"}</span>
                            <div className="space-y-2 font-mono text-[11px] text-slate-300">
                              {[
                                { checked: discoverAadhaar, setChecked: setDiscoverAadhaar, labelHi: "आधार सत्यापित (100% UIDAI)", labelEn: "Aadhaar Verified" },
                                { checked: discoverPassport, setChecked: setDiscoverPassport, labelHi: "पासपोर्ट/आईडी धारक", labelEn: "Passport Verified" },
                                { checked: discoverGPS, setChecked: setDiscoverGPS, labelHi: "सक्रिय जीपीएस ट्रैकिंग", labelEn: "GPS Active" },
                                { checked: discoverPolice, setChecked: setDiscoverPolice, labelHi: "पुलिस सत्यापन सुरक्षित", labelEn: "Police Verified" },
                                { checked: discoverSkill, setChecked: setDiscoverSkill, labelHi: "कौशल प्रमाणित (NSTI)", labelEn: "Skill Certified" }
                              ].map((vItem, vIdx) => (
                                <label key={vIdx} className="flex items-center gap-2 cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={vItem.checked}
                                    onChange={(e) => {
                                      vItem.setChecked(e.target.checked);
                                      handleVoiceSpeak(
                                        `टॉगल ${vItem.labelHi}`,
                                        `Toggled ${vItem.labelEn}`
                                      );
                                    }}
                                    className="w-3.5 h-3.5 rounded border-slate-800 bg-slate-900 text-amber-500 focus:ring-amber-500/20"
                                  />
                                  <span>{lang === "hi" ? vItem.labelHi : vItem.labelEn}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* 7. Language Toggle Pill Bar */}
                          <div className="space-y-2 text-left">
                            <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "भाषा प्राथमिकताएं" : "Language Preferences"}</span>
                            <div className="flex flex-wrap gap-1.5">
                              {["Hindi", "English", "Bhojpuri", "Awadhi", "Bengali", "Marathi", "Tamil", "Telugu", "Kannada", "Punjabi"].map((langOpt) => {
                                const isSel = discoverLangs.includes(langOpt);
                                return (
                                  <button
                                    key={langOpt}
                                    type="button"
                                    onClick={() => {
                                      if (isSel) {
                                        setDiscoverLangs(discoverLangs.filter(l => l !== langOpt));
                                      } else {
                                        setDiscoverLangs([...discoverLangs, langOpt]);
                                      }
                                    }}
                                    className={`px-2.5 py-1 rounded-full text-[9px] font-mono border transition ${
                                      isSel 
                                        ? "bg-amber-500/25 text-amber-400 border-amber-500/50" 
                                        : "bg-slate-900 text-slate-400 border-slate-850 hover:text-white"
                                    }`}
                                  >
                                    {langOpt}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* MIDDLE COLUMN: GRID & SORTING & COMPARE (8 SPANS) */}
                        <div className="lg:col-span-8 space-y-4">
                          
                          {/* SEARCH & SORT PANEL */}
                          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 flex flex-col md:flex-row gap-3 items-center justify-between">
                            <div className="w-full md:w-auto flex-1 relative">
                              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                              <input
                                type="text"
                                placeholder={lang === "hi" ? "नाम, शहर या कौशल से खोजें..." : "Enter worker name, district or skill..."}
                                value={discoverSearchQuery}
                                onChange={(e) => setDiscoverSearchQuery(e.target.value)}
                                className="w-full bg-slate-900 text-white border border-slate-850 text-xs pl-8 pr-3.5 py-2.5 rounded-xl outline-none focus:border-amber-500 h-9 font-mono"
                              />
                            </div>

                            <div className="w-full md:w-auto shrink-0 flex items-center gap-2">
                              <span className="text-[10px] text-slate-500 font-mono uppercase">{lang === "hi" ? "क्रमबद्ध करें:" : "Sort By:"}</span>
                              <select
                                value={discoverSort}
                                onChange={(e) => setDiscoverSort(e.target.value)}
                                className="bg-slate-900 text-white border border-slate-850 text-xs px-2 py-1.5 rounded-lg outline-none font-mono"
                              >
                                <option value="Highest Match">{lang === "hi" ? "सर्वोत्तम एआई मिलान" : "Highest Match"}</option>
                                <option value="Newest">{lang === "hi" ? "नए पंजीकृत" : "Newest Registered"}</option>
                                <option value="Nearest">{lang === "hi" ? "निकटतम दूरी" : "Nearest Distance"}</option>
                                <option value="Lowest Wage">{lang === "hi" ? "न्यूनतम मजदूरी" : "Lowest Wage"}</option>
                                <option value="Highest Trust">{lang === "hi" ? "सर्वोच्च ट्रस्ट स्कोर" : "Highest Trust"}</option>
                                <option value="Most Experienced">{lang === "hi" ? "सर्वाधिक अनुभवी" : "Most Experienced"}</option>
                                <option value="Recently Active">{lang === "hi" ? "हाल ही में सक्रिय" : "Recently Active"}</option>
                              </select>
                            </div>
                          </div>

                          {/* COMPARE PANEL SUMMARY COMPONENT */}
                          {discoverCompareList.length > 0 && (
                            <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/20 text-left space-y-3.5 animate-fadeIn">
                              <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                                <span className="text-xs font-mono font-bold text-amber-500 uppercase flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                  {lang === "hi" ? "कामगार तुलना कार्यपत्रक (अधिकतम ३)" : "Workforce Comparison Worksheet (Max 3)"}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setDiscoverCompareList([])}
                                  className="text-[10px] text-slate-500 hover:text-white underline font-mono"
                                >
                                  {lang === "hi" ? "तुलना साफ़ करें" : "Clear Compare"}
                                </button>
                              </div>
                              <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-xs">
                                  <thead>
                                    <tr className="border-b border-slate-900 text-[10px] text-slate-500 uppercase font-mono">
                                      <th className="py-1 px-2">{lang === "hi" ? "कामगार का नाम" : "Worker Name"}</th>
                                      <th className="py-1 px-2">{lang === "hi" ? "अनुभव" : "Experience"}</th>
                                      <th className="py-1 px-2">{lang === "hi" ? "अपेक्षित दैनिक मजदूरी" : "Daily Wage"}</th>
                                      <th className="py-1 px-2">{lang === "hi" ? "ट्रस्ट स्कोर" : "Trust Score"}</th>
                                      <th className="py-1 px-2">{lang === "hi" ? "उपस्थिति %" : "Attendance %"}</th>
                                      <th className="py-1 px-2">{lang === "hi" ? "दूरी" : "Distance"}</th>
                                      <th className="py-1 px-2">{lang === "hi" ? "कार्य पूर्णता" : "Completion"}</th>
                                      <th className="py-1 px-2 text-amber-500">{lang === "hi" ? "एआई मिलान" : "AI Match"}</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-900 font-mono text-[11px]">
                                    {discoverCompareList.map(cid => {
                                      const cw = INITIAL_DISCOVERABLE_WORKERS.find(w => w.id === cid);
                                      if (!cw) return null;
                                      return (
                                        <tr key={cw.id} className="hover:bg-slate-900/50">
                                          <td className="py-2 px-2 font-bold text-white flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                                            {cw.name}
                                          </td>
                                          <td className="py-2 px-2 text-slate-300">{cw.experience}</td>
                                          <td className="py-2 px-2 text-emerald-400 font-bold">₹{cw.wage}/Day</td>
                                          <td className="py-2 px-2 text-slate-300">{cw.trustScore}%</td>
                                          <td className="py-2 px-2 text-slate-300">{cw.attendance}%</td>
                                          <td className="py-2 px-2 text-slate-300">{cw.distance} km</td>
                                          <td className="py-2 px-2 text-slate-300">{cw.completion}%</td>
                                          <td className="py-2 px-2 text-amber-500 font-extrabold">{cw.aiMatch}%</td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {/* WORKERS RESULT GRID */}
                          {filteredDiscoverWorkers.length === 0 ? (
                            <div className="bg-slate-950/40 p-12 rounded-2xl border border-slate-900 text-center text-xs text-slate-500 font-mono">
                              {lang === "hi" 
                                ? "सक्रिय फिल्टर से मेल खाने वाला कोई कामगार नहीं मिला। कृपया अधिक फिल्टर ढीले करें।" 
                                : "No workers match your active filters. Try loosening search terms or filter ranges."}
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {filteredDiscoverWorkers.map((worker) => {
                                const isComparing = discoverCompareList.includes(worker.id);
                                return (
                                  <div 
                                    key={worker.id} 
                                    className="bg-slate-950 p-4.5 rounded-2xl border border-slate-900 flex flex-col justify-between space-y-4 hover:border-slate-800 transition-all duration-150 text-left"
                                  >
                                    {/* Card Top Block */}
                                    <div className="space-y-3">
                                      <div className="flex items-start justify-between gap-2.5">
                                        <div className="flex items-center gap-3">
                                          {/* Visual photo avatar */}
                                          <div className="relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-slate-950 text-xs bg-gradient-to-tr from-amber-500 to-amber-300 border border-amber-400/40 shrink-0">
                                            {worker.name.split(" ").map(n => n[0]).join("")}
                                            {worker.gpsStatus === "Active" && (
                                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                                            )}
                                          </div>
                                          <div>
                                            <div className="flex items-center gap-1.5">
                                              <h5 className="text-xs font-bold text-white">{worker.name}</h5>
                                              <span className="text-[8px] bg-slate-900 text-slate-400 border border-slate-800 px-1.5 py-0.5 rounded font-mono shrink-0">
                                                {worker.trade}
                                              </span>
                                            </div>
                                            <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                                              {worker.experience} Exp | {worker.district}, {worker.state}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="flex flex-col items-end shrink-0">
                                          <span className={`text-[8px] border px-2 py-0.5 rounded-full font-mono font-bold ${
                                            worker.recommendation === "Highly Recommended" 
                                              ? "bg-amber-500/15 border-amber-500/25 text-amber-500"
                                              : worker.recommendation === "Top Performer"
                                              ? "bg-purple-500/15 border-purple-500/25 text-purple-400"
                                              : "bg-slate-900 border-slate-800 text-slate-400"
                                          }`}>
                                            {worker.recommendation}
                                          </span>
                                          <span className="text-amber-500 font-bold text-xs mt-1.5 font-mono">
                                            {worker.aiMatch}% Match
                                          </span>
                                        </div>
                                      </div>

                                      {/* Document Badges */}
                                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                                        {worker.aadhaar && (
                                          <span className="text-[8px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">
                                            ✓ Aadhaar
                                          </span>
                                        )}
                                        {worker.passport && (
                                          <span className="text-[8px] bg-blue-500/10 border border-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-mono">
                                            ✓ Passport ID
                                          </span>
                                        )}
                                        {worker.police && (
                                          <span className="text-[8px] bg-purple-500/10 border border-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded font-mono">
                                            ✓ Police OK
                                          </span>
                                        )}
                                        {worker.skillCertified && (
                                          <span className="text-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded font-mono">
                                            ✓ NSTI Skill
                                          </span>
                                        )}
                                      </div>

                                      {/* Core metrics panel */}
                                      <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-900 text-left font-mono text-[10px]">
                                        <div>
                                          <span className="text-[8px] text-slate-500 block">DAILY WAGE</span>
                                          <span className="text-emerald-400 font-bold">₹{worker.wage}</span>
                                        </div>
                                        <div>
                                          <span className="text-[8px] text-slate-500 block">TRUST SCORE</span>
                                          <span className="text-white font-bold">{worker.trustScore}%</span>
                                        </div>
                                        <div>
                                          <span className="text-[8px] text-slate-500 block">ATTENDANCE</span>
                                          <span className="text-white font-bold">{worker.attendance}%</span>
                                        </div>
                                      </div>

                                      {/* Secondary Details list */}
                                      <div className="space-y-1 text-[10px] text-slate-400 font-mono border-t border-slate-900 pt-2 text-left">
                                        <div className="flex justify-between">
                                          <span>Distance:</span>
                                          <span className="text-white">{worker.distance} km ({lang === "hi" ? "निकटतम" : "Nearby"})</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Shift Priority:</span>
                                          <span className="text-white">{worker.preferredShift}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Languages:</span>
                                          <span className="text-white truncate max-w-[120px]">{worker.languages.join(", ")}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Available:</span>
                                          <span className="text-emerald-400 font-bold">{worker.availableFrom}</span>
                                        </div>
                                        <p className="text-[9px] text-slate-500 line-clamp-1 mt-1 font-mono italic">
                                          History: {worker.history}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Action row */}
                                    <div className="pt-2.5 border-t border-slate-900 flex flex-wrap gap-1.5 items-center justify-between">
                                      <div className="flex items-center gap-1.5">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (isComparing) {
                                              setDiscoverCompareList(discoverCompareList.filter(id => id !== worker.id));
                                            } else {
                                              if (discoverCompareList.length >= 3) {
                                                alert("You can compare up to 3 workers maximum.");
                                                return;
                                              }
                                              setDiscoverCompareList([...discoverCompareList, worker.id]);
                                            }
                                          }}
                                          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono border transition ${
                                            isComparing 
                                              ? "bg-amber-500/20 text-amber-500 border-amber-500" 
                                              : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                                          }`}
                                        >
                                          {isComparing ? "✓ Compared" : "+ Compare"}
                                        </button>

                                        {worker.passport && (
                                          <button
                                            type="button"
                                            onClick={() => setDiscoverPassportModal(worker)}
                                            className="px-2 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-[10px] font-mono text-slate-300 hover:text-white transition"
                                          >
                                            {lang === "hi" ? "पासपोर्ट" : "Passport"}
                                          </button>
                                        )}
                                      </div>

                                      <div className="flex items-center gap-1.5">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            handleVoiceSpeak(`कॉलिंग ${worker.name}`, `Calling ${worker.name}`);
                                            alert(`Initiating secure direct call connection to: +91 ${worker.phone}`);
                                          }}
                                          className="p-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-white transition"
                                          title="Call"
                                        >
                                          <Phone className="w-3.5 h-3.5" />
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() => {
                                            handleVoiceSpeak(`एसएमएस भेजा गया`, `SMS dispatch triggered`);
                                            alert(`Direct SMS Workforce broadcast dispatched to: +91 ${worker.phone}`);
                                          }}
                                          className="p-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-white transition"
                                          title="SMS"
                                        >
                                          <MessageSquare className="w-3.5 h-3.5" />
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() => setDiscoverInviteModal(worker)}
                                          className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-[10px] font-mono transition cursor-pointer shrink-0 uppercase"
                                        >
                                          {lang === "hi" ? "आमंत्रित" : "Invite"}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* DYNAMIC SUBSECTION: GIS MAP & SIDE PANELS IN ROW */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            
                            {/* GIS RADAR MAP COMPONENT */}
                            <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-900 text-left space-y-3">
                              <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                                <h5 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4 text-amber-500" />
                                  {lang === "hi" ? "निकटतम कार्यबल हीट मैप" : "Nearby Workforce Heat Map"}
                                </h5>
                                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono">
                                  GIS OK
                                </span>
                              </div>

                              <div className="relative h-44 bg-slate-900/40 rounded-xl border border-slate-850 flex flex-col justify-between p-3 overflow-hidden">
                                {/* Simulated GIS graphic */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                  <div className="w-36 h-36 border border-amber-500 rounded-full animate-ping" />
                                  <div className="w-24 h-24 border border-amber-500 rounded-full" />
                                  <div className="w-12 h-12 border border-amber-500 rounded-full" />
                                </div>
                                
                                <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 relative z-10">
                                  <span>GRID: 26.75° N, 83.37° E</span>
                                  <span>RADAR RADIUS: 10 KM</span>
                                </div>

                                <div className="space-y-1 text-center py-6 relative z-10">
                                  <span className="text-amber-500 font-extrabold text-xs block font-mono">GORAKHPUR DIRECT CENTRAL CORRIDOR</span>
                                  <p className="text-[10px] text-slate-400 font-mono">
                                    {lang === "hi" ? "वर्तमान स्थान: सहजनवा टाउनशिप / ५ किमी त्रिज्या" : "Contractor Location: Sahjanwa / Active Density Detected"}
                                  </p>
                                </div>

                                <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 relative z-10 border-t border-slate-900/80 pt-1.5">
                                  <span>{lang === "hi" ? "भविष्य जीआईएस एकीकरण तैयार" : "Future GIS integration ready."}</span>
                                  <span className="text-emerald-400 font-bold">162 ACTIVE LABOURS</span>
                                </div>
                              </div>
                            </div>

                            {/* DISCOVERY REAL-TIME TIMELINE */}
                            <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-900 text-left space-y-3">
                              <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                                <h5 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-1.5">
                                  <Clock className="w-4 h-4 text-amber-500" />
                                  {lang === "hi" ? "लाइव खोज गतिविधि फीड" : "Live Discovery Timeline"}
                                </h5>
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                              </div>

                              <div className="space-y-2.5 font-mono text-[10px]">
                                {[
                                  { textHi: "नया राजमिस्त्री ग्रिड पर उपलब्ध हुआ", textEn: "New Mason became available", time: "2 min ago" },
                                  { textHi: "सहजनवा में पेंटर प्रोफाइल सत्यापित हुई", textEn: "Painter profile verified in Sahjanwa", time: "7 min ago" },
                                  { textHi: "बिजली मिस्त्री ने आमंत्रण स्वीकार किया", textEn: "Electrician accepted project invitation", time: "15 min ago" },
                                  { textHi: "जीपीएस ग्रिड पिंग रिफ्रेश किया गया", textEn: "GPS grid ping telemetry refreshed", time: "22 min ago" },
                                  { textHi: "पासपोर्ट आईडी नंबर UP-74 सत्यापित हुआ", textEn: "Passport ID verification completed", time: "40 min ago" }
                                ].map((act, aIdx) => (
                                  <div key={aIdx} className="flex items-start justify-between gap-2 text-slate-400 border-l border-slate-900 pl-2 ml-1">
                                    <div className="space-y-0.5">
                                      <span className="text-white block font-bold text-[11px] leading-tight">
                                        {lang === "hi" ? act.textHi : act.textEn}
                                      </span>
                                    </div>
                                    <span className="text-slate-500 shrink-0 text-[9px]">{act.time}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* REVENUE & DEMAND WORKFORCE INSIGHTS */}
                          <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-900 text-left space-y-4">
                            <div className="border-b border-slate-900 pb-2 flex items-center justify-between">
                              <h5 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-1.5">
                                <TrendingUp className="w-4 h-4 text-amber-500" />
                                {lang === "hi" ? "कार्यबल अंतर्दृष्टि और बाजार विश्लेषण" : "Workforce Demands & Grid Analytics"}
                              </h5>
                              <span className="text-[9px] text-slate-500 font-mono">Q3 CENTRAL DATA</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-[11px]">
                              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-850">
                                <span className="text-[8px] text-slate-500 block uppercase">{lang === "hi" ? "टॉप ट्रेड" : "TOP TRADE"}</span>
                                <span className="text-white font-bold block mt-0.5">{lang === "hi" ? "राजमिस्त्री" : "Mason"}</span>
                              </div>
                              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-850">
                                <span className="text-[8px] text-slate-500 block uppercase">{lang === "hi" ? "तेजी से बढ़ता" : "FASTEST GROWING"}</span>
                                <span className="text-white font-bold block mt-0.5">{lang === "hi" ? "इलेक्ट्रीशियन" : "Electrician"}</span>
                              </div>
                              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-850">
                                <span className="text-[8px] text-slate-500 block uppercase">{lang === "hi" ? "उच्च मांग" : "HIGH DEMAND"}</span>
                                <span className="text-white font-bold block mt-0.5">{lang === "hi" ? "पेंटर" : "Painter"}</span>
                              </div>
                              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-850">
                                <span className="text-[8px] text-slate-500 block uppercase">{lang === "hi" ? "औसत मजदूरी" : "AVG WAGE"}</span>
                                <span className="text-emerald-400 font-bold block mt-0.5">₹742</span>
                              </div>
                              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-850">
                                <span className="text-[8px] text-slate-500 block uppercase">{lang === "hi" ? "सक्रिय जिला" : "ACTIVE DISTRICT"}</span>
                                <span className="text-white font-bold block mt-0.5">{lang === "hi" ? "गोरखपुर" : "Gorakhpur"}</span>
                              </div>
                              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-850">
                                <span className="text-[8px] text-slate-500 block uppercase">{lang === "hi" ? "औसत उपस्थिति" : "ATTENDANCE"}</span>
                                <span className="text-emerald-400 font-bold block mt-0.5">96%</span>
                              </div>
                            </div>
                          </div>

                          {/* RECOMENDATION SHORTCUT BUTTONS PANEL */}
                          <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-900 text-left space-y-3">
                            <h5 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">{lang === "hi" ? "त्वरित एआई अनुशंसित फ़िल्टर" : "AI Recommendation Filters"}</h5>
                            <div className="flex flex-wrap gap-2 text-xs font-mono">
                              {[
                                { hi: "अनुशंसित कामगार", en: "Suggested Workers", action: () => { setDiscoverSort("Highest Match"); handleVoiceSpeak("सर्वोत्तम मैच क्रम सक्रिय", "Highest AI Match sorting activated."); } },
                                { hi: "स्वीकार करने की संभावना", en: "Likely to Accept", action: () => { setDiscoverSort("Highest Trust"); handleVoiceSpeak("उच्चतम ट्रस्ट स्कोर श्रेणी", "Highest Trust filter activated."); } },
                                { hi: "निकटतम टीम", en: "Nearby Teams", action: () => { setDiscoverDistance("Within 5 km"); handleVoiceSpeak("५ किमी दूरी त्रिज्या सक्रिय", "Distance filter set to Within 5 km."); } },
                                { hi: "दोबारा बुलाए गए कामगार", en: "Repeat Workers", action: () => { setDiscoverExp("5-10 Years"); handleVoiceSpeak("५ से १० वर्ष के अनुभवी कामगार", "Experience filter set to 5-10 Years."); } },
                                { hi: "उच्च ट्रस्ट कामगार", en: "High Trust Workers", action: () => { setDiscoverSort("Highest Trust"); handleVoiceSpeak("उच्चतम रेटिंग क्रम सक्रिय", "Highest Trust sorting applied."); } },
                                { hi: "कौशल प्रमाणित कामगार", en: "Skill Certified Workers", action: () => { setDiscoverSkill(true); handleVoiceSpeak("केवल प्रमाणित कामगार चुने गए", "NSTI Skill Certification checkbox enabled."); } }
                              ].map((rec, rIdx) => (
                                <button
                                  key={rIdx}
                                  type="button"
                                  onClick={rec.action}
                                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-400 border border-slate-800 rounded-xl transition cursor-pointer"
                                >
                                  {lang === "hi" ? rec.hi : rec.en}
                                </button>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* PASSPORT MODAL OVERLAY */}
                      {discoverPassportModal && (
                        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
                          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl text-left animate-scaleIn">
                            <button
                              type="button"
                              onClick={() => setDiscoverPassportModal(null)}
                              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
                            >
                              <X className="w-5 h-5" />
                            </button>
                            <div className="border-b border-slate-800 pb-3 mb-4">
                              <span className="text-[9px] text-amber-500 font-mono tracking-widest block uppercase font-bold">MINISTRY OF SKILL DEVELOPMENT & ENTREPRENEURSHIP</span>
                              <h4 className="text-sm font-extrabold text-white font-mono mt-0.5">{lang === "hi" ? "डिजिटल लेबर पासपोर्ट" : "Digital Labour Passport ID"}</h4>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-855 space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-slate-950 text-base font-mono bg-gradient-to-tr from-amber-500 to-amber-300">
                                  {discoverPassportModal.name.split(" ").map((n: string) => n[0]).join("")}
                                </div>
                                <div className="space-y-0.5 text-xs text-left">
                                  <span className="text-white font-extrabold text-sm block">{discoverPassportModal.name}</span>
                                  <span className="text-amber-500 font-mono font-bold block">{lang === "hi" ? "कुशल कामगार" : discoverPassportModal.trade}</span>
                                  <span className="text-[10px] text-slate-400 block font-mono">UID: {discoverPassportModal.passportId}</span>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3 text-[10px] font-mono pt-2 border-t border-slate-900 text-left">
                                <div>
                                  <span className="text-slate-500 block">AADHAAR SECURED</span>
                                  <span className="text-emerald-400 font-bold">✓ VERIFIED LINKAGE</span>
                                </div>
                                <div>
                                  <span className="text-slate-500 block">POLICE VERIFICATION</span>
                                  <span className="text-emerald-400 font-bold">✓ COMPLETED</span>
                                </div>
                                <div>
                                  <span className="text-slate-500 block">SKILL CERTIFICATION</span>
                                  <span className="text-amber-400 font-bold">✓ NSTI LEVEL-1</span>
                                </div>
                                <div>
                                  <span className="text-slate-500 block">CURRENT STATUS</span>
                                  <span className="text-emerald-400 font-bold">● ONLINE ACTIVE</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex gap-2.5">
                              <button
                                type="button"
                                onClick={() => {
                                  handleVoiceSpeak("लेबर पासपोर्ट विवरण सत्यापित किया गया है।", "Labour Passport details verified successfully.");
                                  alert("Labour Passport Verified Offline / Cryptographic signatures checked.");
                                  setDiscoverPassportModal(null);
                                }}
                                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition cursor-pointer"
                              >
                                {lang === "hi" ? "सत्यापन की पुष्टि करें" : "Confirm Verification"}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* INVITATION DISPATCH MODAL OVERLAY */}
                      {discoverInviteModal && (
                        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
                          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl text-left animate-scaleIn">
                            <button
                              type="button"
                              onClick={() => setDiscoverInviteModal(null)}
                              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
                            >
                              <X className="w-5 h-5" />
                            </button>
                            <div className="border-b border-slate-800 pb-3 mb-4">
                              <h4 className="text-sm font-bold text-white font-mono">{lang === "hi" ? "ग्रिड कामगार आमंत्रण प्रेषण" : "Dispatch Grid Worker Invitation"}</h4>
                              <p className="text-[11px] text-slate-400 mt-0.5">{lang === "hi" ? "कामगार के पंजीकृत मोबाइल नंबर पर सीधा सरकारी नौकरी प्रस्ताव भेजें।" : "Sends instant official project job offer to worker's registered mobile."}</p>
                            </div>
                            <div className="space-y-4 text-xs text-left">
                              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-855">
                                <span className="text-slate-500 text-[10px] font-mono block">RECIPIENT WORKER</span>
                                <span className="text-white font-bold block mt-0.5 text-sm">{discoverInviteModal.name} ({discoverInviteModal.trade})</span>
                                <span className="text-slate-400 block mt-0.5 text-[10px] font-mono">Suggested daily rate: ₹{discoverInviteModal.wage}/Day</span>
                              </div>

                              <label className="block">
                                <span className="text-slate-400 font-bold block mb-1">Contract Daily Wage (₹)</span>
                                <input
                                  type="number"
                                  defaultValue={discoverInviteModal.wage}
                                  className="w-full bg-slate-950 border border-slate-800 text-white px-3 py-2 rounded-xl text-xs outline-none"
                                />
                              </label>

                              <label className="block">
                                <span className="text-slate-400 font-bold block mb-1">Project Work Site Location</span>
                                <input
                                  type="text"
                                  placeholder="Gorakhpur Bypass Corridor Project, Site 4"
                                  className="w-full bg-slate-950 border border-slate-800 text-white px-3 py-2 rounded-xl text-xs outline-none"
                                />
                              </label>

                              <button
                                type="button"
                                onClick={() => {
                                  handleVoiceSpeak(`आमंत्रण सफलतापूर्वक प्रेषित किया गया।`, `Invitation successfully dispatched to ${discoverInviteModal.name}.`);
                                  setDiscoverToast(lang === "hi" ? `${discoverInviteModal.name} को सीधे एसएमएस द्वारा निमंत्रण भेजा गया!` : `Invitation successfully sent to ${discoverInviteModal.name}!`);
                                  setDiscoverInviteModal(null);
                                  setTimeout(() => setDiscoverToast(null), 4000);
                                }}
                                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold rounded-xl transition cursor-pointer"
                              >
                                {lang === "hi" ? "निमंत्रण प्रेषित करें" : "Dispatch Invitation Offer"}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* DYNAMIC SUCCESS TOAST NOTIFICATION */}
                      {discoverToast && (
                        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/30 px-4 py-3 rounded-2xl flex items-center gap-2 text-xs text-white shadow-xl animate-bounce">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="font-mono">{discoverToast}</span>
                        </div>
                      )}

                    </div>
                  )}

                  {/* Panel: Post Requirement */}
                  {contractorActionModal === "post" && (
                    <div className="space-y-4 text-left">
                      <div className="border-b border-slate-900 pb-2">
                        <h5 className="text-sm font-bold text-white font-mono">{lang === "hi" ? "नई श्रम आवश्यकता पोस्ट करें" : "Post New Project Labour Requirement"}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">{lang === "hi" ? "इससे निकटतम संबंधित कामगारों के मोबाइल पर एसएमएस द्वारा अलर्ट जाएगा।" : "Instantly broadcasts requirement to verified matching talent grid."}</p>
                      </div>
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!newReqTitleHi || !newReqTitleEn) {
                            alert("कृपया शीर्षक भरें! / Please enter titles!");
                            return;
                          }
                          const newReq = {
                            id: `cr-${Date.now()}`,
                            titleHi: newReqTitleHi,
                            titleEn: newReqTitleEn,
                            tradeHi: newReqTrade === "Mason" ? "राजमिस्त्री" : "विद्युत कारीगर / मजदूर",
                            tradeEn: newReqTrade,
                            open: parseInt(newReqCount) || 5,
                            filled: 0,
                            pending: parseInt(newReqCount) || 5,
                            workersCount: parseInt(newReqCount) || 5,
                            locationHi: "गोरखपुर औद्योगिक क्षेत्र",
                            locationEn: "Gorakhpur Industrial Area",
                            expectedWage: "₹750 / Day",
                            duration: "1 Month",
                            startDate: "2026-07-06",
                            experience: "3+ Years",
                            status: "OPEN",
                            applicantsCount: 0,
                            applied: [],
                            invited: [],
                            shortlisted: [],
                            confirmed: [],
                            completed: [],
                            cancelled: [],
                            timeline: ["Requirement Created"]
                          };
                          setContractorRequirements([newReq, ...contractorRequirements]);
                          setNewReqTitleHi("");
                          setNewReqTitleEn("");
                          setContractorActionModal(null);
                          handleVoiceSpeak(
                            "आवश्यकता सफलतापूर्वक पोस्ट कर दी गई है।",
                            "Requirement has been published to National labor grid."
                          );
                          alert("सफलतापूर्वक श्रम मांग पोस्ट की गई! / Labor demand posted successfully!");
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs"
                      >
                        <div>
                          <label className="block text-slate-400 mb-1">प्रोजेक्ट नाम (Hindi) *</label>
                          <input
                            type="text"
                            required
                            placeholder="जैसे: GIDA फैक्ट्री निर्माण चरण २"
                            value={newReqTitleHi}
                            onChange={(e) => setNewReqTitleHi(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 text-white px-3 py-2 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">Project Name (English) *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. GIDA Factory Phase 2 Construction"
                            value={newReqTitleEn}
                            onChange={(e) => setNewReqTitleEn(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 text-white px-3 py-2 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">आवश्यक ट्रेड / Core Trade Needed</label>
                          <select
                            value={newReqTrade}
                            onChange={(e) => setNewReqTrade(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 text-white px-3 py-2 rounded-lg text-xs"
                          >
                            <option value="Mason">Mason / राजमिस्त्री</option>
                            <option value="Painter">Painter / पेंटर</option>
                            <option value="Electrician">Electrician / बिजली मिस्त्री</option>
                            <option value="Helper">Helper / सहायक मजदूर</option>
                            <option value="Carpenter">Carpenter / बढ़ई</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">मजदूरों की संख्या / Required Count</label>
                          <input
                            type="number"
                            value={newReqCount}
                            onChange={(e) => setNewReqCount(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 text-white px-3 py-2 rounded-lg text-xs font-mono"
                          />
                        </div>
                        <div className="md:col-span-2 flex justify-end pt-2">
                          <button
                            type="submit"
                            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-xs"
                          >
                            {lang === "hi" ? "राष्ट्रीय ग्रिड पर पोस्ट करें" : "Deploy Demand to National Grid"}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Panel: Invite Worker */}
                  {contractorActionModal === "invite" && (
                    <div className="space-y-4 text-left">
                      <div className="border-b border-slate-900 pb-2">
                        <h5 className="text-sm font-bold text-white font-mono">{lang === "hi" ? "कामगारों को विशेष कार्य निमंत्रण भेजें" : "Dispatch Direct Work Invitations"}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">{lang === "hi" ? "पसंदीदा कामगारों को विशेष दैनिक दरों के साथ आमंत्रित करें" : "Engage matching tradespeople directly via unified state gateway"}</p>
                      </div>
                      <div className="space-y-2">
                        {[
                          { name: "Suresh Maurya", tradeHi: "राजमिस्त्री", tradeEn: "Mason", exp: "7 Years", wage: "650" },
                          { name: "Amit Vishwakarma", tradeHi: "बिजली मिस्त्री", tradeEn: "Electrician", exp: "5 Years", wage: "700" },
                          { name: "Karan Bahadur", tradeHi: "शटरिंग कारपेंटर", tradeEn: "Carpenter", exp: "10 Years", wage: "800" }
                        ].map((w, idx) => (
                          <div key={idx} className="bg-slate-900 p-3 rounded-lg border border-slate-850 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
                            <div>
                              <span className="font-bold text-white block">{w.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{lang === "hi" ? w.tradeHi : w.tradeEn} | Exp: {w.exp} | Expected: ₹{w.wage}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-500 font-mono">Offer Rate: ₹{w.wage}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  alert(`कार्य निमंत्रण ${w.name} को सीधे भेजा गया! / Secured invitation dispatch link initialized.`);
                                }}
                                className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded text-[10px]"
                              >
                                {lang === "hi" ? "भेजें" : "Dispatch Invitation"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Panel: View Applications */}
                  {contractorActionModal === "applications" && (
                    <div className="space-y-4 text-left">
                      <div className="border-b border-slate-900 pb-2">
                        <h5 className="text-sm font-bold text-white font-mono">{lang === "hi" ? "प्राप्त नौकरियों के आवेदन" : "Pending Job Applications"}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">{lang === "hi" ? "सत्यापित कामगार जिन्होंने आपके प्रोजेक्ट्स के लिए आवेदन किया है" : "Review digital passport credentials of applied workers"}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-850 flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-white">राम सिंह (Rajmistri)</span>
                            <span className="text-[10px] text-slate-400 block font-mono mt-0.5">Passport: LP-IND-99201-A | Exp: 8 Years</span>
                            <span className="text-[9px] text-emerald-400 block mt-1">Verification Status: Aadhaar Verified Profile</span>
                          </div>
                          <div className="flex gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                alert("आवेदन स्वीकृत किया गया। राम सिंह का डिजिटल श्रम संबंध सक्रिय है। / Application accepted.");
                                setContractorActionModal(null);
                              }}
                              className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded text-[10px]"
                            >
                              {lang === "hi" ? "स्वीकारें" : "Accept"}
                            </button>
                            <button
                              type="button"
                              onClick={() => alert("अस्वीकृत / Declined")}
                              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded text-[10px]"
                            >
                              {lang === "hi" ? "अस्वीकार" : "Decline"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Panel: Manage Workforce */}
                  {contractorActionModal === "workforce" && (
                    <div className="space-y-4 text-left font-mono">
                      <div className="border-b border-slate-900 pb-2">
                        <h5 className="text-sm font-bold text-white">{lang === "hi" ? "सक्रिय कार्यबल प्रबंधन पोर्टल" : "Manage Dispatched Workforce"}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">{lang === "hi" ? "आपके सभी प्रोजेक्ट्स के सक्रिय मजदूर" : "Live telemetry, logs, and communication with dispatched laborers"}</p>
                      </div>
                      <div className="space-y-2 text-xs">
                        {[
                          { name: "Manoj Kumar", trade: "Mason", site: "GIDA Bridge Project", status: "Present (Checked In)", coords: "26.7606, 83.3731" },
                          { name: "Sanjay Yadav", trade: "Helper", site: "GIDA Bridge Project", status: "Present (Checked In)", coords: "26.7607, 83.3733" }
                        ].map((w, idx) => (
                          <div key={idx} className="bg-slate-900 p-3 rounded-lg border border-slate-850 flex justify-between items-center">
                            <div>
                              <span className="font-bold text-white block">{w.name} ({w.trade})</span>
                              <span className="text-[10px] text-slate-500 block">Site: {w.site}</span>
                              <span className="text-[9px] text-slate-400 block mt-1">GPS Lock: {w.coords} (Verified Area)</span>
                            </div>
                            <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                              {w.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Panel: Passport */}
                  {contractorActionModal === "passport" && (
                    <div className="space-y-4 text-left">
                      <div className="border-b border-slate-900 pb-2">
                        <h5 className="text-sm font-bold text-white font-mono">{lang === "hi" ? "सत्यापित राष्ट्रीय डिजिटल कांट्रेक्टर पासपोर्ट" : "Verified National Digital Contractor Passport ID"}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">{lang === "hi" ? "यह पासपोर्ट भारत के किसी भी राष्ट्रीय विकास गलियारे में वैध है।" : "Government of India authenticated contractor registration pass certificate"}</p>
                      </div>
                      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/20 border-2 border-amber-500/40 rounded-2xl p-5 relative overflow-hidden max-w-sm mx-auto shadow-2xl">
                        {/* Gov Seal background */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center font-bold text-8xl text-amber-500">GOVT</div>
                        
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
                          <span className="text-[10px] font-bold text-amber-500 tracking-wider">SECURE NATIONAL CONTRACTOR PASS</span>
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono uppercase font-bold">STATE VERIFIED</span>
                        </div>
                        <div className="space-y-2.5 text-[11px] mt-4 font-mono">
                          <div className="flex justify-between">
                            <span className="text-slate-500">PASSPORT ID:</span>
                            <span className="text-white font-bold">CON-IND-839210-B</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">HOLDER:</span>
                            <span className="text-white font-bold">{loggedInUser.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">COMPANY:</span>
                            <span className="text-white font-bold">{regCompany || "Prasad Labour Supplies"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">OPERATIONS:</span>
                            <span className="text-white font-bold">Gorakhpur GIDA Cluster</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">VALIDITY:</span>
                            <span className="text-amber-500 font-bold">LIFETIME / PORTABLE</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* ========================================================== */}
            {/* NATIONAL HIRING WORKSPACE & MATCHING ENGINE (PROMPT-09F) */}
            {/* ========================================================== */}
            <div id="national-hiring-workspace" className="bg-slate-950/60 p-6 rounded-3xl border border-slate-800 space-y-6 mt-6">
              
              {/* Header section with Bilingual Speech trigger */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 rounded-2xl shadow-xl border border-amber-400/20">
                    <TrendingUp className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white font-mono tracking-tight flex items-center gap-2">
                      {lang === "hi" ? "राष्ट्रीय भर्ती कार्यक्षेत्र और एआई मिलान इंजन" : "National Hiring Workspace & AI Matching Engine"}
                      <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase animate-pulse">V2.0 Core</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {lang === "hi" 
                        ? "अखिल भारतीय कौशल वर्गीकरण के तहत कामगारों की खोज, नियुक्ति और डिजिटल वर्क ऑर्डर जारी करने का एकीकृत कक्ष।" 
                        : "Unified console for searching, shortlisting, sending digital job offers, and issuing state-verifiable work orders."}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleVoiceSpeak(
                    "राष्ट्रीय भर्ती कार्यक्षेत्र में आपका स्वागत है। यहाँ आप अपनी कार्य आवश्यकताओं को प्रबंधित कर सकते हैं, उपलब्ध कामगारों से मिलान कर सकते हैं, और सीधे डिजिटल काम के आदेश जारी कर सकते हैं।",
                    "Welcome to the National Hiring Workspace. Manage your core project demands, run automated matchmaker scans, and execute digital employment agreements on the fly."
                  )}
                  className="p-2 px-3 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 rounded-xl border border-amber-500/25 transition cursor-pointer flex items-center gap-2 text-xs font-semibold self-start md:self-center"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{lang === "hi" ? "कार्यक्षेत्र मार्गदर्शिका" : "Workspace Audio Guide"}</span>
                </button>
              </div>

              {/* HIRING ANALYTICS ROW */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    titleHi: "नियुक्ति सफलता दर",
                    titleEn: "Hiring Success %",
                    value: "94.2%",
                    descHi: "सफलतापूर्वक पूर्ण संबंध",
                    descEn: "Successful agreements",
                    color: "text-emerald-400",
                    trend: "+2.4%"
                  },
                  {
                    titleHi: "ऑफ़र स्वीकृति दर",
                    titleEn: "Acceptance Rate",
                    value: "88.6%",
                    descHi: "कामगारों द्वारा स्वीकृत निमंत्रण",
                    descEn: "Invitations accepted",
                    color: "text-amber-500",
                    trend: "+1.8%"
                  },
                  {
                    titleHi: "औसत प्रतिक्रिया समय",
                    titleEn: "Avg Response Time",
                    value: "14 min",
                    descHi: "त्वरित मोबाइल प्रतिक्रिया समय",
                    descEn: "Rapid SMS action loop",
                    color: "text-white",
                    trend: "-3 min"
                  },
                  {
                    titleHi: "कामगार प्रतिधारण और दोहराव",
                    titleEn: "Worker Retention",
                    value: "91.5%",
                    descHi: "दोबारा बुलाए गए कामगार",
                    descEn: "Repeat hired labor",
                    color: "text-blue-400",
                    trend: "35 workers"
                  }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-slate-900/40 p-4 rounded-2xl border border-slate-850 hover:border-slate-800 transition text-left flex flex-col justify-between min-h-[110px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 h-1.5 w-12 bg-amber-500/20 group-hover:bg-amber-500/40 transition" />
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono uppercase block">{lang === "hi" ? stat.titleHi : stat.titleEn}</span>
                      <span className={`text-2xl font-black ${stat.color} font-mono mt-1 block`}>{stat.value}</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-950">
                      <span>{lang === "hi" ? stat.descHi : stat.descEn}</span>
                      <span className="text-emerald-400 font-bold">{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* INTEGRATED MONTHLY TREND AND OTHER ANALYTICS SPARK CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-slate-900/30 p-4 rounded-2xl border border-slate-850 text-left font-mono space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-950 pb-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lang === "hi" ? "मासिक भर्ती रुझान" : "Monthly Hiring Trend"}</span>
                    <span className="text-[9px] text-emerald-400 font-bold">● LIVE CORRIDOR DATA</span>
                  </div>
                  <div className="flex items-end justify-between h-20 pt-2 px-2 gap-2">
                    {[
                      { month: "Jan", count: 45 },
                      { month: "Feb", count: 58 },
                      { month: "Mar", count: 72 },
                      { month: "Apr", count: 85 },
                      { month: "May", count: 110 },
                      { month: "Jun", count: 124 },
                      { month: "Jul (Est)", count: 140 }
                    ].map((data, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div className="text-[8px] text-slate-500 font-bold opacity-0 group-hover:opacity-100 transition leading-none">{data.count}</div>
                        <div 
                          className="w-full bg-slate-800 group-hover:bg-amber-500 rounded-t-sm transition-all duration-300"
                          style={{ height: `${(data.count / 140) * 100}%` }}
                        />
                        <div className="text-[8px] text-slate-400 uppercase tracking-tight">{data.month}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/30 p-4 rounded-2xl border border-slate-850 text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-950 pb-2">
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">{lang === "hi" ? "सक्रिय अनुबंध मेट्रिक्स" : "Active Contract Metrics"}</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between border-b border-slate-950 pb-1 text-[11px]">
                      <span className="text-slate-500">Current Active Contracts:</span>
                      <span className="font-bold text-white">12</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-950 pb-1 text-[11px]">
                      <span className="text-slate-500">Jobs Completed Successfully:</span>
                      <span className="font-bold text-emerald-400">156</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Jobs Cancelled / Disrupted:</span>
                      <span className="font-bold text-red-400">3</span>
                    </div>
                  </div>
                  <div className="p-2 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-center text-[9px] text-emerald-400 font-mono uppercase font-bold tracking-wider">
                    ✓ Clean Compliance & Direct Bank Transfer Active
                  </div>
                </div>
              </div>

              {/* ========================================================== */}
              {/* NATIONAL JOB POSTING ENGINE (PROMPT-10A)                   */}
              {/* ========================================================== */}
              <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-6 relative overflow-hidden">
                
                {/* Simulated Toast Engines */}
                {jpeSuccessToast && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-start gap-3 text-left animate-fadeIn">
                    <div className="p-1.5 bg-emerald-500 text-slate-950 rounded-lg shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider block">NATIONAL GRID BROADCAST COMPLETED</span>
                      <p className="text-xs text-white mt-1 leading-normal">{jpeSuccessToast}</p>
                    </div>
                    <button onClick={() => setJpeSuccessToast(null)} className="text-slate-400 hover:text-white shrink-0">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {jpeMatchingToast && (
                  <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-start gap-3 text-left animate-fadeIn">
                    <div className="p-1.5 bg-amber-500 text-slate-950 rounded-lg shrink-0">
                      <TrendingUp className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] text-amber-500 font-mono font-bold uppercase tracking-wider block">AI SMART MATCHMAKER SCANNING TRADES</span>
                      <p className="text-xs text-white mt-1 leading-normal">{jpeMatchingToast}</p>
                    </div>
                    <button onClick={() => setJpeMatchingToast(null)} className="text-slate-400 hover:text-white shrink-0">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Animated Publishing Overlay */}
                {jpeIsPublishing && (
                  <div className="absolute inset-0 bg-slate-950/95 z-50 rounded-3xl flex flex-col items-center justify-center p-6 text-center animate-fadeIn border border-amber-500/30">
                    <div className="relative w-16 h-16 mb-5">
                      <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-t-amber-500 rounded-full animate-spin"></div>
                      <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center font-mono text-[10px] font-bold text-amber-500">
                        Grid
                      </div>
                    </div>
                    
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2">
                      {lang === "hi" ? "राष्ट्रीय ग्रिड प्रसारण प्रक्रिया" : "National Grid Broadcasting Sequence"}
                    </h4>
                    
                    <div className="space-y-2 max-w-sm w-full font-mono text-[11px] text-left">
                      {[
                        { step: 1, labelEn: "Publishing requirement details...", labelHi: "आवश्यकता विवरण प्रकाशित किया जा रहा है..." },
                        { step: 2, labelEn: "Verifying Contractor Digital Passport...", labelHi: "ठेकेदार डिजिटल पासपोर्ट सत्यापित किया जा रहा है..." },
                        { step: 3, labelEn: "Checking local district grid capacity...", labelHi: "स्थानीय जिला ग्रिड क्षमता की जांच..." },
                        { step: 4, labelEn: "Matching active nearby worker trades...", labelHi: "सक्रिय नजदीकी कामगार कौशल का मिलान..." },
                        { step: 5, labelEn: "Connecting to National Labour Grid system...", labelHi: "राष्ट्रीय श्रम ग्रिड प्रणाली से जोड़ा जा रहा है..." },
                        { step: 6, labelEn: "Success! Broadcast complete.", labelHi: "सफलता! राष्ट्रीय ग्रिड प्रसारण पूर्ण।" }
                      ].map((s) => {
                        const isCompleted = jpePublishStep > s.step;
                        const isActive = jpePublishStep === s.step;
                        return (
                          <div key={s.step} className="flex items-center gap-2">
                            <span className={isCompleted ? "text-emerald-400" : isActive ? "text-amber-500 animate-pulse" : "text-slate-700"}>
                              {isCompleted ? "✓" : isActive ? "●" : "○"}
                            </span>
                            <span className={isCompleted ? "text-slate-300" : isActive ? "text-white font-bold" : "text-slate-600"}>
                              {lang === "hi" ? s.labelHi : s.labelEn}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Section Title Header */}
                <div className="flex justify-between items-start border-b border-slate-900 pb-3">
                  <div>
                    <h4 className="text-sm font-extrabold text-white font-mono tracking-tight uppercase flex items-center gap-2">
                      {lang === "hi" ? "राष्ट्रीय श्रम ग्रिड नौकरी विज्ञापन इंजन" : "National Job Posting Engine"}
                      <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded font-mono uppercase font-bold tracking-widest animate-pulse">Broadcaster Active</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {lang === "hi" ? "राष्ट्रीय श्रम ग्रिड के लिए सत्यापित कार्यबल आवश्यकताओं का सृजन करें।" : "Create verified labour requirements for the National Labour Grid."}
                    </p>
                  </div>
                </div>

                {/* Workspace Analytics Strip */}
                <div className="bg-slate-950/40 p-3.5 rounded-2xl border border-slate-900 grid grid-cols-2 md:grid-cols-5 gap-4 text-xs text-left font-mono">
                  <div>
                    <span className="text-[9px] text-slate-500 block">TODAY&apos;S POSTS</span>
                    <span className="font-extrabold text-white text-sm block mt-0.5">{4 + jpePendingJobsOffset}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block">ACTIVE HIRING</span>
                    <span className="font-extrabold text-amber-500 text-sm block mt-0.5">12</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block">AVERAGE WAGE</span>
                    <span className="font-extrabold text-emerald-400 text-sm block mt-0.5">₹750/Day</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block">TOTAL WORKERS NEEDED</span>
                    <span className="font-extrabold text-white text-sm block mt-0.5">45</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block">ACCEPTANCE RATE</span>
                    <span className="font-extrabold text-amber-500 text-sm block mt-0.5">88.6%</span>
                  </div>
                </div>

                {/* Main Split Layout: Form (Col 8) + Sidebar Preview & Timeline (Col 4) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Form Container */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Project Title */}
                      <div className="md:col-span-2">
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "प्रोजेक्ट का शीर्षक *" : "Project Title *"}</span>
                          <input
                            type="text"
                            placeholder={lang === "hi" ? "जैसे: मेट्रो कंक्रीट प्लास्टर" : "e.g. Metro Concrete Plastering"}
                            required
                            value={jpeTitle}
                            onChange={(e) => setJpeTitle(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none focus:border-amber-500"
                          />
                        </label>
                      </div>

                      {/* Trade Dropdown */}
                      <div>
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "आवश्यक पेशा *" : "Trade Required *"}</span>
                          <select
                            value={jpeTrade}
                            onChange={(e) => setJpeTrade(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none h-10"
                          >
                            {["Mason", "Electrician", "Painter", "Plumber", "Carpenter", "Welder", "Construction Labour", "Helper", "Agricultural Worker", "Driver", "Mechanic", "Tailor", "Security Guard", "Cook", "Housekeeping", "Others"].map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </label>
                      </div>

                      {/* Workers Required */}
                      <div>
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "आवश्यक मजदूरों की संख्या *" : "Workers Required *"}</span>
                          <input
                            type="number"
                            placeholder="12"
                            min="1"
                            required
                            value={jpeWorkers}
                            onChange={(e) => setJpeWorkers(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none font-mono"
                          />
                        </label>
                      </div>

                      {/* Expected Wage */}
                      <div>
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "अपेक्षित दैनिक वेतन (₹) *" : "Expected Wage (₹) *"}</span>
                          <input
                            type="number"
                            placeholder="750"
                            min="1"
                            required
                            value={jpeWage}
                            onChange={(e) => setJpeWage(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none font-mono"
                          />
                        </label>
                      </div>

                      {/* Payment Type */}
                      <div>
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "भुगतान आवृत्ति" : "Payment Type"}</span>
                          <select
                            value={jpePaymentType}
                            onChange={(e) => setJpePaymentType(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none h-10"
                          >
                            {["Daily", "Hourly", "Weekly", "Monthly", "Task Based"].map(p => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                        </label>
                      </div>

                      {/* Duration */}
                      <div>
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "कार्य अवधि" : "Work Duration"}</span>
                          <select
                            value={jpeDuration}
                            onChange={(e) => setJpeDuration(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none h-10"
                          >
                            {["1 Day", "3 Days", "1 Week", "2 Weeks", "1 Month", "2 Months", "3 Months", "6 Months"].map(d => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </label>
                      </div>

                      {/* Joining Date */}
                      <div>
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "जॉइनिंग तिथि *" : "Joining Date *"}</span>
                          <input
                            type="date"
                            required
                            value={jpeJoiningDate}
                            onChange={(e) => setJpeJoiningDate(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none font-mono h-10"
                          />
                        </label>
                      </div>

                      {/* State Dropdown */}
                      <div>
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "राज्य *" : "State *"}</span>
                          <select
                            value={jpeState}
                            onChange={(e) => {
                              setJpeState(e.target.value);
                              // Auto district fallback for schema validation
                              if (e.target.value === "Uttar Pradesh") setJpeDistrict("Gorakhpur");
                              else if (e.target.value === "Bihar") setJpeDistrict("Patna");
                              else if (e.target.value === "Jharkhand") setJpeDistrict("Ranchi");
                              else if (e.target.value === "Madhya Pradesh") setJpeDistrict("Bhopal");
                              else if (e.target.value === "Delhi") setJpeDistrict("Central Delhi");
                              else if (e.target.value === "Odisha") setJpeDistrict("Bhubaneswar");
                              else if (e.target.value === "Rajasthan") setJpeDistrict("Jaipur");
                              else if (e.target.value === "Karnataka") setJpeDistrict("Bengaluru");
                            }}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none h-10"
                          >
                            {["Uttar Pradesh", "Bihar", "Jharkhand", "Madhya Pradesh", "Delhi", "Odisha", "Rajasthan", "Karnataka"].map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </label>
                      </div>

                      {/* District Dropdown */}
                      <div>
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "जिला *" : "District *"}</span>
                          <select
                            value={jpeDistrict}
                            onChange={(e) => setJpeDistrict(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none h-10"
                          >
                            {jpeState === "Uttar Pradesh" && ["Gorakhpur", "Lucknow", "Kanpur", "Varanasi", "Prayagraj", "Jhansi", "Noida"].map(d => <option key={d} value={d}>{d}</option>)}
                            {jpeState === "Bihar" && ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"].map(d => <option key={d} value={d}>{d}</option>)}
                            {jpeState === "Jharkhand" && ["Ranchi", "Jamshedpur", "Dhanbad"].map(d => <option key={d} value={d}>{d}</option>)}
                            {jpeState === "Madhya Pradesh" && ["Bhopal", "Indore", "Gwalior"].map(d => <option key={d} value={d}>{d}</option>)}
                            {jpeState === "Delhi" && ["Central Delhi", "South Delhi", "East Delhi"].map(d => <option key={d} value={d}>{d}</option>)}
                            {jpeState === "Odisha" && ["Bhubaneswar", "Cuttack", "Rourkela"].map(d => <option key={d} value={d}>{d}</option>)}
                            {jpeState === "Rajasthan" && ["Jaipur", "Jodhpur", "Udaipur"].map(d => <option key={d} value={d}>{d}</option>)}
                            {jpeState === "Karnataka" && ["Bengaluru", "Mysore", "Hubli"].map(d => <option key={d} value={d}>{d}</option>)}
                            {!["Uttar Pradesh", "Bihar", "Jharkhand", "Madhya Pradesh", "Delhi", "Odisha", "Rajasthan", "Karnataka"].includes(jpeState) && <option value="Central Grid">Central Grid</option>}
                          </select>
                        </label>
                      </div>

                      {/* Site Address */}
                      <div className="md:col-span-2">
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "साइट का पता (वैकल्पिक)" : "Exact Site Address (Optional)"}</span>
                          <input
                            type="text"
                            placeholder="e.g. Sector 5 GIDA, Sahjanwa Road, Gorakhpur"
                            value={jpeAddress}
                            onChange={(e) => setJpeAddress(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none focus:border-amber-500"
                          />
                        </label>
                      </div>

                      {/* Toggles Strip */}
                      <div className="grid grid-cols-3 gap-3 md:col-span-2">
                        <div>
                          <label className="block text-left">
                            <span className="text-[10px] text-slate-400 font-bold block">{lang === "hi" ? "आवास उपलब्ध" : "Accommodation"}</span>
                            <select
                              value={jpeAccommodation}
                              onChange={(e) => setJpeAccommodation(e.target.value)}
                              className="w-full mt-1.5 bg-slate-900 border border-slate-800 text-white px-2.5 py-2 rounded-lg text-[11px] outline-none h-9"
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </label>
                        </div>
                        <div>
                          <label className="block text-left">
                            <span className="text-[10px] text-slate-400 font-bold block">{lang === "hi" ? "भोजन शामिल" : "Food Included"}</span>
                            <select
                              value={jpeFood}
                              onChange={(e) => setJpeFood(e.target.value)}
                              className="w-full mt-1.5 bg-slate-900 border border-slate-800 text-white px-2.5 py-2 rounded-lg text-[11px] outline-none h-9"
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </label>
                        </div>
                        <div>
                          <label className="block text-left">
                            <span className="text-[10px] text-slate-400 font-bold block">{lang === "hi" ? "सुरक्षा उपकरण" : "Safety Equip."}</span>
                            <select
                              value={jpeSafety}
                              onChange={(e) => setJpeSafety(e.target.value)}
                              className="w-full mt-1.5 bg-slate-900 border border-slate-800 text-white px-2.5 py-2 rounded-lg text-[11px] outline-none h-9"
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </label>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2">
                        <label className="block text-left">
                          <span className="text-xs text-slate-400 font-bold block">{lang === "hi" ? "कार्य का विवरण" : "Work Description"}</span>
                          <textarea
                            rows={2}
                            placeholder={lang === "hi" ? "परियोजना, टूल्स और आवश्यकताओं के बारे में विस्तार से लिखें..." : "Add project guidelines, required tool sets, or other constraints..."}
                            value={jpeDescription}
                            onChange={(e) => setJpeDescription(e.target.value)}
                            className="w-full mt-1.5 bg-slate-900 border border-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs outline-none resize-none focus:border-amber-500"
                          />
                        </label>
                      </div>

                    </div>

                    {/* Form Action Controls */}
                    <div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-900">
                      <button
                        type="button"
                        disabled={!jpeTitle || !jpeWage || !jpeWorkers}
                        onClick={() => {
                          const newDraft = { title: jpeTitle, trade: jpeTrade, wage: jpeWage, workers: jpeWorkers, state: jpeState, district: jpeDistrict, date: jpeJoiningDate };
                          setJpeDrafts([newDraft, ...jpeDrafts]);
                          setJpeSuccessToast(lang === "hi" ? "मस्यौदा (ड्राफ्ट) सुरक्षित किया गया!" : "Draft successfully saved offline!");
                          handleVoiceSpeak("मस्यौदा सुरक्षित कर लिया गया है।", "Draft saved.");
                        }}
                        className="flex-1 min-h-[40px] px-4 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold rounded-xl text-xs transition disabled:opacity-50 disabled:cursor-not-allowed border border-slate-800 cursor-pointer"
                      >
                        {lang === "hi" ? "ड्राफ्ट सहेजें" : "Save Draft"}
                      </button>

                      <button
                        type="button"
                        disabled={!jpeTitle || !jpeWage || !jpeWorkers}
                        onClick={() => {
                          setJpeShowPreview(true);
                          handleVoiceSpeak("लाइव प्रीव्यू खोल दिया गया है।", "Opening demand live preview.");
                        }}
                        className="flex-1 min-h-[40px] px-4 bg-slate-900 hover:bg-slate-850 text-amber-500 font-bold rounded-xl text-xs transition disabled:opacity-50 disabled:cursor-not-allowed border border-slate-800 cursor-pointer"
                      >
                        {lang === "hi" ? "पूर्वावलोकन" : "Preview"}
                      </button>

                      <button
                        type="button"
                        disabled={!jpeTitle || !jpeWage || !jpeWorkers || !jpeDistrict || !jpeState || !jpeJoiningDate}
                        onClick={() => {
                          setJpeIsPublishing(true);
                          setJpePublishStep(1);
                          handleVoiceSpeak(
                            "ग्रिड पर प्रसारण शुरू हो रहा है। ठेकेदार पहचान पत्र और जिला ग्रिड क्षमता का सत्यापन किया जा रहा है।",
                            "Initializing grid transmission. Verifying contractor passport and scanning nearby trades."
                          );
                        }}
                        className="flex-[2] min-h-[40px] px-5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl text-xs transition disabled:bg-slate-900 disabled:text-slate-650 disabled:border-slate-850 disabled:cursor-not-allowed border border-amber-400/20 cursor-pointer"
                      >
                        {lang === "hi" ? "राष्ट्रीय ग्रिड पर प्रकाशित करें" : "Publish to National Grid"}
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Live Ticker Card + Contractor Timeline */}
                  <div className="lg:col-span-4 space-y-4">
                    
                    {/* Live Preview Container Card */}
                    <div className="bg-slate-950/80 p-4.5 rounded-2xl border-2 border-dashed border-slate-800 text-left relative overflow-hidden space-y-3.5">
                      <span className="absolute top-2.5 right-2.5 text-[8px] font-mono font-black uppercase text-amber-500/50 tracking-wider bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                        LIVE PREVIEW
                      </span>
                      
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block font-bold">PROJECT OUTLINE DEMAND</span>
                        <h5 className="text-xs font-bold text-white mt-1 leading-snug truncate">
                          {jpeTitle || (lang === "hi" ? "नई कंक्रीट टीम आवश्यकता" : "Project Title Placeholder")}
                        </h5>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">District: {jpeDistrict}, {jpeState}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 bg-slate-900/60 p-2.5 rounded-xl text-[10px] font-mono text-slate-400 border border-slate-850">
                        <div>
                          <span className="text-slate-500 block text-[8px] uppercase">TRADE:</span>
                          <span className="font-extrabold text-amber-500 uppercase">{jpeTrade}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[8px] uppercase">WAGE RATE:</span>
                          <span className="font-extrabold text-emerald-400">₹{jpeWage || "0"} / {jpePaymentType}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[8px] uppercase">COUNT REQUIRED:</span>
                          <span className="font-extrabold text-white">{jpeWorkers || "0"} Workers</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[8px] uppercase">DURATION:</span>
                          <span className="font-extrabold text-white">{jpeDuration}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 pt-1.5 border-t border-slate-900">
                        <span>Accommodation: {jpeAccommodation}</span>
                        <span>Safety Equip: {jpeSafety}</span>
                      </div>
                    </div>

                    {/* CONTRACTOR TIMELINE / LATEST ACTIVITY */}
                    <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-900 text-left space-y-3">
                      <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest block border-b border-slate-900 pb-1.5">
                        {lang === "hi" ? "ठेकेदार टाइमलाइन गतिविधि" : "Contractor Timeline Activity"}
                      </span>
                      
                      <div className="space-y-3 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-850">
                        {jpeActivities.map((act, idx) => (
                          <div key={idx} className="flex gap-3 text-xs relative animate-fadeIn">
                            <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 z-10">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            </div>
                            <div className="flex-1 leading-snug">
                              <p className="text-slate-300 font-sans text-xs">{lang === "hi" ? act.textHi : act.textEn}</p>
                              <span className="text-[9px] text-slate-500 font-mono block mt-0.5">{lang === "hi" ? act.timeHi : act.timeEn}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Future Backend Connector Anchor Indicator */}
                <div className="w-full pt-3 border-t border-slate-900 flex justify-between items-center text-[9px] text-slate-500 font-mono tracking-widest uppercase">
                  <span>[REST/GraphQL Endpoint Connection Ready]</span>
                  <span className="text-emerald-500">Zero-Commission Direct Grid Network</span>
                </div>

              </div>

              {/* Live Preview Modal Overlay */}
              {jpeShowPreview && (
                <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
                  <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 max-w-md w-full space-y-4 text-left relative">
                    <button onClick={() => setJpeShowPreview(false)} className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-750 text-slate-400 p-1 rounded-lg cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="border-b border-slate-800 pb-2">
                      <span className="text-[9px] text-amber-500 font-mono uppercase tracking-widest block font-bold">NATIONAL BROADCAST INTENT CARRIER</span>
                      <h4 className="text-sm font-extrabold text-white font-mono mt-1">
                        {lang === "hi" ? "राष्ट्रीय ग्रिड मांग पूर्वावलोकन" : "National Grid Demand Preview"}
                      </h4>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                      <div>
                        <span className="text-[9px] text-slate-500 block font-mono">PROJECT DEMAND TITLE</span>
                        <h5 className="text-xs font-bold text-white mt-1">{jpeTitle || "Sample Project Title"}</h5>
                        <span className="text-[10px] text-slate-400 block font-mono mt-0.5">District: {jpeDistrict}, {jpeState}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5 bg-slate-900 p-3 rounded-xl text-xs font-mono border border-slate-850">
                        <div>
                          <span className="text-slate-500 block text-[9px]">TRADE REQUIRED</span>
                          <span className="font-bold text-amber-500">{jpeTrade}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px]">WAGE RATE</span>
                          <span className="font-bold text-emerald-400">₹{jpeWage} / {jpePaymentType}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px]">COUNT REQUIRED</span>
                          <span className="font-bold text-white">{jpeWorkers} Workers</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px]">WORK DURATION</span>
                          <span className="font-bold text-white">{jpeDuration}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-400 border-t border-slate-900 pt-3">
                        <div className="flex justify-between">
                          <span>Joining Date:</span>
                          <span className="text-white font-mono">{jpeJoiningDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Accommodation Provided:</span>
                          <span className="text-white font-mono">{jpeAccommodation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Food Included:</span>
                          <span className="text-white font-mono">{jpeFood}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Safety Equipment:</span>
                          <span className="text-white font-mono">{jpeSafety}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setJpeShowPreview(false)}
                        className="flex-1 py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-bold font-mono transition cursor-pointer"
                      >
                        Close Preview
                      </button>
                      <button
                        onClick={() => {
                          setJpeShowPreview(false);
                          setJpeIsPublishing(true);
                          setJpePublishStep(1);
                          handleVoiceSpeak(
                            "ग्रिड पर प्रसारण शुरू हो रहा है। ठेकेदार पहचान पत्र और जिला ग्रिड क्षमता का सत्यापन किया जा रहा है।",
                            "Initializing grid transmission. Verifying contractor passport and scanning nearby trades."
                          );
                        }}
                        className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black uppercase transition font-mono cursor-pointer"
                      >
                        Publish Now
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* WORKSPACE FILTER GRID / STATUS SWITCHER (9 Categories) */}
              <div className="bg-slate-900/20 p-3 rounded-2xl border border-slate-850">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                    {lang === "hi" ? "श्रेणी या स्थिति द्वारा छानें" : "Filter Requirements by Status / Workspace State"}
                  </span>
                  <span className="text-[9px] text-amber-500 font-mono">Select a category to view active demands</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5 text-center text-xs font-mono">
                  {[
                    { id: "ALL", labelHi: "सभी मांग", labelEn: "All", count: contractorRequirements.length },
                    { id: "OPEN", labelHi: "खुली मांग", labelEn: "Open", count: contractorRequirements.filter(r => r.status === "OPEN").length, color: "text-amber-500" },
                    { id: "INVITING", labelHi: "निमंत्रण", labelEn: "Inviting", count: contractorRequirements.filter(r => r.status === "INVITING").length, color: "text-blue-400" },
                    { id: "SHORTLISTING", labelHi: "शॉर्टलिस्ट", labelEn: "Shortlisted", count: contractorRequirements.filter(r => r.status === "SHORTLISTING").length, color: "text-purple-400" },
                    { id: "CONFIRMED", labelHi: "सत्यापित", labelEn: "Confirmed", count: contractorRequirements.filter(r => r.status === "CONFIRMED").length, color: "text-emerald-400" },
                    { id: "TODAY", labelHi: "आज की भर्ती", labelEn: "Today's Hire", count: 4, color: "text-white" },
                    { id: "PENDING_JOINING", labelHi: "लंबित जॉइन", labelEn: "Pending Join", count: 2, color: "text-pink-400" },
                    { id: "COMPLETED", labelHi: "पूर्ण कार्य", labelEn: "Completed", count: contractorRequirements.filter(r => r.status === "COMPLETED").length, color: "text-slate-400" },
                    { id: "CANCELLED", labelHi: "रद्द कार्य", labelEn: "Cancelled", count: contractorRequirements.filter(r => r.status === "CANCELLED").length, color: "text-red-400" }
                  ].map((tab) => {
                    const isSelected = workspaceFilter === tab.id;
                    return (
                      <button
                        type="button"
                        key={tab.id}
                        onClick={() => setWorkspaceFilter(tab.id)}
                        className={`p-2 rounded-xl border transition-all text-center flex flex-col justify-between items-center cursor-pointer min-h-[52px] ${
                          isSelected 
                            ? "bg-amber-500 text-slate-950 border-amber-400 font-bold" 
                            : "bg-slate-900/60 text-slate-400 border-slate-850 hover:bg-slate-850 hover:text-white"
                        }`}
                      >
                        <span className={`text-[9px] block leading-none font-bold ${isSelected ? "text-slate-950" : tab.color || "text-slate-300"}`}>{tab.count}</span>
                        <div className="mt-1">
                          <span className="text-[9px] block leading-none font-sans font-bold truncate max-w-[65px]">{lang === "hi" ? tab.labelHi : tab.labelEn}</span>
                          <span className={`text-[7px] block leading-none font-mono tracking-tight uppercase ${isSelected ? "text-slate-950/80" : "text-slate-500"}`}>{tab.labelEn}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* DYNAMIC REQUIREMENTS SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Requirements List (Col 7) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                    <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                      {lang === "hi" ? "सक्रिय भर्ती मांग सूची" : "Active Project Demands & Requirements"}
                    </h5>
                    <span className="text-[10px] font-mono text-slate-500">
                      Showing {contractorRequirements.filter(r => workspaceFilter === "ALL" || r.status === workspaceFilter).length} Requirements
                    </span>
                  </div>

                  {contractorRequirements.filter(r => workspaceFilter === "ALL" || r.status === workspaceFilter).length === 0 ? (
                    <div className="bg-slate-900/40 p-10 rounded-2xl border border-slate-850 text-center font-mono text-xs text-slate-500">
                      No requirements currently matched this filter status.
                    </div>
                  ) : (
                    contractorRequirements.filter(r => workspaceFilter === "ALL" || r.status === workspaceFilter).map((req) => {
                      const isSelected = selectedReqId === req.id;
                      const isEditing = isEditingReqId === req.id;

                      return (
                        <div 
                          key={req.id} 
                          onClick={() => { setSelectedReqId(req.id); setMatchingPanelOpen(false); setOfferPanelOpen(false); }}
                          className={`bg-slate-900/80 p-5 rounded-2xl border transition-all text-left space-y-4 relative overflow-hidden cursor-pointer ${
                            isSelected ? "border-amber-500/80 bg-slate-900/95 shadow-xl ring-1 ring-amber-500/10" : "border-slate-850 hover:border-slate-800"
                          }`}
                        >
                          {/* Top Status Indicator */}
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[9px] text-slate-500 font-bold uppercase">ID: {req.id}</span>
                                <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold uppercase ${
                                  req.status === "OPEN" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                                  req.status === "INVITING" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                                  req.status === "SHORTLISTING" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                                  req.status === "CONFIRMED" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                                  req.status === "COMPLETED" ? "bg-slate-850 text-slate-400 border border-slate-800" :
                                  "bg-red-500/10 text-red-400 border border-red-500/20"
                                }`}>
                                  {req.status}
                                </span>
                              </div>
                              <h6 className="text-sm font-extrabold text-white mt-1 leading-tight">{lang === "hi" ? req.titleHi : req.titleEn}</h6>
                              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">{req.tradeEn} / {req.tradeHi}</p>
                            </div>

                            {/* Direct Action buttons inside Requirement card */}
                            <div className="flex gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                title="Duplicate Requirement"
                                onClick={() => {
                                  const dup = {
                                    ...req,
                                    id: `cr-${Date.now()}`,
                                    titleHi: `${req.titleHi} (प्रतिलिपि)`,
                                    titleEn: `${req.titleEn} (Copy)`,
                                    status: "OPEN" as const,
                                    applied: [],
                                    invited: [],
                                    shortlisted: [],
                                    confirmed: [],
                                    completed: [],
                                    cancelled: []
                                  };
                                  setContractorRequirements([dup, ...contractorRequirements]);
                                  handleVoiceSpeak("मांग की प्रतिलिपि बना दी गई है।", "Requirement duplicated successfully.");
                                  alert("मांग की प्रतिलिपि बनाई गई! / Requirement duplicated!");
                                }}
                                className="p-1.5 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              
                              <button
                                type="button"
                                title="Edit Requirement"
                                onClick={() => {
                                  if (isEditing) {
                                    setIsEditingReqId(null);
                                  } else {
                                    setIsEditingReqId(req.id);
                                    setEditReqWorkersCount(req.workersCount.toString());
                                    setEditReqWage(req.expectedWage.replace(/[^0-9]/g, ""));
                                    setEditReqLocation(req.locationEn);
                                  }
                                }}
                                className="p-1.5 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                title="Close Requirement"
                                onClick={() => {
                                  const updated = contractorRequirements.map(x => x.id === req.id ? { ...x, status: "CANCELLED" as const } : x);
                                  setContractorRequirements(updated);
                                  handleVoiceSpeak("मांग बंद कर दी गई है।", "Requirement cancelled and closed.");
                                }}
                                className="p-1.5 bg-red-950/20 hover:bg-red-500 hover:text-slate-950 text-red-400 rounded-lg border border-red-500/20 transition min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* INLINE EDIT FORM */}
                          {isEditing && (
                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3" onClick={(e) => e.stopPropagation()}>
                              <span className="text-[10px] text-amber-500 font-mono uppercase font-bold tracking-wider">Quick Edit Requirement</span>
                              <div className="grid grid-cols-3 gap-2">
                                <div>
                                  <label className="text-[9px] text-slate-500 block">Workers needed</label>
                                  <input 
                                    type="number" 
                                    value={editReqWorkersCount} 
                                    onChange={(e) => setEditReqWorkersCount(e.target.value)} 
                                    className="w-full bg-slate-900 border border-slate-800 text-white rounded text-xs p-1 font-mono mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] text-slate-500 block">Wage Rate (₹)</label>
                                  <input 
                                    type="number" 
                                    value={editReqWage} 
                                    onChange={(e) => setEditReqWage(e.target.value)} 
                                    className="w-full bg-slate-900 border border-slate-800 text-white rounded text-xs p-1 font-mono mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] text-slate-500 block">Work Location</label>
                                  <input 
                                    type="text" 
                                    value={editReqLocation} 
                                    onChange={(e) => setEditReqLocation(e.target.value)} 
                                    className="w-full bg-slate-900 border border-slate-800 text-white rounded text-xs p-1 mt-1"
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setIsEditingReqId(null)}
                                  className="px-2 py-1 bg-slate-900 text-slate-400 text-[10px] rounded"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = contractorRequirements.map(x => x.id === req.id ? { 
                                      ...x, 
                                      workersCount: parseInt(editReqWorkersCount) || x.workersCount,
                                      expectedWage: `₹${editReqWage} / Day`,
                                      locationEn: editReqLocation || x.locationEn,
                                      open: parseInt(editReqWorkersCount) || x.open
                                    } : x);
                                    setContractorRequirements(updated);
                                    setIsEditingReqId(null);
                                    handleVoiceSpeak("विवरण अद्यतन कर दिया गया है।", "Requirement details updated successfully.");
                                  }}
                                  className="px-2.5 py-1 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded"
                                >
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          )}

                          {/* CORE METADATA DETAILS */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950/40 p-3.5 rounded-xl border border-slate-900 text-xs font-mono">
                            <div>
                              <span className="text-slate-500 text-[9px] block uppercase leading-none">{lang === "hi" ? "कामगार संख्या" : "Workers Needed"}</span>
                              <span className="text-white font-bold block mt-1">{req.workersCount} Workers</span>
                            </div>
                            <div>
                              <span className="text-slate-500 text-[9px] block uppercase leading-none">{lang === "hi" ? "कार्य स्थल" : "Work Location"}</span>
                              <span className="text-white font-bold block mt-1 truncate">{lang === "hi" ? req.locationHi || req.locationEn : req.locationEn}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 text-[9px] block uppercase leading-none">{lang === "hi" ? "प्रस्तावित वेतन" : "Expected Wage"}</span>
                              <span className="text-emerald-400 font-bold block mt-1">{req.expectedWage}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 text-[9px] block uppercase leading-none">{lang === "hi" ? "अनुबंध अवधि" : "Work Duration"}</span>
                              <span className="text-amber-500 font-bold block mt-1">{req.duration}</span>
                            </div>
                          </div>

                          {/* PIPELINE & STAGE PIPELINE PIPES (Bilingual) */}
                          <div className="space-y-2 border-t border-slate-900 pt-3">
                            <div className="flex justify-between text-[10px] font-mono text-slate-400">
                              <span>{lang === "hi" ? "नियुक्ति पाइपलाइन प्रगति" : "Workforce Pipeline Stage"}</span>
                              <span className="text-amber-500 font-bold">{req.applied.length + req.invited.length + req.shortlisted.length + req.confirmed.length} Registered Workers</span>
                            </div>

                            {/* Stage Timeline */}
                            <div className="grid grid-cols-4 gap-1 text-[9px] font-mono text-center">
                              <div className="p-1.5 rounded bg-slate-950 border border-slate-900">
                                <span className="block font-bold text-slate-400">Applied</span>
                                <span className="text-xs text-white block mt-0.5 font-black">{req.applied.length}</span>
                              </div>
                              <div className="p-1.5 rounded bg-slate-950 border border-slate-900">
                                <span className="block font-bold text-blue-400">Invited</span>
                                <span className="text-xs text-blue-400 block mt-0.5 font-black">{req.invited.length}</span>
                              </div>
                              <div className="p-1.5 rounded bg-slate-950 border border-slate-900">
                                <span className="block font-bold text-purple-400">Shortlisted</span>
                                <span className="text-xs text-purple-400 block mt-0.5 font-black">{req.shortlisted.length}</span>
                              </div>
                              <div className="p-1.5 rounded bg-slate-950 border border-slate-900">
                                <span className="block font-bold text-emerald-400">Confirmed</span>
                                <span className="text-xs text-emerald-400 block mt-0.5 font-black">{req.confirmed.length}</span>
                              </div>
                            </div>

                            {/* 8-Stage Animate Timeline Pipe */}
                            <div className="pt-2">
                              <span className="text-[9px] font-mono uppercase text-slate-500 block mb-1">State Compliance Timeline</span>
                              <div className="flex items-center gap-1.5">
                                {[
                                  { id: "Created", hi: "सृजित", en: "Created", done: true },
                                  { id: "Invited", hi: "आमंत्रित", en: "Invited", done: req.invited.length > 0 || req.status === "INVITING" },
                                  { id: "Accepted", hi: "स्वीकृत", en: "Accepted", done: req.confirmed.length > 0 },
                                  { id: "Confirmed", hi: "सत्यापित", en: "Confirmed", done: req.status === "CONFIRMED" || req.status === "IN PROGRESS" || req.status === "COMPLETED" },
                                  { id: "Started", hi: "सक्रिय", en: "Started", done: req.status === "IN PROGRESS" || req.status === "COMPLETED" },
                                  { id: "Attendance", hi: "हाजिरी", en: "GPS Lock", done: req.status === "IN PROGRESS" || req.status === "COMPLETED" },
                                  { id: "Payment", hi: "भुगतान एस्क्रो", en: "Escrow Deposited", done: req.status === "IN PROGRESS" || req.status === "COMPLETED" },
                                  { id: "Completed", hi: "पूर्ण", en: "Completed", done: req.status === "COMPLETED" }
                                ].map((step, sIdx) => (
                                  <div key={sIdx} className="flex-1 flex flex-col items-center">
                                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${step.done ? "bg-emerald-500 ring-2 ring-emerald-500/20" : "bg-slate-800"}`} />
                                    <span className="text-[6px] text-slate-500 mt-1 uppercase font-bold leading-none font-sans text-center truncate w-full">
                                      {lang === "hi" ? step.hi : step.en}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* ACTION FOOTER */}
                          <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-slate-900 justify-end" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedReqId(req.id);
                                setMatchingPanelOpen(true);
                                setOfferPanelOpen(false);
                                handleVoiceSpeak(
                                  "कामगार मिलान इंजन सक्रिय किया जा रहा है।",
                                  "Activating National Worker Matching Engine scanner."
                                );
                              }}
                              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold rounded-xl text-[10px] font-mono uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer min-h-[38px]"
                            >
                              <Search className="w-3.5 h-3.5" />
                              <span>{lang === "hi" ? "कामगार खोजें व मिलान करें" : "Find Matching Workers"}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                const updated = contractorRequirements.map(x => x.id === req.id ? { ...x, status: "COMPLETED" as const } : x);
                                setContractorRequirements(updated);
                                handleVoiceSpeak("कार्य पूर्ण घोषित किया गया है।", "Project marked completed.");
                              }}
                              className="px-3.5 py-2 bg-slate-950 hover:bg-slate-900 text-emerald-400 font-bold border border-emerald-500/10 rounded-xl text-[10px] font-mono uppercase tracking-wider min-h-[38px] flex items-center justify-center cursor-pointer"
                            >
                              <span>{lang === "hi" ? "कार्य पूर्ण करें" : "Mark Completed"}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Matchmaking Panel & Pipeline Control Desk (Col 5) */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* NATIONAL MATCHING PANEL */}
                  {matchingPanelOpen && (
                    <div className="bg-slate-900 p-5 rounded-2xl border-2 border-amber-500 animate-fadeIn text-left space-y-4">
                      
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div>
                          <h5 className="text-xs font-mono font-bold text-amber-500 uppercase flex items-center gap-1">
                            <ShieldCheck className="w-4 h-4 text-amber-500" />
                            {lang === "hi" ? "राष्ट्रीय मिलान पैनल" : "National Matching Panel"}
                          </h5>
                          <span className="text-[10px] text-slate-400 mt-0.5 block leading-tight">AI Matching Score & Credentials Verification</span>
                        </div>
                        <button type="button" onClick={() => setMatchingPanelOpen(false)} className="text-slate-500 hover:text-white">
                          <X className="w-4.5 h-4.5" />
                        </button>
                      </div>

                      {/* SMART FILTERS SECTION */}
                      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 space-y-3">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 font-bold uppercase border-b border-slate-900 pb-1.5">
                          <Filter className="w-3.5 h-3.5 text-amber-500" />
                          <span>Smart Filters / सुव्यवस्थित फिल्टर</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5 text-[10px] font-mono">
                          <div>
                            <span className="text-slate-500">Trade:</span>
                            <select 
                              value={matchFilterTrade} 
                              onChange={(e) => setMatchFilterTrade(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-[10px] mt-0.5 text-slate-300"
                            >
                              <option value="all">All Trades</option>
                              <option value="Mason">Mason / राजमिस्त्री</option>
                              <option value="Electrician">Electrician / बिजली मिस्त्री</option>
                              <option value="Carpenter">Carpenter / बढ़ई</option>
                              <option value="Painter">Painter / रंगसाज़</option>
                            </select>
                          </div>
                          <div>
                            <span className="text-slate-500">District:</span>
                            <input 
                              type="text" 
                              value={matchFilterDistrict} 
                              onChange={(e) => setMatchFilterDistrict(e.target.value)} 
                              className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-[10px] mt-0.5 text-slate-300 font-mono"
                            />
                          </div>
                          <div>
                            <span className="text-slate-500">Max Distance (km):</span>
                            <input 
                              type="number" 
                              value={matchFilterDistance} 
                              onChange={(e) => setMatchFilterDistance(e.target.value)} 
                              className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-[10px] mt-0.5 text-slate-300 font-mono"
                            />
                          </div>
                          <div>
                            <span className="text-slate-500">Experience Years:</span>
                            <select 
                              value={matchFilterExperience} 
                              onChange={(e) => setMatchFilterExperience(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-[10px] mt-0.5 text-slate-300"
                            >
                              <option value="all">Any Exp</option>
                              <option value="3">3+ Years</option>
                              <option value="5">5+ Years</option>
                              <option value="8">8+ Years</option>
                            </select>
                          </div>
                        </div>

                        {/* Toggles */}
                        <div className="grid grid-cols-2 gap-2.5 pt-1.5 text-[9px] font-mono">
                          <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={matchFilterVerifiedOnly} 
                              onChange={(e) => setMatchFilterVerifiedOnly(e.target.checked)} 
                              className="rounded border-slate-800 text-amber-500 bg-slate-900 focus:ring-0"
                            />
                            <span>Verified Only</span>
                          </label>
                          <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={matchFilterGpsEnabled} 
                              onChange={(e) => setMatchFilterGpsEnabled(e.target.checked)} 
                              className="rounded border-slate-800 text-amber-500 bg-slate-900 focus:ring-0"
                            />
                            <span>GPS Active Only</span>
                          </label>
                          <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer col-span-2">
                            <input 
                              type="checkbox" 
                              checked={matchFilterImmediateJoining} 
                              onChange={(e) => setMatchFilterImmediateJoining(e.target.checked)} 
                              className="rounded border-slate-800 text-amber-500 bg-slate-900 focus:ring-0"
                            />
                            <span>Immediate Joining (तत्काल जॉइन)</span>
                          </label>
                        </div>
                      </div>

                      {/* MATCHED WORKERS SCANNED LIST (Determined dynamically with AI Scores!) */}
                      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
                        {[
                          { id: "mw-1", name: "Suresh Maurya", tradeEn: "Mason", score: 98, experience: "7 Years", distance: "1.2 km", wage: "750", trustScore: 98, attendance: 96, passportVerified: true, gpsReady: true, availability: "Immediate", language: "Hindi, English" },
                          { id: "mw-2", name: "Sohan Lal", tradeEn: "Mason", score: 94, experience: "6 Years", distance: "2.4 km", wage: "750", trustScore: 92, attendance: 90, passportVerified: true, gpsReady: true, availability: "Immediate", language: "Hindi, Bhojpuri" },
                          { id: "mw-3", name: "Ramesh Kumar", tradeEn: "Mason", score: 91, experience: "5 Years", distance: "3.1 km", wage: "700", trustScore: 88, attendance: 92, passportVerified: true, gpsReady: true, availability: "Immediate", language: "Hindi" },
                          { id: "mw-4", name: "Amit Vishwakarma", tradeEn: "Electrician", score: 96, experience: "5 Years", distance: "1.8 km", wage: "800", trustScore: 95, attendance: 91, passportVerified: true, gpsReady: true, availability: "Immediate", language: "Hindi" },
                          { id: "mw-5", name: "Karan Bahadur", tradeEn: "Carpenter", score: 95, experience: "10 Years", distance: "1.5 km", wage: "800", trustScore: 96, attendance: 95, passportVerified: true, gpsReady: true, availability: "Immediate", language: "Hindi" },
                          { id: "mw-6", name: "Gopal Prasad", tradeEn: "Mason", score: 85, experience: "3 Years", distance: "4.8 km", wage: "650", trustScore: 84, attendance: 88, passportVerified: false, gpsReady: true, availability: "3 Days", language: "Hindi" },
                          { id: "mw-7", name: "Rajesh Kumar", tradeEn: "Painter", score: 88, experience: "4 Years", distance: "2.2 km", wage: "600", trustScore: 89, attendance: 87, passportVerified: true, gpsReady: true, availability: "Immediate", language: "Hindi" }
                        ]
                        .filter(w => {
                          const currentReq = contractorRequirements.find(cr => cr.id === selectedReqId);
                          const targetTrade = currentReq ? currentReq.tradeEn : "Mason";
                          if (matchFilterTrade !== "all" && w.tradeEn !== matchFilterTrade) return false;
                          if (matchFilterTrade === "all" && w.tradeEn !== targetTrade) return false; // Default to requirement trade
                          if (matchFilterVerifiedOnly && !w.passportVerified) return false;
                          if (matchFilterGpsEnabled && !w.gpsReady) return false;
                          if (matchFilterImmediateJoining && w.availability !== "Immediate") return false;
                          return true;
                        })
                        .map((w, wIdx) => (
                          <div key={w.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-white text-xs">{w.name}</span>
                                  {w.passportVerified && <span className="text-[7px] bg-emerald-500/15 text-emerald-400 px-1 py-0.5 rounded uppercase font-bold flex items-center gap-0.5">Passport Verified</span>}
                                </div>
                                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Exp: {w.experience} | Dist: {w.distance}</span>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-lg font-black text-amber-500 font-mono block leading-none">{w.score}%</span>
                                <span className="text-[8px] text-slate-500 block uppercase font-mono leading-none mt-1">Match Score</span>
                              </div>
                            </div>

                            {/* Detailed matched criteria */}
                            <div className="grid grid-cols-3 gap-1 bg-slate-900/60 p-2 rounded text-[9px] font-mono text-slate-400">
                              <div>
                                <span className="text-slate-500 block">Trust Score:</span>
                                <span className="font-bold text-emerald-400">{w.trustScore}%</span>
                              </div>
                              <div>
                                <span className="text-slate-500 block">Attendance:</span>
                                <span className="font-bold text-white">{w.attendance}%</span>
                              </div>
                              <div>
                                <span className="text-slate-500 block">Expectation:</span>
                                <span className="font-bold text-white">₹{w.wage} / Day</span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  // Send immediate invitation
                                  const req = contractorRequirements.find(x => x.id === selectedReqId);
                                  if (!req) return;
                                  // Avoid duplicates
                                  if (req.invited.some(x => x.id === w.id)) {
                                    alert("निमंत्रण पहले ही भेजा जा चुका है! / Invitation already dispatched!");
                                    return;
                                  }
                                  const updatedInvited = [...req.invited, { ...w }];
                                  const updated = contractorRequirements.map(x => x.id === selectedReqId ? { ...x, invited: updatedInvited, status: "INVITING" as const } : x);
                                  setContractorRequirements(updated);
                                  
                                  // Append to contractor alerts
                                  const notif = {
                                    id: `cn-${Date.now()}`,
                                    type: "invited",
                                    textHi: `कार्य निमंत्रण ${w.name} को एसएमएस द्वारा भेजा गया।`,
                                    textEn: `Invitation dispatched via SMS gateway to ${w.name}.`,
                                    time: "Just now",
                                    unread: true
                                  };
                                  setContractorNotifications([notif, ...contractorNotifications]);
                                  handleVoiceSpeak("कामगार को एसएमएस द्वारा निमंत्रण भेजा गया।", "Invitation sent to worker successfully.");
                                }}
                                className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:text-white text-slate-300 font-bold rounded-lg text-[10px] uppercase font-mono transition"
                              >
                                Send Invitation
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedWorkerForMatching(w);
                                  setOfferWageAmountState(w.wage);
                                  setOfferPanelOpen(true);
                                }}
                                className="flex-1 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-lg text-[10px] uppercase font-mono transition"
                              >
                                Send Offer
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* JOB OFFER PANEL & WORK ORDER GENERATION (Bilingual) */}
                  {offerPanelOpen && selectedWorkerForMatching && (
                    <div className="bg-slate-900 p-5 rounded-2xl border-2 border-emerald-500 animate-fadeIn text-left space-y-4">
                      
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div>
                          <h5 className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            {lang === "hi" ? "आधिकारिक नौकरी प्रस्ताव पैनल" : "Job Offer & Contract Panel"}
                          </h5>
                          <span className="text-[10px] text-slate-400 mt-0.5 block">Hiring: <strong className="text-white">{selectedWorkerForMatching.name}</strong></span>
                        </div>
                        <button type="button" onClick={() => setOfferPanelOpen(false)} className="text-slate-500 hover:text-white">
                          <X className="w-4.5 h-4.5" />
                        </button>
                      </div>

                      {/* Customize Wages Form */}
                      <div className="space-y-3.5 text-xs font-mono">
                        
                        {/* Wage Frequency Toggles */}
                        <div>
                          <span className="text-[9px] text-slate-500 block uppercase">Offer Wage Structure</span>
                          <div className="grid grid-cols-4 gap-1.5 mt-1.5">
                            {(["Daily", "Weekly", "Monthly", "Task"] as const).map((mode) => (
                              <button
                                type="button"
                                key={mode}
                                onClick={() => setOfferWageType(mode)}
                                className={`p-1.5 rounded text-[10px] font-bold text-center border transition cursor-pointer ${
                                  offerWageType === mode 
                                    ? "bg-emerald-500 text-slate-950 border-emerald-400" 
                                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                                }`}
                              >
                                {mode}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Wage Input & Expected Joining Date */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[9px] text-slate-500 block uppercase">Offer Amount (₹)</label>
                            <input 
                              type="number" 
                              value={offerWageAmountState} 
                              onChange={(e) => setOfferWageAmountState(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 text-white rounded p-2 text-xs font-mono mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-slate-500 block uppercase">Expected Joining Date</label>
                            <input 
                              type="date" 
                              value={offerJoiningDate} 
                              onChange={(e) => setOfferJoiningDate(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 text-white rounded p-2 text-xs font-mono mt-1"
                            />
                          </div>
                        </div>

                        {/* Notes and voice options */}
                        <div>
                          <label className="text-[9px] text-slate-500 block uppercase">Work Order Specific Notes</label>
                          <textarea 
                            rows={2}
                            placeholder="Specify special guidelines (e.g. Bring masonry trowel, work hours are 8 AM to 5 PM)"
                            value={offerNotes}
                            onChange={(e) => setOfferNotes(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 text-white rounded p-2 text-xs mt-1 font-mono outline-none"
                          />
                        </div>

                        {/* Voice Instructions Placeholder */}
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between text-[11px] font-mono">
                          <div className="flex items-center gap-2">
                            <Volume2 className="w-4 h-4 text-emerald-400" />
                            <div>
                              <span className="text-white block font-bold">Voice Instructions (Bilingual)</span>
                              <span className="text-[9px] text-slate-500 block">Record voice guidance for worker SMS</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setOfferVoiceInstructionEnabled(!offerVoiceInstructionEnabled);
                              handleVoiceSpeak(
                                "सुरक्षित रीजनल वॉयस ट्रांसमिटर सक्रिय है। आप अपनी आवाज़ में निर्देश रिकॉर्ड कर सकते हैं।",
                                "Bilingual voice instruction recorded successfully. Ready for SMS delivery."
                              );
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-bold ${offerVoiceInstructionEnabled ? "bg-emerald-500 text-slate-950" : "bg-slate-900 text-slate-400"}`}
                          >
                            {offerVoiceInstructionEnabled ? "Recorded ✓" : "Record Voice"}
                          </button>
                        </div>

                        {/* CTA buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              // Generate Work Order Preview card
                              const woId = `WO-2026-${Math.floor(10000 + Math.random() * 90000)}`;
                              const targetReq = contractorRequirements.find(cr => cr.id === selectedReqId);
                              setPreviewWorkOrder({
                                id: woId,
                                workerName: selectedWorkerForMatching.name,
                                contractorName: regCompany || "Prasad Labour Supplies",
                                trade: selectedWorkerForMatching.tradeEn,
                                location: targetReq ? targetReq.locationEn : "Gorakhpur Corridor",
                                joiningDate: offerJoiningDate,
                                wage: `₹${offerWageAmountState} / ${offerWageType}`,
                                duration: targetReq ? targetReq.duration : "1 Month",
                                status: "DRAFT_PREVIEW"
                              });
                              handleVoiceSpeak("काम का आदेश मसौदा तैयार किया गया है।", "Digital Work Order draft generated. Preview below.");
                            }}
                            className="w-full py-2 bg-slate-950 hover:bg-slate-900 text-slate-300 font-bold border border-slate-800 rounded-xl text-[11px] uppercase tracking-wider"
                          >
                            Preview Offer
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              // Send core offer & append to invitations
                              const targetReq = contractorRequirements.find(cr => cr.id === selectedReqId);
                              if (!targetReq) return;

                              // Update requirement's pipeline to "shortlisted" and confirmed simulation
                              const updatedShortlisted = [...targetReq.shortlisted, { ...selectedWorkerForMatching, score: 98 }];
                              const updated = contractorRequirements.map(x => x.id === selectedReqId ? { 
                                ...x, 
                                shortlisted: updatedShortlisted,
                                status: "SHORTLISTING" as const 
                              } : x);
                              setContractorRequirements(updated);

                              // Add a digital work order in ISSUED state
                              const woId = `WO-2026-${Math.floor(10000 + Math.random() * 90000)}`;
                              const newWO = {
                                id: woId,
                                workerName: selectedWorkerForMatching.name,
                                contractorName: regCompany || "Prasad Labour Supplies",
                                trade: selectedWorkerForMatching.tradeEn,
                                location: targetReq.locationEn,
                                joiningDate: offerJoiningDate,
                                wage: `₹${offerWageAmountState} / ${offerWageType}`,
                                duration: targetReq.duration,
                                status: "ISSUED"
                              };
                              setDigitalWorkOrders([newWO, ...digitalWorkOrders]);

                              // Trigger Worker Side State update (Invite matches real-time)
                              const newInv = {
                                id: `inv-${Date.now()}`,
                                company: regCompany || "Prasad Labour Supplies",
                                contractor: loggedInUser.name,
                                location: targetReq.locationEn,
                                distance: selectedWorkerForMatching.distance,
                                trade: selectedWorkerForMatching.tradeEn,
                                expectedWage: `₹${offerWageAmountState} / ${offerWageType}`,
                                duration: targetReq.duration,
                                trustScore: "98%",
                                status: "PENDING"
                              };
                              setWorkerInvitations([newInv, ...workerInvitations]);

                              // Save a notification
                              const notif = {
                                id: `cn-${Date.now()}`,
                                type: "accepted",
                                textHi: `कामगार ${selectedWorkerForMatching.name} को आधिकारिक डिजिटल वर्क ऑर्डर ${woId} भेजा गया।`,
                                textEn: `Official Digital Work Order ${woId} issued and SMS dispatched to ${selectedWorkerForMatching.name}.`,
                                time: "Just now",
                                unread: true
                              };
                              setContractorNotifications([notif, ...contractorNotifications]);

                              setPreviewWorkOrder(null);
                              setOfferPanelOpen(false);
                              setMatchingPanelOpen(false);

                              handleVoiceSpeak(
                                "बधाई हो, आधिकारिक रोजगार प्रस्ताव भेज दिया गया है।",
                                "Congratulations, the digital work order has been verified and issued to the worker grid."
                              );
                              alert(`डिजिटल कार्य आदेश ${woId} सफलतापूर्वक कामगार को एसएमएस के माध्यम से प्रेषित किया गया! / Digital Work Order issued!`);
                            }}
                            className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl text-[11px] uppercase tracking-wider"
                          >
                            Send Offer
                          </button>
                        </div>
                      </div>

                      {/* PREVIEW CARD - DIGITAL WORK ORDER PREVIEW */}
                      {previewWorkOrder && (
                        <div className="bg-slate-950 p-4 rounded-xl border border-dashed border-emerald-500/40 mt-3 animate-fadeIn space-y-3 font-mono text-[11px]">
                          <div className="flex justify-between items-center border-b border-slate-900 pb-1.5">
                            <span className="text-emerald-400 font-bold uppercase tracking-widest text-[9px]">OFFICIAL WORK ORDER PREVIEW</span>
                            <span className="text-[7px] bg-slate-900 text-slate-500 px-1 rounded uppercase font-bold">DRAFT SPEC</span>
                          </div>
                          
                          <div className="space-y-1.5">
                            <div className="flex justify-between">
                              <span className="text-slate-500">WORK ORDER ID:</span>
                              <span className="text-white font-bold">{previewWorkOrder.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">WORKER:</span>
                              <span className="text-white font-bold">{previewWorkOrder.workerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">CONTRACTOR:</span>
                              <span className="text-white font-bold">{previewWorkOrder.contractorName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">TRADE / ROLE:</span>
                              <span className="text-white font-bold">{previewWorkOrder.trade}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">LOCATION:</span>
                              <span className="text-white font-bold truncate max-w-[150px]">{previewWorkOrder.location}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">JOINING DATE:</span>
                              <span className="text-amber-500 font-bold">{previewWorkOrder.joiningDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">WAGE OFFER:</span>
                              <span className="text-emerald-400 font-bold">{previewWorkOrder.wage}</span>
                            </div>
                          </div>

                          <div className="bg-slate-900 p-2 rounded text-center text-[8px] text-slate-500 border border-slate-850">
                            Digital QR verification placeholder will appear on final issuance.
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* DIGITAL WORK ORDERS DESK & LOGS */}
                  <div className="bg-slate-900/40 p-4.5 rounded-2xl border border-slate-850 text-left space-y-4">
                    <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
                      <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                        {lang === "hi" ? "आधिकारिक डिजिटल वर्क ऑर्डर क्रेडेंशियल्स" : "Digital Work Order Gateways"}
                      </h5>
                      <span className="text-[9px] font-mono text-slate-500 uppercase">{digitalWorkOrders.length} Active Orders</span>
                    </div>

                    <div className="space-y-3.5">
                      {digitalWorkOrders.map((wo) => (
                        <div key={wo.id} className="bg-slate-950 p-4 rounded-xl border-2 border-slate-900 space-y-3 font-mono text-[10px] relative overflow-hidden group">
                          {/* Top Flag Ribbon decorative */}
                          <div className="absolute top-0 right-0 w-2.5 h-full bg-emerald-500/10 group-hover:bg-emerald-500/25 transition" />
                          
                          <div className="flex justify-between items-center border-b border-slate-900 pb-1.5">
                            <span className="text-white font-bold text-[11px] leading-none">{wo.id}</span>
                            <span className={`text-[7px] px-1.5 py-0.5 rounded font-bold uppercase ${
                              wo.status === "ISSUED" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                              "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            }`}>
                              {wo.status}
                            </span>
                          </div>

                          <div className="space-y-1.5 text-slate-400">
                            <div className="flex justify-between">
                              <span>Worker Name:</span>
                              <span className="text-white font-bold">{wo.workerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Trade:</span>
                              <span className="text-white font-bold">{wo.trade}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Location:</span>
                              <span className="text-slate-300 truncate max-w-[140px]">{wo.location}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Expected Joining:</span>
                              <span className="text-white font-bold">{wo.joiningDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Wage Rate:</span>
                              <span className="text-emerald-400 font-bold">{wo.wage}</span>
                            </div>
                          </div>

                          {/* Interactive QR Code & download placeholders */}
                          <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-slate-900">
                            <div className="flex items-center gap-1.5">
                              {/* Small graphic QR */}
                              <div className="bg-white p-0.5 rounded">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect width="24" height="24" fill="white" />
                                  <rect x="1" y="1" width="6" height="6" fill="black" />
                                  <rect x="2" y="2" width="4" height="4" fill="white" />
                                  <rect x="17" y="1" width="6" height="6" fill="black" />
                                  <rect x="18" y="2" width="4" height="4" fill="white" />
                                  <rect x="1" y="17" width="6" height="6" fill="black" />
                                  <rect x="2" y="18" width="4" height="4" fill="white" />
                                  <rect x="9" y="9" width="6" height="6" fill="black" />
                                </svg>
                              </div>
                              <span className="text-[7px] text-slate-500 uppercase leading-normal">QR Verified Passport</span>
                            </div>

                            <div className="flex gap-1.5">
                              <button
                                type="button"
                                onClick={() => alert("कार्य आदेश पत्र डाउनलोड करने की प्रक्रिया डेमो मोड में है। / Work Order PDF compilation initialized.")}
                                className="p-1 px-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded font-bold uppercase text-[8px] flex items-center gap-0.5"
                              >
                                <Download className="w-3 h-3" />
                                <span>PDF</span>
                              </button>
                              
                              <button
                                type="button"
                                onClick={() => alert("सुरक्षित साझाकरण लिंक कॉपी किया गया! / Secure work order link copied to clipboard!")}
                                className="p-1 px-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded font-bold uppercase text-[8px] flex items-center gap-0.5"
                              >
                                <Share2 className="w-3 h-3" />
                                <span>Share</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* FUTURISTIC EXPANSION GATEWAY (Prompt-09F Required Placeholders) */}
              <div className="bg-slate-900/30 p-5 rounded-2xl border border-slate-850 text-left space-y-4">
                <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
                  <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                    {lang === "hi" ? "आगामी राष्ट्रीय डिजिटल श्रम एकीकरण मॉड्यूल" : "Future National Digital Infrastructure Roadmap"}
                  </h5>
                  <span className="text-[8px] bg-amber-500/15 text-amber-500 px-2 py-0.5 rounded font-mono uppercase font-bold">Next Phase Modules</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-[10px] font-mono">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex flex-col justify-between min-h-[72px]">
                    <span className="block text-slate-400 font-bold uppercase text-[8px]">AI Matchmaker</span>
                    <span className="block mt-1 font-bold text-slate-500">Auto radius scanner</span>
                    <span className="text-[7px] bg-amber-500/5 text-amber-500/40 px-1.5 py-0.5 rounded mt-2 uppercase font-bold">Placeholder</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex flex-col justify-between min-h-[72px]">
                    <span className="block text-slate-400 font-bold uppercase text-[8px]">GIS Live Radius</span>
                    <span className="block mt-1 font-bold text-slate-500">10km corridor sync</span>
                    <span className="text-[7px] bg-amber-500/5 text-amber-500/40 px-1.5 py-0.5 rounded mt-2 uppercase font-bold">Placeholder</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex flex-col justify-between min-h-[72px]">
                    <span className="block text-slate-400 font-bold uppercase text-[8px]">UPI Escrow</span>
                    <span className="block mt-1 font-bold text-slate-500">Auto release escrow</span>
                    <span className="text-[7px] bg-amber-500/5 text-amber-500/40 px-1.5 py-0.5 rounded mt-2 uppercase font-bold">Placeholder</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex flex-col justify-between min-h-[72px]">
                    <span className="block text-slate-400 font-bold uppercase text-[8px]">Digital Contracts</span>
                    <span className="block mt-1 font-bold text-slate-500">Aadhaar e-Sign gateway</span>
                    <span className="text-[7px] bg-amber-500/5 text-amber-500/40 px-1.5 py-0.5 rounded mt-2 uppercase font-bold">Placeholder</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex flex-col justify-between min-h-[72px]">
                    <span className="block text-slate-400 font-bold uppercase text-[8px]">Gov Verification</span>
                    <span className="block mt-1 font-bold text-slate-500">Shram Suvidha cross sync</span>
                    <span className="text-[7px] bg-amber-500/5 text-amber-500/40 px-1.5 py-0.5 rounded mt-2 uppercase font-bold">Placeholder</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex flex-col justify-between min-h-[72px]">
                    <span className="block text-slate-400 font-bold uppercase text-[8px]">Video Verification</span>
                    <span className="block mt-1 font-bold text-slate-500">Biometric liveness log</span>
                    <span className="text-[7px] bg-amber-500/5 text-amber-500/40 px-1.5 py-0.5 rounded mt-2 uppercase font-bold">Placeholder</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex flex-col justify-between min-h-[72px]">
                    <span className="block text-slate-400 font-bold uppercase text-[8px]">Document Vault</span>
                    <span className="block mt-1 font-bold text-slate-500">DigiLocker API tie-in</span>
                    <span className="text-[7px] bg-amber-500/5 text-amber-500/40 px-1.5 py-0.5 rounded mt-2 uppercase font-bold">Placeholder</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex flex-col justify-between min-h-[72px]">
                    <span className="block text-slate-400 font-bold uppercase text-[8px]">Analytics Engine</span>
                    <span className="block mt-1 font-bold text-slate-500">Regional employment telemetry</span>
                    <span className="text-[7px] bg-amber-500/5 text-amber-500/40 px-1.5 py-0.5 rounded mt-2 uppercase font-bold">Placeholder</span>
                  </div>
                </div>
              </div>

            </div>
            {/* ========================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* SECTION 4: Job Requirement Summary (Col 5) */}
              <div className="lg:col-span-5 bg-slate-950/40 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="border-b border-slate-900 pb-2.5 flex items-center justify-between">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                    {lang === "hi" ? "सक्रिय कार्य आवश्यकताएं" : "Job Requirement Summary"}
                  </h4>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">{contractorRequirements.length} Active Demands</span>
                </div>

                <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1 no-scrollbar flex-1">
                  {contractorRequirements.map((req) => (
                    <div key={req.id} className="bg-slate-900/80 p-3 rounded-xl border border-slate-850 text-left space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[11px] font-bold text-white block max-w-[75%] leading-tight">
                          {lang === "hi" ? req.titleHi : req.titleEn}
                        </span>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono uppercase ${req.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-850 text-slate-400 border border-slate-800"}`}>
                          {req.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-[10px] text-slate-400 font-mono">
                        <div>
                          <span className="block text-slate-500 text-[8px] uppercase">{lang === "hi" ? "खाली पद" : "Open"}</span>
                          <span className="font-bold text-amber-500">{req.open} Workers</span>
                        </div>
                        <div>
                          <span className="block text-slate-500 text-[8px] uppercase">{lang === "hi" ? "भरे गए पद" : "Filled"}</span>
                          <span className="font-bold text-emerald-400">{req.filled} Filled</span>
                        </div>
                        <div>
                          <span className="block text-slate-500 text-[8px] uppercase">{lang === "hi" ? "आवेदन पेंडिंग" : "Pending"}</span>
                          <span className="font-bold text-slate-300">{req.pending} Applied</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-5 gap-2 text-center text-[10px] bg-slate-950 p-2.5 rounded-xl border border-slate-900 font-mono">
                  <div>
                    <span className="font-bold text-amber-500 block text-xs">2</span>
                    <span className="text-[8px] text-slate-500 block">Open Req</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-400 block text-xs">24</span>
                    <span className="text-[8px] text-slate-500 block">Filled</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block text-xs">15</span>
                    <span className="text-[8px] text-slate-500 block">Pending</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block text-xs">2</span>
                    <span className="text-[8px] text-slate-500 block">Expired</span>
                  </div>
                  <div>
                    <span className="font-bold text-blue-400 block text-xs">3</span>
                    <span className="text-[8px] text-slate-500 block">Upcoming</span>
                  </div>
                </div>
              </div>

              {/* SECTION 5: Verified Worker Directory (Col 7) */}
              <div className="lg:col-span-7 bg-slate-950/40 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="border-b border-slate-900 pb-2.5 flex items-center justify-between">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                    {lang === "hi" ? "सत्यापित कुशल कामगार निर्देशिका" : "Verified Worker Directory"}
                  </h4>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold">
                    GPS Ready
                  </span>
                </div>

                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1 no-scrollbar flex-1">
                  {[
                    { name: "Suresh Maurya", tradeHi: "राजमिस्त्री", tradeEn: "Mason", exp: "7 Years", availHi: "तत्काल उपलब्ध", availEn: "Available Now", wage: "650", district: "Gorakhpur", passport: "LP-UP-839201" },
                    { name: "Amit Vishwakarma", tradeHi: "बिजली मिस्त्री", tradeEn: "Electrician", exp: "5 Years", availHi: "कल से उपलब्ध", availEn: "Available Tomorrow", wage: "700", district: "Gorakhpur", passport: "LP-UP-728192" },
                    { name: "Karan Bahadur", tradeHi: "शटरिंग कारपेंटर", tradeEn: "Shuttering Carpenter", exp: "10 Years", availHi: "तत्काल उपलब्ध", availEn: "Available Now", wage: "800", district: "Gorakhpur", passport: "LP-UP-910283" },
                    { name: "Rajesh Kumar", tradeHi: "पेंटर", tradeEn: "Painter", exp: "4 Years", availHi: "तत्काल उपलब्ध", availEn: "Available Now", wage: "600", district: "Gorakhpur", passport: "LP-UP-349281" }
                  ].map((w, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-855 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-left">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs leading-none">{w.name}</span>
                          <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono uppercase flex items-center gap-0.5 font-bold">
                            <ShieldCheck className="w-3 h-3" /> Passport Verified
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] text-slate-400 font-mono">
                          <span>Trade: <strong className="text-amber-500 font-bold">{lang === "hi" ? w.tradeHi : w.tradeEn}</strong></span>
                          <span className="text-slate-600">|</span>
                          <span>Exp: <strong>{w.exp}</strong></span>
                          <span className="text-slate-600">|</span>
                          <span>Wage: <strong>₹{w.wage} / Day</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-[9px] text-slate-500 font-mono">
                          <span>District: {w.district}</span>
                          <span className="flex items-center gap-1 text-emerald-400">
                            <MapPin className="w-3 h-3" /> GPS Tracking Ready
                          </span>
                        </div>
                      </div>

                      {/* Interactive Placeholders for Actions */}
                      <div className="flex sm:flex-col gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            handleVoiceSpeak(
                              `कॉल आरंभ किया जा रहा है।`,
                              `Connecting calls via secure regional transport router.`
                            );
                            alert(`कामगार ${w.name} को सीधे कॉल किया जा रहा है (नो-कमीशन)। / Calling ${w.name} anonymously...`);
                          }}
                          className="flex-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-[10px] transition font-mono uppercase tracking-wider cursor-pointer"
                        >
                          {lang === "hi" ? "कॉल" : "Call"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            alert(`एसएमएस विवरण: आपका डिजिटल श्रम आमंत्रण भेजा गया है। / SMS sent to ${w.name}.`);
                          }}
                          className="flex-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-[10px] transition font-mono uppercase tracking-wider cursor-pointer border border-slate-700"
                        >
                          SMS
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* BENTO GRID ROW 3: WORKER ATTENDANCE MONITOR (Col 6) & DIGITAL PAYMENT PLACEHOLDER (Col 6) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* SECTION 6: Worker Attendance Monitor (Col 6) */}
              <div className="lg:col-span-6 bg-slate-950/40 p-5 rounded-2xl border border-slate-800 space-y-4 text-left">
                <div className="border-b border-slate-900 pb-2.5 flex items-center justify-between">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                    {lang === "hi" ? "कामगार दैनिक हाजिरी मॉनिटर" : "Worker Attendance Monitor"}
                  </h4>
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded font-mono uppercase font-bold">
                    92% TODAY
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-850">
                      <span className="text-[9px] text-slate-500 block uppercase font-mono">{lang === "hi" ? "चेक-इन कामगार" : "Workers Checked In"}</span>
                      <span className="text-xl font-bold text-emerald-400 font-mono block mt-1">38 / 42</span>
                      <span className="text-[9px] text-slate-500 block mt-1 font-mono">GPS Verified Site Location</span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-850">
                      <span className="text-[9px] text-slate-500 block uppercase font-mono">{lang === "hi" ? "अनुपस्थित कामगार" : "Absent Workers"}</span>
                      <span className="text-xl font-bold text-red-400 font-mono block mt-1">3</span>
                      <span className="text-[9px] text-slate-500 block mt-1 font-mono">No Checked In Log Received</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[9px] text-amber-500 block uppercase font-mono tracking-wider font-bold">QR Attendance System</span>
                      <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                        {lang === "hi" ? "कामगार साइट पर आपके विशेष क्यूआर को स्कैन कर हाजिरी लगा सकते हैं।" : "Direct contactless verification using secure, local terminal QR codes."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert("क्यूआर कोड जेनरेट किया जा रहा है... / Generating local terminal check-in QR code...")}
                      className="w-full py-1.5 bg-slate-950 hover:bg-slate-855 border border-slate-800 text-slate-300 rounded-lg text-[10px] font-mono uppercase transition cursor-pointer"
                    >
                      {lang === "hi" ? "क्यूआर कोड दिखाएं" : "Open Terminal QR Code"}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 text-xs text-slate-400 font-mono flex items-center justify-between">
                  <span>GPS VERIFICATION BOUNDARY STATUS:</span>
                  <span className="text-emerald-400 font-bold">● ACTIVE & ENFORCED</span>
                </div>
              </div>

              {/* SECTION 7: Digital Payment Placeholder (Col 6) */}
              <div className="lg:col-span-6 bg-slate-950/40 p-5 rounded-2xl border border-slate-800 space-y-4 text-left">
                <div className="border-b border-slate-900 pb-2.5 flex items-center justify-between">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                    {lang === "hi" ? "राष्ट्रीय डिजिटल भुगतान पोर्टल" : "Digital Payment & Wallet Gateway"}
                  </h4>
                  <span className="text-[9px] text-slate-500 uppercase font-mono">Secure Settlement Escrow</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-850">
                    <span className="text-[8px] text-slate-500 block uppercase font-mono">{lang === "hi" ? "आगामी भुगतान" : "Upcoming Payments"}</span>
                    <span className="text-base font-bold text-white block mt-1 font-mono">₹14,500</span>
                    <span className="text-[8px] text-slate-500 block mt-1 font-mono">Weekly Wage Pool</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-850">
                    <span className="text-[8px] text-slate-500 block uppercase font-mono">{lang === "hi" ? "पूरे किए गए भुगतान" : "Completed Payments"}</span>
                    <span className="text-base font-bold text-emerald-400 block mt-1 font-mono">₹86,400</span>
                    <span className="text-[8px] text-slate-500 block mt-1 font-mono">Direct Bank Transferred</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-850">
                    <span className="text-[8px] text-slate-500 block uppercase font-mono">{lang === "hi" ? "लंबित समझौते" : "Pending Settlements"}</span>
                    <span className="text-base font-bold text-amber-500 block mt-1 font-mono">₹6,800</span>
                    <span className="text-[8px] text-slate-500 block mt-1 font-mono">Awaiting verification logs</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-850 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase font-mono">National Labour Wallet Balance</span>
                      <span className="text-lg font-black text-emerald-400 font-mono mt-0.5 block">₹45,200</span>
                    </div>
                    <span className="text-[9px] bg-amber-500/10 text-amber-500 px-2 py-1 rounded border border-amber-500/25 font-mono uppercase font-bold">
                      UPI Escrow Ready
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-950 flex flex-col sm:flex-row gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => alert("भुगतान प्रक्रिया डेमो मोड में है। कोई वास्तविक शुल्क लागू नहीं होगा। / Demo Escrow settlement launched.")}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-[10px] font-mono uppercase transition cursor-pointer"
                    >
                      {lang === "hi" ? "एस्क्रो भुगतान जारी करें" : "Release Escrow Funds"}
                    </button>
                    <button
                      type="button"
                      onClick={() => alert("वैकल्पिक भुगतान प्रणाली यूपीआई / UPI QR system demo.")}
                      className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-[10px] font-mono uppercase transition cursor-pointer"
                    >
                      UPI Transfer Demo
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* BENTO GRID ROW 4: CONTRACTOR NOTIFICATIONS (Col 4) & TRUST SCORE (Col 4) & FUTURE BOUNDARIES (Col 4) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* SECTION 8: Contractor Notifications (Col 1) */}
              <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 text-left">
                <div className="border-b border-slate-900 pb-2 flex items-center justify-between">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                    {lang === "hi" ? "कांट्रेक्टर सूचनाएं" : "Contractor Notifications"}
                  </h4>
                  <span className="text-[8px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded font-mono uppercase font-bold">
                    New Alerts
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 no-scrollbar flex-1">
                  {contractorNotifications.map((notif) => (
                    <div key={notif.id} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-850 relative text-[11px] leading-relaxed">
                      {notif.unread && (
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      )}
                      <p className="text-slate-300 pr-3">{lang === "hi" ? notif.textHi : notif.textEn}</p>
                      <span className="text-[9px] text-slate-500 font-mono block mt-1.5">{notif.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 9: Trust Score Placeholder (Col 2) */}
              <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 text-left">
                <div className="border-b border-slate-900 pb-2">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                    {lang === "hi" ? "राष्ट्रीय सरकारी विश्वास सूचकांक" : "Government Trust Index Score"}
                  </h4>
                </div>

                <div className="space-y-3.5 text-xs flex-1 flex flex-col justify-center">
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-500">{lang === "hi" ? "नियोजन इतिहास रेटिंग" : "Hiring History Rating"}</span>
                    <span className="font-bold text-white font-mono">4.9 / 5.0</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-500">{lang === "hi" ? "कामगार प्रतिक्रिया रेटिंग" : "Worker Rating"}</span>
                    <span className="font-bold text-amber-500 font-mono">4.8 / 5.0</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-500">{lang === "hi" ? "कार्य समापन दर" : "Completion Score"}</span>
                    <span className="font-bold text-emerald-400 font-mono">96%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{lang === "hi" ? "पहचान सत्यापन स्कोर" : "Verification Score"}</span>
                    <span className="font-bold text-emerald-400 font-mono">100%</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-amber-950/20 p-3 rounded-xl border border-amber-500/20 text-center text-[10px] text-amber-500 font-mono tracking-wide uppercase font-bold">
                  ✓ GOVERNMENT TRUST LAYER AUTHORIZED
                </div>
              </div>

              {/* SECTION 10: Future Integration Boundaries (Col 3) */}
              <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 text-left">
                <div className="border-b border-slate-900 pb-2">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                    {lang === "hi" ? "भावी एकीकरण सीमाएं" : "Future Integration Boundaries"}
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono flex-1">
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-850/60 text-slate-500 text-center">
                    <span className="block text-slate-400 font-bold uppercase text-[8px]">AI MATCHING</span>
                    <span className="block mt-1 font-bold text-amber-500">READY</span>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-855/60 text-slate-500 text-center">
                    <span className="block text-slate-400 font-bold uppercase text-[8px]">GIS MAPPING</span>
                    <span className="block mt-1 font-bold text-amber-500">READY</span>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-855/60 text-slate-500 text-center">
                    <span className="block text-slate-400 font-bold uppercase text-[8px]">BOOKING ENGINE</span>
                    <span className="block mt-1 font-bold text-amber-500">READY</span>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-855/60 text-slate-500 text-center">
                    <span className="block text-slate-400 font-bold uppercase text-[8px]">DIGITAL CONTRACTS</span>
                    <span className="block mt-1 font-bold text-amber-500">READY</span>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-855/60 text-slate-500 text-center">
                    <span className="block text-slate-400 font-bold uppercase text-[8px]">PAYMENT GATEWAY</span>
                    <span className="block mt-1 font-bold text-amber-500">READY</span>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-855/60 text-slate-500 text-center">
                    <span className="block text-slate-400 font-bold uppercase text-[8px]">ANALYTICS ENGINE</span>
                    <span className="block mt-1 font-bold text-amber-500">READY</span>
                  </div>
                </div>

                <div className="text-[9px] text-slate-500 text-center italic leading-normal">
                  No active backend connectors initialized on production placeholders.
                </div>
              </div>

            </div>

            {/* National Labour Intelligence Entry Card in Contractor Dashboard */}
            <div className="mt-8 bg-gradient-to-br from-slate-950 via-slate-950 to-amber-950/20 border border-amber-500/20 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-5 text-left relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700" />
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-amber-500 font-black tracking-widest block uppercase">
                  {lang === "hi" ? "वंदे भारतम इम्पैक्ट इंटेलिजेंस" : "Vande Bharatam Impact Intelligence Layer"}
                </span>
                <h4 className="text-base font-bold text-white font-mono flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                  {lang === "hi" ? "राष्ट्रीय लेबर इंटेलिजेंस डैशबोर्ड" : "National Labour Intelligence Dashboard"}
                </h4>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  {lang === "hi" 
                    ? "भारत के डिजिटल लेबर इन्फ्रास्ट्रक्चर के जिला-वार मांग संकेतों, कौशल अंतराल और श्रम गतिशीलता को ट्रैक करें।"
                    : "Track district-wise demand signals, skill gaps, and labor mobility across India’s digital labor infrastructure."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowLabourIntel(true);
                  handleVoiceSpeak("राष्ट्रीय लेबर इंटेलिजेंस डैशबोर्ड खोला जा रहा है।", "Opening National Labour Intelligence Dashboard...");
                }}
                className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold font-mono transition shadow-lg shrink-0 flex items-center gap-2 cursor-pointer uppercase"
              >
                <TrendingUp className="w-4 h-4" />
                <span>{lang === "hi" ? "इंटेलिजेंस डैशबोर्ड देखें" : "View Intelligence Dashboard"}</span>
              </button>
            </div>

            {/* PROMPT-15: AI CONTRACTOR RECOMMENDATION & SMART HIRING INTELLIGENCE ENGINE */}
            <div id="ai-smart-hiring-section" className="mt-8 border-t border-slate-800 pt-8 space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 rounded-2xl shadow-xl">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white font-sans tracking-tight flex items-center gap-2">
                      {lang === "hi" ? "एआई स्मार्ट भर्ती सुझाव" : "AI Smart Hiring Recommendations"}
                      <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase animate-pulse">AI Core v2.0</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {lang === "hi"
                        ? "सत्यापित डेटा संकेतों के आधार पर आपकी सक्रिय साइटों के लिए अनुकूलित सर्वश्रेष्ठ कामगारों की खोज करें।"
                        : "Discover explainable top-matched verified workers for your active construction sites using real-time signals."}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-amber-500/15 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-wider self-start sm:self-center">
                  {lang === "hi" ? "स्मार्ट एआई इंजन" : "SMART AI ENGINE"}
                </span>
              </div>

              {/* SIMULATED TOASTS / STATUS NOTIFICATIONS */}
              {prompt15CallingWorker && (
                <div className="bg-amber-500 text-slate-950 p-3 rounded-xl flex items-center justify-between font-mono text-xs font-bold animate-pulse shadow-lg">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 animate-bounce" />
                    <span>
                      {lang === "hi" 
                        ? `सिम्युलेटेड वॉयस कॉल कनेक्ट की जा रही है: +91 98765 43210 (${prompt15CallingWorker})...` 
                        : `Connecting Simulated Voice Call to ${prompt15CallingWorker} (+91 98765 43210)...`}
                    </span>
                  </div>
                  <button 
                    onClick={() => setPrompt15CallingWorker(null)}
                    className="bg-slate-950 text-white px-2.5 py-1 rounded hover:bg-slate-900 transition text-[10px]"
                  >
                    {lang === "hi" ? "कॉल समाप्त करें" : "Disconnect"}
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* 3 Recommended Workers Grid (Col 8) */}
                <div className="lg:col-span-8 space-y-4">
                  {[
                    {
                      id: "rec-1",
                      name: "Hari Ram",
                      nameHi: "हरी राम",
                      trade: "Mason",
                      tradeHi: "राजमिस्त्री",
                      distance: "1.2 km",
                      wage: 900,
                      availability: lang === "hi" ? "आज उपलब्ध (8 AM)" : "Available Today (8 AM)",
                      availabilityColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                      trustScore: 98,
                      attendance: 99,
                      completion: 98,
                      fit: 98,
                      bulletsHi: [
                        "१.५ किमी सीमा के भीतर गोरखपुर हाईवे साइट से मेल खाता है।",
                        "क्षेत्रीय GIDA मजदूरी मानकों के साथ सटीक मूल्य संरेखण।",
                        "शून्य अंतिम मिनट रद्दीकरण के साथ विशिष्ट उपस्थिति विश्वसनीयता।"
                      ],
                      bulletsEn: [
                        "Matches Gorakhpur highway site within 1.5km range.",
                        "Perfect pricing alignment with regional GIDA wage standards.",
                        "Elite attendance reliability with zero last-minute cancellations."
                      ],
                      breakdown: { skill: 100, location: 98, wage: 96, trust: 98, avail: 100, reliability: 99 }
                    },
                    {
                      id: "rec-2",
                      name: "Manoj Kumar",
                      nameHi: "मनोज कुमार",
                      trade: "Painter",
                      tradeHi: "पेंटर",
                      distance: "2.5 km",
                      wage: 850,
                      availability: lang === "hi" ? "कल उपलब्ध" : "Available Tomorrow",
                      availabilityColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                      trustScore: 94,
                      attendance: 95,
                      completion: 96,
                      fit: 94,
                      bulletsHi: [
                        "सेक्टर-५ वाणिज्यिक पेंटिंग कार्यों में उच्च प्रदर्शन रेटिंग।",
                        "प्रतिस्पर्धी मजदूरी दरें, जो GIDA औसत से कम हैं।",
                        "सत्यापित राज्य स्तरीय पहचान और पृष्ठभूमि मंजूरी।"
                      ],
                      bulletsEn: [
                        "High-performance rating in sector-5 commercial painting jobs.",
                        "Competitive wage rates, lower than GIDA ceiling averages.",
                        "Verified state-level identity and background clearance."
                      ],
                      breakdown: { skill: 95, location: 92, wage: 98, trust: 94, avail: 90, reliability: 95 }
                    },
                    {
                      id: "rec-3",
                      name: "Sunil Yadav",
                      nameHi: "सुनील यादव",
                      trade: "Helper",
                      tradeHi: "मददगार / बेलदार",
                      distance: "3.1 km",
                      wage: 600,
                      availability: lang === "hi" ? "आज उपलब्ध" : "Available Today",
                      availabilityColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                      trustScore: 89,
                      attendance: 92,
                      completion: 90,
                      fit: 89,
                      bulletsHi: [
                        "ऊंची इमारतों में भारी वजन उठाने के लिए उत्कृष्ट शारीरिक सहनशक्ति रिकॉर्ड।",
                        "GIDA औद्योगिक लॉजिस्टिक्स के लिए तत्काल तैनाती के लिए तैयार।",
                        "लगातार २४ असाइनमेंट में लगातार चेक-इन समयबद्धता।"
                      ],
                      bulletsEn: [
                        "Excellent physical endurance records for high-rise heavy lifting.",
                        "Immediate deployment-ready for GIDA industrial logistics.",
                        "Consistent check-in punctuality over 24 consecutive assignments."
                      ],
                      breakdown: { skill: 90, location: 88, wage: 92, trust: 89, avail: 100, reliability: 90 }
                    }
                  ].map((worker) => {
                    const isShortlisted = prompt15Shortlisted.includes(worker.id);
                    const isOffered = prompt15OffersSent.includes(worker.id);
                    const isViewingPassport = prompt15ViewingPassport === worker.id;

                    return (
                      <div key={worker.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-850 hover:border-slate-800 transition duration-150 space-y-4">
                        {/* Upper Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-900">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center font-bold text-white uppercase text-sm font-mono relative">
                              {worker.name[0]}
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-slate-950" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="text-sm font-bold text-white font-mono">
                                  {lang === "hi" ? worker.nameHi : worker.name}
                                </h5>
                                <span className="text-[10px] text-slate-500">|</span>
                                <span className="text-[11px] font-mono font-bold text-amber-500 uppercase">
                                  {lang === "hi" ? worker.tradeHi : worker.trade}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                                <span className="flex items-center gap-1 font-mono text-[11px]">
                                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> {worker.distance}
                                </span>
                                <span>•</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-mono font-bold ${worker.availabilityColor}`}>
                                  {worker.availability}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* AI Fit Circle Badge */}
                          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 px-3.5 py-1.5 rounded-xl text-right shrink-0">
                            <div>
                              <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold leading-none">
                                {lang === "hi" ? "एआई मैचिंग फिट" : "AI MATCHING FIT"}
                              </span>
                              <span className="text-md font-black text-amber-500 font-mono mt-0.5 block leading-none">
                                {worker.fit}%
                              </span>
                            </div>
                            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                          </div>
                        </div>

                        {/* Middle Info & Metrics Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                          <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-900/60 text-left">
                            <span className="text-[9px] text-slate-500 block uppercase">{lang === "hi" ? "मजदूरी दर" : "Wage Demand"}</span>
                            <span className="font-bold text-white block mt-1">₹{worker.wage} / {lang === "hi" ? "दिन" : "day"}</span>
                          </div>
                          <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-900/60 text-left">
                            <span className="text-[9px] text-slate-500 block uppercase">{lang === "hi" ? "ट्रस्ट स्कोर" : "Trust Score"}</span>
                            <span className="font-bold text-emerald-400 block mt-1">🛡️ {worker.trustScore}%</span>
                          </div>
                          <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-900/60 text-left">
                            <span className="text-[9px] text-slate-500 block uppercase">{lang === "hi" ? "उपस्थिति दर" : "Attendance Rate"}</span>
                            <span className="font-bold text-blue-400 block mt-1">📊 {worker.attendance}%</span>
                          </div>
                          <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-900/60 text-left">
                            <span className="text-[9px] text-slate-500 block uppercase">{lang === "hi" ? "पूर्णता दर" : "Completion Rate"}</span>
                            <span className="font-bold text-white block mt-1">🎯 {worker.completion}%</span>
                          </div>
                        </div>

                        {/* Explainable AI Reason Bullets */}
                        <div className="bg-slate-900/30 border border-slate-900 p-3.5 rounded-xl space-y-2 text-xs">
                          <span className="text-[10px] text-slate-500 font-mono uppercase font-bold tracking-wider block">
                            💡 {lang === "hi" ? "एआई मिलान स्पष्टीकरण" : "Explainable AI Match Reasons"}
                          </span>
                          <ul className="space-y-1.5 text-slate-300">
                            {(lang === "hi" ? worker.bulletsHi : worker.bulletsEn).map((bullet, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-amber-500 shrink-0 mt-1">•</span>
                                <span className="text-[11px] leading-relaxed">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Scoring Breakdown Bar Visualizer */}
                        <div className="space-y-2.5 border-t border-slate-900/80 pt-3">
                          <span className="text-[10px] text-slate-500 font-mono uppercase font-bold tracking-wider block">
                            🎯 {lang === "hi" ? "एआई स्कोरिंग ब्रेकडाउन" : "Explainable AI Scoring Breakdown"}
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[10px] font-mono text-slate-400">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span>{lang === "hi" ? "कौशल मिलान" : "Skill Match"}</span>
                                <span className="text-white font-bold">{worker.breakdown.skill}%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500" style={{ width: `${worker.breakdown.skill}%` }} />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span>{lang === "hi" ? "स्थान निकटता" : "Location Proximity"}</span>
                                <span className="text-white font-bold">{worker.breakdown.location}%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: `${worker.breakdown.location}%` }} />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span>{lang === "hi" ? "मजदूरी उपयुक्तता" : "Wage Alignment"}</span>
                                <span className="text-white font-bold">{worker.breakdown.wage}%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: `${worker.breakdown.wage}%` }} />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span>{lang === "hi" ? "ट्रस्ट विश्वसनीयता" : "Trust & Identity"}</span>
                                <span className="text-white font-bold">{worker.breakdown.trust}%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500" style={{ width: `${worker.breakdown.trust}%` }} />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span>{lang === "hi" ? "दैनिक उपलब्धता" : "Daily Availability"}</span>
                                <span className="text-white font-bold">{worker.breakdown.avail}%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-pink-500" style={{ width: `${worker.breakdown.avail}%` }} />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span>{lang === "hi" ? "पिछला प्रदर्शन" : "Past Attendance"}</span>
                                <span className="text-white font-bold">{worker.breakdown.reliability}%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-500" style={{ width: `${worker.breakdown.reliability}%` }} />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Simulated Passport Modal/Inline Overlay */}
                        {isViewingPassport && (
                          <div className="bg-slate-900 border-2 border-emerald-500/30 rounded-xl p-4.5 animate-fadeIn relative">
                            <button
                              type="button"
                              onClick={() => setPrompt15ViewingPassport(null)}
                              className="absolute top-3 right-3 text-slate-400 hover:text-white text-xs font-mono"
                            >
                              ✕
                            </button>
                            <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5" /> SECURE NATIONAL LABOUR PASSPORT
                              </span>
                              <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                                VERIFIED
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                              <div>
                                <span className="text-slate-500 block uppercase text-[8px]">{lang === "hi" ? "नाम" : "FULL NAME"}:</span>
                                <span className="text-white font-bold block">{lang === "hi" ? worker.nameHi : worker.name}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 block uppercase text-[8px]">{lang === "hi" ? "राष्ट्रीय पहचान संख्या" : "NATIONAL LABOUR UID"}:</span>
                                <span className="text-white font-bold block">LAB-IND-283-{worker.id.toUpperCase()}-B</span>
                              </div>
                              <div>
                                <span className="text-slate-500 block uppercase text-[8px]">{lang === "hi" ? "प्रमाणित हुनर" : "VERIFIED TRADE"}:</span>
                                <span className="text-amber-500 font-bold block">{lang === "hi" ? worker.tradeHi : worker.trade}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 block uppercase text-[8px]">{lang === "hi" ? "सुरक्षा साफ़ पत्र" : "BACKGROUND CLEARANCE"}:</span>
                                <span className="text-emerald-400 font-bold block">✓ PASSED / CLEAN</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Interactive Action Buttons */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-slate-900 pt-3">
                          <button
                            type="button"
                            onClick={() => {
                              setPrompt15CallingWorker(worker.name);
                              handleVoiceSpeak(
                                `${worker.nameHi} को सिम्युलेटेड कॉल मिलाई जा रही है।`,
                                `Placing simulated voice call to ${worker.name}.`
                              );
                            }}
                            className="p-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/30 text-slate-300 hover:text-white rounded-xl transition font-bold font-mono text-[11px] flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px]"
                          >
                            <Phone className="w-3.5 h-3.5 text-amber-500" />
                            <span>{lang === "hi" ? "सीधा कॉल" : "Direct Call"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (isOffered) return;
                              setPrompt15OffersSent([...prompt15OffersSent, worker.id]);
                              handleVoiceSpeak(
                                `${worker.nameHi} को डिजिटल नौकरी का प्रस्ताव सफलतापूर्वक भेजा गया है।`,
                                `Digital employment offer successfully dispatched to ${worker.name}.`
                              );
                              alert(`सफलता: ${lang === "hi" ? worker.nameHi : worker.name} को राष्ट्रीय श्रम ग्रिड के तहत काम का प्रस्ताव भेजा गया!`);
                            }}
                            className={`p-2 border rounded-xl transition font-bold font-mono text-[11px] flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px] ${
                              isOffered
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-bold"
                                : "bg-slate-900 hover:bg-slate-850 border-slate-800 hover:border-emerald-500/30 text-slate-300 hover:text-white"
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{isOffered ? (lang === "hi" ? "प्रस्ताव भेजा" : "Offer Sent") : (lang === "hi" ? "नौकरी प्रस्ताव" : "Send Offer")}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setPrompt15ViewingPassport(isViewingPassport ? null : worker.id);
                              handleVoiceSpeak(
                                `${worker.nameHi} का डिजिटल पासपोर्ट और बायोडाटा लोड किया जा रहा है।`,
                                `Loading secure national labour passport credentials for ${worker.name}.`
                              );
                            }}
                            className="p-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/30 text-slate-300 hover:text-white rounded-xl transition font-bold font-mono text-[11px] flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px]"
                          >
                            <Award className="w-3.5 h-3.5 text-blue-400" />
                            <span>{lang === "hi" ? "पासपोर्ट देखें" : "View Passport"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (isShortlisted) {
                                setPrompt15Shortlisted(prompt15Shortlisted.filter(id => id !== worker.id));
                                handleVoiceSpeak(`${worker.nameHi} को शॉर्टलिस्ट से हटा दिया गया है।`, `Removed ${worker.name} from shortlist.`);
                              } else {
                                setPrompt15Shortlisted([...prompt15Shortlisted, worker.id]);
                                handleVoiceSpeak(`${worker.nameHi} को शॉर्टलिस्ट किया गया है।`, `Added ${worker.name} to shortlist.`);
                              }
                            }}
                            className={`p-2 border rounded-xl transition font-bold font-mono text-[11px] flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px] ${
                              isShortlisted
                                ? "bg-amber-500 text-slate-950 border-amber-500 hover:bg-amber-600"
                                : "bg-slate-900 hover:bg-slate-850 border-slate-800 hover:border-amber-500/30 text-slate-300 hover:text-white"
                            }`}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isShortlisted ? "fill-slate-950 text-slate-950" : "text-amber-500"}`} />
                            <span>{isShortlisted ? (lang === "hi" ? "शॉर्टलिस्टेड" : "Shortlisted") : (lang === "hi" ? "शॉर्टलिस्ट" : "Shortlist")}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* AI Hiring Optimizer Panel (Col 4) */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-900 pb-2.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                        {lang === "hi" ? "एआई भर्ती अनुकूलक" : "AI Hiring Optimizer"}
                      </h5>
                    </div>

                    <div className="space-y-3.5 text-xs">
                      <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-xl border border-slate-850/60">
                        <div className="text-left">
                          <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "सर्वश्रेष्ठ कामगार अभी" : "BEST WORKER NOW"}</span>
                          <span className="font-bold text-white block mt-0.5">
                            {lang === "hi" ? "हरी राम (राजमिस्त्री)" : "Hari Ram (Mason)"}
                          </span>
                        </div>
                        <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-mono font-bold border border-amber-500/20">
                          98% Fit
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-xl border border-slate-850/60">
                        <div className="text-left">
                          <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "सबसे तेज़ उपलब्ध" : "FASTEST AVAILABLE"}</span>
                          <span className="font-bold text-white block mt-0.5">
                            {lang === "hi" ? "सुनील यादव (मददगार)" : "Sunil Yadav (Helper)"}
                          </span>
                        </div>
                        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold border border-emerald-500/20">
                          {lang === "hi" ? "तत्काल" : "Immediate"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-xl border border-slate-850/60">
                        <div className="text-left">
                          <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "न्यूनतम दैनिक मजदूरी" : "LOWEST WAGE FIT"}</span>
                          <span className="font-bold text-white block mt-0.5">
                            {lang === "hi" ? "सुनील यादव (मददगार)" : "Sunil Yadav (Helper)"}
                          </span>
                        </div>
                        <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-mono font-bold border border-blue-500/20">
                          ₹600/{lang === "hi" ? "दिन" : "day"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-xl border border-slate-850/60">
                        <div className="text-left">
                          <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "सर्वोच्च विश्वसनीयता" : "HIGHEST TRUST SCORE"}</span>
                          <span className="font-bold text-white block mt-0.5">
                            {lang === "hi" ? "हरी राम (राजमिस्त्री)" : "Hari Ram (Mason)"}
                          </span>
                        </div>
                        <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-mono font-bold border border-purple-500/20">
                          98% Trust
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-1.5 text-left">
                      <span className="text-[10px] text-amber-500 font-mono font-bold uppercase tracking-wider block">
                        ⚙️ {lang === "hi" ? "अनुशंसित भर्ती रणनीति" : "Recommended Hiring Strategy"}
                      </span>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                        {lang === "hi"
                          ? "मुख्य राजमिस्त्री कार्य के लिए हरी राम को तुरंत लॉक करें, और उत्पादकता बढ़ाने व संचयी पाली लागत को १५% तक कम करने के लिए सहायक के रूप में सुनील यादव के साथ जोड़ें।"
                          : "Lock in Hari Ram immediately for core masonry, and pair with Sunil Yadav as assistant helper to maximize productivity and lower combined shift costs by 15%."}
                      </p>
                    </div>
                  </div>

                  {/* Jury Explanation Box */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-900 pb-2.5">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                        {lang === "hi" ? "भारत के लिए क्यों आवश्यक है?" : "Why this matters for India"}
                      </h4>
                    </div>
                    <div className="text-xs text-slate-300 space-y-2 text-left leading-relaxed">
                      <p>
                        <strong>English:</strong> LabourAdda reduces contractor hiring time by ranking verified workers using skill, distance, wage fit, trust, attendance, and job completion signals.
                      </p>
                      <p className="border-t border-slate-900/80 pt-2 text-[11px] text-slate-400">
                        <strong>Hindi:</strong> लेबरअड्डा हुनर, दूरी, मजदूरी उपयुक्तता, विश्वास, उपस्थिति और कार्य पूर्णता संकेतों का उपयोग करके सत्यापित कामगारों को रैंक करता है, जिससे कांट्रेक्टर के भर्ती समय में कमी आती है।
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROMPT-16: WORKER PASSPORT VERIFICATION CONSOLE */}
            <div id="worker-passport-verification-console" className="mt-8 border-t border-slate-800 pt-8 text-left space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-gradient-to-tr from-emerald-500 to-emerald-600 text-slate-950 rounded-2xl shadow-xl">
                    <ShieldCheck className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white font-sans tracking-tight">
                      {lang === "hi" ? "कामगार पासपोर्ट सत्यापन कंसोल" : "Worker Passport Verification Console"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {lang === "hi"
                        ? "सुरक्षित क्यूआर स्कैन और राष्ट्रीय श्रम डेटाबेस का उपयोग करके वास्तविक समय में पहचान सत्यापित करें।"
                        : "Verify worker identities in real-time using secure QR scanning and the National Labour Registry database."}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-wider">
                  AUTH LAYER v2.0
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Form: Input, Scan and Verification Checks */}
                <div className="lg:col-span-6 bg-slate-950/60 p-5 rounded-2xl border border-slate-850 space-y-4">
                  <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-900 pb-2">
                    {lang === "hi" ? "सत्यापन उपकरण और इनपुट" : "Verification Controls & Inputs"}
                  </h5>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider font-mono block mb-1.5 font-bold">
                        {lang === "hi" ? "श्रम पासपोर्ट आईडी दर्ज करें" : "Enter Labour Passport ID"}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. LP-IND-391821-A"
                          value={prompt16ContractorIdInput}
                          onChange={(e) => setPrompt16ContractorIdInput(e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-mono focus:border-amber-500 outline-none placeholder:text-slate-600"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!prompt16ContractorIdInput) {
                              setPrompt16ContractorIdInput("LP-IND-391821-A");
                            }
                            setPrompt16ContractorIdVerified(true);
                            handleVoiceSpeak("पासपोर्ट आईडी सत्यापन पूरा हुआ।", "Passport ID verification query submitted to national registry.");
                          }}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold font-mono rounded-xl text-xs transition cursor-pointer flex items-center gap-1 min-h-[38px]"
                        >
                          {lang === "hi" ? "जांचें" : "Verify ID"}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPrompt16ContractorScan(true);
                          setPrompt16ContractorIdInput("LP-IND-391821-A");
                          handleVoiceSpeak("क्यूआर कोड सफलतापूर्वक स्कैन हो गया है।", "Secure QR scan successful. Hari Ram's passport loaded.");
                        }}
                        className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition font-extrabold font-mono text-xs flex items-center justify-center gap-2 cursor-pointer min-h-[38px]"
                      >
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                        <span>{lang === "hi" ? "क्यूआर स्कैन डेमो" : "Scan QR Demo"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (!prompt16ContractorScan && !prompt16ContractorIdVerified) {
                            alert("Please scan a QR or verify a Passport ID first.");
                            return;
                          }
                          setPrompt16ContractorApproved(true);
                          handleVoiceSpeak("वर्क ऑर्डर के लिए कामगार स्वीकृत हो गया है।", "Worker approved for work order successfully.");
                        }}
                        className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 rounded-xl transition font-extrabold font-mono text-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px]"
                      >
                        <Check className="w-4 h-4" />
                        <span>{lang === "hi" ? "वर्क ऑर्डर हेतु स्वीकृत" : "Approve for Work Order"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Verification telemetry checks */}
                  <div className="pt-4 border-t border-slate-900 space-y-2.5">
                    <span className="text-[10px] text-slate-500 font-mono uppercase font-bold tracking-wider block">
                      🛡️ Real-Time Safety Gate / सुरक्षा गेटवे:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                      <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-850 flex items-center justify-between">
                        <span className="text-slate-400">{lang === "hi" ? "नकली आईडी जांच" : "Fake ID Check"}</span>
                        <span className="text-emerald-400 font-bold uppercase">✓ Passed</span>
                      </div>
                      <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-850 flex items-center justify-between">
                        <span className="text-slate-400">{lang === "hi" ? "पृष्ठभूमि परत" : "Trust Layer"}</span>
                        <span className="text-emerald-400 font-bold uppercase">✓ Verified</span>
                      </div>
                      <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-850 flex items-center justify-between">
                        <span className="text-slate-400">{lang === "hi" ? "पात्रता स्थिति" : "Job Eligibility"}</span>
                        <span className="text-emerald-400 font-bold uppercase">✓ Approved</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel: Simulated Scan Result (Col 6) */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                  {(prompt16ContractorScan || prompt16ContractorIdVerified) ? (
                    <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-950/15 border border-emerald-500/20 p-5 rounded-2xl flex-1 space-y-4 text-xs font-mono relative animate-fadeIn">
                      <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                          <ShieldCheck className="w-4 h-4" /> PASSPORT FOUND
                        </span>
                        <span className="text-[9px] text-slate-500">LP-IND-391821-A</span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between border-b border-slate-900 pb-1.5">
                          <span className="text-slate-500">{lang === "hi" ? "कामगार का नाम" : "Worker"}:</span>
                          <span className="font-bold text-white text-sm">Hari Ram — Mason</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-slate-500 block text-[9px] uppercase">{lang === "hi" ? "निकटता" : "Distance"}:</span>
                            <span className="font-bold text-white block mt-0.5">📍 1.2 km</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[9px] uppercase">{lang === "hi" ? "विश्वास स्कोर" : "Trust Score"}:</span>
                            <span className="font-bold text-emerald-400 block mt-0.5">🛡️ 98%</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[9px] uppercase">{lang === "hi" ? "हाजिरी दर" : "Attendance Rate"}:</span>
                            <span className="font-bold text-emerald-400 block mt-0.5">📊 99%</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[9px] uppercase">{lang === "hi" ? "विवाद जोखिम" : "Payment Dispute Risk"}:</span>
                            <span className="font-bold text-emerald-400 block mt-0.5">✓ Low</span>
                          </div>
                        </div>

                        <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-850 flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-bold">{lang === "hi" ? "अनुशंसित कार्रवाई:" : "Recommended Action:"}</span>
                          <span className="text-slate-950 font-black bg-emerald-400 px-2 py-0.5 rounded font-mono text-[10px] uppercase">
                            SAFE TO HIRE
                          </span>
                        </div>
                      </div>

                      {prompt16ContractorApproved && (
                        <div className="p-3 bg-emerald-500 text-slate-950 font-sans font-bold rounded-xl space-y-1 shadow-lg animate-fadeIn">
                          <div className="flex items-center gap-1.5 text-xs">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{lang === "hi" ? "कार्य आदेश स्वीकृत ✓" : "Work Order Approved ✓"}</span>
                          </div>
                          <p className="text-[10px] font-normal font-mono opacity-90 leading-tight">
                            Worker has been securely assigned to your Gorakhpur site project.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-slate-950/40 border border-slate-855 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center flex-1 space-y-2">
                      <Camera className="w-8 h-8 text-slate-600 animate-pulse" />
                      <h6 className="text-slate-400 font-bold text-xs uppercase font-mono tracking-wider">
                        {lang === "hi" ? "स्कैन परिणाम के लिए तैयार" : "Awaiting Scanner / Verification Query"}
                      </h6>
                      <p className="text-[11px] text-slate-500 max-w-xs">
                        {lang === "hi"
                          ? "डेमो परिणाम देखने के लिए 'क्यूआर स्कैन' बटन दबाएं या 'सत्यापित आईडी' इनपुट का उपयोग करें।"
                          : "Press the 'Scan QR Demo' button or enter a valid passport ID to run simulated verification checks."}
                      </p>
                    </div>
                  )}

                  {/* Compliance Warning */}
                  <div className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-850 text-[10px] text-slate-500 font-mono leading-snug">
                    🛡️ <strong>Demo Compliance Note:</strong> No real Aadhaar, banking, or government API is connected. This module demonstrates contractor-side cryptographic passport verification workflow only.
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* Dynamic Category Filtering Row */}
        <div id="category-filter-container" className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider">
              {lang === "hi" ? "क्षेत्र के अनुसार खोज" : "Sector-Wise Discovery"}
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              {filteredProfessions.length} {lang === "hi" ? "ट्रेड उपलब्ध" : "Trades Available"}
            </span>
          </div>

          <div className="flex overflow-x-auto gap-2.5 pb-2 no-scrollbar">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`btn-cat-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col justify-center px-4 py-2 rounded-xl text-left border transition duration-150 cursor-pointer min-h-[48px] ${
                    isSelected 
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md font-semibold" 
                      : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    <span className="text-xs font-bold leading-none">{cat.labelHi}</span>
                  </div>
                  <span className={`text-[9px] mt-0.5 leading-none ${isSelected ? "text-slate-900/85" : "text-slate-500"}`}>
                    {cat.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Warning for Empty Filter Result */}
        {filteredProfessions.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center max-w-md mx-auto my-12">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h4 className="text-white font-semibold text-sm">कोई मिलान उपलब्ध नहीं / No Matching Trades</h4>
            <p className="text-xs text-slate-400 mt-1">No professions match your search query or filter in this sector.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
              className="mt-4 text-xs font-mono text-amber-500 hover:underline min-h-[48px] px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg inline-flex items-center"
            >
              रीसेट करें / Reset Filters
            </button>
          </div>
        )}

        {/* 2. Profession Discovery Grid with Stacked HI/EN display */}
        <div id="profession-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProfessions.map((prof, index) => {
            // Text to speak for this card
            const voiceTextHi = `${prof.hindiName.split(" (")[0]}. यह ट्रेड ${prof.category} क्षेत्र में आता है। इस कार्य की अनुमानित दर ₹${prof.wageRange.min} से ₹${prof.wageRange.max} प्रति ${prof.wageRange.unit === 'day' ? 'दिन' : 'घंटा'} है।`;
            const voiceTextEn = `${prof.name} in category ${prof.category}. Estimated rate is ${prof.wageRange.min} to ${prof.wageRange.max} rupees per ${prof.wageRange.unit}.`;

            return (
              <div
                key={`${prof.id}-${prof.name}-${index}`}
                id={`prof-card-${prof.id}-${index}`}
                onClick={() => setSelectedProfession(prof)}
                className={`group relative bg-gradient-to-b ${getCardStyle(prof.imageSeed)} border rounded-2xl p-5 hover:scale-[1.02] transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden shadow-lg min-h-[220px]`}
              >
                {/* Decorative Indian Pattern Backdrop overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-bl-full pointer-events-none group-hover:scale-125 transition duration-300 border-l border-b border-white/[0.03]" />

                <div>
                  <div className="flex justify-between items-start gap-2">
                    {/* Category Pill Tag */}
                    <span className="inline-block bg-slate-950/60 border border-slate-800 text-slate-400 px-2 py-0.5 rounded text-[8px] font-mono tracking-wider uppercase">
                      {prof.category}
                    </span>

                    {/* 3. Voice Assisted Navigation button - reachable directly */}
                    <button
                      title="आवाज़ मार्गदर्शन / Speak Info"
                      onClick={(e) => handleVoiceSpeak(voiceTextHi, voiceTextEn, e)}
                      className="p-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-slate-950 rounded-lg border border-amber-500/20 transition cursor-pointer shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Dual-Language Content Strategy Display */}
                  <div className="mt-3">
                    {/* Primary Hindi Name */}
                    <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-amber-400 transition font-sans leading-tight">
                      {prof.hindiName.split(" (")[0]}
                    </h4>
                    {/* Secondary English Name */}
                    <p className="text-xs text-slate-400 font-medium tracking-wide mt-0.5">
                      {prof.name}
                    </p>
                  </div>

                  {/* Dual language role label */}
                  <p className="text-xs text-slate-300 mt-3 font-mono border-l-2 border-amber-500/60 pl-2">
                    {prof.roleLabel}
                  </p>

                  {/* Typical Tasks preview */}
                  <ul className="mt-4 space-y-1.5 text-[11px] text-slate-400">
                    {prof.typicalTasks.slice(0, 2).map((task, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 truncate">
                        <span className="text-amber-500 shrink-0 mt-0.5">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer with Indicative Wages */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest block leading-none font-mono">
                      {lang === "hi" ? "अनुमानित मजदूरी" : "Est. Rate"}
                    </span>
                    <span className="text-sm font-bold text-white block mt-0.5">
                      ₹{prof.wageRange.min} - ₹{prof.wageRange.max}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      /{lang === "hi" ? (prof.wageRange.unit === "day" ? "दिन" : "घंटा") : prof.wageRange.unit}
                    </span>
                  </div>
                  
                  {/* Visual trigger with Dual-Language formula action button wrapper */}
                  <div className="bg-slate-950/80 hover:bg-amber-500 text-amber-500 hover:text-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 transition flex flex-col items-center justify-center min-h-[48px]">
                    <span className="text-[10px] font-bold leading-none">देखें</span>
                    <span className="text-[8px] opacity-75 leading-none mt-0.5 font-mono">Open</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Expandable Profession System (Admin Controls Section) */}
        {isAdminMode && (
          <section id="admin-control-section" className="mt-12 bg-slate-900 border border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-400 border-l border-b border-amber-500/20 px-3 py-1 rounded-tr-2xl rounded-bl-lg text-[10px] font-mono tracking-widest uppercase">
              Developer State Simulation
            </div>

            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="text-lg font-bold text-white font-mono">Admin Control Console (Ankur Sahani Portal)</h3>
                <p className="text-xs text-slate-400 mt-0.5">Simulate digital infrastructure adaptability. Dynamically add custom or region-specific trades.</p>
              </div>
            </div>

            {/* National Labour Intelligence - Admin Panel Launch Banner */}
            <div className="mb-6 p-4 bg-gradient-to-r from-amber-500/10 via-amber-600/15 to-transparent border border-amber-500/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">National Infrastructure Visualizer</span>
                </div>
                <h4 className="text-sm font-bold text-white font-mono mt-1">
                  {lang === "hi" ? "राष्ट्रीय लेबर इंटेलिजेंस डैशबोर्ड" : "National Labour Intelligence Dashboard"}
                </h4>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  {lang === "hi" 
                    ? "भारत के सत्यापित अनौपचारिक कार्यबल के लिए वास्तविक समय अंतर्दृष्टि।" 
                    : "Real-time simulated insights for India’s verified informal workforce."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowLabourIntel(true);
                  handleVoiceSpeak("राष्ट्रीय लेबर इंटेलिजेंस डैशबोर्ड खोला जा रहा है।", "Opening National Labour Intelligence Dashboard...");
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold font-mono transition shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4" />
                <span>{lang === "hi" ? "डैशबोर्ड खोलें" : "Open Dashboard"}</span>
              </button>
            </div>

            {adminStatusMsg && (
              <div className="mb-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg text-xs font-mono">
                {adminStatusMsg}
              </div>
            )}

            <form onSubmit={handleAddProfession} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div>
                <label className="block text-xs text-slate-400 font-mono uppercase tracking-wider mb-1.5">Trade Name (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Welder, Tile Layer, Tractor Driver"
                  value={newProfName}
                  onChange={(e) => setNewProfName(e.target.value)}
                  className="w-full bg-slate-950 text-white placeholder-slate-600 px-3 py-2 rounded-lg border border-slate-800 focus:border-amber-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-mono uppercase tracking-wider mb-1.5">Trade Name (Hindi / Local Script) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., वेल्डर (Welder), ट्रैक्टर चालक, सिलाई कारीगर"
                  value={newProfHindiName}
                  onChange={(e) => setNewProfHindiName(e.target.value)}
                  className="w-full bg-slate-950 text-white placeholder-slate-600 px-3 py-2 rounded-lg border border-slate-800 focus:border-amber-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-mono uppercase tracking-wider mb-1.5">Infrastructure Category</label>
                <select
                  value={newProfCategory}
                  onChange={(e) => setNewProfCategory(e.target.value as any)}
                  className="w-full bg-slate-950 text-white px-3 py-2 rounded-lg border border-slate-800 focus:border-amber-500 outline-none text-xs cursor-pointer min-h-[40px]"
                >
                  <option value="construction">Construction & Skilled Trades</option>
                  <option value="repair">Home Repair & Maintenance</option>
                  <option value="general">Daily Wage & General Labour</option>
                  <option value="rural">Rural & Agricultural Work</option>
                  <option value="helper">Helper & Support Roles</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-mono uppercase tracking-wider mb-1.5">Wage Estimation Structure</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min Rate (e.g., 500)"
                    value={newProfMinWage}
                    onChange={(e) => setNewProfMinWage(e.target.value)}
                    className="w-1/3 bg-slate-950 text-white placeholder-slate-600 px-3 py-2 rounded-lg border border-slate-800 focus:border-amber-500 outline-none text-xs"
                  />
                  <input
                    type="number"
                    placeholder="Max Rate (e.g., 900)"
                    value={newProfMaxWage}
                    onChange={(e) => setNewProfMaxWage(e.target.value)}
                    className="w-1/3 bg-slate-950 text-white placeholder-slate-600 px-3 py-2 rounded-lg border border-slate-800 focus:border-amber-500 outline-none text-xs"
                  />
                  <select
                    value={newProfUnit}
                    onChange={(e) => setNewProfUnit(e.target.value as any)}
                    className="w-1/3 bg-slate-950 text-white px-3 py-2 rounded-lg border border-slate-800 focus:border-amber-500 outline-none text-xs cursor-pointer"
                  >
                    <option value="day">/ Day</option>
                    <option value="hour">/ Hour</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs text-slate-400 font-mono uppercase tracking-wider mb-1.5">Typical Duties & Operations (Comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g., Arc welding of iron rods, safety alignment, machine lubrication"
                  value={newProfTasks}
                  onChange={(e) => setNewProfTasks(e.target.value)}
                  className="w-full bg-slate-950 text-white placeholder-slate-600 px-3 py-2 rounded-lg border border-slate-800 focus:border-amber-500 outline-none text-xs"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs text-slate-400 font-mono uppercase tracking-wider mb-1.5">Trade Infrastructure Description</label>
                <textarea
                  placeholder="Brief description about this trade's scale, typical tools, and physical requisites."
                  value={newProfDesc}
                  onChange={(e) => setNewProfDesc(e.target.value)}
                  className="w-full h-16 bg-slate-950 text-white placeholder-slate-600 px-3 py-2 rounded-lg border border-slate-800 focus:border-amber-500 outline-none text-xs resize-none"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                {/* Back button dual-language style */}
                <button
                  type="button"
                  onClick={() => setIsAdminMode(false)}
                  className="px-5 min-h-[48px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition cursor-pointer flex flex-col items-center justify-center"
                >
                  <span className="text-xs font-semibold leading-none">रद्द करें</span>
                  <span className="text-[9px] opacity-75 leading-none mt-0.5">Cancel</span>
                </button>

                {/* Submit button dual-language style */}
                <button
                  type="submit"
                  className="px-6 min-h-[48px] bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl transition shadow-md flex flex-col items-center justify-center cursor-pointer"
                >
                  <span className="text-xs font-bold leading-none font-sans">ट्रेड बुनियादी ढांचे में जोड़ें</span>
                  <span className="text-[9px] opacity-80 leading-none mt-0.5">Deploy Trade to Infrastructure</span>
                </button>
              </div>

              {/* PROMPT-14: Admin Revenue Intelligence Card */}
              <div className="mt-8 border-t border-slate-800 pt-6 space-y-4 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white font-mono">
                        {lang === "hi" ? "राजस्व खुफिया और मंच वित्तीय स्थिरता" : "Revenue Intelligence & Platform Sustainability"}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {lang === "hi" 
                          ? "मंच की दीर्घकालिक स्थिरता और मजदूरी सुरक्षा संकेतकों का वास्तविक समय विवरण।" 
                          : "Real-time metrics demonstrating scalable operations without exploiting workers."}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full font-mono font-bold uppercase self-start sm:self-center">
                    {lang === "hi" ? "वित्तीय स्थिरता" : "SUSTAINABLE MODEL"}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[9px] text-slate-500 block font-mono uppercase tracking-wider">{lang === "hi" ? "आज का राजस्व" : "Today's Revenue"}</span>
                    <span className="text-lg font-black text-amber-500 font-mono mt-1 block">₹{prompt14AdminRevenue.todayRevenue.toLocaleString()}</span>
                    <span className="text-[8px] text-slate-500 mt-0.5 block font-mono">Simulated Micro-fee</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[9px] text-slate-500 block font-mono uppercase tracking-wider">{lang === "hi" ? "मासिक अनुमानित" : "Monthly Projected"}</span>
                    <span className="text-lg font-black text-white font-mono mt-1 block">₹{prompt14AdminRevenue.monthlyProjected.toLocaleString()}</span>
                    <span className="text-[8px] text-emerald-400 mt-0.5 block font-mono">● 100% Run Rate</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[9px] text-slate-500 block font-mono uppercase tracking-wider">{lang === "hi" ? "पूर्ण सेटलमेंट" : "Completed Settlements"}</span>
                    <span className="text-lg font-black text-white font-mono mt-1 block">{prompt14AdminRevenue.completedCount}</span>
                    <span className="text-[8px] text-slate-500 mt-0.5 block font-mono">Audited receipts</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[9px] text-slate-500 block font-mono uppercase tracking-wider">{lang === "hi" ? "औसत मंच शुल्क" : "Avg Platform Fee"}</span>
                    <span className="text-lg font-black text-white font-mono mt-1 block">₹{prompt14AdminRevenue.avgFee}</span>
                    <span className="text-[8px] text-slate-500 mt-0.5 block font-mono">Paid by contractor</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[9px] text-slate-500 block font-mono uppercase tracking-wider">{lang === "hi" ? "मजदूरी सुरक्षा" : "Wage Protected"}</span>
                    <span className="text-lg font-black text-emerald-400 font-mono mt-1 block">{prompt14AdminRevenue.wageProtected}%</span>
                    <span className="text-[8px] text-emerald-400 mt-0.5 block font-mono">No worker deduction</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[9px] text-slate-500 block font-mono uppercase tracking-wider">{lang === "hi" ? "विवाद मुक्त सेटलमेंट" : "Dispute-Free Rate"}</span>
                    <span className="text-lg font-black text-emerald-400 font-mono mt-1 block">{prompt14AdminRevenue.disputeFreeRate}%</span>
                    <span className="text-[8px] text-slate-500 mt-0.5 block font-mono">Direct verification</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-start gap-2.5 text-xs text-slate-400">
                  <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>{lang === "hi" ? "स्थिरता विवरण:" : "Sustainability Note:"}</strong>{" "}
                    {lang === "hi"
                      ? "पारदर्शी सूक्ष्म-शुल्क (₹२९ प्रति सेटलमेंट) मॉडल बिना किसी शोषण के लेबरअड्डा को आत्मनिर्भर और स्केलेबल बनाता है। यह सुनिश्चित करता है कि श्रमिक की मजदूरी से ₹१ भी कम न किया जाए।"
                      : "Transparent micro-fee model enables scalable operations without exploiting workers. By receiving fee entirely from contractor post-job, we guarantee 100% of agreed daily wage goes directly to worker's pocket."}
                  </p>
                </div>

                {/* Safety / Compliance warning banner */}
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-850 text-[9px] text-slate-500 leading-normal mb-6">
                  <p>
                    <strong>{lang === "hi" ? "सिम्युलेटेड डेमो अनुपालन सूचना:" : "Demo Compliance Note:"}</strong>{" "}
                    {lang === "hi"
                      ? "यह एक प्रशासनिक सिमुलेशन परत है। कोई वास्तविक भुगतान लेनदेन या बैंक एपीआई एकीकरण सक्रिय नहीं है।"
                      : "This is an administrative simulation layer. No real money transactions or banking API integrations are active."}
                  </p>
                </div>
              </div>

            </form>

            {/* PROMPT-14B: Dynamic Platform Fee Control Panel */}
            <div className="mt-10 border-t border-slate-800 pt-8 space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-amber-500" />
                  <div>
                    <h4 className="text-md font-bold text-white font-sans">
                      {lang === "hi" ? "गतिशील प्लेटफॉर्म शुल्क नियंत्रण" : "Dynamic Platform Fee Control Panel"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {lang === "hi"
                        ? "विभिन्न ट्रेड श्रेणियों के लिए लचीले प्लेटफॉर्म शुल्क अनुकूलित करें।"
                        : "Configure and deploy custom trade-specific micro-fee rules to the infrastructure grid."}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-amber-500/15 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full font-mono font-bold uppercase">
                  {lang === "hi" ? "नियंत्रण पैनल" : "CONTROL PANEL"}
                </span>
              </div>

              {/* Trade configuration list */}
              <div className="grid grid-cols-1 gap-4">
                {prompt14TradeFees.map((tf) => {
                  return (
                    <div key={tf.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 hover:border-slate-800 transition duration-150 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          <h5 className="text-xs font-bold text-white">
                            {lang === "hi" ? `${tf.nameHi} / ${tf.nameEn}` : `${tf.nameEn} (${tf.nameHi})`}
                          </h5>
                        </div>
                         <span className={`text-[9px] px-2 py-0.5 rounded border uppercase font-mono font-bold ${
                          tf.phase === "Launch" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" :
                          tf.phase === "Growth" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                          tf.phase === "Scale" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                          "bg-slate-500/15 text-slate-400 border-slate-700"
                        }`}>
                          {tf.phase === "Launch" ? (lang === "hi" ? "लॉन्च चरण (3%-5%)" : "Launch Phase (3%–5%)") :
                           tf.phase === "Growth" ? (lang === "hi" ? "विकास चरण (5%-10%)" : "Growth Phase (5%–10%)") :
                           tf.phase === "Scale" ? (lang === "hi" ? "स्केल चरण (10%-15%)" : "Scale Phase (10%–15%)") :
                           (lang === "hi" ? "भविष्य व्यवस्थापक सीमा (20%-30%)" : "Future Admin Cap (20%–30% - Not Active)")}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                        <div>
                          <label className="text-slate-500 block text-[9px] uppercase mb-1 font-mono">{lang === "hi" ? "औसत दैनिक मजदूरी" : "Avg Wage (₹)"}</label>
                          <input
                            type="number"
                            value={tf.avgWage}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setPrompt14TradeFees(prompt14TradeFees.map(item => item.id === tf.id ? { ...item, avgWage: val } : item));
                            }}
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-slate-500 block text-[9px] uppercase mb-1 font-mono">{lang === "hi" ? "मंच शुल्क (%)" : "Fee Percent (%)"}</label>
                          <input
                            type="number"
                            step="0.1"
                            value={tf.feePercent}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setPrompt14TradeFees(prompt14TradeFees.map(item => item.id === tf.id ? { ...item, feePercent: val } : item));
                            }}
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-slate-500 block text-[9px] uppercase mb-1 font-mono">{lang === "hi" ? "न्यूनतम शुल्क (₹)" : "Min Fee (₹)"}</label>
                          <input
                            type="number"
                            value={tf.minFee}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setPrompt14TradeFees(prompt14TradeFees.map(item => item.id === tf.id ? { ...item, minFee: val } : item));
                            }}
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-slate-500 block text-[9px] uppercase mb-1 font-mono">{lang === "hi" ? "अधिकतम शुल्क (₹)" : "Max Fee (₹)"}</label>
                          <input
                            type="number"
                            value={tf.maxFee}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setPrompt14TradeFees(prompt14TradeFees.map(item => item.id === tf.id ? { ...item, maxFee: val } : item));
                            }}
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white font-mono"
                          />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <label className="text-slate-500 block text-[9px] uppercase mb-1 font-mono">{lang === "hi" ? "व्यापार चरण" : "Business Phase"}</label>
                          <select
                            value={tf.phase}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPrompt14TradeFees(prompt14TradeFees.map(item => item.id === tf.id ? { ...item, phase: val } : item));
                            }}
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs cursor-pointer min-h-[34px]"
                          >
                            <option value="Launch">Launch Phase (3%–5%)</option>
                            <option value="Growth">Growth Phase (5%–10%)</option>
                            <option value="Scale">Scale Phase (10%–15%)</option>
                            <option value="Future" disabled>Future Admin Cap (20%–30% - Not Active)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px]">
                        <span className="text-slate-500 font-mono">
                          {lang === "hi" ? "प्रभावी शुल्क सीमा:" : "Effective Range:"} ₹{tf.minFee} - ₹{tf.maxFee}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            // Success Action
                            setAdminStatusMsg(
                              lang === "hi"
                                ? `सफलता: ${tf.nameHi} के लिए गतिशील शुल्क नियम सफलतापूर्वक अपडेट कर दिए गए हैं!`
                                : `Success: Dynamic fee rules for ${tf.nameEn} successfully configured and deployed!`
                            );
                            handleVoiceSpeak(
                              `${tf.nameHi} के लिए शुल्क नियम सहेज लिया गया है।`,
                              `Fee rule for ${tf.nameEn} has been updated. Blended rate is now ${tf.feePercent} percent.`
                            );
                            setTimeout(() => setAdminStatusMsg(""), 5000);
                          }}
                          className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded text-xs transition cursor-pointer font-sans"
                        >
                          {lang === "hi" ? "शुल्क नियम सहेजें" : "Save Fee Rule"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Jury Explanation Card: Why Dynamic Fees Matter */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-900 pb-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                    {lang === "hi" ? "गतिशील प्लेटफॉर्म शुल्क क्यों आवश्यक है?" : "Why Dynamic Fees Matter"}
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-900 space-y-1.5 text-left">
                    <span className="font-bold text-amber-500 block">1. {lang === "hi" ? "ठेकेदार वहन क्षमता" : "Contractor Affordability"}</span>
                    <p className="text-[11px] leading-relaxed text-slate-400">
                      {lang === "hi"
                        ? "उच्च मजदूरी वाले ट्रेड थोड़े अधिक शुल्क वहन कर सकते हैं, जबकि लो-मार्जिन सहायक खंडों को कम शुल्क की आवश्यकता होती है।"
                        : "Higher-paying trades can afford slightly higher transaction costs, while low-margin helper segments need low-barrier access."}
                    </p>
                  </div>

                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-900 space-y-1.5 text-left">
                    <span className="font-bold text-emerald-400 block">2. {lang === "hi" ? "स्थानीय मांग अनुकूलन" : "Localized Demand Responsiveness"}</span>
                    <p className="text-[11px] leading-relaxed text-slate-400">
                      {lang === "hi"
                        ? "गोरखपुर जैसे उच्च निर्माण क्षेत्रों में गतिशील दरें मांग संतुलन बनाए रखती हैं, जबकि ग्रामीण क्षेत्रों में प्रवेश शुल्क कम रहता है।"
                        : "In boom areas like Gorakhpur, dynamic rates prevent system congestion, while rural areas enjoy promotional pricing."}
                    </p>
                  </div>

                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-900 space-y-1.5 text-left">
                    <span className="font-bold text-blue-400 block">3. {lang === "hi" ? "क्रॉस-सब्सिडी स्केल" : "Cross-Subsidized Scalability"}</span>
                    <p className="text-[11px] leading-relaxed text-slate-400">
                      {lang === "hi"
                        ? "प्रीमियम ट्रेडों से प्राप्त शुल्क सामान्य श्रमिकों के मुफ्त डिजिटल प्रशिक्षण और निशुल्क बुनियादी सुविधाओं के वित्तपोषण में काम आता है।"
                        : "Premium trade fees directly fund free digital training classes and infrastructure for general laborers."}
                    </p>
                  </div>
                </div>
              </div>

              {/* PROMPT-16: NATIONAL PASSPORT REGISTRY MONITOR */}
              <div id="national-passport-registry-monitor" className="mt-10 border-t border-slate-800 pt-8 text-left space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-gradient-to-tr from-emerald-500 to-emerald-600 text-slate-950 rounded-2xl shadow-xl">
                      <ShieldCheck className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-white font-sans tracking-tight">
                        {lang === "hi" ? "राष्ट्रीय श्रम पासपोर्ट रजिस्ट्री" : "National Labour Passport Registry"}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {lang === "hi"
                          ? "क्रिप्टोग्राफिक पहचान सत्यापन और राष्ट्रीय स्तर पर धोखाधड़ी का पता लगाने की वास्तविक समय निगरानी।"
                          : "Real-time monitoring of cryptographic identity verification and nation-wide spoofing detection layers."}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-wider">
                    REGISTRY MONITOR ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 font-mono">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "कुल डिजिटल पासपोर्ट" : "Total Passports"}</span>
                    <span className="text-lg font-black text-amber-500 mt-1 block">82.4 L</span>
                    <span className="text-[8px] text-slate-500 mt-0.5 block">8,240,000 active</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "आधार केवाईसी सत्यापित" : "Aadhaar Verified"}</span>
                    <span className="text-lg font-black text-white mt-1 block">76.8 L</span>
                    <span className="text-[8px] text-emerald-400 mt-0.5 block">● 93% rate</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "क्यूआर प्रमाणीकरण आज" : "QR Auths Today"}</span>
                    <span className="text-lg font-black text-white mt-1 block">1.86 L</span>
                    <span className="text-[8px] text-slate-500 mt-0.5 block">Direct scans</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "अवरुद्ध धोखाधड़ी प्रयास" : "Fraud Blocked"}</span>
                    <span className="text-lg font-black text-rose-500 mt-1 block">12,480</span>
                    <span className="text-[8px] text-rose-500 mt-0.5 block">Auto-isolated</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "लिंक्ड कौशल प्रमाणपत्र" : "Linked Skills"}</span>
                    <span className="text-lg font-black text-emerald-400 mt-1 block">41.2 L</span>
                    <span className="text-[8px] text-emerald-400 mt-0.5 block">MSDE verified</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{lang === "hi" ? "कार्य इतिहास रिकॉर्ड" : "Work Histories"}</span>
                    <span className="text-lg font-black text-emerald-400 mt-1 block">3.8 Cr</span>
                    <span className="text-[8px] text-slate-500 mt-0.5 block">Ledger recorded</span>
                  </div>
                </div>

                {/* Fraud Detection Layer card */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-900 pb-2.5">
                    <ShieldAlert className="w-4.5 h-4.5 text-amber-500" />
                    <h5 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
                      {lang === "hi" ? "सुरक्षा एवं धोखाधड़ी का पता लगाने की परत" : "Fraud Detection Layer Status"}
                    </h5>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-900 flex items-center justify-between">
                      <span className="text-slate-400">{lang === "hi" ? "दोहरा पासपोर्ट की जांच" : "Duplicate Passport Check"}</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase">
                        ACTIVE
                      </span>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-900 flex items-center justify-between">
                      <span className="text-slate-400">{lang === "hi" ? "फर्जी कांट्रेक्टर ध्वजांकन" : "Fake Contractor Flagging"}</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase">
                        ACTIVE
                      </span>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-900 flex items-center justify-between">
                      <span className="text-slate-400">{lang === "hi" ? "उपस्थिति स्पूपिंग का पता लगाना" : "Attendance Spoofing Detection"}</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase">
                        ACTIVE
                      </span>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-900 flex items-center justify-between">
                      <span className="text-slate-400">{lang === "hi" ? "सेटलमेंट रसीद सत्यापन" : "Settlement Receipt Verification"}</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase">
                        ACTIVE
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850 text-[10px] text-slate-500 font-mono leading-normal">
                    🛡️ <strong>Demo Compliance Note:</strong> All registry values, fraud flagging patterns, and detection vectors are high-fidelity simulation components representing potential national infrastructure architecture. No real government APIs are contacted.
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* 3. Profession Detail View Panel (Interactions Side Drawer / Backdrop) */}
      {selectedProfession && (
        <div id="modal-backdrop" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div id="profession-detail-panel" className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl transition duration-200">
            
            {/* Modal Image/Header */}
            <div className="relative bg-gradient-to-tr from-amber-500/10 to-amber-600/10 p-6 sm:p-8 border-b border-slate-800">
              <button 
                id="btn-close-detail"
                onClick={() => setSelectedProfession(null)}
                className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white p-2 rounded-xl border border-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex justify-between items-center gap-4">
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase">
                  {selectedProfession.category} Sector
                </span>
                
                {/* Voice button on detail modal */}
                <button
                  title="आवाज़ से विवरण सुनें / Speak detail info"
                  onClick={() => handleVoiceSpeak(
                    `विवरण। ${selectedProfession.hindiName.split(" (")[0]}। ${selectedProfession.description}. मुख्य कार्य: ${selectedProfession.typicalTasks.join(", ")}`,
                    `Detail specifications for ${selectedProfession.name}. Description: ${selectedProfession.description}`
                  )}
                  className="p-2 bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 rounded-xl border border-amber-500/30 transition cursor-pointer min-h-[40px]"
                >
                  <Volume2 className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Stacked Primary/Secondary trade title */}
              <h3 className="text-2xl font-bold text-white tracking-tight mt-4">
                {selectedProfession.hindiName.split(" (")[0]}
              </h3>
              <p className="text-sm text-amber-500 font-medium font-mono">
                {selectedProfession.name}
              </p>
              
              <p className="text-xs text-slate-400 mt-2.5 italic leading-relaxed">
                {selectedProfession.description}
              </p>
            </div>

            {/* Modal Specs Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/50 border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-mono">अनुमानित दर / Indicative Rate</span>
                    <p className="text-sm font-bold text-white mt-1 leading-none">
                      ₹{selectedProfession.wageRange.min} - ₹{selectedProfession.wageRange.max}
                    </p>
                    <span className="text-[9px] text-slate-400 font-mono">
                      /{lang === "hi" ? (selectedProfession.wageRange.unit === "day" ? "दिन" : "घंटा") : selectedProfession.wageRange.unit}
                    </span>
                  </div>
                  {/* Voice speak rate button */}
                  <button
                    onClick={() => handleVoiceSpeak(
                      `मजदूरी दर ₹${selectedProfession.wageRange.min} से ₹${selectedProfession.wageRange.max} प्रति ${selectedProfession.wageRange.unit === "day" ? "दिन" : "घंटा"} है।`,
                      `Standard rate is ${selectedProfession.wageRange.min} to ${selectedProfession.wageRange.max} rupees per ${selectedProfession.wageRange.unit}.`
                    )}
                    className="p-1.5 bg-slate-900 border border-slate-800 text-amber-500 hover:bg-amber-500 hover:text-slate-950 rounded-lg transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-mono">उपलब्धता / Availability</span>
                  <p className="text-sm font-bold text-emerald-400 mt-1">
                    {lang === "hi" ? "दैनिक / ऑन-कॉल" : "Daily / On-Call"}
                  </p>
                  <span className="text-[9px] text-slate-400 font-mono">Direct/On-Call</span>
                </div>
              </div>

              {/* Verified Tasks Area */}
              <div>
                <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-mono mb-2">सत्यापित कार्य सूची / Verified Trade Tasks</span>
                <ul className="space-y-2.5">
                  {selectedProfession.typicalTasks.map((task, idx) => (
                    <li key={idx} className="flex gap-2.5 bg-slate-950/30 p-2.5 rounded-lg border border-slate-800/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 leading-normal">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verification & Trust Warning Statement */}
              <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl flex gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 leading-normal">
                  <strong className="text-white">{lang === "hi" ? "शोषण-विरोधी नियम: " : "Anti-Exploitation Rule: "}</strong> 
                  {lang === "hi" 
                    ? "बुनियादी ढांचे में पंजीकृत प्रत्येक श्रमिक ग्राम पंचायत या नगर निगम वार्ड के माध्यम से सत्यापित है। न्यूनतम मजदूरी राज्य दिशानिर्देशों के अनुरूप है।"
                    : "Every registered worker under this trade category is verified directly with local village councils or municipal wards. Labor rates comply with legal state-level minimum guidelines."
                  }
                </p>
              </div>

            </div>

            {/* Modal Bottom Action bar using strict "HI label first, English hint below" format with min 48px target */}
            <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <button 
                onClick={() => setSelectedProfession(null)}
                className="w-1/3 min-h-[48px] border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl transition cursor-pointer flex flex-col items-center justify-center py-1.5"
              >
                <span className="text-xs font-semibold leading-none">पीछे जाएं</span>
                <span className="text-[9px] opacity-75 leading-none mt-0.5">Go Back</span>
              </button>
              
              <button 
                onClick={() => {
                  // Generate visual booking text for voice guide
                  const bookingTextHi = `बुकिंग शुरू हो गई है। हम आपके लिए आपके स्थान ${selectedLocation.label} में प्रमाणित ${selectedProfession.hindiName.split(" (")[0]} की खोज कर रहे हैं।`;
                  const bookingTextEn = `Booking initiated. We are searching for certified ${selectedProfession.name} tradespeople near ${selectedLocation.label}.`;
                  
                  handleVoiceSpeak(bookingTextHi, bookingTextEn);
                  alert(`Direct booking for verified "${selectedProfession.name}" tradespeople in "${selectedLocation.label}" would launch on production server integration.`);
                  setSelectedProfession(null);
                }}
                className="w-2/3 min-h-[48px] bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl transition shadow-md hover:scale-[1.01] active:scale-100 cursor-pointer flex flex-col items-center justify-center py-1.5"
              >
                <span className="text-xs font-bold leading-none">अभी प्रमाणित मजदूर खोजें</span>
                <span className="text-[9px] opacity-80 leading-none mt-0.5">Find & Match Workers Now</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Location Selector Modal */}
      {isLocModalOpen && (
        <div id="loc-modal-backdrop" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div id="location-picker-panel" className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl transition duration-200">
            
            <div className="p-6 border-b border-slate-800 relative">
              <button 
                onClick={() => setIsLocModalOpen(false)}
                className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white p-2 rounded-xl border border-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-lg font-bold text-white font-mono">Select Infrastructure Region / स्थान चुनें</h3>
              <p className="text-xs text-slate-400 mt-1">Switch region to simulate urban-to-rural digital public infrastructure scale.</p>
            </div>

            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
              {LOCATIONS.map((loc, idx) => {
                const isSelected = selectedLocation.label === loc.label;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setIsLocModalOpen(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition duration-150 flex items-start gap-3 cursor-pointer ${
                      isSelected 
                        ? "bg-amber-500/10 border-amber-500/60 text-white" 
                        : "bg-slate-950/50 hover:bg-slate-800 border-slate-800/80 hover:border-slate-700 text-slate-300"
                    }`}
                  >
                    <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? "text-amber-500" : "text-slate-500"}`} />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold">{loc.label}</span>
                        <span className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-400 rounded">
                          {loc.type}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 font-mono">{loc.sub}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsLocModalOpen(false)}
                className="px-5 min-h-[48px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition cursor-pointer flex flex-col items-center justify-center"
              >
                <span className="text-xs font-semibold leading-none">बंद करें</span>
                <span className="text-[9px] opacity-75 leading-none mt-0.5">Close</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. Unified Registration Gateway Modal */}
      {isRegisterModalOpen && (
        <div id="register-modal-backdrop" className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div id="register-gateway-panel" className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full my-8 overflow-hidden shadow-2xl transition duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 relative bg-slate-900/50">
              <button 
                onClick={() => setIsRegisterModalOpen(false)}
                className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white p-2.5 rounded-xl border border-slate-800 transition cursor-pointer min-h-[40px]"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                {lang === "hi" ? "राष्ट्रीय श्रम पंजीकरण गेटवे" : "National Labour Registration Gateway"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {lang === "hi" 
                  ? "भारत के राष्ट्रीय डिजिटल सार्वजनिक बुनियादी ढांचे में आपका स्वागत है।" 
                  : "Welcome to India's national digital public infrastructure."}
              </p>
            </div>

            {/* Modal Body depending on Step */}
            <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto bg-slate-900">
              
              {/* STEP 1: ROLE SELECTION */}
              {registerStep === "role" && (
                <div className="space-y-4">
                  <div className="text-center pb-2">
                    <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">चरण १ / STEP 1</span>
                    <h4 className="text-lg font-bold text-white">
                      {lang === "hi" ? "अपनी सही पहचान श्रेणी चुनें" : "Select Your Registration Category"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {lang === "hi" ? "यह चयन आपके सेवा अधिकारों और नियमों को निर्धारित करेगा।" : "This selection determines your platform rights and workflow."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "worker", hi: "श्रमिक / कारीगर", en: "Worker / Tradesperson", desc: "राजमिस्त्री, पेंटर, मजदूर, कृषि श्रमिक आदि", descEn: "Masons, Painters, Helper, Ag Labor" },
                      { id: "contractor", hi: "ठेकेदार / पेटी कांट्रेक्टर", en: "Contractor / Subcontractor", desc: "श्रम आपूर्ति, निर्माण ठेकेदार आदि", descEn: "Labour supplies, small works contractors" },
                      { id: "household", hi: "घरेलू नियोक्ता / गृहस्वामी", en: "Household User", desc: "घर पर निजी कार्यों के लिए सीधे काम देने वाले", descEn: "Direct hiring for private home repairs" },
                      { id: "builder", hi: "बिल्डर / नियोक्ता", en: "Builder / Corporate Employer", desc: "रियल एस्टेट, इंफ्रास्ट्रक्चर और वाणिज्यिक कंपनियाँ", descEn: "Real estate and major infra developers" },
                      { id: "msme", hi: "लघु उद्योग / कंपनी", en: "MSME / Small Enterprise", desc: "कारखाने, गोदाम, दुकानें और छोटे व्यवसाय", descEn: "Factories, warehouses, small businesses" },
                      { id: "farmer", hi: "किसान / कृषि नियोक्ता", en: "Farmer / Agriculturalist", desc: "फसल कटाई और मौसमी कृषि कार्य के लिए", descEn: "For seasonal crops and farming tasks" },
                      { id: "ngo", hi: "गैर सरकारी संगठन (NGO)", en: "NGO / Social Enterprise", desc: "सामुदायिक विकास और कल्याणकारी संगठन", descEn: "Community development and social welfare" },
                      { id: "government", hi: "सरकारी विभाग / एजेंसी", en: "Government Agency", desc: "सार्वजनिक निर्माण, मनरेगा और बुनियादी ढांचा", descEn: "Public works, NREGA and urban infra" }
                    ].map((role) => (
                      <button
                        key={role.id}
                        onClick={() => {
                          setSelectedRoleForRegister(role.id);
                          setRegisterStep("mobile");
                          handleVoiceSpeak(
                            `आपने ${role.hi.split(" / ")[0]} श्रेणी चुनी है। आगे बढ़ने के लिए अपना मोबाइल नंबर दर्ज करें।`,
                            `You selected ${role.en}. Enter your mobile number to proceed.`
                          );
                        }}
                        className="w-full text-left p-4 rounded-2xl border border-slate-800 hover:border-amber-500/50 bg-slate-950/50 hover:bg-slate-950 transition duration-150 flex flex-col justify-between cursor-pointer min-h-[96px] group"
                      >
                        <div>
                          <span className="text-xs font-bold text-white group-hover:text-amber-400 block leading-tight">{role.hi}</span>
                          <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{role.en}</span>
                        </div>
                        <div className="mt-2 border-t border-slate-800/60 pt-2">
                          <span className="text-[10px] text-slate-500 block leading-normal">{role.desc}</span>
                          <span className="text-[9px] text-slate-600 block leading-none mt-0.5 font-mono">{role.descEn}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: ENTER MOBILE */}
              {registerStep === "mobile" && (
                <div className="space-y-4 max-w-md mx-auto py-4">
                  <div className="text-center">
                    <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">चरण २ / STEP 2</span>
                    <h4 className="text-lg font-bold text-white">
                      {lang === "hi" ? "सत्यापित मोबाइल नंबर दर्ज करें" : "Provide Mobile for Verification"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {lang === "hi" ? "आधार से लिंक मोबाइल नंबर का उपयोग करना अनुशंसित है।" : "Using an Aadhaar-linked mobile number is highly recommended."}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-left">
                      <span className="text-xs text-slate-300 font-bold block">मोबाइल नंबर / Mobile Number</span>
                      <span className="text-[10px] text-slate-500 block font-mono">10-Digit Indian Mobile Number</span>
                      <div className="relative mt-1.5">
                        <span className="absolute left-4 top-3 text-sm text-slate-400 font-bold font-mono">+91</span>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="9876543210"
                          value={regMobile}
                          onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ""))}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white pl-14 pr-4 py-3 rounded-xl outline-none text-sm font-mono min-h-[48px]"
                        />
                      </div>
                    </label>

                    <button
                      onClick={() => {
                        if (regMobile.length !== 10) {
                          alert("कृपया १० अंकों का सही मोबाइल नंबर दर्ज करें। / Please enter a valid 10-digit mobile number.");
                          return;
                        }
                        setRegisterStep("otp");
                        handleVoiceSpeak(
                          "ओटीपी भेजा गया है। सत्यापन के लिए १ २ ३ ४ दर्ज करें।",
                          "OTP sent. Enter 1 2 3 4 for verification."
                        );
                      }}
                      className="w-full min-h-[48px] bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold flex flex-col items-center justify-center py-1.5 transition cursor-pointer"
                    >
                      <span className="text-xs leading-none">ओटीपी प्राप्त करें</span>
                      <span className="text-[9px] opacity-80 leading-none mt-0.5">Send OTP Verification</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: OTP VERIFICATION */}
              {registerStep === "otp" && (
                <div className="space-y-4 max-w-md mx-auto py-4">
                  <div className="text-center">
                    <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">चरण ३ / STEP 3</span>
                    <h4 className="text-lg font-bold text-white">
                      {lang === "hi" ? "प्राप्त वन-टाइम पासवर्ड दर्ज करें" : "Enter Verification Passcode"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {lang === "hi" 
                        ? `हमने आपके नंबर +91 ${regMobile} पर ४ अंकों का सुरक्षित कोड भेजा है।` 
                        : `We sent a 4-digit security code to +91 ${regMobile}.`}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-left">
                      <span className="text-xs text-slate-300 font-bold block">सत्यापन कोड / OTP Code</span>
                      <span className="text-[10px] text-amber-500 block font-mono font-bold">प्रदर्शन के लिए &apos;1234&apos; का उपयोग करें / Use &apos;1234&apos;</span>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="1234"
                        value={regOtp}
                        onChange={(e) => setRegOtp(e.target.value.replace(/\D/g, ""))}
                        className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-center text-lg tracking-widest font-mono min-h-[48px]"
                      />
                    </label>

                    <button
                      onClick={() => {
                        if (regOtp !== "1234") {
                          alert("अमान्य ओटीपी। कृपया '1234' दर्ज करें। / Invalid OTP. Please use '1234'.");
                          return;
                        }
                        if (selectedRoleForRegister === "worker") {
                          setRegisterStep("worker-flow");
                          setWorkerRegStep(1);
                          handleVoiceSpeak(
                            "मोबाइल नंबर सत्यापित। कृपया अपना राष्ट्रीय पहचान विवरण सत्यापित करें।",
                            "Mobile verified. Please confirm your identity details."
                          );
                        } else if (selectedRoleForRegister === "contractor") {
                          setRegisterStep("details");
                          handleVoiceSpeak(
                            "मोबाइल नंबर सत्यापित। कृपया अपना विवरण पूरा करें।",
                            "Mobile verified. Please complete your registration details."
                          );
                        } else {
                          setRegisterStep("employer-flow");
                          setEmployerRegStep(1);
                          // Preset subcategory based on selectedRoleForRegister
                          setEmpCategory(selectedRoleForRegister || "household");
                          handleVoiceSpeak(
                            "मोबाइल नंबर सत्यापित। आपका नियोक्ता पंजीकरण मार्गदर्शक शुरू हो गया है।",
                            "Mobile verified. Your 7-step employer registration wizard has started."
                          );
                        }
                      }}
                      className="w-full min-h-[48px] bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl font-bold flex flex-col items-center justify-center py-1.5 transition cursor-pointer"
                    >
                      <span className="text-xs leading-none">कोड सत्यापित करें</span>
                      <span className="text-[9px] opacity-80 leading-none mt-0.5">Verify & Authenticate</span>
                    </button>
                  </div>
                </div>
              )}

              {/* WORKER REGISTRATION WORKFLOW (10 STEPS) */}
              {registerStep === "worker-flow" && (
                <div id="worker-workflow-panel" className="space-y-6">
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
                    <span className="font-bold text-amber-500 uppercase tracking-wider">
                      {lang === "hi" ? `श्रमिक डिजिटल पंजीकरण: चरण ${workerRegStep} / १०` : `Worker Digital Reg: Step ${workerRegStep} of 10`}
                    </span>
                    <span className="font-bold text-emerald-400">{workerRegStep * 10}% {lang === "hi" ? "पूर्ण" : "Complete"}</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-850">
                    <div 
                      className="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${workerRegStep * 10}%` }}
                    />
                  </div>

                  {/* STEP 1: Identity Confirmation */}
                  {workerRegStep === 1 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="text-center">
                        <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">चरण १ / STEP 1</span>
                        <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                          {lang === "hi" ? "राष्ट्रीय पहचान एवं भाषा की पुष्टि" : "National Identity & Language Confirmation"}
                        </h4>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400 font-mono uppercase block">सत्यापित मोबाइल नंबर / Verified Mobile</span>
                            <span className="text-sm font-mono font-bold text-white mt-1 block">+91 {regMobile || "9876543210"}</span>
                          </div>
                          <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg font-mono flex items-center gap-1.5 uppercase font-bold">
                            <Check className="w-3.5 h-3.5" /> OTP OK
                          </span>
                        </div>

                        <div>
                          <label className="block text-left mb-1.5">
                            <span className="text-xs text-slate-300 font-bold block">पसंदीदा भाषा / Preferred Language</span>
                            <span className="text-[10px] text-slate-400 block mb-2">Changing language updates the interface instantly</span>
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                handleLangChange("hi");
                                handleVoiceSpeak("पंजीकरण भाषा हिंदी चुनी गई है।", "Registration language changed to Hindi.");
                              }}
                              className={`py-3 px-4 rounded-xl text-sm font-bold border transition duration-150 ${
                                lang === "hi" 
                                  ? "bg-amber-500 text-slate-950 border-amber-400" 
                                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                              }`}
                            >
                              हिन्दी (Hindi)
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handleLangChange("en");
                                handleVoiceSpeak("भाषा अंग्रेजी चुनी गई है।", "Language set to English.");
                              }}
                              className={`py-3 px-4 rounded-xl text-sm font-bold border transition duration-150 ${
                                lang === "en" 
                                  ? "bg-amber-500 text-slate-950 border-amber-400" 
                                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                              }`}
                            >
                              English
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-left">
                              <span className="text-xs text-slate-300 font-bold block">वर्तमान राज्य / Current State *</span>
                              <input
                                type="text"
                                value={regState}
                                onChange={(e) => setRegState(e.target.value)}
                                placeholder="Uttar Pradesh"
                                className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                              />
                            </label>
                          </div>
                          <div>
                            <label className="block text-left">
                              <span className="text-xs text-slate-300 font-bold block">वर्तमान जिला / Current District *</span>
                              <input
                                type="text"
                                value={regDistrict}
                                onChange={(e) => setRegDistrict(e.target.value)}
                                placeholder="Gorakhpur"
                                className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                              />
                            </label>
                          </div>
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              setIsDetectingLocation(true);
                              if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                  (position) => {
                                    setIsDetectingLocation(false);
                                    setRegState("Uttar Pradesh");
                                    setRegDistrict("Gorakhpur");
                                    setRegCity("Sahjanwa");
                                    setDetectedCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
                                    handleVoiceSpeak(
                                      "जीपीएस स्थान प्राप्त किया गया। वर्तमान जिला गोरखपुर, उत्तर प्रदेश पाया गया।",
                                      "GPS Location successfully detected. Gorakhpur, Uttar Pradesh."
                                    );
                                  },
                                  () => {
                                    setTimeout(() => {
                                      setIsDetectingLocation(false);
                                      setRegState("Uttar Pradesh");
                                      setRegDistrict("Gorakhpur");
                                      setRegCity("Sahjanwa");
                                      setDetectedCoords({ lat: 26.7606, lng: 83.3731 });
                                      handleVoiceSpeak(
                                        "जीपीएस स्थान प्राप्त किया गया। वर्तमान जिला गोरखपुर, उत्तर प्रदेश पाया गया।",
                                        "GPS Location successfully detected. Gorakhpur, Uttar Pradesh."
                                      );
                                    }, 600);
                                  }
                                );
                              } else {
                                setIsDetectingLocation(false);
                              }
                            }}
                            className="w-full min-h-[44px] bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 rounded-xl transition flex items-center justify-center gap-2 text-xs font-mono"
                          >
                            <MapPin className="w-4 h-4 text-amber-500" />
                            {isDetectingLocation ? (
                              <span>{lang === "hi" ? "स्थान खोजा जा रहा है..." : "Detecting Location..."}</span>
                            ) : (
                              <span>
                                {detectedCoords 
                                  ? `${lang === "hi" ? "स्थान सत्यापित: गोरखपुर (UP)" : "Verified Location: Gorakhpur (UP)"}`
                                  : `${lang === "hi" ? "जीपीएस स्थान सत्यापित करें (वैकल्पिक)" : "Detect GPS Location (Optional)"}`}
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Personal Information */}
                  {workerRegStep === 2 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="text-center">
                        <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">चरण २ / STEP 2</span>
                        <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                          {lang === "hi" ? "व्यक्तिगत जानकारी प्रपत्र" : "Personal Information Intake"}
                        </h4>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-left">
                            <span className="text-xs text-slate-300 font-bold block">श्रमिक का पूरा नाम / Full Name *</span>
                            <input
                              type="text"
                              value={regName}
                              onChange={(e) => setRegName(e.target.value)}
                              placeholder="Manoj Kumar"
                              className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                            />
                          </label>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-left">
                              <span className="text-xs text-slate-300 font-bold block">लिंग / Gender *</span>
                              <select
                                value={regGender}
                                onChange={(e) => setRegGender(e.target.value)}
                                className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                              >
                                <option value="">Select / चुनें</option>
                                <option value="male">पुरुष / Male</option>
                                <option value="female">महिला / Female</option>
                                <option value="other">अन्य / Other</option>
                              </select>
                            </label>
                          </div>
                          <div>
                            <label className="block text-left">
                              <span className="text-xs text-slate-300 font-bold block">उम्र / Age *</span>
                              <input
                                type="number"
                                value={regAge}
                                onChange={(e) => setRegAge(e.target.value)}
                                placeholder="32"
                                className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                              />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-left">
                            <span className="text-xs text-slate-300 font-bold block">जन्म तिथि / Date of Birth *</span>
                            <input
                              type="date"
                              value={regDob}
                              onChange={(e) => setRegDob(e.target.value)}
                              className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px] font-mono"
                            />
                          </label>
                        </div>

                        {/* Presets and Avatar selection */}
                        <div>
                          <label className="block text-left mb-1.5">
                            <span className="text-xs text-slate-300 font-bold block">प्रोफ़ाइल फ़ोटो (स्वैच्छिक) / Profile Photograph</span>
                            <span className="text-[10px] text-slate-400 block">Select a digital preset avatar or simulated custom photo</span>
                          </label>
                          <div className="flex items-center gap-4 bg-slate-950/50 p-3 rounded-2xl border border-slate-800">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-900 border-2 border-amber-500/30 flex items-center justify-center shrink-0">
                              {regPhoto ? (
                                <img src={regPhoto} alt="Worker" className="w-full h-full object-cover" />
                              ) : (
                                <Camera className="w-6 h-6 text-slate-600 animate-pulse" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap gap-2">
                                {[
                                  { id: "av1", url: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=120&auto=format&fit=crop", label: "M1" },
                                  { id: "av2", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop", label: "F1" },
                                  { id: "av3", url: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&auto=format&fit=crop", label: "M2" },
                                  { id: "av4", url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&auto=format&fit=crop", label: "F2" }
                                ].map((preset) => (
                                  <button
                                    key={preset.id}
                                    type="button"
                                    onClick={() => {
                                      setRegPhoto(preset.url);
                                      handleVoiceSpeak("फ़ोटो चुनी गई।", "Profile photo avatar applied.");
                                    }}
                                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition ${
                                      regPhoto === preset.url ? "border-amber-500 scale-110" : "border-slate-800 hover:border-slate-600"
                                    }`}
                                  >
                                    <img src={preset.url} alt="Preset" className="w-full h-full object-cover" />
                                  </button>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setRegPhoto("https://images.unsplash.com/photo-1621252179027-94459d278660?w=120&auto=format&fit=crop");
                                    handleVoiceSpeak("कस्टम फोटो सिम्युलेटेड।", "Custom photo uploader simulated successfully.");
                                  }}
                                  className="w-10 h-10 rounded-full border-2 border-dashed border-slate-700 hover:border-amber-500/50 flex items-center justify-center text-[10px] text-slate-400 font-bold"
                                >
                                  <Upload className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Primary Skill */}
                  {workerRegStep === 3 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="text-center">
                        <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">चरण ३ / STEP 3</span>
                        <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                          {lang === "hi" ? "मुख्य कौशल / ट्रेड का चयन करें" : "Select Your Trade & Skills"}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {lang === "hi" ? "एक या एक से अधिक ट्रेडों का चयन करें जिनमें आप कुशल हैं" : "Select one or more trades you are experienced in"}
                        </p>
                      </div>

                      <div className="bg-slate-950/40 p-1.5 rounded-2xl border border-slate-850">
                        <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto p-2">
                          {[
                            { id: "Mason", hi: "राजमिस्त्री", en: "Mason" },
                            { id: "Carpenter", hi: "बढ़ई", en: "Carpenter" },
                            { id: "Painter", hi: "रंगसाज़", en: "Painter" },
                            { id: "Electrician", hi: "बिजली मिस्त्री", en: "Electrician" },
                            { id: "Plumber", hi: "नलसाज", en: "Plumber" },
                            { id: "Welder", hi: "वेल्डर", en: "Welder" },
                            { id: "Helper", hi: "सहायक", en: "Helper" },
                            { id: "Agriculture Worker", hi: "खेती मजदूर", en: "Agri Worker" },
                            { id: "Construction Labour", hi: "निर्माण मजदूर", en: "Construction Labour" },
                            { id: "Housekeeping", hi: "सफाई कर्मचारी", en: "Housekeeping" },
                            { id: "Cook", hi: "रसोइया", en: "Cook" },
                            { id: "Driver", hi: "चालक / ड्राइवर", en: "Driver" },
                            { id: "Security Guard", hi: "सुरक्षा गार्ड", en: "Security Guard" },
                            { id: "Tailor", hi: "दर्जी / सिलाई", en: "Tailor" },
                            { id: "Mechanic", hi: "मैकेनिक", en: "Mechanic" },
                            { id: "Others", hi: "अन्य / विविध", en: "Others" }
                          ].map((trade) => {
                            const isSelected = regSelectedSkills.includes(trade.id);
                            return (
                              <button
                                key={trade.id}
                                type="button"
                                onClick={() => {
                                  if (isSelected) {
                                    setRegSelectedSkills(regSelectedSkills.filter(s => s !== trade.id));
                                  } else {
                                    setRegSelectedSkills([...regSelectedSkills, trade.id]);
                                    handleVoiceSpeak(
                                      `ट्रेड ${trade.hi} चुना गया।`, 
                                      `Trade ${trade.en} selected.`
                                    );
                                  }
                                }}
                                className={`p-3 rounded-xl border text-left flex items-center justify-between transition min-h-[56px] ${
                                  isSelected 
                                    ? "bg-amber-500/10 border-amber-500 text-amber-400 font-bold" 
                                    : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300"
                                }`}
                              >
                                <div>
                                  <span className="text-xs block leading-tight">{trade.hi}</span>
                                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{trade.en}</span>
                                </div>
                                {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Experience */}
                  {workerRegStep === 4 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="text-center">
                        <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">चरण ४ / STEP 4</span>
                        <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                          {lang === "hi" ? "कार्य अनुभव का स्तर" : "Work Experience Details"}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          { id: "Fresher", hi: "नया / कोई अनुभव नहीं", en: "Fresher / No Experience" },
                          { id: "Less than 1 Year", hi: "१ वर्ष से कम अनुभव", en: "Less than 1 Year" },
                          { id: "1-3 Years", hi: "१ से ३ वर्ष का अनुभव", en: "1–3 Years" },
                          { id: "3-5 Years", hi: "३ से ५ वर्ष का अनुभव", en: "3–5 Years" },
                          { id: "5-10 Years", hi: "५ से १० वर्ष का अनुभव", en: "5–10 Years" },
                          { id: "10+ Years", hi: "१० वर्ष से अधिक का अनुभव", en: "10+ Years" }
                        ].map((exp) => {
                          const isSelected = workerExp === exp.id;
                          return (
                            <button
                              key={exp.id}
                              type="button"
                              onClick={() => {
                                setWorkerExp(exp.id);
                                handleVoiceSpeak(
                                  `अनुभव स्तर ${exp.hi} चुना गया।`, 
                                  `Experience selected: ${exp.en}.`
                                );
                              }}
                              className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
                                isSelected 
                                  ? "bg-amber-500/10 border-amber-500 text-amber-400 font-bold" 
                                  : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300"
                              }`}
                            >
                              <div>
                                <span className="text-xs block font-semibold leading-tight">{exp.hi}</span>
                                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{exp.en}</span>
                              </div>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 5: Availability */}
                  {workerRegStep === 5 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="text-center">
                        <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">चरण ५ / STEP 5</span>
                        <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                          {lang === "hi" ? "कार्य उपलब्धता" : "Work Availability Status"}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: "Immediate", hi: "तुरंत काम करने के लिए उपलब्ध", en: "Immediate Availability" },
                          { id: "Tomorrow", hi: "कल से उपलब्ध हो सकते हैं", en: "Available Tomorrow" },
                          { id: "Next Week", hi: "अगले सप्ताह से उपलब्ध", en: "Available Next Week" },
                          { id: "Seasonal", hi: "मौसमी आवश्यकताओं के अनुसार", en: "Seasonal" }
                        ].map((avail) => {
                          const isSelected = workerAvailability === avail.id;
                          return (
                            <button
                              key={avail.id}
                              type="button"
                              onClick={() => {
                                setWorkerAvailability(avail.id);
                                handleVoiceSpeak(
                                  `उपलब्धता स्थिति ${avail.hi} चुनी गई।`, 
                                  `Availability set to ${avail.en}.`
                                );
                              }}
                              className={`p-4 rounded-xl border text-left transition flex items-center justify-between ${
                                isSelected 
                                  ? "bg-amber-500/10 border-amber-500 text-amber-400 font-bold" 
                                  : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300"
                              }`}
                            >
                              <div>
                                <span className="text-xs block font-semibold leading-tight">{avail.hi}</span>
                                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{avail.en}</span>
                              </div>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 6: Preferred Work Radius */}
                  {workerRegStep === 6 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="text-center">
                        <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">चरण ६ / STEP 6</span>
                        <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                          {lang === "hi" ? "पसंदीदा कार्य दूरी / दायरा" : "Preferred Work Radius"}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          { id: "5 KM", hi: "५ किलोमीटर के भीतर", en: "Within 5 KM (Local Neighborhood)" },
                          { id: "10 KM", hi: "१० किलोमीटर का क्षेत्र", en: "Within 10 KM (Local Area)" },
                          { id: "25 KM", hi: "२५ किलोमीटर का दायरा", en: "Within 25 KM (Suburbs/Metro Hub)" },
                          { id: "50 KM", hi: "५० किलोमीटर के भीतर", en: "Within 50 KM (Industrial belt)" },
                          { id: "District", hi: "पूरे जिले में कहीं भी", en: "Anywhere in District" },
                          { id: "State", hi: "राज्य में कहीं भी काम करेंगे", en: "Anywhere in State" },
                          { id: "India", hi: "पूरे भारतवर्ष में कहीं भी", en: "Anywhere in India" }
                        ].map((rad) => {
                          const isSelected = workerRadius === rad.id;
                          return (
                            <button
                              key={rad.id}
                              type="button"
                              onClick={() => {
                                setWorkerRadius(rad.id);
                                handleVoiceSpeak(
                                  `दायरा ${rad.hi} चुना गया।`, 
                                  `Radius selected: ${rad.en}.`
                                );
                              }}
                              className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
                                isSelected 
                                  ? "bg-amber-500/10 border-amber-500 text-amber-400 font-bold" 
                                  : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300"
                              }`}
                            >
                              <div>
                                <span className="text-xs block font-semibold leading-tight">{rad.hi}</span>
                                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{rad.en}</span>
                              </div>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 7: Expected Wage */}
                  {workerRegStep === 7 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="text-center">
                        <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">चरण ७ / STEP 7</span>
                        <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                          {lang === "hi" ? "अपेक्षित मजदूरी / वेतन की मांग" : "Expected Wage Demands"}
                        </h4>
                      </div>

                      <div className="space-y-4 max-w-sm mx-auto">
                        <div>
                          <label className="block text-left">
                            <span className="text-xs text-slate-300 font-bold block">मजदूरी राशि (रुपये में) / Expected Wage Amount (₹)</span>
                            <div className="relative mt-1.5">
                              <span className="absolute left-4 top-3 text-sm text-slate-400 font-bold font-mono">₹</span>
                              <input
                                type="number"
                                value={workerWageAmount}
                                onChange={(e) => setWorkerWageAmount(e.target.value)}
                                placeholder="e.g. 500"
                                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white pl-10 pr-4 py-3 rounded-xl outline-none text-sm font-bold min-h-[48px]"
                              />
                            </div>
                          </label>
                        </div>

                        <div>
                          <label className="block text-left mb-1.5">
                            <span className="text-xs text-slate-300 font-bold block">वेतन का आधार / Payment Basis</span>
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: "Hourly", hi: "प्रति घंटा", en: "Hourly" },
                              { id: "Daily", hi: "दैनिक वेतन", en: "Daily" },
                              { id: "Weekly", hi: "साप्ताहिक", en: "Weekly" },
                              { id: "Monthly", hi: "मासिक वेतन", en: "Monthly" },
                              { id: "Contract", hi: "कार्य अनुसार", en: "Task Based" }
                            ].map((basis) => {
                              const isSelected = workerWageBasis === basis.id;
                              return (
                                <button
                                  key={basis.id}
                                  type="button"
                                  onClick={() => {
                                    setWorkerWageBasis(basis.id);
                                    handleVoiceSpeak(
                                      `वेतन आधार ${basis.hi} चुना गया।`, 
                                      `Wage basis set to ${basis.en}.`
                                    );
                                  }}
                                  className={`py-2 px-3 rounded-lg border text-xs font-semibold transition text-center ${
                                    isSelected 
                                      ? "bg-amber-500 text-slate-950 border-amber-400 font-bold" 
                                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                                  }`}
                                >
                                  <span>{basis.hi}</span>
                                  <span className="block text-[9px] font-mono opacity-80 mt-0.5">{basis.en}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 8: Identity Documents */}
                  {workerRegStep === 8 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="text-center">
                        <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">चरण ८ / STEP 8</span>
                        <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                          {lang === "hi" ? "राष्ट्रीय पहचान दस्तावेज (वैकल्पिक)" : "National Identity Documents (Optional)"}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {lang === "hi" ? "पहचान को मजबूत बनाने के लिए भरें अथवा बाद में भरने के लिए छोड़ें (Skip)" : "Provide any ID to secure your profile, or skip to continue"}
                        </p>
                      </div>

                      <div className="space-y-3.5 max-h-[260px] overflow-y-auto p-1 pr-2">
                        <div>
                          <label className="block text-left">
                            <span className="text-xs text-slate-300 font-bold block">आधार कार्ड नंबर / Aadhaar Number</span>
                            <input
                              type="text"
                              maxLength={12}
                              value={docAadhaar}
                              onChange={(e) => setDocAadhaar(e.target.value.replace(/\D/g, ""))}
                              placeholder="12-Digit Number"
                              className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-3 py-2 rounded-xl outline-none text-xs font-mono"
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block text-left">
                            <span className="text-xs text-slate-300 font-bold block">पैन कार्ड नंबर / PAN Number</span>
                            <input
                              type="text"
                              maxLength={10}
                              value={docPan}
                              onChange={(e) => setDocPan(e.target.value.toUpperCase())}
                              placeholder="10-Character Code"
                              className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-3 py-2 rounded-xl outline-none text-xs font-mono"
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block text-left">
                            <span className="text-xs text-slate-300 font-bold block">ड्राइविंग लाइसेंस नंबर / Driving Licence</span>
                            <input
                              type="text"
                              value={docDl}
                              onChange={(e) => setDocDl(e.target.value)}
                              placeholder="DL Code"
                              className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-3 py-2 rounded-xl outline-none text-xs font-mono"
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block text-left">
                            <span className="text-xs text-slate-300 font-bold block">मतदाता पहचान पत्र / Voter ID</span>
                            <input
                              type="text"
                              value={docVoter}
                              onChange={(e) => setDocVoter(e.target.value)}
                              placeholder="Voter ID Code"
                              className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-3 py-2 rounded-xl outline-none text-xs font-mono"
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block text-left">
                            <span className="text-xs text-slate-300 font-bold block">पासपोर्ट नंबर (वैकल्पिक) / Passport (Optional)</span>
                            <input
                              type="text"
                              value={docPassport}
                              onChange={(e) => setDocPassport(e.target.value)}
                              placeholder="Passport Number"
                              className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-3 py-2 rounded-xl outline-none text-xs font-mono"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 9: Digital Labour Passport Generation */}
                  {workerRegStep === 9 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="text-center">
                        <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">चरण ९ / STEP 9</span>
                        <h4 className="text-base font-extrabold text-white uppercase">
                          {lang === "hi" ? "राष्ट्रीय डिजिटल श्रम पासपोर्ट तैयार हो रहा है" : "Generating Digital Labour Passport"}
                        </h4>
                      </div>

                      {/* Visual Passport representation */}
                      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/20 border-2 border-amber-500/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden max-w-sm mx-auto">
                        {/* Indian Flag Saffron/White/Green top corner badge */}
                        <div className="absolute top-0 right-0 flex h-1.5 w-16">
                          <div className="bg-[#FF9933] flex-1" />
                          <div className="bg-white flex-1" />
                          <div className="bg-[#138808] flex-1" />
                        </div>

                        {/* Government Emblem Styled Silhouette Icon */}
                        <div className="absolute -bottom-6 -right-6 text-slate-900 pointer-events-none opacity-20">
                          <Award className="w-40 h-40" />
                        </div>

                        <div className="flex justify-between items-start border-b border-slate-800 pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-amber-500 text-slate-950 p-1.5 rounded-lg font-mono font-bold text-xs leading-none">
                              LA
                            </div>
                            <div>
                              <h5 className="text-[10px] font-bold text-white tracking-wider uppercase font-mono leading-none">LabourAdda v2.0</h5>
                              <span className="text-[7px] text-slate-400 block font-mono uppercase mt-0.5">National Labour Grid</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[8px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono uppercase font-extrabold tracking-wider">
                              VERIFIED (सत्यापित)
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 relative z-10">
                          {/* Passport Photo */}
                          <div className="col-span-1">
                            <div className="w-20 h-24 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
                              {regPhoto ? (
                                <img src={regPhoto} alt="Worker" className="w-full h-full object-cover" />
                              ) : (
                                <Camera className="w-5 h-5 text-slate-600" />
                              )}
                            </div>
                          </div>

                          {/* Passport Details */}
                          <div className="col-span-2 space-y-2 text-left">
                            <div>
                              <span className="text-[7px] text-slate-500 uppercase tracking-widest block font-mono leading-none">नाम / Full Name</span>
                              <span className="text-xs font-bold text-white mt-0.5 block truncate">{regName || "Manoj Kumar"}</span>
                            </div>
                            <div>
                              <span className="text-[7px] text-slate-500 uppercase tracking-widest block font-mono leading-none">पहचान पत्र आईडी / Passport ID</span>
                              <span className="text-[10px] font-bold text-amber-400 font-mono mt-0.5 block">{passportId}</span>
                            </div>
                            <div>
                              <span className="text-[7px] text-slate-500 uppercase tracking-widest block font-mono leading-none">मुख्य ट्रेड / Skills</span>
                              <span className="text-[9px] font-bold text-slate-200 mt-0.5 block truncate">
                                {regSelectedSkills.length > 0 ? regSelectedSkills.join(", ") : "Mason / राजमिस्त्री"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* QR Code and Metadata footer */}
                        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2 relative z-10">
                          <div className="text-left space-y-1">
                            <div>
                              <span className="text-[6px] text-slate-500 block leading-none font-mono">STATE & DISTRICT</span>
                              <span className="text-[9px] font-bold text-slate-300 font-mono">{regDistrict || "Gorakhpur"}, {regState || "UP"}</span>
                            </div>
                            <div>
                              <span className="text-[6px] text-slate-500 block leading-none font-mono">REGISTERED TIMESTAMP</span>
                              <span className="text-[8px] font-mono font-bold text-slate-400">2026-07-03 UTC</span>
                            </div>
                          </div>

                          {/* Simulated Vector QR Code */}
                          <div className="bg-white p-1 rounded-lg shrink-0 border border-slate-200 shadow-lg flex items-center justify-center">
                            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="24" height="24" fill="white" />
                              <rect x="1" y="1" width="6" height="6" fill="black" />
                              <rect x="2" y="2" width="4" height="4" fill="white" />
                              <rect x="17" y="1" width="6" height="6" fill="black" />
                              <rect x="18" y="2" width="4" height="4" fill="white" />
                              <rect x="1" y="17" width="6" height="6" fill="black" />
                              <rect x="2" y="18" width="4" height="4" fill="white" />
                              <rect x="9" y="9" width="6" height="6" fill="black" />
                              <rect x="10" y="10" width="4" height="4" fill="white" />
                              <rect x="9" y="2" width="3" height="3" fill="black" />
                              <rect x="14" y="2" width="2" height="2" fill="black" />
                              <rect x="2" y="9" width="3" height="3" fill="black" />
                              <rect x="2" y="14" width="2" height="2" fill="black" />
                              <rect x="17" y="9" width="3" height="3" fill="black" />
                              <rect x="20" y="13" width="3" height="3" fill="black" />
                              <rect x="9" y="18" width="4" height="4" fill="black" />
                              <rect x="15" y="17" width="2" height="2" fill="black" />
                              <rect x="18" y="18" width="5" height="5" fill="black" />
                            </svg>
                          </div>
                        </div>

                        {/* Completion progress bar overlay */}
                        <div className="mt-3 bg-slate-950 border border-slate-900 rounded-lg p-2 flex items-center justify-between gap-2">
                          <span className="text-[7px] text-slate-400 font-mono uppercase font-bold">{lang === "hi" ? "प्रोफ़ाइल पूर्णता" : "PROFILE COMPLETION"}</span>
                          <div className="flex-1 max-w-[120px] bg-slate-900 h-1 rounded-full overflow-hidden">
                            <div className="bg-emerald-400 h-full" style={{ width: `${calculateCompletion()}%` }} />
                          </div>
                          <span className="text-[9px] font-mono font-bold text-emerald-400">{calculateCompletion()}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 10: Registration Complete */}
                  {workerRegStep === 10 && (
                    <div className="space-y-5 animate-fadeIn text-center py-4">
                      <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-600 text-slate-950 rounded-full flex items-center justify-center mx-auto border border-emerald-400/20 shadow-lg shadow-emerald-500/20 animate-bounce">
                        <Check className="w-10 h-10" />
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xl font-extrabold text-white uppercase tracking-tight">
                          {lang === "hi" ? "पंजीकरण सफलतापूर्वक पूर्ण!" : "Registration Successful!"}
                        </h4>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                          {lang === "hi" 
                            ? "डिजिटल श्रम पासपोर्ट सफलतापूर्वक तैयार कर लिया गया है। आपका प्रोफ़ाइल अब भारत के राष्ट्रीय श्रम ग्रिड में सक्रिय है।" 
                            : "Digital Labour Passport has been created successfully. Your profile is now active in India's National Labour Grid."}
                        </p>
                      </div>

                      <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl text-left space-y-2.5 max-w-xs mx-auto text-xs">
                        <div className="flex justify-between border-b border-slate-900 pb-1.5">
                          <span className="text-slate-400">नाम / Name:</span>
                          <span className="font-bold text-white">{regName || "Manoj Kumar"}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-900 pb-1.5">
                          <span className="text-slate-400">मोबाइल / Mobile:</span>
                          <span className="font-bold text-white font-mono">+91 {regMobile || "9876543210"}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-900 pb-1.5">
                          <span className="text-slate-400">ट्रेड / Sector:</span>
                          <span className="font-bold text-amber-400 uppercase font-mono">WORKER</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">पासपोर्ट आईडी / ID:</span>
                          <span className="font-bold text-white font-mono text-[10px]">{passportId || "LP-IND-583921-A"}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NAVIGATION STEPPER CONTROLS */}
                  <div className="flex justify-between items-center gap-3 pt-4 border-t border-slate-800">
                    {workerRegStep > 1 && workerRegStep < 10 ? (
                      <button
                        type="button"
                        onClick={() => {
                          const prevStep = workerRegStep - 1;
                          setWorkerRegStep(prevStep);
                          handleVoiceSpeak(
                            `पीछे जा रहे हैं, चरण ${prevStep}।`, 
                            `Going back to step ${prevStep}.`
                          );
                        }}
                        className="px-4 min-h-[44px] bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 rounded-xl transition flex items-center justify-center gap-1 text-xs font-semibold"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{lang === "hi" ? "पीछे" : "Back"}</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    {workerRegStep < 9 ? (
                      <button
                        type="button"
                        onClick={() => {
                          // Validation rules for next step
                          if (workerRegStep === 1) {
                            if (!regState || !regDistrict) {
                              alert("कृपया राज्य और जिला भरें। / Please fill in both State and District.");
                              return;
                            }
                          }
                          if (workerRegStep === 2) {
                            if (!regName) {
                              alert("कृपया नाम दर्ज करें। / Please enter your Full Name.");
                              return;
                            }
                            if (!regGender) {
                              alert("कृपया लिंग चुनें। / Please select your Gender.");
                              return;
                            }
                            if (!regAge) {
                              alert("कृपया अपनी सही उम्र भरें। / Please enter your Age.");
                              return;
                            }
                            if (!regDob) {
                              alert("कृपया जन्म तिथि दर्ज करें। / Please enter your Date of Birth.");
                              return;
                            }
                          }
                          if (workerRegStep === 3) {
                            if (regSelectedSkills.length === 0) {
                              alert("कृपया कम से कम एक ट्रेड चुनें। / Please select at least one Trade.");
                              return;
                            }
                          }
                          if (workerRegStep === 4) {
                            if (!workerExp) {
                              alert("कृपया कार्य अनुभव का चयन करें। / Please select your experience level.");
                              return;
                            }
                          }
                          if (workerRegStep === 5) {
                            if (!workerAvailability) {
                              alert("कृपया कार्य उपलब्धता चुनें। / Please select your availability.");
                              return;
                            }
                          }
                          if (workerRegStep === 6) {
                            if (!workerRadius) {
                              alert("कृपया पसंदीदा कार्य दायरा चुनें। / Please select your preferred work radius.");
                              return;
                            }
                          }
                          if (workerRegStep === 7) {
                            if (!workerWageAmount) {
                              alert("कृपया अपेक्षित मजदूरी राशि दर्ज करें। / Please enter expected wage amount.");
                              return;
                            }
                          }

                          const nextStep = workerRegStep + 1;
                          setWorkerRegStep(nextStep);
                          handleVoiceSpeak(
                            `सहेजा गया। चरण ${nextStep} पर चलें।`, 
                            `Details saved. Advancing to step ${nextStep}.`
                          );
                        }}
                        className="px-5 min-h-[44px] bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-extrabold transition flex items-center justify-center gap-1 text-xs"
                      >
                        <span>{lang === "hi" ? "सहेजें और आगे बढ़ें" : "Save & Continue"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : workerRegStep === 9 ? (
                      <button
                        type="button"
                        onClick={() => {
                          setWorkerRegStep(10);
                          handleVoiceSpeak(
                            "बधाई हो! आपका डिजिटल लेबर पासपोर्ट और प्रोफ़ाइल सक्रिय है।", 
                            "Congratulations! Your digital passport is active."
                          );
                        }}
                        className="w-full min-h-[48px] bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl font-extrabold transition flex flex-col items-center justify-center py-1.5"
                      >
                        <span className="text-xs leading-none">पासपोर्ट और प्रोफ़ाइल सक्रिय करें</span>
                        <span className="text-[9px] opacity-80 leading-none mt-0.5 font-mono">Activate Portable Passport ID</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          // Finalize login session and go to worker dashboard
                          const finalName = regName || "Manoj Kumar";
                          setLoggedInUser({ name: finalName, role: "worker" });
                          setIsRegisterModalOpen(false);
                          handleVoiceSpeak(
                            `श्रमिक डैशबोर्ड पर स्वागत है, ${finalName}।`, 
                            `Welcome to your worker dashboard, ${finalName}.`
                          );
                        }}
                        className="w-full min-h-[48px] bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-extrabold transition flex flex-col items-center justify-center py-1.5"
                      >
                        <span className="text-xs leading-none">श्रमिक डैशबोर्ड पर जाएं</span>
                        <span className="text-[9px] opacity-80 leading-none mt-0.5 font-mono">Proceed To Worker Dashboard</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* EMPLOYER REGISTRATION WORKFLOW (7 STEPS) */}
              {registerStep === "employer-flow" && (
                <div id="employer-workflow-panel" className="space-y-6">
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wide">
                      {lang === "hi" ? "नियोक्ता मार्गदर्शक" : "Employer Wizard"}
                    </span>
                    <span>
                      {lang === "hi" ? `चरण ${employerRegStep} / ७` : `Step ${employerRegStep} of 7`}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="flex-1 w-16 bg-slate-900 h-1 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full" style={{ width: `${(employerRegStep / 7) * 100}%` }} />
                      </div>
                      <span className="text-[9px] font-bold text-amber-500">{Math.round((employerRegStep / 7) * 100)}%</span>
                    </div>
                  </div>

                  {/* STEP 1: Mobile Verification Completed */}
                  {employerRegStep === 1 && (
                    <div className="space-y-4 animate-fadeIn text-center">
                      <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">
                          {lang === "hi" ? "मोबाइल नंबर सत्यापित" : "Mobile Number Verified"}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {lang === "hi" 
                            ? `नंबर +91 ${regMobile || "9876543210"} का ओटीपी सत्यापन सफलतापूर्वक पूरा हो चुका है।` 
                            : `OTP verification for +91 ${regMobile || "9876543210"} has been completed successfully.`}
                        </p>
                      </div>
                      <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-850 text-[10px] text-slate-500 font-mono text-left space-y-1">
                        <div>PROTOCOL: NIST-SP-800-63B SECURE AUTHENTICATION</div>
                        <div>STATUS: SECURED VIA NATIONAL OTP INFRASTRUCTURE</div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Employer Details */}
                  {employerRegStep === 2 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="text-center pb-2 border-b border-slate-800/60">
                        <h4 className="text-base font-bold text-white">
                          {lang === "hi" ? "नियोक्ता व्यक्तिगत और व्यावसायिक विवरण" : "Employer Details Intake"}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {lang === "hi" ? "कृपया अपनी और अपनी संस्था की जानकारी भरें।" : "Please provide your personal and organizational profile info."}
                        </p>
                      </div>

                      <div className="space-y-3.5">
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">पूरा नाम / Contact Person Name *</span>
                          <input
                            type="text"
                            placeholder="Sanjay Sharma"
                            value={empName}
                            onChange={(e) => setEmpName(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>

                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">संस्था या व्यवसाय का नाम / Company or Organization Name</span>
                          <input
                            type="text"
                            placeholder="Sharma & Sons Construction (Keep blank if Individual Household)"
                            value={empOrgName}
                            onChange={(e) => setEmpOrgName(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>

                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">नियोक्ता श्रेणी / Employer Category *</span>
                          <select
                            value={empCategory}
                            onChange={(e) => setEmpCategory(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          >
                            <option value="household">घरेलू नियोक्ता / Individual Household</option>
                            <option value="builder">बिल्डर / Developer / Builder</option>
                            <option value="contractor">ठेकेदार / Contractor Company</option>
                            <option value="msme">सूक्ष्म, लघु एवं मध्यम उद्यम / MSME</option>
                            <option value="corporate">कॉर्पोरेट नियोक्ता / Corporate Employer</option>
                            <option value="factory">फैक्ट्री स्वामी / Factory Owner</option>
                            <option value="shop">दुकानदार / Shop Owner</option>
                            <option value="farmer">किसान / Farmer</option>
                            <option value="government">सरकारी विभाग / Government Department</option>
                            <option value="ngo">गैर सरकारी संगठन / NGO</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Business Information */}
                  {employerRegStep === 3 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="text-center pb-2 border-b border-slate-800/60">
                        <h4 className="text-base font-bold text-white">
                          {lang === "hi" ? "व्यावसायिक पता और क्षेत्र" : "Business Address & Location"}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {lang === "hi" ? "श्रम सेवा आवंटन के लिए अपना सही पता दर्ज करें।" : "Provide location details to streamline labour dispatch and coordination."}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block">
                            <span className="text-xs text-slate-300 font-bold block">राज्य / State *</span>
                            <input
                              type="text"
                              placeholder="Uttar Pradesh"
                              value={empState}
                              onChange={(e) => setEmpState(e.target.value)}
                              className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block">
                            <span className="text-xs text-slate-300 font-bold block">जिला / District *</span>
                            <input
                              type="text"
                              placeholder="Gorakhpur"
                              value={empDistrict}
                              onChange={(e) => setEmpDistrict(e.target.value)}
                              className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                            />
                          </label>
                        </div>

                        <div className="col-span-1 sm:col-span-2">
                          <label className="block">
                            <span className="text-xs text-slate-300 font-bold block">कार्यालय/घर का विस्तृत पता / Detailed Address *</span>
                            <textarea
                              placeholder="H No 42B, Sector 5, Near GIDA Industrial Area"
                              rows={3}
                              value={empAddress}
                              onChange={(e) => setEmpAddress(e.target.value)}
                              className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Hiring Requirements */}
                  {employerRegStep === 4 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="text-center pb-2 border-b border-slate-800/60">
                        <h4 className="text-base font-bold text-white">
                          {lang === "hi" ? "नियोजन और भर्ती की आवश्यकताएं" : "Labour Demand & Hiring Profile"}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {lang === "hi" ? "इससे हमें आपके लिए सही कौशल वाले श्रमिकों को खोजना आसान होगा।" : "Helps us recommend tradespeople who perfectly match your requirements."}
                        </p>
                      </div>

                      <div className="space-y-3.5">
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">सामान्यतः आवश्यक श्रमिकों की संख्या / Typical Workforce Count *</span>
                          <select
                            value={empWorkerCount}
                            onChange={(e) => setEmpWorkerCount(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          >
                            <option value="">Select / चुनें</option>
                            <option value="1-5">1 - 5 Workers</option>
                            <option value="6-20">6 - 20 Workers</option>
                            <option value="21-50">21 - 50 Workers</option>
                            <option value="51-100">51 - 100 Workers</option>
                            <option value="100+">100+ Workers</option>
                          </select>
                        </label>

                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">भर्ती की आवृत्ति / Hiring Frequency *</span>
                          <select
                            value={empHiringFrequency}
                            onChange={(e) => setEmpHiringFrequency(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          >
                            <option value="Daily">दैनिक आवश्यकता / Daily Hire</option>
                            <option value="Weekly">साप्ताहिक अनुबंध / Weekly Contracts</option>
                            <option value="Monthly">मासिक रोजगार / Monthly Basis</option>
                            <option value="Seasonal">मौसमी मांग / Seasonal Work</option>
                            <option value="Project">परियोजना आधारित / Project-specific</option>
                          </select>
                        </label>

                        <div>
                          <span className="text-xs text-slate-300 font-bold block mb-1.5">पसंदीदा श्रम प्रकार / Preferred Trades</span>
                          <div className="grid grid-cols-2 gap-2">
                            {["Mason", "Painter", "Carpenter", "Electrician", "Plumber", "Helper", "Welder", "Agricultural"].map((trade) => {
                              const isChecked = empPreferredTrades.includes(trade);
                              return (
                                <button
                                  type="button"
                                  key={trade}
                                  onClick={() => {
                                    if (isChecked) {
                                      setEmpPreferredTrades(empPreferredTrades.filter(t => t !== trade));
                                    } else {
                                      setEmpPreferredTrades([...empPreferredTrades, trade]);
                                    }
                                  }}
                                  className={`p-2.5 rounded-xl border text-xs font-mono transition text-left flex items-center justify-between min-h-[44px] cursor-pointer ${
                                    isChecked 
                                      ? "bg-amber-500/10 border-amber-500 text-amber-400" 
                                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                                  }`}
                                >
                                  <span>{trade}</span>
                                  {isChecked && <Check className="w-3.5 h-3.5 shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: Identity Verification */}
                  {employerRegStep === 5 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="text-center pb-2 border-b border-slate-800/60">
                        <h4 className="text-base font-bold text-white">
                          {lang === "hi" ? "सुरक्षित पहचान सत्यापन (वैकल्पिक)" : "Secure Identity Verification (Optional)"}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {lang === "hi" 
                            ? "सत्यापित प्रोफाइल को त्वरित आवंटन और सरकारी अनुदान कार्यक्रमों में प्राथमिकता दी जाती है।" 
                            : "Verified profiles gain prioritised matching in DUDA/NREGA programs and higher trust score."}
                        </p>
                      </div>

                      <div className="space-y-3.5">
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">पहचान प्रमाण दस्तावेज प्रकार / Identity Proof Type</span>
                          <select
                            value={empIdType}
                            onChange={(e) => setEmpIdType(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          >
                            <option value="Aadhaar">आधार संख्या (व्यक्तिगत नियोक्ता) / Aadhaar Card</option>
                            <option value="GSTIN">जीएसटी नंबर (GSTIN) / GST Certificate</option>
                            <option value="PAN">पैन नंबर (Business / Personal PAN)</option>
                            <option value="UDYAM">उद्यम पंजीकरण संख्या / UDYAM Registration</option>
                            <option value="GovtReg">सरकारी पंजीकरण प्रमाण पत्र / Govt Registration Certificate</option>
                          </select>
                        </label>

                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">पहचान संख्या / Document Identification Number</span>
                          <input
                            type="text"
                            placeholder={
                              empIdType === "Aadhaar" ? "XXXX XXXX XXXX" :
                              empIdType === "GSTIN" ? "09AAAAA0000A1Z1" :
                              empIdType === "PAN" ? "ABCDE1234F" : "UDYAM-UP-00-12345"
                            }
                            value={empIdNumber}
                            onChange={(e) => setEmpIdNumber(e.target.value.toUpperCase())}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm font-mono min-h-[48px]"
                          />
                        </label>

                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          <p className="text-[11px] text-slate-400 leading-normal">
                            {lang === "hi" 
                              ? "आपका डेटा भारत सरकार के डेटा सुरक्षा कानूनों (DPDP Act) के तहत पूरी तरह से एन्क्रिप्टेड और सुरक्षित रखा जाता है।" 
                              : "Your data is end-to-end encrypted under the national DPDP privacy guidelines and never shared publicly."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: Location Confirmation */}
                  {employerRegStep === 6 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="text-center pb-2 border-b border-slate-800/60">
                        <h4 className="text-base font-bold text-white">
                          {lang === "hi" ? "सटीक भू-स्थान पुष्टिकरण (GPS)" : "Confirm Accurate Geolocation (GPS)"}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {lang === "hi" 
                            ? "इससे मजदूर सीधे आपके कार्य स्थल या कार्यालय के स्थान को मानचित्र पर देख पाएंगे।" 
                            : "Pins your job site on the trade map for direct, seamless navigation by dispatched labour."}
                        </p>
                      </div>

                      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center space-y-4">
                        <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto border border-amber-500/25 animate-pulse">
                          <MapPin className="w-8 h-8" />
                        </div>

                        <div>
                          <p className="text-xs text-white font-bold">
                            {empCoords 
                              ? (lang === "hi" ? "✓ स्थान दर्ज कर लिया गया है!" : "✓ GPS Coordinates Locked Successfully!") 
                              : (lang === "hi" ? "मानचित्र पर अपना वर्तमान स्थान चुनें" : "Register GPS coordinates for this dispatch terminal")}
                          </p>
                          {empCoords && (
                            <span className="text-[10px] text-emerald-400 font-mono block mt-1">
                              LAT: {empCoords.lat.toFixed(5)}, LNG: {empCoords.lng.toFixed(5)} (Secured Location)
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setEmpIsDetectingLocation(true);
                            setTimeout(() => {
                              setEmpCoords({ lat: 26.7606, lng: 83.3731 });
                              setEmpIsDetectingLocation(false);
                              handleVoiceSpeak(
                                "जीपीएस स्थान सफलतापूर्वक सहेज लिया गया।",
                                "GPS Coordinates successfully resolved to Gorakhpur Central Corridor."
                              );
                            }, 1200);
                          }}
                          className="w-full min-h-[44px] bg-slate-900 hover:bg-slate-850 text-amber-500 hover:text-amber-400 border border-amber-500/20 rounded-xl text-xs font-bold font-mono transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {empIsDetectingLocation ? (
                            <span>{lang === "hi" ? "सत्यापन किया जा रहा है..." : "Locating via National Grid GPS..."}</span>
                          ) : (
                            <>
                              <MapPin className="w-4 h-4" />
                              <span>{lang === "hi" ? "जीपीएस से स्थान प्राप्त करें" : "Resolve GPS Coordinates"}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 7: Employer Digital Passport Preview */}
                  {employerRegStep === 7 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="text-center pb-2 border-b border-slate-800/60">
                        <h4 className="text-base font-bold text-white">
                          {lang === "hi" ? "नियोक्ता डिजिटल पासपोर्ट पूर्वावलोकन" : "Digital Employer Passport Preview"}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {lang === "hi" ? "पंजीकरण समाप्त करने से पहले अपना डिजिटल आईडी क्रेडेंशियल सत्यापित करें।" : "Review your permanent digital labour deployment passport card before final activation."}
                        </p>
                      </div>

                      {/* Passport Preview Card (Dual language and high-contrast) */}
                      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40 border-2 border-amber-500/35 rounded-2xl p-5 shadow-2xl relative overflow-hidden max-w-sm mx-auto">
                        <div className="absolute top-0 right-0 flex h-1 w-16">
                          <div className="bg-[#FF9933] flex-1" />
                          <div className="bg-white flex-1" />
                          <div className="bg-[#138808] flex-1" />
                        </div>

                        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-850/80">
                          <div className="bg-amber-500 text-slate-950 p-1.5 rounded-lg font-bold font-mono text-[10px]">
                            EMP
                          </div>
                          <div>
                            <h5 className="text-[10px] font-extrabold text-white tracking-widest uppercase font-mono leading-none">
                              {lang === "hi" ? "भारत सरकार राष्ट्रीय ग्रिड" : "GOVERNMENT OF INDIA"}
                            </h5>
                            <span className="text-[8px] text-amber-500 font-mono block tracking-wider uppercase mt-0.5">
                              {lang === "hi" ? "अधिकृत डिजिटल नियोक्ता" : "SECURE NATIONAL EMPLOYER PASS"}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 space-y-3">
                          <div className="grid grid-cols-2 gap-3 text-[11px]">
                            <div>
                              <span className="text-slate-500 block font-mono text-[9px] uppercase">ID Number</span>
                              <span className="font-bold text-white font-mono">{empPassportId || "EMP-IND-283021-N"}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block font-mono text-[9px] uppercase">KYC Status</span>
                              <span className="text-emerald-400 font-bold flex items-center gap-1 font-mono">
                                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                                VERIFIED
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-2.5 text-[11px] pt-3 border-t border-slate-850/50">
                            <div>
                              <span className="text-slate-500 block font-mono text-[9px] uppercase">Employer / Org Name</span>
                              <span className="font-bold text-white text-xs">{empName || "Sanjay Sharma"}</span>
                              {empOrgName && <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{empOrgName}</span>}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <span className="text-slate-500 block font-mono text-[9px] uppercase">Category</span>
                                <span className="font-bold text-amber-400 font-mono uppercase">{empCategory}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 block font-mono text-[9px] uppercase">Dispatch Location</span>
                                <span className="font-bold text-white truncate block">{empDistrict || "Gorakhpur"}, {empState || "UP"}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-1">
                              <div>
                                <span className="text-slate-500 block font-mono text-[9px] uppercase">Hiring Volume</span>
                                <span className="font-bold text-slate-300 font-mono">{empWorkerCount ? `${empWorkerCount} Workers` : "Flexible"}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 block font-mono text-[9px] uppercase">Frequency</span>
                                <span className="font-bold text-slate-300 font-mono">{empHiringFrequency}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEPPER CONTROLS */}
                  <div className="flex justify-between items-center gap-3 pt-4 border-t border-slate-800">
                    {employerRegStep > 1 && employerRegStep < 7 ? (
                      <button
                        type="button"
                        onClick={() => {
                          const prevStep = employerRegStep - 1;
                          setEmployerRegStep(prevStep);
                          handleVoiceSpeak(
                            `पीछे जा रहे हैं, चरण ${prevStep}।`, 
                            `Going back to step ${prevStep}.`
                          );
                        }}
                        className="px-4 min-h-[44px] bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 rounded-xl transition flex items-center justify-center gap-1 text-xs font-semibold"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{lang === "hi" ? "पीछे" : "Back"}</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    {employerRegStep < 7 ? (
                      <button
                        type="button"
                        onClick={() => {
                          // Validation rules for next step
                          if (employerRegStep === 2) {
                            if (!empName) {
                              alert("कृपया नियोक्ता का नाम दर्ज करें। / Please enter Employer Contact Name.");
                              return;
                            }
                          }
                          if (employerRegStep === 3) {
                            if (!empState || !empDistrict || !empAddress) {
                              alert("कृपया राज्य, जिला और पता भरें। / Please fill in State, District and Address.");
                              return;
                            }
                          }
                          if (employerRegStep === 4) {
                            if (!empWorkerCount) {
                              alert("कृपया कामगारों की आवश्यकता संख्या चुनें। / Please select typical worker count.");
                              return;
                            }
                          }

                          const nextStep = employerRegStep + 1;
                          setEmployerRegStep(nextStep);
                          handleVoiceSpeak(
                            `सहेजा गया। चरण ${nextStep} पर चलें।`, 
                            `Details saved. Advancing to step ${nextStep}.`
                          );
                        }}
                        className="px-5 min-h-[44px] bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-extrabold transition flex items-center justify-center gap-1 text-xs"
                      >
                        <span>{lang === "hi" ? "सहेजें और आगे बढ़ें" : "Save & Continue"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          const finalName = empName || empOrgName || "Sanjay Sharma";
                          setLoggedInUser({ name: finalName, role: empCategory || "employer" });
                          setRegisterStep("success");
                          handleVoiceSpeak(
                            `बधाई हो, ${finalName}! आपका डिजिटल नियोक्ता क्रेडेंशियल पासपोर्ट सक्रिय कर दिया गया है।`, 
                            `Congratulations, ${finalName}! Your permanent digital employer credentials passport has been successfully activated.`
                          );
                        }}
                        className="w-full min-h-[48px] bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl font-extrabold transition flex flex-col items-center justify-center py-1.5"
                      >
                        <span className="text-xs leading-none">डिजिटल नियोक्ता पासपोर्ट सक्रिय करें</span>
                        <span className="text-[9px] opacity-80 leading-none mt-0.5 font-mono">Activate Secure Employer Passport ID</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: REGISTRATION DETAILS FORM */}
              {registerStep === "details" && (
                <div className="space-y-6">
                  <div className="text-center pb-2 border-b border-slate-800">
                    <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">चरण ४ / STEP 4</span>
                    <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                      {lang === "hi" ? "पंजीकरण विवरण प्रपत्र" : "Registration Details Intake"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {lang === "hi" 
                        ? `श्रेणी: ${selectedRoleForRegister?.toUpperCase()}` 
                        : `Category: ${selectedRoleForRegister?.toUpperCase()}`}
                    </p>
                  </div>

                  {/* FORM FIELDS DEPENDING ON ROLE */}
                  {selectedRoleForRegister === "worker" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-1 md:col-span-2">
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">श्रमिक का पूरा नाम / Worker Full Name *</span>
                          <input
                            type="text"
                            placeholder="Manoj Kumar"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">लिंग / Gender *</span>
                          <select
                            value={regGender}
                            onChange={(e) => setRegGender(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          >
                            <option value="">Select / चुनें</option>
                            <option value="male">पुरुष / Male</option>
                            <option value="female">महिला / Female</option>
                            <option value="other">अन्य / Other</option>
                          </select>
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">उम्र / Age *</span>
                          <input
                            type="number"
                            placeholder="32"
                            value={regAge}
                            onChange={(e) => setRegAge(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">राज्य / State *</span>
                          <input
                            type="text"
                            placeholder="Uttar Pradesh"
                            value={regState}
                            onChange={(e) => setRegState(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">जिला / District *</span>
                          <input
                            type="text"
                            placeholder="Gorakhpur"
                            value={regDistrict}
                            onChange={(e) => setRegDistrict(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">शहर / ग्राम / City or Village *</span>
                          <input
                            type="text"
                            placeholder="Sahjanwa"
                            value={regCity}
                            onChange={(e) => setRegCity(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">पिन कोड / PIN Code *</span>
                          <input
                            type="text"
                            placeholder="273209"
                            value={regPin}
                            onChange={(e) => setRegPin(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">मुख्य हुनर / Primary Skill *</span>
                          <input
                            type="text"
                            placeholder="Rajmistri / Mason"
                            value={regPrimarySkill}
                            onChange={(e) => setRegPrimarySkill(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">कार्य अनुभव (वर्ष) / Experience (Years) *</span>
                          <input
                            type="number"
                            placeholder="8"
                            value={regExperience}
                            onChange={(e) => setRegExperience(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">दैनिक वेतन मांग / Daily Wage Expectation *</span>
                          <input
                            type="number"
                            placeholder="650"
                            value={regWage}
                            onChange={(e) => setRegWage(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">अन्य हुनर / Secondary Skills</span>
                          <input
                            type="text"
                            placeholder="Plaster, Tile Fitting"
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div className="col-span-1 md:col-span-2 bg-slate-950/40 p-4 rounded-2xl border border-slate-800 space-y-3">
                        <span className="text-xs font-bold text-amber-500 block font-mono uppercase tracking-wider">सत्यापन स्थिति / Identification Status</span>
                        
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                          <div>
                            <span className="text-xs text-slate-300 font-bold block">आधार सत्यापन (स्वैच्छिक) / Aadhaar KYC</span>
                            <span className="text-[10px] text-emerald-400 block font-mono">Future Ready - Verified State Secure</span>
                          </div>
                          <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg self-start font-mono uppercase">
                            Ready / तैयार
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
                          <div>
                            <span className="text-xs text-slate-300 font-bold block">डिजिटल लेबर पासपोर्ट / Labour Passport</span>
                            <span className="text-[10px] text-slate-400 block font-mono">Lifetime portable profile record creation</span>
                          </div>
                          <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-500 px-3 py-1 rounded-lg self-start font-mono uppercase">
                            Pending Registration
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedRoleForRegister === "contractor" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">ठेकेदार का नाम / Contractor Name *</span>
                          <input
                            type="text"
                            placeholder="Rajesh Prasad"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">कंपनी का नाम / Company Name (Optional)</span>
                          <input
                            type="text"
                            placeholder="Prasad Labour Supplies"
                            value={regCompany}
                            onChange={(e) => setRegCompany(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">ठेकेदारी श्रेणी / Contractor Category *</span>
                          <input
                            type="text"
                            placeholder="Civil / Electrical / Manpower"
                            value={regCategory}
                            onChange={(e) => setRegCategory(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">व्यवसाय का पता / Business Address *</span>
                          <input
                            type="text"
                            placeholder="Sector 4, GIDA"
                            value={regAddress}
                            onChange={(e) => setRegAddress(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">राज्य / State *</span>
                          <input
                            type="text"
                            placeholder="Uttar Pradesh"
                            value={regState}
                            onChange={(e) => setRegState(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">जिला / District *</span>
                          <input
                            type="text"
                            placeholder="Gorakhpur"
                            value={regDistrict}
                            onChange={(e) => setRegDistrict(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">GST नंबर / GST Number (Optional)</span>
                          <input
                            type="text"
                            placeholder="09AAAAA0000A1Z1"
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">मासिक अनुमानित नियुक्त मजदूर / Monthly Labour Hired</span>
                          <input
                            type="number"
                            placeholder="50"
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {selectedRoleForRegister === "household" && (
                    <div className="space-y-4 max-w-md mx-auto">
                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">गृहस्वामी का नाम / Household User Name *</span>
                          <input
                            type="text"
                            placeholder="Sanjay Sharma"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">पूरा पता / Complete Address *</span>
                          <input
                            type="text"
                            placeholder="H.No 142, Vikas Nagar"
                            value={regAddress}
                            onChange={(e) => setRegAddress(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">पिन कोड / PIN Code *</span>
                          <input
                            type="text"
                            placeholder="273001"
                            value={regPin}
                            onChange={(e) => setRegPin(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {selectedRoleForRegister === "farmer" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">किसान का नाम / Farmer Name *</span>
                          <input
                            type="text"
                            placeholder="Ram Singh"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">कृषि क्षेत्र / Farm Location *</span>
                          <input
                            type="text"
                            placeholder="Vill: Chauri Chaura"
                            value={regAddress}
                            onChange={(e) => setRegAddress(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">मुख्य फसलें / Crop Types *</span>
                          <input
                            type="text"
                            placeholder="Wheat, Paddy, Sugarcane"
                            value={regCrop}
                            onChange={(e) => setRegCrop(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">मौसमी मजदूर आवश्यकता / Seasonal Labour Need</span>
                          <input
                            type="text"
                            placeholder="10-20 during Harvest"
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {(selectedRoleForRegister === "builder" || selectedRoleForRegister === "msme") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">संस्था / व्यवसाय का नाम / Organization Name *</span>
                          <input
                            type="text"
                            placeholder="BuildTech Infrastructure Ltd"
                            value={regOrgName}
                            onChange={(e) => setRegOrgName(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">अधिकृत व्यक्ति / Authorized Representative *</span>
                          <input
                            type="text"
                            placeholder="Anil Verma (HR Manager)"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">ईमेल पता / Business Email *</span>
                          <input
                            type="email"
                            placeholder="hr@buildtech.in"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">व्यवसाय श्रेणी / Business Category *</span>
                          <input
                            type="text"
                            placeholder="Construction / Logistics / Manufacturing"
                            value={regCategory}
                            onChange={(e) => setRegCategory(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div className="col-span-1 md:col-span-2">
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">कार्यालय का पता / Registered Address *</span>
                          <input
                            type="text"
                            placeholder="Floor 3, Cyber Tower, Gorakhpur"
                            value={regAddress}
                            onChange={(e) => setRegAddress(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {(selectedRoleForRegister === "ngo" || selectedRoleForRegister === "government") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">विभाग / एनजीओ नाम / Agency Name *</span>
                          <input
                            type="text"
                            placeholder="District Urban Development Agency (DUDA)"
                            value={regOrgName}
                            onChange={(e) => setRegOrgName(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">अधिकृत अधिकारी / Authorized Officer *</span>
                          <input
                            type="text"
                            placeholder="Dr. Shweta Rai (Project Director)"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">आधिकारिक ईमेल / Official Email *</span>
                          <input
                            type="email"
                            placeholder="pd.duda@up.gov.in"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>

                      <div className="col-span-1 md:col-span-2">
                        <label className="block">
                          <span className="text-xs text-slate-300 font-bold block">पता / Office Address *</span>
                          <input
                            type="text"
                            placeholder="Vikas Bhawan, Collectorate Compound"
                            value={regAddress}
                            onChange={(e) => setRegAddress(e.target.value)}
                            className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-sm min-h-[48px]"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      const finalName = regName || regOrgName || "Verified User";
                      setLoggedInUser({ name: finalName, role: selectedRoleForRegister || "User" });
                      setRegisterStep("success");
                      handleVoiceSpeak(
                        `बधाई हो, ${finalName}। पंजीकरण सुरक्षित रूप से समाप्त हो गया।`,
                        `Congratulations, ${finalName}. Registration completed securely.`
                      );
                    }}
                    className="w-full min-h-[48px] bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold flex flex-col items-center justify-center py-1.5 transition cursor-pointer mt-6"
                  >
                    <span className="text-xs leading-none">पंजीकरण सबमिट करें</span>
                    <span className="text-[9px] opacity-80 leading-none mt-0.5 font-mono">Submit National Registration</span>
                  </button>
                </div>
              )}

              {/* STEP 5: REGISTRATION SUCCESS */}
              {registerStep === "success" && (
                <div className="space-y-6 text-center py-6">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/25">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl font-extrabold text-white">
                      {lang === "hi" ? "राष्ट्रीय डिजिटल पंजीकरण संपन्न!" : "National Digital Registration Successful!"}
                    </h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      {lang === "hi" 
                        ? `आपका खाता सफलतापूर्वक पंजीकृत हो गया है। आपका डिजिटल लेबर पासपोर्ट अब सक्रिय है।` 
                        : `Your account has been registered successfully. Your life-long portable Digital Labour Passport is now active.`}
                    </p>
                  </div>

                  {/* Dashboard placeholder representation as mandated */}
                  <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl text-left space-y-4 max-w-md mx-auto">
                    <span className="text-[9px] text-amber-500 font-mono tracking-widest block uppercase font-bold">
                      {selectedRoleForRegister?.toUpperCase()} DASHBOARD SECURE ACTIVE STATE
                    </span>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between border-b border-slate-900 pb-2">
                        <span className="text-slate-400">नाम / Name:</span>
                        <span className="font-bold text-white">{loggedInUser?.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-2">
                        <span className="text-slate-400">श्रेणी / Role:</span>
                        <span className="font-bold text-amber-400 font-mono uppercase">{loggedInUser?.role}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-2">
                        <span className="text-slate-400">सत्यापन / KYC:</span>
                        <span className="font-bold text-emerald-400">Verified (सत्यापित)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">पासपोर्ट आईडी / Passport ID:</span>
                        <span className="font-bold text-white font-mono text-[10px]">LP-IND-993208-A</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsRegisterModalOpen(false)}
                    className="w-full max-w-xs min-h-[48px] bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex flex-col items-center justify-center py-1.5 transition cursor-pointer mx-auto"
                  >
                    <span className="text-xs leading-none">डैशबोर्ड पर जाएं</span>
                    <span className="text-[9px] text-slate-300 leading-none mt-0.5 font-mono">Proceed to Digital Dashboard</span>
                  </button>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>National Public Infrastructure Act 2026</span>
              <span>Secure Encrypted Transport Layer</span>
            </div>

          </div>
        </div>
      )}

      {/* 3. Unified Login Gateway Modal */}
      {isLoginModalOpen && (
        <div id="login-modal-backdrop" className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div id="login-gateway-panel" className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl transition duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 relative bg-slate-900/50">
              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white p-2.5 rounded-xl border border-slate-800 transition cursor-pointer min-h-[40px]"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-500" />
                {lang === "hi" ? "राष्ट्रीय श्रमिक पोर्टल लॉगिन" : "National Trade Portal Login"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {lang === "hi" ? "सुरक्षित सत्यापन लिंक पहचान प्रणाली।" : "Secure verification link authentication gateway."}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 bg-slate-900">
              
              {/* STEP 1: ROLE SELECTION */}
              {loginStep === "role" && (
                <div className="space-y-4">
                  <div className="text-center pb-2">
                    <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">लॉगिन श्रेणी / LOGIN CATEGORY</span>
                    <h4 className="text-sm font-bold text-slate-300">
                      {lang === "hi" ? "लॉगिन करने के लिए अपनी श्रेणी चुनें" : "Select Your Role to Continue"}
                    </h4>
                  </div>

                  <div className="space-y-2">
                    {[
                      { id: "worker", hi: "श्रमिक / कारीगर", en: "Worker / Tradesperson" },
                      { id: "contractor", hi: "ठेकेदार / पेटी कांट्रेक्टर", en: "Contractor" },
                      { id: "employer", hi: "नियोक्ता / कंपनी / फार्मर", en: "Employer / Company / Farmer" },
                      { id: "household", hi: "घरेलू नियोक्ता / गृहस्वामी", en: "Household User" },
                      { id: "admin", hi: "व्यवस्थापक (Admin Access)", en: "Platform Administrator" }
                    ].map((role) => (
                      <button
                        key={role.id}
                        onClick={() => {
                          setSelectedRoleForLogin(role.id);
                          setLoginStep("mobile");
                          handleVoiceSpeak(
                            `आगे बढ़ने के लिए अपना पंजीकृत मोबाइल नंबर दर्ज करें।`,
                            `Enter your registered mobile number to proceed.`
                          );
                        }}
                        className="w-full text-left p-3 rounded-xl border border-slate-800 hover:border-amber-500/50 bg-slate-950/50 hover:bg-slate-950 transition duration-150 flex items-center justify-between cursor-pointer min-h-[48px]"
                      >
                        <div>
                          <span className="text-xs font-bold text-white block leading-none">{role.hi}</span>
                          <span className="text-[9px] text-slate-400 block font-mono mt-1">{role.en}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: ENTER MOBILE */}
              {loginStep === "mobile" && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h4 className="text-sm font-bold text-white">
                      {lang === "hi" ? "पंजीकृत मोबाइल नंबर" : "Enter Registered Mobile"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 font-mono uppercase text-amber-500">
                      ROLE: {selectedRoleForLogin?.toUpperCase()}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-left">
                      <span className="text-xs text-slate-300 font-bold block">मोबाइल नंबर / Mobile Number</span>
                      <div className="relative mt-1.5">
                        <span className="absolute left-4 top-3 text-sm text-slate-400 font-bold font-mono">+91</span>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="9876543210"
                          value={loginMobile}
                          onChange={(e) => setLoginMobile(e.target.value.replace(/\D/g, ""))}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white pl-14 pr-4 py-3 rounded-xl outline-none text-sm font-mono min-h-[48px]"
                        />
                      </div>
                    </label>

                    <button
                      onClick={() => {
                        if (loginMobile.length !== 10) {
                          alert("कृपया १० अंकों का मोबाइल नंबर दर्ज करें।");
                          return;
                        }
                        setLoginStep("otp");
                        handleVoiceSpeak(
                          "ओटीपी भेजा गया है। सत्यापन के लिए १ २ ३ ४ दर्ज करें।",
                          "OTP sent. Enter 1 2 3 4 to complete login."
                        );
                      }}
                      className="w-full min-h-[48px] bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold flex flex-col items-center justify-center py-1.5 transition cursor-pointer"
                    >
                      <span className="text-xs leading-none">सुरक्षित ओटीपी भेजें</span>
                      <span className="text-[9px] opacity-80 leading-none mt-0.5">Send Secure OTP</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: OTP VERIFY */}
              {loginStep === "otp" && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h4 className="text-sm font-bold text-white">
                      {lang === "hi" ? "सत्यापन कोड दर्ज करें" : "Provide Mobile Passcode"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      +91 {loginMobile}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-left">
                      <span className="text-xs text-slate-300 font-bold block">सत्यापन कोड / OTP Code</span>
                      <span className="text-[10px] text-amber-500 block font-mono font-bold">प्रदर्शन के लिए &apos;1234&apos; का उपयोग करें / Use &apos;1234&apos;</span>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="1234"
                        value={loginOtp}
                        onChange={(e) => setLoginOtp(e.target.value.replace(/\D/g, ""))}
                        className="w-full mt-1.5 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white px-4 py-3 rounded-xl outline-none text-center text-lg tracking-widest font-mono min-h-[48px]"
                      />
                    </label>

                    <button
                      onClick={() => {
                        if (loginOtp !== "1234") {
                          alert("अमान्य कोड। '1234' का उपयोग करें।");
                          return;
                        }
                        
                        let defaultUser = "Hari Ram";
                        if (selectedRoleForLogin === "admin") {
                          defaultUser = "System Administrator";
                        } else if (selectedRoleForLogin === "contractor") {
                          defaultUser = "Vikas Kumar (Contractor)";
                        } else if (selectedRoleForLogin === "employer") {
                          defaultUser = "Somesh Builders";
                        } else if (selectedRoleForLogin === "household") {
                          defaultUser = "Ajay Sharma";
                        }

                        setLoggedInUser({ name: defaultUser, role: selectedRoleForLogin || "User" });
                        setLoginStep("success");
                        handleVoiceSpeak(
                          `लॉगिन सफल। स्वागत है, ${defaultUser}।`,
                          `Login successful. Welcome back, ${defaultUser}.`
                        );
                      }}
                      className="w-full min-h-[48px] bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl font-bold flex flex-col items-center justify-center py-1.5 transition cursor-pointer"
                    >
                      <span className="text-xs leading-none">लॉगिन सत्यापित करें</span>
                      <span className="text-[9px] opacity-80 leading-none mt-0.5">Authenticate & Continue</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: LOGIN SUCCESS */}
              {loginStep === "success" && (
                <div className="space-y-4 text-center py-4">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/25">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    {lang === "hi" ? "सफलतापूर्वक लॉगिन हो गया!" : "Secure Authorization Successful!"}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    {loggedInUser?.name} ({loggedInUser?.role.toUpperCase()})
                  </p>
                  
                  <button
                    onClick={() => setIsLoginModalOpen(false)}
                    className="w-full min-h-[48px] bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex flex-col items-center justify-center py-1.5 transition cursor-pointer"
                  >
                    <span className="text-xs leading-none">समाप्त करें</span>
                    <span className="text-[9px] text-slate-300 leading-none mt-0.5 font-mono">Go to Workspace Dashboard</span>
                  </button>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="px-5 min-h-[48px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition cursor-pointer flex flex-col items-center justify-center"
              >
                <span className="text-xs font-semibold leading-none">बंद करें</span>
                <span className="text-[9px] opacity-75 leading-none mt-0.5">Close</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 4. National Labour Intelligence Dashboard Modal Overlay */}
      {showLabourIntel && (
        <div id="national-labour-intel-modal" className="fixed inset-0 z-50 bg-slate-950/98 overflow-y-auto flex flex-col antialiased">
          
          {/* Dashboard Header Bar */}
          <div className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-md border-b border-amber-500/20 px-4 py-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="bg-amber-500 text-slate-950 p-2 rounded-xl shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-amber-500 font-bold uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded">
                    {lang === "hi" ? "वंदे भारतम इम्पैक्ट इंटेलिजेंस लेयर" : "Vande Bharatam Impact Intelligence Layer"}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-white font-mono mt-1">
                  {lang === "hi" ? "राष्ट्रीय लेबर इंटेलिजेंस डैशबोर्ड" : "National Labour Intelligence Dashboard"}
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  {lang === "hi" 
                    ? "भारत के सत्यापित अनौपचारिक कार्यबल के लिए वास्तविक समय सिम्युलेटेड अंतर्दृष्टि।" 
                    : "Real-time simulated insights for India’s verified informal workforce."}
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3 self-end md:self-center">
              {/* Voice Readout Button */}
              <button
                type="button"
                onClick={() => handleVoiceSpeak(
                  `राष्ट्रीय लेबर इंटेलिजेंस डैशबोर्ड। कुल पंजीकृत कामगार १ करोड़ ४८ लाख। सत्यापित डिजिटल पासपोर्ट ८२ लाख ४० हजार। राष्ट्रीय ट्रस्ट सूचकांक ९१ प्रतिशत है।`,
                  `National Labour Intelligence Dashboard. Registered workers: 1.48 Crore. Verified digital passports: 82.4 Lakh. National trust index is 91 percent.`
                )}
                className="p-2.5 bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 rounded-xl border border-amber-500/35 transition cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold"
                title="आवाज़ से डैशबोर्ड पढ़ें / Listen to Dashboard Summary"
              >
                <Volume2 className="w-4 h-4" />
                <span className="hidden sm:inline">{lang === "hi" ? "सुनें" : "Listen"}</span>
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  setShowLabourIntel(false);
                  if (typeof window !== "undefined" && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                  }
                  setIsSpeaking(false);
                  setActiveSpeechText(null);
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white p-2.5 rounded-xl border border-slate-700 transition cursor-pointer flex items-center gap-1 text-xs font-mono font-bold"
              >
                <X className="w-4 h-4" />
                <span>{lang === "hi" ? "बंद करें" : "Close"}</span>
              </button>
            </div>
          </div>

          {/* Dashboard Container */}
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 space-y-8 flex-1">
            
            {/* Top Regional / State Simulator Filter */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0" />
                <p className="text-xs text-slate-400">
                  {lang === "hi" 
                    ? "सिम्युलेटर मोड सक्रिय: डेटा हर २४ घंटे में अपडेट होता है। राज्य अनुसार फिल्टर करके देखें।"
                    : "Simulated Data Engine: Records updated every 24h. Use filter to drill down."}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-mono text-slate-500 shrink-0 uppercase tracking-wider">{lang === "hi" ? "राज्य फ़िल्टर" : "Filter State"}:</span>
                <select
                  id="intel-state-select"
                  className="bg-slate-950 text-white border border-slate-800 focus:border-amber-500 outline-none rounded-xl px-3 py-2 text-xs font-mono min-w-[160px] cursor-pointer"
                  defaultValue="all"
                >
                  <option value="all">{lang === "hi" ? "अखिल भारतीय / All India" : "All India (अखिल भारतीय)"}</option>
                  <option value="up">Uttar Pradesh (उत्तर प्रदेश)</option>
                  <option value="bihar">Bihar (बिहार)</option>
                  <option value="mh">Maharashtra (महाराष्ट्र)</option>
                  <option value="gj">Gujarat (गुजरात)</option>
                </select>
              </div>
            </div>

            {/* TOP NATIONAL METRICS GRID (8 Premium Cards) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/20 transition duration-200">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{lang === "hi" ? "पंजीकृत श्रमिक" : "Registered Workers"}</span>
                <p className="text-2xl font-black text-white font-mono mt-2 tracking-tight">1.48 Crore</p>
                <span className="text-[10px] text-amber-500 font-mono mt-1 block">१.४८ करोड़ (Simulated)</span>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/20 transition duration-200">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{lang === "hi" ? "सत्यापित डिजिटल पासपोर्ट" : "Verified Labour Passports"}</span>
                <p className="text-2xl font-black text-white font-mono mt-2 tracking-tight">82.4 Lakh</p>
                <span className="text-[10px] text-amber-500 font-mono mt-1 block">८२.४ लाख (Aadhaar KYC)</span>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/20 transition duration-200">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{lang === "hi" ? "सक्रिय ठेकेदार" : "Active Contractors"}</span>
                <p className="text-2xl font-black text-white font-mono mt-2 tracking-tight">3.2 Lakh</p>
                <span className="text-[10px] text-amber-500 font-mono mt-1 block">३.२ लाख (GST/MCD Registered)</span>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/20 transition duration-200">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{lang === "hi" ? "इस महीने पोस्ट नौकरियां" : "Jobs Posted (Monthly)"}</span>
                <p className="text-2xl font-black text-white font-mono mt-2 tracking-tight">18.6 Lakh</p>
                <span className="text-[10px] text-amber-500 font-mono mt-1 block">१८.६ लाख (Direct Demand)</span>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/20 transition duration-200">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{lang === "hi" ? "सृजित रोजगार दिवस" : "Employment Days Created"}</span>
                <p className="text-2xl font-black text-white font-mono mt-2 tracking-tight">48.1 Lakh</p>
                <span className="text-[10px] text-amber-500 font-mono mt-1 block">४८.१ लाख कार्य दिवस</span>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/20 transition duration-200">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{lang === "hi" ? "औसत मजदूरी पारदर्शिता लाभ" : "Wage Transparency Gain"}</span>
                <p className="text-2xl font-black text-emerald-400 font-mono mt-2 tracking-tight">+18.4%</p>
                <span className="text-[10px] text-emerald-500 font-mono mt-1 block">१८.४% वृद्धि (Middlemen Eliminated)</span>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/20 transition duration-200">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{lang === "hi" ? "कवर किए गए जिले" : "Districts Covered"}</span>
                <p className="text-2xl font-black text-white font-mono mt-2 tracking-tight">742</p>
                <span className="text-[10px] text-amber-500 font-mono mt-1 block">७४२ जिले (All India Coverage)</span>
              </div>

              <div className="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/20 transition duration-200">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{lang === "hi" ? "सक्रिय राज्य और यूटी" : "Active States / UTs"}</span>
                <p className="text-lg font-black text-white font-mono mt-2 leading-tight">28 States<br/>& 8 UTs</p>
                <span className="text-[10px] text-amber-500 font-mono mt-1 block">२८ राज्य / ८ केंद्र शासित प्रदेश</span>
              </div>

            </div>

            {/* PROMPT-14: Platform Sustainability Index (Double Column Card) */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-2 border-emerald-500/20 rounded-3xl p-6 text-left relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
                      {lang === "hi" ? "राष्ट्रीय आत्मनिर्भरता मेट्रिक्स" : "NATIONAL SELF-SUSTAINABILITY INDEX"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-sans">
                    {lang === "hi" ? "प्लेटफॉर्म स्थिरता सूचकांक" : "Platform Sustainability Index"}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === "hi" 
                      ? "लेबरअड्डा के सामाजिक प्रभाव और वित्तीय आत्मनिर्भरता को संतुलित करने वाली वास्तविक समय की रेटिंग।" 
                      : "A real-time rating measuring LabourAdda's balance of social impact & financial self-sufficiency."}
                  </p>
                  
                  <div className="pt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-emerald-400 font-mono tracking-tight">{prompt14SustainabilityIndex}%</span>
                    <span className="text-xs text-emerald-500 font-mono font-bold uppercase">({lang === "hi" ? "अति विश्वसनीय" : "High Trust Score"})</span>
                  </div>
                </div>

                <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-left space-y-1">
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">{lang === "hi" ? "सूक्ष्म-शुल्क राजस्व प्रवाह" : "Micro-Fee Stream"}</span>
                    <span className="text-sm font-bold text-white font-mono block">100% {lang === "hi" ? "स्थिर" : "Stable"}</span>
                    <span className="text-[8px] text-slate-500 block font-mono">Simulated fee run rate</span>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-left space-y-1">
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">{lang === "hi" ? "मजदूरी सुरक्षा दर" : "Wage Protection"}</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono block">100% {lang === "hi" ? "सुरक्षित" : "Protected"}</span>
                    <span className="text-[8px] text-slate-500 block font-mono">No commission on wages</span>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-left space-y-1">
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">{lang === "hi" ? "सत्यापित सेटलमेंट ट्रेल" : "Verified Settlement Trail"}</span>
                    <span className="text-sm font-bold text-white font-mono block">100% {lang === "hi" ? "सत्यापित" : "Audited"}</span>
                    <span className="text-[8px] text-emerald-500 block font-mono">Tamper-proof receipts</span>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-left space-y-1">
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">{lang === "hi" ? "विवाद दर में कमी" : "Dispute Reduction"}</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono block">-92% {lang === "hi" ? "कमी" : "Resolved"}</span>
                    <span className="text-[8px] text-slate-500 block font-mono">Dispute-free settlements</span>
                  </div>
                </div>
              </div>

              {/* Safety Compliance notice */}
              <div className="mt-4 pt-3.5 border-t border-slate-900 text-[10px] text-slate-500 flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <p>
                  <strong>{lang === "hi" ? "सिम्युलेटेड डेमो अनुपालन सूचना:" : "Demo Compliance Note:"}</strong>{" "}
                  {lang === "hi"
                    ? "यह स्थिरता सूचकांक सिमुलेशन इंजन पर आधारित है। कोई वास्तविक बैंकिंग क्रेडेंशियल या वित्तीय लेनदेन आवश्यक या प्रयुक्त नहीं हैं।"
                    : "This sustainability metric is simulated for demonstrating model financial resilience. No actual bank endpoints are called."}
                </p>
              </div>
            </div>

            {/* BENTO GRID: SECTION 1 - DISTRICT DEMAND vs SKILL GAP */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* DISTRICT LABOUR DEMAND PANEL */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-500" />
                      <div>
                        <h3 className="text-sm font-bold text-white font-mono">
                          {lang === "hi" ? "जिलावार श्रम मांग सूचकांक" : "District-Wise Labour Demand Index"}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {lang === "hi" ? "स्थानीय स्तर पर उच्च मांग वाले ट्रेड" : "Real-time demand signals from core industrial zones."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { district: "Gorakhpur (गोरखपुर)", state: "Uttar Pradesh", demand: "HIGH", trades: ["Mason", "Electrician", "Helper"], hiTrades: ["राजमिस्त्री", "बिजली मिस्त्री", "सहायक"] },
                      { district: "Lucknow (लखनऊ)", state: "Uttar Pradesh", demand: "HIGH", trades: ["Painter", "Plumber", "Driver"], hiTrades: ["पेंटर", "प्लंबर", "चालक"] },
                      { district: "Delhi NCR (दिल्ली एनसीआर)", state: "National Capital Region", demand: "HIGH", trades: ["Carpenter", "Housekeeping", "Security Guard"], hiTrades: ["बढ़ई", "हाउसकीपिंग", "सुरक्षा गार्ड"] },
                      { district: "Surat (सूरत)", state: "Gujarat", demand: "HIGH", trades: ["Textile Worker", "Welder", "Machine Operator"], hiTrades: ["कपड़ा उद्योग कारीगर", "वेल्डर", "मशीन ऑपरेटर"] },
                      { district: "Pune (पुणे)", state: "Maharashtra", demand: "MEDIUM", trades: ["Electrician", "Mechanic", "Driver"], hiTrades: ["बिजली मिस्त्री", "मैकेनिक", "चालक"] }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-950/50 border border-slate-800/80 p-3.5 rounded-xl flex items-center justify-between gap-4">
                        <div className="text-left space-y-1">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">{item.state}</span>
                          <h4 className="text-xs font-bold text-white font-mono">{item.district}</h4>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {item.trades.map((trade, tIdx) => (
                              <span key={tIdx} className="text-[9px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                                {lang === "hi" ? item.hiTrades[tIdx] : trade}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className={`text-[9px] font-mono font-bold px-2 py-1 rounded-full ${
                          item.demand === "HIGH" 
                            ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {item.demand}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SKILL GAP INTELLIGENCE */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-amber-500" />
                      <div>
                        <h3 className="text-sm font-bold text-white font-mono">
                          {lang === "hi" ? "भारत कौशल अंतराल रडार" : "India Skill Gap Radar"}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {lang === "hi" ? "बाजार मांग और उपलब्ध प्रमाणित जनशक्ति का अंतर" : "Unfulfilled demand compared to registered worker capacities."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { gap: "Mason Demand Gap (राजमिस्त्री)", val: 22, color: "from-amber-500 to-amber-600" },
                      { gap: "Electrician Demand Gap (बिजली मिस्त्री)", val: 31, color: "from-amber-500 to-amber-600" },
                      { gap: "Plumber Demand Gap (प्लंबर)", val: 18, color: "from-amber-500 to-amber-600" },
                      { gap: "Agricultural Labour Seasonal Gap (कृषि श्रमिक)", val: 42, color: "from-red-500 to-amber-500" },
                      { gap: "Women Workforce Participation Gap (महिला कार्यबल)", val: 27, color: "from-amber-500 to-amber-600" },
                      { gap: "Certified Skill Worker Gap (सत्यापित कुशल श्रमिक)", val: 36, color: "from-red-500 to-amber-500" }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-300 font-mono">{item.gap}</span>
                          <span className="text-amber-400 font-bold font-mono">{item.val}%</span>
                        </div>
                        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-850">
                          <div 
                            className={`bg-gradient-to-r ${item.color} h-full rounded-full transition-all duration-1000`}
                            style={{ width: `${item.val}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* BENTO GRID: SECTION 2 - WAGE TRANSPARENCY vs TRUST & FORMALIZATION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* WAGE TRANSPARENCY INDEX */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-amber-500" />
                      <div>
                        <h3 className="text-sm font-bold text-white font-mono">
                          {lang === "hi" ? "मजदूरी पारदर्शिता सूचकांक" : "Wage Transparency Index"}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {lang === "hi" ? "बिचौलियों के बिना प्रत्यक्ष पारिश्रमिक प्रभाव" : "Direct economic benefit & elimination of commission leakage."}
                        </p>
                      </div>
                    </div>
                    <div className="bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-black px-2.5 py-1 rounded">
                      WTI: 86/100
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-xl space-y-3">
                      <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider block border-b border-slate-800 pb-1.5">
                        {lang === "hi" ? "LabourAdda से पहले" : "Before LabourAdda"}
                      </span>
                      <ul className="space-y-2 text-xs text-slate-400">
                        <li className="flex items-start gap-1.5">
                          <span className="text-red-500 shrink-0 mt-0.5">•</span>
                          <span>{lang === "hi" ? "बिचौलियों द्वारा नुकसान: 15%–30%" : "Middleman wage loss: 15%–30%"}</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-red-500 shrink-0 mt-0.5">•</span>
                          <span>{lang === "hi" ? "अपुष्ट भर्ती जोखिम: उच्च" : "Unverified hiring risk: High"}</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-red-500 shrink-0 mt-0.5">•</span>
                          <span>{lang === "hi" ? "मजदूरी विवाद दर: उच्च" : "Wage dispute rate: High"}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-b from-amber-500/5 to-transparent border border-amber-500/20 p-4 rounded-xl space-y-3">
                      <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block border-b border-amber-500/10 pb-1.5">
                        {lang === "hi" ? "LabourAdda के बाद" : "After LabourAdda"}
                      </span>
                      <ul className="space-y-2 text-xs text-slate-300">
                        <li className="flex items-start gap-1.5">
                          <span className="text-amber-500 shrink-0 mt-0.5">✓</span>
                          <span>{lang === "hi" ? "प्रत्यक्ष मजदूरी पारदर्शिता" : "Direct wage visibility"}</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-amber-500 shrink-0 mt-0.5">✓</span>
                          <span>{lang === "hi" ? "सत्यापित श्रमिक पहचान" : "Verified worker identity"}</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-amber-500 shrink-0 mt-0.5">✓</span>
                          <span>{lang === "hi" ? "डिजिटल कार्य रिकॉर्ड" : "Digital work records"}</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-amber-500 shrink-0 mt-0.5">✓</span>
                          <span>{lang === "hi" ? "न्यूनतम विवाद" : "Reduced disputes"}</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-amber-500 shrink-0 mt-0.5">✓</span>
                          <span>{lang === "hi" ? "एस्क्रो-तैयार भुगतान" : "Escrow-ready settlement"}</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>

              {/* TRUST & FORMALIZATION LAYER */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-amber-500" />
                      <div>
                        <h3 className="text-sm font-bold text-white font-mono">
                          {lang === "hi" ? "विश्वास और औपचारिकरण परत" : "Trust & Formalization Layer"}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {lang === "hi" ? "सुरक्षा, आधार जुड़ाव और रेटिंग संकेतक" : "National verified tracking for secure hiring contracts."}
                        </p>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-black px-2.5 py-1 rounded">
                      National Trust Index: 91%
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Aadhaar-linked profiles", hi: "आधार-लिंक्ड प्रोफाइल" },
                      { name: "Digital Labour Passport", hi: "डिजिटल लेबर पासपोर्ट" },
                      { name: "QR attendance", hi: "क्यूआर उपस्थिति" },
                      { name: "Verified employer history", hi: "सत्यापित नियोक्ता इतिहास" },
                      { name: "Worker rating", hi: "श्रमिक रेटिंग" },
                      { name: "Dispute-free score", hi: "विवाद-मुक्त स्कोर" },
                      { name: "Repeat hiring score", hi: "पुनः नियुक्ति स्कोर" }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-950/40 border border-slate-850 p-2.5 rounded-lg flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <div>
                          <span className="text-[10px] text-white font-semibold block leading-none">{lang === "hi" ? item.hi : item.name}</span>
                          <span className="text-[8px] text-slate-500 font-mono mt-0.5 block leading-none">{lang === "hi" ? item.name : item.hi}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* BENTO GRID: SECTION 3 - LABOUR MOBILITY vs AI INSIGHTS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LABOUR MOBILITY INTELLIGENCE */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-amber-500" />
                      <div>
                        <h3 className="text-sm font-bold text-white font-mono">
                          {lang === "hi" ? "श्रम गतिशीलता खुफिया" : "Labour Mobility Intelligence"}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {lang === "hi" ? "ग्रामीण से शहरी रोजगार गलियारे और मौसमी पलायन" : "Tracking interstate corridors and seasonal migration clusters."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-mono">
                      <div className="p-2 bg-slate-950/40 rounded border border-slate-850">• {lang === "hi" ? "ग्रामीण से शहरी भर्ती गलियारे" : "Rural to Urban hiring corridors"}</div>
                      <div className="p-2 bg-slate-950/40 rounded border border-slate-850">• {lang === "hi" ? "मौसमी कृषि मांग चक्र" : "Seasonal agriculture demand"}</div>
                      <div className="p-2 bg-slate-950/40 rounded border border-slate-850">• {lang === "hi" ? "निर्माण मांग समूह" : "Construction demand clusters"}</div>
                      <div className="p-2 bg-slate-950/40 rounded border border-slate-850">• {lang === "hi" ? "जिलावार कार्यकर्ता उपलब्धता" : "Worker availability by district"}</div>
                      <div className="p-2 bg-slate-950/40 rounded border border-slate-850">• {lang === "hi" ? "रिवर्स माइग्रेशन समर्थन" : "Reverse migration support"}</div>
                      <div className="p-2 bg-slate-950/40 rounded border border-slate-850">• {lang === "hi" ? "स्थानीय रोजगार प्रतिधारण" : "Local employment retention"}</div>
                    </div>

                    <div className="space-y-2 border-t border-slate-850 pt-3">
                      <span className="text-[9px] font-mono text-amber-400 font-bold uppercase tracking-wider block">{lang === "hi" ? "सक्रिय प्रवास गलियारे / CORRIDORS" : "Active Migration Corridors"}</span>
                      
                      {[
                        { from: "Bihar", to: "Delhi NCR", active: "82k/mo" },
                        { from: "Uttar Pradesh", to: "Maharashtra", active: "114k/mo" },
                        { from: "Rajasthan", to: "Gujarat", active: "65k/mo" },
                        { from: "Odisha", to: "Telangana", active: "41k/mo" },
                        { from: "Local District Hiring", to: "Gorakhpur, Lucknow, Indore", active: "95% match" }
                      ].map((corridor, idx) => (
                        <div key={idx} className="bg-slate-950/60 p-2 rounded-lg border border-slate-850/50 flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-1.5 text-slate-200">
                            <span>{corridor.from}</span>
                            <span className="text-amber-500">→</span>
                            <span>{corridor.to}</span>
                          </div>
                          <span className="text-amber-400 font-bold text-[11px]">{corridor.active}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI INSIGHTS PANEL */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <div>
                        <h3 className="text-sm font-bold text-white font-mono">
                          {lang === "hi" ? "एआई अंतर्दृष्टि और पूर्वानुमान" : "AI Insights & Forecasting"}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {lang === "hi" ? "सत्यापित डेटा मॉडल आधारित स्वचालित भविष्यवाणियां" : "Machine-learned pattern identification from current datasets."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {[
                      { label: "Predicted next high-demand trade (भविष्यवाणी अगला उच्च मांग ट्रेड)", val: "Electrician", desc: "Based on climate & urbanization acceleration vectors." },
                      { label: "District requiring urgent workforce (त्वरित कार्यबल आवश्यकता जिला)", val: "Gorakhpur", desc: "Critical infrastructure pipelines facing seasonal deficit." },
                      { label: "Most stable worker category (सबसे स्थिर कामगार श्रेणी)", val: "Mason", desc: "Highest year-round contract retention rate (82%)." },
                      { label: "Highest wage growth category (उच्चतम मजदूरी वृद्धि श्रेणी)", val: "Welder", desc: "Specialized metal infrastructure project demand." },
                      { label: "Best financial inclusion opportunity (वित्तीय समावेशन अवसर)", val: "UPI-linked daily wage workers", desc: "Instant micropayments increase bankable record generation." },
                      { label: "Highest formalization opportunity (औपचारिकरण अवसर)", val: "Agricultural labour", desc: "Seasonal off-cycle shift matching directly with local MSMEs." }
                    ].map((insight, idx) => (
                      <div key={idx} className="bg-slate-950/40 border border-slate-850 p-3 rounded-xl space-y-1 text-left">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">{insight.label}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-400 font-bold font-mono text-sm leading-none">{insight.val}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal">{insight.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* BENTO GRID: SECTION 3.5 - REGIONAL WAGES & SKILL MAPPING */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* DYNAMIC WAGE INDEX BY REGION */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-amber-500" />
                      <div>
                        <h3 className="text-sm font-bold text-white font-mono">
                          {lang === "hi" ? "क्षेत्रवार गतिशील मजदूरी सूचकांक" : "Dynamic Wage Indexes by Region"}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {lang === "hi" ? "प्रमुख क्षेत्रों में दैनिक मजदूरी दरों का तुलनात्मक विश्लेषण" : "Comparative analysis of daily trade wages across prime regions."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    {[
                      { region: "Eastern UP Average (पूर्वी यूपी)", avg: "₹450 / day", change: "+12.4% YoY", trend: "up" },
                      { region: "NCR Delhi Average (दिल्ली एनसीआर)", avg: "₹680 / day", change: "+8.2% YoY", trend: "up" },
                      { region: "Western UP Average (पश्चिमी यूपी)", avg: "₹520 / day", change: "+9.1% YoY", trend: "up" },
                      { region: "Mumbai Met Region (मुंबई क्षेत्र)", avg: "₹710 / day", change: "+14.3% YoY", trend: "up" },
                      { region: "Bihar State Average (बिहार राज्य)", avg: "₹380 / day", change: "+6.8% YoY", trend: "up" },
                      { region: "Bundelkhand Average (बुंदेलखंड)", avg: "₹410 / day", change: "+11.2% YoY", trend: "up" }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-950/50 p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                        <div>
                          <span className="text-white font-bold block">{item.region}</span>
                          <span className="text-[10px] text-emerald-400 block mt-0.5">{item.change}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-black text-amber-500 block">{item.avg}</span>
                          <span className="text-[9px] text-slate-500 block uppercase">Real-Time Index</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SKILL-TO-WAGE MAPPING STATISTICS */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-amber-500" />
                      <div>
                        <h3 className="text-sm font-bold text-white font-mono">
                          {lang === "hi" ? "कौशल-से-मजदूरी मानचित्रण सांख्यिकी" : "Skill-to-Wage Mapping Statistics"}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {lang === "hi" ? "सत्यापित कौशल प्रमाणन के आधार पर प्रीमियम मूल्य निर्धारण" : "Premium pricing based on verified skill levels and certifications."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { trade: "Mason (राजमिस्त्री)", unverified: "₹380", verified: "₹480", premium: "+26%" },
                      { trade: "Electrician (बिजली मिस्त्री)", unverified: "₹450", verified: "₹600", premium: "+33%" },
                      { trade: "Plumber (प्लंबर)", unverified: "₹420", verified: "₹550", premium: "+31%" },
                      { trade: "Welder (वेल्डर)", unverified: "₹500", verified: "₹680", premium: "+36%" },
                      { trade: "Painter (पेंटर)", unverified: "₹400", verified: "₹500", premium: "+25%" },
                      { trade: "Helper (सहायक)", unverified: "₹300", verified: "₹350", premium: "+16%" }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-white font-bold">{item.trade}</span>
                          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">
                            {item.premium} Premium
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-slate-400">
                          <div className="flex justify-between p-1.5 bg-slate-950/40 rounded border border-slate-850">
                            <span>{lang === "hi" ? "अपुष्ट मजदूरी" : "Unverified"}:</span>
                            <span className="text-rose-400 line-through">{item.unverified}</span>
                          </div>
                          <div className="flex justify-between p-1.5 bg-slate-950/60 rounded border border-emerald-500/10">
                            <span className="text-emerald-400 font-bold">{lang === "hi" ? "पासपोर्ट सत्यापित" : "Verified Passport"}:</span>
                            <span className="text-emerald-400 font-black">{item.verified}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* BENTO GRID: SECTION 4 - Why this matters for India & Jury Summary Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Why this matters for India */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" />
                      <div>
                        <h3 className="text-sm font-bold text-white font-mono">
                          {lang === "hi" ? "भारत के लिए इसका महत्व" : "Why This Matters for India"}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {lang === "hi" ? "सकारात्मक सामाजिक और आर्थिक प्रभाव के मुख्य बिंदु" : "Strategic alignment with national informal economy formalization goals."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                    {[
                      { title: "Formalizes informal workforce", desc: "असंगठित कार्यबल को व्यवस्थित पहचान देना" },
                      { title: "Reduces exploitation", desc: "बिचौलियों और शोषण को समाप्त करना" },
                      { title: "Enables direct hiring", desc: "सीधी सुरक्षित भर्ती प्रक्रिया" },
                      { title: "Improves wage transparency", desc: "उचित मजदूरी पारदर्शिता बढ़ाना" },
                      { title: "Builds portable worker identity", desc: "पोर्टेबल राष्ट्रीय डिजिटल लेबर पासपोर्ट" },
                      { title: "Supports financial inclusion", desc: "बैंक और वित्तीय योजनाओं से जोड़ना" },
                      { title: "Helps MSMEs access verified labour", desc: "एमएसएमई को सत्यापित श्रमिक प्रदान करना" },
                      { title: "Creates district-level intelligence", desc: "जिला स्तर पर श्रम खुफिया का सृजन" }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-950/30 p-2.5 rounded-lg border border-slate-850 flex flex-col justify-between">
                        <span className="text-white font-semibold font-mono text-[11px] block">{item.title}</span>
                        <span className="text-[9px] text-slate-500 block mt-1 font-sans">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* JURY DEMO SUMMARY CARD */}
              <div className="lg:col-span-6 bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-slate-950 border border-amber-500/30 p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-mono text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl border-l border-b border-amber-500/20">
                  Jury View Mode
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                    <h3 className="text-base font-black text-white uppercase font-mono tracking-wider">
                      Vande Bharatam Jury View
                    </h3>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-950/60 p-4 rounded-xl border border-amber-500/15">
                    "LabourAdda converts India’s fragmented informal labour market into a verified, AI-assisted, trust-linked and data-driven digital labour infrastructure."
                  </p>

                  <div className="space-y-3.5 pt-2">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">{lang === "hi" ? "तीन मुख्य परिणाम / 3 Core Outcomes" : "Three Primary Demo Outcomes"}</span>
                    
                    <div className="space-y-2.5">
                      {[
                        { num: "1", hi: "श्रमिक को पोर्टेबल राष्ट्रीय डिजिटल पहचान मिलती है।", en: "Worker gets portable verified digital identity." },
                        { num: "2", hi: "ठेकेदार को सत्यापित और कुशल भर्ती विकल्प मिलते हैं।", en: "Contractor gets friction-free, verified local hiring." },
                        { num: "3", hi: "सरकार को जिला स्तर पर वास्तविक समय श्रम खुफिया प्राप्त होती है।", en: "Government receives real-time, district-level labor demand intelligence." }
                      ].map((outcome, idx) => (
                        <div key={idx} className="flex gap-3 items-start bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
                          <div className="w-5 h-5 bg-amber-500 text-slate-950 rounded-full font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            {outcome.num}
                          </div>
                          <div className="text-xs">
                            <p className="text-white font-semibold">{lang === "hi" ? outcome.hi : outcome.en}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{lang === "hi" ? outcome.en : outcome.hi}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Secure footer bar inside modal */}
          <div className="bg-slate-900 border-t border-slate-800 px-4 py-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>National Impact Infrastructure Simulation. Zero External API Dependency.</span>
            </div>
            <button
              onClick={() => {
                setShowLabourIntel(false);
                if (typeof window !== "undefined" && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                }
                setIsSpeaking(false);
                setActiveSpeechText(null);
              }}
              className="w-full sm:w-auto px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold font-mono transition cursor-pointer"
            >
              {lang === "hi" ? "डैशबोर्ड बंद करें" : "Close Dashboard View"}
            </button>
          </div>

        </div>
      )}

      {/* Speech Captions overlay */}
      {isSpeaking && activeSpeechText && (
        <div id="voice-assistant-indicator" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border-2 border-amber-500 p-4 rounded-2xl shadow-2xl max-w-lg w-[calc(100%-2rem)] flex items-center gap-4">
          <div className="flex gap-1 items-end shrink-0 h-6">
            <div className="w-1 bg-amber-500 rounded-full animate-[ping_1.2s_infinite]" style={{height: "100%"}} />
            <div className="w-1 bg-amber-400 rounded-full animate-[ping_1s_infinite_0.2s]" style={{height: "60%"}} />
            <div className="w-1 bg-amber-500 rounded-full animate-[ping_1.4s_infinite_0.4s]" style={{height: "80%"}} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] text-amber-500 font-mono tracking-widest uppercase font-bold">आवाज़ सहायता सक्रिय / Voice Assistant Active</p>
            <p className="text-xs text-white mt-1 leading-relaxed truncate-2-lines">{activeSpeechText}</p>
          </div>
          <button 
            onClick={() => {
              if (typeof window !== "undefined" && window.speechSynthesis) {
                window.speechSynthesis.cancel();
              }
              setIsSpeaking(false);
              setActiveSpeechText(null);
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-xl border border-slate-800 transition min-h-[40px]"
          >
            <VolumeX className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Digital Infrastructure footer banner */}
      <footer className="mt-20 border-t border-slate-900 bg-slate-950/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs text-slate-400 font-semibold font-mono">LabourAdda v2.0 Platform</p>
            <p className="text-[10px] text-slate-600 mt-1">National Startup Program Finalist. Engineered for direct accountability and zero-exploitation of trade labor.</p>
          </div>
          <div className="flex gap-4">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono border border-slate-800/80 px-2 py-1 rounded">
              UPI Pay compatible
            </span>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono border border-slate-800/80 px-2 py-1 rounded">
              Aadhaar KYC linked
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
