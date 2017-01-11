$(document).ready(function() {
  // form submit
  $('form').on('submit', function() {
    var $item = $('form input');
    var todo = {item: $item.val()};
    
    $.ajax({
      type: 'POST',
      url: '/todos',
      data: todo,
      success: function(result) {
        let $ul = $('.todos');
        let $li = $('<li id="' + result._id + '">' + result.item + '</li>');
        $li.on('click', li_clickHandler);
        $ul.append($li);        
      }
    });
    
    return false;
  });
  
  // li click
  $('.todos li').on('click', li_clickHandler);
  
  function li_clickHandler(e) {
    let id = $(this).attr('id');
    
    $.ajax({
      type: 'DELETE',
      url: '/todos',
      data: { _id: id },
      success: function(result) {
        // remove the li with the _id returned on success
        if (result._id) {
          $('#' + result._id.toString()).remove();
        }
      }
    });
  }
});