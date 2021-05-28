import { CustomError } from 'ts-custom-error';

export class HTTPError extends CustomError {
    constructor(public code: number, public response: Record<string, string>, message?: string) {
        super(message);
        Object.defineProperty(this, 'name', { value: 'HTTPError' });
    }
}
