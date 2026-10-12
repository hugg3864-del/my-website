/* ============================================
   مؤسسة آل زهران للمحاماة والاستشارات القانونية
   محرك الفحص الذكي للعقود — Smart Contract Analyzer
   ============================================ */

(function() {
    'use strict';

    // Sample Contract with Real-World Hidden Loopholes (عقد بيع شقة واقعي به ثغرات قانونية)
    const SAMPLE_FLAWED_CONTRACT = `إنه في يوم الإثنين الموافق 10/10/2025 تحرر هذا العقد بين كل من:
أولاً: السيد/ ممدوح إبراهيم عبد الرحمن - مصري الجنسية - بطاقة رقم قومي: 28001010101010 - ومقيم بالقاهرة. (طرف أول - بائع)
ثانياً: السيد/ هيثم كمال محمود - مصري الجنسية - بطاقة رقم قومي: 28802020202020 - ومقيم بالجيزة. (طرف ثان - مشتري)

البند الأول: موضوع العقد
باع وأسقط وتنازل الطرف الأول بكافة الضمانات الفعلية والقانونية إلى الطرف الثاني الشقة الكائنة بالدور الرابع بالعقار رقم 15 شارع النصر، والبالغ مساحتها 140 متراً مربعاً تقريباً تحت العجز والزيادة.

البند الثاني: الثمن وطريقة السداد
تم هذا البيع نظير ثمن إجمالي قدره 2,000,000 جنيه (مليونان جنيه مصري)، سدد المشتري منها مبلغ 1,000,000 جنيه نقداً بمجلس العقد، والباقي يُسدد على أربعة أقساط ربع سنوية.

البند الثالث: الاستلام
يتم تسليم الشقة للطرف الثاني بعد سداد كامل الثمن في موعد غايته نهاية العام الحالي، دون التزام البائع بأي غرامات إذا تأخر التشطيب.

البند الرابع: الملكية
يقر الطرف الأول بأن ملكية الشقة آلت إليه بالشراء العرفي من أحد الأشخاص، ولا توجد مستندات مسجلة حالياً.

البند الخامس: الشروط الجزائية
في حال تأخر المشتري عن سداد أي قسط في موعده، يعتبر هذا العقد لاغياً ويفقد المشتري كامل المبالغ المدفوعة كتعويض اتفاقي للطرف الأول.

البند السادس: الضرائب والمصروفات
يتحمل الطرف الثاني (المشتري) كافة الضرائب والمصروفات ورسوم التسجيل أياً كان نوعها.`;

    document.addEventListener('DOMContentLoaded', () => {
        // Elements
        const tabUploadBtn = document.getElementById('tabUploadBtn');
        const tabTextBtn = document.getElementById('tabTextBtn');
        const tabSampleBtn = document.getElementById('tabSampleBtn');
        
        const uploadSection = document.getElementById('uploadSection');
        const textSection = document.getElementById('textSection');
        
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        const fileSelectedInfo = document.getElementById('fileSelectedInfo');
        const fileNameDisplay = document.getElementById('fileNameDisplay');
        
        const contractTextArea = document.getElementById('contractText');
        const contractTypeSelect = document.getElementById('contractType');
        const startAnalyzeBtn = document.getElementById('startAnalyzeBtn');
        
        const scanProgress = document.getElementById('scanProgress');
        const scanStatusTitle = document.getElementById('scanStatusTitle');
        const scanStatusSubtitle = document.getElementById('scanStatusSubtitle');
        const reportSection = document.getElementById('reportSection');
        
        const scoreBadge = document.getElementById('scoreBadge');
        const scoreNumber = document.getElementById('scoreNumber');
        const scoreLabel = document.getElementById('scoreLabel');
        const loopholesContainer = document.getElementById('loopholesContainer');
        const advisoryRecommendation = document.getElementById('advisoryRecommendation');
        const waConsultBtn = document.getElementById('waConsultBtn');

        // Modal Elements
        const openApiConfig = document.getElementById('openApiConfig');
        const apiKeyModal = document.getElementById('apiKeyModal');
        const closeApiKeyModal = document.getElementById('closeApiKeyModal');
        const geminiApiKeyInput = document.getElementById('geminiApiKeyInput');
        const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');

        let currentFile = null;
        let activeTab = 'upload'; // upload | text | sample

        // Tab Switching
        tabUploadBtn?.addEventListener('click', () => {
            activeTab = 'upload';
            tabUploadBtn.classList.add('active');
            tabTextBtn.classList.remove('active');
            tabSampleBtn.classList.remove('active');
            uploadSection.style.display = 'block';
            textSection.style.display = 'none';
        });

        tabTextBtn?.addEventListener('click', () => {
            activeTab = 'text';
            tabTextBtn.classList.add('active');
            tabUploadBtn.classList.remove('active');
            tabSampleBtn.classList.remove('active');
            uploadSection.style.display = 'none';
            textSection.style.display = 'block';
            contractTextArea?.focus();
        });

        tabSampleBtn?.addEventListener('click', () => {
            activeTab = 'sample';
            tabSampleBtn.classList.add('active');
            tabUploadBtn.classList.remove('active');
            tabTextBtn.classList.remove('active');
            uploadSection.style.display = 'none';
            textSection.style.display = 'block';
            if (contractTextArea) contractTextArea.value = SAMPLE_FLAWED_CONTRACT;
            contractTypeSelect.value = 'real_estate_sale';
            if (typeof showToast === 'function') {
                showToast('تم تحميل نموذج عقد بيع شقة به ثغرات واقعية لتجربة الفحص!');
            }
        });

        // File Drag & Drop Handling
        dropZone?.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone?.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone?.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleSelectedFile(e.dataTransfer.files[0]);
            }
        });

        fileInput?.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                handleSelectedFile(e.target.files[0]);
            }
        });

        function handleSelectedFile(file) {
            currentFile = file;
            if (fileNameDisplay) fileNameDisplay.textContent = file.name + ` (${(file.size/1024).toFixed(1)} KB)`;
            if (fileSelectedInfo) fileSelectedInfo.style.display = 'block';
            
            // If it's a text file, preview it in textarea
            if (file.type.includes('text') || file.name.endsWith('.txt')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (contractTextArea) contractTextArea.value = event.target.result;
                };
                reader.readAsText(file);
            }
        }

        // API Key Modal Management
        if (openApiConfig && apiKeyModal) {
            openApiConfig.addEventListener('click', () => {
                const savedKey = localStorage.getItem('gemini_api_key') || '';
                if (geminiApiKeyInput) geminiApiKeyInput.value = savedKey;
                apiKeyModal.classList.add('show');
            });

            closeApiKeyModal?.addEventListener('click', () => {
                apiKeyModal.classList.remove('show');
            });

            apiKeyModal.addEventListener('click', (e) => {
                if (e.target === apiKeyModal) apiKeyModal.classList.remove('show');
            });

            saveApiKeyBtn?.addEventListener('click', () => {
                const key = geminiApiKeyInput?.value.trim() || '';
                if (key) {
                    localStorage.setItem('gemini_api_key', key);
                    if (typeof showToast === 'function') showToast('تم حفظ مفتاح Gemini API بنجاح! سيعمل الفحص بالموديل السحابي.');
                } else {
                    localStorage.removeItem('gemini_api_key');
                    if (typeof showToast === 'function') showToast('تم مسح المفتاح؛ سيعمل الفحص بمحرك المجلس الاستشاري الداخلي.');
                }
                apiKeyModal.classList.remove('show');
            });
        }

        // Start Analysis Action
        startAnalyzeBtn?.addEventListener('click', async () => {
            const contractText = contractTextArea?.value.trim() || '';
            const contractType = contractTypeSelect?.value || 'general';

            if (!contractText && !currentFile) {
                alert('يرجى كتابة نص العقد أو رفع صورة/ملف العقد أولاً للبدء بالفحص.');
                return;
            }

            // Scroll to progress
            reportSection.style.display = 'none';
            scanProgress.style.display = 'block';
            startAnalyzeBtn.disabled = true;
            scanProgress.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Step Simulation Animation
            const steps = [
                { title: 'جاري استخراج وقراءة بنود العقد...', sub: 'التعرف على الأطراف، الثمن، ومحل التعاقد' },
                { title: 'مطابقة الشروط مع القانون المدني وأحكام النقض...', sub: 'فحص الشروط الفاسخة، التزامات البائع، والضمانات' },
                { title: 'كشف الثغرات والشروط المجحفة...', sub: 'فحص بنود الغرامات، الضرائب العقارية، وتسلسل الملكية' },
                { title: 'إعداد التقرير القانوني للمجلس الاستشاري...', sub: 'صياغة التوصيات العملية وحساب مؤشر الأمان' }
            ];

            let stepIdx = 0;
            const stepInterval = setInterval(() => {
                stepIdx++;
                if (stepIdx < steps.length) {
                    if (scanStatusTitle) scanStatusTitle.textContent = steps[stepIdx].title;
                    if (scanStatusSubtitle) scanStatusSubtitle.textContent = steps[stepIdx].sub;
                }
            }, 800);

            try {
                // Check if user provided Gemini API Key
                const savedApiKey = localStorage.getItem('gemini_api_key');
                let analysisResult = null;

                if (savedApiKey && contractText) {
                    // Execute Live Gemini Cloud AI Call
                    analysisResult = await analyzeWithGeminiAPI(savedApiKey, contractText, contractType);
                } else {
                    // Execute High-Precision Local Heuristic Engine
                    await new Promise(r => setTimeout(r, 2600)); // Wait for animation
                    analysisResult = analyzeWithLocalEngine(contractText, contractType);
                }

                clearInterval(stepInterval);
                scanProgress.style.display = 'none';
                renderAnalysisReport(analysisResult, contractType);
                reportSection.style.display = 'block';
                reportSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            } catch (err) {
                clearInterval(stepInterval);
                scanProgress.style.display = 'none';
                console.error('Analysis error:', err);
                // Fallback to local engine on API error
                const fallbackResult = analyzeWithLocalEngine(contractText, contractType);
                renderAnalysisReport(fallbackResult, contractType);
                reportSection.style.display = 'block';
            } finally {
                startAnalyzeBtn.disabled = false;
            }
        });

        // ============================================
        // Local Expert Heuristic Engine (Egyptian Contract Laws)
        // ============================================
        function analyzeWithLocalEngine(text, type) {
            const t = (text || '').toLowerCase();
            const loopholes = [];
            let safetyScore = 90;

            // 1. فحص تسلسل الملكية (Crucial for Sale Contracts)
            if (type === 'real_estate_sale') {
                if (t.includes('شراء عرفي') || t.includes('لا توجد مستندات مسجلة') || !t.includes('تسلسل') && !t.includes('سند ملكيه')) {
                    safetyScore -= 25;
                    loopholes.push({
                        type: 'critical',
                        title: 'خطر جسيم: غموض أو انقطاع في تسلسل سند الملكية',
                        desc: 'ذكر العقد أن الملكية آلت بالشراء العرفي دون بيان تسلسل العقود المسجلة والتراخيص، مما يعرض المشتري لمخاطر النزاع مع ورثة أو مشترين سابقين وحظر التسجيل بالشهر العقاري.'
                    });
                } else {
                    loopholes.push({
                        type: 'safe',
                        title: 'بيان سند الملكية ومصدرها متوفر',
                        desc: 'العقد يتضمن إشارة لمصدر أيلولة ملكية العين للبائع.'
                    });
                }
            }

            // 2. فحص الشرط الفاسخ الصريح (المادة 158 مدني)
            if (t.includes('يعتبر مفسوخاً من تلقاء نفسه دون حاجه الي حكم') || t.includes('انفساخ العقد تلقائياً')) {
                loopholes.push({
                    type: 'safe',
                    title: 'وجود شرط فاسخ صريح منضبط',
                    desc: 'العقد يتضمن صياغة مقبولة للشرط الفاسخ الصريح بما يعفي من اللجوء لدعاوى الفسخ المطولة.'
                });
            } else {
                safetyScore -= 15;
                loopholes.push({
                    type: 'critical',
                    title: 'غياب الشرط الفاسخ الصريح الجازم (المادة ١٥٨ مدني)',
                    desc: 'لم يُصغ بند الفسخ بعبارة "مفسوخاً من تلقاء نفسه دون حاجة إلى حكم قضائي أو إنذار"، مما يجبر المتضرر على رفع دعوى فسخ قضائية تأخذ سنوات أمام المحكمة.'
                });
            }

            // 3. فحص الشروط الجزائية غير المتكافئة
            if (t.includes('يفقد المشتري كامل المبالغ') || t.includes('مصادرة الدفعات') || t.includes('دون التزام البائع باي غرامات')) {
                safetyScore -= 20;
                loopholes.push({
                    type: 'critical',
                    title: 'شرط جزائي تعسفي ومجحف (بند مصادرة الأموال)',
                    desc: 'البند الذي ينص على مصادرة كامل ما دفعه المشتري حال التأخر يعد شرطاً تعسفياً باطلاً يجوز للقاضي تخفيضه (المادة ٢٢٤ مدني)، كما يعفي البائع دون مبرر من التزامه بالتسليم في الموعد.'
                });
            } else if (t.includes('شرط جزائي') || t.includes('غرامة تاخير')) {
                loopholes.push({
                    type: 'safe',
                    title: 'تحديد شرط جزائي للتأخير',
                    desc: 'العقد حدد التزاماً مالياً لضمان الوفاء بالمواعيد.'
                });
            } else {
                safetyScore -= 10;
                loopholes.push({
                    type: 'warning',
                    title: 'غياب غرامات التأخير عن التسليم أو السداد',
                    desc: 'لا يتضمن العقد شرطاً جزائياً محدداً عن كل يوم تأخير في تسليم العين أو سداد الأقساط.'
                });
            }

            // 4. ضريبة التصرفات العقارية (المادة 42 من القانون 91 لسنة 2005)
            if (type === 'real_estate_sale') {
                if (t.includes('يتحمل المشتري كافه الضرائب') || t.includes('يتحمل الطرف الثاني كافه الضرائب')) {
                    safetyScore -= 15;
                    loopholes.push({
                        type: 'warning',
                        title: 'تحميل المشتري ضريبة التصرفات العقارية (٢.٥٪)',
                        desc: 'قانون الضريبة على الدخل المصري رقم ٩١ لسنة ٢٠٠٥ يلزم (البائع) حصراً بسداد ضريبة التصرفات العقارية البالغة ٢.٥٪ من قيمة البيع. تحميلها للمشتري يزيد التكلفة المالية عليه بغير مقتضى قانوني.'
                    });
                } else if (t.includes('تصرفات عقارية') || t.includes('ضريبة')) {
                    loopholes.push({
                        type: 'safe',
                        title: 'تنظيم بند سداد الضرائب العقارية',
                        desc: 'العقد أشار لالتزامات الضرائب والمصاريف.'
                    });
                } else {
                    safetyScore -= 5;
                    loopholes.push({
                        type: 'warning',
                        title: 'إغفال تحديد الملتزم بضريبة التصرفات العقارية',
                        desc: 'لم يحدد العقد بوضوح التزام البائع بسداد ضريبة التصرفات العقارية وتقديم مخالصة رسمية من مأمورية الضرائب.'
                    });
                }
            }

            // 5. فحص أركان المبيع والتسليم
            if (t.includes('تحت العجز والزياده') || !t.includes('حدود') && !t.includes('معالم')) {
                safetyScore -= 10;
                loopholes.push({
                    type: 'warning',
                    title: 'غموض في تحديد المساحة الدقيقة وحدود العين',
                    desc: 'عبارة "تحت العجز والزيادة" دون تحديد نسبة تفاوت مسموحة ودون ذكر الحدود الأربعة بالتفصيل تعرض المشتري لنقص المساحة دون حق المطالبة بإنقاص الثمن.'
                });
            } else {
                loopholes.push({
                    type: 'safe',
                    title: 'توصيف العين محل التعاقد بشكل واضح',
                    desc: 'تم تضمين بيان بالمساحة والمعالم الأساسية للعين.'
                });
            }

            // 6. خلو العين من الحقوق العينية (الرهن والامتياز والنزاع)
            if (t.includes('خاليه من كافه الديون') || t.includes('خلو العين من الرهن') || t.includes('حقوق عينيه')) {
                loopholes.push({
                    type: 'safe',
                    title: 'إقرار بخلو العين من الرهون والديون',
                    desc: 'تضمن العقد إقراراً رسمياً من البائع بخلو العين من كافة الحقوق العينية الأصلية والتبعية.'
                });
            } else {
                safetyScore -= 10;
                loopholes.push({
                    type: 'warning',
                    title: 'غياب إقرار صريح بخلو العين من الرهون وحقوق الغير',
                    desc: 'يجب إضافة إقرار من البائع بأن العين خالية تماماً من كافة الرهون الرسمية والحيازية وحقوق الامتياز وديون بنك الإسكان والتعمير وأي نزاع قضائي مع الغير.'
                });
            }

            // Ensure score stays within bounds
            safetyScore = Math.max(25, Math.min(95, safetyScore));

            return {
                score: safetyScore,
                loopholes: loopholes
            };
        }

        // ============================================
        // Live Gemini Cloud API Integration
        // ============================================
        async function analyzeWithGeminiAPI(apiKey, text, type) {
            const prompt = `أنت تمثل رئيس الدائرة المدنية بالمجلس الاستشاري الأعلى لمؤسسة آل زهران للمحاماة في مصر.
قم بفحص نص العقد التالي بدقة متناهية طبقاً للقانون المدني وقانون التجارة المصري وأحكام محكمة النقض.
نوع العقد: ${type}
نص العقد المراد فحصه:
"""
${text}
"""

المطلوب: استخراج تقييم أمان العقد كنسبة مئوية (Score من 0 إلى 100)، وقائمة بالثغرات القانونية الحرجة (critical)، والتنبيهات (warning)، والبنود الصحيحة (safe).
أجب حصراً بصيغة JSON التالية دون أي مقدمات أو أسطر إضافية:
{
  "score": 60,
  "loopholes": [
    {
      "type": "critical",
      "title": "عنوان الثغرة",
      "desc": "الشرح القانوني المستند للقانون المصري ومحكمة النقض"
    },
    {
      "type": "warning",
      "title": "عنوان التنبيه",
      "desc": "شرح التعديل المطلوب"
    },
    {
      "type": "safe",
      "title": "البند السليم",
      "desc": "بيان سبب صحته"
    }
  ]
}`;

            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { responseMimeType: "application/json" }
                })
            });

            if (!response.ok) {
                throw new Error('Gemini API Error: ' + response.statusText);
            }

            const data = await response.json();
            const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
            return JSON.parse(rawJson);
        }

        // ============================================
        // Render Analysis Report UI
        // ============================================
        function renderAnalysisReport(result, contractType) {
            const score = result.score || 60;
            if (scoreNumber) scoreNumber.textContent = score + '%';

            // Style score badge
            if (scoreBadge) {
                scoreBadge.className = 'score-circle';
                if (score < 50) {
                    scoreBadge.classList.add('score-risk-high');
                    if (scoreLabel) scoreLabel.textContent = 'تحذير عالي الخطورة: العقد يحتوي على بنود مجحفة تهدد حقوقك وأموالك، لا توقع قبل مراجعة محامٍ.';
                } else if (score < 75) {
                    scoreBadge.classList.add('score-risk-mid');
                    if (scoreLabel) scoreLabel.textContent = 'مستوى متوسط المخاطر: العقد يحتاج إلى تعديلات جوهرية وإعادة صياغة لعدة بنود قبل التوقيع.';
                } else {
                    scoreBadge.classList.add('score-risk-low');
                    if (scoreLabel) scoreLabel.textContent = 'مستوى أمان جيد: الصياغة متوازنة بوجه عام مع بعض الملاحظات البسيطة المستحسنة.';
                }
            }

            // Populate Loopholes
            if (loopholesContainer) {
                loopholesContainer.innerHTML = '';
                const items = result.loopholes || [];
                
                // Sort: critical first, then warning, then safe
                const order = { critical: 1, warning: 2, safe: 3 };
                items.sort((a, b) => (order[a.type] || 4) - (order[b.type] || 4));

                let criticalCount = 0;
                items.forEach(item => {
                    if (item.type === 'critical') criticalCount++;
                    const card = document.createElement('div');
                    card.className = `loophole-card ${item.type}`;
                    
                    let icon = 'fas fa-check-circle';
                    if (item.type === 'critical') icon = 'fas fa-exclamation-triangle';
                    if (item.type === 'warning') icon = 'fas fa-info-circle';

                    card.innerHTML = `
                        <i class="${icon}"></i>
                        <div>
                            <div class="loophole-title">${item.title}</div>
                            <div class="loophole-desc">${item.desc}</div>
                        </div>
                    `;
                    loopholesContainer.appendChild(card);
                });

                // Update WhatsApp consultation link with context
                if (waConsultBtn) {
                    const msg = encodeURIComponent(
                        `مرحباً مؤسسة آل زهران للمحاماة، قمت بفحص عقدي عبر "الفاحص الذكي" وأظهر التقرير درجة أمان (${score}%) وعدد (${criticalCount}) ثغرات قانونية حرجة. أود توكيل المؤسسة لمراجعة وصياغة النسخة النهائية الآمنة.`
                    );
                    waConsultBtn.href = `https://wa.me/201229333957?text=${msg}`;
                }

                // Update Advisory Recommendation
                if (advisoryRecommendation) {
                    if (criticalCount > 0) {
                        advisoryRecommendation.innerHTML = `⚠️ <strong>توصية قاطعة من المجلس الاستشاري:</strong> تم رصد عدد (<strong>${criticalCount}</strong>) ثغرات قانونية جسيمة في هذا العقد. ننصح بالامتناع التام عن تسليم أي مبالغ مالية أو التوقيع على هذا المحرر بصيغته الحالية لحين تعديله بمعرفة محامٍ معتمد تفادياً لضياع الحقوق.`;
                    } else {
                        advisoryRecommendation.innerHTML = `✅ <strong>رأي المجلس الاستشاري:</strong> البنود الأساسية للعقد متوازنة، وننصح فقط بمراجعة صياغة غرامات التأخير وتوثيق العقد بالشهر العقاري لإضفاء الصيغة التنفيذية عليه.`;
                    }
                }
            }
        }

    });
})();
