

import axios from "axios";
import { UserData } from "../interface/UserData";
import { ActionData } from "../interface/ActionData";
import { useQuery } from "@tanstack/react-query";

    
const API_URL = 'http://localhost:8080';

const fetchUserData = async (actions: ActionData[]): Promise<UserData[]> => {
  const requests = actions.map(action => axios.get(`${API_URL}/user/${action.user_id}`));
  const responses = await Promise.all(requests);
  return responses.map(response => response.data);
};

export function useUserData(actions: ActionData[]) {
    return useQuery<UserData[], Error>({
      queryKey: ['user-data', actions.map(action => action.user_id)],
      queryFn: () => fetchUserData(actions),
      enabled: actions.length > 0,
    });
  }