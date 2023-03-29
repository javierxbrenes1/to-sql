import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

const headers = { "Content-Type": "application/json" };

const getResponse = (statusCode: number, data: unknown) => {
  return NextResponse.json(data, {
    status: statusCode,
    headers,
  });
};

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
      },
      {
        headers: {
          ...headers,
          Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        },
      }
    );

    return getResponse(200, {
      result: response.data.choices[0].message.content,
    });
  } catch (err: unknown) {
    const error = err as AxiosError;
    console.error(`Error with OpenAI API request: ${error.message}`);
    return getResponse(500, {
      //@ts-ignore
      message: error.response?.data?.error?.message || error.message,
    });
  }
}
