import { Processo } from "../types";

export function proximoStatus(processo: Processo){

    switch(processo.status){

        case 'aguardando_vendedor':

            return 'aguardando_gerente';

        case 'aguardando_gerente':

            if(
                processo.possuiUsado ||
                processo.tipoVeiculo=='seminovo'
            ){

                return 'aguardando_usados';

            }

            return 'aguardando_financeiro';

        case 'aguardando_usados':

            return 'aguardando_financeiro';

        case 'aguardando_financeiro':

            return 'aguardando_secretaria';

        case 'aguardando_secretaria':

            return 'aguardando_liberacao';

        case 'aguardando_liberacao':

            return 'aguardando_entrega';

        case 'aguardando_entrega':

            return 'finalizado';

    }

}