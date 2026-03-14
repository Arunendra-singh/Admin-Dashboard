import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MILazyLoad } from "common/utils";
import { SetLazyImageDefaults } from "common/components/LazyImage";
import RoutePaths from "./navigation";
import Store from "./store";
import queryClient from "./queryClient";
import "./styles/styles.scss";

SetLazyImageDefaults({ className: "lazyload", fill: "#ebebeb" });
MILazyLoad("lazyload");

const App = () => (
    <Store.Provider>

        <QueryClientProvider client={queryClient}>
            <RoutePaths />
            <ReactQueryDevtools />
        </QueryClientProvider>

    </Store.Provider>
);

export default App;
