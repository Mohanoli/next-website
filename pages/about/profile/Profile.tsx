export default function Profile() {
    return (
        <section className="relative py-8 bg-white overflow-hidden">

            {/* Subtle background decorations */}
            <div className="absolute top-0 right-0 w-500px h-500px bg-amber-100/40 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-400px h-400px bg-slate-100/60 blur-3xl rounded-full translate-y-1/3 -translate-x-1/4"></div>
            <div className="absolute top-1/2 left-1/2 -ranslate-x-1/2 -translate-y-1/2 w-300px h-300px bg-amber-50/30 blur-3xl rounded-full"></div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-10">

                {/* Section Header */}
                <div className="text-center mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                        हाम्रो <span className="text-amber-600 relative">परिचय
                            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 8" fill="none">
                                <path d="M1 5.5C15 2 35 1 50 3C65 5 85 4.5 99 1.5" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h2>
                </div>

                {/* Main Content */}
                <div className="relative bg-gradient via-white to-amber-50/30 backdrop-blur-sm rounded-2xl p-6 md:p-10 lg:p-12 transition-all duration-700 ease-out">

                    {/* Decorative quote mark */}
                    <div className="absolute -top-6 -left-2 md:left-4 text-7xl md:text-8xl font-serif text-amber-200/60 select-none leading-none">"</div>

                    {/* Accent line on left */}
                    <div className="absolute left-0 top-8 bottom-8 w-3 bg-gradient from-amber-400 via-amber-300 to-transparent rounded-r-full"></div>

                    <div className="pl-7 md:pl-8">
                        <p className="text-[15px] md:text-sm leading-[1.95] text-black-900 tracking-wide text-justify font-normal nepali-fonts">
                            ग्रामिण क्षेत्रमा बसोबास गर्ने कृषि वा अन्य स-साना घरेलुस्तरका सेवा व्यवसायमा आश्रित रहि अत्यन्तै न्यून
                            आर्थिक आधारमा जीवनयापन गरिरहेका कृषकहरुबिच सामुहिक भावनाको विकास गरी उनीहरुकै इच्छा र
                            आवश्यकता अनुसारका कार्यक्रमहरुको तर्जुमा र कार्यान्वयनमा उनीहरुको आर्थिक तथा सामाजिक सामुदायिक
                            अवस्थाको विकास गराउन राजनैतिक पुर्वाग्रह रहित स्वशासित स्वावलम्बन र आत्मनिर्भर बन्ने भावनाबाट प्रेरित
                            भई स्थापना भएको <span className="font-semibold text-slate-800">साना किसान कृषि सहकारी संस्था लि. माकर, नवलपरासी</span> हो ।
                        </p>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-6">
                            <div className="h-px flex-1 bg-gradient from-transparent via-slate-200 to-transparent"></div>
                            <div className="h-px flex-1 bg-gradient from-transparent via-slate-200 to-transparent"></div>
                        </div>

                        <p className="text-[15px] md:text-sm leading-[1.95] text-slate-600 tracking-wide text-justify font-normal nepali-fonts">
                            साना किसान कृषि सहकारी संस्था लि. जब्दी हाल <span className="font-semibold text-slate-800">लालबन्दी नगरपालिका वडा नं. ४, जनकपुर अञ्चल सर्लाही जिल्लाको</span>
                            उत्तर मध्य भागमा अवस्थित रहेको छ । यस नगरपालिका को पूर्वमा इश्वरपुर नगरपालिका, पश्चिममा हरिऔन नगरपालिका,
                            उत्तरमा सिन्धुली जिल्लाको मरिन, दक्षिणमा हरिपुर नगरपालिका रहेका छन् । यस नगरपालिका मा पुरुष ३३,०३५ महिला
                            ३३,३७६ गरी जम्मा <span className="font-semibold text-slate-800">६६,४११ जनसंख्या</span> रहेको छ । यहाँ बसोबास गर्ने कूल जनसंख्या मध्ये क्षेत्री, ब्राम्हण ४५ प्रतिशत रहेका छन् ।
                            चौधरी थारु ५ प्रतिशत, दलित ७ प्रतिशत र अन्य (तामाङ्ग, मगर, कोईरी, साह, नेवार आदि) ४३ प्रतिशत रहेका छन् ।
                            विकास आयोजना हरिपुरबाट २०५१ सालमा संस्थागत विकास कार्यक्रम लागु भई सहकारी ऐन २०४८ अनुसार जिल्ला
                            सहकारी कार्यालय मलंगवामा मिति <span className="font-semibold text-slate-800">२०५२/०९/१०</span> मा संस्था दर्ता भई मिति <span className="font-semibold text-slate-800">२०५३/०३/३०</span> गते व्यवस्थापन हस्तान्तरण
                            भएको थियो । यस साना किसान कृषि सहकारी संस्था लि. जब्दी (हाल लालबन्दी नगरपालिका वडा नं. ४)
                            आफ्नै कार्यालय भवन रहेको छ ।
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}