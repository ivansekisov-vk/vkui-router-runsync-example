import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { ConfigProvider, AppRoot } from "@vkontakte/vkui";
import { RouterProvider } from "@vkontakte/vk-mini-apps-router";

import "@vkontakte/vkui/dist/vkui.css";

import { router } from "./routes";
import App from "./App";

const rootElement = document.getElementById("root") as Element;
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <ConfigProvider>
      <AppRoot>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </AppRoot>
    </ConfigProvider>
  </StrictMode>
);
