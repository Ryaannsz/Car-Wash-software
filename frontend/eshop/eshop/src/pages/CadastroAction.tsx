import React, { useState } from 'react';
import { Modal } from '../components/modal';
import { useUserData } from '../hooks/useUserData';
import { UserData } from '../interface/UserData';
import { useServicoData } from '../hooks/useServicoData';

const CadastroAction: React.FC = () => {
    const [date, setDate] = useState('');
    const [placa, setPlaca] = useState('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    const onServiceChange = (service: string) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter((s) => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const submit = () => {
        console.log({ date, placa, selectedServices, selectedUser });
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const { data: userData, isLoading, isError, error } = useUserData();
    const { data: services } = useServicoData();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Data</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Placa</label>
                        <input
                            type="text"
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Serviços</label>
                        <div className="mt-1 space-y-2">
                            {services?.map((service) => (
                                <div key={service.tipo} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={service.id?.toString()}
                                        checked={selectedServices.includes(service.tipo)}
                                        onChange={() => onServiceChange(service.tipo)}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    />
                                    <label htmlFor={service.tipo} className="ml-2 text-sm text-gray-700">{service.tipo}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Selecionar Cliente
                        </button>
                        {selectedUser && (
                            <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md text-center">
                            <h2 className="text-xl font-semibold mb-2 text-blue-600">Cliente Selecionado</h2>
                            <p className="text-lg font-medium mb-2">
                                <strong className="text-gray-700">Nome:</strong> {selectedUser.name}
                            </p>
                            <p className="text-lg font-medium mb-2">
                                <strong className="text-gray-700">Endereço:</strong> {selectedUser.endereco}
                            </p>
                            <p className="text-lg font-medium">
                                <strong className="text-gray-700">Telefone:</strong> {selectedUser.telefone}
                            </p>
                        </div>
                        )}
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={submit}
                            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Confirmar Ação
                        </button>
                    </div>
                </form>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSelectUser={(user) => {
                    setSelectedUser(user);
                    setModalOpen(false);
                }}
                data={userData || []}
            />
        </div>
    );
};

export default CadastroAction;
