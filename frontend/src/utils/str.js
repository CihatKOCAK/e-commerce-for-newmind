export class Str {
    //ilk harfleri büyük yapar
    static capitalize(str) {
        return str.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
}