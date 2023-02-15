function loader_percentage() {
  let loader_percen = { percen: 0 },
    percenDisplay = document.getElementById("percenDisplay");

  function showpercen() {
    percenDisplay.innerHTML = loader_percen.percen.toFixed(2);

    if (loader_percen.percen.toFixed(2) >= 100) {
      $(".loader").fadeOut();
      $("body").css('overflow-y','auto');
      $("main").css('opacity','1');
    }
  }

  function imgLoaded() {
    c += 1;
    let perc = ((100 / tot) * c) << 0;

    let tween = TweenLite.to(loader_percen, 3, {
      percen: perc,
      onUpdate: showpercen,
    });
  }

  let img = document.images,
    c = 0,
    tot = img.length;

  for (let i = 0; i < tot; i++) {
    let tImg = new Image();
    tImg.onload = imgLoaded;
    tImg.onerror = imgLoaded;
    tImg.src = img[i].src;
    console.log(` image ${i} est correctement chargée`);
    console.log("tImg",i);
  }
}

loader_percentage();

const addActiveClass = (elts) => {
  const elements = document.querySelectorAll(elts);
  elements.forEach((element) => {
    element.addEventListener("click", (event) => {
      elements.forEach((el) => {
        el.classList.remove("active");
      });
      event.target.classList.add("active");
    });
  });
};

addActiveClass("#menu ul li");

let $root = $(".CONTAINER");


function isElementInViewport (el) {
    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
  }
  // click-to-scroll behavior
  $(".goo").click(function (e) {
    e.preventDefault();
    let section = $(this).attr('to');
    let sectionClean = section.substring(section.indexOf("#"));


   if( window.location.hash != sectionClean){
    $root.animate({
        scrollTop: $(sectionClean).offset().top
      }, 0, function () {
        window.location.hash = sectionClean;
      });
   }


  });
  // listen for the scroll event
  $root.on("scroll", function() {
    console.log("onscroll event fired...");
    // check if the anchor elements are visible
    $(".anchorElem").each(function (idx, el) {
      if ( isElementInViewport(el) ) {
        // update the URL hash
        if (window.history.pushState) {
          let urlHash = "#" + $(el).attr("id");
          window.history.pushState(null, null, urlHash);
        }
      }
    });
  });


// $(document).ready(function () {
//   // Add smooth scrolling to all links
//   $(".goo").on("click", function (event) {
//     // Make sure this.hash has a value before overriding default behavior
//     if ($(this).attr("to") !== "") {
//       // Prevent default anchor click behavior
//       event.preventDefault();

//       // Store hash
//       var hash = $(this).attr("to");

//       // Using $'s animate() method to add smooth page scroll
//       // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area

//       if (window.location.hash != hash) {
//         $root.animate(
//           {
//             scrollTop: `${$(hash).offset().top}px`,
//           },
//           100,
//           function () {
//             // Add hash (#) to URL when done scrolling (default click behavior)
//             window.location.hash = hash;
//           }
//         );
//       }
//     } // End if
//   });
// });



$("#closeForm").click(function() {
    $(".box_form").fadeOut()
});
$(".commencer").click(function() {
    $(".box_form").fadeIn();
    $(".box_form").css("display","flex");
});


$("#submitForm").on("submit",function(event){
    event.preventDefault;

    

})