/* ============================================
   مؤسسة آل زهران — Advanced Legal Chatbot
   المساعد القانوني التفاعلي (نسخة متقدمة)
   ============================================ */

(function() {
    'use strict';

    // === Legal Knowledge Base (Egyptian Law) ===
    const legalKnowledge = [
        {
            keywords: ['توكيل', 'وكالة', 'اوكل', 'أوكل', 'توكل'],
            answer: 'لتوكيل محامٍ في مصر، يجب:\n١. الاتفاق على نطاق العمل والأتعاب.\n٢. التوجه لمكتب التوثيق (الشهر العقاري) لعمل توكيل رسمي عام في القضايا.\n٣. المستندات: بطاقة الرقم القومي سارية.',
            options: ['حجز استشارة', 'مواعيد العمل', 'العودة للبداية']
        },
        {
            keywords: ['أتعاب', 'اتعاب', 'تكلفة', 'سعر', 'كام', 'بكام', 'مصاريف', 'رسوم'],
            answer: 'تتحدد أتعاب المحاماة وفقاً للمادة ٨٢ من قانون المحاماة وتختلف حسب طبيعة القضية ودرجة التقاضي. لتقدير دقيق، نفضل دراسة مستندات القضية أولاً.',
            options: ['حجز استشارة مكتبية', 'الاستعلام عن قضية']
        },
        {
            keywords: ['طلاق', 'خلع', 'نفقة', 'نفقه', 'حضانة', 'حضانه', 'اسرة', 'أسرة', 'انفصال', 'زواج'],
            answer: 'قضايا الأحوال الشخصية تتطلب سرية ودقة. نتعامل مع كافة دعاوى (الخلع، الطلاق للضرر، النفقات بأنواعها، والحضانة). كيف يمكننا مساعدتك تحديداً؟',
            options: ['إجراءات الخلع', 'دعوى نفقة', 'رؤية وحضانة', 'حجز استشارة سرية']
        },
        {
            keywords: ['إجراءات الخلع', 'خلع'],
            answer: 'في دعوى الخلع (المادة ٢٠ من القانون ١ لسنة ٢٠٠٠): تتنازل الزوجة عن حقوقها المالية الشرعية وترد مقدم الصداق (المهر). إجراءاتها أسرع من الطلاق للضرر وتستغرق عادة من ٣ إلى ٦ أشهر.',
            options: ['حجز استشارة سرية', 'العودة للبداية']
        },
        {
            keywords: ['قبض', 'حبس', 'محبوس', 'شرطة', 'نيابة', 'جنائي', 'جنحة', 'جناية', 'مخدرات', 'تزوير'],
            answer: '⚠️ في القضايا الجنائية، الوقت عامل حاسم. لا تدلي بأي أقوال أو توقع على محاضر دون حضور محاميك. نحن متواجدون للتدخل الفوري.',
            options: ['الاتصال بحالة طوارئ 📞', 'حجز موعد عاجل']
        },
        {
            keywords: ['الاتصال بحالة طوارئ 📞', 'طوارئ'],
            answer: 'في حالات الطوارئ الجنائية، يرجى الاتصال فوراً على الخط الساخن للمكتب:\n📞 01229333957\n📞 01060670084',
            options: ['العودة للبداية']
        },
        {
            keywords: ['فصل', 'تعسفي', 'عمل', 'عمال', 'موظف', 'شركة', 'تأسيس', 'تجارية'],
            answer: 'نقدم خدمات متكاملة في قانون العمل (تمثيل العمال أو الشركات) وفي القانون التجاري (تأسيس الشركات، صياغة العقود، تسجيل العلامات التجارية).',
            options: ['تأسيس شركة', 'قضايا عمالية', 'العودة للبداية']
        },
        {
            keywords: ['حجز', 'استشارة', 'موعد', 'زيارة', 'مقابلة', 'حجز استشارة', 'حجز استشارة مكتبية', 'حجز استشارة سرية', 'حجز موعد عاجل'],
            answer: 'يسعدنا استقبالك في المؤسسة 🏛️\nيمكنك حجز موعدك بسهولة عبر صفحة الحجز الإلكتروني الخاصة بنا، وسيقوم فريقنا بتأكيد الموعد معك.',
            options: ['الذهاب لصفحة الحجز 📅', 'مواعيد العمل']
        },
        {
            keywords: ['الذهاب لصفحة الحجز 📅'],
            answer: 'يتم تحويلك الآن لصفحة الحجز...',
            action: () => window.location.href = 'booking.html'
        },
        {
            keywords: ['مواعيد العمل', 'متى', 'تفتحوا', 'مواعيدكم'],
            answer: 'مواعيد العمل الرسمية للمؤسسة:\nالأحد - الخميس: ٨:٠٠ صباحاً حتي ٦:٠٠ مساءً\nالسبت: ٩:٠٠ صباحاً حتي ١:٠٠ ظهراً\nالجمعة: عطلة رسمية',
            options: ['عنوان المكتب', 'حجز استشارة']
        },
        {
            keywords: ['عنوان المكتب', 'مكانكم', 'العنوان', 'مكان'],
            answer: '📍 فرع المرج: المرج الجديدة - بجوار هايبر الشرق.\n📍 فرع الخصوص: الخصوص - بجوار هايبر كازيون.',
            options: ['فتح الخريطة 🗺️', 'العودة للبداية']
        },
        {
            keywords: ['فتح الخريطة 🗺️'],
            answer: 'يتم تحويلك لصفحة التواصل والخرائط...',
            action: () => window.location.href = 'contact.html'
        },
        {
            keywords: ['العودة للبداية', 'بداية', 'قائمة', 'خيارات'],
            answer: 'مرحباً بك مجدداً. اختر القسم الذي تود الاستفسار عنه:',
            options: ['الأحوال الشخصية', 'القضايا الجنائية', 'الشركات والتجاري', 'القضاء الإداري', 'حجز استشارة']
        }
    ];

    const defaultAnswer = 'عذراً، لم أتمكن من تصنيف سؤالك بدقة. القضايا القانونية معقدة وتحتاج لدراسة.\nلضمان حصولك على إجابة دقيقة، نرجو التواصل المباشر مع محامينا.';
    const defaultOptions = ['حجز استشارة', 'الاتصال المباشر 📞', 'العودة للبداية'];

    const disclaimer = '⚖️ إخلاء مسؤولية: المساعد الآلي يقدم معلومات إرشادية عامة فقط ولا تعد استشارة قانونية ملزمة وفقاً لقانون المحاماة.';

    // === State Management ===
    let chatHistory = [];
    let isTyping = false;

    // === Initialization ===
    function initChatbot() {
        const trigger = document.getElementById('chatbotTrigger');
        const window_ = document.getElementById('chatbotWindow');
        const closeBtn = document.getElementById('chatbotClose');
        const input = document.getElementById('chatInput');
        const sendBtn = document.getElementById('chatSend');
        const messages = document.getElementById('chatMessages');

        if (!trigger || !window_ || !messages) return;

        // Load history from session storage
        loadHistory();

        // Toggle chatbot
        trigger.addEventListener('click', () => {
            window_.classList.add('open');
            trigger.classList.add('active');
            input?.focus();

            // Show welcome message if empty
            if (chatHistory.length === 0) {
                setTimeout(() => {
                    handleBotResponse(
                        'مرحباً بك في المنصة الرقمية لمؤسسة آل زهران للمحاماة والاستشارات القانونية 👋\nكيف يمكننا حماية حقوقك اليوم؟',
                        ['الاستشارات القانونية', 'قضايا الأحوال الشخصية', 'القضايا الجنائية', 'عناوين فروعنا']
                    );
                }, 500);
            } else {
                scrollToBottom();
            }
        });

        closeBtn?.addEventListener('click', () => {
            window_.classList.remove('open');
            trigger.classList.remove('active');
        });

        // Send message
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
        
        // Handle Options Clicks
        messages.addEventListener('click', (e) => {
            if (e.target.classList.contains('chat-option-btn')) {
                if (isTyping) return;
                const optionText = e.target.textContent;
                // Remove option buttons after clicking
                const optionsContainer = e.target.closest('.chat-options');
                if (optionsContainer) optionsContainer.remove();
                
                processUserMessage(optionText);
            }
        });
    }

    // === Core Logic ===
    function processUserMessage(text) {
        addUserMessage(text);
        showTyping();

        setTimeout(() => {
            hideTyping();
            const result = findAnswer(text);
            handleBotResponse(result.answer, result.options, result.action);
        }, 800 + Math.random() * 500);
    }

    function findAnswer(question) {
        const q = question.toLowerCase().trim();

        let bestMatch = null;
        let maxMatches = 0;

        for (const item of legalKnowledge) {
            let matchCount = 0;
            // Exact match for predefined options
            if (item.keywords.includes(q)) {
                return item;
            }
            // Fuzzy search for free text
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
            return bestMatch;
        }

        // Handle specific generic matches
        if (/^(مرحب|أهلا|اهلا|سلام|هاي|ازيك|ازاي|صباح|مساء)/.test(q)) {
            return { answer: 'أهلاً وسهلاً بك في مؤسسة آل زهران. تفضل بطرح استفسارك القانوني، أو اختر من القائمة التالية:', options: ['حجز استشارة', 'خدماتنا القانونية'] };
        }
        if (q.includes('اتصال') || q.includes('تليفون') || q.includes('رقم')) {
            return { answer: 'للرد الفوري، يرجى الاتصال على الأرقام التالية:\n01229333957\n01060670084', options: ['حجز موعد', 'العودة للبداية'] };
        }

        return { answer: defaultAnswer, options: defaultOptions };
    }

    function handleBotResponse(text, options = null, action = null) {
        addBotMessage(text, options, chatHistory.length === 0);
        
        if (action && typeof action === 'function') {
            setTimeout(action, 1500);
        }
    }

    // === UI Renderers ===
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
            .replace(/•/g, '<span style="color:var(--gold-500)">•</span>');

        div.innerHTML = formatted;

        if (showDisclaimer) {
            div.innerHTML += `<div class="disclaimer">${disclaimer}</div>`;
        }
        wrapper.appendChild(div);

        // Add options if any
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

        // Save state
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

        // Save state
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

    // === Session Memory (Persistence across pages) ===
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
        messages.innerHTML = ''; // Clear

        // We only want to render options for the VERY LAST bot message
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
                    .replace(/•/g, '<span style="color:var(--gold-500)">•</span>');
                
                div.innerHTML = formatted;
                if (msg.showDisclaimer) {
                    div.innerHTML += `<div class="disclaimer">${disclaimer}</div>`;
                }
                wrapper.appendChild(div);

                // Only add options buttons to the latest bot message
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

    // === Apply missing CSS for new features dynamically ===
    const style = document.createElement('style');
    style.textContent = `
        .chat-message-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-bottom: 8px;
        }
        .chat-message-wrapper.bot { align-items: flex-start; }
        .chat-message-wrapper.user { align-items: flex-end; }
        .chat-options {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
            padding-right: 4px;
        }
        .chat-option-btn {
            background: var(--bg-body);
            border: 1px solid var(--gold-500);
            color: var(--primary-700);
            padding: 6px 12px;
            border-radius: 50px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            transition: all var(--transition-fast);
        }
        .chat-option-btn:hover {
            background: var(--gold-500);
            color: var(--primary-900);
        }
    `;
    document.head.appendChild(style);

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
})();
