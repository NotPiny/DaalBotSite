import type { RequestEvent } from "@sveltejs/kit";

export async function GET(req: RequestEvent) {
    const data = req.url.searchParams.get('data') ?? 'error';

    if (data === 'error') {
        return new Response('Error: No data provided', { status: 400 });
    }

    // Data is a base64 encoded string
    const decoded = Buffer.from(data, 'base64').toString('utf-8');

    const json = JSON.parse(decoded);

    const date = new Date();
    const createdAt = json.ts;

    const diff = date.getTime() - createdAt;

    if (diff > 1000 * 60 * 60 * 24 * 7) {
        return new Response('', {
            status: 301,
            headers: {
                'Location': 'https://daalbot.xyz/Dashboard/Error?e=expiredPaste'
            }
        });
    }

    let pasteLink = `/Dashboard/Other/logs/view?src=${encodeURIComponent(json.termbin.replace('\n', '').replace(' ', '')).replace('https://termbin.com/', '')}` // Remove random characters that somehow get added

    if (req.url.searchParams.get('raw') == '1') {
        pasteLink += '&raw=1';
    }

    // Send HTTP 200 with a basic html shell and a meta refresh to the display link
    return new Response(`
        <!DOCTYPE html>
        <html>
            <script>
                window.location.replace("${pasteLink}");
            </script>

            <noscript>
                <meta http-equiv="refresh" content="1;url=${pasteLink}">
            </noscript>

            <a href="${pasteLink}">Click here if you are not redirected</a>
        </html>
    `, { status: 200, headers: { 'Content-Type': 'text/html' } });
}