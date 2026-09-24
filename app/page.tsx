
import Navbar from "./Components/Header/Navbar";
import FarmerBanner from "./Components/Banner/FarmerBanner";
import HomeDashboard from "./Components/Dashboard/HomeDasboard";

export default function Home() {
    return (
        <main
            className="
                relative
                min-h-screen
                w-full

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
                    relative
                    min-h-screen
                    w-full

                    bg-white/5
                "
            >


                <Navbar />


   

                <div
                    className="
                        min-h-screen

                        flex
                        flex-col

                        pt-28
                        pb-6
                    "
                >

                    

                    <div
                        className="
                            flex-1

                            flex
                            items-center
                            justify-center

                            w-full
                        "
                    >
                        <HomeDashboard />
                    </div>




                </div>

            </div>

        </main>
    );
}

