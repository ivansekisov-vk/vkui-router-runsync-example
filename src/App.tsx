import React, { useEffect } from "react";
import {
  Root,
  Group,
  Panel,
  PanelHeader,
  SimpleCell,
  View,
  Button,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import {
  useActiveVkuiLocation,
  useRouteNavigator,
  useParams,
} from "@vkontakte/vk-mini-apps-router";

import { DEFAULT_ROOT, DEFAULT_VIEW, DEFAULT_VIEW_PANELS } from "./routes";

function Product1Page() {
  const routeNavigator = useRouteNavigator();
  const params = useParams({ panel: DEFAULT_VIEW_PANELS.PRODUCT });

  return (
    <>
      <PanelHeader>Product 1</PanelHeader>
      PARAMS: {JSON.stringify(params)}
      <Button onClick={() => routeNavigator.push(`/product2/2`)}>
        Go to product 2
      </Button>
      <Button mode="secondary" onClick={() => routeNavigator.back()}>
        Back
      </Button>
    </>
  );
}

function Product2Page() {
  const routeNavigator = useRouteNavigator();
  const params = useParams({ panel: DEFAULT_VIEW_PANELS.PRODUCT2 });

  return (
    <>
      <PanelHeader>Product 2</PanelHeader>
      PARAMS: {JSON.stringify(params)}
      <Button mode="secondary" onClick={() => routeNavigator.back()}>
        Back
      </Button>
    </>
  );
}

export default function App() {
  const routeNavigator = useRouteNavigator();
  const {
    view: activeView = DEFAULT_VIEW,
    panel: activePanel = DEFAULT_VIEW_PANELS.HOME,
    panelsHistory,
  } = useActiveVkuiLocation();
  const params = useParams();

  useEffect(() => {
    bridge.send("VKWebAppInit");
    bridge.send(
      panelsHistory.length > 1
        ? "VKWebAppDisableSwipeBack"
        : "VKWebAppEnableSwipeBack"
    );
  }, [panelsHistory]);

  return (
    <Root id={DEFAULT_ROOT} activeView={activeView}>
      <View
        id={DEFAULT_VIEW}
        activePanel={activePanel}
        history={panelsHistory}
        onSwipeBack={() => routeNavigator.back()}
      >
        <Panel id={DEFAULT_VIEW_PANELS.HOME}>
          <PanelHeader>VKUI</PanelHeader>
          <Group>
            <SimpleCell>Hello</SimpleCell>
            <SimpleCell>world</SimpleCell>
          </Group>
          PARAMS: {JSON.stringify(params)}
          <Button onClick={() => routeNavigator.push(`/product/1`)}>
            Go to product 1
          </Button>
        </Panel>
        <Panel id={DEFAULT_VIEW_PANELS.PRODUCT}>
          <Product1Page />
        </Panel>
        <Panel id={DEFAULT_VIEW_PANELS.PRODUCT2}>
          <Product2Page />
        </Panel>
      </View>
    </Root>
  );
}
