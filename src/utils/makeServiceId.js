export function makeServiceId (name) {
    return name.replaceAll(' ', '-').toLowerCase();
}