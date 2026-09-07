import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,

          style: {
            background: "#111111",
            color: "#ffffff",
            border: "1px solid #333333",
            borderRadius: "14px",
            padding: "14px 18px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
          },

          success: {
            style: {
              background: "#111111",
              color: "#ffffff",
              border: "1px solid #d4af37",
            },
            iconTheme: {
              primary: "#d4af37",
              secondary: "#111111",
            },
          },

          error: {
            style: {
              background: "#111111",
              color: "#ffffff",
              border: "1px solid #ef4444",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#111111",
            },
          },
        }}
      />

      <AppRoutes />
    </>
  );
}