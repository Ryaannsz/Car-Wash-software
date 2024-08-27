import { CombinedHistoricoData } from "../interface/CombinedHistoricoData"


export function TdHistorico({data}: {data: CombinedHistoricoData}) {
    const{historicoAction,user,servico}=data
    const date = new Date(historicoAction.date)
    const dateFinalizado = new Date(historicoAction.datefinalizado)
    let formattedDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString()
    let formattedDateFinalizado = dateFinalizado.getDate() < 10 ? '0' + dateFinalizado.getDate() : dateFinalizado.getDate().toString()
    return (
        <>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{historicoAction.placa}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servico.tipo}</td> 
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formattedDate}-{date.getMonth()+1}-{date.getFullYear()}</td>       
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formattedDateFinalizado}-{dateFinalizado.getMonth()+1}-{dateFinalizado.getFullYear()}</td>     
        </>
    )
}

