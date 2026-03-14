import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
// import Footer from "./Footer";
import Header from "./header/header";
import ErrorFallback from "../common/ErrorFallback";
// import Sidebar from "./sidebar";
import "../../styles/layout/mainlayout.css";

export default function Layout() {
    return (
        <div>
            <div className="main-layout">
                {/* <Sidebar /> */}
                <div className="content">
                    <ErrorBoundary FallbackComponent={<ErrorFallback onlyFragment />}>
                        <Header />
                    </ErrorBoundary>

                    <ErrorBoundary FallbackComponent={<ErrorFallback />}>
                        <Suspense fallback={<>...</>}>
                            <Outlet />
                        </Suspense>
                    </ErrorBoundary>
                    {/* <Footer /> */}
                </div>
            </div>
        </div>
    );
}
