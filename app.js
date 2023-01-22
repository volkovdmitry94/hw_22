(() => {
    const store1 = new Store();
    //Initial instances
    const milk1 = new Milk('Milk 3%', 'Tara', 13, 3);
    const chocolate1 = new Chocolate('Milka', 'Nestle', 10, 'milk');
    const wine1 = new Wine('Chianti', 'Toskana wine', 35, 12);
    store1.add(milk1);
    store1.add(chocolate1);
    store1.add(wine1);

    const productsBtn = document.getElementById('productsLink');
    const addBtn = document.getElementById('addLink');
    const formProducts = document.getElementById('form_products');
    const contentNav = document.getElementById('content_nav');
    const contentSection = document.getElementById('content');

    // Tabs
    productsBtn.addEventListener('click', () => {
        productsBtn.classList.add('active');
        addBtn.classList.remove('active');
        formProducts.style.display = 'none';
        contentNav.style.display = 'block';
        contentSection.style.display = 'flex';
        document.querySelectorAll('#content_nav li').forEach(node => {
            node.classList.remove('active');
        });
        document.querySelector('#content_nav li:first-child').classList.add('active');
        render(store1.getAll());
    });
    addBtn.addEventListener('click', () => {
        productsBtn.classList.remove('active');
        addBtn.classList.add('active');
        formProducts.style.display = 'block';
        contentNav.style.display = 'none';
        contentSection.style.display = 'none';
    })

    // Form changing
    formProducts.type.addEventListener('change', event => {
        let productType = event.target.value;
        switch (productType) {
            case 'milk': {
                document.getElementById('last_input').innerHTML =
                    `<input class="form-control" type="number" name="fat" 
                    placeholder="Type fat" min="0" max="20" required>`;
                break;
            }
            case 'chocolate': {
                document.getElementById('last_input').innerHTML =
                    `<input class="form-control" type="text" name="kind" 
                    placeholder="Type kind of chocolate" maxlength="100" required>`;
                break;
            }
            case 'wine': {
                document.getElementById('last_input').innerHTML =
                    `<input class="form-control" type="number" name="alcohol" 
                    placeholder="Type alcohol percent" min="0" max="100" required>`;
                break;
            }
        }
    });

    // Creating a new instance
    formProducts.addEventListener('submit', (event) => {
        event.preventDefault();
        let createdObject = {};
        switch (formProducts.type.value) {
            case 'milk': {
                createdObject = new Milk(formProducts.title.value, formProducts.manufc.value,
                    formProducts.price.value, formProducts.fat.value);
                break;
            }
            case 'chocolate': {
                createdObject = new Chocolate(formProducts.title.value, formProducts.manufc.value,
                    formProducts.price.value, formProducts.kind.value);
                break;
            }
            case 'wine': {
                createdObject = new Wine(formProducts.title.value, formProducts.manufc.value,
                    formProducts.price.value, formProducts.alcohol.value);
                break;
            }
        }
        store1.add(createdObject);
        formProducts.reset();
    });

    const render = (store) => {
        const getSpecial = (value) => {
            if (value instanceof Milk) return `fat: ${value.fatGetter}`
            else if (value instanceof Chocolate) return `kind: ${value.kindGetter}`
            else if (value instanceof Wine) return `alc: ${value.alcoholGetter}`
        }

        contentSection.innerHTML = store.map(product => {
            return `<div class="card">
            <h2>${product.constructor.name}</h2>
            <h3>${product.titleGetter}</h3>
            <h3>${product.manufactureGetter}</h3>
            <h3>${getSpecial(product)}</h3>
            <h3>${product.priceGetter}</h3>
        </div>`
        }).join('');
    };

    // Sort by Class
    contentNav.addEventListener('click', event => {
        document.querySelectorAll('#content_nav li').forEach(node => {
            node.classList.remove('active');
        });
        event.target.classList.add('active');
        if (event.target.dataset.name === 'All') {
            render(store1.getAll());
        } else {
            render(store1.getByType(event.target.dataset.name));
        }
    });

    render(store1.getAll());

})();