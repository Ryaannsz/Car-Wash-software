import axios, {AxiosPromise} from "axios";
import { ActionData } from "../interface/ActionData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const fetch = async (): AxiosPromise<ActionData[]> => {
    const response = axios.get(API_URL+"/action");
    return response;
}


export function useActionData(){
    const query = useQuery({
        queryFn: fetch,
        queryKey: ['action-data'],
        retry: 2
    })
    return {
        ...query,
        data: query.data?.data
    }
}