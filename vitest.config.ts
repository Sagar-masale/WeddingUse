import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/",   // ❌ /Wedding/ हटाओ, सिर्फ "/" रखो
})