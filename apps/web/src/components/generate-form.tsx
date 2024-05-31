"use client";

import Image from "next/image";
import { type SVGProps, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateVideo } from "@/lib/actions";

export function GenerateForm() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleCheckboxChange = (index: any) => {
    setSelectedVideo(index);
  };

  const videoChoices = [
    {
      src: "/subwaysurf.jpg",
      alt: "Subway Surfers",
    },
    {
      src: "/minecraft.png",
      alt: "Minecraft Parkour",
    },
    {
      src: "/gta.png",
      alt: "GTA 5",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-12 md:py-20 lg:py-24">
      <form action={generateVideo} className="grid gap-8 md:gap-12">
        <section>
          <h2 className="text-2xl font-bold mb-4 md:text-3xl">
            Choose a Background Video
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {videoChoices.map((video, index) => (
              <label
                key={index}
                className="relative group cursor-pointer flex items-center space-x-3"
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  name="backgroundVideo"
                  value={index}
                  checked={selectedVideo === index}
                  onChange={() => handleCheckboxChange(index)}
                />
                <div
                  className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                    selectedVideo === index
                      ? "bg-gray-900 border-gray-900 dark:bg-gray-50 dark:border-gray-50"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {selectedVideo === index && (
                    <CheckIcon className="w-4 h-4 text-white dark:text-gray-900" />
                  )}
                </div>
                <div className="flex-1">
                  <Image
                    src={video.src}
                    alt={video.alt}
                    width={300}
                    height={400}
                    className="rounded-lg object-cover w-full aspect-[3/4] group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </label>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4 md:text-3xl">
            Generate Your Video
          </h2>
          <div className="grid gap-4 md:gap-6">
            <div>
              <Label
                htmlFor="duration"
                className="block mb-2 text-sm font-medium"
              >
                Duration
              </Label>
              <Select defaultValue="60" name="videoDuration">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="120">2 minutes</SelectItem>
                  <SelectItem value="180">3 minutes</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="topic" className="block mb-2 text-sm font-medium">
                Topic
              </Label>
              <Input
                id="topic"
                name="videoTopic"
                type="text"
                placeholder="Enter a topic"
              />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Generate Video
            </Button>
          </div>
        </section>
      </form>
    </div>
  );
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
