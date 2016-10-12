var app = require('koa')();
var router = require('koa-router')();

var views = require('co-views');

var render = views('views', {
	map: { html: 'swig' }, 
	default: 'ejs'
});

app.use(function *(next){
	console.log("\n\t\t----------AOP 前----------");
	yield next;
	console.log("\t\t----------AOP 后----------\n");
});

router.get('/', function *(next) {
	console.log("-----------index------------");
	
	this.body = yield render('index');
});

router.post('/users', function *(next) {
	
});

// ---------------`1---------------
// -----注意路由1和2的顺序，不是最精准，而是匹配了就行，如何从上往下-----------
// -----但是params里面又解析了。。。。
router.get('/users/:id', function *(next) {
	console.log("get user", this.params);
	this.body = "user id = " + this.params.id + ", params=" + JSON.stringify(this.params);
});

// ---------------2-----------------
router.get('/:type/:id', function *(next) {
	console.log("get type", this.params);
	this.body = yield render('users' ,this.params);
});


router.put('/users/:id', function *(next) {
	// ...
});

router.del('/users/:id', function *(next) {
	// ...
});

router.get('/getmethod', function *(next) {
	console.log(this.query);
	this.body = "query=" + JSON.stringify(this.query);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, ()=>{console.log("listen port: 3000")});