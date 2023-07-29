import GithubRepositories from "./components/GithubRepositories";
import GithubUsernameForm from "./components/GithubUsernameForm";
import logger from "./logger";
import {
  Center,
  type ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";

function App() {
  const [username, setUsername] = useLocalStorage({
    key: "username",
    defaultValue: "",
    getInitialValueInEffect: true,
  });
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value ?? (colorScheme === "dark" ? "light" : "dark"));
  };

  useHotkeys([
    [
      "mod+J",
      () => {
        logger.info("change theme");
        toggleColorScheme();
      },
    ],
  ]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <GithubUsernameForm
          onSubmitHandler={(formValues) => {
            setUsername(formValues.username);
          }}
        />

        <Center>
          {username.length > 0 ? (
            <GithubRepositories username={username} />
          ) : (
            <p>Please enter your Github account</p>
          )}
        </Center>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
