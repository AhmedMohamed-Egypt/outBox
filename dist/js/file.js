const allSpanDate = document.querySelectorAll('.update-date')
const getDate = new Date()

const writeDate = (el)=>{
    el.textContent = getDate.getFullYear()

}
allSpanDate.forEach((item)=>{
    writeDate(item)
})


document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
     
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });

  //Vacancies Tab


  const showTabs = ()=>{

    const previewItem = document.querySelector('.preview-item')
    const listItems = document.querySelectorAll('.list ul li')
    const previewItemsTxt = document.querySelectorAll('.preview > div')
    const nextBtn = document.querySelector('.vacancies-tabs__content .headings .btn-group button')
    let show = false
    let x = 0
    if(previewItem){
       
      previewItem.addEventListener('click',()=>{
        if(!show){
          document.body.classList.add('showList')
          show = true
        }else {
          document.body.classList.remove('showList')
          show = false
        }
      })

      listItems.forEach((item,index)=>{
        item.addEventListener('click',()=>{
          previewItem.firstElementChild.textContent =  item.textContent
          document.body.classList.remove('showList')
          for(let i = 0 ; i < previewItemsTxt.length;i++){
            previewItemsTxt[i].classList.remove('active')
          }
          nextBtn.innerHTML  = `Next`
          nextBtn.classList.remove('bold')

          
          previewItemsTxt[index].classList.add('active')
          show = false
          x = index
        })
      })
      nextBtn.addEventListener('click',()=>{
        x++
        if(x < (previewItemsTxt.length )){
          for(let i = 0 ; i < previewItemsTxt.length;i++){
            previewItemsTxt[i].classList.remove('active')
          }
          previewItemsTxt[x].classList.add('active')
          previewItem.firstElementChild.textContent = listItems[x].textContent
          nextBtn.innerHTML  = `Next`
          nextBtn.classList.remove('bold')
          
        }else if(x > (previewItemsTxt.length - 1 )) {
          
          nextBtn.innerHTML  = `Join us
          <span class="icon-arrow_right_alt"></span>
          `
          nextBtn.classList.add('bold')
          
        }
      })


    }
  }
  
  showTabs()