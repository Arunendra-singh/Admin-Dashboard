import React from "react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from './store';
import { ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import client from "common/components/graphQL/apolloClient";
import { SetLazyImageDefaults } from "common/components/LazyImage";
import { MILazyLoad } from "common/utils";
import RoutePaths from "./navigation";
import "./styles/styles.scss";
import Store from "./Store";

SetLazyImageDefaults({ className: "lazyload", fill: "#ebebeb" });
MILazyLoad("lazyload");
const queryClient = new QueryClient();
function App() {
    return (
        <Store.Provider>
            <QueryClientProvider client={queryClient}>
                <ApolloProvider client={client}>
                    <RoutePaths />
                </ApolloProvider>
            </QueryClientProvider>
        </Store.Provider>
    );
}
export default App;
