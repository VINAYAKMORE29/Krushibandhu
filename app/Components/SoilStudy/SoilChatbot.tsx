"use client";
import { useEffect, useRef, useState } from "react";
import {
  Bot, Send, User, Volume2, Square, Loader2, Mic, Camera,X,
} from "lucide-react";
import { useLanguage } from "@/app/translations/LanguageContext";
import type { SoilData } from "@/app/soil/soilTypes";
type Message = {
  role: "user" | "assistant";
  text: string;
};
type Props = {
  soilData: SoilData;
  crop?: string;
};
export default function SoilChatbot({ soilData, crop }: Props) {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [talkMode, setTalkMode] = useState(false);
  const [listening, setListening] = useState(false);
const loadingRef = useRef(false);
const listeningRef = useRef(false);
const speakingRef = useRef(false);
const recognitionRef = useRef<any>(null);
  const [selectedImage, setSelectedImage] =
  useState<File | null>(null);
  const talkModeRef = useRef(false);

const [imagePreview, setImagePreview] =
  useState<string | null>(null);

const fileInputRef =
  useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
 const getWelcomeMessage = () => {
  if (language === "hi") {
    return "नमस्ते! मैं कृषिबंधु A I हूँ। मैं आपकी मिट्टी की जानकारी समझने और मिट्टी से जुड़े सवालों के जवाब देने में मदद कर सकता हूँ।";
  }

  if (language === "mr") {
    return "नमस्कार! मी कृषिबंधु A I आहे. मी तुमच्या मातीची माहिती समजून घेण्यास आणि मातीशी संबंधित प्रश्नांची उत्तरे देण्यास मदत करू शकतो.";
  }

  return "Hello! I am KrushiBandhu A I. I can help you understand your soil readings and answer soil-related questions.";
};
  useEffect(() => {
    setMessages([{ role: "assistant", text: getWelcomeMessage() }]);
  }, [language]);

  const handleImageSelect = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image.");
    return;
  }

  // Optional size limit
  if (file.size > 10 * 1024 * 1024) {
    alert("Please select an image smaller than 10 MB.");
    return;
  }

  setSelectedImage(file);

  const previewUrl = URL.createObjectURL(file);
  setImagePreview(previewUrl);

  // Allows selecting the same image again later
  event.target.value = "";
};

const removeSelectedImage = () => {
  if (imagePreview) {
    URL.revokeObjectURL(imagePreview);
  }

  setSelectedImage(null);
  setImagePreview(null);
};

