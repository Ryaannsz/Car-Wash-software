import {
    Chart as ChartJS,
    ArcElement, // Este é o "arc" que você precisa registrar
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
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


import React, { useState } from 'react'
import { useServicoData } from '../hooks/useServicoData';

const Home: React.FC = () => {
    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
        LinearScale,
        BarElement,
        Title,);

    const { data: actionData = [] } = useActionData();
    const { data: historicoAction = [] } = useHistoricoActionData();
    const { data: userData = [] } = useUserDataFindById(historicoAction);
    const { data: users = [] } = useUserData();
    const { data: servico = [] } = useServicoDataFindById(historicoAction);
    const { data: servicos = [] } = useServicoData()
    const [selectedOption, setSelectedOption] = useState('option1')
    const [viewBarOption, setViewBarOption] = useState('month')
    const [selectedYear, setSelectedYear]=useState('2024')

    //Transformando os objetos em um só
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

    //Sistema de cor
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








    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    //CERTO é item.historicoAction.datefinalizado POREM PRA TESTE USEI O DATE APENAS
    //CONFIGURAR PARA VER O MES DE CADA ANO E NAO TODOS OS MESES REFERENTE DE TODOS OS ANOS
    //CERTO é item.historicoAction.datefinalizado POREM PRA TESTE USEI O DATE APENAS
    //Essa função pega a quantiade de serviços feitos em cada ano

    /*const getMonthCount = combinedArray.reduce((countMapMouth, item) => {
        const mouthname = new Date(item.historicoAction.date)
        countMapMouth[mouthname.getMonth()] = (countMapMouth[mouthname.getMonth()] || 0) + 1
        return countMapMouth

    }, {} as Record<string, number>)*/

    //CONFIGURAR PARA VER O MES DE CADA ANO E NAO TODOS OS MESES REFERENTE DE TODOS OS ANOS
    //CERTO é item.historicoAction.datefinalizado POREM PRA TESTE USEI O DATE APENAS
    //Essa função pega o quanto ganhou em cada mes

    /*const getMonthValue = combinedArray.reduce((countMapMouth, item) => {
        const mouthname = new Date(item.historicoAction.date)

        countMapMouth[mouthname.getMonth()] = (countMapMouth[mouthname.getMonth()] || 0) + item.servico.preco
        return countMapMouth

    }, {} as Record<string, number>)*/


    //CERTO é item.historicoAction.datefinalizado POREM PRA TESTE USEI O DATE APENAS
    //Essa função pega a quantiade de serviços feitos em cada ano

   /* const getYearCount = combinedArray.reduce((countMapYear, item) => {
        const year = new Date(item.historicoAction.date).getFullYear().toString();
        countMapYear[year] = (countMapYear[year] || 0) + 1;
        return countMapYear;
    }, {} as Record<string, number>);*/

    //CERTO é item.historicoAction.datefinalizado POREM PRA TESTE USEI O DATE APENAS
    //Essa função pega o quanto ganhou em cada ano
    const getYearValue = combinedArray.reduce((countMapYear, item) => {
        const year = new Date(item.historicoAction.date).getFullYear().toString();
        countMapYear[year] = (countMapYear[year] || 0) + item.servico.preco;
        return countMapYear;
    }, {} as Record<string, number>);

    const getYeahDate = () => {
        const anosUnicos = new Set<string>();
        historicoAction.map(item => {
            const nova = new Date(item.date)
            anosUnicos.add(nova.getFullYear().toString())
        })
        const ordenados = Array.from(anosUnicos).sort((a, b) => parseInt(a) - parseInt(b));
        return ordenados
    }

    const years = getYeahDate()

    const optionSelected = (event: any) => {
        setSelectedOption(event.target.value)
    }
    const viewBarOptionSelected = (option: any) => {
        setViewBarOption(option)
    }

    const yearSelected = (event: any) =>{
        setSelectedYear(event.target.value)
        
    }

    //NAO É DATE, É DATEFINALIZADO DATE SO PRA TESTE

    const getSpecificMonth = combinedArray.reduce((countMonth, item)=>{
        const newdate = new Date(item.historicoAction.date)
        if(selectedYear==newdate.getFullYear().toString()){
            countMonth[newdate.getMonth()] = (countMonth[newdate.getMonth()] || 0) + item.servico.preco
        }
        return countMonth
    }, {} as Record<string, number>)

  



    

    const dataTotal = {
        option1: {
            labels: servicos.map(item => item.tipo), datasets: [{
                label: 'Quantidade de Servicos',
                data: servicos.map(item => serviceCount[item.tipo] || 0),
                backgroundColor: colors
            }]
        },
        option2: {
            labels: months, datasets: [{
                label: 'Valores ganhos mensais',
                data: months.map((_, index) => getSpecificMonth[index] || 0),
                backgroundColor: ['#36A2EB']
            }]
        },
        option3: {
            labels: years, datasets: [{
                label: 'Valores ganhos anuais',
                data: Object.values(getYearValue),
                backgroundColor: ['#36A2EB']
            }]
        }
    }



    const coinConverter = (amount: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    };

    return (
        <>
            <div className="flex h-screen bg-gray-100 font-sans antialiased">
                <main className="flex-1 p-6">
                    <header className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-semibold text-gray-700">Dashboard</h2>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">Vendas registradas:</h3>
                            <p className="text-2xl font-bold">{coinConverter(soma)}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">Total de clientes</h3>
                            <p className="text-2xl font-bold">{users.length}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">Total ações ativas</h3>
                            <p className="text-2xl font-bold">{actionData.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
    <div className="flex items-center justify-start">
        <h3 className="text-xl font-semibold mb-4">Estatísticas</h3>
    </div>
    <div className="flex items-center justify-end">
        <select
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={optionSelected}
        >
            <option value="option1">Análise de serviços feitos</option>
            <option value="option2">Análise de ganhos</option>
            <option value="option3">EM BREVE...</option>
        </select>
    </div>
</div>

                        {selectedOption == 'option1' && (
                            <div className="flex justify-center items-center mt-2">
                                <div className="w-full max-w-lg h-auto mt-4">
                                    <Doughnut data={dataTotal.option1} />
                                </div>
                            </div>
                        )}
                        {selectedOption == 'option2' && (
                            <div>

                                

                                <div className="flex justify-center items-center mt-2">
                                    <button
                                        className={`px-4 py-2 mr-2 ${viewBarOption === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                        onClick={() => viewBarOptionSelected('month')}
                                    >
                                        Visualizar por Mês
                                    </button>
                                    <button
                                        className={`px-4 py-2 ${viewBarOption === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                        onClick={() => viewBarOptionSelected('year')}
                                    >
                                        Visualizar por Ano
                                    </button>
                                </div>
                                {viewBarOption==='month' && (
                                <>
                                <div className="flex items-center justify-start">
                                    <select className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={yearSelected}>
                                        {years.reverse().map(item => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-center items-center mt-2">
                                    <div className="w-full max-w-lg h-auto mt-4">

                                        <Bar data={dataTotal.option2} />
                                    </div>
                                </div>
                                </>
                                )}{viewBarOption==='year' && (
                                    <div className="flex justify-center items-center mt-2">
                                    <div className="w-full max-w-lg h-auto mt-4">

                                        <Bar data={dataTotal.option3} />
                                    </div>
                                </div>
                                )}
                                
                                
                            </div>
                        )}
                        {selectedOption == 'option3' && (
                            <div className="flex justify-center items-center mt-2">
                                <div className="w-full max-w-lg h-auto mt-4">
                                    <h1>EM BREVE</h1>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>

    )
}
export default Home;