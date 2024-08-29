function navbar() {
    return `<div class="position-fixed vw-100 p-3 px-5 row" id="navar">
        <div class="col">
            <h5><u>Etuie</u></h5>
        </div>
        <div class="col text-end">
            <div id="logged-out-nav">
                <button>Register</button>
                <button>Log in</button>
            </div>
            <div id="logged-in-nav" class="hidden">
                <span>SomeUsername</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <button>Log out</button>
            </div>
        </div>
    </div>`;
}
function addNavbar() { document.body.innerHTML = navbar() + document.body.innerHTML; }