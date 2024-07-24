import axios, {AxiosPromise} from "axios";
import { useQuery } from "@tanstack/react-query";
import { HistoricoActionData } from "../interface/HistoricoActionData";

const API_URL = 'http://localhost:8080'

const fetch = async (): AxiosPromise<HistoricoActionData[]> => {
    const response = axios.get(API_URL+"/historicoaction");
    return response;
}


export function useHistoricoActionData(){
    const query = useQuery({
        queryFn: fetch,
        queryKey: ['historicoaction-data'],
        retry: 2
    })
    return {
        ...query,
        data: query.data?.data
    }
}