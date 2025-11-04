// app/loading.tsx (Next.js App Router)
"use client";
import {ClipLoader} from "react-spinners";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        top: "0",
        left: "0",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        background: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <ClipLoader color="#0070f3" size={60} />
    </div>
  );
}
