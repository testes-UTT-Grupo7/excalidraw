export const limitarTexto = (texto: string, limite: number = 1000): string => {
    if (!texto) return "";
    
    if (limite <= 0) return "";

    texto = texto.trim();

    if (texto.length > limite) {
        return texto.substring(0, Math.max(0, limite - 3)) + "...";
    }
    return texto;
};