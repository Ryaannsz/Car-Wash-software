import axios, {AxiosPromise} from "axios";
import { ProdutoData } from "../interface/ProdutoData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const fetch = async (): AxiosPromise<ProdutoData[]> => {
    const response = axios.get(API_URL+"/shop");
    return response;
}


export function useProdutoData(){
    const query = useQuery({
        queryFn: fetch,
        queryKey: ['food-data'],
        retry: 2
    })
    return {
        ...query,
        data: query.data?.data
    }
}