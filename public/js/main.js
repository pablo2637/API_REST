document.addEventListener('DOMContentLoaded', () => {

    const main = document.querySelector('main');
    const divFormDash = document.querySelector('#divFormulario form');
    const spnID = document.querySelector('#spnID');
    const labelTipoDash = document.querySelector('#labelTipoDash');
    const divMenu = document.querySelector('#divMenu');
    const imgFormDash = document.querySelector('#imgFormDash');
    const spnFechaAlta = document.querySelector('#spnFechaAlta');
    const divNavContenedor = document.querySelector('.divNavContenedor');
    const divCart = document.querySelector('#divCart');
    const tbodyCart = document.querySelector('#divCart tbody');
    const tdTotalCart = document.querySelector('#totalCart');

    const arrayCarrito = JSON.parse(localStorage.getItem('arrayCarrito')) || [];
    const URL_API_ID = 'http://localhost:3000/api/v1/productos/id/';


    divMenu.addEventListener('click', ({ target }) => {
        if (target.matches('i')) {
            if (target.parentNode.id == 'btnMenu') {
                divNavContenedor.classList.toggle('mostrarNav');
            } else if (target.parentNode.id == 'btnCart') {
                divCart.classList.toggle('mostrarCart');
            } else {
                console.log(target);
            }
        }
    })

    main.addEventListener('click', ev => {
        ev.preventDefault();
        // console.log(ev.target)

        if (ev.target.id == 'btnCancelarDash') {
            spnID.textContent = '';
            spnFechaAlta.textContent = '';
            imgFormDash.src = 'assets/noPic.png';
            divFormDash.reset();
        }

        if (ev.target.parentNode.matches('tr') && ev.target.baseURI.includes('dashboard')) {
            getDataToForm(ev.target.parentNode);
        } else if (ev.target.parentNode.matches('td') &&
            ev.target.matches('img') && ev.target.baseURI.includes('dashboard')) {
            getDataToForm(ev.target.parentNode.parentNode);
        }

        if (ev.target.matches('button')) {
            console.log(ev.target)
        } else if (ev.target.matches('i')) {
            if (ev.target.parentNode.classList.contains('btnAddToCart')) {
                addToCart(ev.target.id);
            }
        }
    })

    const getDataToForm = element => {
        let fechaAlta = '', tipo = '', descripcion = '', imagen = '', precio = 0, imgSrc = '';

        if (element.classList.contains('serviciosDash')) {

            fechaAlta = element.cells[3].textContent;
            tipo = element.cells[1].textContent;
            descripcion = element.cells[2].textContent;
            imagen = '-';
            precio = 0;
            imgSrc = 'assets/noPic.png';
            labelTipoDash.textContent = 'Servicio:';

        } else if (element.classList.contains('productosDash')) {

            fechaAlta = element.cells[5].textContent;
            tipo = element.cells[2].textContent;
            descripcion = element.cells[3].textContent;
            imagen = element.cells[1].firstChild.src;
            precio = parseFloat(element.cells[4].textContent);
            imgSrc = element.cells[1].firstChild.src;
            labelTipoDash.textContent = 'Tipo:';

        }

        spnID.textContent = element.cells[0].textContent;
        spnFechaAlta.textContent = fechaAlta;
        divFormDash[0].value = tipo;
        divFormDash[1].value = descripcion;
        divFormDash[2].value = imagen;
        divFormDash[3].value = precio;
        imgFormDash.src = imgSrc;

        divNavContenedor.scrollIntoView({ behavior: "smooth" });
    }

    const setLocal = () => localStorage.setItem('arrayCarrito', JSON.stringify(arrayCarrito));

    const getLocal = () => JSON.parse(localStorage.getItem('arrayCarrito')) || [];


    const fetchData = async (data) => {
        try {
            let url;
            switch (data.tipo) {
                case 'id':
                    url = URL_API_ID + data.id;
                    break;
            }

            const peticion = await fetch(url);
            if (peticion.ok) {
                const response = await peticion.json();
                return {
                    ok: true,
                    resp: response.producto
                }
            } else {
                console.log(error);
                throw error;
            }

        } catch (error) {
            return {
                ok: false,
                msg: 'Error fetchData: ' + error,
                error
            }
        }
    }


    const paintCart = () => {
        const fragment = document.createDocumentFragment();
        const newArray = getLocal();
        let total = 0;

        if (newArray) {
            newArray.forEach(item => {
                const trProdCart = document.createElement('TR');
                trProdCart.id = item.id;

                const tdImgCart = document.createElement('TD');
                const imgProdCard = document.createElement('IMG');
                imgProdCard.src = item.imgSrc;
                tdImgCart.append(imgProdCard);

                const tdProdDesc = document.createElement('TD');
                tdProdDesc.textContent = item.descripcion;

                const tdProdCant = document.createElement('TD');
                tdProdCant.innerHTML = `<button class='subCart'>
                    <i class="fa-solid fa-circle-minus"></i>
                    </button>${item.cantidad}<button class='addCart'>
                    <i class="fa-solid fa-circle-plus"></i></button>`;

                const tdProdPrecio = document.createElement('TD');
                tdProdPrecio.textContent = item.precio + "€";

                const tdProdSubTot = document.createElement('TD');
                tdProdSubTot.textContent = (item.cantidad * item.precio) + "€";
                total += item.cantidad * item.precio;

                const tdBtnQuitar = document.createElement('TD');
                tdBtnQuitar.innerHTML = `<button class='removeCart'><i class="fa-regular fa-circle-xmark"></i></button>`;

                trProdCart.append(tdImgCart, tdProdDesc, tdProdCant, tdProdPrecio, tdProdSubTot, tdBtnQuitar);
                fragment.append(trProdCart);
            })

        }
        tdTotalCart.textContent = `Total: ${total}€`;
        tbodyCart.innerHTML = '';
        tbodyCart.append(fragment);

    }

    const addToCart = async (id) => {
        const { ok, resp: prod, error } = await fetchData({ tipo: 'id', id })
        if (ok) {
            const indProd = arrayCarrito.findIndex(item => item.id == id);

            if (indProd != -1) arrayCarrito[indProd].cantidad += 1;
            else {
                arrayCarrito.push({
                    id: prod._id,
                    cantidad: 1,
                    imgSrc: prod.imagen,
                    descripcion: prod.descripcion,
                    tipo: prod.tipo,
                    precio: prod.precio
                })
            }
            setLocal();
            paintCart();
        } else console.log('error addToCart', error)
    }

    const init = () => {
        const url = location.toString();

        if (url.includes('dashboard')) divFormDash.reset();
        if (!url.includes('404')) paintCart();
    }

    init();

}) //Load