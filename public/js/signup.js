//Wait until the document is ready
$(document).ready(function(){
    //Grab elements needed for page
    const $form = $("#form-signup");
    const $emailBox = $("#email-input");
    const $passwordBox = $("#password-input");

    /**
     * submit for form
     * Purpose: check user input before signing ups
     */
    $form.on("submit", function(event){
        //prevent refresh
        event.preventDefault();
        //grab user input
        const data = {
            email: $emailBox.val().trim(),
            password: $passwordBox.val().trim()
        }
        //Check if data is empty
        if(!data.email || !data.password) return;
        //signup user
        signup(data);
        //Clear Boxes
        $emailBox.val("");
        $passwordBox.val("");
    });

    /**
     * signUp()
     * Purpose: use server to sign up user
     * Parameters: userInfo - Object of information used to sign user up
     * Return: None
     */
    function signup(userInfo){
        //Query server with user info
        $.post("/account/signup", userInfo)
        .then(() => {
            //reload page with profile page
            window.location.replace("/profile");
        })
        .catch(err => {
            //Show err
            console.log(err);
        });
    };//End signup
    
});//End window Load