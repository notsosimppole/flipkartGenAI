import admin from "firebase-admin";
import { adminDb } from "@/firebase/firebaseAdmin";
import { query } from "@/lib/query";

const gen_prompt =
    'Carefully look at the conversation. Based on the latest message of assistant,figure out whether there is need for a prompt which I can pass on to my cloth generation model. If you dont think a prompt is required based on latest response, just reply "No", else reply with "Yes", and then write the corresponding prompt.If you are writing the prompt, it should not be too long, and take care of specifying the gender, but not necessarily venue just describe the appearance of the outfit. the prompt should be based particularly on latest response. Format - "Yes. Prompt:';

const system_prompt =
    'You are my personal cloth suggestion assistant. Suggest me choice from clothes based on user queries. Keep responses short and concise Start with something like "Hello..."';

export async function POST(request: Request) {
    const { prompt, outboundMessages, id, model, session } =
        await request.json();

    if (!prompt) {
        return new Response(
            JSON.stringify({ response: "Please provide a prompt!" }),
            {
                status: 400,
            }
        );
    }

    if (!id) {
        return new Response(
            JSON.stringify({ response: "Please provide a valid Chat ID" }),
            {
                status: 400,
            }
        );
    }

    // ChatGPT Query
    const chatOutboundMessages: GPTMessage[] = [
        {
            role: "system",
            content: system_prompt,
        },
        ...outboundMessages,
        {
            role: "user",
            content: prompt,
        },
    ];
    const chatResponse = await query(chatOutboundMessages, id, model);
    const chatResponseSendToFrontend: GPTMessage[] = [
        ...chatOutboundMessages,
        {
            role: "assistant",
            content: chatResponse as string,
        },
    ];

    const genChatOutboundMessages: GPTMessage[] = [
        {
            role: "system",
            content: gen_prompt,
        },
        ...chatResponseSendToFrontend,
    ];
    const genChatResponse = await query(genChatOutboundMessages, id, model);

    const chatMessage: Message = {
        text: chatResponse || "ChicChat could not find a response",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: "ChicChat",
            name: "ChicChat",
            avatar: "/logo.png",
        },
    };

    await adminDb
        .collection("users")
        .doc(session?.user?.email)
        .collection("chats")
        .doc(id)
        .collection("messages")
        .add(chatMessage);

    return new Response(
        JSON.stringify({
            response: chatMessage.text,
            gen: genChatResponse,
        }),
        {
            status: 200,
        }
    );
}
