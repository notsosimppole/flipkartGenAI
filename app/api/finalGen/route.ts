async function query(data: string) {
    if (data == "No."){
        return ""
    }
    const response = await fetch(
        "https://api-inference.huggingface.co/models/MohamedRashad/diffusion_fashion",
        {
            headers: {
                Authorization: "Bearer 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",
            },
            method: "POST",
            body: data,
        }
    );
    console.log(data);
    const result = await response.blob();
    return result;
}

export async function POST(request: Request) {
    const { prompt, session, id } = await request.json();

    if (!prompt || !session || !id) {
        return new Response(
            JSON.stringify({ response: "Please provide a prompt!" }),
            {
                status: 400,
            }
        );
    }

    const queryPrompt = { inputs: prompt };

    const response = await query(JSON.stringify(queryPrompt));

    return new Response(response);
}
