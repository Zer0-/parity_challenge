export function get(url) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.onload = resolve;
        req.onerror = reject;
        req.open('GET', url);
        req.send();
    });
}
