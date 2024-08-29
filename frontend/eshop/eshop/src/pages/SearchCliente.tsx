import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../hooks/useUserData';


const SearchCliente: React.FC = () => {

    const { data: users = [] } = useUserData();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filteredUsers = users.filter(user =>
        user.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUserClick = (id: number | undefined) => {
        navigate(`/clientepag/${id}`);
    };
    

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pesquisar Usuários</h1>
            <input
                type="text"
                placeholder="Digite o nome do usuário"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
            />
            <div className="bg-white shadow rounded-lg">
                {filteredUsers.map((user) => (
                    <div
                        key={user.id}
                        className="p-4 border-b hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleUserClick(user.id)}
                        >
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p className="text-gray-500">e-mail</p>
                    </div>
                ))}
                {filteredUsers.length === 0 && (
                    <p className="p-4 text-gray-500">Nenhum usuário encontrado.</p>
                )}
            </div>
        </div>
  );
};

export default SearchCliente