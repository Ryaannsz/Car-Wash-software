import { CombinedData } from "../interface/CombinedData"


export function Td({data}: {data: CombinedData}) {
    const{action,user,servico}=data
    return (
        <>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{action.placa}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servico.tipo}</td> 
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{action.date}</td>       
        </>
    )
}

