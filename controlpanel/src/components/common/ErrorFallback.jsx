import { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { Link, useLocation } from "react-router-dom";

const ErrorFallback = ({ onlyFragment = false }) => {
    const { resetBoundary } = useErrorBoundary();
    const location = useLocation();

    useEffect(() => {
        resetBoundary();
    }, [location]);

    if (onlyFragment) return <> </>;

    return (
        <section id="error-fallback">
            <h3>Oops, something went wrong!</h3>
            <div>Please try again after some time</div>
            <Link to="/" className="btn btn-primary">
                Go back
            </Link>
        </section>
    );
};

export default ErrorFallback;
