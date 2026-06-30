import { Processo, User } from "../types";
import WorkflowButtons from "./WorkflowButtons";

interface Props{
    processo: Processo;
    user: User;
}

export default function WorkflowProcesso({
    processo,
    user
}:Props){

    switch(processo.status){

        case 'aguardando_vendedor':

            return (

                <WorkflowButtons
                    titulo="Processo pronto?"
                    botoes={[
                        {
                            texto:"Enviar para aprovação do gerente",
                            acao:"gerente"
                        }
                    ]}
                />

            );

        case 'aguardando_gerente':

            return (

                <WorkflowButtons
                    titulo="Processo está OK?"
                    botoes={[
                        {
                            texto:
                            processo.possuiUsado ||
                            processo.tipoVeiculo ==='seminovo'
                            ?
                            "Enviar para análise do seminovo"
                            :
                            "Enviar para conferência financeira",

                            acao:"proximo"
                        },
                        {
                            texto:"Não, resolver pendência",
                            acao:"pendencia"
                        }
                    ]}
                />

            );

        case 'aguardando_usados':

            return (

                <WorkflowButtons
                    titulo="Processo está OK?"
                    botoes={[
                        {
                            texto:"Enviar para conferência financeira",
                            acao:"financeiro"
                        },
                        {
                            texto:"Não, resolver pendência",
                            acao:"pendencia"
                        }
                    ]}
                />

            );

        //....

    }

}