import { CombinedData } from "../interface/CombinedData"


export function Td({data}: {data: CombinedData}) {
    const{action,user,servico}=data
    const date = new Date(action.date)
    let formattedDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString()
    
    
    return (
        <>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{action.placa}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servico.tipo}</td> 
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formattedDay}-{date.getMonth()+1}-{date.getFullYear()}</td>       
        </>
    )
}

