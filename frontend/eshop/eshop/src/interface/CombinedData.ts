import { ActionData } from "./ActionData";
import { UserData } from "./UserData";
import { ServicoData } from "./ServicoData";

export interface CombinedData{
    action: ActionData,
    servico: ServicoData,
    user: UserData
}