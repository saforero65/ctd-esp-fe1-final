import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./componentes/layout/encabezado.componente";
import PaginaDetalle from "./paginas/Detalle.pagina";
import PaginaFavoritos from "./paginas/Favoritos.pagina";
import PaginaInicio from "./paginas/Inicio.pagina";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="favoritos" element={<PaginaFavoritos />} />
          <Route path="detalle/:id" element={<PaginaDetalle />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
