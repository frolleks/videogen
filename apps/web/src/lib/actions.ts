"use server";

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function generateVideo(formData: FormData) {
  const rawFormData = {
    selectedVideo: formData.get("backgroundVideo"),
    videoTopic: formData.get("videoTopic"),
    videoDuration: formData.get("videoDuration"),
  };

  let backgroundVideo;

  if ((rawFormData.selectedVideo as string) === "0") {
    backgroundVideo = "subwaysurf";
  } else if ((rawFormData.selectedVideo as string) === "1") {
    backgroundVideo = "minecraft";
  } else if ((rawFormData.selectedVideo as string) === "2") {
    backgroundVideo = "gta";
  }

  const script = await generateScript(
    rawFormData.videoTopic as string,
    rawFormData.videoDuration as string
  );

  console.log(backgroundVideo, script);
}

async function generateScript(topic: string, duration: string) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Create a script for a video with the topic: ${topic}, and the duration being ${duration} seconds long.`,
      },
    ],
    model: "lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF",
  });

  return chatCompletion.choices[0].message.content?.replaceAll("\n", " ");
}
