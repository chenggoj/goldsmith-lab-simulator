// Cloudflare Worker — OpenRouter proxy for Goldsmith Lab Simulator
// Deploy at: https://dash.cloudflare.com -> Workers & Pages -> Create Worker
//
// Required secret (set via wrangler or dashboard):
//   wrangler secret put OPENROUTER_API_KEY
//   -> paste your sk-or-v1-... key when prompted
//
// After deploy, copy your worker URL into goldsmith-lab-simulator-online.html:
//   const PROXY_URL = 'https://your-worker.your-name.workers.dev';

const ALLOWED_ORIGIN = '*'; // restrict to your GitHub Pages domain for extra safety
                             // e.g. 'https://chenggoj.github.io'

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch (_) {
      return new Response('Bad Request', { status: 400 });
    }

    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://chenggoj.github.io',
        'X-Title': 'Goldsmith Lab Simulator',
      },
      body: JSON.stringify(body),
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('Content-Type') ?? 'text/event-stream',
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Cache-Control': 'no-store',
      },
    });
  },
};
