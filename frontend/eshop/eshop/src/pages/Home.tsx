import {
    Chart as ChartJS,
    ArcElement, // Este é o "arc" que você precisa registrar
    Tooltip,
    Legend,
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import { UserData } from "../interface/UserData";
import { ServicoData } from "../interface/ServicoData";
import { useUserDataFindById } from "../hooks/useUserDataFindById";
import { CombinedHistoricoData } from '../interface/CombinedHistoricoData';
import { useActionData } from '../hooks/useActionData';
import { useHistoricoActionData } from '../hooks/useHistoricoActionData';
import { useUserData } from '../hooks/useUserData';
import { HistoricoActionData } from '../interface/HistoricoActionData';
import { useServicoDataFindById } from "../hooks/useServicoDataFindById";


import React from 'react'
import { useServicoData } from '../hooks/useServicoData';

const Home: React.FC = () => {
    const { data: actionData = [] } = useActionData();
    const { data: historicoAction = [] } = useHistoricoActionData();
    const { data: userData = [] } = useUserDataFindById(historicoAction);
    const { data: users = [] } = useUserData();
    const { data: servico = [] } = useServicoDataFindById(historicoAction);
    const { data: servicos = [] } = useServicoData()

    /* FUNCTIONANDO
    let soma = 0
    const somaPrecos = (historicoActions: HistoricoActionData[], servicos: ServicoData[]): number => {
        historicoActions.map(historicoAction => {
            const servico = servicos.find(servico => servico.id === historicoAction.service_id);
            if (!(servico?.preco == undefined)) {
                soma = soma + servico?.preco
            }
        })
        return soma
    };*/
    let soma = 0
    const combineHistoricoData = (historicoActions: HistoricoActionData[], users: UserData[], servicos: ServicoData[]): CombinedHistoricoData[] => {
        return historicoActions.map(historicoAction => {
            const user = users.find(user => user.id === historicoAction.user_id);
            const servico = servicos.find(servico => servico.id === historicoAction.service_id);
            if (!(servico?.preco == undefined)) {
                soma = soma + servico?.preco
            }
            return {
                historicoAction,
                user: user ? user : { id: undefined, name: '', endereco: '', telefone: '' },
                servico: servico ? servico : { id: undefined, preco: 0, tipo: '' }
            };
        }).filter(item => item.user.id !== undefined && item.servico.id !== undefined);
    };
    const combinedArray: CombinedHistoricoData[] = combineHistoricoData(historicoAction, userData, servico);

    /* const serviceCount = combinedArray.reduce((countMap, service) => {
         countMap[service.servico.tipo] = (countMap[service.servico.tipo] || 0) + 1;
         return countMap;
     }, {} as { [key: string]: number });
 
     console.log(serviceCount)
     console.log(servicos)*/


    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };


    const generateColor = (numColors: number) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            colors.push(generateRandomColor());
        }
        return colors;
    };
    const colors = generateColor(servicos.length);

    const serviceCount = combinedArray.reduce((countMap, item) => {
        const tipo = item.servico.tipo;
        countMap[tipo] = (countMap[tipo] || 0) + 1;
        return countMap;
    }, {} as Record<string, number>);

    //FZR PRIMEIRO SERVICO E QUANTIDADE DE SERVICOS
    const obj = {
        labels: servicos.map(item => item.tipo),
        datasets: [
            {
                label: 'Quantidade de Servicos',
                data: servicos.map(item => serviceCount[item.tipo] || 0),
                backgroundColor: colors
            }
        ]
    }

    ChartJS.register(ArcElement, Tooltip, Legend);







    return (
        <>
            <div className="flex h-screen bg-gray-100 font-sans antialiased">
                <main className="flex-1 p-6">
                    <header className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-semibold text-gray-700">Detalhes</h2>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">Vendas registradas:</h3>
                            <p className="text-2xl font-bold">R$ {soma}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">Total de clientes</h3>
                            <p className="text-2xl font-bold">{users.length}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">Total Ações ativas</h3>
                            <p className="text-2xl font-bold">{actionData.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg mt-6 flex justify-center items-center">
                        <div className="w-full max-w-lg h-auto"> 
                            <h3 className="text-xl font-semibold mb-4 text-center">Estatísticas</h3>
                            <Doughnut data={obj} />
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
export default Home;