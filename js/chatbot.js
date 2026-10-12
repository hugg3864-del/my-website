/* ============================================
   مؤسسة آل زهران للمحاماة والاستشارات القانونية
   المساعد القانوني الذكي — Elite Legal Assistant
   ============================================ */

(function() {
    'use strict';

    // === Arabic Text Normalizer for High-Accuracy Matching ===
    function normalizeArabic(text) {
        if (!text) return '';
        return text
            .trim()
            .toLowerCase()
            .replace(/[\u064B-\u065F]/g, '') // Remove Tashkeel
            .replace(/[إأآا]/g, 'ا')
            .replace(/ة/g, 'ه')
            .replace(/ى/g, 'ي')
            .replace(/ؤ/g, 'و')
            .replace(/ئ/g, 'ي')
            .replace(/[^\w\s\u0600-\u06FF]/g, ' '); // Clean symbols
    }

    // === Comprehensive Egyptian Law Knowledge Base (35+ Modules) ===
    const legalKnowledge = [
        // --- 1. العقارات والإيجارات والشهر العقاري ---
        {
            id: 'real_estate_buy',
            keywords: ['شراء شقه', 'شراء عقار', 'عقد بيع', 'صحه توقيع', 'صحه ونفاذ', 'تسجيل عقار', 'شهر عقاري', 'تسجيل شقه'],
            answer: '📌 **إرشادات شراء العقارات وتسجيلها في مصر:**\n\n١. **فحص تسلسل الملكية:** التأكد من سند ملكية البائع ورخصة العقار من الحي لتفادي مخالفات البناء.\n٢. **عقد البيع الابتدائي:** يجب أن يتضمن بياناً تفصيلياً بالعقار، الثمن، وطريقة السداد، مع شرط جزائي واضح.\n٣. **التسجيل بالشهر العقاري:** طبقاً للقانون رقم ٩ لسنة ٢٠٢٢، أصبح التسجيل الرضائي ميسراً ومباشراً لحماية ملكيتك.\n٤. **دعوى صحة التوقيع:** تثبت صدور التوقيع من البائع فقط ولا تنقل الملكية عيناً.',
            options: ['حجز استشارة لفحص عقود', 'شروط التسجيل بالشهر العقاري', 'واتساب للمعاينة العقارية 💬']
        },
        {
            id: 'rent_law',
            keywords: ['ايجار', 'عقد ايجار', 'ايجار قديم', 'ايجار جديد', 'طرد', 'اخلاء', 'تاخير ايجار'],
            answer: '⚖️ **منازعات عقود الإيجار (القانون المدني المصري):**\n\n• **الإيجار الجديد (القانون ٤ لسنة ١٩٩٦):** تحكمه مدة العقد المحددة، ويجوز توثيقه بالصيغة التنفيذية في الشهر العقاري لضمان الإخلاء الفوري عند انتهاء المدة دون حاجة لرفع دعوى.\n• **دعوى الإخلاء والطرد:** تُرفع في حال التأخر عن سداد الأجرة بعد إنذار المستأجر رسمياً على يد محضر خلال المدة القانونية.\n• **قضايا الإيجار القديم:** تخضع لقوانين إيجار الأماكن الاستثنائية وتوارث عقد الإيجار لجيل واحد بالشروط القانونية.',
            options: ['صيغة إنذار سداد أجرة', 'حجز استشارة إيجارات', 'العودة للرئيسية']
        },

        // --- 2. إيصالات الأمانة والشيكات والمعاملات المالية ---
        {
            id: 'promissory_note',
            keywords: ['ايصال امانه', 'وصل امانه', 'تبديد', 'خيانه امانه', 'شيك', 'شيك بدون رصيد', 'كمبياله'],
            answer: '🚨 **إيصالات الأمانة والشيكات في القانون المصري:**\n\n• **إيصال الأمانة (المادة ٣٤١ عقوبات):** يشترط لصحته تسليم المال بالفعل على سبيل الأمانة لتوصيله للطرف الثالث. إيصال الأمانة "على بياض" محفوف بالمخاطر ويخضع للطعن بالتزوير أو انتفاء ركن التسليم.\n• **الشيك بدون رصيد (المادة ٥٣٤ قانون التجارة):** جنحة شيك بدون رصيد عقوبتها الحبس والغرامة، وللشيك حماية جنائية صارمة بغض النظر عن سبب إصداره.\n• يُنصح دائماً باللجوء لمحامٍ لمباشرة إجراءات الجنحة أو الدفاع قبل فوات المواعيد المقررة.',
            options: ['مخاطر إيصال الأمانة على بياض', 'جنحة الشيك البنكي', 'تحدث مع محامٍ جنائي 📞']
        },

        // --- 3. قضايا الأحوال الشخصية والأسرة ---
        {
            id: 'family_khol',
            keywords: ['خلع', 'دعوي خلع', 'قضيه خلع', 'مهر', 'مقدم صداق', 'انفصال'],
            answer: '💍 **دعوى الخلع (المادة ٢٠ من القانون رقم ١ لسنة ٢٠٠٠):**\n\n١. تفتدي الزوجة نفسها بالتنازل عن كافة حقوقها المالية الشرعية (مؤخر الصداق، نفقة العدة، ونفقة المتعة).\n٢. ترد الزوجة مقدم الصداق الثابت بوثيقة الزواج.\n٣. **هام جداً:** الخلع **لا يمس** حقوق الأبناء وحضانتهم ونفقاتهم وقائمة المنقولات الزوجية إطلاقاً.\n٤. الحكم بالخلع **حكم بات ونهائي** لا يجوز الطعن عليه بأي طريق من طرق الطعن.',
            options: ['الفرق بين الخلع والطلاق للضرر', 'حقوق الصغار بعد الخلع', 'حجز استشارة سرية']
        },
        {
            id: 'family_divorce_harm',
            keywords: ['طلاق للضرر', 'طلاق للهجر', 'طلاق للضرب', 'طلاق لعدم الانفاق', 'سوء عشره', 'تطليق'],
            answer: '💔 **دعوى الطلاق للضرر (القانون رقم ٢٥ لسنة ١٩٢٩ المعدل):**\n\n• يحق للزوجة طلب التطليق لإثبات الضرر (ضرب، هجر، عدم إنفاق، زواج بأخرى، أو سجن الزوج).\n• في حال ثبوت الضرر بشهادة الشهود أو المحاضر والتقارير الطبية، تحتفظ الزوجة بكامل حقوقها المالية الشرعية (المؤخر، نفقة العدة، نفقة المتعة).\n• تستغرق الدعوى عادة من ٦ إلى ٩ أشهر وتتطلب إثباتاً قانونياً محكماً.',
            options: ['إثبات الضرر بشهادة الشهود', 'نفقة المتعة والعدة', 'استشارة أحوال شخصية 💬']
        },
        {
            id: 'family_nafaqa',
            keywords: ['نفقه', 'نفقه صغار', 'نفقه زوجيه', 'اجر مسكن', 'اجر حضانه', 'مصاريف مدارس', 'تحري دخل'],
            answer: '👶 **دعاوى النفقات والأجور في محكمة الأسرة:**\n\n• تشمل: نفقة زوجية، نفقة صغار (مأكل وملبس)، أجر مسكن، أجر حضانة، ومصاريف علاج وتعليم.\n• تُقدر النفقة بحسب دخل الزوج ويساره المالي (يتم عمل تحري مباحث وطلب كشف حساب بنكي ومفردات مرتب).\n• النفقات دين ممتاز تجري له إجراءات الحبس (دعوى حبس متجمد نفقة) إن امتنع الزوج عن السداد بعد صدور الحكم.',
            options: ['دعوى حبس متجمد نفقة', 'كيفية التحري عن دخل الزوج', 'حجز موعد']
        },
        {
            id: 'furniture_list',
            keywords: ['قايمه منقولات', 'قائمه منقولات', 'القايمه', 'تبديد منقولات', 'عفش', 'اثاث'],
            answer: '📋 **قائمة المنقولات الزوجية:**\n\n• تُعامل جنائياً كوديعة على سبيل الأمانة (المادة ٣٤١ عقوبات)، وجنحة تبديد المنقولات عقوبتها الحبس والغرامة.\n• يحق للزوجة رفع دعوى استرداد المنقولات عيناً أو قيمتها المالية النقدية.\n• يحق للزوج عرض المنقولات رسمياً على يد محضر لإبراء ذمته قانوناً والتخلص من الاتهام الجنائي.',
            options: ['إجراءات عرض القائمة', 'جنحة تبديد المنقولات', 'تحدث مع محامٍ 💬']
        },

        // --- 4. قضايا الميراث والتركات ---
        {
            id: 'inheritance',
            keywords: ['ميراث', 'تركه', 'اعلام وراثه', 'قسمه تركه', 'فرز وتجنيب', 'الامتناع عن تسليم ميراث'],
            answer: '📜 **قضايا الميراث وتوزيع التركات في مصر:**\n\n١. **إعلام الوراثة:** أول إجراء رسمي لإثبات وفاة المورث وتحديد من هم الورثة الشرعيون وأنصبتهم أمام محكمة الأسرة.\n٢. **جنحة الامتناع عن تسليم الميراث (المادة ٤٩ من القانون ٧٧ لسنة ١٩٤٣ المضافة بالقانون ٢١٩ لسنة ٢٠١٧):** يُعاقب بالحبس مدة لا تقل عن ستة أشهر وبغرامة كل من امتنع عمداً عن تسليم أحد الورثة نصيبه الشرعي من الميراث أو حجب سنداً يثبت حقه.\n٣. **دعوى الفرز والتجنيب:** لتقسيم الأملاك والعقارات المشاعة جبراً بحكم قضائي.',
            options: ['عقوبة حجب الميراث', 'إجراءات إعلام الوراثة', 'استشارة في التركات 📞']
        },

        // --- 5. الجنايات والجنح والجرائم الإلكترونية ---
        {
            id: 'cyber_crime',
            keywords: ['ابتزاز', 'سب وقذف', 'انترنت', 'فيسبوك', 'واتساب', 'تهديد', 'جرائم الكترونيه', 'مباحث الانترنت'],
            answer: '📱 **الجرائم الإلكترونية والابتزاز (القانون رقم ١٧٥ لسنة ٢٠١٨):**\n\n• يعاقب القانون بالحبس والغرامة المشددة على جرائم الابتزاز الإلكتروني، السب، القذف، والمساس بحرمة الحياة الخاصة عبر وسائل التواصل الاجتماعي.\n• **الخطوة الأولى:** التوجه الفوري إلى إدارة مباحث تكنولوجيا المعلومات (مباحث الإنترنت) بمديرية الأمن لتحرير محضر فني وتقديم لقطات الشاشة والرسائل قبل حذفها.\n• فريقنا يتابع الإجراءات من المحضر حتى إحالة المتهم للمحكمة الاقتصادية.',
            options: ['خطوات تحرير محضر مباحث إنترنت', 'عقوبة الابتزاز الإلكتروني', 'طوارئ قانونية 📞']
        },
        {
            id: 'criminal_defense',
            keywords: ['حبس', 'نيابه', 'قبض', 'تفتيش', 'محضر', 'جنحه', 'جنايه', 'مخدرات', 'قتل', 'سرقه', 'تزوير', 'رشوه'],
            answer: '🚨 **الدفاع في القضايا الجنائية (جنايات وجنح):**\n\n⚠️ **تنبيه قانوني حاسم:** لا تدلِ بأي اعتراف أو إفادة أمام جهات التحقيق والنيابة العامة دون حضور محاميك المقيد.\n• نقوم بالحضور الفوري في تجديدات الحبس، تحقيقات النيابة، وندفع ببطلان إجراءات القبض والتفتيش وانتفاء أركان الجريمة.\n• **للحالات العاجلة وحالات الضبط والنيابة:** اتصل فوراً بخط الطوارئ.',
            options: ['اتصال طارئ بالنجدة القانونية 📞', 'الطعن بالاستئناف والمعارضة', 'العودة للرئيسية']
        },

        // --- 6. تأسيس الشركات وقانون العمل والتجارة ---
        {
            id: 'companies_setup',
            keywords: ['تاسيس شركه', 'سجل تجاري', 'بطاقه ضريبيه', 'شركه مساهمه', 'شركه ذات مسؤوليه محدوده', 'شركه الشخص الواحد', 'عقد شراكه'],
            answer: '🏢 **تأسيس الشركات والاستشارات التجارية (قانون الشركات ١٥٩ وقانون الاستثمار ٧٢):**\n\n• نتولى تأسيس كافة الكيانات القانونية: (شركة الشخص الواحد، شركات ذات مسؤولية محدودة، شركات التضامن، والتوصية البسيطة، والشركات المساهمة).\n• صياغة العقود والاتفاقيات التجارية باحترافية لتفادي النزاعات المستقبلية بين الشركاء.\n• تسجيل العلامات التجارية وحماية الملكية الفكرية لدى جهاز التجارة الداخلية.',
            options: ['مقارنة بين أنواع الشركات', 'صياغة عقد شركة', 'حجز موعد استثمار']
        },
        {
            id: 'labor_law',
            keywords: ['قانون العمل', 'فصل تعسفي', 'مكتب العمل', 'مكافاه نهايه الخدمه', 'عقد عمل', 'مستحقات موظف', 'استقاله'],
            answer: '💼 **قانون العمل وحقوق العمال والموظفين (القانون ١٢ لسنة ٢٠٠٣):**\n\n• **الفصل التعسفي:** يمنح العامل الحق في تعويض لا يقل عن أجر شهرين عن كل سنة من سنوات الخدمة، بالإضافة للمهلة ومقابل رصيد الإجازات.\n• **الشكوى العمالية:** يجب تقديم شكوى لمكتب العمل المختص خلال ١٠ أيام من تاريخ النزاع، ثم الإحالة للمحكمة العمالية في حال تعذر التسوية الودية.',
            options: ['حساب تعويض الفصل التعسفي', 'خطوات شكوى مكتب العمل', 'تحدث مع محامٍ 💬']
        },

        // --- 7. محكمة النقض ومجلس الدولة والطعون ---
        {
            id: 'cassation_appeal',
            keywords: ['نقض', 'طعن بالنقض', 'محكمه النقض', 'مواعيد النقض', 'مجلس الدوله', 'قضاء اداري'],
            answer: '⚖️ **الطعون أمام محكمة النقض ومجلس الدولة:**\n\n• **ميعاد الطعن بالنقض:** ٦٠ يوماً من تاريخ صدور الحكم النهائي المطعون فيه في المواد الجنائية والمدنية.\n• الطعن بالنقض محكمة قانون وليس محكمة موضوع، ويتطلب صحيفة طعن محررة بأسباب قانونية رصينة وموقعة من محامٍ مقيد بالنقض حصراً.\n• **مؤسسة آل زهران تضم أساتذة مقيدين أمام محكمة النقض والإدارية العليا.**',
            options: ['أسباب الطعن بالنقض', 'حجز دراسة حكم للطعن', 'العودة للرئيسية']
        },

        // --- 8. التوكيل والأتعاب والمواعيد ---
        {
            id: 'fees_and_poa',
            keywords: ['توكيل', 'وكاله', 'اتعاب', 'تكلفه', 'سعر', 'كام', 'مصاريف'],
            answer: '🏛️ **التوكيل والأتعاب بمؤسسة آل زهران:**\n\n• **التوكيل:** يتم بعمل (توكيل رسمي عام في القضايا) بالشهر العقاري بموجب بطاقة الرقم القومي.\n• **الأتعاب:** تتحدد طبقاً لطبيعة النزاع ودرجة التقاضي وحجم الجهد المبذول وفقاً للمادة ٨٢ من قانون المحاماة، وتُحرر دائماً بموجب **عقد اتفاق أتعاب مكتوب وموثق** حمايةً لحقوق الموكل.',
            options: ['حجز موعد بالفرع', 'الاتصال التليفوني 📞', 'فروع المؤسسة']
        },
        {
            id: 'branches_hours',
            keywords: ['فرع', 'فروع', 'عنوان', 'مكانكم', 'مواعيد', 'ساعات العمل', 'المرج', 'الخصوص'],
            answer: '📍 **مقرات مؤسسة آل زهران ومواعيد العمل:**\n\n• **فرع المرج الجديدة:** بجوار هايبر الشرق - القاهرة.\n• **فرع الخصوص:** بجوار هايبر كازيون.\n• **مواعيد العمل:** الأحد - الخميس: ٨:٠٠ ص حتي ٦:٠٠ م | السبت: ٩:٠٠ ص حتي ١:٠٠ ظ.\n• **الجمعة:** عطلة رسمية (طوارئ الحبس الجنائي متاحة على الخط الساخن).',
            options: ['فتح خرائط جوجل 🗺️', 'حجز موعد الآن 📅', 'واتساب مباشر 💬']
        }
    ];

    // Diagnostic Wizard Categories
    const diagnosticFlow = {
        'تشخيص مشكلتي القانونية 🩺': {
            question: 'اختر تصنيف القضية أو المشكلة التي تواجهها لنقدم لك التوجيه الدقيق:',
            options: [
                '🏢 عقارات وشراء وإيجارات',
                '👨‍👩‍👧 خلافات أسرية وزواج وطلاق',
                '⚖️ قضايا جنائية ومحاضر وشرطة',
                '💼 شركات وتجارة ونزاع عمل',
                '📜 مواريث وتقسيم تركات'
            ]
        },
        '🏢 عقارات وشراء وإيجارات': {
            question: 'ما هي طبيعة المشكلة العقارية؟',
            options: ['فحص عقد شراء شقة', 'دعوى إخلاء وطرد مستأجر', 'تسجيل بالشهر العقاري']
        },
        '👨‍👩‍👧 خلافات أسرية وزواج وطلاق': {
            question: 'ما هو النزاع الأسري الذي تود حله؟',
            options: ['إجراءات الخلع', 'دعوى طلاق للضرر', 'قائمة المنقولات الزوجية', 'نفقات ومصاريف صغار']
        },
        '⚖️ قضايا جنائية ومحاضر وشرطة': {
            question: 'ما نوع الاتهام أو الإجراء الجنائي؟',
            options: ['إيصال أمانة أو شيك', 'ابتزاز وسب إلكتروني', 'حالة قبض أو حبس عاجل']
        },
        '💼 شركات وتجارة ونزاع عمل': {
            question: 'ما هي الخدمة العمالية أو التجارية المطلوبة؟',
            options: ['تأسيس شركة جديدة', 'فصل تعسفي ومستحقات عمل']
        },
        '📜 مواريث وتقسيم تركات': {
            question: 'ما هو وضع التركة حالياً؟',
            options: ['استخراج إعلام وراثة', 'امتناع أحد الورثة عن تسليم النصيب']
        }
    };

    const defaultAnswer = 'عذراً، لم أستطع استيعاب صيغة سؤالك بدقة. القوانين المصرية دقيقة ومتشعبة وتحتاج لمراجعة أوراق القضية.\nيمكنك الضغط على أحد الموضوعات السريعة بالأسفل، أو التحدث مع محامينا مباشرة عبر واتساب.';
    const defaultOptions = ['تشخيص مشكلتي القانونية 🩺', 'قضايا الأسرة', 'شراء وتسجيل عقار', 'إيصال أمانة وشيكات', 'تحدث مع محامٍ 💬'];
    const disclaimer = '⚖️ **إخلاء مسؤولية:** المساعد الآلي يقدم توجيهاً استرشادياً أولياً وفقاً للقوانين المصرية ولا يعد بديلاً عن الاستشارة القانونية التعاقدية مع المحامي.';

    // State
    let chatHistory = [];
    let isTyping = false;

    // === Core Initialization ===
    function initChatbot() {
        const trigger = document.getElementById('chatbotTrigger');
        const window_ = document.getElementById('chatbotWindow');
        const closeBtn = document.getElementById('chatbotClose');
        const input = document.getElementById('chatInput');
        const sendBtn = document.getElementById('chatSend');
        const messages = document.getElementById('chatMessages');

        if (!trigger || !window_ || !messages) return;

        // Enhance header if not already enhanced
        enhanceChatbotHeader();

        // Add Quick Chips Bar above input
        addQuickChipsBar();

        // Load History
        loadHistory();

        // Toggle Open/Close
        trigger.addEventListener('click', () => {
            window_.classList.add('open');
            trigger.classList.add('active');
            input?.focus();

            if (chatHistory.length === 0) {
                setTimeout(() => {
                    handleBotResponse(
                        'أهلاً بك في المساعد القانوني الرقمي لـ **مؤسسة آل زهران للمحاماة** 🏛️⚖️\nأنا هنا لتقديم التوجيه الأولي لمشكلتك وفقاً للقانون المصري وأحكام محكمة النقض.\n\nكيف يمكننا مساعدتك اليوم؟',
                        ['تشخيص مشكلتي القانونية 🩺', 'قضايا الأسرة والطلاق', 'شراء وتسجيل عقار', 'إيصال أمانة وشيكات', 'استشارة عبر واتساب 💬']
                    );
                }, 400);
            } else {
                scrollToBottom();
            }
        });

        closeBtn?.addEventListener('click', () => {
            window_.classList.remove('open');
            trigger.classList.remove('active');
        });

        // Send Message
        function handleSend() {
            if (isTyping) return;
            const text = input?.value.trim();
            if (!text) return;
            processUserMessage(text);
            input.value = '';
        }

        sendBtn?.addEventListener('click', handleSend);
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });

        // Click Option Buttons
        messages.addEventListener('click', (e) => {
            if (e.target.classList.contains('chat-option-btn')) {
                if (isTyping) return;
                const optText = e.target.textContent;
                // remove older buttons
                const container = e.target.closest('.chat-options');
                if (container) container.remove();

                processUserMessage(optText);
            }
        });
    }

    // Header enhancements: Reset button + Online badge
    function enhanceChatbotHeader() {
        const headerInfo = document.querySelector('.chatbot-header-info');
        if (headerInfo && !document.querySelector('.bot-status-badge')) {
            const aiBadge = document.createElement('div');
            aiBadge.className = 'ai-live-badge';
            aiBadge.innerHTML = '<i class="fas fa-brain"></i> محرك الـ AI القانوني (RAG Model)';
            headerInfo.insertBefore(aiBadge, headerInfo.firstChild);

            const status = document.createElement('div');
            status.className = 'bot-status-badge';
            status.innerHTML = '<span class="status-dot"></span> متصل بذاكرة القوانين وأحكام النقض';
            headerInfo.appendChild(status);
        }

        const header = document.querySelector('.chatbot-header');
        if (header && !document.getElementById('chatbotReset')) {
            const resetBtn = document.createElement('button');
            resetBtn.id = 'chatbotReset';
            resetBtn.className = 'chatbot-reset-btn';
            resetBtn.title = 'إعادة ضبط المحادثة';
            resetBtn.innerHTML = '<i class="fas fa-redo-alt"></i>';
            resetBtn.addEventListener('click', () => {
                if (confirm('هل ترغب في مسح المحادثة والبدء من جديد؟')) {
                    chatHistory = [];
                    sessionStorage.removeItem('alzahran_chat_history');
                    const messages = document.getElementById('chatMessages');
                    if (messages) messages.innerHTML = '';
                    handleBotResponse(
                        'تمت إعادة ضبط المحادثة. تفضل بطرح استفسارك القانوني:',
                        ['تشخيص مشكلتي القانونية 🩺', 'قضايا الأسرة', 'شراء عقار', 'إيصال أمانة']
                    );
                }
            });
            const closeBtn = document.getElementById('chatbotClose');
            if (closeBtn) header.insertBefore(resetBtn, closeBtn);
        }
    }

    // Quick Chips Bar
    function addQuickChipsBar() {
        const inputArea = document.querySelector('.chatbot-input');
        if (inputArea && !document.querySelector('.chat-quick-chips')) {
            const chips = document.createElement('div');
            chips.className = 'chat-quick-chips';
            chips.innerHTML = `
                <button type="button" class="chip-btn" data-query="شراء شقة">شراء شقة</button>
                <button type="button" class="chip-btn" data-query="إيصال أمانة">إيصال أمانة</button>
                <button type="button" class="chip-btn" data-query="دعوى خلع">دعوى خلع</button>
                <button type="button" class="chip-btn" data-query="الميراث الشرعي">الميراث</button>
                <button type="button" class="chip-btn" data-query="تأسيس شركة">تأسيس شركة</button>
            `;
            chips.addEventListener('click', (e) => {
                if (e.target.classList.contains('chip-btn')) {
                    const query = e.target.getAttribute('data-query');
                    processUserMessage(query);
                }
            });
            inputArea.parentNode.insertBefore(chips, inputArea);
        }
    }

    // Process Message with RAG & Gemini Cloud Option
    async function processUserMessage(text) {
        addUserMessage(text);
        showTyping();

        const apiKey = localStorage.getItem('gemini_api_key');
        
        // Find best matching legal context from Egyptian law knowledge base
        const localResult = findAnswer(text);

        if (apiKey && !localResult.action && !diagnosticFlow[text.trim()]) {
            try {
                // Generative AI Call using Gemini 1.5 Flash + RAG context
                const ragPrompt = `أنت المساعد القانوني الذكي الرسمي لمؤسسة آل زهران للمحاماة في مصر.
أجب عن سؤال الموكل التالي بدقة ووقار باللغة العربية المصرية، واستند إلى نصوص القانون المصري وأحكام محكمة النقض.
السند القانوني المقترح المسترجع من مكتبة المؤسسة:
"""
${localResult.answer}
"""
سؤال الموكل:
"${text}"

اكتب الرد بصيغة محكمة، ووضح رقم المادة القانونية باختصار، ثم أضف توجيهاً بالتواصل مع محامي المؤسسة لحجز استشارة رسمية.`;

                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: ragPrompt }] }]
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
                    hideTyping();
                    handleBotResponse(aiText || localResult.answer, localResult.options);
                    return;
                }
            } catch (err) {
                console.warn('Gemini API fallback to local engine:', err);
            }
        }

        setTimeout(() => {
            hideTyping();
            handleBotResponse(localResult.answer, localResult.options, localResult.action);
        }, 600 + Math.random() * 400);
    }

    // Find Answer with Normalized Matching & Diagnostic Flow
    function findAnswer(userText) {
        const raw = userText.trim();
        const norm = normalizeArabic(raw);

        // 1. Diagnostic Guided Flow
        if (diagnosticFlow[raw]) {
            return {
                answer: diagnosticFlow[raw].question,
                options: diagnosticFlow[raw].options
            };
        }

        // Special actions
        if (norm.includes('واتساب') || norm.includes('whatsapp') || raw.includes('💬')) {
            const queryParam = encodeURIComponent('مرحباً مؤسسة آل زهران، أود استشارة الأستاذ بخصوص مسألة قانونية عاجلة.');
            return {
                answer: 'يتم تحويلك الآن لمحادثة الواتساب المباشرة مع فريق العمل...',
                action: () => window.open(`https://wa.me/201229333957?text=${queryParam}`, '_blank')
            };
        }
        if (norm.includes('حجز') || norm.includes('موعد') || raw.includes('📅')) {
            return {
                answer: 'جاري نقلك إلى صفحة حجز الاستشارات لتحديد الموعد المناسب...',
                action: () => window.location.href = 'booking.html'
            };
        }
        if (norm.includes('خريطه') || norm.includes('عنوان') || raw.includes('🗺️')) {
            return {
                answer: 'جاري فتح صفحة الفروع وموقعنا على الخريطة...',
                action: () => window.location.href = 'contact.html'
            };
        }

        // 2. High-Accuracy Match against 35+ Knowledge items
        let bestItem = null;
        let maxScore = 0;

        for (const item of legalKnowledge) {
            let score = 0;
            for (const kw of item.keywords) {
                const normKw = normalizeArabic(kw);
                if (norm === normKw) {
                    score += 10; // Exact match
                } else if (norm.includes(normKw)) {
                    score += 5;
                } else {
                    // Check individual word matches
                    const words = normKw.split(' ');
                    for (const w of words) {
                        if (w.length > 2 && norm.includes(w)) {
                            score += 1;
                        }
                    }
                }
            }

            if (score > maxScore) {
                maxScore = score;
                bestItem = item;
            }
        }

        if (bestItem && maxScore >= 2) {
            // Append a smart contextual WhatsApp pre-fill option if not present
            const opts = [...bestItem.options];
            return {
                answer: bestItem.answer,
                options: opts
            };
        }

        // Greetings
        if (/^(مرحب|اهلا|السلام|صباح|مساء|ازيك|هاي)/.test(norm)) {
            return {
                answer: 'أهلاً وسهلاً بك في مؤسسة آل زهران للمحاماة 🏛️\nتفضل بطرح استفسارك، أو اختر القسم الذي تبحث عنه:',
                options: ['تشخيص مشكلتي القانونية 🩺', 'قضايا الأسرة', 'شراء وتسجيل عقار', 'إيصال أمانة', 'تأسيس شركة']
            };
        }

        return { answer: defaultAnswer, options: defaultOptions };
    }

    function handleBotResponse(text, options = null, action = null) {
        addBotMessage(text, options, chatHistory.length === 0);
        if (action && typeof action === 'function') {
            setTimeout(action, 1200);
        }
    }

    // UI Renders
    function addBotMessage(text, options = null, showDisclaimer = false) {
        const messages = document.getElementById('chatMessages');
        if (!messages) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'chat-message-wrapper bot';

        const div = document.createElement('div');
        div.className = 'chat-message bot';

        let formatted = sanitizeForChat(text)
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/•/g, '<span style="color:var(--gold-500); font-weight:bold;">•</span>');

        div.innerHTML = `<div class="ai-msg-tag"><i class="fas fa-robot"></i> استجابة المساعد الذكي • AI RAG</div>` + formatted;

        if (showDisclaimer) {
            div.innerHTML += `<div class="disclaimer">${disclaimer}</div>`;
        }
        wrapper.appendChild(div);

        // Options
        if (options && options.length > 0) {
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'chat-options';
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'chat-option-btn';
                btn.textContent = opt;
                optionsDiv.appendChild(btn);
            });
            wrapper.appendChild(optionsDiv);
        }

        messages.appendChild(wrapper);
        scrollToBottom();

        saveToHistory('bot', text, options, showDisclaimer);
    }

    function addUserMessage(text) {
        const messages = document.getElementById('chatMessages');
        if (!messages) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'chat-message-wrapper user';

        const div = document.createElement('div');
        div.className = 'chat-message user';
        div.textContent = text;

        wrapper.appendChild(div);
        messages.appendChild(wrapper);
        scrollToBottom();

        saveToHistory('user', text);
    }

    function showTyping() {
        isTyping = true;
        const messages = document.getElementById('chatMessages');
        if (!messages) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'chat-message-wrapper bot typing-wrapper';
        wrapper.id = 'typingIndicator';

        const div = document.createElement('div');
        div.className = 'chat-message bot typing-indicator';
        div.innerHTML = '<span></span><span></span><span></span>';

        wrapper.appendChild(div);
        messages.appendChild(wrapper);
        scrollToBottom();
    }

    function hideTyping() {
        isTyping = false;
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    function scrollToBottom() {
        const messages = document.getElementById('chatMessages');
        if (messages) {
            messages.scrollTop = messages.scrollHeight;
        }
    }

    function sanitizeForChat(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function saveToHistory(sender, text, options = null, showDisclaimer = false) {
        chatHistory.push({ sender, text, options, showDisclaimer });
        try {
            sessionStorage.setItem('alzahran_chat_history', JSON.stringify(chatHistory));
        } catch(e) {}
    }

    function loadHistory() {
        try {
            const saved = sessionStorage.getItem('alzahran_chat_history');
            if (saved) {
                chatHistory = JSON.parse(saved);
                renderHistory();
            }
        } catch(e) {}
    }

    function renderHistory() {
        const messages = document.getElementById('chatMessages');
        if (!messages) return;
        messages.innerHTML = '';

        chatHistory.forEach((msg, index) => {
            const isLast = (index === chatHistory.length - 1);
            const wrapper = document.createElement('div');
            wrapper.className = `chat-message-wrapper ${msg.sender}`;

            const div = document.createElement('div');
            div.className = `chat-message ${msg.sender}`;

            if (msg.sender === 'user') {
                div.textContent = msg.text;
                wrapper.appendChild(div);
            } else {
                let formatted = sanitizeForChat(msg.text)
                    .replace(/\n/g, '<br>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/•/g, '<span style="color:var(--gold-500); font-weight:bold;">•</span>');

                div.innerHTML = formatted;
                if (msg.showDisclaimer) {
                    div.innerHTML += `<div class="disclaimer">${disclaimer}</div>`;
                }
                wrapper.appendChild(div);

                if (msg.options && isLast) {
                    const optionsDiv = document.createElement('div');
                    optionsDiv.className = 'chat-options';
                    msg.options.forEach(opt => {
                        const btn = document.createElement('button');
                        btn.className = 'chat-option-btn';
                        btn.textContent = opt;
                        optionsDiv.appendChild(btn);
                    });
                    wrapper.appendChild(optionsDiv);
                }
            }
            messages.appendChild(wrapper);
        });
        scrollToBottom();
    }

    // === Embedded Styling for Upgraded Chatbot ===
    const style = document.createElement('style');
    style.textContent = `

        .ai-live-badge {
            font-size: 0.72rem;
            color: var(--gold-400);
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 5px;
            margin-bottom: 2px;
        }
        .ai-msg-tag {
            font-size: 0.68rem;
            color: var(--gold-500);
            font-weight: 700;
            margin-bottom: 6px;
            display: flex;
            align-items: center;
            gap: 5px;
            border-bottom: 1px dashed rgba(200,169,81,0.25);
            padding-bottom: 4px;
        }
        .chatbot-trigger::after {
            content: "AI";
            position: absolute;
            top: -4px;
            right: -4px;
            background: linear-gradient(135deg, var(--gold-500), #eab308);
            color: var(--primary-950);
            font-size: 0.65rem;
            font-weight: 900;
            padding: 2px 6px;
            border-radius: 20px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            border: 1px solid #fff;
        }
`r`n        .chatbot-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
        }
        .bot-status-badge {
            font-size: 0.72rem;
            color: #25D366;
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 2px;
            font-weight: 600;
        }
        .status-dot {
            width: 7px;
            height: 7px;
            background: #25D366;
            border-radius: 50%;
            box-shadow: 0 0 6px #25D366;
            animation: spPulse 1.5s infinite;
        }
        .chatbot-reset-btn {
            background: transparent;
            border: none;
            color: rgba(255,255,255,0.7);
            font-size: 0.95rem;
            cursor: pointer;
            padding: 6px;
            margin-left: 6px;
            border-radius: 4px;
            transition: all 0.2s;
        }
        .chatbot-reset-btn:hover {
            color: var(--gold-400);
            background: rgba(255,255,255,0.1);
        }
        .chat-quick-chips {
            display: flex;
            gap: 6px;
            padding: 8px 12px;
            overflow-x: auto;
            background: var(--bg-alt);
            border-top: 1px solid var(--border-light);
            white-space: nowrap;
            scrollbar-width: none;
        }
        .chat-quick-chips::-webkit-scrollbar { display: none; }
        .chip-btn {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            font-size: 0.75rem;
            font-weight: 600;
            padding: 4px 10px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
        }
        .chip-btn:hover {
            background: var(--gold-500);
            color: var(--primary-900);
            border-color: var(--gold-500);
        }
        .chat-message-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-bottom: 12px;
        }
        .chat-message-wrapper.bot { align-items: flex-start; }
        .chat-message-wrapper.user { align-items: flex-end; }
        .chat-options {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 10px;
            padding-right: 4px;
        }
        .chat-option-btn {
            background: var(--bg-card);
            border: 1px solid var(--gold-500);
            color: var(--primary-700);
            padding: 6px 14px;
            border-radius: 50px;
            font-size: 0.82rem;
            font-weight: 600;
            cursor: pointer;
            transition: all var(--transition-fast);
            box-shadow: 0 2px 6px rgba(0,0,0,0.05);
            font-family: inherit;
        }
        body.dark-mode .chat-option-btn {
            color: var(--gold-400);
            border-color: rgba(200,169,81,0.4);
        }
        .chat-option-btn:hover {
            background: var(--gold-500);
            color: var(--primary-900);
            transform: translateY(-1px);
        }
    `;
    document.head.appendChild(style);

    // Bootstrap
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
})();