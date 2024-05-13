import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./routes";
import { LoginPage } from "./pages/LoginPage";
import { ProductosPage } from "./pages/ProductosPage";
import { ProductosProvider } from "./context/ProductosContext";
import { CrearProductoNuevo } from "./pages/CrearProductoNuevo";
import { CrearCategorias } from "./pages/CrearCategorias";
import { VentasPage } from "./pages/VentasPage";
import { EditarProducto } from "./pages/EditarProducto";
import { Producto } from "./pages/Producto";
import { CrearColores } from "./pages/CrearColores";
import { EmpleadosPage } from "./pages/EmpleadosPage";
import { ClientesProvider } from "./context/ClientesContext";
import { CrearEmpleadoNuevo } from "./pages/CrearCliente";
import { EditarCliente } from "./pages/EditarCliente";
import { Empleados } from "./pages/Empleados";
import { CrearVenta } from "./pages/CrearVenta";
import { Venta } from "./pages/Venta";
import { EditarVenta } from "./pages/EditarVenta";
import { Perfil } from "./pages/Perfil";
import { PruebasPdf } from "./pages/PruebasPdf";
import { HomeApp } from "./pages/HomeApp";
import { CrearEntrada } from "./pages/CrearEntrada";
import { Entrada } from "./pages/Entrada";
import RegisterPage from "./pages/RegisterPage";
import VentasProvider from "./context/VentasContext";

function App() {
  return (
    <VentasProvider>
      <ProductosProvider>
        <ClientesProvider>
          <Navbar />
          <Routes>
            <Route index path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route index path="/home" element={<HomeApp />} />
              <Route path="/productos" element={<ProductosPage />} />
              <Route path="/producto/:id" element={<Producto />} />
              <Route path="/categorias" element={<CrearCategorias />} />
              <Route path="/colores" element={<CrearColores />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/registros" element={<VentasPage />} />
              <Route path="/empleados" element={<EmpleadosPage />} />
              <Route path="/empleado/:id" element={<Empleados />} />
              <Route path="/editar-empleado/:id" element={<EditarCliente />} />
              <Route path="/crear-empleado" element={<CrearEmpleadoNuevo />} />
              <Route path="/salida/:id" element={<Venta />} />
              <Route path="/registro-venta/:id" element={<EditarVenta />} />
              <Route path="/crear-salida" element={<CrearVenta />} />
              <Route path="/crear-producto" element={<CrearProductoNuevo />} />
              <Route path="/editar-producto/:id" element={<EditarProducto />} />
              <Route path="/crear-entrada" element={<CrearEntrada />} />
              <Route path="/entrada/:id" element={<Entrada />} />
              <Route path="/pruebas/:id" element={<PruebasPdf />} />
            </Route>
          </Routes>
        </ClientesProvider>
      </ProductosProvider>
    </VentasProvider>
  );
}

export default App;
