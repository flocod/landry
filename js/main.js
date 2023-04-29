
function loader_percentage() {
  let loader_percen = { percen: 0 },
    percenDisplay = document.getElementById("percenDisplay");

  function showpercen() {
    percenDisplay.innerHTML = loader_percen.percen.toFixed(2);

    if (loader_percen.percen.toFixed(2) >= 100) {
      $(".loader").fadeOut();
      $("body").css("overflow-y", "auto");
      $("main").css("opacity", "1");
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
    console.log("tImg", i);
  }
}

// loader_percentage();

// document.addEventListener("DOMContentLoaded", function() {
//   var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

//   if ("IntersectionObserver" in window) {
//     let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
//       entries.forEach(function(entry) {
//         if (entry.isIntersecting) {
//           let lazyImage = entry.target;
//           lazyImage.src = lazyImage.src;
//           lazyImage.srcset = lazyImage.src;
//           lazyImage.classList.remove("lazy");
//           lazyImageObserver.unobserve(lazyImage);
//         }
//       });
//     });

//     lazyImages.forEach(function(lazyImage) {
//       lazyImageObserver.observe(lazyImage);
//     });
//   } else {
//     // Possibly fall back to event handlers here
//   }
// });






// Progressive loading images
const imagesToLoad = document.querySelectorAll("img[data-src]");
const loadImages = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = () => {
    image.removeAttribute("data-src");
  };
};


if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((items) => {
    // console.log("items----------->", items);
    items.forEach((item) => {
      if (item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  });
  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else {
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}
















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

function isElementInViewport(el) {
  //special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /*or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /*or $(window).width() */
  );
}
// click-to-scroll behavior
$(".goo").click(function (e) {
  e.preventDefault();
  let section = $(this).attr("to");
  let sectionClean = section.substring(section.indexOf("#"));

  if (window.location.hash != sectionClean) {
    $root.animate(
      {
        scrollTop: $(sectionClean).offset().top,
      },
      0,
      function () {
        window.location.hash = sectionClean;
      }
    );
  }
});
// listen for the scroll event
$root.on("scroll", function () {
  console.log("onscroll event fired...");
  // check if the anchor elements are visible
  $(".anchorElem").each(function (idx, el) {
    if (isElementInViewport(el)) {
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

$("#closeForm").click(function () {
  $(".box_form").fadeOut();
});
$(".commencer").click(function () {
  $(".box_form").fadeIn();
  $(".box_form").css("display", "flex");

  let monTexte = $(this).attr("contenu");

  $("#service option").removeAttr("selected");
  $("#service option")
    .filter(function () {
      return $(this).attr("contenu") == monTexte;
    })
    .attr("selected", "selected");
});

// teste si le Numero de téléphone est valide est valide
// function validatePhone(txtPhone) {
//   let filter =
//   /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
//   // let filter =
//   //   /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
//   if (filter.test(Number(txtPhone))) {
//     return true;
//   } else {
//     return false;
//   }
// }

// Format Phone Number
function validatePhone(p) {
  let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  let parsedPhone;
  try {
    parsedPhone = phoneUtil.parse(p);
    console.log("phone is valid");
  } catch (error) {
    console.log("phone error =>", error);
    return false;
  }

  if (phoneUtil.isValidNumber(parsedPhone)) {
    console.log(
      "phoneUtil.format(parsedPhone, libphonenumber.PhoneNumberFormat.INTERNATIONAL)",
      phoneUtil.format(
        parsedPhone,
        libphonenumber.PhoneNumberFormat.INTERNATIONAL
      )
    );
    return phoneUtil.format(
      parsedPhone,
      libphonenumber.PhoneNumberFormat.INTERNATIONAL
    );
  } else {
    return false;
  }
}

// teste si l'email est valide
function isValidEmailAddress(email) {
  return (
    /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/.test(
      email
    ) && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test(email)
  );
}

function sendContact() {
  let nom_form_contact = $("#form_name").val();

  let selected_service = $("#service").val();
  let email_form_contact = $("#form_email").val();
  let tel_form_contact = $("#form_tel").val();

  let message_form_contact = $("#form_comment").val();

  let html_email2;
  email_form_contact = isValidEmailAddress(email_form_contact)
    ? email_form_contact
    : "";

  if (
    nom_form_contact != "" ||
    tel_form_contact != "" ||
    selected_service != "" 
  ) {
    if (validatePhone(tel_form_contact)) {
      let form = "";
      form = $("#form_contact").get(0);

      let formData = new FormData(form);

  

      $.ajax({
        url: "mail.php",
        type: "POST",
        enctype: "multipart/form-data",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 20000,
        dataType: "html",
        beforeSend: function () {

          $(".loader").fadeIn();
          $(".loader .loader_counter").fadeOut();
          setTimeout(()=>{

          },1000);

        },
        success: function (reponse, statut) {
          $(".loader").fadeOut();
          // $(
          //   "<br><div class='php_exec' style='color:#2b2b2b; font-size:1em;'>" +
          //     reponse +
          //     "</div>"
          // ).insertAfter(".war_add_sendContact");

           setTimeout(()=>{
				alert(reponse);
          },1000);
      

         
        },
        complete: function () {
          $(".loader").fadeOut();
     
        },
      });


    } else {
      alert("Le numero de telephone est incorrect ! Ajoutez le code de votre pays");
    }
  } else {
    alert("veuillez remplir tous les champs !");
  }
}

$("#submitForm").on("click", function (event) {
  sendContact();
});
