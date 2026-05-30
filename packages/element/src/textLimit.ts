export const limitarTexto = (texto: string, limite: number = 1000): string => {
    if (texto.length > limite) {
        return texto.substring(0, limite);
    }
    return texto;
};
