import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

import { HelmetProvider } from "react-helmet-async";

import "./index.css";
import "./styles/_global.scss";
import "./styles/styles.scss";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#10b69e" },
    },
    typography: {
        fontFamily:
            'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
    },
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HelmetProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </HelmetProvider>
    </StrictMode>
);
