(function ($) {

  $(function() {
    // TODO: Support multiple
    $('.view ul.pager').each(function(){
      var $pagerElement = $(this);
      var $parentView = $pagerElement.parents('.view');

      // Get DOM id of view
      var c = $parentView.attr('class');
      var domID = c.substr(c.indexOf('view-dom-id-')+12).split(' ')[0];

      var view = Drupal.views.instances['views_dom_id:' + domID];


      $pagerElement.html(''); // Clear it out

      $('<li>').append(
        $('<a>').attr('href', '#').click(function(e){
          e.preventDefault();
          $(this).text('Loading...');

          var submitData = view.pagerAjax.submit;
          submitData.page = $(this).data('nextpage');

          $.post('/views/ajax', submitData,
            function(data) {
              for (var i in data) {
                if (data[i].command == 'insert') {
                  var $d = $(data[i].data);
                  var $pagerLink = $('.sn-viewmore-pager');

                  // Append and animate the elements
                  var $elems = $('.view-content:last', $d).contents();
                  $elems.addClass('newcontent');
                  $('.view-content:last').append($elems);
                  $('.view-content .newcontent').hide().slideDown('slow', function(){
                    $(this).removeClass('newcontent');
                  });

                  // Figure out next page, if any
                  var pages = $('.pager-current', $d).text().split(' of ');

                  // We're on the last page! remove the pager
                  if (pages[0] == pages[1]) {
                    $pagerElement.remove();
                  } else { // Fill in the next page and reset the text
                    $pagerLink
                      .data('nextpage', parseInt(pages[0]))
                      .text('Show More');
                  } // End if/else last page
                } // End if Insert
              } // End Loop over commands
            } // End success handler function
        );
        }).data('nextpage', 1).addClass('sn-viewmore-pager').text('Show More')
      ).appendTo($pagerElement);
    });
  });

})(jQuery);