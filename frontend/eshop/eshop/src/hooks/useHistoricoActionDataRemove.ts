import { useMutation } from "@tanstack/react-query"
import axios, { AxiosPromise } from "axios"
import { CombinedHistoricoData } from "../interface/CombinedHistoricoData"


const API_URL = "http://localhost:8080"


const deleteData = async (id: CombinedHistoricoData): AxiosPromise<any> =>{
    const response=axios.delete(`${API_URL}/historicoaction/delete/${id.historicoAction.id}`)
    return response
}

export function useHistoricoActionDataRemove(){
    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
    })
    return mutate;
}