module.exports.latestPost = function(req, res){
    return res.end('<h1>Latest Posts</h1>')
}

module.exports.oldPost = function(req, res){
    return res.end('<h1>Old Posts</h1>')
}