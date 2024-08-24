
    import axios from "axios";
    import { ServicoData } from "../interface/ServicoData";
    import { ActionData } from "../interface/ActionData";
    import { useQuery } from "@tanstack/react-query";
    
        
    const API_URL = 'http://localhost:8080';
    
    const fetchServicoData = async (actions: ActionData[]): Promise<ServicoData[]> => {
      
        const validId = actions
        .filter(action => action.service_id!==undefined)
        .map(action => axios.get(`${API_URL}/servico/${action.service_id}`));
        
      const responses = await Promise.all(validId);
      return responses.map(response => response.data);
    };
    
    export function useServicoDataFindById(actions: ActionData[]) {
        return useQuery<ServicoData[], Error>({
          queryKey: ['servico-data', actions.map(action => action.service_id)],
          queryFn: () => fetchServicoData(actions),
          enabled: actions.length > 0,
        });
      }