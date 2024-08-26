
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import UserMag from './pages/UserMag';
import CadastroServico from './pages/CadastroServico';
import CadastroAction from './pages/CadastroAction';
import RegistroAcao from './pages/RegistroAcao';
import HistoricoAcao from './pages/HistoricoAcao'

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <aside className="w-64 bg-gray-800 text-white flex flex-col h-full">
          <div className="p-4 flex items-center">
            <Link to="/" className="text-xl font-bold hover:text-gray-200">Lava Jato Software</Link>
          </div>
          <nav className="mt-6 flex-grow">
            <ul>
              <li className="py-2 px-4 hover:bg-gray-700">
                <Link to="/" className="flex items-center">
                  <span className="ml-3">Home</span>
                </Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700">
                <Link to="usermag" className="flex items-center">
                  <span className="ml-3">Cadastro de Clientes</span>
                </Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700">
                <Link to="cadastroservico" className="flex items-center">
                  <span className="ml-3">Cadastro de Serviço</span>
                </Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700">
                <Link to="cadastroaction" className="flex items-center">
                  <span className="ml-3">Cadastro de Ação</span>
                </Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700">
                <Link to="registroacao" className="flex items-center">
                  <span className="ml-3">Registros de ações</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="flex-1 flex flex-col">
          <header className="bg-gray-800 text-white">
            <nav className="container mx-auto p-10 flex justify-between items-center">
              {/* conteúdo do header */}
            </nav>
          </header>
          <main className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/usermag" element={<UserMag />} />
              <Route path="/cadastroservico" element={<CadastroServico />} />
              <Route path="/cadastroaction" element={<CadastroAction />} />
              <Route path="/registroacao" element={<RegistroAcao />} />
              <Route path="/historicoacaopast" element={<HistoricoAcao />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
