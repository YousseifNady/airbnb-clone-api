
export abstract class BaseCustomException extends Error {
    abstract status: number;

    protected constructor(message: string) {
        super(message);
    }
}