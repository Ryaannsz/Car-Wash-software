import { HistoricoActionData} from "./HistoricoActionData"
import { UserData } from "./UserData";
import { ServicoData } from "./ServicoData";

export interface CombinedHistoricoData{
    historicoAction: HistoricoActionData,
    servico: ServicoData,
    user: UserData
}