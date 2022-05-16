export type TPost = {
    id: number,
    message: string,
    likesCount: number,
};
export type TPhotos = {
    small: string | null,
    large: string | null,
};
export type TContacts = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string,
};
export  type TProfile = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: TContacts,
    photos: TPhotos,
    aboutMe: string,
};
export type TUser = {
    id: number,
    name: string,
    status: string,
    photos: TPhotos,
    followed: boolean,
}
export type TDialog = {
    id: number,
    name: string,
}

export type TMessage = {
    id: number,
    message: string
}
