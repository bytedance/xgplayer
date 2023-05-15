module.exports = function (context, github) {
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const base = "main";
    const head = "release";
    const title = "new version published: " + process.env.RELEASED_VERSION;
    const body = "";
    github.rest.pulls.create({
        owner,
        repo,
        base,
        head,
        title,
        body
    });

}
