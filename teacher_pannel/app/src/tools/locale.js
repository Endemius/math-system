import cookie from "./cookie";

const locale = {
    get() {
        return cookie.get('locale');
    },
    switch() {
        switch (this.get()) {
            case "kz":
                cookie.set('locale', 'ru')
                break;

            case "ru":
                cookie.set('locale', 'kz')
                break;

            case "en":
                cookie.set('locale', 'en')
                break;
        }
        window.location.reload();
    }
}

export default locale;