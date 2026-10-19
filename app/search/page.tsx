"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    Search,
    ArrowRight,
    Leaf,
    FileText,
    LayoutDashboard,
    User,
} from "lucide-react";
import { useLanguage } from "../translations/LanguageContext";

type SearchResult = {
    title: string;
    description: string;
    route?: string;
};

type SearchResponse = {
    type: string;
    title: string;
    description: string;
    route?: string;
    results: SearchResult[];
};

export default function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { language } = useLanguage();

    const query = searchParams.get("q") || "";

    const [data, setData] = useState<SearchResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) {
            setLoading(false);
            return;
        }

        const search = async () => {
            try {
                setLoading(true);

                const response = await fetch("/api/universal-search", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query,
                        language,
                    }),
                });

                if (!response.ok) {
                    throw new Error(
                        `Search API error: ${response.status}`
                    );
                }

                const result: SearchResponse =
                    await response.json();

                setData(result);
            } catch (error) {
                console.error("Search error:", error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        search();
    }, [query, language]);

    return (
        <main
            className="
                min-h-screen
                pt-32
                px-4
                md:px-8
                pb-20
                bg-cover
                bg-center
                bg-fixed
            "
            style={{
                backgroundImage: "url('/background.png')",
            }}
        >
            <div
                className="
                    max-w-5xl
                    mx-auto
                    rounded-[2.5rem]
                    p-6
                    md:p-10
                    bg-white/30
                    backdrop-blur-3xl
                    border
                    border-white/50
                    shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                "
            >
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div
                        className="
                            w-12 h-12
                            rounded-2xl
                            bg-green-600
                            flex
                            items-center
                            justify-center
                            text-white
                        "
                    >
                        <Search size={24} />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-black">
                            Search
                        </h1>

                        <p className="text-gray-600">
                            Results for "{query}"
                        </p>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="py-16 text-center">
                        <div
                            className="
                                w-10 h-10
                                mx-auto
                                border-4
                                border-green-200
                                border-t-green-600
                                rounded-full
                                animate-spin
                            "
                        />

                        <p className="mt-4 text-gray-600">
                            KrushiBandhu AI is searching...
                        </p>
                    </div>
                )}

                {/* Results */}
                {!loading && data && (
                    <>
                        {/* Main route */}
                        {data.route && (
                            <button
                                onClick={() =>
                                    router.push(data.route!)
                                }
                                className="
                                    w-full
                                    text-left
                                    p-5
                                    mb-6
                                    rounded-2xl
                                    bg-green-600
                                    text-white
                                    flex
                                    items-center
                                    justify-between
                                    hover:bg-green-700
                                    transition
                                "
                            >
                                <div>
                                    <p className="text-sm opacity-80">
                                        Open page
                                    </p>

                                    <p className="text-xl font-bold">
                                        {data.title}
                                    </p>
                                </div>

                                <ArrowRight size={24} />
                            </button>
                        )}

                        {/* Description */}
                        {data.description && (
                            <p className="text-gray-700 mb-6">
                                {data.description}
                            </p>
                        )}

                        {/* Result list */}
                        <div className="space-y-4">
                            {data.results?.map(
                                (result, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (
                                                result.route
                                            ) {
                                                router.push(
                                                    result.route
                                                );
                                            }
                                        }}
                                        className="
                                            w-full
                                            text-left
                                            p-5
                                            rounded-2xl
                                            bg-white/40
                                            border
                                            border-white/60
                                            hover:bg-white/60
                                            transition
                                            flex
                                            items-start
                                            gap-4
                                        "
                                    >
                                        {/* Icon */}
                                        <div
                                            className="
                                                w-11
                                                h-11
                                                shrink-0
                                                rounded-xl
                                                bg-green-100
                                                text-green-700
                                                flex
                                                items-center
                                                justify-center
                                            "
                                        >
                                            {data.type ===
                                            "CROP" ? (
                                                <Leaf size={21} />
                                            ) : data.type ===
                                              "SCHEME" ? (
                                                <FileText size={21} />
                                            ) : data.type ===
                                              "NAVIGATION" ? (
                                                <LayoutDashboard
                                                    size={21}
                                                />
                                            ) : (
                                                <User size={21} />
                                            )}
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1">
                                            <h2 className="font-bold text-black">
                                                {result.title}
                                            </h2>

                                            <p className="text-sm text-gray-600 mt-1">
                                                {
                                                    result.description
                                                }
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        {result.route && (
                                            <ArrowRight
                                                size={20}
                                                className="
                                                    text-gray-500
                                                    mt-2
                                                "
                                            />
                                        )}
                                    </button>
                                )
                            )}
                        </div>

                        {/* No results */}
                        {(!data.results ||
                            data.results.length === 0) && (
                            <div className="text-center py-12">
                                <p className="text-gray-600">
                                    No results found.
                                </p>
                            </div>
                        )}
                    </>
                )}

                {/* Error / no data */}
                {!loading && !data && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">
                            Unable to perform search.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}