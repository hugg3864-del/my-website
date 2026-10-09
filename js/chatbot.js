/* ============================================
   مؤسسة آل زهران — Legal Chatbot
   المساعد القانوني الذكي
   ============================================ */

(function() {
    'use strict';

    // === Legal Knowledge Base (Egyptian Law) ===
    const legalKnowledge = [
        {
            keywords: ['توكيل', 'وكالة', 'اوكل', 'أوكل', 'توكل'],
            answer: 'لتوكيل محامٍ في مصر، يجب:\n\n١. الاتفاق مع المحامي على نطاق العمل والأتعاب (عقد أتعاب)\n٢. التوجه لمكتب التوثيق (الشهر العقاري) لعمل توكيل رسمي عام في القضايا\n٣. المستندات المطلوبة: بطاقة الرقم القومي سارية\n\nيمكنك حجز استشارة مع مكتبنا لمساعدتك في الإجراءات.',
            category: 'إجراءات'
        },
        {
            keywords: ['أتعاب', 'اتعاب', 'تكلفة', 'سعر', 'كام', 'بكام', 'مصاريف', 'رسوم'],
            answer: 'تتحدد أتعاب المحاماة وفقاً للمادة ٨٢ من قانون المحاماة رقم ١٧ لسنة ١٩٨٣:\n\n• يتم الاتفاق عليها في عقد مكتوب بين المحامي والموكل\n• لا يجوز أن تتجاوز الأتعاب المشروطة بالكسب ٢٠٪ من قيمة ما حققه المحامي\n• الرسوم القضائية تختلف حسب نوع الدعوى وقيمتها\n\nللحصول على تقدير دقيق، يُرجى حجز استشارة أولية.',
            category: 'أتعاب'
        },
        {
            keywords: ['طلاق', 'خلع', 'انفصال'],
            answer: 'في قانون الأحوال الشخصية المصري:\n\n• **الطلاق**: حق الزوج شرعاً، ويمكن للزوجة طلب التطليق قضائياً للضرر\n• **الخلع**: حق الزوجة (المادة ٢٠ من القانون ١ لسنة ٢٠٠٠)، تتنازل عن حقوقها المالية وتعيد المهر\n• مدة دعوى الخلع: عادةً ٣-٦ شهور\n\nننصح بشدة باستشارة متخصصة لتقييم وضعك.',
            category: 'أحوال شخصية'
        },
        {
            keywords: ['نفقة', 'نفقه', 'إنفاق'],
            answer: 'النفقة في القانون المصري:\n\n• **نفقة الزوجة**: واجبة على الزوج من تاريخ العقد الصحيح\n• **نفقة الصغار**: واجبة على الأب (مأكل، ملبس، مسكن، تعليم، علاج)\n• **نفقة المتعة**: للمطلقة — تُقدّر بنفقة سنتين على الأقل\n• يمكن رفع دعوى نفقة مؤقتة (أمر أداء) للحصول على نفقة سريعة\n\nلتقديم طلب نفقة، يُرجى التواصل مع المكتب.',
            category: 'أحوال شخصية'
        },
        {
            keywords: ['حضانة', 'حضانه', 'اولاد', 'أولاد', 'أطفال', 'اطفال'],
            answer: 'الحضانة في القانون المصري (المادة ٢٠ من المرسوم بقانون ٢٥ لسنة ١٩٢٩ المعدل):\n\n• حق الحضانة للأم ثم لأم الأم ثم لأم الأب\n• سن الحضانة: حتى ١٥ سنة للولد والبنت\n• عند بلوغ سن الحضانة يُخيّر الطفل\n• يسقط حق الحضانة بزواج الحاضنة من أجنبي\n\nكل حالة تختلف — ننصح بالاستشارة.',
            category: 'أحوال شخصية'
        },
        {
            keywords: ['قبض', 'حبس', 'محبوس', 'معتقل', 'اعتقال', 'قسم', 'شرطة', 'نيابة'],
            answer: '⚠️ في حالة القبض أو الحبس — حقوقك وفقاً للقانون المصري:\n\n١. الحق في معرفة سبب القبض\n٢. الحق في الاتصال بمحامٍ فوراً\n٣. لا يجوز الحبس أكثر من ٢٤ ساعة بدون أمر النيابة\n٤. الحق في التزام الصمت\n٥. لا توقع على أي محضر بدون حضور محاميك\n\n📞 اتصل بنا فوراً على: 01229333957',
            category: 'جنائي'
        },
        {
            keywords: ['فصل', 'فصل تعسفي', 'طردوني', 'مفصول', 'تعسفي', 'شغل', 'عمل', 'موظف'],
            answer: 'الفصل التعسفي في قانون العمل المصري (قانون ١٢ لسنة ٢٠٠٣):\n\n• يحق لك رفع دعوى تعويض عن الفصل التعسفي\n• التعويض: لا يقل عن أجر شهرين عن كل سنة خدمة\n• مدة التقادم: سنة من تاريخ الفصل\n• يحق لك مكافأة نهاية الخدمة وبدل الإجازات\n\nاحتفظ بعقد العمل وأي مستندات تثبت الفصل.',
            category: 'عمل'
        },
        {
            keywords: ['إيجار', 'ايجار', 'مستأجر', 'مالك', 'إخلاء', 'اخلاء', 'عقار', 'شقة'],
            answer: 'قوانين الإيجار في مصر:\n\n• **القانون القديم** (٤٩/١٩٧٧): ينطبق على العقود قبل ١٩٩٦ — أحكام خاصة\n• **القانون الجديد** (٤/١٩٩٦): ينطبق على العقود بعد ١٩٩٦ — حرية التعاقد\n• **إخلاء العقار**: يختلف حسب نوع العقد والسبب\n• **زيادة الإيجار**: تخضع لقواعد مختلفة حسب القانون المطبق\n\nمنازعات الإيجار معقدة — ننصح بالاستشارة.',
            category: 'مدني'
        },
        {
            keywords: ['مجلس الدولة', 'قرار إداري', 'إداري', 'حكومة', 'موظف حكومي'],
            answer: 'القضاء الإداري (مجلس الدولة) في مصر:\n\n• يختص بالطعن على القرارات الإدارية\n• ميعاد الطعن: ٦٠ يوماً من تاريخ العلم بالقرار\n• يمكن طلب وقف تنفيذ القرار (استشكال)\n• أنواع الدعاوى: إلغاء — تعويض — تفسير\n\nيُرجى سرعة التواصل نظراً لضيق المواعيد.',
            category: 'إداري'
        },
        {
            keywords: ['شركة', 'تأسيس', 'سجل تجاري', 'رخصة'],
            answer: 'تأسيس الشركات في مصر:\n\n• **شركة ذات مسؤولية محدودة**: الأكثر شيوعاً — لا يوجد حد أدنى لرأس المال\n• **شركة مساهمة**: رأس مال لا يقل عن ٢٥٠,٠٠٠ جنيه\n• **شركة شخص واحد**: متاحة منذ ٢٠١٨\n• المستندات: بطاقات الشركاء + عقد الإيجار + شهادة عدم التباس الاسم\n\nنقدم خدمة تأسيس الشركات بالكامل.',
            category: 'شركات'
        },
        {
            keywords: ['تقادم', 'مدة', 'ميعاد', 'مواعيد', 'طعن', 'استئناف', 'نقض'],
            answer: 'مواعيد مهمة في القانون المصري:\n\n• **الاستئناف**: ٤٠ يوماً من صدور الحكم (مدني) / ١٠ أيام (جنائي)\n• **النقض**: ٦٠ يوماً من صدور الحكم\n• **التقادم المدني العام**: ١٥ سنة\n• **تقادم دعاوى التعويض**: ٣ سنوات\n• **تقادم الشيكات**: ٦ شهور\n\n⚠️ المواعيد الإجرائية لا تتوقف — تصرف فوراً!',
            category: 'إجراءات'
        },
        {
            keywords: ['موعد', 'حجز', 'استشارة', 'زيارة', 'مكتب'],
            answer: 'يسعدنا استقبالك! لحجز استشارة:\n\n📅 مواعيد العمل: الأحد — الخميس: ٨:٠٠ ص — ٦:٠٠ م | السبت: ٩:٠٠ ص — ١:٠٠ م\n📍 العنوان: القاهرة، المرج الجديدة / الخصوص\n📞 الهاتف: 01229333957\n💬 واتساب: wa.me/201229333957\n\nأو يمكنك الحجز مباشرة من صفحة حجز الاستشارات على موقعنا.',
            category: 'تواصل'
        }
    ];

    const defaultAnswer = 'شكراً لسؤالك. هذا الموضوع يحتاج استشارة متخصصة لتقييم وضعك بدقة.\n\nيمكنك:\n• حجز استشارة من صفحة الحجز\n• الاتصال مباشرة: 01229333957\n• مراسلتنا عبر واتساب\n\nفريقنا جاهز لمساعدتك.';

    const disclaimer = '⚖️ تنبيه: هذه معلومات توجيهية عامة ولا تُغني عن استشارة المحامي.';

    const welcomeMessage = 'مرحباً بك في المساعد القانوني لمؤسسة آل زهران 👋\n\nيمكنني مساعدتك في:\n• التعرّف على نوع مشكلتك القانونية\n• الإجابة على أسئلة عامة عن القانون المصري\n• توجيهك للقسم المناسب\n\nاكتب سؤالك وسأحاول مساعدتك...';

    // === Chatbot Logic ===
    function findAnswer(question) {
        const q = question.toLowerCase().trim();

        // Greeting
        if (/^(مرحب|أهلا|اهلا|سلام|هاي|ازيك|ازاي|صباح|مساء)/.test(q)) {
            return { answer: 'أهلاً وسهلاً! كيف يمكنني مساعدتك اليوم؟ 😊', category: 'تحية' };
        }

        // Search knowledge base
        let bestMatch = null;
        let maxMatches = 0;

        for (const item of legalKnowledge) {
            let matchCount = 0;
            for (const keyword of item.keywords) {
                if (q.includes(keyword)) {
                    matchCount++;
                }
            }
            if (matchCount > maxMatches) {
                maxMatches = matchCount;
                bestMatch = item;
            }
        }

        if (bestMatch && maxMatches > 0) {
            return { answer: bestMatch.answer, category: bestMatch.category };
        }

        return { answer: defaultAnswer, category: 'عام' };
    }

    // === DOM Setup ===
    function initChatbot() {
        const trigger = document.getElementById('chatbotTrigger');
        const window_ = document.getElementById('chatbotWindow');
        const closeBtn = document.getElementById('chatbotClose');
        const input = document.getElementById('chatInput');
        const sendBtn = document.getElementById('chatSend');
        const messages = document.getElementById('chatMessages');

        if (!trigger || !window_ || !messages) return;

        // Toggle chatbot
        trigger.addEventListener('click', () => {
            window_.classList.add('open');
            trigger.classList.add('active');
            input?.focus();

            // Show welcome message on first open
            if (messages.children.length === 0) {
                addBotMessage(welcomeMessage);
            }
        });

        closeBtn?.addEventListener('click', () => {
            window_.classList.remove('open');
            trigger.classList.remove('active');
        });

        // Send message
        function handleSend() {
            const text = input?.value.trim();
            if (!text) return;

            addUserMessage(text);
            input.value = '';

            // Show typing indicator
            showTyping();

            // Simulate response delay
            setTimeout(() => {
                hideTyping();
                const result = findAnswer(text);
                addBotMessage(result.answer, true);
            }, 800 + Math.random() * 700);
        }

        sendBtn?.addEventListener('click', handleSend);
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }

    function addBotMessage(text, showDisclaimer = false) {
        const messages = document.getElementById('chatMessages');
        if (!messages) return;

        const div = document.createElement('div');
        div.className = 'chat-message bot';

        // Format text: convert \n to <br> and **text** to <strong>
        let formatted = sanitizeForChat(text)
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/•/g, '<span style="color:var(--gold-500)">•</span>');

        div.innerHTML = formatted;

        if (showDisclaimer) {
            div.innerHTML += `<div class="disclaimer">${disclaimer}</div>`;
        }

        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function addUserMessage(text) {
        const messages = document.getElementById('chatMessages');
        if (!messages) return;

        const div = document.createElement('div');
        div.className = 'chat-message user';
        div.textContent = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function showTyping() {
        const messages = document.getElementById('chatMessages');
        if (!messages) return;

        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.id = 'typingIndicator';
        div.innerHTML = '<span></span><span></span><span></span>';
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    function sanitizeForChat(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
})();
