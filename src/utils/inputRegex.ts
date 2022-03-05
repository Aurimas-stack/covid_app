export const checkLocationString = (str: string): boolean => {
    return /^[A-Za-z\s]*$/.test(str);
}