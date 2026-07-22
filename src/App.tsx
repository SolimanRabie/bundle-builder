import { BundleProvider } from "./context/BundleContext";
import Home from "./pages/Home";
import "./styles.css";

export default function App() {
  return (
    <BundleProvider>
      <Home />
    </BundleProvider>
  );
}
