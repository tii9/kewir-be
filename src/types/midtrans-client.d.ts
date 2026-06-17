declare module 'midtrans-client' {
    export class Snap {
        constructor(options: {
            isProduction: boolean;
            serverKey: string;
            clientKey?: string;
        });
        createTransaction(parameter: any): Promise<any>;
        createTransactionToken(parameter: any): Promise<string>;
        createTransactionRedirectUrl(parameter: any): Promise<string>;
        transaction: {
            notification(notificationJson: any): Promise<any>;
            status(orderId: string): Promise<any>;
            cancel(orderId: string): Promise<any>;
            approve(orderId: string): Promise<any>;
            deny(orderId: string): Promise<any>;
            expire(orderId: string): Promise<any>;
        };
    }

    export class CoreApi {
        constructor(options: {
            isProduction: boolean;
            serverKey: string;
            clientKey?: string;
        });
        charge(parameter: any): Promise<any>;
        capture(parameter: any): Promise<any>;
        transaction: {
            notification(notificationJson: any): Promise<any>;
            status(orderId: string): Promise<any>;
            cancel(orderId: string): Promise<any>;
            approve(orderId: string): Promise<any>;
            deny(orderId: string): Promise<any>;
            expire(orderId: string): Promise<any>;
        };
    }
}