
import React from 'react';
import { useHistoricoActionData } from '../hooks/useHistoricoActionData';
import { useUserDataFindById } from '../hooks/useUserDataFindById';
import { useServicoDataFindById } from '../hooks/useServicoDataFindById';
import { useParams } from 'react-router-dom';
import { ActionData } from '../interface/ActionData';
import { useHistoricoActionDataFindById } from '../hooks/useHistoricoActionById';
import { HistoricoActionData } from '../interface/HistoricoActionData';
import { CombinedHistoricoData } from '../interface/CombinedHistoricoData';
import { ServicoData } from '../interface/ServicoData';

interface Historico_Servico{
    id?: number;
    date: string;
    placa: string;
    servico: ServicoData | undefined;
    user_id: number | undefined;
    datefinalizado: string;
}

const PaginaCliente = () => {
   
    

    const {id} = useParams()

    let obj: ActionData = {
        date: '',
        placa: '',
        servico_id: 0,
        user_id: Number(id)
    }

    let actionDataArray: ActionData[] = [obj];
    const { data: users = [] } = useUserDataFindById(actionDataArray);
    const {data: historicoaction = []} = useHistoricoActionDataFindById(actionDataArray)
    const { data: servico = []} =useServicoDataFindById(historicoaction.flat())

    const combineData = (
        historico: HistoricoActionData,
        servico: ServicoData | undefined
    ): Historico_Servico => {
        return {
            id: historico.id,
            date: historico.date,
            placa: historico.placa,
            servico: servico,
            user_id: historico.user_id,
            datefinalizado: historico.datefinalizado,
        };
    };

    const combineDataArray = (
        historicoArray: HistoricoActionData[],
        servicoArray: ServicoData[]
    ): Historico_Servico[] => {
        return historicoArray.map((historico) => {
            const servico = servicoArray.find((s) => s.id === historico.service_id);
            return combineData(historico, servico);
        });
    };
    const hist_serv = combineDataArray(historicoaction.flat(), servico)
   
    



    

    const servicosAtivos = [
        { placa: 'ABC-1234', servico: 'Lavagem Completa', dataCriado: '2024-08-20', dataFinalizado: '', status: 'Em andamento' },
        { placa: 'XYZ-9876', servico: 'Polimento', dataCriado: '2024-08-22', dataFinalizado: '', status: 'Em andamento' },
    ];



    return (
        <div className="container mx-auto p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Informações do Cliente</h1>
                <p><strong>Nome:</strong> {users.map(item=>item.name)}</p>
                <p><strong>Endereço:</strong> {users.map(item=>item.endereco)}</p>
                <p><strong>Telefone:</strong> {users.map(item=>item.telefone)}</p>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Serviços Ativos</h2>
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">Placa</th>
                            <th className="py-2 px-4">Serviço</th>
                            <th className="py-2 px-4">Data Criado</th>
                            <th className="py-2 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicosAtivos.map((servico, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4 text-center">{servico.placa}</td>
                                <td className="py-2 px-4 text-center">{servico.servico}</td>
                                <td className="py-2 px-4 text-center">{servico.dataCriado}</td>
                                <td className="py-2 px-4 text-center">
                                    <span className="px-2 py-1 rounded-full text-white bg-gray-500">{servico.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Serviços Concluídos</h2>
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">Placa</th>
                            <th className="py-2 px-4">Serviço</th>
                            <th className="py-2 px-4">Data Criado</th>
                            <th className="py-2 px-4">Data Finalizado</th>
                            <th className="py-2 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hist_serv.map((item, index) =>(
                            
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4 text-center">{item.placa}</td>
                                <td className="py-2 px-4 text-center">{item.servico?.tipo}</td>
                                <td className="py-2 px-4 text-center">{item.date}</td>
                                <td className="py-2 px-4 text-center">{item.datefinalizado}</td>
                                <td className="py-2 px-4 text-center">
                                    <span className="px-2 py-1 rounded-full text-white bg-green-500">Finalizado</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaginaCliente;
