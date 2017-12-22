let store = () => undefined;
let get = () => null;

if (process.browser) {
    get = (key, isObject = true) => {
        let data = localStorage.getItem(key);

        if (data && isObject) {
            data = JSON.parse(data);
        }

        return data;
    };

    store = (key, data, isObject = true) => {
        if (isObject) {
            data = JSON.stringify(data);
        }

        localStorage.setItem(key, data);
    };
}

export const getUser = () => get('user');

export const storeUser = (user) => store('user', user);
