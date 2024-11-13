import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Analysis from "./Analysis";


export default function App() {
  return <MantineProvider theme={theme}><Analysis /></MantineProvider>;
}
