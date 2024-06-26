let modalQt = 1;
let cart = []; //array
let modalKey = 0;

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index); //defini cada pizz com base no id do json
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;  //vai mostrar qual a pizz

        c('.pizzaBig img ').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if (sizeIndex == 2){
                size.classList.add('selected'); //sempre grande selecionado
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        c('.pizzaInfo--qt').innerHTML = modalQt;



        c('.pizzaWindowArea').style.opacity =0; //primeiro modal
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        },200);

    });

    c('.pizza-area').append( pizzaItem );

});


    //eventos do modal
    function closemodal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
        },500);
    } 

    cs('.pizzaInfo--cancelButton, .pizza-Info--cancelMobileButton').forEach((item)=>{
        item.addEventListener('click', closemodal);

    } );
    
    c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
        if(modalQt > 1){
            modalQt--;
            c('.pizzaInfo--qt').innerHTML = modalQt;

        }
    });

    c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
       modalQt++;
       c('.pizzaInfo--qt').innerHTML = modalQt;
    });

    cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
        size.addEventListener('click', (e)=>{
            c('.pizzaInfo--size.selected').classList.remove('selected');
            size.classList.add('selected');
        });

    });

    c('.pizzaInfo--addButton').addEventListener('click', ()=>{
        //info qnt, tamanho, e sabor
        let size = c('.pizzaInfo--size.selected').getAttribute('data-key'); //data-key é o atributo de tamanho do html

        let identifier = pizzaJson[modalKey].id+'@'+size;  

        let key = cart.findIndex((item)=>item.identifier == identifier);

            if ( key > -1){
                cart[key].qt += modalQt;
            }
            else{
            cart.push({
                identifier,
                id:pizzaJson[modalKey].id,
                size,
                qt:modalQt
             });
            }  
        updateCart();     
        closemodal();
});

        function updateCart(){
            if (cart.length > 0) {
               c('aside').classList.add('show');
               c('.cart').innerHTML = '';

                for(let i in cart) {
                    let pizzaItem = pizzaJson.find((item)=> item.id == cart[i].id);
                    let cartItem = c('.models .cart--item').cloneNode(true);

                    let pizzaSizeName;
                    switch (cart[i].size){
                        case 0:
                            pizzaSizeName = 'P';
                            break;

                        case 1:
                            pizzaSizeName = 'M';
                            break;

                        case 2: pizzaSizeName = 'G';  
                        break;
                    };

                    let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
                    cartItem.querySelector('img').src = pizzaItem.img;
                    cartItem.querySelector('.cart--item-nome').innerHTML = pizzaItem.name;
                    cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
                    c('.cart').append(cartItem);
                    

            } ;
        }  else {
                c('aside').classList.remove('show');
            };
        };
        