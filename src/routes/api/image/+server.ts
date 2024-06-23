import type { RequestHandler, RequestEvent } from '@sveltejs/kit';
import axios from 'axios';

export const POST: RequestHandler = async (req: RequestEvent) => {
    const body = await req.request.json();

    if (!body?.image) return new Response(`You need a image 💀`, {
        status: 400,
    })

    const image: string = body.image;

    const form = new FormData();
    // @ts-ignore - Why just why
    form.append("image", image.split(';base64,').pop());

    const options = {
        method: 'POST',
        url: `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`,
        headers: {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'},
        data: form,
    };

    try {
        const response = await axios.request(options);

        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // @ts-ignore
        console.error(error.response);

        return new Response(`Something went wrong during request`, {
            status: 500,
        });
    }
};