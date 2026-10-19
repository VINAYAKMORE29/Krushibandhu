"use client";

import Link from "next/link";
import { routes } from "../../routes";
import { useState, useEffect } from "react";

import {
    Search,
    Bell,
    MoreVertical,
    X,
    User,
    Smartphone,
    Settings,
    HelpCircle,
    LogOut,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../translations/LanguageContext";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [username, setUsername] = useState("User");
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();
    const pathname = usePathname();

    // ---------------------------------------
    // USERNAME
    // ---------------------------------------
    useEffect(() => {
        localStorage.setItem("username", "VM");

        const storedUser = localStorage.getItem("username");

        if (storedUser) {
            setUsername(storedUser);
        }
    }, []);

    // ---------------------------------------
    // SEARCH
    // ---------------------------------------
   useEffect(() => {
    if (!menuOpen && !profileMenuOpen) return;

    const handleOutsideClick = (event: PointerEvent) => {
        const target = event.target;

        if (!(target instanceof Node)) {
            return;
        }

        const sidebar = document.querySelector("[data-sidebar]");
        const navbar = document.querySelector("[data-navbar]");
        const profileMenu = document.querySelector("[data-profile-menu]");

        if (sidebar?.contains(target)) {
            return;
        }

        if (navbar?.contains(target)) {
            return;
        }

        if (profileMenu?.contains(target)) {
            return;
        }

        setMenuOpen(false);
        setProfileMenuOpen(false);
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
        document.removeEventListener(
            "pointerdown",
            handleOutsideClick
        );
    };
}, [menuOpen, profileMenuOpen]);

    // ---------------------------------------
    // OUTSIDE CLICK
    // ---------------------------------------
    useEffect(() => {
        if (!menuOpen && !profileMenuOpen) {
            return;
        }

        const handleOutsideClick = (event: PointerEvent) => {
            const target = event.target;

            if (!(target instanceof Node)) {
                return;
            }

            const sidebar = document.querySelector("[data-sidebar]");
            const navbar = document.querySelector("[data-navbar]");
            const profileMenu =
                document.querySelector("[data-profile-menu]");

            if (sidebar?.contains(target)) {
                return;
            }

            if (navbar?.contains(target)) {
                return;
            }

            if (profileMenu?.contains(target)) {
                return;
            }

            setMenuOpen(false);
            setProfileMenuOpen(false);
        };

        document.addEventListener(
            "pointerdown",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "pointerdown",
                handleOutsideClick
            );
        };
    }, [menuOpen, profileMenuOpen]);

    const handleSearch = () => {
    const query = searchValue.trim();

    if (!query) return;

    setSearchOpen(false);
    setSearchValue("");

    router.push(`/search?q=${encodeURIComponent(query)}`);
};

    return (
        <>
            {/* =========================================
                NAVBAR CONTAINER
            ========================================= */}

            <div className="fixed inset-0 z-[100] pointer-events-none">

                <nav
                    data-navbar
                    className="
                        fixed
                        top-4
                        left-4
                        right-4
                        z-50

                        flex
                        items-center
                        justify-between

                        pointer-events-none
                    "
                >

                    {/* =========================================
                        LEFT NAVBAR
                    ========================================= */}

                    <motion.div
                        layout
                        className="
                            pointer-events-auto

                            h-20
                            rounded-full

                            flex
                            items-center

                            px-4

                            bg-white/40
                            backdrop-blur-2xl
                            backdrop-saturate-150

                            border
                            border-white/50

                            shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.7)]

                            relative
                            overflow-hidden
                        "
                    >

                        {/* Top glass highlight */}

                        <div
                            className="
                                absolute
                                top-0
                                left-8
                                right-8
                                h-px
                                bg-white/80
                                pointer-events-none
                            "
                        />

                        {/* =========================================
                            MENU BUTTON
                        ========================================= */}

                        <motion.button
                            type="button"
                            onClick={() => {
                                setMenuOpen(!menuOpen);
                                setSearchOpen(false);
                                setSearchValue("");
                            }}
                            whileHover={{
                                scale: 1.05,
                            }}
                            whileTap={{
                                scale: 0.9,
                            }}
                            className="
                                relative
                                w-12
                                h-12
                                rounded-full

                                flex
                                items-center
                                justify-center

                                text-black
                                hover:bg-white/25

                                transition-colors
                            "
                            aria-label="Toggle menu"
                        >

                            {/* Top line */}

                            <motion.span
                                animate={{
                                    rotate: menuOpen ? 45 : 0,
                                    y: menuOpen ? 0 : -8,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="
                                    absolute
                                    w-6
                                    h-[2px]
                                    bg-black
                                    rounded-full
                                "
                            />

                            {/* Middle line */}

                            <motion.span
                                animate={{
                                    opacity: menuOpen ? 0 : 1,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className="
                                    absolute
                                    w-6
                                    h-[2px]
                                    bg-black
                                    rounded-full
                                "
                            />

                            {/* Bottom line */}

                            <motion.span
                                animate={{
                                    rotate: menuOpen ? -45 : 0,
                                    y: menuOpen ? 0 : 8,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="
                                    absolute
                                    w-6
                                    h-[2px]
                                    bg-black
                                    rounded-full
                                "
                            />

                        </motion.button>


                        {/* =========================================
                            SEARCH
                        ========================================= */}

                        <AnimatePresence mode="wait">

                            {!searchOpen ? (

                                /* SEARCH BUTTON */

                                <motion.button
                                    key="search-button"
                                    type="button"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.8,
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                    }}
                                    whileTap={{
                                        scale: 0.9,
                                    }}
                                    onClick={() => {
                                        setSearchOpen(true);
                                    }}
                                    className="
                                        p-3
                                        rounded-full

                                        text-black
                                        hover:bg-white/25

                                        transition-colors
                                    "
                                    aria-label="Search"
                                >
                                    <Search size={22} />
                                </motion.button>

                            ) : (

                                /* SEARCH BAR */

                                <motion.div
                                    key="search-bar"
                                    initial={{
                                        width: 48,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        width: 260,
                                        opacity: 1,
                                    }}
                                    exit={{
                                        width: 48,
                                        opacity: 0,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                    }}
                                    className="
                                        h-12

                                        flex
                                        items-center

                                        rounded-full

                                        bg-white/35

                                        backdrop-blur-xl

                                        border
                                        border-white/50

                                        shadow-inner

                                        overflow-hidden
                                    "
                                >

                                    {/* Search icon */}

                                    <div
                                        className="
                                            pl-4

                                            flex
                                            items-center
                                            justify-center

                                            text-gray-700
                                        "
                                    >
                                        <Search size={20} />
                                    </div>


                                    {/* =================================
                                        SEARCH INPUT
                                    ================================= */}

                                    <input
                                        autoFocus
                                        type="text"
                                        value={searchValue}

                                        onChange={(e) => {
                                            setSearchValue(
                                                e.target.value
                                            );
                                        }}

                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleSearch();
                                            }

                                            if (e.key === "Escape") {
                                                setSearchOpen(false);
                                                setSearchValue("");
                                            }
                                        }}

                                        placeholder={
                                            t.searchPlaceholder
                                        }

                                        className="
                                            flex-1
                                            min-w-0

                                            bg-transparent

                                            outline-none
                                            border-none

                                            px-3

                                            text-sm
                                            text-black

                                            placeholder:text-gray-500
                                        "
                                    />


                                    {/* =================================
                                        CLOSE SEARCH
                                    ================================= */}

                                    <motion.button
                                        type="button"
                                        whileHover={{
                                            scale: 1.1,
                                        }}
                                        whileTap={{
                                            scale: 0.9,
                                        }}
                                        onClick={() => {
                                            setSearchOpen(false);
                                            setSearchValue("");
                                        }}
                                        className="
                                            mr-2

                                            w-8
                                            h-8

                                            rounded-full

                                            flex
                                            items-center
                                            justify-center

                                            text-gray-700

                                            hover:bg-white/30

                                            transition-colors
                                        "
                                        aria-label="Close search"
                                    >
                                        <X size={18} />
                                    </motion.button>

                                </motion.div>
                            )}

                        </AnimatePresence>


                        {/* =========================================
                            NOTIFICATION
                        ========================================= */}

                        <motion.button
                            type="button"
                            whileHover={{
                                scale: 1.1,
                            }}
                            whileTap={{
                                scale: 0.9,
                            }}
                            className="
                                p-3

                                rounded-full

                                text-black

                                hover:bg-white/25

                                transition-colors
                            "
                            aria-label="Notifications"
                        >
                            <Bell size={22} />
                        </motion.button>


                        {/* =========================================
                            LOGO
                        ========================================= */}

                        {!menuOpen && (

                            <motion.div
                                layoutId="krushibandhu-logo"
                                transition={{
                                    type: "spring",
                                    stiffness: 350,
                                    damping: 30,
                                }}
                                className="
                                    ml-6

                                    h-14
                                    w-14

                                    rounded-full

                                    overflow-hidden

                                    flex
                                    items-center
                                    justify-center

                                    shrink-0

                                    border
                                    border-white/60

                                    shadow-md

                                    bg-white/30
                                "
                            >

                                <Link
                                    href="/"
                                    className="
                                        h-full
                                        w-full

                                        flex
                                        items-center
                                        justify-center
                                    "
                                >

                                    <img
                                        src="/Krushibandhu-logo.png"
                                        alt="KrushiBandhu Logo"
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                        "
                                    />

                                </Link>

                            </motion.div>
                        )}

                    </motion.div>


                    {/* =========================================
                        RIGHT SIDE
                    ========================================= */}

                    <div
                        className="
                            relative
                            flex
                            items-center
                            gap-3
                        "
                    >

                        {/* =====================================
                            LANGUAGE SELECTOR
                        ===================================== */}

                        <div className="relative">

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                transition={{
                                    duration: 0.5,
                                }}
                                className="
                                    pointer-events-auto

                                    h-12

                                    flex
                                    items-center

                                    gap-1

                                    px-1.5

                                    rounded-full

                                    bg-white/40
                                    backdrop-blur-2xl
                                    backdrop-saturate-150

                                    border
                                    border-white/50

                                    shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.7)]
                                "
                            >

                                {/* English */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setLanguage("en")
                                    }
                                    className={`
                                        px-3
                                        py-2

                                        rounded-full

                                        text-xs
                                        font-bold

                                        transition-all

                                        ${
                                            language === "en"
                                                ? "bg-green-600 text-white shadow-sm"
                                                : "text-black hover:bg-white/40"
                                        }
                                    `}
                                >
                                    ENGLISH
                                </button>


                                {/* Hindi */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setLanguage("hi")
                                    }
                                    className={`
                                        px-3
                                        py-2

                                        rounded-full

                                        text-xs
                                        font-bold

                                        transition-all

                                        ${
                                            language === "hi"
                                                ? "bg-green-600 text-white shadow-sm"
                                                : "text-black hover:bg-white/40"
                                        }
                                    `}
                                >
                                    हिन्दी
                                </button>


                                {/* Marathi */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setLanguage("mr")
                                    }
                                    className={`
                                        px-3
                                        py-2

                                        rounded-full

                                        text-xs
                                        font-bold

                                        transition-all

                                        ${
                                            language === "mr"
                                                ? "bg-green-600 text-white shadow-sm"
                                                : "text-black hover:bg-white/40"
                                        }
                                    `}
                                >
                                    मराठी
                                </button>

                            </motion.div>

                        </div>


                        {/* =====================================
                            PROFILE
                        ===================================== */}

                        <motion.div
                            className="
                                pointer-events-auto

                                h-20

                                rounded-full

                                flex
                                items-center

                                gap-3

                                px-4

                                bg-white/40

                                backdrop-blur-2xl
                                backdrop-saturate-150

                                border
                                border-white/50

                                shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.7)]

                                relative
                                overflow-visible
                            "
                            initial={{
                                opacity: 0,
                                x: 20,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                        >

                            {/* Top highlight */}

                            <div
                                className="
                                    absolute
                                    top-0
                                    left-8
                                    right-8
                                    h-px
                                    bg-white/80
                                    pointer-events-none
                                "
                            />


                            {/* Avatar */}

                            <motion.div
                                whileHover={{
                                    scale: 1.1,
                                }}
                                className="
                                    w-10
                                    h-10

                                    rounded-full

                                    bg-green-100/70

                                    backdrop-blur-md

                                    flex
                                    items-center
                                    justify-center

                                    text-green-800

                                    font-bold

                                    border
                                    border-white/60

                                    shadow-sm
                                "
                            >
                                VM
                            </motion.div>


                            {/* User information */}

                            <div>

                                <p className="text-black font-bold">
                                    {username}
                                </p>

                                <p className="text-sm text-gray-600">
                                    {t.farmer}
                                </p>

                            </div>


                            {/* Profile menu button */}

                            <motion.button
                                type="button"
                                whileHover={{
                                    scale: 1.1,
                                }}
                                whileTap={{
                                    scale: 0.9,
                                }}
                                onClick={() =>
                                    setProfileMenuOpen(
                                        !profileMenuOpen
                                    )
                                }
                                className="
                                    p-2

                                    rounded-full

                                    text-black

                                    hover:bg-white/25

                                    transition-colors
                                "
                                aria-label="More options"
                                aria-expanded={
                                    profileMenuOpen
                                }
                            >

                                <motion.div
                                    animate={{
                                        rotate:
                                            profileMenuOpen
                                                ? 90
                                                : 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                >
                                    <MoreVertical size={21} />
                                </motion.div>

                            </motion.button>


                            {/* =================================
                                PROFILE MENU
                            ================================= */}

                            <AnimatePresence>

                                {profileMenuOpen && (

                                    <motion.div
                                        data-profile-menu
                                        initial={{
                                            opacity: 0,
                                            y: -10,
                                            scale: 0.95,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -10,
                                            scale: 0.95,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 25,
                                        }}
                                        className="
                                            absolute

                                            top-24
                                            right-0

                                            w-64

                                            p-2

                                            rounded-3xl

                                            bg-white/45

                                            backdrop-blur-2xl
                                            backdrop-saturate-150

                                            border
                                            border-white/60

                                            shadow-[0_16px_50px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.8)]

                                            overflow-hidden

                                            pointer-events-auto

                                            z-[200]
                                        "
                                    >

                                        {/* Highlight */}

                                        <div
                                            className="
                                                absolute
                                                top-0
                                                left-8
                                                right-8
                                                h-px
                                                bg-white/90
                                            "
                                        />


                                        {/* User */}

                                        <div
                                            className="
                                                px-4
                                                py-3
                                                mb-1

                                                border-b
                                                border-white/30
                                            "
                                        >

                                            <p
                                                className="
                                                    text-black
                                                    font-bold
                                                    text-sm
                                                "
                                            >
                                                {username}
                                            </p>

                                            <p
                                                className="
                                                    text-gray-600
                                                    text-xs
                                                "
                                            >
                                                {t.farmerAccount}
                                            </p>

                                        </div>


                                        {/* Profile options */}

                                        {[
                                            {
                                                name: t.profile,
                                                icon: User,
                                            },
                                            {
                                                name:
                                                    t.connectedDevices,
                                                icon: Smartphone,
                                            },
                                            {
                                                name: t.settings,
                                                icon: Settings,
                                            },
                                            {
                                                name:
                                                    t.helpSupport,
                                                icon: HelpCircle,
                                            },
                                        ].map(
                                            (item, index) => {
                                                const Icon =
                                                    item.icon;

                                                return (
                                                    <motion.button
                                                        type="button"
                                                        key={
                                                            item.name
                                                        }
                                                        initial={{
                                                            opacity: 0,
                                                            x: 10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                index *
                                                                0.05,
                                                        }}
                                                        whileHover={{
                                                            x: 4,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.97,
                                                        }}
                                                        className="
                                                            w-full

                                                            flex
                                                            items-center

                                                            gap-3

                                                            px-4
                                                            py-3

                                                            rounded-2xl

                                                            text-black

                                                            hover:bg-white/35

                                                            transition-colors
                                                        "
                                                    >

                                                        <Icon
                                                            size={19}
                                                        />

                                                        <span
                                                            className="
                                                                text-sm
                                                                font-medium
                                                            "
                                                        >
                                                            {
                                                                item.name
                                                            }
                                                        </span>

                                                    </motion.button>
                                                );
                                            }
                                        )}


                                        {/* Divider */}

                                        <div
                                            className="
                                                my-1
                                                h-px
                                                bg-white/30
                                            "
                                        />


                                        {/* Logout */}

                                        <motion.button
                                            type="button"
                                            whileHover={{
                                                x: 4,
                                            }}
                                            whileTap={{
                                                scale: 0.97,
                                            }}
                                            className="
                                                w-full

                                                flex
                                                items-center

                                                gap-3

                                                px-4
                                                py-3

                                                rounded-2xl

                                                text-red-600

                                                hover:bg-red-500/10

                                                transition-colors
                                            "
                                        >

                                            <LogOut size={19} />

                                            <span
                                                className="
                                                    text-sm
                                                    font-medium
                                                "
                                            >
                                                {t.logout}
                                            </span>

                                        </motion.button>

                                    </motion.div>
                                )}

                            </AnimatePresence>

                        </motion.div>

                    </div>

                </nav>


                {/* =========================================
                    SIDEBAR
                ========================================= */}

                <AnimatePresence>

                    {menuOpen && (

                        <>

                            {/* Background overlay */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 0.25,
                                }}
                                className="
                                    fixed
                                    inset-0

                                    z-40

                                    bg-black/10

                                    backdrop-blur-[2px]

                                    pointer-events-auto
                                "
                            />


                            {/* Sidebar */}

                            <motion.aside
                                data-sidebar
                                initial={{
                                    x: -320,
                                    opacity: 0,
                                }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                }}
                                exit={{
                                    x: -320,
                                    opacity: 0,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                }}
                                className="
                                    fixed

                                    top-4
                                    left-4
                                    bottom-4

                                    w-72

                                    z-50

                                    rounded-3xl

                                    overflow-hidden

                                    bg-white/45

                                    backdrop-blur-2xl

                                    backdrop-saturate-150

                                    border
                                    border-white/50

                                    shadow-[0_12px_40px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.7)]

                                    relative

                                    pointer-events-auto
                                "
                            >

                                {/* Top highlight */}

                                <div
                                    className="
                                        absolute

                                        top-0
                                        left-8
                                        right-8

                                        h-px

                                        bg-white/80

                                        pointer-events-none
                                    "
                                />


                                {/* =================================
                                    SIDEBAR HEADER
                                ================================= */}

                                <div
                                    className="
                                        h-24

                                        px-5

                                        flex
                                        items-center

                                        gap-3

                                        border-b
                                        border-white/30
                                    "
                                >

                                    <motion.div
                                        layoutId="krushibandhu-logo"
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 30,
                                        }}
                                        className="
                                            h-14
                                            w-14

                                            rounded-full

                                            overflow-hidden

                                            flex
                                            items-center
                                            justify-center

                                            shrink-0

                                            border
                                            border-white/60

                                            shadow-md

                                            bg-white/30
                                        "
                                    >

                                        <img
                                            src="/Krushibandhu-logo.png"
                                            alt="KrushiBandhu Logo"
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                            "
                                        />

                                    </motion.div>


                                    <div>

                                        <h2
                                            className="
                                                text-lg
                                                font-bold
                                                text-black
                                            "
                                        >
                                            {t.krushiBandhu}
                                        </h2>

                                        <p
                                            className="
                                                text-xs
                                                text-gray-600
                                            "
                                        >
                                            {t.farmerCompanion}
                                        </p>

                                    </div>

                                </div>


                                {/* =================================
                                    SIDEBAR LINKS
                                ================================= */}

                                <div
                                    className="
                                        p-4
                                        space-y-2
                                    "
                                >

                                    {[
                                        {
                                            name: t.Home,
                                            link: routes.home,
                                        },
                                        {
                                            name: t.dashboard,
                                            link: routes.dashboard,
                                        },
                                        {
                                            name: t.soilStudy,
                                            link: routes.soil,
                                        },
                                        {
                                            name: t.marketplace,
                                            link: routes.marketplace,
                                        },
                                        {
                                            name: t.expenses,
                                            link: routes.expenses,
                                        },
                                        {
                                            name: t.learn,
                                            link: routes.learn,
                                        },
                                    ].map(
                                        (item, index) => {

                                            const isActive =
                                                pathname ===
                                                item.link;

                                            return (

                                                <motion.div
                                                    key={
                                                        item.name
                                                    }
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            0.15 +
                                                            index *
                                                                0.06,
                                                        duration:
                                                            0.25,
                                                    }}
                                                    whileHover={{
                                                        x: 5,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.97,
                                                    }}
                                                >

                                                    <Link
                                                        href={
                                                            item.link
                                                        }
                                                        className={`
                                                            flex
                                                            items-center

                                                            px-4
                                                            py-3

                                                            rounded-xl

                                                            font-semibold

                                                            transition-colors

                                                            ${
                                                                isActive
                                                                    ? "bg-green-600 text-white shadow-sm"
                                                                    : "text-black hover:bg-white/30 hover:text-green-700"
                                                            }
                                                        `}
                                                        onClick={() =>
                                                            setMenuOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        {
                                                            item.name
                                                        }
                                                    </Link>

                                                </motion.div>
                                            );
                                        }
                                    )}

                                </div>

                            </motion.aside>

                        </>
                    )}

                </AnimatePresence>

            </div>
        </>
    );
}