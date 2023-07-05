const socketClient = io();

const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputPrice = document.getElementById('price');
const inputThumbnail = document.getElementById('thumbnail');
const inputCode = document.getElementById('code');
const inputStock = document.getElementById('stock');
const inputCategory = document.getElementById('category');

const products = document.getElementById('products');

form.onsubmit = (e) => {
    e.preventDefault();
    const title= inputTitle.value;
    const description= inputDescription.value;
    const price= inputPrice.value;
    const thumbnail= inputThumbnail.value;
    const code= inputCode.value;
    const stock= inputStock;
    const category= inputCategory.value;
    socketClient.emit('addProduct', {title, description, price, thumbnail, code, stock, category});
}

socketClient.on('getProducts', (array) => {
    let infoProducts = '';
    array.forEach((p) => {
        infoProducts += `id: ${p.id}</br> title: ${p.title}</br> description: ${p.description}</br> price: ${p.price}</br> thumbnail: ${p.thumbnail}</br> code: ${p.code}</br> stock: ${p.stock}</br> category: ${p.category}</br> -----------------------------------</br>`;
    });
    products.innerHTML = infoProducts;
});