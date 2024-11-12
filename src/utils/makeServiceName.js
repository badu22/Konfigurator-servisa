export function makeServiceName (id) {
    return String(id).charAt(0).toUpperCase() + String(id).slice(1).replaceAll('-', ' ');
}