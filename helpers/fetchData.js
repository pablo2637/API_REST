const URL_BASE = 'http://localhost:3000';
const URL_API = 'api/v1';
const URL_PROD = 'productos';
const URL_SERV = 'servicios';
const URL_USER = 'usuarios';
const URL_INST = 'instalaciones';

const fetchData = (tipo, req) => {
    const body = JSON.stringify({ ...req.body });
    const id = req.params.id || '';
    let url = '';
    let options = {}

    switch (tipo) {                     //Como le gusta al sensei
        case 'chkUser':
            url = `${URL_BASE}/${URL_API}/${URL_USER}`;
            options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
            }
            break;

        case 'getServ':
            url = `${URL_BASE}/${URL_API}/${URL_SERV}/id/${id}`;
            break;

        case 'getServAll':
            url = `${URL_BASE}/${URL_API}/${URL_SERV}`;
            break;

        case 'postServ':
            url = `${URL_BASE}/${URL_API}/${URL_SERV}`;
            options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
            }
            break;

        case 'putServ':
            url = `${URL_BASE}/${URL_API}/${URL_SERV}/id/${id}`;
            options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body
            }
            break;

        case 'dltServ':
            url = `${URL_BASE}/${URL_API}/${URL_SERV}/id/${id}`;
            options = { method: 'DELETE' }
            break;

        case 'getProdAll':
            url = `${URL_BASE}/${URL_API}/${URL_PROD}`;
            break;
    }
    return { url, options }
}

module.exports = { fetchData }