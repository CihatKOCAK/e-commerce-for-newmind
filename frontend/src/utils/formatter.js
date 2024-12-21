export default class Formatter {
    static dropDownFormatter = (options, name, value) => {
        return options.map((option) => {
            return { name: option[name], value: option[value] };
        });
    };
}