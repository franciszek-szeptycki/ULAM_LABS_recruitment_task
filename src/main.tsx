import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/sass/reset.sass";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserContext } from "./components/UserContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <UserContext.Provider value="hello from context">
                <App />
                <ReactQueryDevtools />
            </UserContext.Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
