const React = require("react");
const Default = require("./layouts/default");

function Error404() {
    return (
        <Default>
            <h1>404, Page Not Found</h1>
        </Default>
    )
}

module.exports = Error404;