import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeV1 from "./pages/HomeV1";
import { Web3AuthSignerProvider } from "./components/contex/web3-auth-signer";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Terms from "./pages/tems&conditions/temsconditions";
import Opportunity from "./pages/opportunity/Opportunity";
import Alluser from "./components/alluser/Alluser";

function App() {
  const queryClient = new QueryClient();
  return (
    <div>
      <Web3AuthSignerProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeV1 />} />
              <Route path="/terms-and-conditions" element={<Terms />} />
              <Route path="/opportunity" element={<Opportunity />} />
              <Route path="/alluser" element={<Alluser />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Web3AuthSignerProvider>
    </div>
  );
}

export default App;
