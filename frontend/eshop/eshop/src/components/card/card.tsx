

interface CardProps {
    name: string,
    descricao: string,
    img: string

}

export function Card({name, descricao, img}: CardProps) {
    return (
        <div>
            <div className="bg-white rounded-lg shadow-md">
                <img src={img} className="w-full h-64 object-cover object-center"/>
                <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                    <p className="text-gray-600 mt-2">{descricao}</p>
                    <div className="mt-4 flex justify-center">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}