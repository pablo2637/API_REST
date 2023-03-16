document.addEventListener('DOMContentLoaded', () => {

    const main = document.querySelector('main');

    const nav = document.querySelector('nav');
    const divNavContenedor = document.querySelector('.divNavContenedor');
    const divCart = document.querySelector('#divCart');
    const tbodyCart = document.querySelector('#divCart tbody');
    const tdTotalCart = document.querySelector('#totalCart');

    const arrayCarrito = JSON.parse(localStorage.getItem('arrayCarrito')) || [];
    const URL_API_PROD = 'http://localhost:3000/api/v1/productos/id/';
    const URL_API_INST = 'http://localhost:3000/api/v1/instalaciones/id/';


    nav.addEventListener('click', ev => {
        if (ev.target.matches('div') && ev.ctrlKey && ev.altKey && ev.shiftKey) location.assign(location.origin + '/admin')

        if (ev.target.matches('i')) {
            if (ev.target.parentNode.id == 'btnMenu') {
                divNavContenedor.classList.toggle('mostrarNav');
            } else if (ev.target.parentNode.id == 'btnCart') {
                divCart.classList.toggle('mostrarCart');
            } else if (ev.target.parentNode.id == 'btnCloseCart') {
                divCart.classList.toggle('mostrarCart');
            }
        }
    })

    main.addEventListener('click', ev => {
        ev.preventDefault();

        if (ev.target.parentNode.matches('tr') && ev.target.baseURI.includes('dashboard')) {
            getDataToForm(ev.target.parentNode);
        } else if (ev.target.parentNode.matches('td') &&
            ev.target.matches('img') && ev.target.baseURI.includes('dashboard')) {
            getDataToForm(ev.target.parentNode.parentNode);
        }

        if (ev.target.matches('button')) {
            // console.log(ev.target)
        } else if (ev.target.matches('i')) {
            if (ev.target.parentNode.classList.contains('btnAddToCart')) {
                addToCart(ev.target.id, 'prod');
            } else if (ev.target.parentNode.classList.contains('btnAddToCartInst')) {
                addToCart(ev.target.id, 'inst');
            }
        }
    })

    
    const setLocal = () => localStorage.setItem('arrayCarrito', JSON.stringify(arrayCarrito));

    const getLocal = () => JSON.parse(localStorage.getItem('arrayCarrito')) || [];

    const fetchData = async (data) => {        
        try {
            let url;
            switch (data.tipo) {
                case 'prod':
                    url = URL_API_PROD + data.id;
                    break;
                case 'inst':
                    url = URL_API_INST + data.id;
                    break;
            }

            const peticion = await fetch(url);            
            if (peticion.ok) {
                const response = await peticion.json();
                return {
                    ok: true,
                    resp: response
                }
            } else return {
                ok: false,
                resp: peticion
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

    const addToCart = async (id, tipo) => {
        const { ok, resp } = await fetchData({ tipo, id })
        if (ok) {            
            const indProd = arrayCarrito.findIndex(item => item.id == id);
            let producto;
            
            if (tipo == 'prod') producto = resp.producto;
            else if (tipo == 'inst') producto = resp.data;

            if (indProd != -1) arrayCarrito[indProd].cantidad += 1;
            else arrayCarrito.push({
                id: producto._id,
                cantidad: 1,
                imgSrc: producto.imagen || 'assets/noPic.png',
                descripcion: producto.descripcion,
                tipo: producto.tipo,
                precio: producto.precio
            })

            setLocal();
            paintCart();
        } else console.log('Error addToCart', resp)
    }

    const init = () => {
        const url = location.toString();

        if (url.includes('dashboard')) divFormDash.reset();
        if (!url.includes('404')) paintCart();
    }

    init();

}) //Load