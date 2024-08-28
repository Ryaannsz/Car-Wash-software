
import React from 'react';
import { useActionDataFindById } from '../hooks/useActionDataFindById';
import { useUserDataFindById } from '../hooks/useUserDataFindById';
import { useServicoDataFindById } from '../hooks/useServicoDataFindById';
import { useParams } from 'react-router-dom';
import { ActionData } from '../interface/ActionData';
import { useHistoricoActionDataFindById } from '../hooks/useHistoricoActionById';
import { HistoricoActionData } from '../interface/HistoricoActionData';
import { CombinedHistoricoData } from '../interface/CombinedHistoricoData';
import { ServicoData } from '../interface/ServicoData';
import { useNavigate } from 'react-router-dom';

interface Historico_Servico{
    id?: number;
    date: string;
    placa: string;
    servico: ServicoData | undefined;
    user_id: number | undefined;
    datefinalizado: string;
}
interface Action_Servico {
    id?: number;
    date: string;
    placa: string;
    servico: ServicoData | undefined;
    user_id: number | undefined;
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
    const {data: action = []}=useActionDataFindById(actionDataArray)
    const navigate = useNavigate();

    const handleBack= () => {
        navigate(-1); // Volta para a página anterior
    };

    //combinar data Historico_Servico
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
    //combinar data Historico_Servico


    //combinar data Action_Servico
    const combineActionData = (
        action: ActionData,
        servico: ServicoData | undefined
    ): Action_Servico => {
        return {
            id: action.id,
            date: action.date,
            placa: action.placa,
            servico: servico,
            user_id: action.user_id,
        };
    };
    const combineActionDataArray = (
        actionArray: ActionData[],
        servicoArray: ServicoData[]
    ): Action_Servico[] => {
        return actionArray.map((action) => {
            const servico = servicoArray.find((s) => s.id === action.service_id);
            return combineActionData(action, servico);
        });
    };
    const action_serv = combineActionDataArray(action.flat(), servico);
    //combinar data Action_Servico
   
    //console.log("Action servico")
    //console.log(action_serv)
    ///console.log("Historico servico")
    //console.log(hist_serv)






    return (
        <div className="container mx-auto p-4">
    <div className="flex justify-between items-center mb-2">
    <h1 className="text-2xl font-bold">Informações do Cliente</h1>
        <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Voltar
        </button>

    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <p><strong>Nome:</strong> {users.map(item => item.name)}</p>
        <p><strong>Endereço:</strong> {users.map(item => item.endereco)}</p>
        <p><strong>Telefone:</strong> {users.map(item => item.telefone)}</p>
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
                {action_serv.map((item, index) => (
                    <tr key={index} className="border-b cursor-pointer hover:bg-gray-100">
                        <td className="py-2 px-4 text-center ">{item.placa}</td>
                        <td className="py-2 px-4 text-center">{item.servico?.tipo}</td>
                        <td className="py-2 px-4 text-center">{item.date}</td>

                        <td className="py-2 px-4 text-center">
                            <span className="px-2 py-1 rounded-full text-white bg-gray-500">Em andamento</span>
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
                    <tr key={index} className="border-b cursor-pointer hover:bg-gray-100">
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
