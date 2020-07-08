//Wait until the document is ready
$(document).ready(function(){
    //Grab elements needed for page
    const $form = $("#form-login");
    const $emailBox = $("#email-input");
    const $passwordBox = $("#password-input");

    /**
     * submit for form
     * Purpose: check user input before loging in
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
        //login user
        login(data);
        //Clear Boxes
        $emailBox.val("");
        $passwordBox.val("");
    });//end form submit
    
    /**
     * login()
     * Purpose: use server to login
     * Parameters: loginInfo - object of login information
     * Return: None
     */
    function login(loginInfo){
        //Query server with login info
        $.post("/account/login", loginInfo)
        .then(() => {
            //reload page with profile page
            window.location.replace("/profile");
        })
        .catch(err => {
            //Show err
            console.log(err);
        });
    };//End login()

});//End window load