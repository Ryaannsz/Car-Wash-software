import axios, {AxiosPromise} from "axios";
import { UserData } from "../interface/UserData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const fetch = async (): AxiosPromise<UserData[]> => {
    const response = axios.get(API_URL+"/user");
    return response;
}


export function useUserData(){
    const query = useQuery({
        queryFn: fetch,
        queryKey: ['user-data'],
        retry: 2
    })
    return {
        ...query,
        data: query.data?.data
    }
}