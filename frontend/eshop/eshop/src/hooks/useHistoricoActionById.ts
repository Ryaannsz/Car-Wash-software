
import axios from "axios";
import { ActionData } from "../interface/ActionData";
import { useQuery } from "@tanstack/react-query";
import { HistoricoActionData } from "../interface/HistoricoActionData";

    
const API_URL = 'http://localhost:8080';

const fetchUserData = async (actions: ActionData[]): Promise<HistoricoActionData[]> => {
  const requests = actions.map(action => axios.get(`${API_URL}/historicoaction/usuario/${action.user_id}`));
  const responses = await Promise.all(requests);
  return responses.map(response => response.data);
};

export function useHistoricoActionDataFindById(historicoactions: ActionData[]) {
    return useQuery<HistoricoActionData[], Error>({
      queryKey: ['historicoaction-data', historicoactions.map(action => action.user_id)],
      queryFn: () => fetchUserData(historicoactions),
      enabled: historicoactions.length > 0,
    });
  }