$(document).ready(function(){
    const $form = $("#form-login");
    const $emailBox = $("#email-input");
    const $passwordBox = $("#password-input");

    $form.on("submit", function(event){
        event.preventDefault();
        const data = {
            email: $emailBox.val().trim(),
            password: $passwordBox.val().trim()
        }
        if(!data.email || !data.password) return;

        login(data);
        $emailBox.val("");
        $passwordBox.val("");
    });

    function login(loginInfo){
        $.post("/account/login", loginInfo)
        .then(() => {
            window.location.replace("/nextPage");
        })
        .catch(err => {
            console.log(err);
        });
    };

});