const fileToBase64 = (
  file: File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

const sendMessage = async () => {
  const trimmedMessage = input.trim();

const messageToAI =
  trimmedMessage ||
  (language === "hi"
    ? "इस तस्वीर में दिखाई दे रही समस्या का विश्लेषण करें और किसान को सरल भाषा में बताएं कि क्या ध्यान देना चाहिए।"
    : language === "mr"
      ? "या फोटोमध्ये दिसत असलेल्या समस्येचे विश्लेषण करा आणि शेतकऱ्याने काय लक्षात घ्यावे ते सोप्या भाषेत सांगा."
      : "Analyze the problem visible in this image and explain in simple language what the farmer should check.");
 

  if (
    (!input.trim() && !selectedImage) ||
    loading
  ) {
    return;
  }

  let imageData: string | null = null;

  try {
    if (selectedImage) {
      imageData =
        await fileToBase64(selectedImage);
    }

    setMessages((previous) => [
  ...previous,
  {
    role: "user",
    text:
      trimmedMessage ||
      (language === "hi"
        ? "📷 तस्वीर भेजी गई"
        : language === "mr"
          ? "📷 फोटो पाठवला"
          : "📷 Image uploaded"),
  },
]);
    setInput("");
    setLoading(true);

    const response = await fetch(
      "/api/soil-chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          
           message: messageToAI,
          soilData,
          crop,
          language,
          image: imageData,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error ||
          "Something went wrong."
      );
    }

    setMessages((previous) => [
      ...previous,
      {
        role: "assistant",
        text: data.answer,
      },
    ]);

    removeSelectedImage();

  } catch (error) {
    console.error(error);

    const errorMessage =
      language === "hi"
        ? "क्षमा करें, तस्वीर का विश्लेषण नहीं हो सका।"
        : language === "mr"
          ? "माफ करा, फोटोचे विश्लेषण करता आले नाही."
          : "Sorry, I could not analyze the image.";

    setMessages((previous) => [
      ...previous,
      {
        role: "assistant",
        text: errorMessage,
      },
    ]);

  } finally {
    setLoading(false);
  }
};

 
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };
  const getSpeechLanguage = () => {
    if (language === "hi") return "hi-IN";
    if (language === "mr") return "mr-IN";
    return "en-IN";
  };

  const speakText = (text: string) => {
  if (typeof window === "undefined") return;

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = getSpeechLanguage();
  speech.rate = 1.0;
  speech.pitch = 1;

  speech.onstart = () => {
    speakingRef.current = true;
    setSpeaking(true);
  };

  speech.onend = () => {
    speakingRef.current = false;
    setSpeaking(false);

    // AI finished speaking -> listen for the farmer again
    if (talkModeRef.current) {
      setTimeout(() => {
        startTalkToAI();
      }, 700);
    }
  };

  speech.onerror = () => {
    speakingRef.current = false;
    setSpeaking(false);

    if (talkModeRef.current) {
      setTimeout(() => {
        startTalkToAI();
      }, 700);
    }
  };

  window.speechSynthesis.speak(speech);
};

  const stopSpeaking = () => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };
  const startVoiceInput = async () => {
  if (typeof window === "undefined") return;

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "Voice input is not supported in this browser."
    );
    return;
  }

  // Check microphone access first
  try {
    const stream =
      await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

    // We only needed the microphone permission.
    // Stop the test stream before starting speech recognition.
    stream.getTracks().forEach((track) => track.stop());
  } catch (error) {
    console.warn("Microphone access failed:", error);

    alert(
      "Microphone access is blocked or no microphone is available. Please check your browser and Windows microphone permissions."
    );

    return;
  }

  const recognition: any = new SpeechRecognition();

  recognition.lang = getSpeechLanguage();
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onresult = (
    event: SpeechRecognitionEvent
  ) => {
    const transcript =
      event.results[0][0].transcript;

    setInput(transcript);
  };

  recognition.onerror = (event: any) => {
    console.warn(
      "Speech recognition:",
      event.error
    );

    if (event.error === "audio-capture") {
      alert(
        "Speech recognition could not access the microphone. Please check your microphone settings."
      );
    }
  };

  try {
    recognition.start();
  } catch (error) {
    console.warn(
      "Could not start speech recognition:",
      error
    );
  }
};

const startTalkToAI = () => {
  if (typeof window === "undefined") return;

  // Always use refs inside async callbacks
  if (!talkModeRef.current) return;
  if (loadingRef.current) return;
  if (listeningRef.current) return;
  if (speakingRef.current) return;

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "Voice conversation is not supported in this browser."
    );
    return;
  }

  const recognition: any = new SpeechRecognition();

  recognitionRef.current = recognition;

  recognition.lang = getSpeechLanguage();

  // One sentence at a time
  recognition.continuous = false;

  // Only final result
  recognition.interimResults = false;

  recognition.maxAlternatives = 1;

  listeningRef.current = true;
  setListening(true);

  recognition.onstart = () => {
    console.log("🎤 Listening...");
    listeningRef.current = true;
    setListening(true);
  };

  recognition.onresult = async (
    event: SpeechRecognitionEvent
  ) => {
    const transcript =
      event.results[0][0].transcript.trim();

    console.log("🎤 Farmer said:", transcript);

    listeningRef.current = false;
    setListening(false);

    if (!transcript) {
      if (talkModeRef.current) {
        setTimeout(() => {
          startTalkToAI();
        }, 500);
      }
      return;
    }

    await sendTalkMessage(transcript);
  };

  recognition.onerror = (event: any) => {
    console.warn(
      "🎤 Speech recognition error:",
      event.error
    );

    listeningRef.current = false;
    setListening(false);

    // Don't restart if user intentionally stopped talking
    if (!talkModeRef.current) return;

    // Some errors should simply retry
    if (
      event.error === "no-speech" ||
      event.error === "audio-capture" ||
      event.error === "network" ||
      event.error === "aborted"
    ) {
      setTimeout(() => {
        startTalkToAI();
      }, 1000);
    }
  };

  recognition.onend = () => {
    console.log("🎤 Recognition ended");

    listeningRef.current = false;
    setListening(false);

    // If no result/error caused the next cycle,
    // continue listening.
    if (
      talkModeRef.current &&
      !loadingRef.current &&
      !speakingRef.current
    ) {
      setTimeout(() => {
        startTalkToAI();
      }, 500);
    }
  };

  try {
    recognition.start();
  } catch (error) {
    console.warn(
      "Could not start speech recognition:",
      error
    );

    listeningRef.current = false;
    setListening(false);
  }
};

