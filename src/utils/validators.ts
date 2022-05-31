export type TFieldValidator = (value: string) => string | undefined

export const required: TFieldValidator = (value) => {
    if (value) return undefined;
    return 'Field is required';
};