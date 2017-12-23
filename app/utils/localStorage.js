let store = () => undefined;
let get = () => null;
let remove = () => undefined;

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

    remove = (key) => {
        localStorage.removeItem(key);
    };
}

export const getUser = () => get('user');

export const storeUser = (user) => store('user', user);

export const removeUser = () => remove('user');
