const API_KEY = process.env.EXPO_PUBLIC_CLAUDE_API_KEY ?? '';

// プレースホルダーや未設定の場合はfalse
export const isApiKeyConfigured =
  API_KEY.length > 20 &&
  !API_KEY.includes('XXXXXXXXXX') &&
  API_KEY.startsWith('sk-ant-');

export async function getAIExplanation(
  question: string,
  correctAnswer: string,
  staticExplanation: string,
): Promise<string> {
  if (!isApiKeyConfigured) {
    throw new Error('API_KEY_NOT_SET');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      messages: [
        {
          role: 'user',
          content: `あなたは証券アナリスト試験（CMA）の財務諸表分析の講師です。
以下の問題について、初学者にも分かりやすく日本語で解説してください。

【問題】
${question}

【正解】
${correctAnswer}

【基本解説】
${staticExplanation}

上記を踏まえ、以下を含む詳しい解説を200字以内で書いてください：
- なぜその答えが正解か
- 公式や考え方のポイント
- 試験で役立つ覚え方`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content[0].text as string;
}
