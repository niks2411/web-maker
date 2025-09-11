jQuery(document).ready(function(){
  jQuery('#contact-form').on('submit',async function(e) {  //Don't foget to change the id form
    e.preventDefault(); //Avoid Page Refresh

    try {
      if (!window.db) {
        throw new Error('Firestore not initialized');
      }

      const $form = jQuery(this);
      const formDataArr = $form.serializeArray();
      const dataObj = {};
      formDataArr.forEach(function(item){
        dataObj[item.name] = item.value;
      });

      // Normalize expected fields
      const submission = {
        name: dataObj['Complete Name'] || '',
        email: dataObj['Email Address'] || '',
        phone: dataObj['Phone No'] || '',
        preferredType: dataObj['fav_language'] || '',
        createdAt: window.fireTS()
      };

      await window.db.collection('submissions').add(submission);

      swal({
          title: "Thank You!",
          text: "Your request has been submitted successfully. We will contact you soon.",
          icon: "success",
          timer: 3000
      }).then(function() {
        jQuery('#contact-form')[0].reset();
      });
    } catch (err) {
      console.error(err);
      swal({
        title: "Oops...",
        text: "Something went wrong :( ",
        icon: "error",
        timer: 3000
      });
    }
  });
  
  
  jQuery('#subscribe-form').on('submit',function(e) {  //Don't foget to change the id form
  jQuery.ajax({
      url:'subs.php', //===PHP file name====
      data:jQuery(this).serialize(),
      type:'POST',
      success:function(data){
        //Success Message == 'Title', 'Message body', Last one leave as it is
	      swal({
              title: "Thank You!",
              text: "Your subscrition request has been submitted successfully.",
              icon: "success",
              showCancelButton: false,
             showConfirmButton: false,
            timer: 3000
           }).then(function() {
            jQuery('#subscribe-form')[0].reset();
                   });

      },
      error:function(data){
        //Error Message == 'Title', 'Message body', Last one leave as it is

         swal({
              title: "Oops...",
              text: "Something went wrong :(",
               icon: "error",
             timer: 3000
           });
      }
    });
    e.preventDefault(); //This is to Avoid Page Refresh and Fire the Event "Click"
  });
});