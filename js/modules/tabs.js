function tabs (){
    const   tabs = document.querySelectorAll('.tabheader__item'),
            tabscontent = document.querySelectorAll('.tabcontent'),
            tabsparent = document.querySelector('.tabheader__items');


function hideTabcontent (){
    tabscontent.forEach(item => {
        item.classList.add('hide', )
        item.classList.remove('show', 'fade')
    });


tabs.forEach(item  => {
    item.classList.remove('tabheader__item_active')
})
}

function showTABContent(i = 0){
    tabscontent[i].classList.add('show', 'fade')
    tabscontent[i].classList.remove('hide')
    tabs[i].classList.add('tabheader__item_active')

}
hideTabcontent()
showTABContent()

tabsparent.addEventListener('click',(ev)=>{
    const target = ev.target;

    if(target && target.classList.contains('tabheader__item')){
        tabs.forEach((item,i) => {
            if(target == item){
                hideTabcontent()
                showTABContent(i)
            }
        })
    }
})

}

export default tabs;