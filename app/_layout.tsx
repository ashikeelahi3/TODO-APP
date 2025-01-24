import "./styles/global.css"; // Ensure this path matches your project structure
import StackNavigator from "./navigation/StackNavigator";
import { ThemeProvider } from "./context/ThemeContext"

export default function Layout() {
  return (
    <ThemeProvider>
      <StackNavigator />
    </ThemeProvider>
  );
}
