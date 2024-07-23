
import { useActionData } from '../hooks/useActionData';
import { useUserData } from '../hooks/useUserData';
import React from 'react'

const Home: React.FC = () => {

    const{data: actionData=[]}=useActionData();
    const{data: userData =[]}=useUserData();

    return (
        <>
            <div className="flex h-screen bg-gray-100 font-sans antialiased">
                    <main className="flex-1 p-6">
                <header className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-gray-700">Detalhes</h2>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Vendas registradas:</h3>
                        <p className="text-2xl font-bold">???</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Total de clientes</h3>
                        <p className="text-2xl font-bold">{userData.length}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Total Ações ativas</h3>
                        <p className="text-2xl font-bold">{actionData.length}</p>
                    </div>
                </div>
            </main>
        </div>
        </>
    )
}
export default Home;