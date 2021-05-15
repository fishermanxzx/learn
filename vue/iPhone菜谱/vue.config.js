module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target:"https://api.binstd.com/recipe",
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}