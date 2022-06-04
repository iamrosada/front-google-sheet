import { useState } from "react";
import { Container } from "./components/container/container";
import { Header } from "./components/header/header";
import { UserContext } from "./context/context.api";

function App() {
  const [search, setSearch] = useState("");
  const [openModalCreate, setOpenModalCreate] = useState(false);
  return (
    <UserContext.Provider
      value={[search, setSearch, openModalCreate, setOpenModalCreate]}
    >
      <Header />
      <Container></Container>
    </UserContext.Provider>
  );
}

export default App;
