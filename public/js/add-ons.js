  $(document).ready(function(){
    // $('.collapsible').collapsible();
    $(".button-collapse").sideNav();
    $('select').material_select();
    
    // Autocomplete object to be built from existing SQL projects
    $('input.autocomplete').autocomplete({
      data: {
        "Apple": null,
        "Microsoft": null,
        "Google": 'http://placehold.it/250x250'
      },
      limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
    });
  });