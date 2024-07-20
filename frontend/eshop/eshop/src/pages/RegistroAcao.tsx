import { useActionData } from "../hooks/useActionData";
import React, { useState } from 'react';
import { UserData } from "../interface/UserData";
import { ServicoData } from "../interface/ServicoData";
import { useUserData } from "../hooks/useUserDataFindById";
import { ActionData } from "../interface/ActionData";
import { CombinedData } from "../interface/CombinedData";
import { useServicoData } from "../hooks/useServicoDataFindById";



const Td = ({data}: {data: CombinedData}) => {

    const{action,user,servico}=data

    return (
        <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{action.placa}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{action.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servico.tipo}</td>      
            <button className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-xl w-10 h-10 flex items-center justify-center shadow-md">✔</button>
            
        </>
    )
}

const UserMag: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState('');   
    const { data: actions = []} = useActionData();
      
    const{data: users = []} = useUserData(actions)
    const{data: servico = []} = useServicoData(actions)
 
    

    const combineData = (actions: ActionData[], users: UserData[], servicos: ServicoData[]): CombinedData[] => {
            return actions.map(action => {
                const user = users.find(user => user.id === action.user_id);
                const servico = servicos.find(servico => servico.id === action.service_id);
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
  
    




    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Tabela de Ações</h1>

                 
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
                                <th className="px-4 py-2 text-left text-gray-600">Placa</th>
                                <th className="px-4 py-2 text-left text-gray-600">Data</th>
                                <th className="px-4 py-2 text-left text-gray-600">Nome</th>
                                <th className="px-4 py-2 text-left text-gray-600">Serviço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterCerto.map((item, index) => (
                                <tr key={index}
                                    onClick={() => { actions }}
                                    className="cursor-pointer hover:bg-gray-100"
                                >
                                    <Td 
                                    data={item}
                                    />

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}


export default UserMag;