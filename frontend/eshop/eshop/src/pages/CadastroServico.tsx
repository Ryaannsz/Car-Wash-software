import { useState } from "react"
import { ServicoData } from "../interface/ServicoData";
import { useServicoDataMutate } from '../hooks/useServicoDataMutate'


interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <div className="mb-4">
                <label className="block text-gray-700">{label}</label>
                <input value={value} onChange={e => updateValue(e.target.value)} placeholder={`Digite seu ${label}`} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></input>
            </div>
        </>
    )
}



const CadastroServico: React.FC = () => {
    const [tipo, setTipo]=useState("");
    const [preco, setPreco]=useState(0);
    const { mutate } = useServicoDataMutate();



    const submit = () =>{
        window.location.reload();
        const servicoData: ServicoData = {
            preco,
            tipo
        }
        mutate(servicoData)
    }

    return (
        <>
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
                <div className="md:flex">
                    <div className="w-full p-4 px-5 py-5">
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold">Cadastro de Serviços</h2>
                        </div>
                        <form>
                            <Input label="Tipo" value={tipo} updateValue={setTipo}></Input>
                            <Input label="Preço" value={preco} updateValue={setPreco}></Input>
                            <div className="mt-6">
                                <button
                                    onClick={submit}
                                    type="submit"
                                    className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        </>
    )
}
export default CadastroServico;