const sendTalkMessage = async (
  transcript: string
) => {
  if (
    !transcript.trim() ||
    loadingRef.current
  ) {
    return;
  }

  setMessages((previous) => [
    ...previous,
    {
      role: "user",
      text: transcript,
    },
  ]);

  loadingRef.current = true;
  setLoading(true);

  try {
    const response = await fetch(
      "/api/soil-chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: transcript,
          soilData,
          crop,
          language,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error ||
        "Something went wrong."
      );
    }

    const answer =
      data.answer ||
      "I could not generate an answer.";

    setMessages((previous) => [
      ...previous,
      {
        role: "assistant",
        text: answer,
      },
    ]);

    // IMPORTANT:
    // API request is finished before speaking starts
    loadingRef.current = false;
    setLoading(false);

    if (talkModeRef.current) {
      speakText(answer);
    } else {
      speakText(answer);
    }

  } catch (error) {
    console.error(
      "Talk to AI error:",
      error
    );

    const errorMessage =
      language === "hi"
        ? "क्षमा करें, मैं अभी जवाब नहीं दे सका।"
        : language === "mr"
          ? "माफ करा, मी सध्या उत्तर देऊ शकलो नाही."
          : "Sorry, I could not generate a response.";

    setMessages((previous) => [
      ...previous,
      {
        role: "assistant",
        text: errorMessage,
      },
    ]);

    loadingRef.current = false;
    setLoading(false);

    if (talkModeRef.current) {
      speakText(errorMessage);
    }
  }
};

