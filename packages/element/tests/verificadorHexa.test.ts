import { test, expect } from 'vitest';
import { verificarCodigoHexa } from '../src/verificadorHexa';

test('valida código hexadecimal com # e 6 dígitos maiúsculos', () => {
    const codigo: string = "#FFFFFF";

    const resultado = verificarCodigoHexa(codigo);

    expect(resultado).toBe(true);
});

test('inválido quando não começa com #', () => {
    const codigo: string = "000000";

    const resultado = verificarCodigoHexa(codigo);

    expect(resultado).toBe(false);
});

test('inválido quando possui menos de 6 dígitos após #', () => {
    const codigo: string = "#FFFFF";

    const resultado = verificarCodigoHexa(codigo);

    expect(resultado).toBe(false);
});

// Ciclos adicionais (3 testes novos)
test('valida código hexadecimal com letras minúsculas', () => {
    const codigo: string = "#abcdef";

    const resultado = verificarCodigoHexa(codigo);

    expect(resultado).toBe(true);
});

test('inválido quando contém caracteres não-hexadecimais', () => {
    const codigo: string = "#GGGGGG";

    const resultado = verificarCodigoHexa(codigo);

    expect(resultado).toBe(false);
});

test('inválido quando possui mais de 6 dígitos após #', () => {
    const codigo: string = "#FFFFFFF";

    const resultado = verificarCodigoHexa(codigo);

    expect(resultado).toBe(false);
});

//Ciclo 4: suportar shorthand 3-dígitos (ex.: #ABC)
test('valida shorthand 3-dígitos', () => {
    const codigo: string = "#ABC";

    const resultado = verificarCodigoHexa(codigo);

    expect(resultado).toBe(true);
});

//Ciclo 5: aceitar códigos com espaços em volta (deve ser válido após trim)
test('valida com espaços em volta', () => {
    const codigo: string = "  #ABC  ";

    const resultado = verificarCodigoHexa(codigo);

    expect(resultado).toBe(true);
});

//Ciclo 6: aceitar hex com 4 e 8 dígitos (ex.: #RGBA e #RRGGBBAA)
test('valida hex 4-dígitos (com alpha shorthand)', () => {
    const codigo: string = "#1234";

    const resultado = verificarCodigoHexa(codigo);

    expect(resultado).toBe(true);
});

test('valida hex 8-dígitos (com alpha)', () => {
    const codigo: string = "#12345678";

    const resultado = verificarCodigoHexa(codigo);

    expect(resultado).toBe(true);
});

test('inválido quando possui mais de 8 dígitos após #', () => {
    const codigo: string = "#123456789";

    const resultado = verificarCodigoHexa(codigo);

    expect(resultado).toBe(false);
});