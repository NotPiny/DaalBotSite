export function GET() {
    return new Response('Hey uhhhh this isnt a 404 but it isnt made yet so here is a link to <a href="/">go home</a>',
        {
            headers: {
                'content-type': 'text/html;charset=UTF-8',
            },
            status: 501,
        }
    )
}