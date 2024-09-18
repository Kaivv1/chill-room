import { Button } from "@/components/ui/button";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { ModeToggle } from "./components/ModeToggle";
import axios, { AxiosError } from "axios";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Button
        onClick={async () => {
          await axios
            .get("/api/errors")
            .then((res) => {
              const data = res.data as {
                status: string;
              };
              console.log(data);
            })
            .catch((err: AxiosError) => {
              console.log(err.response?.data);
            });
        }}
      >
        Click me
      </Button>
      <ModeToggle />
    </ThemeProvider>
  );
}

export default App;
