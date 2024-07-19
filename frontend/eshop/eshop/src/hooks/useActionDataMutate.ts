import axios, {AxiosPromise} from "axios";
import { ActionData } from "../interface/ActionData";
import { useMutation } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const postData = async (data: ActionData): AxiosPromise<any> => {
    const response = axios.post(API_URL+"/action", data);
    return response;
}


export function useActionDataMutate(){

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,

    })
    return mutate;
}