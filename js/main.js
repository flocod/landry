// function loader_percentage() {
//   let loader_percen = { percen: 0 },
//     percenDisplay = document.getElementById("percenDisplay");

//   function showpercen() {
//     percenDisplay.innerHTML = loader_percen.percen.toFixed(1);

//     if (loader_percen.percen.toFixed(2) >= 100) {
//       $(".loader").fadeOut();
//       $("body").css('overflow-y','auto');
//       $("main").css('opacity','1');
//     }
//   }

//   function imgLoaded() {
//     c += 1;
//     let perc = ((100 / tot) * c) << 0;

//     let tween = TweenLite.to(loader_percen, 3, {
//       percen: perc,
//       onUpdate: showpercen,
//     });
//   }

//   let img = document.images,
//     c = 0,
//     tot = img.length;

//   for (let i = 0; i < tot; i++) {
//     let tImg = new Image();
//     tImg.onload = imgLoaded;
//     tImg.onerror = imgLoaded;
//     tImg.src = img[i].src;
//     console.log(` image ${i} est correctement chargée`);
//     console.log("tImg",i);
//   }
// }

// loader_percentage();








const addActiveClass = (elts) =>{
    const elements = document.querySelectorAll(elts);
    elements.forEach(element => {
        element.addEventListener('click', event => {
            elements.forEach(el => {
                el.classList.remove('active');
            });
            event.target.classList.add('active');
        });
    });
}

addActiveClass('#menu ul li');