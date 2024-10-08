import { useNavigate } from "react-router-dom";
import { CombinedHistoricoData } from "../../interface/CombinedHistoricoData";

interface ModalProps {
    data: CombinedHistoricoData | null;
    isOpen: boolean;
    onClose: () => void;
    onSelectedServicoRemove: (action: CombinedHistoricoData) => void;
}

export function ModalRegHistoricoAcao({ isOpen, onClose, data, onSelectedServicoRemove }: ModalProps) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/clientepag/${data?.user.id}`);
      };

      const coinConverter = (amount: number | undefined) => {
        if(!(amount==undefined)){
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(amount);
        }
    };

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


                            <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Informações do Usuário</h3>
                                    <p><strong>Nome:</strong> {data.user.name}</p>
                                    <p><strong>Endereço:</strong> {data.user.endereco}</p>
                                    <p><strong>Telefone:</strong> {data.user.telefone}</p>
                                </div>
                                <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                                    Ir à página do cliente
                                </button>
                            </div>





                            <div className="p-4 bg-gray-100 rounded-lg shadow">
                                <h3 className="text-lg font-medium text-gray-900">Detalhes do Serviço</h3>
                                <p><strong>Tipo:</strong> {data.servico.tipo}</p>
                                <p><strong>Preço:</strong> {coinConverter(data.servico.preco)}</p>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg shadow">
                                <h3 className="text-lg font-medium text-gray-900">Informações da Ação</h3>
                                <p><strong>Placa:</strong> {data.historicoAction.placa}</p>
                                <p><strong>Data criado:</strong> {data.historicoAction.date}</p>
                                <p><strong>Data finalizado:</strong> {data.historicoAction.datefinalizado}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center space-x-4 mt-6">

                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                            onClick={() => onSelectedServicoRemove(data!)}
                        >
                            Remover do histórico
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalRegHistoricoAcao;
