$(document).ready(function(){
    const $form = $("#form-signup");
    const $emailBox = $("#email-input");
    const $passwordBox = $("#password-input");

    $form.on("submit", function(event){
        event.preventDefault();
        const data = {
            email: $emailBox.val().trim(),
            password: $passwordBox.val().trim()
        }
        if(!data.email || !data.password) return;

        signup(data);
        $emailBox.val("");
        $passwordBox.val("");
    });

    function signup(userInfo){
        $.post("/account/signup", userInfo)
        .then(() => {
            window.location.replace("/nextPage");
        })
        .catch(err => {
            console.log(err);
        });
    };
    
});