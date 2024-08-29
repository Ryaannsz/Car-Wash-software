import { useActionData } from "../hooks/useActionData";
import React, { useState } from 'react';
import { UserData } from "../interface/UserData";
import { ServicoData } from "../interface/ServicoData";
import { useUserDataFindById } from "../hooks/useUserDataFindById";
import { ActionData } from "../interface/ActionData";
import { CombinedData } from "../interface/CombinedData";
import { useServicoDataFindById } from "../hooks/useServicoDataFindById";
import { Td } from "../components/tdAcao";
import ModalRegAcao from "../components/modals/modalregacao";
import { useActionDataRemove } from "../hooks/useActionDataRemove";
import { useHistoricoActionDataMutate } from "../hooks/useHistoricoActionDataMutate";


const UserMag: React.FC = () => {

    const [selectedAction, setActionSelected] = useState<CombinedData | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const { data: actions = [] } = useActionData();

    const { data: users = [] } = useUserDataFindById(actions);
    const { data: servico = [] } = useServicoDataFindById(actions);

    const { mutate } = useActionDataRemove();
    const { mutate: historicoActionMutate } = useHistoricoActionDataMutate();



    //MANIPULAÇÃO E EXTRAÇÃO DE DADOS
    const combineData = (actions: ActionData[], users: UserData[], servicos: ServicoData[]): CombinedData[] => {
        return actions.map(action => {
            const user = users.find(user => user.id === action.user_id);
            //
            const servico = servicos.find(servico => servico.id === action.servico_id);
            return {
                action,
                user: user ? user : { id: undefined, name: '', endereco: '', telefone: '' },
                servico: servico ? servico : { id: undefined, preco: 0, tipo: '' }
            };
        }).filter(item => item.user.id !== undefined && item.servico.id !== undefined);;
    };
    const combinedArray: CombinedData[] = combineData(actions, users, servico);
    const filterCerto = combinedArray.filter(arrayAll =>
        arrayAll.action.placa.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        arrayAll.action.date.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        arrayAll.servico.tipo.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        arrayAll.user.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const extractActionData = (combinedData: CombinedData) => {
        return {
            id: combinedData.action.id,
            date: combinedData.action.date,
            placa: combinedData.action.placa,
            servico_id: combinedData.servico.id,
            user_id: combinedData.user.id
        };
    }
    //MANIPULAÇÃO E EXTRAÇÃO DE DADOS






    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold mb-4">Tabela de Ações</h1>
                       <a href="/historicoacaopast"><button className="ml-auto w-50 px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Histórico</button></a>
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Pesquisar..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 border-b border-gray-300">
                                <th className="px-4 py-2 text-left text-gray-600">Nome</th>
                                <th className="px-4 py-2 text-left text-gray-600">Placa</th>
                                <th className="px-4 py-2 text-left text-gray-600">Serviço</th>
                                <th className="px-4 py-2 text-left text-gray-600">Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterCerto
                            .sort((a, b) => a.action.date.localeCompare(b.action.date))
                            .map((item, index) => (
                                
                                <tr key={index}
                                    onClick={() => { setActionSelected(item); setModalOpen(true) }}
                                    className="cursor-pointer hover:bg-gray-100"
                                >
                                    <Td
                                        data={item}
                                    />

                                </tr>
                            ))}


                        </tbody>
                    </table>
                    <ModalRegAcao
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        onSelectServico={(acao) => {
                            window.location.reload()
                            setActionSelected(acao)
                            setModalOpen(false)
                            mutate(acao)
                            const extractSuccefulAction: ActionData = extractActionData(acao)
                            historicoActionMutate(extractSuccefulAction)
                        }}
                        onSelectedServicoRemove={(acao) => {
                            window.location.reload()
                            setModalOpen(false)
                            mutate(acao)

                        }}
                        data={selectedAction}

                    />
                </div>
            </div>
        </>
    )
}


export default UserMag;