
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import UserMag from './pages/UserMag';
import CadastroServico from './pages/CadastroServico';
import CadastroAction from './pages/CadastroAction';
import RegistroAcao from './pages/RegistroAcao';

const App: React.FC = () => {
  return (
    <Router>
      <header className="bg-blue-800 text-white shadow-md">
            <nav className="container mx-auto p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <Link to="/" className="hover:text-gray-200">Lava Jato Software</Link>
                </h1>
                <ul className="flex space-x-6">
                    <li>
                        <Link
                            to="/"
                            className="hover:text-gray-200 transition duration-300"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/usermag"
                            className="hover:text-gray-200 transition duration-300"
                        >
                            Cadastro de Cliente
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/cadastroservico"
                            className="hover:text-gray-200 transition duration-300"
                        >
                            Cadastro de Serviço
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/cadastroaction"
                            className="hover:text-gray-200 transition duration-300"
                        >
                            Cadastro de Action
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/registroacao"
                            className="hover:text-gray-200 transition duration-300"
                        >
                            Registro de ação
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usermag" element={<UserMag />} />
        <Route path="/cadastroservico" element={<CadastroServico />} />
        <Route path="/cadastroaction" element={<CadastroAction />} />
        <Route path="/registroacao" element={<RegistroAcao/>} />
      </Routes>
    </Router>
  );
};

export default App;
