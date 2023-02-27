export class StringUtils{
    async validateEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

    async agregarCaracteresIzquierda(valor: string, limite: number, caracter: string):Promise<string> {
        while (valor.length < limite) {
            valor = caracter + valor;
        }
        return valor;
    }
}