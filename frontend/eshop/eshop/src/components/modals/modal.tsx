import { UserData } from '../../interface/UserData';
import { useState } from "react"

interface ModalProps {
    data: UserData[];
    isOpen: boolean;
    onClose: () => void;
    onSelectUser: (user: UserData) => void;
}

export function Modal({ isOpen, onClose, data, onSelectUser }: ModalProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filterUser = data.filter(user =>
        user.name.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.endereco.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.telefone.toString().includes(searchTerm)
      );

      const userSelected = (user: UserData) => {
        onSelectUser(user);
        onClose();
    };

    return (
        <>
            <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
                <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-3/4 md:w-1/2 lg:w-1/3">
                    <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
                        &times;
                    </button>
                    <h2 className="text-xl font-semibold text-center mb-4">Listagem de clientes</h2>
                    <input
                        type="text"
                        placeholder="Pesquisar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filterUser.map((user, index) => (
                                    <tr key={index}
                                    onClick={()=> userSelected(user)}
                                    className="cursor-pointer hover:bg-gray-100"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.endereco}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.telefone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal