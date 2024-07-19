import axios, {AxiosPromise} from "axios";
import { ServicoData } from "../interface/ServicoData";
import { useMutation } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const postData = async (data: ServicoData): AxiosPromise<any> => {
    const response = axios.post(API_URL+"/servico", data);
    return response;
}


export function useServicoDataMutate(){

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,

    })
    return mutate;
}