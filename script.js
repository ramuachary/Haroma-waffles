
(()=>{const slides=[...document.querySelectorAll('.product-slide')];let current=0;if(!slides.length)return;slides[0].classList.add('active');setInterval(()=>{slides[current].classList.remove('active');current=(current+1)%slides.length;slides[current].classList.add('active')},3000)})();



(()=>{
 const rows=[...document.querySelectorAll('#menu .items li')];
 const cart=document.createElement('aside');cart.className='cart-bar';cart.setAttribute('aria-live','polite');cart.innerHTML='<span class="cart-count">0 items</span><span><small class="cart-label">Estimated total</small><strong class="cart-total">₹0</strong></span>';document.body.append(cart);
 const quantities=new Map();
 const refresh=()=>{let count=0,total=0;for(const [row,qty] of quantities){count+=qty;total+=qty*Number(row.querySelector('.price').textContent.replace(/[^0-9]/g,''))}cart.querySelector('.cart-count').textContent=`${count} ${count===1?'item':'items'}`;cart.querySelector('.cart-total').textContent=`₹${total}`;cart.classList.toggle('visible',count>0)};
 rows.forEach(row=>{const photo=row.querySelector('.item-photo');const name=row.querySelector('.item-name');const price=row.querySelector('.price');const detail=document.createElement('div');detail.className='product-detail';const meta=document.createElement('div');meta.className='product-meta';const actions=document.createElement('div');actions.className='item-actions';const add=document.createElement('button');add.type='button';add.className='add-button';add.textContent='Add';add.setAttribute('aria-label',`Add ${name.textContent.trim()}`);const stepper=document.createElement('div');stepper.className='quantity-stepper';stepper.hidden=true;stepper.innerHTML='<button type="button" class="decrease" aria-label="Decrease quantity">−</button><output>1</output><button type="button" class="increase" aria-label="Increase quantity">+</button>';actions.append(add,stepper);meta.append(price,actions);detail.append(name,meta);row.replaceChildren(photo,detail);quantities.set(row,0);
 const setQty=qty=>{quantities.set(row,qty);add.hidden=qty>0;stepper.hidden=qty===0;stepper.querySelector('output').textContent=qty;refresh()};add.addEventListener('click',()=>setQty(1));stepper.querySelector('.increase').addEventListener('click',()=>setQty(quantities.get(row)+1));stepper.querySelector('.decrease').addEventListener('click',()=>setQty(Math.max(0,quantities.get(row)-1)));
 });refresh();
})();







const welcomeScreen=document.getElementById('welcome-screen');
if(welcomeScreen){
 welcomeScreen.addEventListener('animationend',event=>{if(event.target===welcomeScreen&&['welcome-fade','welcome-skip'].includes(event.animationName))welcomeScreen.remove()});
 welcomeScreen.querySelector('.welcome-skip').addEventListener('click',()=>welcomeScreen.classList.add('is-skipping'));
}


const animateWelcomeLetters=(selector,start,step)=>{
 const element=document.querySelector(selector);if(!element)return;
 const letters=[...element.textContent];
 element.replaceChildren(...letters.map((letter,index)=>{const span=document.createElement('span');span.textContent=letter===' '?'\u00a0':letter;span.style.setProperty('--letter-delay',`${start+index*step}s`);return span}));
};
animateWelcomeLetters('.welcome-overline',0,.045);
animateWelcomeLetters('.welcome-card h1',.55,.055);
