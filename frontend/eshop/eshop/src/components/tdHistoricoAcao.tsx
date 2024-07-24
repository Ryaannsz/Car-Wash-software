import { CombinedHistoricoData } from "../interface/CombinedHistoricoData"


export function TdHistorico({data}: {data: CombinedHistoricoData}) {
    const{historicoAction,user,servico}=data
    return (
        <>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{historicoAction.placa}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servico.tipo}</td> 
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{historicoAction.date}</td>       
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{historicoAction.datefinalizado}</td>     
        </>
    )
}

