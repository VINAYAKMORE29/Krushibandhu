"use client";
import Link from "next/link";
import {routes} from "../../routes";
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

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [username, setUsername] = useState("User");

    useEffect(() => {
        localStorage.setItem("username", "VM");
        const storedUser = localStorage.getItem("username");

        if (storedUser) {
            setUsername(storedUser);
        }
    }, []);

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

    return (
        <>
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

                        <motion.button
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

                            <motion.span
                                animate={{
                                    rotate: menuOpen ? 45 : 0,
                                    y: menuOpen ? 0 : -8,
                                }}
                                transition={{ duration: 0.3 }}
                                className="
                                    absolute
                                    w-6
                                    h-[2px]
                                    bg-black
                                    rounded-full
                                "
                            />

                            <motion.span
                                animate={{
                                    opacity: menuOpen ? 0 : 1,
                                }}
                                transition={{ duration: 0.2 }}
                                className="
                                    absolute
                                    w-6
                                    h-[2px]
                                    bg-black
                                    rounded-full
                                "
                            />

                            <motion.span
                                animate={{
                                    rotate: menuOpen ? -45 : 0,
                                    y: menuOpen ? 0 : 8,
                                }}
                                transition={{ duration: 0.3 }}
                                className="
                                    absolute
                                    w-6
                                    h-[2px]
                                    bg-black
                                    rounded-full
                                "
                            />

                        </motion.button>


                        <AnimatePresence mode="wait">

                            {!searchOpen ? (

                                <motion.button
                                    key="search-button"
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
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setSearchOpen(true)}
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

                                    <input
                                        autoFocus
                                        type="text"
                                        value={searchValue}
                                        onChange={(e) =>
                                            setSearchValue(e.target.value)
                                        }
                                        placeholder="Search KrushiBandhu..."
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

                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
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


                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
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

                                <a
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

                                </a>

                            </motion.div>
                        )}

                    </motion.div>


                    <div className="relative">

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
                                overflow-hidden
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

                            <motion.div
                                whileHover={{ scale: 1.1 }}
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


                            <div>
                                <p className="text-black font-bold">
                                    {username}
                                </p>

                                <p className="text-sm text-gray-600">
                                    Farmer
                                </p>
                            </div>


                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                    setProfileMenuOpen(!profileMenuOpen)
                                }
                                className="
                                    p-2

                                    rounded-full

                                    text-black

                                    hover:bg-white/25

                                    transition-colors
                                "
                                aria-label="More options"
                                aria-expanded={profileMenuOpen}
                            >
                                <motion.div
                                    animate={{
                                        rotate: profileMenuOpen ? 90 : 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                >
                                    <MoreVertical size={21} />
                                </motion.div>
                            </motion.button>

                        </motion.div>


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
                                    "
                                >

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


                                    <div
                                        className="
                                            px-4
                                            py-3
                                            mb-1
                                            border-b
                                            border-white/30
                                        "
                                    >
                                        <p className="
                                            text-black
                                            font-bold
                                            text-sm
                                        ">
                                            {username}
                                        </p>

                                        <p className="
                                            text-gray-600
                                            text-xs
                                        ">
                                            Farmer Account
                                        </p>
                                    </div>


                                    {[
                                        {
                                            name: "Profile",
                                            icon: User,
                                        },
                                        {
                                            name: "Connected Devices",
                                            icon: Smartphone,
                                        },
                                        {
                                            name: "Settings",
                                            icon: Settings,
                                        },
                                        {
                                            name: "Help & Support",
                                            icon: HelpCircle,
                                        },
                                    ].map((item, index) => {
                                        const Icon = item.icon;

                                        return (
                                            <motion.button
                                                key={item.name}
                                                initial={{
                                                    opacity: 0,
                                                    x: 10,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                transition={{
                                                    delay: index * 0.05,
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
                                                <Icon size={19} />

                                                <span className="
                                                    text-sm
                                                    font-medium
                                                ">
                                                    {item.name}
                                                </span>
                                            </motion.button>
                                        );
                                    })}


                                    <div className="
                                        my-1
                                        h-px
                                        bg-white/30
                                    " />


                                    <motion.button
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

                                        <span className="
                                            text-sm
                                            font-medium
                                        ">
                                            Logout
                                        </span>
                                    </motion.button>

                                </motion.div>
                            )}

                        </AnimatePresence>

                    </div>

                </nav>


                <AnimatePresence>

                    {menuOpen && (
                        <>

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

                                        <h2 className="
                                            text-lg
                                            font-bold
                                            text-black
                                        ">
                                            KrushiBandhu
                                        </h2>

                                        <p className="
                                            text-xs
                                            text-gray-600
                                        ">
                                            Farmer Companion
                                        </p>

                                    </div>

                                </div>


                                <div className="
                                    p-4
                                    space-y-2
                                ">

                                    {[
                                        {
                                            name: "Dashboard",
                                            link: routes.dashboard,
                                        },
                                        {
                                            name: "Soil Study",
                                            link: routes.soil,
                                        },
                                        {
                                            name: "Marketplace",
                                            link: routes.marketplace,
                                        },
                                        {
                                            name: "Expenses",
                                            link: routes.expenses,
                                        },
                                        {
                                            name: "Learn",
                                            link: routes.learn,
                                        },
                                    ].map((item, index) => (

                                        <motion.a
                                            key={item.name}
                                            href={item.link}
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
                                                    index * 0.06,
                                                duration: 0.25,
                                            }}
                                            whileHover={{
                                                x: 5,
                                            }}
                                            whileTap={{
                                                scale: 0.97,
                                            }}
                                            className="
                                                flex
                                                items-center

                                                px-4
                                                py-3

                                                rounded-xl

                                                text-black

                                                font-semibold

                                                hover:bg-white/30

                                                hover:text-green-700

                                                transition-colors
                                            "
                                        >
                                            {item.name}
                                        </motion.a>

                                    ))}

                                </div>

                            </motion.aside>

                        </>
                    )}

                </AnimatePresence>

            </div>
        </>
    );
}