
import axios from "axios";
import { ActionData } from "../interface/ActionData";
import { useQuery } from "@tanstack/react-query";


    
const API_URL = 'http://localhost:8080';

const fetchUserData = async (actions: ActionData[]): Promise<ActionData[]> => {
  const requests = actions.map(action => axios.get(`${API_URL}/action/usuario/${action.user_id}`));
  const responses = await Promise.all(requests);
  return responses.map(response => response.data);
};

export function useActionDataFindById(actions: ActionData[]) {
    return useQuery<ActionData[], Error>({
      queryKey: ['action-data', actions.map(action => action.user_id)],
      queryFn: () => fetchUserData(actions),
      enabled: actions.length > 0,
    });
  }