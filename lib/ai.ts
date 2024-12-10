import Anthropic from "@anthropic-ai/sdk";
import config from "@/app/config";

export async function generateSummary(content: string) {
  const client = new Anthropic({
    apiKey: config.anthropicApiKey,
  });

  const messageText = `Please provide a concise summary of this article:

  ${content}

  Also, provide 3-5 relevant topics/tags that this article would fall under.
  Output the response in JSON format. Follow this schema:

  | Column     | Type     | Description          |
  | ---------- | -------- | -------------------- |
  | summary    | text     | AI-generated summary |
  | tags       | string[] | Article categories   |

  Here is an example of the output:
  {
      "summary": "This article discusses the impact of artificial intelligence on modern healthcare, focusing on recent breakthroughs in diagnostic imaging and personalized medicine. It explores how machine learning algorithms are improving early disease detection and treatment planning while addressing concerns about data privacy and the doctor-patient relationship.",
      "tags": ["artificial intelligence", "healthcare", "medical technology", "machine learning"]
  }
  `;

  try {
    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      temperature: 0,
      system:
        "You are a professional summarizer. Provide clear, concise summaries while maintaining key information.",
      messages: [
        {
          role: "user",
          content: messageText,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";
    const responseData = JSON.parse(responseText);

    // Create and return summary object
    const result = {
      summary: responseData.summary,
      tags: Array.isArray(responseData.tags)
        ? responseData.tags.join(",")
        : responseData.tags,
    };

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error generating summary: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating summary");
  }
}
