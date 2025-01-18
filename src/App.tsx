import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Header from "./components/Header";

export default function App() {
  return <MantineProvider
    defaultColorScheme="dark"
    theme={theme}>
    <Header />
  </MantineProvider>;
}
