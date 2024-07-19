import { ServicoData } from '../interface/ServicoData';
import { useState } from "react"

interface ModalProps {
    data: ServicoData[];
    isOpen: boolean;
    onClose: () => void;
    onSelectServico: (servico: ServicoData) => void;
}

export function ModalServ({ isOpen, onClose, data, onSelectServico }: ModalProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filterUser = data.filter(servico=>
        servico.tipo.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      const serviceSelected = (servico: ServicoData) => {
        onSelectServico(servico);
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
                    <h2 className="text-xl font-semibold text-center mb-4">Listagem de serviços</h2>
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filterUser.map((servico, index) => (
                                    <tr key={index}
                                    onClick={()=> serviceSelected(servico)}
                                    className="cursor-pointer hover:bg-gray-100"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servico.tipo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servico.preco}</td>
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

export default ModalServ