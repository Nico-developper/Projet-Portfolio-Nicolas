import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#3b82f6" }, // bleu
    },
    typography: {
        fontFamily: ["Inter", "system-ui", "Arial", "sans-serif"].join(","),
    },
});
