import { Studio } from "sanity";
import config from "@/sanity/sanity.config";

export default function AdminStudio() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <Studio config={config} />
    </div>
  );
}
