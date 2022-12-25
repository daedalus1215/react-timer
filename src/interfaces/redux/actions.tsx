export interface Action<T> {
    type: T;
};

export interface DarkModeAction<T> extends Action<T> {
    isDarkMode: Boolean;
};

export interface RequestAction<T> extends Action<T> {
    url: String;
    requestApi: Boolean;
};

export interface RequestPostPutAction<T> extends RequestAction<T> {
    body: any;
    method: string;
};

export interface RequestPostPutFlashAction<T> extends RequestPostPutAction<T> {
    isFlash: boolean;
    flashMessage: string;
};
