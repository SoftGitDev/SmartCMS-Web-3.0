export interface documentSaveProps {
    base64: any,
    width?: number,
    height?: number
    file?: File;
}

export interface bankLogoProps {
    logo: string,
    bankCode: string,
    logoWidth: number,
    logoHeight: number,
    mainLogo: string,
    mainLogoWidth: number,
    mainLogoHeight: number,
}