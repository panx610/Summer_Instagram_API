
$(function() {
$('.banner').unslider({
    speed: 500,               //  The speed to animate each slide (in milliseconds)
    delay: 3000,              //  The delay between slide animations (in milliseconds)
    complete: function() {},  //  A function that gets called after every slide animation
    keys: true,               //  Enable keyboard (left, right) arrow shortcuts
    dots: true,               //  Display dot navigation
    fluid: false              //  Support responsive design. May break non-responsive designs

});
var unslider = $('.banner').unslider();

  $('.prev').click(function() {
      unslider.data('unslider').prev();
  });

  $('.next').click(function() {
      unslider.data('unslider').next();
  });
  return false;
});



var token = "3448148.62a7e1b.23db0aaf9ee74e66abe073eed50b3370",
    access_parameters = {
        access_token: token //assign token in the api url
    };

// hide button
    $(function() {
    $('form').each(function() {
        $(this).find('input[type=submit]').hide();
    });
});

// var input = document.getElementById("test");


var form = $('#eventTag');
form.on('submit', function(ev) {
    var q = this.tag.value;
    if(q.length) {
        //console.log(q);
        loadImages(q, 40, access_parameters);
        
    }
    ev.preventDefault();
});

function loadImages(tag, count, access_parameters) {
    var instagramUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count=' + count;
    $.getJSON(instagramUrl, access_parameters, onDataLoaded); //short cut for $.ajax
}

function onDataLoaded(instagram_data) {
    var target = $("#target");
    //console.log(instagram_data);
    if (instagram_data.meta.code == 200) {
        var photos = instagram_data.data;
        //console.log(photos);
        if (photos.length > 0) {
            target.empty();
            for (var key in photos) {
                var photo = photos[key];
                target.append('<a href="' + photo.link + '"><img src="' + photo.images.low_resolution.url + '"></a>')
            }
        } else {
            target.html("nothing found");
        }
    } else {
        var error = instagram_data.meta.error_message;
        target.html(error);
    }
}

loadImages('unicorn', 40, access_parameters);

// var feed = new Instafeed({
//   clientId: '62a7e1baa5204ed2ac92e302a5423073',
//   limit: 6,
//   get:'tagged',
//   tagName:q,
//   sortBy: 'most-liked',
//   after: function () {
//     var images = $("#instafeed").find('a');
//     $.each(images, function(index, image) {
//       var delay = (index * 75) + 'ms';
//       $(image).css('-webkit-animation-delay', delay);
//       $(image).css('-moz-animation-delay', delay);
//       $(image).css('-ms-animation-delay', delay);
//       $(image).css('-o-animation-delay', delay);
//       $(image).css('animation-delay', delay);
//       $(image).addClass('animated flipInX');
//     });
//   },
//   template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><div class="likes">&hearts; {{likes}}</div></a>'
// });
// feed.run();



