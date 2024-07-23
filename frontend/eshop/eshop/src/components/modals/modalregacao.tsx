import { CombinedData } from "../../interface/CombinedData";

interface ModalProps {
    data: CombinedData | null;
    isOpen: boolean;
    onClose: () => void;
    onSelectServico: (action: CombinedData) => void;
}

export function ModalRegAcao({ isOpen, onClose, data, onSelectServico }: ModalProps) {

    return (
        <>
            <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
                <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-4xl overflow-y-auto max-h-full relative">
                    <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
                        &times;
                    </button>
                    <h2 className="text-2xl font-semibold text-center mb-6">Detalhes do Serviço</h2>

                    {data && (
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-100 rounded-lg shadow">
                                <h3 className="text-lg font-medium text-gray-900">Informações do Usuário</h3>
                                <p><strong>Nome:</strong> {data.user.name}</p>
                                <p><strong>Endereço:</strong> {data.user.endereco}</p>
                                <p><strong>Telefone:</strong> {data.user.telefone}</p>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg shadow">
                                <h3 className="text-lg font-medium text-gray-900">Detalhes do Serviço</h3>
                                <p><strong>Tipo:</strong> {data.servico.tipo}</p>
                                <p><strong>Preço:</strong> {data.servico.preco}</p>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg shadow">
                                <h3 className="text-lg font-medium text-gray-900">Informações da Ação</h3>
                                <p><strong>Placa:</strong> {data.action.placa}</p>
                                <p><strong>Data:</strong> {data.action.date}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center space-x-4 mt-6">
                        <button 
                            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600" 
                            onClick={() => onSelectServico(data!)}
                        >
                            Concluir Ação
                        </button>
                        <button 
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" 
                            onClick={onClose}
                        >
                            Cancelar Ação
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalRegAcao;
