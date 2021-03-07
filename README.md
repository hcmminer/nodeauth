# user-login-system
nodejs by building 12 project

# use mongodb 
* install mongodb C:\mongodb // nên cài vào đây
* > cd C:\mongodb\bin> 
* > mongo
* > db // đang ở db nào
* > show dbs // chưa có gì ngoài các db mặc định
* > use customers // chuyển sang db nếu chưa có thì tạo mới
* > db.createCollection('customers') // sau khi tạo một collection thì mới show dbs được 
* > show collections // hiện các colection trong db hiện tại
* > db.createCollection('users')
* > db.users.insert({name: 'dang van ban', email: 'hcmminer@gmail.com', password: '1234'});
* > db.users.find()
* > db.users.find().pretty() // xem đẹp hơn
* > db.users.update({username: 'hcmminer'},{$set: {email: 'vanbanok@gmail.com'}}) // nếu không có $set thì mọi thứ khác sẽ bị xóa rất nguy hiểm
* > db.users.remove({name: 'dang van ban'}) 
# express
> npm install -g express // global express
> npm install -g express-generator
