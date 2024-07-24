import { useMutation } from "@tanstack/react-query"
import axios, { AxiosPromise } from "axios"
import { CombinedData } from "../interface/CombinedData"


const API_URL = "http://localhost:8080"


const deleteData = async (id: CombinedData): AxiosPromise<any> =>{
    const response=axios.delete(`${API_URL}/action/delete/${id.action.id}`)
    return response
}

export function useActionDataRemove(){
    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
    })
    return mutate;
}