class Product {
    static counter = 1000;
    #id;
    #title;
    #manufacture;
    #price;

    constructor(title = 'Default title',
                manufacture = 'Default manufacture',
                price = 0) {
        this.#id = Product.counter++;
        this.#title = title;
        this.#manufacture = manufacture;
        this.#price = Number(price);
    }
    get idGetter() {
        return this.#id;
    }
    get titleGetter() {
        return this.#title;
    }
    set titleSetter(newTitle) {
        if (newTitle) this.#title = newTitle;
    }
    get manufactureGetter() {
        return this.#manufacture;
    }
    set manufactureSetter(newManufacture) {
        if (newManufacture) this.#manufacture = newManufacture;
    }
    get priceGetter() {
        return this.#price;
    }
    set priceSetter(newPrice) {
        if (newPrice) this.#price = Number(newPrice);
    }
}

class Milk extends Product {
    #fat;

    constructor(title, manufacture, price, fat = 0) {
        super(title, manufacture, price);
        this.#fat = Number(fat);
    }
    get fatGetter() {
        return this.#fat;
    }
    set fatSetter(newFat) {
        if (newFat) this.#fat = Number(newFat);
    }
}

class Chocolate extends Product {
    #kind;

    constructor(title, manufacture, price, kind = 'Default kind') {
        super(title, manufacture, price);
        this.#kind = kind;
    }
    get kindGetter() {
        return this.#kind;
    }
    set kindSetter(newKind) {
        if (newKind) this.#kind = newKind;
    }
}

class Wine extends Product {
    #alcohol;

    constructor(title, manufacture, price, alcohol = 0) {
        super(title, manufacture, price);
        this.#alcohol = Number(alcohol);
    }
    get alcoholGetter() {
        return this.#alcohol;
    }
    set alcoholSetter(newAlcohol) {
        if (newAlcohol) this.#alcohol = Number(newAlcohol);
    }
}

class Store {
    #products;

    constructor() {
        this.#products = [];
    }

    add(product) {
        if (this.#products.find(item => item.idGetter === product.idGetter)) {
            console.log('Add error, id of product is not unique');
        } else {
            this.#products.push(product);
        }
    }
    getAll() {
        return this.#products;
    }
    getByType(type) {
        switch (type.toLowerCase()) {
            case 'milk':
                return this.#products.filter(item => item instanceof Milk);
            case 'chocolate':
                return this.#products.filter(item => item instanceof Chocolate);
            case 'wine':
                return this.#products.filter(item => item instanceof Wine);
            default:
                console.log('Input error, please input Milk, Chocolate or Wine');
                break;
        }
    }

}