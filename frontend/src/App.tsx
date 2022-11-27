import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Text
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";
import logger from "./logger";
import GithubUsernameForm from "./components/GithubUsernameForm";
import GithubRepositories from "./components/GithubRepositories";

function App() {
  const [username, setUsername] = useLocalStorage<string>({
    key:'username',
    defaultValue: '',
    getInitialValueInEffect: true
  })
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => {
    logger.info("change theme");
    return toggleColorScheme();
  }]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <GithubUsernameForm onSubmitHandler={formValues => setUsername(formValues.username)} />

        {username.length > 0 ? <GithubRepositories username={username} />: <Text>Please enter your Github account </Text>}
      </MantineProvider>
      </ColorSchemeProvider>
  );
}

export default App;
