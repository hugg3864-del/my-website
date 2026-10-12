// ============================================
// Serverless Function Blueprint (Vercel / Node.js)
// Enterprise AI Proxy: Safe Gemini 1.5 Legal Analysis
// ============================================

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { contractText, contractType } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'Server configuration error: GEMINI_API_KEY missing' });
        }

        const prompt = `أنت تمثل رئيس الدائرة المدنية بالمجلس الاستشاري الأعلى لمؤسسة آل زهران للمحاماة في مصر.
قم بفحص نص العقد التالي بدقة متناهية طبقاً للقانون المدني وقانون التجارة المصري وأحكام محكمة النقض.
نوع العقد: ${contractType}
نص العقد المراد فحصه:
"""
${contractText}
"""

المطلوب: استخراج تقييم أمان العقد كنسبة مئوية (Score من 0 إلى 100)، وقائمة بالثغرات القانونية الحرجة (critical)، والتنبيهات (warning)، والبنود الصحيحة (safe).
أجب حصراً بصيغة JSON التالية دون أي نصوص خارج الـ JSON:
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

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        if (!response.ok) {
            const errBody = await response.text();
            return res.status(response.status).json({ error: 'Gemini upstream error', details: errBody });
        }

        const data = await response.json();
        const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsed = JSON.parse(rawJson);

        return res.status(200).json(parsed);

    } catch (error) {
        console.error('API Handler Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}
