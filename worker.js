export default {
  async fetch(request) {
    const ALLOWED_ORIGINS = new Set([
      "https://easybook.chichiboo.link",
      "http://localhost:5500",
      "http://127.0.0.1:5500"
    ]);

    const origin = request.headers.get("Origin") || "";
    const isAllowedOrigin = !origin || ALLOWED_ORIGINS.has(origin);

    const corsHeaders = {
      "Access-Control-Allow-Origin": isAllowedOrigin ? (origin || "*") : "null",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      "Vary": "Origin"
    };

    if (request.method === "OPTIONS") {
      if (!isAllowedOrigin) {
        return new Response("Access Denied: Unauthorized Domain", { status: 403, headers: corsHeaders });
      }
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (!isAllowedOrigin) {
      return new Response("Access Denied: Unauthorized Domain", { status: 403, headers: corsHeaders });
    }

    const requestUrl = new URL(request.url);
    const rawTarget = requestUrl.searchParams.get("url");
    if (!rawTarget) {
      return new Response("Usage: ?url=https://...", { status: 400, headers: corsHeaders });
    }

    let target;
    try {
      target = new URL(rawTarget);
    } catch {
      return new Response("Invalid target URL", { status: 400, headers: corsHeaders });
    }

    if (target.protocol !== "https:" && target.protocol !== "http:") {
      return new Response("Only http/https URLs are allowed", { status: 400, headers: corsHeaders });
    }

    try {
      const upstream = await fetch(target.toString(), {
        method: "GET",
        redirect: "follow",
        headers: {
          "Accept": "application/pdf,application/octet-stream;q=0.9,*/*;q=0.5",
          "User-Agent": "easybook-worker/1.0"
        }
      });

      const headers = new Headers(upstream.headers);
      Object.entries(corsHeaders).forEach(([k, v]) => headers.set(k, v));
      headers.delete("set-cookie");

      return new Response(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers
      });
    } catch (e) {
      return new Response(`Proxy Error: ${e instanceof Error ? e.message : String(e)}`, {
        status: 500,
        headers: corsHeaders
      });
    }
  }
};
