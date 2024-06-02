import type { RequestEvent } from "@sveltejs/kit";
import axios from "axios";

export async function GET(req: RequestEvent) {
    const paste = req.params.paste;

    const res = await axios.get(`https://termbin.com/${paste}`);

    if (res.status !== 200) {
        return new Response('Error: No data provided', { status: 400 });
    }

    const data = res.data;
    return new Response(data, { status: 200, headers: { 'Content-Type': 'text/plain' } });
}