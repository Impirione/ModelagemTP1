import { Processo, ProcessStatus } from '../types';

export function precisaAnaliseUsados(processo: Processo): boolean {
    return processo.possuiUsado || processo.tipoVeiculo === 'seminovo';
}

export function proximoStatus(processo: Processo): ProcessStatus | null {
    switch (processo.status) {
        case 'aguardando_vendedor':
            return 'aguardando_gerente';

        case 'aguardando_gerente':
            return precisaAnaliseUsados(processo)
                ? 'aguardando_usados'
                : 'aguardando_financeiro';

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

        case 'pendencia':
        case 'finalizado':
            return null;

        default:
            return null;
    }
}