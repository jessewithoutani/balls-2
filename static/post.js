postIds = []

function loadPostList(ids) {
    postIds = ids;
}

function removeHTML(value) {
    return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
}

function post(id, subject, content, imageUrls, createdAt, likes) {
    return `
        <div class="container w-100 post">
            <div class="row">
                <div class="col">
                    <h4 id="subject">${removeHTML(subject)}</h4>
                    <span class="float-right grey" id="date">${createdAt}</span>
                </div>
            </div>
            <div class="row">
                <div class="col"><img src="${imageUrls[0]}" class="w-100"></div>
            </div>
            <div class="row">
                <div class="col">
                    <i class="bi bi-hand-thumbs-up-fill icon-button"></i>
                    <b><span id="likes">${likes}</span> Likes</b>
                </div>
            </div>
            <div class="row">
                <div class="col">${removeHTML(content)}</div>
            </div>
        </div>
    `;
}

async function loadPost(id) {
    const response = await fetch(`/postdata/${id}`)
    const data = JSON.parse(await response.text());
    document.getElementById("posts").innerHTML += post(
        data.id, data.subject, data.content, data.image_urls, data.created_at, 9999);
}
async function loadAllPosts() {
    for (let i = postIds.length - 1; i >= 0; i--) {
        await loadPost(postIds[i]);
    }
}