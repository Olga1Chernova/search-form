!function(){var t=function(t){var e=t.title,n=t.url,o=t.objectID;return'<li class="news-item" data-id='.concat(o,">\n        <a href=").concat(n,' target ="_blank">').concat(e,"</a>\n      </li>")},e={form:document.querySelector(".news-form"),list:document.querySelector(".news-list"),submitButton:document.querySelector('button[type ="submit"]'),loader:document.querySelector(".news-loading")};e.form.addEventListener("submit",(function(n){var o=n.target.elements.query.value;n.preventDefault(),e.loader.classList.add("show"),e.submitButton.disabled=!0,fetch("".concat("https://hn.algolia.com/api/v1/search","?query=").concat(o)).then((function(t){return t.json()})).then((function(n){var o,a=n.hits;o=a.map(t),e.list.innerHTML="",e.list.insertAdjacentHTML("beforeend",o.join(""))})).finally((function(){e.loader.classList.remove("show"),e.submitButton.disabled=!1}))}))}();
//# sourceMappingURL=index.880e6453.js.map
