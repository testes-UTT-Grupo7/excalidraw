//BLUE:construir a regex a partir das permissões para deixar a intenção clara
const ALLOWED_HEX_LENGTHS = [3, 4, 6, 8];
const pattern = ALLOWED_HEX_LENGTHS.map((l) => `[0-9A-Fa-f]{${l}}`).join('|');
const HEX_COLOR_REGEX = new RegExp(`^#(${pattern})$`);

const isValidHex = (s: string): boolean => HEX_COLOR_REGEX.test(s);

export const verificarCodigoHexa = (codigo: string): boolean => {
    //BLUE:pequena refatoração — separar validação e normalização
    const normalized = codigo.trim();

    return isValidHex(normalized);
};
