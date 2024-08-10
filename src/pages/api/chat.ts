import { NextApiRequest, NextApiResponse } from 'next';
import { Ollama } from 'ollama';

const ollama = new Ollama();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { message } = req.body;

    try {
        const response = await ollama.generate({
            model: 'openhermes2.5-mistral',
            prompt: message,
            options: {
                num_predict: 150,
                temperature: 0.7,
                top_p: 0.9,
            }
        });

        console.log('Ollama response:', response);

        res.status(200).json({ response: response.response });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ error: 'Error generating response' });
    }
}