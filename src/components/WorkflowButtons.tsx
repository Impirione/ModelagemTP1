interface Botao{

    texto:string;

    acao:string;

}

interface Props{

    titulo:string;

    botoes:Botao[];

}

export default function WorkflowButtons({

    titulo,

    botoes

}:Props){

    return(

        <div>

            <p className="font-semibold mb-2">

                {titulo}

            </p>

            <div className="space-y-2">

                {botoes.map(botao=>(

                    <button

                        key={botao.texto}

                        className="w-full rounded bg-blue-600 text-white py-2"

                    >

                        {botao.texto}

                    </button>

                ))}

            </div>

        </div>

    );

}