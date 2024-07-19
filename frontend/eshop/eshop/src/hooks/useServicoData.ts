import axios, {AxiosPromise} from "axios";
import { ServicoData } from "../interface/ServicoData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const fetch = async (): AxiosPromise<ServicoData[]> => {
    const response = axios.get(API_URL+"/servico");
    return response;
}


export function useServicoData(){
    const query = useQuery({
        queryFn: fetch,
        queryKey: ['servico-data'],
        retry: 2
    })
    return {
        ...query,
        data: query.data?.data
    }
}