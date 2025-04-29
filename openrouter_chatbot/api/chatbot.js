export default async function handler(req, res) {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return;
    }

    const userMessage = req.body.message;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "openrouter/cinematika-7b",
            messages: [
                { role: "system", content: "You are a friendly assistant. Be helpful, concise, and human-like." },
                { role: "user", content: userMessage }
            ],
            max_tokens: 100
        })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content.trim() });
}
