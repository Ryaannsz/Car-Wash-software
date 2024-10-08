import React, { useState } from 'react';
import { Modal } from '../components/modals/modal';
import { useUserData } from '../hooks/useUserData';
import { UserData } from '../interface/UserData';
import { useServicoData } from '../hooks/useServicoData';
import { useActionDataMutate } from '../hooks/useActionDataMutate';
import { ActionData } from '../interface/ActionData';
import { ServicoData } from '../interface/ServicoData';
import { ModalServ } from '../components/modals/modalserv'

const CadastroAction: React.FC = () => {
    const [date, setDate] = useState('');
    const [placa, setPlaca] = useState('');


    const [selectedServico, setSelectedServico] = useState<ServicoData | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const { mutate } = useActionDataMutate();


    const submit = () =>{
        window.location.reload()
        const dataAction: ActionData = {
           date,
           placa,
           servico_id: selectedServico?.id,
           user_id: selectedUser?.id
           
        }
        mutate(dataAction)
   
}

    


    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalServOpen, setModalServOpen] = useState(false);
    const { data: userData, isLoading, isError, error } = useUserData();
    const { data: services } = useServicoData();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

//flex justify-center items-center min-h-screen bg-gray-100
//bg-white p-6 rounded-lg shadow-md w-full max-w-md
//space-y-4
    return (
      



        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
            <div className="md:flex">
                <form className="w-full p-4 px-5 py-5 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Data</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) =>  setDate(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Placa</label>
                        <input
                            type="text"
                            placeholder="Digite sua placa"
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => setModalServOpen(true)}
                            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Selecionar Serviço
                        </button>
                        {selectedServico && (
                            <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md text-center">
                                <h2 className="text-xl font-semibold mb-2 text-blue-600">Serviço Selecionado</h2>
                                <p className="text-lg font-medium mb-2">
                                    <strong className="text-gray-700">Tipo:</strong> {selectedServico.tipo}
                                </p>
                                <p className="text-lg font-medium mb-2">
                                    <strong className="text-gray-700">Preço:</strong> {selectedServico.preco}
                                </p>
                            </div>
                        )}
                    </div>
                    <ModalServ
                        isOpen={isModalServOpen}
                        onClose={() => setModalServOpen(false)}
                        onSelectServico={(servico) => {
                            setSelectedServico(servico);
                            setModalServOpen(false);
                        }}
                        data={services || []}

                    />
                    <div>
                        <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            
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
