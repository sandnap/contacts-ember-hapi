module.exports = {
    formatJson: function(root, json) {
        return '{"' + root + '":' + JSON.stringify(json) + '}';
    }
}
