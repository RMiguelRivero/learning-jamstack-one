const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => acc.then(fn), Promise.resolve(x));

function fetchRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos?type=owner&sort=updated`)
        .then((res) => res.json())
        .catch(console.error);
}

function buildListMarkup(repos) {
    const markup = repos.map(({ html_url, name, stargazers_count }) =>
        `<li>
            <a href="${html_url}">${name}</a>
            (⭐️ ${stargazers_count})
        </li>`
    ).join('');

    return `<ul>${markup}</ul>`;
}

function paintContent(content) {
    const $content = document.getElementById('content');
    $content.innerHTML = content;
}

const app = compose(
    paintContent,
    buildListMarkup,
    fetchRepos
);

app('RMiguelRivero')