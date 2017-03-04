  $(document).ready(function() {
    $(".button-collapse").sideNav();
    $('select').material_select();
    
    // Autocomplete object to be built from existing SQL projects
   
    $('.edit-button').on('click', (event) => {
      $('#edit_' + event.currentTarget.dataset.id).animate({
            height: "toggle",
            opacity: '1',
      }, 300);
    });

  $('.complete-button').on('click', (event) => {
      const id = event.currentTarget.dataset.id;
      const completedTask = document.querySelector('#task_' + id);
      completedTask.classList.toggle('disabled');
      document.querySelector(`#task_${id} .complete-button`).classList.toggle('disabled');
      document.querySelector(`#task_${id} .edit-button`).classList.toggle('disabled');
      $.ajax({
        url: `/do-task/${id}`,
        type: 'PUT',
      });

    });
  });