const toggleTalkMode = () => {
  if (talkMode) {
    talkModeRef.current = false;

    setTalkMode(false);
    setListening(false);

    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
    }

    setSpeaking(false);

    return;
  }

  talkModeRef.current = true;
  setTalkMode(true);

  setTimeout(() => {
    startTalkToAI();
  }, 300);
};

  return (
    <section className="
      w-full max-w-4xl mx-auto rounded-[2rem]
      bg-white/30 backdrop-blur-2xl
      border border-white/60
      shadow-[0_20px_60px_rgba(0,0,0,0.12)]
      overflow-hidden
    ">
      <div className="
  flex items-center justify-between
  px-5 py-4 border-b border-white/50
  gap-4
">
  {/* LEFT: AI icon + name */}
  <div className="flex items-center gap-3 min-w-0">
    <div className="
      shrink-0
      w-11 h-11 rounded-2xl
      bg-green-600 text-white
      flex items-center justify-center
    ">
      <Bot size={23} />
    </div>

    <div className="min-w-0">
      <h2 className="font-bold text-lg text-black">
        KrushiBandhu AI
      </h2>

      <p className="text-xs text-gray-600">
        {language === "hi"
          ? "मिट्टी सहायक"
          : language === "mr"
            ? "माती सहाय्यक"
            : "Soil Assistant"}
      </p>
    </div>
  </div>

  {/* RIGHT: Talk to AI + Stop Speaking */}
  <div className="flex items-center gap-2 shrink-0">

    {/* Talk to AI */}
    <button
      type="button"
      onClick={toggleTalkMode}
      className={`
        flex items-center gap-2
        px-3 py-2
        rounded-xl
        text-sm font-medium
        transition
        whitespace-nowrap
        ${
          talkMode
            ? "bg-green-600 text-white"
            : "bg-green-100 text-green-700 hover:bg-green-200"
        }
      `}
    >
      <Volume2 size={17} />

      {talkMode
        ? language === "hi"
          ? "बातचीत बंद करें"
          : language === "mr"
            ? "संवाद बंद करा"
            : "Stop Talking"
        : language === "hi"
          ? "AI से बात करें"
          : language === "mr"
            ? "AI शी बोला"
            : "Talk to AI"}
    </button>

    {/* Stop AI Speaking */}
    {speaking && (
      <button
        type="button"
        onClick={stopSpeaking}
        className="
          flex items-center gap-2
          px-3 py-2
          rounded-xl
          bg-red-100
          text-red-700
          text-sm font-medium
          whitespace-nowrap
        "
      >
        <Square size={15} />

        {language === "hi"
          ? "रोकें"
          : language === "mr"
            ? "थांबवा"
            : "Stop"}
      </button>
    )}
  </div>
</div>
      <div className="px-5 pt-4">
        <div className="
          grid grid-cols-2 md:grid-cols-4 gap-2
        ">
          <SoilValue label={
            language === "hi"
  ? "नमी"
  : language === "mr"
    ? "मातीतील ओलावा"
    : "Moisture"
          } value={`${soilData.moisture}%`} />
          <SoilValue label={
            language === "hi"
  ? "तापमान"
  : language === "mr"
    ? "तापमान"
    : "Temperature"
          } value={`${soilData.temperature}°C`} />
          <SoilValue label="pH" value={soilData.ph} />
          <SoilValue
            label="EC"
            value={`${soilData.ec} mS/cm`}
          />
        </div>
      </div>
      <div className="
        h-[450px] overflow-y-auto px-5 py-5 space-y-4
      ">
        {messages.map((message, index) => {
          const isUser = message.role === "user";
          return (
            <div
              key={index}
              className={`
                flex gap-3
                ${isUser ? "justify-end" : "justify-start"}
              `}
            >
              {!isUser && (
                <div className="
                  shrink-0 w-9 h-9 rounded-xl bg-green-100
                  text-green-700 flex items-center justify-center
                ">
                  <Bot size={18} />
                </div>
              )}
              <div className={`
                max-w-[80%] rounded-2xl px-4 py-3
                text-sm leading-6
                ${isUser
                  ? "bg-green-600 text-white rounded-br-md"
                  : "bg-white/60 text-gray-800 rounded-bl-md"
                }
              `}>
              <p className="whitespace-pre-wrap">
  {message.text
    .replace(/\*\*/g, "")
    .replace(/^\s*\*\s*/gm, "• ")}
</p>
                {!isUser && (
                  <button
                    onClick={() => speakText(message.text)}
                    className="
                      mt-2 flex items-center gap-1 text-xs
                      text-green-700 hover:text-green-900
                    "
                  >
                    <Volume2 size={14} />
                    {language === "hi"
  ? "सुनें"
  : language === "mr"
    ? "ऐका"
    : "Listen"}
                  </button>
                )}
              </div>
              {isUser && (
                <div className="
                  shrink-0 w-9 h-9 rounded-xl bg-green-600
                  text-white flex items-center justify-center
                ">
                  <User size={18} />
                </div>
              )}
            </div>
          );
        })}
        {loading && (
          <div className="flex items-center gap-3">
            <div className="
              w-9 h-9 rounded-xl bg-green-100 text-green-700
              flex items-center justify-center
            ">
              <Bot size={18} />
            </div>
            <div className="
              px-4 py-3 rounded-2xl bg-white/60 text-gray-600
            ">
              <Loader2 size={18} className="animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="px-4 pb-4">

        {imagePreview && (
  <div className="mb-3 relative w-fit">
    <img
      src={imagePreview}
      alt="Selected soil/crop"
      className="
        w-24 h-24
        object-cover
        rounded-xl
        border border-white/70
        shadow
      "
    />

    <button
      type="button"
      onClick={removeSelectedImage}
      className="
        absolute -top-2 -right-2
        w-6 h-6
        rounded-full
        bg-red-500
        text-white
        flex items-center justify-center
        shadow
      "
    >
      <X size={14} />
    </button>
  </div>
)}

        <div className="
          flex items-center gap-2 p-2 rounded-2xl
          bg-white/60 border border-white/70
        ">

          <input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  capture="environment"
  onChange={handleImageSelect}
  className="hidden"
/>

<button
  type="button"
  onClick={() =>
    fileInputRef.current?.click()
  }
  className="
    shrink-0 w-10 h-10 rounded-xl
    flex items-center justify-center
    text-green-700 hover:bg-green-100
    transition
  "
  title={
    language === "hi"
      ? "तस्वीर लें"
      : language === "mr"
        ? "फोटो काढा"
        : "Take a photo"
  }
>
  <Camera size={19} />
</button>

          <button
            type="button"
            onClick={startVoiceInput}
            className="
              shrink-0 w-10 h-10 rounded-xl
              flex items-center justify-center
              text-green-700 hover:bg-green-100
            "
          >
            <Mic size={19} />
          </button>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
           placeholder={
  language === "hi"
    ? "अपनी मिट्टी के बारे में पूछें..."
    : language === "mr"
      ? "तुमच्या मातीबद्दल विचारा..."
      : "Ask about your soil..."
}
            className="
              flex-1 bg-transparent outline-none px-2
              text-sm text-black placeholder:text-gray-500
            "
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={loading ||
              (!selectedImage && !input.trim())}
            className="
              shrink-0 w-10 h-10 rounded-xl bg-green-600 text-white
              flex items-center justify-center
              disabled:opacity-40 disabled:cursor-not-allowed
              hover:bg-green-700 transition
            "
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
function SoilValue({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="
      rounded-xl bg-white/35 border border-white/50
      px-3 py-2
    ">
      <p className="text-[11px] text-gray-500">{label}</p>
      <p className="font-bold text-sm text-black">{value}</p>
    </div>
  );
}