const get = (key, isObject = true) => {
    let data = localStorage.getItem(key);

    if (data && isObject) {
        data = JSON.parse(data);
    }

    return data;
};

export const getUser = () => get('user');

export const storeUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};
