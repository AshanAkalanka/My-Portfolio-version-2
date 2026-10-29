import { lazy, Suspense } from "react";
import Hero from "../components/Hero";

const HomeSections = lazy(() => import("../components/HomeSections"));

function Home() {
    return (
        <div>
            <Hero />
            <Suspense fallback={<div className="theme-section section-dark-about min-h-[80vh]" role="status"><span className="sr-only">Loading portfolio sections…</span></div>}>
                <HomeSections />
            </Suspense>
        </div>
    );
}

export default Home;
