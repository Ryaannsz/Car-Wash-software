
import React, { useState } from 'react';
import { UserData } from "../interface/UserData";
import { ServicoData } from "../interface/ServicoData";
import { useUserDataFindById } from "../hooks/useUserDataFindById";
import { CombinedHistoricoData } from '../interface/CombinedHistoricoData';
import { useServicoDataFindById } from "../hooks/useServicoDataFindById";
import ModalRegHistoricoAcao from "../components/modals/ModalRegHistoricoAcao";
import { useHistoricoActionData } from "../hooks/useHistoricoActionData";
import { useHistoricoActionDataRemove } from '../hooks/useHistoricoActionDataRemove';
import { HistoricoActionData } from '../interface/HistoricoActionData';
import { TdHistorico } from '../components/tdHistoricoAcao';


const UserMag: React.FC = () => {

    const [selectedAction, setActionSelected] = useState<CombinedHistoricoData | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const { data: historicoAction = [] } = useHistoricoActionData();
    
    const { data: users = [] } = useUserDataFindById(historicoAction);
    const { data: servico = [] } = useServicoDataFindById(historicoAction);

    const { mutate } = useHistoricoActionDataRemove();




    //MANIPULAÇÃO E EXTRAÇÃO DE DADOS
    const combineHistoricoData = (historicoActions: HistoricoActionData[], users: UserData[], servicos: ServicoData[]): CombinedHistoricoData[] => {
        return historicoActions.map(historicoAction => {
            const user = users.find(user => user.id === historicoAction.user_id);
            const servico = servicos.find(servico => servico.id === historicoAction.service_id);
            return {
                historicoAction,
                user: user ? user : { id: undefined, name: '', endereco: '', telefone: '' },
                servico: servico ? servico : { id: undefined, preco: 0, tipo: '' }
            };
        }).filter(item => item.user.id !== undefined && item.servico.id !== undefined);
    };


    const combinedArray: CombinedHistoricoData[] = combineHistoricoData(historicoAction, users, servico);

    const filterCerto = combinedArray.filter(arrayAll =>
        arrayAll.historicoAction.placa.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        arrayAll.historicoAction.date.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        arrayAll.servico.tipo.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        arrayAll.user.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    //MANIPULAÇÃO E EXTRAÇÃO DE DADOS






    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold mb-4">Tabela de Ações</h1>
                        <a href="/registroacao"><button className="ml-auto w-50 px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Voltar</button></a>
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
                                <th className="px-4 py-2 text-left text-gray-600">Data criado</th>
                                <th className="px-4 py-2 text-left text-gray-600">Data finalizado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterCerto
                            .sort((a, b) => a.historicoAction.date.localeCompare(b.historicoAction.date))
                            .map((item, index) => (
                                <tr key={index}
                                    onClick={() => { setActionSelected(item); setModalOpen(true) }}
                                    className="cursor-pointer hover:bg-gray-100"
                                >
                                    <TdHistorico
                                        data={item}
                                    />

                                </tr>
                            ))}


                        </tbody>
                    </table>
                    <ModalRegHistoricoAcao
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
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