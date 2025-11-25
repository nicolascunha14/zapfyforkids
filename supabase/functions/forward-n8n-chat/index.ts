import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const N8N_WEBHOOK_URL = 'https://nicolascunha.app.n8n.cloud/webhook/fc8a5af3-6457-4fc6-84b2-9d0fb8a23132';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const contentType = req.headers.get('content-type') || '';
    let payload: any = {};

    if (contentType.includes('application/json')) {
      payload = await req.json();
    } else if (contentType.includes('text/plain')) {
      const text = await req.text();
      try { payload = JSON.parse(text); } catch { payload = { raw: text }; }
    } else {
      try { payload = await req.json(); } catch { payload = {}; }
    }

    const { message, conversation_id, timestamp, source } = payload || {};

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid message' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const forwardBody = {
      message,
      conversation_id: conversation_id || `chat_${Date.now()}`,
      timestamp: timestamp || new Date().toISOString(),
      source: source || 'zapfy_chat',
      meta: {
        ip: req.headers.get('x-forwarded-for') || null,
        ua: req.headers.get('user-agent') || null,
      },
    };

    const forwardResp = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(forwardBody),
    });

    const forwardText = await forwardResp.text();
    console.log('Forwarded to N8N', { status: forwardResp.status, snippet: forwardText.slice(0, 200) });

    // Tentar parsear a resposta do N8N
    let n8nResponse;
    try {
      n8nResponse = JSON.parse(forwardText);
    } catch {
      n8nResponse = { message: forwardText };
    }

    return new Response(
      JSON.stringify({ 
        ok: true, 
        status: forwardResp.status,
        response: n8nResponse
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('forward-n8n-chat error:', error);
    return new Response(
      JSON.stringify({ ok: false, error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});