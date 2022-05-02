export default interface Auth {
    type: string;
    message: string;
    user: {
        api_key: string;
        email: string;
    };
    token: string;
}